---
title: Mão na massa
parent: "05. Errei! Como corrigir ou apagar?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: este capítulo supõe que o capítulo 04 termina com:
  - config/routes.rb: resources :messages, only: [ :index, :create ] e root "messages#index"
  - MessagesController: index (com @message = Message.new), create (Message.create(message_params) e redirect_to root_path) e o método privado message_params com params.expect(message: [ :author, :content ])
  - app/views/messages/index.html.erb: o formulário (form_with model: @message, rótulos "Seu nome" e "Recado", botão "Postar recado") em cima dos cartões
  Conferir quando o capítulo 04 estiver escrito. -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, os erros voltam a aparecer no navegador, como em [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/mao-na-massa.md %}). Leia cada um com calma: eles mostram a próxima peça que falta.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o mural de recados, com o formulário em cima e os recados embaixo.

Terminou? Abra o passo **2. Poste um recado com erro**

</details>

<details class="passo" markdown="1">
<summary>2. Poste um recado com erro</summary>

Para ter o que corrigir, poste pelo formulário um recado com um erro de digitação de propósito:

- **Seu nome:** Bia
- **Recado:** Adorei o worksop!

Agora vamos descobrir o número desse recado. No terminal novo, abra o console:

```
bin/rails console
```

E peça o último recado guardado:

```ruby
Message.last
```

**Confira:** o console mostra o recado da Bia, começando com `id:` e um número. Por exemplo:

```
#<Message:0x... id: 3, author: "Bia", content: "Adorei o worksop!", ...>
```

Esse `id` é o número do recado: o Rails cria um diferente para cada recado, como você viu em [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}). No seu codespace, o número pode ser outro. Anote o seu: você vai usar daqui a pouco.

Saia do console com `exit`.

Terminou? Abra o passo **3. Procure a página de correção**

</details>

<details class="passo" markdown="1">
<summary>3. Procure a página de correção</summary>

No Rails, a página para corrigir um recado costuma ficar num endereço assim: `/messages/3/edit`. Quer dizer "recados, número 3, editar".

Na aba do app, acrescente `/messages/3/edit` no fim do endereço, depois do `.app.github.dev`, trocando o `3` pelo número do seu recado. Aperte **Enter**.

**Dê um palpite:** você já viu esse filme no capítulo 03. O que vai aparecer?

**Confira:** a página de erro **Routing Error**, com a mensagem `No route matches [GET] "/messages/3/edit"`. Não existe uma rota para esse endereço.

<!-- TODO: captura da página de erro No route matches /messages/3/edit -->

Terminou? Abra o passo **4. Resolva o erro: crie a rota**

</details>

<details class="passo" markdown="1">
<summary>4. Resolva o erro: crie a rota</summary>

Abra o `config/routes.rb`. A linha dos recados está assim:

```ruby
  resources :messages, only: [ :index, :create ]
```

O `only` (somente) lista as ações que têm rota: por enquanto, só ver a lista (`index`) e postar (`create`). Acrescente a ação `edit` (editar), a que mostra o formulário para corrigir um recado:

```ruby
  resources :messages, only: [ :index, :create, :edit ]
```

Salve o arquivo.

**Dê um palpite:** a rota agora existe, mas o controller ainda não sabe fazer `edit`. Recarregue a página: o que acontece?

Terminou? Abra o passo **5. Ah não! Um novo erro!**

</details>

<details class="passo" markdown="1">
<summary>5. Ah não! Um novo erro!</summary>

**Confira:** aparece a página **Unknown action** (ação desconhecida), com a mensagem `The action 'edit' could not be found for MessagesController`: a ação `edit` não foi encontrada no `MessagesController`.

<!-- TODO: captura da página de erro Unknown action -->

A rota fez a parte dela e mandou a requisição para o controller. Mas o controller não tem nenhuma ação chamada `edit`.

Abra o `app/controllers/messages_controller.rb`. Logo antes da linha `private`, acrescente:

```ruby
  def edit
    @message = Message.find(params[:id])
  end
```

Salve o arquivo.

- `params[:id]` pega o número que veio no endereço: em `/messages/3/edit`, é o `3`.
- `Message.find` pede ao model o recado com esse número.
- O `@message` guarda o recado para a view, como o `@messages` do capítulo 03.

**Dê um palpite:** agora existem a rota e a ação. Recarregue a página: falta alguma coisa?

Terminou? Abra o passo **6. Mais um erro: falta a view**

</details>

