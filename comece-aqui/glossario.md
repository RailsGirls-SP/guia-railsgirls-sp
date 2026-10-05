---
title: Glossário
parent: Comece aqui
nav_order: 6
---

# Glossário

![Uma mulher com uma lupa grande, procurando algo numa página]({{ '/assets/images/buscando.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

<div class="busca-glossario">
<label for="busca-termo">Buscar no glossário</label>
<input id="busca-termo" type="search" placeholder="Digite um termo, como servidor ou rota" autocomplete="off">
<p id="busca-vazia" hidden>Nenhum termo encontrado.</p>
</div>

Os termos marcados com <span class="label label-purple">Para ir além</span> não são necessários para o workshop: ficam aqui para quem quiser se aprofundar.

<div class="grupo-termos" markdown="1">

## Como a web funciona
{: #grupo-como-a-web-funciona }

<details class="termo" id="navegador" markdown="1">
<summary>Navegador</summary>

O **navegador** é o programa que você usa para abrir sites, como Chrome, Firefox, Safari e Edge.

Ele pede as páginas para o [servidor](#servidor) e mostra o resultado na tela. Na analogia do capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}), ele é a atendente que leva o seu pedido e traz a página pronta.

</details>

<details class="termo" id="requisicao" markdown="1">
<summary>Requisição (request)</summary>

Uma **requisição** (em inglês, *request*) é o pedido que o [navegador](#navegador) faz ao app: "me mostra a página `/messages`", "guarda este recado novo". Toda vez que você abre um endereço, clica num link ou envia um formulário, o navegador manda uma requisição.

O app recebe a requisição, decide o que fazer e devolve uma **resposta** (em inglês, *response*): normalmente, uma página pronta. No Rails, quem recebe a requisição é a [rota](#rota), que manda para o [controller](#controller) certo.

</details>

<details class="termo" id="servidor" markdown="1">
<summary>Servidor</summary>

A palavra **servidor** tem dois sentidos:

- **O programa** que fica esperando [requisições](#requisicao) do [navegador](#navegador) e devolve as páginas. No Rails, é o que liga quando você roda `bin/rails server` (um programa chamado Puma).
- **O computador** onde esse programa roda, que fica ligado o tempo todo para o site estar no ar. "Colocar um site num servidor" quer dizer deixá-lo num computador desses.

Neste guia, "o servidor" quase sempre quer dizer o programa.

</details>

<details class="termo" id="html" markdown="1">
<summary>HTML</summary>

**HTML** é a língua em que as páginas da web são escritas. Ele diz **o que** tem na página: um título, um parágrafo, uma imagem, um botão, um formulário.

Cada parte da página fica entre marcações chamadas **tags**, como `<h1>` para um título e `<p>` para um parágrafo:

```html
<h1>Mural de recados</h1>
<p>Adorei o workshop!</p>
```

O [navegador](#navegador) lê o HTML e mostra a página. No Rails, as [views](#view) são arquivos HTML com pedaços de Ruby misturados (os arquivos `.html.erb`).

</details>

<details class="termo" id="css" markdown="1">
<summary>CSS</summary>

**CSS** é a língua que diz **como** a página aparece: cores, tamanhos, fontes, espaços e a posição de cada coisa na tela.

Se o [HTML](#html) é o conteúdo da página, o CSS é a decoração. Por exemplo, esta regra deixa todos os títulos `<h1>` vermelhos:

```css
h1 {
  color: red;
}
```

Muitas vezes, em vez de escrever todo o CSS do zero, usa-se uma biblioteca pronta, com estilos para botões, cartões e formulários.

</details>

<details class="termo" id="javascript" markdown="1">
<summary>JavaScript</summary>

**JavaScript** (muitas vezes abreviado como **JS**) é a [linguagem de programação](#linguagem-de-programacao) que roda dentro do [navegador](#navegador). Ela deixa a página interativa sem precisar carregar outra página: abrir um menu, mostrar uma mensagem quando você clica, conferir um formulário enquanto você digita.

Resumindo os três: o [HTML](#html) diz o que tem na página, o [CSS](#css) diz como ela aparece, e o JavaScript diz o que ela faz quando você interage. O [Ruby](#ruby) roda no [servidor](#servidor); o JavaScript roda no navegador.

Apesar do nome parecido, JavaScript não tem nada a ver com Java, que é outra linguagem.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Ferramentas
{: #grupo-ferramentas }

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
- **Comandos são fáceis de repetir e compartilhar.** Alguém da equipe de mentoria pode te mandar o comando exato, e você copia e cola. Com cliques, seria preciso descrever cada passo.
- **Funciona em computadores sem tela,** como os servidores na internet que deixam os sites no ar.

Quando o terminal termina uma tarefa e está pronto para o próximo comando, ele mostra uma linha terminando em `$`. No codespace, o terminal fica na parte de baixo da tela e dá ordens para o computador na nuvem, não para o seu.

Também é chamado de **linha de comando** ou **shell**. Veja os comandos mais usados em [Terminal básico]({{ site.baseurl }}{% link comece-aqui/terminal-basico.md %}).

</details>

<details class="termo" id="console" markdown="1">
<summary>Console</summary>

Neste guia, **console** quase sempre quer dizer o **console do Rails**: um jeito de conversar com o seu app escrevendo código [Ruby](#ruby), sem passar pelo navegador. Você abre com o comando `bin/rails console`, dentro do [terminal](#terminal).

O terminal entende comandos do computador, como `bin/rails server`. Já o console do Rails entende Ruby e conhece o seu app: dá para escrever `Message.count` e ver na hora quantos recados existem. Para sair do console e voltar ao terminal, digite `exit`. Você usa o console pela primeira vez em [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}).

Fora deste guia, a palavra "console" também pode aparecer com outros sentidos, como sinônimo de terminal ou como o painel de ferramentas do navegador.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Git e GitHub
{: #grupo-git-e-github }

<details class="termo" id="git" markdown="1">
<summary>Git</summary>

O **Git** é um programa que guarda o histórico de um projeto: cada versão importante fica registrada, e você pode ver o que mudou, quando e por quê, ou voltar para uma versão anterior se algo der errado.

É parecido com o histórico de versões de um documento on-line, com uma diferença: no Git, é você quem decide quando registrar uma versão, e cada registro ganha uma mensagem explicando a mudança. Esses registros são os [commits](#commit).

O Git não é o [GitHub](#github): o **Git** é o programa que guarda o histórico; o **GitHub** é um site que guarda os projetos na internet. Veja mais em [Git básico]({{ site.baseurl }}{% link comece-aqui/git-basico.md %}).

</details>

<details class="termo" id="github" markdown="1">
<summary>GitHub</summary>

O **GitHub** é um site que guarda [repositórios](#repositorio) na internet. Com ele, o seu projeto fica salvo fora do seu computador, você pode trabalhar de qualquer lugar e outras pessoas podem ver o código e colaborar.

Além de guardar o código, o GitHub tem várias ferramentas. Algumas que aparecem neste guia:

- **Codespaces:** computadores na nuvem para programar pelo navegador, como o que você usa no workshop.
- **Pull requests:** pedidos de mudança no código, que alguém revisa antes de aceitar.
- **GitHub Pages:** publica sites a partir de um repositório. Este guia é publicado assim.

O GitHub usa o [Git](#git) por baixo, mas os dois não são a mesma coisa: o Git é o programa que guarda o histórico; o GitHub é o site onde esse histórico fica guardado e compartilhado. Para criar a sua conta, veja [Criando uma conta no GitHub]({{ site.baseurl }}{% link comece-aqui/conta-no-github.md %}).

</details>

<details class="termo" id="commit" markdown="1">
<summary>git commit</summary>

Um **commit** (em inglês, pronuncia-se mais ou menos *co-MIT*, com a força no fim) é um registro de como o projeto está num certo momento, com uma mensagem dizendo o que mudou. Por exemplo: `Cria o app Mural de recados`.

Pense num álbum de fotos do projeto: cada commit é uma foto, com uma legenda. Se algo der errado depois, dá para olhar as fotos antigas e voltar para uma delas.

Um commit fica primeiro só no computador onde você está trabalhando. No terminal, o comando para criar um commit é `git commit`. Para ele chegar ao GitHub, é preciso fazer um [`git push`](#push-e-pull).

No Brasil, muita gente fala *CÔ-mit*, e todo mundo entende do mesmo jeito.

</details>

<details class="termo" id="push-e-pull" markdown="1">
<summary>git push e git pull</summary>

Um [commit](#commit) fica primeiro só no computador onde você está trabalhando (no workshop, o codespace). Para ele chegar ao [GitHub](#github), é preciso enviá-lo:

- **push** (empurrar): manda os seus commits para o GitHub;
- **pull** (puxar): traz do GitHub os commits que você ainda não tem no seu computador.

No terminal, os comandos são `git push` e `git pull`. No painel Source Control, o botão **Sync Changes** faz os dois de uma vez: primeiro o pull, depois o push. É isso que diz a janela que aparece no passo **Guarde o seu progresso** de [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}): "This action will pull and push commits".

</details>

<details class="termo" id="repositorio" markdown="1">
<summary>Repositório</summary>

Um **repositório** é a pasta de um projeto junto com todo o histórico dele, ou seja, todos os [commits](#commit).

Ele pode ficar no seu computador e também num site como o GitHub, onde outras pessoas podem ver o código e ajudar. No Mural de recados, o seu repositório se chama `mural-de-recados` e foi criado a partir de um modelo do Rails Girls SP.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Rails
{: #grupo-rails }

<details class="termo" id="framework" markdown="1">
<summary>Framework</summary>

Um **framework** é um conjunto de ferramentas e regras prontas para resolver problemas que quase todo projeto tem, para você se concentrar no que é só do seu.

Em vez de construir do zero como o app recebe requisições, guarda dados e monta páginas, você usa o que o framework já traz e segue o jeito de organizar que ele propõe. É como cozinhar numa cozinha já equipada, em vez de começar construindo o fogão.

O [Rails](#rails) é um framework.

</details>

<details class="termo" id="rails" markdown="1">
<summary>Rails</summary>

O **Rails**, ou **Ruby on Rails**, é um [framework](#framework) para criar aplicações web, escrito na linguagem Ruby. Ele existe desde 2004 e é usado em sites como o GitHub e o Shopify.

Ele organiza o app em partes com papéis bem definidos ([rota](#rota), [controller](#controller), [model](#model) e [view](#view)) e traz comandos prontos, como o `rails new`, que cria a estrutura de um app inteiro.

</details>

<details class="termo" id="convencao" markdown="1">
<summary>Convenção</summary>

Uma **convenção** é um combinado sobre como fazer as coisas: que nome dar, em que pasta colocar cada arquivo. Ninguém é obrigada a seguir, mas, seguindo, todo mundo se entende sem precisar explicar.

O [Rails](#rails) usa muitas convenções. Se você segue o combinado, ele encontra e liga as peças sozinho, sem você configurar nada. No app Mural de recados, por exemplo:

- o [model](#model) `Message`, no singular, usa a tabela `messages`, no plural;
- a [rota](#rota) `messages#index` leva ao `MessagesController`, [ação](#acao) `index`;
- a ação `index` mostra a [view](#view) que está em `app/views/messages/index.html.erb`.

Quem programa em Rails resume essa ideia como *convention over configuration*: convenção em vez de configuração.

</details>

<details class="termo" id="rota" markdown="1">
<summary>Rota</summary>

A **rota** liga um endereço a uma parte do código. Quando o navegador pede `/messages` (a lista de recados), é a rota que diz qual [controller](#controller) vai cuidar dessa [requisição](#requisicao).

Funciona como um mapa de endereços do app. As rotas ficam todas num arquivo só, o `config/routes.rb`.

</details>

<details class="termo" id="controller" markdown="1">
<summary>Controller</summary>

O **controller** é a parte do app que recebe a [requisição](#requisicao) do navegador, depois que a [rota](#rota) encaminhou, e decide o que fazer com ela. É ele que junta os dados com a parte visual do app: por exemplo, busca os recados no [model](#model) e entrega para a [view](#view), que monta a página.

Pense numa chef de cozinha: ela recebe o pedido, pega os ingredientes certos e manda montar o prato. Ela mesma não guarda os ingredientes nem decora o prato, mas coordena tudo.

No app Mural de recados, o controller dos recados se chama `MessagesController`.

</details>

<details class="termo" id="acao" markdown="1">
<summary>Ação (action)</summary>

Uma **ação** (em inglês, *action*) é cada coisa que um [controller](#controller) sabe fazer. Por exemplo, a ação `index` do `MessagesController` mostra a lista de recados.

No Rails, as ações têm nomes em inglês que seguem uma [convenção](#convencao). Estas são as mais comuns:

| Ação | Tradução | O que faz | No Mural de recados |
|---|---|---|---|
| `index` | índice, lista | mostra a lista de itens | ver todos os recados |
| `show` | mostrar | mostra um item só | ver um recado |
| `new` | novo | mostra o formulário para criar um item | abrir o formulário de recado |
| `create` | criar | guarda o item novo | postar o recado |
| `edit` | editar | mostra o formulário para mudar um item | abrir um recado para corrigir |
| `update` | atualizar | guarda as mudanças | salvar a correção |
| `destroy` | destruir, apagar | apaga o item | apagar um recado |

Juntas, essas ações formam o [CRUD](#crud): criar (`new` e `create`), ler (`index` e `show`), atualizar (`edit` e `update`) e apagar (`destroy`).

</details>

<details class="termo" id="model" markdown="1">
<summary>Model</summary>

O **model** é a parte do app que representa as informações e as regras sobre elas. É ele que conversa com o [banco de dados](#banco-de-dados) para guardar e buscar dados.

No app Mural de recados, o model `Message` (o recado) sabe que um recado tem `author` (autora) e `content` (a mensagem). As regras também ficam nele, como "um recado não pode ser vazio".

</details>

<details class="termo" id="validacao" markdown="1">
<summary>Validação</summary>

Uma **validação** é uma regra que diz se uma informação pode ser guardada. Por exemplo: "um recado precisa ter o nome de quem escreveu" ou "a mensagem pode ter no máximo 280 caracteres". Se a regra não for cumprida, o app recusa a informação e avisa o que falta.

No Rails, as validações ficam no [model](#model), com o `validates`. Você escreve as primeiras no capítulo [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}).

</details>

<details class="termo" id="view" markdown="1">
<summary>View</summary>

A **view** é a parte do app que monta o que aparece na tela. No app Mural de recados, é a view que mostra o formulário e os cartões com os recados.

Ela recebe as informações do [controller](#controller) e só cuida da apresentação. Na cozinha, seria a montagem do prato: os ingredientes já estão prontos, e a view decide como eles aparecem.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Banco de dados
{: #grupo-banco-de-dados }

<details class="termo" id="banco-de-dados" markdown="1">
<summary>Banco de dados</summary>

O **banco de dados** é onde o app guarda as informações para que elas não sumam quando alguém fecha o navegador. No app Mural de recados, é onde ficam os recados.

Dá para pensar nele como uma planilha: cada tipo de informação ganha uma **tabela**, cada recado é uma **linha** e cada informação do recado, como autora e mensagem, é uma **coluna**.

Mas o banco de dados é bem mais esperto que uma planilha. É como ter várias planilhas interligadas: uma tabela pode apontar para as linhas de outra. Por exemplo, uma tabela de respostas pode dizer a qual recado cada resposta pertence. O banco também encontra informações rapidinho, mesmo entre milhões de linhas, deixa várias pessoas usarem ao mesmo tempo sem uma atrapalhar a outra e segue regras que impedem dados errados, como uma linha sem informação obrigatória.

O app Mural de recados usa o **SQLite**, um banco de dados que fica num único arquivo dentro do projeto e que o Rails já deixa configurado.

</details>

<details class="termo" id="persistencia" markdown="1">
<summary>Persistência de dados</summary>

**Persistência** é a capacidade de um app guardar as informações de um jeito que elas continuem existindo depois que ele é fechado ou reiniciado. Quando um recado fica no mural de recados mesmo depois que a pessoa fecha o navegador, ou no dia seguinte, os dados estão **persistidos**.

No Rails, quem cuida disso é o [model](#model), que guarda e busca as informações no [banco de dados](#banco-de-dados).

</details>

<details class="termo" id="migration" markdown="1">
<summary>Migration (migração)</summary>

Uma **migration** (em português, **migração**; em inglês, pronuncia-se mais ou menos *mai-GRÊI-xan*) é um arquivo com instruções para mudar a estrutura do [banco de dados](#banco-de-dados): criar uma tabela, acrescentar uma coluna, mudar o tipo de uma informação.

Pense numa planta de reforma: em vez de mexer na casa direto, você descreve a mudança num papel, e alguém segue as instruções. Assim fica registrado o que mudou e em que ordem, e qualquer pessoa consegue montar o mesmo banco de dados do zero.

No Rails, as migrations ficam na pasta `db/migrate`, e você aplica as que ainda não rodaram com o comando `bin/rails db:migrate`.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Testes
{: #grupo-testes }

<details class="termo" id="teste-automatizado" markdown="1">
<summary>Teste automatizado <span class="label label-purple">Para ir além</span></summary>

Um **teste automatizado** é um pequeno programa que confere se outra parte do código funciona como deveria. Por exemplo: um teste pode tentar salvar um recado vazio e conferir se o app recusa.

Pense numa lista de checagem que se confere sozinha: em vez de você abrir o app e testar tudo com o mouse a cada mudança, os testes fazem isso em segundos, sempre do mesmo jeito. Se algo que funcionava quebrar, eles avisam.

O `rails new` já cria uma pasta `test` no projeto, e os testes rodam com o comando `bin/rails test`. No Mural de recados, a gente ainda não escreve testes: a conferência é feita à mão, nos passos **Confira** e **Quebre de propósito**.

</details>

<details class="termo" id="ci" markdown="1">
<summary>CI (integração contínua) <span class="label label-purple">Para ir além</span></summary>

**CI** vem do inglês *continuous integration* (integração contínua): rodar os [testes](#teste-automatizado) e outras verificações automaticamente toda vez que alguém manda código novo para o [GitHub](#github).

No GitHub, quem roda essas verificações é o **GitHub Actions**. O resultado aparece ao lado do commit: um ✅ verde quando tudo passou e um ❌ vermelho quando alguma verificação falhou.

O `rails new` já cria uma configuração de CI no arquivo `.github/workflows/ci.yml`. Por isso, o seu repositório pode mostrar um ❌ ao lado do commit mesmo sem você ter escrito nenhum teste: não é um erro seu, e o app continua funcionando.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Programação
{: #grupo-programacao }

<details class="termo" id="programa" markdown="1">
<summary>Programa de computador (ou app)</summary>

Um **programa** é um conjunto de instruções que o computador segue para fazer alguma tarefa. Também é chamado de **software**, **aplicativo** ou **app**.

O navegador, o WhatsApp e o próprio Mural de recados são programas. Alguns rodam no seu computador ou celular; outros, como os sites e os apps da web, rodam num [servidor](#servidor), e você usa pelo [navegador](#navegador).

As instruções de um programa são escritas numa [linguagem de programação](#linguagem-de-programacao). É a receita da analogia do capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}): sozinha ela não faz nada, alguém precisa seguir.

</details>

<details class="termo" id="linguagem-de-programacao" markdown="1">
<summary>Linguagem de programação</summary>

Uma **linguagem de programação** é um jeito de escrever instruções que o computador consegue seguir. O código é texto, escrito com palavras e símbolos dessa linguagem.

É parecida com uma língua como o português, só que muito mais rígida: cada palavra tem um significado exato, e uma vírgula fora do lugar pode fazer o computador não entender nada. Por isso as mensagens de erro são tão comuns, e aprender a lê-las faz parte de programar.

Existem muitas linguagens, cada uma com os seus pontos fortes. Alguns exemplos: [Ruby](#ruby), Python e JavaScript.

</details>

<details class="termo" id="ruby" markdown="1">
<summary>Ruby</summary>

**Ruby** é a [linguagem de programação](#linguagem-de-programacao) usada neste guia. Ela foi criada no Japão, por Yukihiro Matsumoto, e lançada em 1995, com um objetivo declarado: ser agradável para quem programa.

O código em Ruby costuma ser fácil de ler, quase como uma frase em inglês. Por exemplo:

```ruby
3.times { puts "Olá!" }
```

Esse código mostra "Olá!" três vezes.

O [Rails](#rails) é escrito em Ruby, e o código do seu app também. Na analogia do capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}), o Ruby é a cozinheira que lê e segue a receita.

</details>

<details class="termo" id="indentacao" markdown="1">
<summary>Indentação</summary>

**Indentação** é o espaço no começo de uma linha de código. Ela mostra o que está **dentro** do quê, como os recuos de uma lista dentro de outra.

Veja o controller do app Mural de recados:

```ruby
class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end
end
```

O `def index` tem dois espaços porque está dentro do `class`. A linha do `@messages` tem quatro porque está dentro do `def index`. E cada `end` fica alinhado com o começo do bloco que ele fecha.

**Por que é importante:**

- **Fica mais fácil de ler.** Batendo o olho, você vê onde cada bloco começa e termina.
- **Ajuda a achar erros.** Um `end` esquecido ou sobrando fica visível quando a indentação está certa. Com tudo grudado na margem, é quase impossível de perceber.
- **É o combinado de quem programa.** Em Ruby, o costume é usar dois espaços por nível. Seguindo o costume, o seu código fica parecido com os exemplos que você vai encontrar.

No Ruby, a indentação não muda o que o programa faz: ela serve para as pessoas que leem o código. Em outras linguagens, como o Python, ela faz parte das regras, e uma indentação errada quebra o programa.

O editor ajuda: ao apertar **Enter** dentro de um bloco, ele já coloca os espaços da próxima linha. Para recuar ou desfazer o recuo de várias linhas, selecione as linhas e aperte **Tab** ou **Shift+Tab**.

</details>

<details class="termo" id="variavel" markdown="1">
<summary>Variável</summary>

Uma **variável** é um nome que guarda um valor, para você usar esse valor depois.

Pense numa caixa com uma etiqueta: a etiqueta é o nome, e o que está dentro é o valor. Em Ruby:

```ruby
author = "Ana"
```

Daqui em diante, `author` (autora) quer dizer `"Ana"`. E dá para trocar o conteúdo da caixa: se depois você escrever `author = "Bia"`, a mesma etiqueta passa a guardar outro valor.

</details>

<details class="termo" id="nil" markdown="1">
<summary>nil e null</summary>

**`nil`** é o jeito de o [Ruby](#ruby) dizer "nada": a informação não existe ou ainda não foi preenchida. Em inglês, *nil* quer dizer nada, zero.

No [banco de dados](#banco-de-dados), a mesma ideia se chama **`NULL`** (nulo). Quando um recado é guardado sem autora, a coluna `author` fica `NULL` no banco de dados, e o Ruby mostra `nil`.

Repare que "nada" é diferente de zero e de um texto vazio:

| Valor | Quer dizer |
|---|---|
| `nil` | não tem nenhuma informação |
| `0` | tem um número, e ele é zero |
| `""` | tem um texto, mas sem nenhuma letra |

Você vê o `nil` pela primeira vez no "Quebre de propósito" de [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}).

</details>

<details class="termo" id="bug" markdown="1">
<summary>Bug</summary>

Um **bug** (em inglês, "inseto"; pronuncia-se *bâg*) é um defeito num programa: algo que faz o programa se comportar diferente do que deveria. Por exemplo, um mural de recados que mostra a autora no lugar da mensagem.

Uma mensagem de erro e um bug não são a mesma coisa. A mensagem de erro é o programa avisando que algo deu errado, e costuma ajudar a achar o problema. Já um bug pode acontecer sem nenhum aviso: o programa funciona, só que do jeito errado.

Procurar e corrigir bugs se chama **depurar** (em inglês, *debug*). Todo mundo que programa passa boa parte do tempo fazendo isso: encontrar bugs faz parte do trabalho, e não quer dizer que você é ruim nisso.

Uma curiosidade: em 1947, a equipe da cientista da computação Grace Hopper encontrou uma mariposa presa dentro de um computador, o Mark II, e colou o inseto no caderno de anotações como "o primeiro caso de um bug de verdade". A palavra já era usada para defeitos, mas a história ficou famosa.

</details>

</div>

<div class="grupo-termos" markdown="1">

## Planejamento
{: #grupo-planejamento }

<details class="termo" id="mvp" markdown="1">
<summary>MVP</summary>

**MVP** vem do inglês *minimum viable product* (produto mínimo viável): a menor versão de um projeto que já resolve o problema de alguém.

Em vez de construir tudo de uma vez, você começa por algo simples que já funciona e melhora em etapas. No Mural de recados, o MVP é postar e ver recados; corrigir, apagar e as cores vêm depois. Veja a ideia completa, com a analogia do skate ao carro, em [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem).

</details>

<details class="termo" id="crud" markdown="1">
<summary>CRUD</summary>

**CRUD** são as iniciais, em inglês, das quatro ações básicas de quase todo sistema que guarda informações:

| Em inglês | Em português | No Mural de recados |
|---|---|---|
| **C**reate | criar | postar um recado |
| **R**ead | ler | ver os recados |
| **U**pdate | atualizar | corrigir um recado |
| **D**elete | apagar | apagar um recado |

Uma rede social, uma loja e uma agenda fazem essas mesmas quatro coisas, cada uma com as suas informações. Veja como elas aparecem no plano do mural de recados em [Planejando o app]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}).

</details>

</div>

<div class="grupo-termos" markdown="1">

## IA
{: #grupo-ia }

<details class="termo" id="ia" markdown="1">
<summary>IA (inteligência artificial)</summary>

**IA**, ou **inteligência artificial**, é o nome geral para programas que fazem tarefas que antes pareciam exigir uma pessoa: reconhecer imagens, traduzir textos, responder perguntas, escrever código.

Quando este guia fala em IA, quase sempre é a **IA generativa**: programas treinados com uma quantidade enorme de textos e código, que geram respostas novas a partir do que você pede. Por trás deles estão os **modelos de linguagem** (em inglês, *large language models*, ou LLMs).

Eles não pensam nem entendem como uma pessoa: geram a resposta que parece mais provável para o seu pedido. Por isso podem acertar muito e, às vezes, [inventar](#alucinacao) coisas com toda a confiança.

</details>

<details class="termo" id="ferramentas-de-ia" markdown="1">
<summary>Ferramentas de IA para programação <span class="label label-purple">Para ir além</span></summary>

Existem muitas ferramentas que usam IA para ajudar a programar. Elas mudam rápido, mas dá para separar em dois tipos:

| Tipo | Como funciona | Exemplos |
|---|---|---|
| **Assistentes de conversa** | Você escreve uma pergunta num chat, e a IA responde. Para usar o código, você copia e cola. | ChatGPT (da OpenAI), Claude (da Anthropic), Gemini (do Google) |
| **Ferramentas no editor e no terminal** | Ficam dentro do lugar onde você programa: sugerem código enquanto você digita, conversam sobre os seus arquivos e, em alguns casos, mudam arquivos e rodam comandos por você. | GitHub Copilot (é o painel de chat que aparece no codespace), Cursor (um editor de código com IA embutida), Claude Code (trabalha no terminal) |

Quando uma ferramenta pode mudar arquivos e rodar comandos sozinha, ela está trabalhando como **agente**. É poderoso, mas você precisa conferir o que ela fez, porque o código continua sendo responsabilidade de quem programa.

Neste guia, a recomendação é usar qualquer uma delas como uma tutora, e não como alguém que faz por você: peça explicações, faça você cada passo e nunca rode um comando que você não entendeu. Veja um exemplo na seção "Preciso de IA para este capítulo?" de [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/o-que-aconteceu.md %}).

</details>

<details class="termo" id="alucinacao" markdown="1">
<summary>Alucinação <span class="label label-purple">Para ir além</span></summary>

Quando uma IA **alucina**, ela inventa algo que parece certo, mas não é: um comando que não existe, uma regra que você nunca pediu ou uma explicação errada dita com toda a confiança.

Isso acontece porque a IA gera respostas que soam prováveis, e não necessariamente verdadeiras. Por isso, tudo o que uma IA sugere precisa ser conferido, e é mais fácil conferir quando você pede uma coisa pequena de cada vez. Veja mais em [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem).

</details>

<details class="termo" id="contexto" markdown="1">
<summary>Contexto <span class="label label-purple">Para ir além</span></summary>

O **contexto** é tudo o que a IA leva em conta ao mesmo tempo para responder: o seu pedido, a conversa até ali, o código que você mostrou e as decisões tomadas antes.

Pense numa pessoa que recebe trinta instruções de uma vez: é mais fácil ela esquecer ou misturar alguma do que se receber três. Com a IA é parecido: quanto mais coisas no contexto, mais fácil algo se perder ou ser [inventado](#alucinacao). Pedidos curtos e etapas pequenas mantêm o contexto sob controle.

</details>

</div>

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
    // Esconde os grupos sem nenhum termo encontrado (e os TODOs durante a busca).
    Array.prototype.forEach.call(document.querySelectorAll(".grupo-termos"), function (g) {
      var visiveis = g.querySelectorAll("details.termo:not([hidden])").length;
      g.hidden = !!q && visiveis === 0;
      Array.prototype.forEach.call(g.querySelectorAll("ul"), function (ul) {
        if (!ul.closest("details")) ul.hidden = !!q;
      });
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
