---
title: Projetos
nav_order: 4
has_children: true
---

# Projetos

Aqui você aprende a programar construindo um app de verdade, do começo ao fim. Cada projeto é dividido em capítulos curtos, e cada capítulo começa por um problema: primeiro você planeja, depois programa.

## Os projetos

| Projeto | O que você constrói | Para quem |
|---|---|---|
| [Mural de recados]({{ site.baseurl }}{% link projetos/mural-de-recados/index.md %}) | Um mural de recados na web, onde qualquer pessoa deixa um recado, que aparece como um post-it. Dá para postar, ver, corrigir e apagar. | Quem nunca programou. É o projeto do workshop. |

Novos projetos vão aparecer aqui, cada um um pouco mais avançado que o anterior.

## Por onde começar

Se é a sua primeira vez, comece pelo [Mural de recados]({{ site.baseurl }}{% link projetos/mural-de-recados/index.md %}). Ele não pede nenhum conhecimento de programação e apresenta, um capítulo de cada vez, as peças que quase todo app Rails tem. Antes, confira se você já tem o que precisa em [Comece aqui]({{ site.baseurl }}{% link comece-aqui/index.md %}).

## Como os projetos crescem

![Uma estrada com curvas, com um carro chegando a um ponto marcado no mapa]({{ '/assets/images/caminho-ate-o-destino.png' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Imagine que alguém precisa ir de casa até o trabalho, e você vai construir um jeito de levar essa pessoa. Existem dois caminhos.

**Construir o carro peça por peça.** Primeiro uma roda, depois o eixo, depois a carroceria. Durante todo esse tempo, a pessoa continua a pé: uma roda sozinha não leva ninguém a lugar nenhum. Ela só consegue usar alguma coisa no final.

**Construir algo que funciona a cada etapa:**

🛹 → 🛴 → 🚲 → 🏍️ → 🚗

Primeiro um skate: simples, mas já leva a pessoa até o trabalho. Depois um patinete, que é mais confortável. Depois uma bicicleta, uma moto e, por fim, o carro. Em todas as etapas a pessoa já consegue chegar. E, a cada etapa, você aprende o que ela realmente precisa: talvez a bicicleta já seja suficiente.

Os projetos deste guia seguem o segundo caminho. Cada projeto começa pela **menor versão que já resolve o problema** e melhora a cada capítulo. Se o tempo acabar no meio do caminho, você não fica com metade de um projeto: fica com um projeto que funciona, só que mais simples.

{: .pensando }
Escolher o mínimo que já resolve o problema (qual parte é o skate) e o que fica para depois é uma das decisões mais importantes de quem programa. No mercado, essa primeira versão é chamada de **MVP**, do inglês *minimum viable product* (produto mínimo viável). Veja no [glossário]({{ site.baseurl }}{% link glossario.md %}).

{: .ia }
> Construir em etapas vale também quando a IA escreve o código. Se você pede o carro inteiro de uma vez, recebe muito código de uma vez só, difícil de ler e de conferir. Se pede o skate primeiro, recebe um pedaço pequeno: dá para testar, entender e corrigir antes de pedir o próximo. Quando algo dá errado, você sabe em qual etapa procurar.
>
> Pedidos grandes também aumentam a chance de a IA **alucinar**, ou seja, inventar algo que parece certo mas não é, como um comando que não existe ou uma regra que você nunca pediu. Tudo o que a IA precisa levar em conta ao mesmo tempo (o seu pedido, o código que já existe, as decisões tomadas até ali) se chama **contexto**. Pense numa pessoa que recebe trinta instruções de uma vez: é mais fácil ela esquecer ou misturar alguma do que se receber três. Com a IA é parecido: quanto mais coisas no contexto, mais fácil algo se perder ou ser inventado. Etapas pequenas mantêm o contexto pequeno.
>
> E tem o custo. Cada pedido para a IA gasta dinheiro ou uma parte do seu limite de uso, e cada resposta gasta o seu tempo para ler e testar. Se você pede o projeto inteiro e o resultado não é o que você queria, foi muito gasto para jogar fora. Se você pede só o skate e ele vem errado, o prejuízo é pequeno: você ajusta o pedido e tenta de novo.

### Referências

- **O conceito:** [Produto viável mínimo](https://pt.wikipedia.org/wiki/Produto_vi%C3%A1vel_m%C3%ADnimo), na Wikipédia (também em [inglês](https://en.wikipedia.org/wiki/Minimum_viable_product), mais completo).
- **A analogia do skate ao carro:** [Making sense of MVP](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp), de Henrik Kniberg (em inglês).
