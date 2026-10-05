---
title: Notas do Mural de recados
parent: Notas dos projetos
grand_parent: Guia para mentoras
nav_order: 1
has_children: true
---

# Notas do Mural de recados

- TODO: como usar as tags `passo-NN` do repositório do app
- TODO: como conduzir o "Pense antes de programar": dar tempo, perguntar em vez de responder, só abrir "o nosso plano" depois

## Sem testes automatizados por enquanto

Neste primeiro projeto, não incentive as participantes a escrever testes automatizados. Testes são importantes, mas aqui o foco é outro: entender o caminho de um pedido, planejar antes de programar e chegar num app que funciona dentro do dia. Escrever testes ao mesmo tempo dobra o que elas precisam aprender de uma vez.

- O `rails new` cria uma pasta `test` com arquivos de exemplo. Se alguém perguntar, explique em uma frase: são programas que conferem sozinhos se o app funciona; a gente vai deixar para depois.
- Neste projeto, a conferência é manual: as seções **Confira** e **Quebre de propósito** de cada capítulo.
- Se uma participante já tiver experiência e terminar antes, testes podem virar um desafio extra.

## Sem scaffold

Neste projeto, não use o `bin/rails generate scaffold`, nem o `scaffold_controller`, e não incentive as participantes a usar. Cada parte do app (model, rotas, controller e views) aparece num capítulo próprio. Geradores pequenos, como `generate model` e `generate controller`, podem ser usados, mas a participante revisa e ajusta o que eles criaram: no capítulo 03, por exemplo, ela apaga a rota que o gerador acrescentou e reescreve a view.

- **Entender cada peça.** O scaffold cria dezenas de arquivos de uma vez. Funciona, mas a participante não vê como cada parte se liga à outra, que é justamente o que o projeto quer ensinar.
- **Etapas pequenas, como no MVP.** Construir uma peça por capítulo segue a mesma ideia do skate ao carro: o app funciona ao fim de cada etapa, e dá para conferir o que mudou.
- **O mesmo vale para a IA.** Pedir o app inteiro de uma vez, para um gerador ou para uma IA, é o oposto do que o guia ensina.

Se uma participante já conhece o scaffold e perguntar, explique que ele existe e é útil no dia a dia, mas que aqui o objetivo é ver cada peça nascer. Fica como desafio para depois do projeto: gerar um scaffold e comparar com o que ela escreveu à mão.

## Comandos por extenso

Ao ajudar uma participante, use os comandos completos, do mesmo jeito que estão no guia: `bin/rails server`, e não `rails s`; `bin/rails console`, e não `rails c`; `bin/rails generate`, e não `rails g`.

- **O nome ajuda a lembrar o que cada comando faz.** "server" liga o servidor, "console" abre o console, "generate" gera arquivos. `s`, `c` e `g` não dizem nada para quem está começando.
- **Fica igual ao guia.** Se a mentora digita uma coisa e o guia mostra outra, a participante fica na dúvida sobre qual está certo.
- **O mesmo vale para os termos.** Prefira "o controller", "a migration" e "o model" a apelidos ou abreviações.

Se alguém descobrir os atalhos sozinha, tudo bem: confirme que funcionam e que são só abreviações dos comandos completos.

## Notas por capítulo

Cada capítulo tem a sua página de notas, com o mesmo número do capítulo. Elas aparecem no menu, abaixo desta página.