<details class="passo" markdown="1">
<summary>6. Mais um erro: falta a view</summary>

**Confira:** aparece a página **No view template for interactive request**, com a mensagem `MessagesController#edit is missing a template for request formats: text/html`. Quer dizer: a ação `edit` não tem uma view para mostrar.

<!-- TODO: captura da página de erro No view template -->

Leia o resto da mensagem: o próprio Rails diz onde ele procurou a view, em `app/views/messages/edit.html.erb`.

No Explorer, clique com o botão direito na pasta `app/views/messages`, escolha **New File…** e crie o arquivo `edit.html.erb`. Escreva nele:

```erb
<h1>Corrigir recado</h1>

<%= form_with model: @message do |form| %>
  <div>
    <%= form.label :author, "Seu nome" %>
    <%= form.text_field :author %>
  </div>
  <div>
    <%= form.label :content, "Recado" %>
    <%= form.text_area :content %>
  </div>
  <%= form.submit "Salvar" %>
<% end %>

<%= link_to "Voltar", root_path %>
```

Salve o arquivo. É o mesmo formulário do capítulo 04, com outro título e outro botão. No fim, o `link_to` cria um link para voltar à página principal.

**Dê um palpite:** recarregue a página. O formulário vai aparecer vazio ou preenchido?

**Confira:** aparece **Corrigir recado**, com o formulário já preenchido com o recado da Bia. O `form_with model: @message` preenche cada campo com o que está guardado no recado.

<!-- TODO: captura da página Corrigir recado preenchida -->

Terminou? Abra o passo **7. Um link em cada cartão**

</details>

<details class="passo" markdown="1">
<summary>7. Um link em cada cartão</summary>

Ninguém vai digitar `/messages/3/edit` na barra de endereço. Vamos pôr um link **Editar** em cada cartão.

Abra o `app/views/messages/index.html.erb`. Dentro do cartão, logo abaixo da linha da autora, acrescente:

```erb
    <%= link_to "Editar", edit_message_path(message) %>
```

O cartão fica assim:

```erb
  <div>
    <p><%= message.content %></p>
    <p>— <%= message.author %></p>
    <%= link_to "Editar", edit_message_path(message) %>
  </div>
```

Salve o arquivo e volte para a página principal do app.

- `link_to` cria um link: primeiro o texto, depois o endereço.
- `edit_message_path(message)` monta o endereço de correção daquele recado, com o número certo: `/messages/3/edit` para o recado 3, `/messages/1/edit` para o recado 1. Esse nome veio da rota `edit` que você criou.

**Confira:** cada cartão tem um link **Editar**. Clique no de outro recado e veja o número mudar no endereço.

Terminou? Abra o passo **8. Salve a correção**

</details>

<details class="passo" markdown="1">
<summary>8. Salve a correção</summary>

Abra a correção do recado da Bia, troque `worksop` por `workshop` e clique em **Salvar**.

**Dê um palpite:** o que vai acontecer?

**Confira:** aparece o erro `No route matches [PATCH] "/messages/3"`. O `PATCH` é o tipo de requisição que o navegador usa para **atualizar** alguma coisa, e não existe rota para isso ainda.

<!-- TODO: captura da página de erro No route matches PATCH -->

**Dê um palpite:** pelo que você viu nos passos 4 e 5, o que falta? E depois, qual vai ser o próximo erro?

No `config/routes.rb`, acrescente a ação `update` (atualizar), a que guarda a correção:

```ruby
  resources :messages, only: [ :index, :create, :edit, :update ]
```

Salve, volte para a página de correção e clique em **Salvar** de novo.

**Confira:** o erro agora é `The action 'update' could not be found for MessagesController`. Acertou? Falta a ação.

No `app/controllers/messages_controller.rb`, logo depois do `edit` e antes do `private`, acrescente:

```ruby
  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
    redirect_to root_path
  end
```

Salve o arquivo.

- `Message.find(params[:id])` busca o recado, como no `edit`.
- `@message.update(message_params)` troca a autora e a mensagem pelo que veio do formulário e guarda no banco de dados. O `message_params` é o mesmo do capítulo 04.
- `redirect_to root_path` manda o navegador de volta para a página principal.

Volte para a página de correção, confira o texto e clique em **Salvar**.

**Confira:** você volta para o mural de recados, e o recado da Bia aparece corrigido: "Adorei o workshop!". 🎉

Terminou? Abra o passo **9. Apague um recado**

</details>

<details class="passo" markdown="1">
<summary>9. Apague um recado</summary>

