---
title: Por que aprender a programar?
nav_order: 2
---

# Por que aprender a programar?

Hoje, ferramentas de IA escrevem código em segundos. Então por que passar um dia aprendendo a programar?

Porque escrever código é só uma parte do trabalho. A IA é uma assistente muito rápida, mas alguém precisa saber **o que pedir**, **conferir o que veio** e **decidir o que fazer** quando algo não sai como o esperado. Esse alguém é você.

## O que continua sendo trabalho de quem programa

No projeto Mural de recados, você vai fazer cada uma destas coisas. Nenhuma delas uma IA faz no seu lugar, porque todas dependem do que **você** quer:

- **Entender o problema antes da solução.** Quem vai usar o app? O que a pessoa quer fazer? No [planejamento]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}), você desenha as telas antes de escrever qualquer código.
- **Decidir quais informações guardar.** Um recado tem quem escreveu e a mensagem. E a cor? E a data? Quem programa chama isso de **modelar os dados**, e é uma escolha sua.
- **Prever o que pode dar errado.** E se alguém mandar um recado vazio? E uma mensagem enorme? O código gerado por uma IA costuma funcionar e aceitar um recado vazio. Quem decide que isso é um erro é você, como no capítulo [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}).
- **Ler e conferir o código.** Geradores e IAs economizam digitação, mas às vezes criam coisas que você não pediu. No capítulo [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/index.md %}), você apaga uma rota que o gerador criou sem precisar.
- **Entender os erros.** Quando algo quebra, a mensagem de erro diz o que falta. Saber ler essa mensagem é o que te deixa resolver por conta própria, com ou sem IA.

## Pedir em etapas pequenas

Se você pedir para uma IA "fazer um mural de recados", ela vai entregar dezenas de arquivos de uma vez. Fica difícil saber se está tudo certo, e mais difícil ainda achar o problema quando algo der errado.

Quem programa prefere construir em **etapas pequenas**: primeiro o mínimo que já funciona, depois o resto, uma parte de cada vez. Assim, dá para conferir cada etapa antes de seguir. É a ideia do skate ao carro, em [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem), e vale também para os pedidos que você faz a uma IA.

## Saber o nome de cada peça

Um app Rails tem peças com nomes próprios: **rota**, **controller**, **view**, **model**, **migration**. Você vai conhecer cada uma no projeto. Saber esses nomes muda o jeito de pedir ajuda, para uma IA ou para uma pessoa:

> Faz o meu app aceitar recados.

> No meu app Rails, crie a ação `create` no `MessagesController`, que guarda o recado com `author` e `content` e volta para a lista de recados.

O primeiro pedido deixa quase tudo para a IA adivinhar. O segundo diz exatamente o que você quer e onde, e você consegue conferir se a resposta faz o que pediu. Saber os nomes também ajuda a entender o que a IA responde.

## Não é contra a IA

Este guia não é contra a IA. Ela pode ser uma ótima tutora: explica uma mensagem de erro, responde uma dúvida a qualquer hora, mostra outro jeito de fazer. Veja como em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

O que o guia defende é que você **entenda** o que está construindo. Quem entende consegue usar a IA para ir mais rápido, sem perder o controle do próprio projeto. Em vários capítulos, a seção **Preciso de IA para este capítulo?** mostra como seria pedir aquela etapa para uma IA e o que conferir no resultado.

## Por que os termos ficam em inglês?

Neste guia, os termos técnicos aparecem em inglês, como **model**, **migration**, **controller** e **view**, com a tradução entre parênteses na primeira vez. Os nomes no código também ficam em inglês: o recado do Mural de recados se chama `Message`, e a autora, `author`.

Parece mais difícil no começo, mas ajuda muito:

- **É assim que você vai ouvir e ler fora daqui.** No Brasil, quem programa fala "model", "migration" e "commit", mesmo conversando em português. Os comandos (`bin/rails generate model`, `bin/rails db:migrate`), as mensagens de erro e a documentação também usam o inglês. Aprendendo os termos certos, você entende o que aparece no terminal sem precisar traduzir de volta.
- **Fica mais fácil buscar ajuda.** Pesquisar uma mensagem de erro ou um termo em inglês traz muito mais respostas, e você consegue conversar com outras pessoas que programam, no Brasil ou fora.
- **Você pede exatamente o que quer.** Com o nome certo de cada peça, o pedido para uma IA, ou para uma pessoa, fica claro, e você entende melhor a resposta.
- **Evita confusão de nomes.** Em português, "modelo" já é usado para outras coisas, como o modelo de repositório do GitHub e os modelos de IA. Usando "model" para a peça do Rails, cada coisa tem o seu nome.
- **O código segue o costume do resto do mundo.** Quase todo código, incluindo o próprio Rails, usa nomes em inglês. E o Rails faz o plural pelas regras do inglês: um model chamado `Mensagem` viraria a tabela `mensagems`.

Não precisa decorar nada: o [glossário]({{ site.baseurl }}{% link comece-aqui/glossario.md %}) traz a tradução de cada termo e, em alguns casos, como pronunciar.
