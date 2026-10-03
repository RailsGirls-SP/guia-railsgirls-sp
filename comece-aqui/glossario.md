---
title: Glossário
parent: Comece aqui
nav_order: 4
---

# Glossário

<div class="busca-glossario">
<label for="busca-termo">Buscar no glossário</label>
<input id="busca-termo" type="search" placeholder="Digite um termo, como servidor ou rota" autocomplete="off">
<p id="busca-vazia" hidden>Nenhum termo encontrado.</p>
</div>

- TODO: migration
- TODO: CRUD
- TODO: MVP
- TODO: alucinação (IA)
- TODO: contexto (IA)
- TODO: variável
- TODO: Git
- TODO: commit
- TODO: repositório

<details class="termo" id="banco-de-dados" markdown="1">
<summary>Banco de dados</summary>

O **banco de dados** é onde o app guarda as informações para que elas não sumam quando alguém fecha o navegador. No app Mural de recados, é onde ficam os recados.

Ele funciona como uma planilha bem organizada: cada tipo de informação ganha uma **tabela**, cada recado é uma **linha** e cada informação do recado, como autora e mensagem, é uma **coluna**.

O app Mural de recados usa o **SQLite**, um banco de dados que fica num único arquivo dentro do projeto e que o Rails já deixa configurado.

</details>

<details class="termo" id="controller" markdown="1">
<summary>Controller</summary>

O **controller** é a parte do app que recebe o pedido e decide o que fazer com ele. Por exemplo: buscar os recados no [model](#model) e escolher qual [view](#view) vai mostrar a resposta.

Pense numa chef de cozinha: ela recebe o pedido, pega os ingredientes certos e manda montar o prato. Ela mesma não guarda os ingredientes nem decora o prato, mas coordena tudo.

No app Mural de recados, o controller dos recados se chama `RecadosController`.

</details>

<details class="termo" id="framework" markdown="1">
<summary>Framework</summary>

Um **framework** é um conjunto de ferramentas e regras prontas para resolver problemas que quase todo projeto tem, para você se concentrar no que é só do seu.

Em vez de construir do zero como o app recebe pedidos, guarda dados e monta páginas, você usa o que o framework já traz e segue o jeito de organizar que ele propõe. É como cozinhar numa cozinha já equipada, em vez de começar construindo o fogão.

O [Rails](#rails) é um framework.

</details>

<details class="termo" id="model" markdown="1">
<summary>Model</summary>

O **model** é a parte do app que representa as informações e as regras sobre elas. É ele que conversa com o [banco de dados](#banco-de-dados) para guardar e buscar dados.

No app Mural de recados, o model `Recado` sabe que um recado tem autora e mensagem. As regras também ficam nele, como "um recado não pode ser vazio".

</details>

<details class="termo" id="navegador" markdown="1">
<summary>Navegador</summary>

O **navegador** é o programa que você usa para abrir sites, como Chrome, Firefox, Safari e Edge.

Ele pede as páginas para o [servidor](#servidor) e mostra o resultado na tela. Na analogia do capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}), ele é a atendente que leva o seu pedido e traz a página pronta.

</details>

<details class="termo" id="rails" markdown="1">
<summary>Rails</summary>

O **Rails**, ou **Ruby on Rails**, é um [framework](#framework) para criar aplicações web, escrito na linguagem Ruby. Ele existe desde 2004 e é usado em sites como o GitHub e o Shopify.

Ele organiza o app em partes com papéis bem definidos ([rota](#rota), [controller](#controller), [model](#model) e [view](#view)) e traz comandos prontos, como o `rails new`, que cria a estrutura de um app inteiro.

</details>

<details class="termo" id="rota" markdown="1">
<summary>Rota</summary>

A **rota** liga um endereço a uma parte do código. Quando o navegador pede `/recados`, é a rota que diz qual [controller](#controller) vai cuidar desse pedido.

Funciona como um mapa de endereços do app. As rotas ficam todas num arquivo só, o `config/routes.rb`.

</details>

<details class="termo" id="servidor" markdown="1">
<summary>Servidor</summary>

A palavra **servidor** tem dois sentidos:

- **O programa** que fica esperando pedidos do [navegador](#navegador) e devolve as páginas. No Rails, é o que liga quando você roda `bin/rails server` (um programa chamado Puma).
- **O computador** onde esse programa roda, que fica ligado o tempo todo para o site estar no ar. "Colocar um site num servidor" quer dizer deixá-lo num computador desses.

Neste guia, "o servidor" quase sempre quer dizer o programa.

</details>

<details class="termo" id="terminal" markdown="1">
<summary>Terminal</summary>

O **terminal** é uma forma de interagir com o computador por texto: em vez de clicar, você escreve.

No dia a dia, você usa o computador por uma **interface gráfica**: telas com janelas, ícones e botões que você aponta e clica com o mouse. O terminal é uma **interface de texto**: em vez de clicar, você escreve um **comando**, aperta **Enter**, e o computador responde também por escrito.

Os dois fazem muitas das mesmas coisas. Por exemplo, para criar uma pasta chamada `receitas`:

| Na interface gráfica | No terminal |
|---|---|
| Clicar com o botão direito, escolher **Nova pasta** e digitar o nome `receitas` | Escrever `mkdir receitas` e apertar **Enter** |

Por que quem programa usa tanto o terminal?

- **Muitas ferramentas só existem nele.** O Rails, por exemplo, não tem botões: você usa por comandos.
- **Um comando faz o trabalho de muitos cliques.** O `rails new` cria dezenas de arquivos de uma vez.
- **Comandos são fáceis de repetir e compartilhar.** Uma mentora pode te mandar o comando exato, e você copia e cola. Com cliques, ela teria que descrever cada passo.
- **Funciona em computadores sem tela,** como os servidores na internet que deixam os sites no ar.

Quando o terminal termina uma tarefa e está pronto para o próximo comando, ele mostra uma linha terminando em `$`. No codespace, o terminal fica na parte de baixo da tela e dá ordens para o computador na nuvem, não para o seu.

Também é chamado de **linha de comando**, **console** ou **shell**. Veja os comandos mais usados em [Terminal básico]({{ site.baseurl }}{% link comece-aqui/terminal-basico.md %}).

</details>

<details class="termo" id="view" markdown="1">
<summary>View</summary>

A **view** é a parte do app que monta o que aparece na tela. No app Mural de recados, é a view que mostra o formulário e os cartões com os recados.

Ela recebe as informações do [controller](#controller) e só cuida da apresentação. Na cozinha, seria a montagem do prato: os ingredientes já estão prontos, e a view decide como eles aparecem.

</details>

<script>
(function () {
  var norm = function (t) { return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); };
  var termos = Array.prototype.slice.call(document.querySelectorAll("details.termo"));
  var campo = document.getElementById("busca-termo");
  var vazio = document.getElementById("busca-vazia");

  // Filtra os termos enquanto a pessoa digita; abre os que têm o termo no título.
  campo.addEventListener("input", function () {
    var q = norm(campo.value.trim());
    var achados = 0;
    termos.forEach(function (d) {
      var ok = !q || norm(d.textContent).indexOf(q) !== -1;
      d.hidden = !ok;
      d.open = !!q && norm(d.querySelector("summary").textContent).indexOf(q) !== -1;
      if (ok) achados++;
    });
    vazio.hidden = achados > 0;
  });

  // Quem chega por um link como glossario.html#terminal encontra o termo aberto.
  function abreDoEndereco() {
    var d = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView(); }
  }
  window.addEventListener("hashchange", abreDoEndereco);
  abreDoEndereco();
})();
</script>
