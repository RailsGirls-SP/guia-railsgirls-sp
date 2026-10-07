---
title: "00. Planejando o app"
parent: Mural de recados
grand_parent: Projetos
nav_order: 1
---

# 00. Planejando o app

Tempo: uns 20 minutos. Você só vai precisar de papel e caneta.
{: .fs-5 }

## O desafio

Imagine o fim do workshop. Todo mundo quer deixar uma mensagem: um agradecimento para a equipe de mentoria, um "consegui!" depois do primeiro app, um oi para quem vem na próxima edição.

Numa parede, cada pessoa pegaria um post-it, escreveria a mensagem, assinaria e colaria. O seu desafio hoje é construir esse **mural de recados**, só que na web: cada recado aparece como um cartão e qualquer pessoa pode deixar o seu.

![Uma pessoa colando um papel num mural onde já existem outros recados]({{ '/assets/images/mural-fisico.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

{: .pensando }
Antes de escrever qualquer linha de código, quem programa faz duas coisas: **entende o problema** e **planeja a solução**. É isso que você vai fazer agora.

## Pense antes de programar

![Uma mulher organizando notas coloridas num quadro]({{ '/assets/images/organizando-ideias.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Pegue papel e caneta e reserve de 10 a 15 minutos. Não existe resposta errada: o objetivo é você pensar, não acertar.

**1. Quais telas o mural de recados precisa ter?**
Desenhe cada tela com caixas, campos e botões. Não precisa ficar bonito. Pense no caminho de quem chega no mural de recados pela primeira vez: o que ela vê? Onde ela clica para postar um recado?

**2. Que informações um recado tem?**
Pense no post-it: o que está escrito nele? Quem escreveu? O que mais um recado precisa ter? Para cada informação, anote se ela é um texto curto, um texto longo ou uma escolha entre algumas opções.

**3. O que uma pessoa pode fazer com um recado?**
Postar um recado novo é uma ação. Que outras ações fazem sentido? Pense no que você faria se escrevesse algo errado.

**4. O que poderia dar errado?**
Que recados não deveriam aparecer no mural de recados? Imagine alguém com pressa, alguém distraída, alguém querendo testar os limites.

{: .dica }
Guarde o seu papel. Você vai voltar a ele em todos os capítulos.

## Compare com o nosso plano

![Uma mulher num quadro branco, explicando um plano com um caminho que dá certo e outro que dá errado]({{ '/assets/images/explicando-o-plano.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Só abra depois de fazer o seu. Se o seu plano for diferente, tudo bem: compare e pense no motivo de cada diferença.

<details markdown="1">
<summary>Abrir o nosso plano</summary>

### As telas

A tela principal mostra o mural de recados, com os cartões, e um botão para postar um recado novo. Cada cartão tem botões para editar e apagar:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  Mural de recados                              │
│                                                │
│  ( Novo recado )                               │
│                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ Bem-vindas │ │ Adorei o   │ │ Meu 1º app │  │
│  │ ao mural!  │ │ workshop   │ │ em Rails!  │  │
│  │ — Ana      │ │ — Bia      │ │ — Carla    │  │
│  │            │ │            │ │            │  │
│  │ editar     │ │ editar     │ │ editar     │  │
│  │ apagar     │ │ apagar     │ │ apagar     │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Descrição da tela principal: no topo, o título Mural de recados. Embaixo, o botão Novo recado. Mais abaixo, três cartões lado a lado, cada um com uma mensagem, o nome de quem escreveu (Ana, Bia e Carla) e os links editar e apagar.
{: .sr-only }

O botão **Novo recado** abre uma segunda tela, só com o formulário para escrever o recado:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  Novo recado                                   │
│                                                │
│  Seu nome:  [__________________]               │
│  Recado:    [__________________]               │
│             [__________________]               │
│             ( Postar recado )  voltar          │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Descrição da tela do recado novo: o título Novo recado, o formulário com os campos Seu nome e Recado, vazios, o botão Postar recado e o link voltar.
{: .sr-only }

Para corrigir um recado, uma terceira tela mostra o mesmo formulário, já preenchido com o recado escolhido:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  Corrigir recado                               │
│                                                │
│  Seu nome:  [ Bia______________]               │
│  Recado:    [ Adorei o worksop_]               │
│             [__________________]               │
│             ( Salvar )  voltar                 │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Descrição da tela de correção: o título Corrigir recado, o formulário com os campos Seu nome e Recado já preenchidos com o recado da Bia, com o erro de digitação "Adorei o worksop", o botão Salvar e o link voltar.
{: .sr-only }

### As informações de um recado

| Informação | Exemplo | Tipo |
|---|---|---|
| Autora | Bia | texto curto |
| Mensagem | Adorei o workshop! | texto longo |

### As ações

- **Postar** um recado novo.
- **Ver** todos os recados no mural.
- **Corrigir** um recado.
- **Apagar** um recado.

### O que pode dar errado

| O problema | O que a gente faz |
|---|---|
| Um recado sem mensagem, ou sem o nome de quem escreveu | resolve no capítulo 07 |
| Uma mensagem enorme, que não cabe no cartão | resolve no capítulo 07 |
| Apagar um recado sem querer | resolve no capítulo 05 |
| Alguém apagar o recado de outra pessoa | aceita por enquanto |

Algumas dessas a gente resolve neste projeto. Outras a gente decide aceitar por enquanto, e isso também é uma decisão de quem programa: nenhum sistema resolve tudo de uma vez.

Por exemplo: para impedir que alguém apague o recado de outra pessoa, o app Mural de recados precisaria saber quem é quem. Cada pessoa teria que criar uma conta e entrar com e-mail e senha, e cada recado teria que guardar quem é a dona. Isso é quase um projeto inteiro. Para um mural de recados do workshop, em que todo mundo está na mesma sala, a gente aceita esse risco e deixa para depois.

</details>

## O plano guia o resto do projeto

Cada capítulo daqui pra frente resolve um pedaço deste plano:

| Do plano | Capítulo |
|---|---|
| Um lugar para o mural de recados existir | [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}) |
| As informações de um recado | [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/index.md %}) |
| Ver todos os recados | [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/index.md %}) |
| Postar um recado | [Como postar um recado?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/index.md %}) |
| Corrigir e apagar | [Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/index.md %}) |
| O visual dos cartões | [Como deixar o mural de recados mais bonito?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/index.md %}) |
| O que pode dar errado | [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}) |
| Outras pessoas usando o mural de recados | [Como mostrar o mural de recados para o mundo?]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/index.md %}) |

