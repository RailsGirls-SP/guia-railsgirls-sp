---
title: Por que aprender a programar?
nav_order: 2
---

# Por que aprender a programar?

Hoje, ferramentas de IA escrevem código em segundos. Então por que passar um dia aprendendo a programar?

Porque escrever código é só uma parte do trabalho. A IA é uma assistente muito rápida, mas alguém precisa saber **o que pedir**, **conferir o que veio** e **decidir o que fazer** quando algo não sai como o esperado. Esse alguém é você.

## O que continua sendo trabalho de quem programa

![Uma mulher no notebook, com uma lista de itens para marcar ao lado e um café]({{ '/assets/images/checklist-no-notebook.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Em qualquer projeto, algumas partes do trabalho continuam com quem programa. Uma IA pode ajudar em todas elas: sugerir ideias, lembrar casos que você esqueceu, explicar um erro. Mas quem decide e quem confere é você, porque tudo depende do que **você** quer construir e de quem vai usar:

- **Entender o problema antes da solução.** Antes de escrever qualquer código, quem programa responde perguntas como: quem vai usar o app? O que essa pessoa quer fazer? Todo projeto do guia começa assim, com um planejamento no papel, desenhando as telas.
- **Decidir quais informações guardar.** No Mural de recados, por exemplo, um recado tem quem escreveu e a mensagem. Precisa de mais alguma coisa? A data, talvez? Quem programa chama isso de **modelar os dados**, e é uma escolha sua.
- **Prever o que pode dar errado.** E se alguém mandar um recado vazio? E uma mensagem enorme? Uma IA pode prever esses casos ou não, e às vezes cria regras que você não pediu. Quem decide o que é um erro, e o que fazer quando ele acontece, é você.
- **Ler e conferir o código.** Geradores e IAs economizam digitação, mas às vezes criam coisas que você não pediu. Conferir o que entrou e tirar o que não faz falta deixa o código mais simples de entender e de mudar. E, se você usar uma IA, ela também trabalha melhor: com menos código para ler, ela se confunde menos e gasta menos, porque as ferramentas cobram ou limitam o uso pelo tamanho do que a IA lê e escreve (veja [contexto]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#contexto)).
- **Entender os erros.** Quando algo quebra, a mensagem de erro diz o que falta. Saber ler essa mensagem é o que te deixa resolver por conta própria, com ou sem IA.

Você vai praticar cada uma dessas partes no projeto [Mural de recados]({{ site.baseurl }}{% link projetos/mural-de-recados/index.md %}).

## Pedir em etapas pequenas

![Uma pessoa marcando etapas como concluídas, uma de cada vez, numa linha do tempo]({{ '/assets/images/etapas-concluidas.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Se você pedir para uma IA "fazer um mural de recados", ela vai entregar dezenas de arquivos de uma vez. Fica difícil saber se está tudo certo, e mais difícil ainda achar o problema quando algo der errado.

Quem programa prefere construir em **etapas pequenas**: primeiro o mínimo que já funciona, depois o resto, uma parte de cada vez. Assim, dá para conferir cada etapa antes de seguir. É a ideia do skate ao carro, em [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem), e vale também para os pedidos que você faz a uma IA.

## Saber o nome de cada peça

![Uma pessoa encaixando a última peça de um quebra-cabeça]({{ '/assets/images/quebra-cabeca.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Um app Rails tem peças com nomes próprios: **rota**, **controller**, **view**, **model**, **migration**. Você vai conhecer cada uma no projeto. Saber esses nomes muda o jeito de pedir ajuda, para uma IA ou para uma pessoa:

**1. Um pedido vago:**

> Faz o meu app aceitar recados.

**2. Um pedido melhor, sabendo o que o app precisa fazer:**

> Quero que as pessoas possam postar recados no meu app. Cada recado tem o nome de quem escreveu e a mensagem, e precisa continuar lá mesmo depois que a pessoa fechar o navegador. Um recado sem nome ou sem mensagem não pode ser aceito.

**3. Um pedido ainda mais preciso, sabendo também o nome de cada peça:**

> No meu app Rails, crie a ação `create` no `MessagesController`, que guarda o recado com `author` e `content` e volta para a lista de recados. No model `Message`, valide que `author` e `content` são obrigatórios.

O primeiro pedido deixa quase tudo para a IA adivinhar.

O segundo já diz o que importa para quem vai usar: os recados ficam guardados (quem programa chama isso de **[persistência dos dados]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#persistencia)**) e existem regras para aceitar um recado (as **[validações]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#validacao)**). É o tipo de pedido que alguém que conhece bem o problema, mas não programa, consegue fazer.

O terceiro é melhor quando você já tem um app e quer acrescentar uma parte nele, como no projeto. Por quê?

- **A IA não precisa adivinhar como o seu app está organizado.** Ela usa os nomes que já existem (`Message`, `author`, `content`), em vez de inventar outros, como um `Post` com `title` e `body`, que não combinam com o resto do seu código.
- **A mudança fica pequena e no lugar certo.** Você pede uma ação e uma regra. Sem isso, é comum a IA mexer em vários arquivos de uma vez, ou criar páginas que você não pediu.
- **Fica fácil conferir.** Você sabe exatamente o que deveria mudar: a ação `create` no controller e a validação no model. Se a resposta mexer em outra coisa, você percebe na hora.

Saber os nomes das peças também ajuda a entender o que a IA responde.

## A IA como aliada

![Uma pessoa conversando com uma IA pelo computador]({{ '/assets/images/conversa-com-ia.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

A IA pode ser uma ótima tutora: explica uma mensagem de erro, responde uma dúvida a qualquer hora, mostra outro jeito de fazer. Veja como em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

O que o guia defende é que você **entenda** o que está construindo. Quem entende consegue usar a IA para ir mais rápido, sem perder o controle do próprio projeto. Em vários capítulos, a seção **Preciso de IA para este capítulo?** mostra como seria pedir aquela etapa para uma IA e o que conferir no resultado.

## Por que os termos ficam em inglês?

![Uma mulher olhando para um planeta com o mapa do mundo]({{ '/assets/images/ao-redor-do-mundo.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Neste guia, os termos técnicos aparecem em inglês, como **model**, **migration**, **controller** e **view**, com a tradução entre parênteses na primeira vez. Os nomes no código também ficam em inglês: o recado do Mural de recados se chama `Message`, e a autora, `author`.

Parece mais difícil no começo, mas ajuda muito:

- **É assim que você vai ouvir e ler fora daqui.** No Brasil, quem programa geralmente fala "model", "migration" e "commit", mesmo conversando em português. Os comandos (`bin/rails generate model`, `bin/rails db:migrate`), as mensagens de erro e a documentação também usam o inglês. Aprendendo os termos certos, você entende o que aparece no terminal sem precisar traduzir de volta.
- **Fica mais fácil buscar ajuda.** Pesquisar uma mensagem de erro ou um termo em inglês traz muito mais respostas, e você consegue conversar com outras pessoas que programam, no Brasil ou fora.
- **Você pede exatamente o que quer.** Usando os nomes em inglês de cada parte do app, como model e controller, o seu pedido fica mais claro, para uma IA ou para uma pessoa, e você entende melhor a resposta.
- **O código segue o costume do resto do mundo.** Quase todo código, incluindo o próprio Rails, usa nomes em inglês. E o Rails faz o plural pelas regras do inglês: um model chamado `Mensagem` viraria a tabela `mensagems`.

Não precisa decorar nada: o [glossário]({{ site.baseurl }}{% link comece-aqui/glossario.md %}) traz a tradução de cada termo e, em alguns casos, como pronunciar.
