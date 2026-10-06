---
title: "O que aconteceu?"
parent: "04. Como postar um recado?"
grand_parent: Mural de recados
nav_order: 2
---

# O que aconteceu?

<details class="passo" markdown="1" open>
<summary>Por dentro do app</summary>

Postar um recado usa **duas** requisições, uma depois da outra:

1. **Enviar o formulário.** Quando a pessoa clica em **Postar recado**, o navegador faz uma requisição `POST /messages`, levando o que foi escrito. A rota manda para a ação `create`, que pede ao model para guardar o recado no banco de dados.
2. **Voltar para o mural de recados.** O `create` não monta nenhuma página: ele responde "vá para a página principal" (`redirect_to root_path`). O navegador faz então uma requisição `GET /`, e a ação `index`, que você criou no capítulo anterior, mostra o mural de recados, já com o recado novo.

Você está aqui: este é o caminho que uma requisição percorre dentro do app.

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador

  classDef aqui fill:#73121b,stroke:#f2b8be,stroke-width:2px,color:#fff
  classDef visto fill:#fbe3e5,stroke:#c98b91,color:#490606
  class Rota,Controller,View aqui
  class Model,Banco visto
```

Em vermelho escuro, as peças deste capítulo; em rosa claro, as que você já conhece dos capítulos anteriores.

#### O formulário e o recado em branco

A view monta o formulário a partir do recado em branco que o controller preparou (`@message = Message.new`). É por isso que os campos se chamam `author` e `content`, iguais às colunas da tabela: o formulário sabe quais informações um recado tem.

#### O que viaja do navegador até o controller

Quando o formulário é enviado, o que a pessoa escreveu chega ao controller num pacote chamado `params` (de *parameters*, parâmetros). Você pode ver esse pacote no terminal do servidor, numa linha parecida com esta:

```
Parameters: {"authenticity_token" => "[FILTERED]", "message" => {"author" => "Ana", "content" => "Meu primeiro recado!"}}
```

Repare no `"message" => {...}`: a autora e a mensagem chegam juntas, dentro de um recado (`message`).

#### A lista do que entra

O `message_params` não pega tudo que chegou: ele diz exatamente o que o controller aceita, um recado com `author` e `content`. Se chegar qualquer outra coisa, ela é ignorada. Isso protege o app: alguém poderia mandar um formulário modificado tentando mudar uma informação que não deveria.

#### O resources e a convenção

O `resources :messages` criou as rotas pela [convenção]({{ site.baseurl }}{% link glossario.md %}#convencao) do Rails: `GET /messages` vai para o `index`, e `POST /messages` vai para o `create`. Os dois usam o mesmo endereço; o que muda é o tipo de requisição. Com o `only`, o app só tem as rotas que você usa.

</details>

<details class="passo" markdown="1">
<summary>Não existem perguntas bobas</summary>

<details class="pergunta" markdown="1">
<summary>Qual é a diferença entre Message.new e Message.create?</summary>

O `Message.new` cria um recado só na memória do app, sem guardar: serve para o formulário saber o que preencher. O `Message.create` cria e já guarda no banco de dados. Se o app fosse desligado, o recado do `new` sumiria, e o do `create` continuaria lá.

</details>

<details class="pergunta" markdown="1">
<summary>Qual é a diferença entre GET e POST?</summary>

O `GET` **pede** uma página, sem mudar nada no app: é o que acontece quando você abre um endereço. O `POST` **envia** informações para o app guardar ou mudar alguma coisa: é o que acontece quando você envia um formulário. Por isso, o mesmo endereço, `/messages`, pode ir para duas ações diferentes.

</details>

<details class="pergunta" markdown="1">
<summary>Por que o create manda o navegador de volta, em vez de mostrar a página direto? <span class="label label-purple">Para ir além</span></summary>

Se o `create` mostrasse o mural de recados direto, a última requisição do navegador continuaria sendo o `POST`. Aí, ao recarregar a página, o navegador enviaria o formulário de novo, e o mesmo recado seria postado duas vezes. Com o `redirect_to`, a última requisição é um `GET`, e recarregar só mostra o mural de recados de novo.

</details>

<details class="pergunta" markdown="1">
<summary>O que é o authenticity_token? <span class="label label-purple">Para ir além</span></summary>

É um código secreto que o `form_with` coloca escondido em todo formulário. Quando o formulário chega, o Rails confere esse código para ter certeza de que o formulário veio do próprio app, e não de outro site tentando enviar recados no seu lugar. No terminal, ele aparece como `[FILTERED]` (escondido), justamente por ser secreto.

</details>

<details class="pergunta" markdown="1">
<summary>Por que existe o private no controller?</summary>

Tudo que vem depois do `private` só pode ser usado pelo próprio controller. Assim, o `message_params` não vira uma ação, e ninguém consegue chamar ele por um endereço. As ações, como `index` e `create`, ficam sempre antes do `private`.

</details>

</details>

<details class="passo" markdown="1">
<summary>Quebre de propósito <span class="label label-blue">Opcional</span></summary>

No controller, coloque um `#` na frente da linha `@message = Message.new`, para ela virar comentário. Salve e recarregue a página.

