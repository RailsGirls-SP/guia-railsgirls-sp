---
title: Mão na massa
parent: "05. Errei! Como corrigir ou apagar?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, os erros voltam a aparecer no navegador, como em [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/mao-na-massa.md %}). Leia cada um com calma: eles mostram a próxima peça que falta.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o mural de recados, com o link **Novo recado** em cima e os recados embaixo.

Terminou? Abra o passo **2. Poste um recado com erro**

</details>

<details class="passo" markdown="1">
<summary>2. Poste um recado com erro</summary>

Para ter o que corrigir, clique em **Novo recado** e poste um recado com um erro de digitação de propósito:

- **Seu nome:** Bia
- **Recado:** Adorei o worksop!

**Confira:** o recado da Bia aparece no mural de recados, com o erro de digitação.

![Página Mural de recados com o link Novo recado e dois recados: "Adorei o worksop!", da Bia, com o erro de digitação, e "Meu primeiro recado!", da Ana]({{ '/assets/images/mural-de-recados/05/recado-com-erro.png' | relative_url }})
{: .ilustracao }

Terminou? Abra o passo **3. Coloque o link Editar em cada cartão**

</details>

<details class="passo" markdown="1">
<summary>3. Coloque o link Editar em cada cartão</summary>

Para corrigir um recado, cada cartão precisa de um caminho até a página de correção, como o link **Novo recado** do capítulo 04.

Abra o `app/views/messages/index.html.erb` e deixe o arquivo assim, com a linha nova do `link_to "Editar"` dentro do cartão, logo abaixo da autora:

```erb
<h1>Mural de recados</h1>

<%= link_to "Novo recado", new_message_path %>

<% if @messages.empty? %>
  <p>Ainda não tem nenhum recado. Que tal postar o primeiro?</p>
<% end %>

<% @messages.each do |message| %>
  <div>
    <p><%= message.content %></p>
    <p>— <%= message.author %></p>
    <%= link_to "Editar", edit_message_path(message) %>
  </div>
<% end %>
```

Salve o arquivo.

- `link_to` cria um link, como o **Novo recado** do capítulo 04: primeiro o texto, depois o endereço.
- `edit_message_path(message)` monta o endereço de correção **daquele** recado. Por isso ele recebe o `message`, o recado do cartão.

**Dê um palpite:** você já viu um erro parecido no capítulo 04. Recarregue a página principal: o que vai aparecer?

**Confira:** a página de erro **NoMethodError**, com a mensagem `undefined method 'edit_message_path'`. Como o `new_message_path` do capítulo 04, esse nome só existe depois que a rota existe.

Viu o erro? Agora, abra o passo **4. Resolva o erro: crie a rota**

</details>

<details class="passo" markdown="1">
<summary>4. Resolva o erro: crie a rota</summary>

Abra o `config/routes.rb`. A linha dos recados está assim:

```ruby
resources :messages, only: [ :index, :new, :create ]
```

O `only` (somente) lista as ações que têm rota: por enquanto, ver a lista (`index`), abrir a página do recado novo (`new`) e postar (`create`). Acrescente a ação `edit` (editar), a que mostra o formulário para corrigir um recado:

```ruby
resources :messages, only: [ :index, :new, :create, :edit ]
```

Salve o arquivo.

Recarregue a página principal.

**Confira:** a página volta, e cada cartão ganhou um link **Editar**.

![Página Mural de recados com os recados da Bia e da Ana, cada um com o link Editar embaixo]({{ '/assets/images/mural-de-recados/05/links-editar.png' | relative_url }})
{: .ilustracao }

**Dê um palpite:** a rota agora existe, mas o controller ainda não sabe fazer `edit`. Clique em **Editar** no recado da Bia: o que acontece?

Antes de ler o erro, repare no endereço do navegador. Ele termina com algo como `/messages/3/edit`, que quer dizer "recados, número 3, editar". Esse número é o `id` do recado da Bia: o Rails cria um diferente para cada recado, como você viu em [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}). No seu codespace, o número pode ser outro. Clique em **Editar** em outro cartão e veja o número mudar.

Viu o novo erro? Agora, abra o passo **5. Ah não! Um novo erro!**

</details>

<details class="passo" markdown="1">
<summary>5. Ah não! Um novo erro!</summary>

**Confira:** aparece a página **Unknown action** (ação desconhecida), com a mensagem `The action 'edit' could not be found for MessagesController`: a ação `edit` não foi encontrada no `MessagesController`.

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

**Confira:** aparece a página **No view template for interactive request**, com a mensagem `MessagesController#edit is missing a template for request formats: text/html`. Quer dizer: a ação `edit` não tem uma view para mostrar. É o mesmo erro do `new`, no capítulo anterior.

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

Salve o arquivo. É o mesmo formulário do `new.html.erb`, do capítulo 04, com outro título e outro botão. Se quiser, copie o `new.html.erb` e mude só essas duas coisas.

**Dê um palpite:** recarregue a página de correção. O formulário vai aparecer?

**Confira:** ainda não! Aparece a página de erro **NoMethodError in Messages#edit**, com a mensagem `undefined method 'message_path'`.

