// Progresso do "Mão na massa": a participante marca os passos que já fez.
// As marcações ficam só no navegador (localStorage), uma lista por página.
(function () {
  const CHAVE = "guia-rg:progresso:" + location.pathname;

  function ler() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch (e) {
      return null;
    }
  }

  function salvar(lista) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (e) {
      // Sem localStorage (janela anônima, por exemplo): a marcação só vale até recarregar.
    }
  }

  // O nome do passo, sem o número, para a marcação sobreviver se a ordem mudar.
  function nomeDoPasso(passo) {
    const summary = passo.querySelector(":scope > summary");
    return summary.textContent.trim().replace(/^\d+\.\s*/, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const passos = Array.from(document.querySelectorAll("details.passo"));
    const titulo = document.querySelector("#main-content h1");
    if (passos.length === 0 || !titulo) return;

    let concluidos = ler();
    if (concluidos === null) return;

    // Contador e botão de recomeçar, logo abaixo do título da página.
    const painel = document.createElement("div");
    painel.className = "progresso";
    painel.innerHTML =
      '<p class="progresso-contador" aria-live="polite"></p>' +
      '<button type="button" class="progresso-recomecar">Recomeçar</button>' +
      '<p class="progresso-aviso">Marque cada passo quando terminar. As marcações ficam só neste navegador.</p>';
    titulo.insertAdjacentElement("afterend", painel);
    const contador = painel.querySelector(".progresso-contador");
    const recomecar = painel.querySelector(".progresso-recomecar");

    function atualizar() {
      let feitos = 0;
      passos.forEach(function (passo) {
        const feito = concluidos.includes(nomeDoPasso(passo));
        passo.classList.toggle("passo-concluido", feito);
        passo.querySelector(".progresso-marcar input").checked = feito;
        if (feito) feitos++;
      });
      contador.textContent =
        feitos === passos.length
          ? "Você concluiu todos os " + passos.length + " passos desta página! 🎉"
          : feitos + " de " + passos.length + " passos concluídos";
      // Sem nenhum passo marcado, não há o que recomeçar.
      recomecar.disabled = feitos === 0;
    }

    // Uma caixa "Concluí este passo" em cada passo, antes do "Terminou? Abra o passo...".
    passos.forEach(function (passo, i) {
      const rotulo = document.createElement("label");
      rotulo.className = "progresso-marcar";
      rotulo.innerHTML = '<input type="checkbox"> Concluí este passo';
      const terminou = Array.from(passo.querySelectorAll(":scope > p")).find(function (p) {
        return p.textContent.trim().startsWith("Terminou?");
      });
      if (terminou) {
        passo.insertBefore(rotulo, terminou);
      } else {
        passo.appendChild(rotulo);
      }

      rotulo.querySelector("input").addEventListener("change", function (evento) {
        const nome = nomeDoPasso(passo);
        concluidos = concluidos.filter(function (n) { return n !== nome; });
        if (evento.target.checked) {
          concluidos.push(nome);
          // Fecha o passo concluído e leva para o próximo, já aberto.
          passo.open = false;
          const proximo = passos[i + 1];
          if (proximo) {
            proximo.open = true;
            proximo.querySelector(":scope > summary").focus({ preventScroll: true });
            proximo.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            painel.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        salvar(concluidos);
        atualizar();
      });
    });

    recomecar.addEventListener("click", function () {
      if (!window.confirm("Desmarcar todos os passos desta página?")) return;
      concluidos = [];
      salvar(concluidos);
      atualizar();
    });

    // Ao voltar à página: passos concluídos fechados e o primeiro que falta, aberto.
    if (concluidos.length > 0) {
      let abriu = false;
      passos.forEach(function (passo) {
        const feito = concluidos.includes(nomeDoPasso(passo));
        passo.open = !feito && !abriu;
        if (!feito) abriu = true;
      });
    }

    atualizar();
  });
})();
