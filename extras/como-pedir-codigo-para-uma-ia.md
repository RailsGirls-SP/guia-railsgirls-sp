---
title: Como pedir código para uma IA
parent: Extras
nav_order: 2
---

# Como pedir código para uma IA

Pedir código para uma IA parece simples: é só escrever o que você quer. Mas o jeito de pedir muda muito o que vem de volta. Esta página mostra dois cuidados que fazem diferença, com exemplos do projeto [Mural de recados]({{ site.baseurl }}{% link projetos/mural-de-recados/index.md %}). Ela faz mais sentido depois do projeto, quando você já conhece as peças de um app Rails.

Quer usar a IA para **aprender**, pedindo explicações em vez de código pronto? Veja [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

## Pedir em etapas pequenas

![Uma pessoa marcando etapas como concluídas, uma de cada vez, numa linha do tempo]({{ '/assets/images/etapas-concluidas.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Ilustração: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Se você pedir para uma IA "fazer um mural de recados", ela vai entregar dezenas de arquivos de uma vez. Fica difícil saber se está tudo certo, e mais difícil ainda achar o problema quando algo der errado.

Quem programa prefere construir em **etapas pequenas**: primeiro o mínimo que já funciona, depois o resto, uma parte de cada vez. Assim, dá para conferir cada etapa antes de seguir. É a ideia do skate ao carro, em [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem), e vale também para os pedidos que você faz a uma IA.

**Um pedido grande demais:**

> Faça um mural de recados em Rails, onde as pessoas postam, corrigem e apagam recados.

**O mesmo projeto, em etapas.** Você pode pedir uma parte de cada vez, na ordem do projeto:

> No meu app Rails, crie o model `Message`, com `author` e `content`.

E, só depois de conferir que funcionou:

> Agora, mostre todos os recados na página inicial.

**Ou peça para a IA planejar as etapas com você:**

> Quero construir um mural de recados em Rails. Antes de escrever código, me proponha as etapas, da menor versão que já funciona até a completa. Depois, vamos fazer uma etapa de cada vez: só siga para a próxima quando eu pedir.

Entre uma etapa e outra, confira se o app funciona e faça um commit. Se a próxima etapa der errado, é só voltar ao ponto salvo (veja [Git básico]({{ site.baseurl }}{% link extras/git-basico.md %})).

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

O segundo já diz o que importa para quem vai usar: os recados ficam guardados (quem programa chama isso de **[persistência dos dados]({{ site.baseurl }}{% link glossario.md %}#persistencia)**) e existem regras para aceitar um recado (as **[validações]({{ site.baseurl }}{% link glossario.md %}#validacao)**). É o tipo de pedido que alguém que conhece bem o problema, mas não programa, consegue fazer.

O terceiro é melhor quando você já tem um app e quer acrescentar uma parte nele, como no projeto. Por quê?

- **A IA não precisa adivinhar como o seu app está organizado.** Ela usa os nomes que já existem (`Message`, `author`, `content`), em vez de inventar outros, como um `Post` com `title` e `body`, que não combinam com o resto do seu código.
- **A mudança fica pequena e no lugar certo.** Você pede uma ação e uma regra. Sem isso, é comum a IA mexer em vários arquivos de uma vez, ou criar páginas que você não pediu.
- **Fica fácil conferir.** Você sabe exatamente o que deveria mudar: a ação `create` no controller e a validação no model. Se a resposta mexer em outra coisa, você percebe na hora.

Saber os nomes das peças também ajuda a entender o que a IA responde.
