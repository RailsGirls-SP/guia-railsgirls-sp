---
title: "O que aconteceu?"
parent: "Como postar um recado?"
grand_parent: Mural de recados
nav_order: 2
---

# O que aconteceu?

<details class="passo" markdown="1" open>
<summary>Por dentro do app</summary>

TODO: explicação do conceito, sem jargão desnecessário; o termo técnico aparece aqui (e linka o glossário).

Você está aqui: este é o caminho que uma requisição percorre dentro do app.

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador

  classDef aqui fill:#73121b,stroke:#f2b8be,stroke-width:2px,color:#fff
  class Controller aqui
```

</details>

<details class="passo" markdown="1">
<summary>Não existem perguntas bobas</summary>

TODO: 2–3 perguntas e respostas curtas.

TODO: cada pergunta num bloco `<details class="pergunta" markdown="1">`.

</details>

<details class="passo" markdown="1">
<summary>Quebre de propósito</summary>

TODO (opcional): uma mudança que causa erro de propósito e como ler a mensagem.

</details>

<details class="passo" markdown="1">
<summary>Preciso de IA para este capítulo?</summary>

TODO (opcional): transformar o plano do "Pense antes" num pedido para a IA e conferir o resultado contra as regras do plano.

</details>

<details class="passo" markdown="1">
<summary>Não esqueça</summary>

TODO: 3–5 bullets.

</details>

<details class="passo" markdown="1">
<summary>Quiz</summary>

TODO: 2–3 perguntas.

<details markdown="1">
<summary>Ver respostas</summary>

TODO

</details>

</details>

<details class="passo" markdown="1">
<summary>Para saber mais</summary>

TODO (opcional): links e vídeos para quem quiser ir além.

</details>

## E agora?

Próximo desafio: [Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/index.md %})