As quatro ações do plano (postar, ver, corrigir e apagar) aparecem em quase todo sistema que guarda informações: uma rede social, uma loja, uma agenda. Quem programa chama esse conjunto de **CRUD**, das iniciais em inglês de criar, ler, atualizar e apagar. Veja no [glossário]({{ site.baseurl }}{% link glossario.md %}).

### Um mural de recados que funciona a cada etapa

A gente não vai construir o mural de recados inteiro de uma vez. Ele cresce em etapas, e **ao fim de cada uma o mural de recados já funciona**:

| [Etapa do MVP]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem) | O que o mural de recados já faz | Capítulos |
|---|---|---|
| 🛹 | Postar e ver recados | 01 a 04 |
| 🛴 | Corrigir e apagar recados | 05 |
| 🚲 | Cartões com cara de post-it | 06 |
| 🏍️ | Não aceitar recado vazio | 07 |
| 🚗 | No ar, para qualquer pessoa usar | 08 (opcional) |

Se o tempo acabar no meio do caminho, você não fica com metade de um mural de recados: fica com um mural de recados que funciona, só que mais simples.

E começar pelo mínimo ajuda a gastar tempo só com o que faz diferença para quem vai usar: o mural de recados fica pronto mais cedo, as pessoas já podem deixar os seus recados, e você descobre com elas o que vale a pena fazer depois.

## E se fosse com IA?

<details markdown="1">
<summary>Abrir</summary>

Compare estes dois pedidos para uma ferramenta de IA.

**Pedido 1: sem plano**

> Faz um mural de recados em Rails.

**Pedido 2: com o seu plano**

> Faz um mural de recados em Rails. Cada recado tem autora (texto curto) e mensagem (texto longo). A página principal mostra os recados como cartões, cada um com botões de editar e apagar, e um botão "Novo recado", que abre uma página com o formulário para postar. Não aceitar recado sem autora ou sem mensagem, nem mensagens com mais de 280 caracteres.

Os dois vão gerar código. Mas, com o pedido 1, a IA precisa **inventar** cada decisão que você tomou no seu plano: quais informações um recado tem, como a tela é organizada, se um recado vazio é aceito. Ela vai escolher alguma coisa, e talvez não seja o que você queria.

O pedido 2 é o seu plano escrito em frases. Com ele, você consegue **conferir** o resultado: está tudo que o plano pede? Um recado vazio é recusado?

**Experimente:** leia o pedido 1 de novo e liste três decisões que a IA teria que inventar. Depois confira: o seu plano responde a todas elas?

</details>

## Não esqueça

- Antes de programar, entenda o problema: quem vai usar, o que a pessoa quer fazer, o que pode dar errado.
- Um bom plano responde três perguntas: **como as pessoas vão usar** (no mural de recados, as telas), **quais informações** e **quais regras**.
- Postar, ver, corrigir e apagar formam o CRUD, que aparece em quase todo sistema.
- Decidir o que fica de fora, ou para depois, também faz parte do plano.
- O mural de recados cresce em etapas, e funciona ao fim de cada uma.
- Com ou sem IA, é o plano que permite conferir se o resultado está certo.
