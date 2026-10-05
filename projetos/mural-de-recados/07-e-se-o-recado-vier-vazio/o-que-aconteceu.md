---
title: "O que aconteceu?"
parent: "07. E se alguém mandar um recado vazio?"
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
  class Model aqui
```

</details>

<details class="passo" markdown="1">
<summary>Não existem perguntas bobas</summary>

TODO: 2–3 perguntas e respostas curtas.

TODO: cada pergunta num bloco `<details class="pergunta" markdown="1">`.

</details>

<details class="passo" markdown="1">
<summary>Quebre de propósito <span class="label label-blue">Opcional</span></summary>

TODO (opcional): uma mudança que causa erro de propósito e como ler a mensagem.

</details>

<details class="passo" markdown="1">
<summary>Preciso de IA para este capítulo?</summary>

{: .ia }
TODO: o código gerado aceita um recado vazio; quem decide que isso é um erro? Comparar o código gerado com a lista de casos do "Pense antes".

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

Próximo desafio: [Como mostrar o mural de recados para o mundo?]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/index.md %})