**Dê um palpite:** o que vai acontecer?

Aparece a página de erro **ArgumentError in Messages#index**, com a mensagem `Passed nil to the :model argument, expect an object or false`. O `form_with` recebeu "nada" (`nil`) no lugar do recado em branco e não sabe montar o formulário.

Tire o `#`, salve e recarregue: o formulário volta.

Agora, coloque um `#` na frente da linha `redirect_to root_path`, na ação `create`. Salve, recarregue a página e poste um recado.

**Dê um palpite:** o recado vai aparecer?

Parece que nada aconteceu: a página não muda, e o texto continua no formulário. Mas recarregue a página: o recado está lá! Ele foi guardado, só que o `create` não mandou o navegador de volta para o mural de recados. Esse é outro tipo de problema sem mensagem de erro: o app funciona pela metade.

Tire o `#`, salve, e apague o recado de teste pelo console (`Message.last.destroy`).

</details>

<details class="passo" markdown="1">
<summary>Preciso de IA para este capítulo?</summary>

Não. O formulário, a rota e a ação seguem o mesmo caminho dos capítulos anteriores, e os erros mostram cada peça que falta.

Se você pedir para uma IA "fazer um formulário para postar recados", é comum ela criar uma página separada para o formulário (a ação `new`), ou sugerir o *scaffold*. O nosso plano pede o formulário na própria página do mural de recados. Por isso, o pedido funciona melhor com o plano:

> No meu app Rails, o model `Message` tem `author` e `content`. Quero um formulário na mesma página da lista de recados (a ação `index`), com os campos "Seu nome" e "Recado" e o botão "Postar recado". Depois de postar, volta para a lista. Sem scaffold, e só com as rotas necessárias.

Confira o resultado contra o plano:

- O formulário está na página do mural de recados, e não numa página separada?
- O controller usa uma lista do que aceita (como o `message_params`), e não `params` direto?
- A rota tem `only`, só com as ações que você usa?

</details>

<details class="passo" markdown="1">
<summary>Não esqueça</summary>

- Um formulário envia o que a pessoa escreveu com uma requisição `POST`.
- A ação `create` recebe o formulário, pede ao model para guardar o recado e manda o navegador de volta para o mural de recados.
- O controller só aceita do formulário o que está na lista do `message_params`.
- O `resources` cria as rotas pela convenção do Rails, e o `only` escolhe quais.

</details>

<details class="passo" markdown="1">
<summary>Quiz</summary>

1. Quando a pessoa clica em **Postar recado**, que tipo de requisição o navegador faz, e para qual ação ela vai?
2. Você criou a rota do `create`, mas esqueceu de escrever a ação no controller. Qual erro aparece?
3. Depois que o recado é guardado, por que a pessoa volta a ver o mural de recados?

<details markdown="1">
<summary>Ver respostas</summary>

1. Uma requisição `POST /messages`, que vai para a ação `create`.
2. A página **Unknown action**, com `The action 'create' could not be found for MessagesController`.
3. Porque a ação `create` termina com `redirect_to root_path`, que manda o navegador de volta para a página principal.

</details>

</details>

<details class="passo" markdown="1">
<summary>Para saber mais</summary>

Guias oficiais do Rails, em inglês:

- [Action View Form Helpers](https://guides.rubyonrails.org/form_helpers.html): tudo sobre o `form_with` e os campos de formulário.
- [CRUD, Verbs, and Actions](https://guides.rubyonrails.org/routing.html#crud-verbs-and-actions): como o `resources` liga verbos, endereços e ações.
- [Strong Parameters](https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters): a lista do que o controller aceita.

</details>

## E agora?

Agora qualquer pessoa pode postar um recado. Mas, se ela escrever algo errado, não tem como corrigir. Próximo desafio: [Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/index.md %})