Agora você já conhece o caminho: rota, ação e, na tela, um jeito de chamar a ação. Para apagar, vamos fazer as três coisas de uma vez.

**A rota.** No `config/routes.rb`, acrescente a ação `destroy` (destruir, apagar):

```ruby
  resources :messages, only: [ :index, :create, :edit, :update, :destroy ]
```

**A ação.** No `app/controllers/messages_controller.rb`, logo depois do `update` e antes do `private`, acrescente:

```ruby
  def destroy
    message = Message.find(params[:id])
    message.destroy
    redirect_to root_path
  end
```

- `message.destroy` apaga o recado do banco de dados.
- Aqui a variável não tem `@`, porque nenhuma view vai usar o recado: ele acabou de ser apagado.
- `redirect_to root_path` volta para a página principal, como no `update`.

**O botão.** No `app/views/messages/index.html.erb`, logo abaixo do link **Editar**, acrescente:

```erb
    <%= button_to "Apagar", message, method: :delete %>
```

O `button_to` cria um botão que manda uma requisição do tipo `DELETE` (apagar) para o endereço daquele recado, como `/messages/3`.

Salve os três arquivos.

**Dê um palpite:** poste um recado de teste pelo formulário e clique em **Apagar** nele. O que acontece?

**Confira:** o recado some do mural de recados.

Terminou? Abra o passo **10. E se clicar sem querer?**

</details>

<details class="passo" markdown="1">
<summary>10. E se clicar sem querer?</summary>

Um clique sem querer em **Apagar**, e o recado some para sempre. O nosso plano pede uma pergunta antes de apagar.

No `app/views/messages/index.html.erb`, troque a linha do botão por:

```erb
    <%= button_to "Apagar", message, method: :delete, form: { data: { turbo_confirm: "Quer mesmo apagar este recado?" } } %>
```

Salve o arquivo e recarregue a página.

O `turbo_confirm` faz o navegador perguntar antes de mandar a requisição. Se a pessoa cancelar, nada acontece.

**Dê um palpite:** poste outro recado de teste e clique em **Apagar**. Depois, clique em **Cancelar**. O recado continua lá?

**Confira:** aparece a pergunta **Quer mesmo apagar este recado?**. Com **Cancelar**, o recado continua no mural de recados. Com **OK**, ele é apagado.

<!-- TODO: captura da pergunta de confirmação -->

O cartão inteiro fica assim:

```erb
  <div>
    <p><%= message.content %></p>
    <p>— <%= message.author %></p>
    <%= link_to "Editar", edit_message_path(message) %>
    <%= button_to "Apagar", message, method: :delete, form: { data: { turbo_confirm: "Quer mesmo apagar este recado?" } } %>
  </div>
```

Terminou? Abra o passo **11. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>11. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Corrige e apaga recados` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Corrige e apaga recados` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>A página continua mostrando o erro, mesmo depois de corrigir</summary>

Confira se você **salvou** todos os arquivos: no editor, um arquivo com mudanças não salvas tem uma bolinha no lugar do **X**, na aba. Salve (**Cmd+S** ou **Ctrl+S**) e recarregue a página.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>Couldn't find Message with 'id'=...</code></summary>

Não existe nenhum recado com o número que está no endereço. Talvez você tenha digitado outro número ou o recado tenha sido apagado. Volte para a página principal e clique em **Editar** no cartão: o link sempre usa o número certo.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>undefined method 'edit_message_path'</code></summary>

A view está usando o endereço de correção, mas a rota `edit` não existe. Confira se o `:edit` está na lista do `only`, em `config/routes.rb`, e se o arquivo está salvo.

</details>

<details class="pergunta" markdown="1">
<summary>Cliquei em Salvar, mas o recado não mudou</summary>

Confira a ação `update` no controller: ela precisa ter a linha `@message.update(message_params)`. Sem ela, o Rails busca o recado e volta para a página principal sem mudar nada.

</details>

<details class="pergunta" markdown="1">
<summary>O botão Apagar não pergunta nada</summary>

Confira se a linha do botão está igual à do passo 10, com `form: { data: { turbo_confirm: "..." } }`, e se as chaves `{ }` estão fechadas. Salve e recarregue a página com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux).

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>InvalidAuthenticityToken</code> ao salvar ou apagar</summary>

É o mesmo erro de formulário do Codespaces do capítulo 04. Peça ajuda para uma mentora. 💜

</details>

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/o-que-aconteceu.md %}) e entenda cada passo.
