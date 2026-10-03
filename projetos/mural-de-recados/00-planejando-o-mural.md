---
title: "Planejando o mural"
parent: Mural de recados
grand_parent: Projetos
nav_order: 1
---

# Planejando o mural

Tempo: uns 20 minutos. Você só vai precisar de papel e caneta.
{: .fs-5 }

## O desafio

Imagine o fim do workshop. Todo mundo quer deixar uma mensagem: um agradecimento para a mentora, um "consegui!" depois do primeiro app, um oi para quem vem na próxima edição.

Numa parede, cada pessoa pegaria um post-it, escreveria a mensagem, assinaria e colaria. O seu desafio hoje é construir esse mural, só que na web: um **mural de recados** em que cada recado aparece como um cartão e qualquer pessoa pode deixar o seu.

![Uma pessoa colando um papel num mural onde já existem outros recados]({{ '/assets/images/mural-fisico.svg' | relative_url }})
{: .ilustracao }

{: .pensando }
Antes de escrever qualquer linha de código, quem programa faz duas coisas: **entende o problema** e **planeja a solução**. É isso que você vai fazer agora.

## Pense antes de programar

Pegue papel e caneta e reserve de 10 a 15 minutos. Não existe resposta errada: o objetivo é você pensar, não acertar.

**1. Quais telas o mural precisa ter?**
Desenhe cada tela com caixas, campos e botões. Não precisa ficar bonito. Pense no caminho de quem chega no mural pela primeira vez: o que ela vê? Onde ela clica para postar um recado?

**2. Que informações um recado tem?**
Pense no post-it: o que está escrito nele? Quem escreveu? O que mais um recado precisa ter? Para cada informação, anote se ela é um texto curto, um texto longo ou uma escolha entre algumas opções.

**3. O que uma pessoa pode fazer com um recado?**
Postar um recado novo é uma ação. Que outras ações fazem sentido? Pense no que você faria se escrevesse algo errado.

**4. O que poderia dar errado?**
Que recados não deveriam aparecer no mural? Imagine alguém com pressa, alguém distraída, alguém querendo testar os limites.

{: .dica }
Guarde o seu papel. Você vai voltar a ele em todos os capítulos.

## Compare com o nosso plano

Só abra depois de fazer o seu. Se o seu plano for diferente, tudo bem: compare e pense no motivo de cada diferença.

<details markdown="1">
<summary>Abrir o nosso plano</summary>

### As telas

A tela principal tem tudo junto: o formulário para postar um recado em cima e o mural com os cartões embaixo. Cada cartão tem botões para editar e apagar:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto da tela principal. -->
```
┌────────────────────────────────────────────────┐
│  Mural de recados                              │
│                                                │
│  Seu nome:  [__________________]               │
│  Recado:    [__________________]               │
│             [__________________]               │
│             ( Postar recado )                  │
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

Para corrigir um recado, uma segunda tela mostra o mesmo formulário, já preenchido com o recado escolhido:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto da tela de correção. -->
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

Por exemplo: para impedir que alguém apague o recado de outra pessoa, o mural precisaria saber quem é quem. Cada pessoa teria que criar uma conta e entrar com e-mail e senha, e cada recado teria que guardar quem é a dona. Isso é quase um projeto inteiro. Para um mural do workshop, em que todo mundo está na mesma sala, a gente aceita esse risco e deixa para depois.

</details>

## O plano guia o resto do projeto

Cada capítulo daqui pra frente resolve um pedaço deste plano:

| Do plano | Capítulo |
|---|---|
| Um lugar para o mural existir | [Como começar o projeto?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-como-comecar-o-projeto.md %}) |
| As informações de um recado | [Onde os recados ficam guardados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-onde-os-recados-ficam-guardados.md %}) |
| Ver todos os recados | [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados.md %}) |
| Postar um recado | [Como postar um recado?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado.md %}) |
| Corrigir e apagar | [Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar.md %}) |
| O visual dos cartões | [Como fazer um mural que dá vontade de usar?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-um-mural-que-da-vontade-de-usar.md %}) |
| O que pode dar errado | [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio.md %}) |
| Outras pessoas usando o mural | [Como mostrar o mural para o mundo?]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo.md %}) |

As quatro ações do plano (postar, ver, corrigir e apagar) aparecem em quase todo sistema que guarda informações: uma rede social, uma loja, uma agenda. Quem programa chama esse conjunto de **CRUD**, das iniciais em inglês de criar, ler, atualizar e apagar. Veja no [glossário]({{ site.baseurl }}{% link comece-aqui/glossario.md %}).

### Um mural que funciona a cada etapa

A gente não vai construir o mural inteiro de uma vez. Ele cresce em etapas, e **ao fim de cada uma o mural já funciona**:

| [Etapa do MVP]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem) | O que o mural já faz | Capítulos |
|---|---|---|
| 🛹 | Postar e ver recados | 01 a 04 |
| 🛴 | Corrigir e apagar recados | 05 |
| 🚲 | Cartões coloridos, com a cor escolhida por quem escreveu | 06 |
| 🏍️ | Não aceitar recado vazio | 07 |
| 🚗 | No ar, para qualquer pessoa usar | 08 |

Se o tempo acabar no meio do caminho, você não fica com metade de um mural: fica com um mural que funciona, só que mais simples.

## E se fosse com IA?

<details markdown="1">
<summary>Abrir</summary>

Compare estes dois pedidos para uma ferramenta de IA.

**Pedido 1: sem plano**

> Faz um mural de recados em Rails.

**Pedido 2: com o seu plano**

> Faz um mural de recados em Rails. Cada recado tem autora (texto curto) e mensagem (texto longo). Uma página mostra o formulário para postar um recado e, embaixo, os recados como cartões, cada um com botões de editar e apagar. Não aceitar recado sem autora ou sem mensagem, nem mensagens com mais de 280 caracteres.

Os dois vão gerar código. Mas, com o pedido 1, a IA precisa **inventar** cada decisão que você tomou no seu plano: quais informações um recado tem, como a tela é organizada, se um recado vazio é aceito. Ela vai escolher alguma coisa, e talvez não seja o que você queria.

O pedido 2 é o seu plano escrito em frases. Com ele, você consegue **conferir** o resultado: está tudo que o plano pede? Um recado vazio é recusado?

**Experimente:** leia o pedido 1 de novo e liste três decisões que a IA teria que inventar. Depois confira: o seu plano responde a todas elas?

</details>

## Não esqueça

- Antes de programar, entenda o problema: quem vai usar, o que a pessoa quer fazer, o que pode dar errado.
- Um bom plano responde três perguntas: **como as pessoas vão usar** (no mural, as telas), **quais informações** e **quais regras**.
- Postar, ver, corrigir e apagar formam o CRUD, que aparece em quase todo sistema.
- Decidir o que fica de fora, ou para depois, também faz parte do plano.
- O mural cresce em etapas, e funciona ao fim de cada uma.
- Com ou sem IA, é o plano que permite conferir se o resultado está certo.
