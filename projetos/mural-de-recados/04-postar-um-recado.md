---
title: "Como postar um recado?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 5
---

# Como postar um recado?

## O desafio
TODO: uma pessoa quer escrever um recado novo. Como ela faz isso?

## Pense antes de programar
TODO: 5–10 minutos, no papel. Não existe resposta errada.

- Que campos o formulário precisa ter? Volte ao seu plano.
- O formulário fica na mesma tela do mural de recados ou numa tela separada?
- O que acontece na tela depois que ela envia o recado?

## Compare com o nosso plano
<details markdown="1">
<summary>Abrir o nosso plano</summary>

TODO: telas, dados e regras que a gente planejou para este desafio.

</details>

## Mão na massa
TODO: decisão pendente: usar `rails generate scaffold` (e depois explorar o código gerado) ou escrever model, controller e views à mão, parte por parte.

TODO: em cada passo, um "Dê um palpite" antes de rodar e um "Confira" logo depois.

## Entenda
TODO: explicação do conceito, sem jargão desnecessário; o termo técnico aparece aqui (e linka o glossário).

### Você está aqui

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador

  classDef aqui fill:#73121b,stroke:#73121b,color:#fff
  class Controller aqui
```

### Não existem perguntas bobas
TODO: 2–3 perguntas e respostas curtas.

## Quebre de propósito
TODO (opcional): uma mudança que causa erro de propósito e como ler a mensagem.

## E se fosse com IA?
TODO (opcional): transformar o plano do "Pense antes" num pedido para a IA e conferir o resultado contra as regras do plano.

## Não esqueça
TODO: 3–5 bullets.

## Quiz
TODO: 2–3 perguntas.

<details markdown="1">
<summary>Ver respostas</summary>

TODO

</details>

## Travou?
TODO: os 2–3 erros mais prováveis deste passo e como resolver.

<details markdown="1">
<summary>Código completo deste passo</summary>

TODO: conteúdo de cada arquivo alterado neste capítulo.

</details>

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %}).