Viu o erro? Agora, abra o passo **7. Resolva o erro: para onde vai a correção?**

</details>

<details class="passo" markdown="1">
<summary>7. Resolva o erro: para onde vai a correção?</summary>

O formulário precisa saber **para onde** enviar a correção. No formulário do recado novo, o destino era `/messages`, com `POST`, a rota do `create`. Para um recado que já existe, o destino é o endereço daquele recado, como `/messages/3`, com a ação `update` (atualizar), a que guarda a correção. O `message_path` é o nome desse endereço, e ele só existe quando a rota do `update` existe.

No `config/routes.rb`, acrescente o `:update` na lista do `only`:

```ruby
resources :messages, only: [ :index, :new, :create, :edit, :update ]
```

Salve o arquivo.

**Dê um palpite:** recarregue a página de correção. O formulário vai aparecer vazio ou preenchido?

**Confira:** aparece **Corrigir recado**, com o formulário já preenchido com o recado da Bia. O `form_with model: @message` preenche cada campo com o que está guardado no recado.

![Página Corrigir recado com os campos Seu nome e Recado já preenchidos com Bia e "Adorei o worksop!", o botão Salvar e o link Voltar]({{ '/assets/images/mural-de-recados/05/corrigir-recado.png' | relative_url }})
{: .ilustracao }

Terminou? Abra o passo **8. Salve a correção**

</details>


<details class="passo" markdown="1">
<summary>8. Salve a correção</summary>

Na correção do recado da Bia, troque `worksop` por `workshop` e clique em **Salvar**.

**Dê um palpite:** a rota do `update` já existe. Pelo que você viu nos passos 4 e 5, qual vai ser o erro agora?

**Confira:** na tela, nada acontece. Como no capítulo 04, o erro de um formulário aparece no **terminal do servidor**:

```
AbstractController::ActionNotFound (The action 'update' could not be found for MessagesController):
```

Acertou? Falta a ação. Repare também na requisição, umas linhas acima no terminal: ela começa com `Started PATCH "/messages/3"`. O `PATCH` é o tipo de requisição que o navegador usa para **atualizar** alguma coisa.

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

![Página Mural de recados com o recado da Bia corrigido, "Adorei o workshop!", e o recado da Ana, cada um com o link Editar]({{ '/assets/images/mural-de-recados/05/recado-corrigido.png' | relative_url }})
{: .ilustracao }

Terminou? Abra o passo **9. Apague um recado**

</details>

<details class="passo" markdown="1">
<summary>9. Apague um recado</summary>

Agora você já conhece o caminho: rota, ação e, na tela, um jeito de chamar a ação. Para apagar, vamos fazer as três coisas de uma vez.

**A rota.** No `config/routes.rb`, acrescente a ação `destroy` (destruir, apagar):

```ruby
resources :messages, only: [ :index, :new, :create, :edit, :update, :destroy ]
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

Salve os três arquivos e recarregue a página principal: cada recado ganhou um botão **Apagar**, embaixo do link **Editar**.

![Página Mural de recados com os recados da Bia e da Ana, cada um com o link Editar e, embaixo, o botão Apagar]({{ '/assets/images/mural-de-recados/05/botoes-apagar.png' | relative_url }})
{: .ilustracao }

**Dê um palpite:** poste um recado de teste pela página **Novo recado** e clique em **Apagar** nele. O que acontece?

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

![Janela do navegador, com o endereço do codespace, a pergunta "Quer mesmo apagar este recado?" e os botões Cancel e OK]({{ '/assets/images/mural-de-recados/05/confirmar-apagar.png' | relative_url }})
{: .ilustracao }

No Chrome em inglês, o botão **Cancelar** aparece como **Cancel**. A cor da janela também muda com o navegador e com o modo claro ou escuro do seu computador.

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

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

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
<summary>Aparece <code>undefined method 'message_path'</code></summary>

O formulário de correção não sabe para onde enviar a correção. Confira se o `:update` está na lista do `only`, em `config/routes.rb` (passo 7), e se o arquivo está salvo.

</details>

<details class="pergunta" markdown="1">
<summary>Cliquei em Salvar, mas o recado não mudou</summary>

Primeiro, olhe o **terminal do servidor**: se apareceu um erro, ele está lá, e não no navegador. Se não tiver erro, confira a ação `update` no controller: ela precisa ter a linha `@message.update(message_params)`. Sem ela, o Rails busca o recado e volta para a página principal sem mudar nada.

</details>

<details class="pergunta" markdown="1">
<summary>O botão Apagar não pergunta nada</summary>

Confira se a linha do botão está igual à do passo 10, com `form: { data: { turbo_confirm: "..." } }`, e se as chaves `{ }` estão fechadas. Salve e recarregue a página com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux).

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>InvalidAuthenticityToken</code> ao salvar ou apagar</summary>

É o mesmo erro de formulário do Codespaces do capítulo 04. Peça ajuda para alguém da mentoria. 💜

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/o-que-aconteceu.md %}) e entenda cada passo.
