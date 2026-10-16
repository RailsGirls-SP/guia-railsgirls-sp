// @ts-check
// Rubi, a tutora com IA do guia (projeto Mentora).
//
// O botão aparece para todo mundo, mas perguntar exige o código do
// workshop.
//
// Tudo que vem do modelo é montado com elementos e textContent, nunca com
// innerHTML. O token e a conversa ficam no sessionStorage: somem ao fechar
// a aba.
(function () {
  const script = /** @type {HTMLScriptElement | null} */ (document.currentScript);
  const API = (script && script.dataset.api ? script.dataset.api : "").replace(/\/+$/, "");
  if (!API) return;

  const CHAVE_TOKEN = "guia-rg:rubi:token";
  const CHAVE_CONVERSA = "guia-rg:rubi:conversa";
  // Quantas mensagens anteriores vão junto com a pergunta (a API usa as últimas).
  const MENSAGENS_NO_HISTORICO = 6;
  // Quantas mensagens ficam guardadas para mostrar ao reabrir o chat.
  const MENSAGENS_GUARDADAS = 20;

  /** @typedef {{ role: "user" | "assistant", content: string }} Mensagem */

  // --- Armazenamento (pode falhar em janela anônima ou com o armazenamento bloqueado) ---

  /** @param {Storage} storage @param {string} chave */
  function ler(storage, chave) {
    try {
      return storage.getItem(chave);
    } catch (e) {
      return null;
    }
  }

  /** @param {Storage} storage @param {string} chave @param {string | null} valor */
  function gravar(storage, chave, valor) {
    try {
      if (valor === null) storage.removeItem(chave);
      else storage.setItem(chave, valor);
    } catch (e) {
      // Sem armazenamento: vale só até recarregar a página.
    }
  }

  /** @returns {Mensagem[]} */
  function lerConversa() {
    try {
      const conversa = JSON.parse(ler(sessionStorage, CHAVE_CONVERSA) || "[]");
      return Array.isArray(conversa) ? conversa : [];
    } catch (e) {
      return [];
    }
  }

  /** @param {Mensagem[]} conversa */
  function gravarConversa(conversa) {
    gravar(sessionStorage, CHAVE_CONVERSA, JSON.stringify(conversa.slice(-MENSAGENS_GUARDADAS)));
  }

  // --- Markdown simples, montado com elementos ---

  /**
   * @param {string} tag
   * @param {string} [classe]
   * @param {string} [texto]
   */
  function el(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
  }

  // Negrito, `código` e [links](https://...) dentro de uma linha.
  /** @param {string} texto @param {HTMLElement} destino */
  function inline(texto, destino) {
    const padrao = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let inicio = 0;
    for (const achado of texto.matchAll(padrao)) {
      const posicao = achado.index || 0;
      if (posicao > inicio) destino.append(texto.slice(inicio, posicao));
      if (achado[1] !== undefined) destino.append(el("code", "", achado[1]));
      else if (achado[2] !== undefined) destino.append(el("strong", "", achado[2]));
      else if (/^https?:\/\//.test(achado[4])) {
        const link = /** @type {HTMLAnchorElement} */ (el("a", "", achado[3]));
        link.href = achado[4];
        link.target = "_blank";
        link.rel = "noopener";
        destino.append(link);
      } else destino.append(achado[3]);
      inicio = posicao + achado[0].length;
    }
    if (inicio < texto.length) destino.append(texto.slice(inicio));
  }

  // Parágrafos, listas, citações e blocos de código.
  /** @param {string} markdown @param {HTMLElement} destino */
  function renderizar(markdown, destino) {
    destino.replaceChildren();
    const linhas = markdown.replace(/\r/g, "").split("\n");
    /** @type {HTMLElement | null} */ let lista = null;
    /** @type {string[]} */ let paragrafo = [];

    const fecharParagrafo = () => {
      if (paragrafo.length === 0) return;
      const p = el("p");
      inline(paragrafo.join(" "), p);
      destino.append(p);
      paragrafo = [];
    };

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];

      if (/^\s*```/.test(linha)) {
        fecharParagrafo();
        lista = null;
        const codigo = [];
        for (i++; i < linhas.length && !/^\s*```/.test(linhas[i]); i++) codigo.push(linhas[i]);
        const pre = el("pre");
        pre.append(el("code", "", codigo.join("\n")));
        destino.append(pre);
        continue;
      }

      const item = linha.match(/^\s*(?:[-*]|(\d+)\.)\s+(.*)$/);
      if (item) {
        fecharParagrafo();
        const tipo = item[1] ? "OL" : "UL";
        if (!lista || lista.tagName !== tipo) {
          lista = el(tipo.toLowerCase());
          destino.append(lista);
        }
        const li = el("li");
        inline(item[2], li);
        lista.append(li);
        continue;
      }

      if (linha.trim() === "") {
        fecharParagrafo();
        lista = null;
        continue;
      }

      lista = null;
      const titulo = linha.match(/^#{1,6}\s+(.*)$/);
      const citacao = linha.match(/^>\s?(.*)$/);
      if (titulo) {
        fecharParagrafo();
        const p = el("p");
        const strong = el("strong");
        inline(titulo[1], strong);
        p.append(strong);
        destino.append(p);
      } else if (citacao) {
        fecharParagrafo();
        const blockquote = el("blockquote");
        inline(citacao[1], blockquote);
        destino.append(blockquote);
      } else {
        paragrafo.push(linha.trim());
      }
    }
    fecharParagrafo();
  }

  // --- Interface ---

  function montar() {
    const botao = /** @type {HTMLButtonElement} */ (el("button", "rubi-botao", "Pergunte à Rubi"));
    botao.type = "button";
    botao.setAttribute("aria-label", "Pergunte à Rubi, a tutora com IA do guia");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "rubi-painel");

    const painel = el("section", "rubi-painel");
    painel.id = "rubi-painel";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-modal", "false");
    painel.setAttribute("aria-labelledby", "rubi-titulo");
    painel.hidden = true;

    const cabecalho = el("header", "rubi-cabecalho");
    const titulos = el("div");
    const titulo = el("h2", "rubi-titulo", "Rubi");
    titulo.id = "rubi-titulo";
    titulos.append(titulo, el("p", "rubi-subtitulo", "Assistente com IA do guia"));
    const fechar = /** @type {HTMLButtonElement} */ (el("button", "rubi-fechar", "×"));
    fechar.type = "button";
    fechar.setAttribute("aria-label", "Fechar o chat");
    cabecalho.append(titulos, fechar);

    const mensagens = el("div", "rubi-mensagens");
    mensagens.setAttribute("aria-live", "polite");

    // Pedido do código do workshop.
    const formCodigo = /** @type {HTMLFormElement} */ (el("form", "rubi-form-codigo"));
    const rotuloCodigo = /** @type {HTMLLabelElement} */ (el("label", "", "Código do workshop"));
    rotuloCodigo.htmlFor = "rubi-codigo";
    const campoCodigo = /** @type {HTMLInputElement} */ (el("input"));
    campoCodigo.id = "rubi-codigo";
    campoCodigo.autocomplete = "off";
    campoCodigo.required = true;
    const entrar = /** @type {HTMLButtonElement} */ (el("button", "btn btn-primary", "Entrar"));
    entrar.type = "submit";
    formCodigo.append(
      rotuloCodigo,
      el("p", "rubi-ajuda", "O código é divulgado no dia do workshop. Se você não tem, peça para a organização."),
      campoCodigo,
      entrar,
    );

    // Pergunta.
    const formPergunta = /** @type {HTMLFormElement} */ (el("form", "rubi-form-pergunta"));
    const rotuloPergunta = /** @type {HTMLLabelElement} */ (el("label", "sr-only", "Sua pergunta"));
    rotuloPergunta.htmlFor = "rubi-pergunta";
    const campoPergunta = /** @type {HTMLTextAreaElement} */ (el("textarea"));
    campoPergunta.id = "rubi-pergunta";
    campoPergunta.rows = 2;
    campoPergunta.maxLength = 2000;
    campoPergunta.placeholder = "Escreva a sua dúvida";
    const enviar = /** @type {HTMLButtonElement} */ (el("button", "btn btn-primary", "Enviar"));
    enviar.type = "submit";
    const linhaPergunta = el("div", "rubi-linha");
    linhaPergunta.append(campoPergunta, enviar);
    const restantes = el("p", "rubi-restantes");
    formPergunta.append(
      rotuloPergunta,
      linhaPergunta,
      el("p", "rubi-aviso", "Não cole senhas, chaves nem dados pessoais. Confira as respostas com o guia."),
      restantes,
    );

    painel.append(cabecalho, mensagens, formCodigo, formPergunta);
    document.body.append(botao, painel);

    return { botao, painel, fechar, mensagens, formCodigo, campoCodigo, entrar, formPergunta, campoPergunta, enviar, restantes };
  }

  function iniciar() {
    const ui = montar();
    let ocupado = false;

    /** @param {string} texto */
    function mensagemDoSistema(texto, classe = "rubi-sistema") {
      const p = el("p", "rubi-mensagem " + classe, texto);
      ui.mensagens.append(p);
      ui.mensagens.scrollTop = ui.mensagens.scrollHeight;
      return p;
    }

    /** @param {string} texto */
    function mensagemDaPessoa(texto) {
      const div = el("div", "rubi-mensagem rubi-pessoa");
      div.append(el("span", "sr-only", "Você: "));
      div.append(texto);
      ui.mensagens.append(div);
    }

    /** @param {string} texto @param {boolean} avaliar */
    function mensagemDaRubi(texto, avaliar) {
      const div = el("div", "rubi-mensagem rubi-resposta");
      const conteudo = el("div", "rubi-conteudo");
      renderizar(texto, conteudo);
      div.append(el("span", "sr-only", "Rubi: "), conteudo);
      if (avaliar) div.append(botoesDeAvaliacao());
      ui.mensagens.append(div);
      return { div, conteudo };
    }

    function botoesDeAvaliacao() {
      const grupo = el("div", "rubi-avaliacao");
      const pagina = location.pathname;
      /** @type {[string, "up" | "down", string][]} */
      const opcoes = [
        ["👍", "up", "Resposta útil"],
        ["👎", "down", "Resposta não ajudou"],
      ];
      const botoes = opcoes.map(([icone, nota, rotulo]) => {
        const botao = /** @type {HTMLButtonElement} */ (el("button", "rubi-nota", icone));
        botao.type = "button";
        botao.setAttribute("aria-label", rotulo);
        botao.setAttribute("aria-pressed", "false");
        botao.addEventListener("click", async () => {
          botoes.forEach((b) => (b.disabled = true));
          botao.setAttribute("aria-pressed", "true");
          try {
            await fetch(API + "/api/feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: "Bearer " + ler(sessionStorage, CHAVE_TOKEN) },
              body: JSON.stringify({ page: pagina, rating: nota }),
            });
            grupo.append(el("span", "rubi-obrigado", "Valeu pela avaliação!"));
          } catch (e) {
            botoes.forEach((b) => (b.disabled = false));
            botao.setAttribute("aria-pressed", "false");
          }
        });
        return botao;
      });
      grupo.append(...botoes);
      return grupo;
    }

    function mostrarFormulario() {
      const temToken = Boolean(ler(sessionStorage, CHAVE_TOKEN));
      ui.formCodigo.hidden = temToken;
      ui.formPergunta.hidden = !temToken;
    }

    function boasVindas() {
      mensagemDoSistema(
        "Boas-vindas! Eu sou a Rubi, uma assistente com inteligência artificial. Posso ajudar com dúvidas sobre o guia e o app Mural de recados, com dicas para você chegar lá. Eu posso errar: confira com o guia ou com alguém da mentoria.",
      );
    }

    function abrir() {
      ui.painel.hidden = false;
      ui.botao.setAttribute("aria-expanded", "true");
      ui.botao.hidden = true;
      mostrarFormulario();
      (ui.formCodigo.hidden ? ui.campoPergunta : ui.campoCodigo).focus();
      ui.mensagens.scrollTop = ui.mensagens.scrollHeight;
    }

    function fecharPainel() {
      ui.painel.hidden = true;
      ui.botao.hidden = false;
      ui.botao.setAttribute("aria-expanded", "false");
      ui.botao.focus();
    }

    // Lê a mensagem de erro da API (sempre em português) ou usa uma genérica.
    /** @param {Response} resposta */
    async function erroDaApi(resposta) {
      try {
        const corpo = await resposta.json();
        if (corpo && typeof corpo.error === "string") return corpo.error;
      } catch (e) {
        // Resposta sem JSON.
      }
      return "A Rubi não conseguiu responder agora. Tente de novo em instantes.";
    }

    /** @param {SubmitEvent} evento */
    async function entrarComCodigo(evento) {
      evento.preventDefault();
      if (ocupado) return;
      ocupado = true;
      ui.entrar.disabled = true;
      try {
        const resposta = await fetch(API + "/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: ui.campoCodigo.value }),
        });
        if (!resposta.ok) {
          mensagemDoSistema(await erroDaApi(resposta), "rubi-erro");
          ui.campoCodigo.focus();
          return;
        }
        const { token } = await resposta.json();
        gravar(sessionStorage, CHAVE_TOKEN, token);
        ui.campoCodigo.value = "";
        mostrarFormulario();
        mensagemDoSistema("Tudo certo! Pode perguntar.");
        ui.campoPergunta.focus();
      } catch (e) {
        mensagemDoSistema("Não consegui falar com a Rubi. Confira a sua conexão e tente de novo.", "rubi-erro");
      } finally {
        ocupado = false;
        ui.entrar.disabled = false;
      }
    }

    /** @param {SubmitEvent} evento */
    async function perguntar(evento) {
      evento.preventDefault();
      const pergunta = ui.campoPergunta.value.trim();
      if (!pergunta || ocupado) return;
      ocupado = true;
      ui.enviar.disabled = true;

      const conversa = lerConversa();
      mensagemDaPessoa(pergunta);
      ui.campoPergunta.value = "";
      const carregando = mensagemDoSistema("A Rubi está pensando…", "rubi-carregando");

      try {
        const resposta = await fetch(API + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + ler(sessionStorage, CHAVE_TOKEN) },
          body: JSON.stringify({
            question: pergunta,
            page: location.pathname,
            history: conversa.slice(-MENSAGENS_NO_HISTORICO),
          }),
        });

        if (!resposta.ok || !resposta.body) {
          carregando.remove();
          mensagemDoSistema(await erroDaApi(resposta), "rubi-erro");
          if (resposta.status === 401) {
            gravar(sessionStorage, CHAVE_TOKEN, null);
            mostrarFormulario();
            ui.campoCodigo.focus();
          }
          return;
        }

        const restam = resposta.headers.get("X-Questions-Remaining");
        ui.restantes.textContent =
          restam !== null && Number(restam) <= 10 ? `Você ainda pode fazer ${restam} perguntas hoje.` : "";

        // A resposta chega aos poucos; cada pedaço redesenha o texto.
        carregando.remove();
        const { div, conteudo } = mensagemDaRubi("", false);
        div.setAttribute("aria-busy", "true");
        const leitor = resposta.body.getReader();
        const decodificador = new TextDecoder();
        let texto = "";
        for (;;) {
          const { done, value } = await leitor.read();
          if (done) break;
          texto += decodificador.decode(value, { stream: true });
          renderizar(texto, conteudo);
          ui.mensagens.scrollTop = ui.mensagens.scrollHeight;
        }
        texto += decodificador.decode();
        renderizar(texto, conteudo);
        div.removeAttribute("aria-busy");
        div.append(botoesDeAvaliacao());

        conversa.push({ role: "user", content: pergunta }, { role: "assistant", content: texto });
        gravarConversa(conversa);
      } catch (e) {
        carregando.remove();
        mensagemDoSistema("Não consegui falar com a Rubi. Confira a sua conexão e tente de novo.", "rubi-erro");
      } finally {
        ocupado = false;
        ui.enviar.disabled = false;
        ui.campoPergunta.focus();
      }
    }

    // Mostra a conversa desta aba, guardada entre as páginas do guia.
    boasVindas();
    for (const mensagem of lerConversa()) {
      if (mensagem.role === "user") mensagemDaPessoa(mensagem.content);
      else mensagemDaRubi(mensagem.content, false);
    }

    ui.botao.addEventListener("click", abrir);
    ui.fechar.addEventListener("click", fecharPainel);
    ui.painel.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") fecharPainel();
    });
    ui.formCodigo.addEventListener("submit", entrarComCodigo);
    ui.formPergunta.addEventListener("submit", perguntar);
    // Enter envia; Shift+Enter quebra a linha.
    ui.campoPergunta.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" && !evento.shiftKey) {
        evento.preventDefault();
        ui.formPergunta.requestSubmit();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
