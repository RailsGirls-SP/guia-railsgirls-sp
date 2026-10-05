---
title: Ruby, Rails e Git
parent: Comece aqui
nav_order: 2
---

# Ruby, Rails e Git

Antes de começar o projeto, vale conhecer as três ferramentas principais. Não precisa decorar nada: esta página é só uma visão geral, e o projeto mostra cada uma na prática. Leitura de uns 10 minutos.

## Ruby, a linguagem

O **[Ruby]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#ruby)** é uma [linguagem de programação]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#linguagem-de-programacao): um jeito de escrever instruções que o computador entende. Ele foi criado no Japão, em 1995, por Yukihiro Matsumoto, o Matz, com uma ideia que ficou famosa: uma linguagem feita para quem programa ser feliz.

Por isso, o código Ruby costuma ser fácil de ler, quase como uma frase em inglês:

```ruby
"Rails Girls".upcase      # => "RAILS GIRLS"
3.times { puts "Oi!" }     # escreve "Oi!" três vezes
nome = "Ana"
"Oi, #{nome}!"            # => "Oi, Ana!"
```

- `upcase` deixa um texto em letras maiúsculas.
- `3.times` repete alguma coisa três vezes.
- `nome = "Ana"` guarda um texto numa [variável]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#variavel), e o `#{nome}` coloca esse texto no meio de outro.
- O que vem depois do `#` é um comentário: uma anotação para quem lê, que o Ruby ignora.

Quer testar? Depois de abrir o seu codespace, no capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}), digite `irb` no terminal: ele abre um lugar para escrever Ruby e ver a resposta na hora. Para sair, digite `exit`.

## Rails, o framework

O **[Rails]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#rails)**, ou **Ruby on Rails**, é um [framework]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#framework) para criar sites e aplicações web com Ruby. Ele foi criado em 2004 por David Heinemeier Hansson e é usado em sites como o GitHub e o Shopify.

Um framework traz pronto o que quase todo app web precisa: receber o pedido do navegador, guardar informações num banco de dados, montar as páginas. Assim, você se concentra no que é só do seu app.

O Rails também segue [convenções]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#convencao): combinados sobre que nome dar e onde colocar cada arquivo. Seguindo o combinado, ele liga as peças sozinho, e você escreve muito menos código.

No projeto, você vai conhecer as peças principais de um app Rails, uma por capítulo: a [rota]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#rota), o [controller]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#controller), a [view]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#view), o [model]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#model) e a [migration]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#migration). Não precisa entender agora: os nomes vão fazer sentido quando você usar cada uma.

## Git e GitHub, para guardar o seu progresso

O **[Git]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#git)** guarda versões do seu projeto, como os pontos salvos de um jogo. Cada versão salva é um **commit**. Se algo der errado, dá para voltar à última versão que funcionava.

O **[GitHub]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#github)** é um site onde você guarda o seu projeto, com todos os commits, na internet. Assim, você pode continuar de qualquer lugar, e outras pessoas podem ver o seu código.

Em resumo: o Git é a ferramenta, e o GitHub é o lugar. Veja como usar os dois no projeto em [Git básico]({{ site.baseurl }}{% link comece-aqui/git-basico.md %}).

## As palestras do pré-evento

Antes de cada workshop, o Rails Girls São Paulo faz um pré-evento com três palestras para quem vai participar.

<!-- TODO: colocar os links das gravações ou dos slides das palestras do pré-evento de cada edição, com o título e o nome de quem palestrou. -->

## E agora?

Siga para [Terminal básico]({{ site.baseurl }}{% link comece-aqui/terminal-basico.md %}), ou comece o projeto pelo [Mural de recados]({{ site.baseurl }}{% link projetos/mural-de-recados/index.md %}).
