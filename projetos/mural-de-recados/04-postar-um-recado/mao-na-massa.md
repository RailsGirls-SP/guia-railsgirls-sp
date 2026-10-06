---
title: Mão na massa
parent: "04. Como postar um recado?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: confirmar no Codespaces se o passo 4 (forgery_protection_origin_check) ainda é necessário com o Rails 8.1, e se a linha config.hosts << /.*\.app\.github\.dev/ da Imersão 2025 faz falta (o template codespaces-rails já libera o endereço pela variável RAILS_DEVELOPMENT_HOSTS). -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você vai montar um formulário e seguir o caminho do recado até ele aparecer no mural de recados. Os erros voltam a aparecer, como em [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/mao-na-massa.md %}), e cada um mostra a próxima peça que falta.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o título **Mural de recados** e o convite **Ainda não tem nenhum recado. Que tal postar o primeiro?**, do fim do capítulo anterior.

Terminou? Abra o passo **2. Prepare um recado em branco**

</details>

<details class="passo" markdown="1">
<summary>2. Prepare um recado em branco</summary>

Um formulário precisa saber **o que** ele vai preencher. No nosso caso, um recado novo, ainda em branco.

Abra o `app/controllers/messages_controller.rb`. Dentro do `def index`, logo abaixo da linha do `@messages`, acrescente:

```ruby
    @message = Message.new
```

O controller fica assim:

```ruby
class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc)
    @message = Message.new
  end
end
```

Salve o arquivo.

- `Message.new` cria um recado novo, em branco, só na memória do app. Ele **não** é guardado no banco de dados. É diferente do `Message.create` que você usou no console, que cria e já guarda.
- `@message` (no singular) é o recado em branco do formulário. `@messages` (no plural) continua sendo a lista de recados. Repare na diferença de uma letra.

Nada muda na página ainda: o formulário vem no próximo passo.

Terminou? Abra o passo **3. Coloque o formulário na página**

</details>

<details class="passo" markdown="1">
<summary>3. Coloque o formulário na página</summary>

Abra o `app/views/messages/index.html.erb`. Logo abaixo do título (a linha do `<h1>`), acrescente:

```erb
<%= form_with model: @message do |form| %>
  <div>
    <%= form.label :author, "Seu nome" %>
    <%= form.text_field :author %>
  </div>
  <div>
    <%= form.label :content, "Recado" %>
    <%= form.text_area :content %>
  </div>
  <%= form.submit "Postar recado" %>
<% end %>
```

Salve o arquivo.

- `form_with model: @message` cria um formulário para o recado em branco que o controller preparou.
- `form.label` é o texto que aparece ao lado de cada campo: **Seu nome** e **Recado**.
- `form.text_field :author` é uma caixa de texto de uma linha só, para a autora. `form.text_area :content` é uma caixa maior, para a mensagem.
- `form.submit` é o botão que envia o formulário.

**Dê um palpite:** recarregue a página. Como o formulário vai aparecer?

**Confira:** embaixo do título, aparecem os campos **Seu nome** e **Recado** e o botão **Postar recado**, ainda sem nenhum enfeite. O visual fica para outro capítulo.

<!-- TODO: captura da página com o formulário -->

Terminou? Abra o passo **4. Prepare o app para receber formulários**

</details>

<details class="passo" markdown="1">
<summary>4. Prepare o app para receber formulários</summary>

Antes de enviar o primeiro formulário, falta um ajuste por causa do Codespaces.

O Rails tem uma proteção que confere se um formulário veio do próprio app, e não de outro site. No Codespaces, o endereço que o navegador usa (o `.app.github.dev`) é diferente do endereço que o app enxerga, e essa proteção acaba recusando os formulários do próprio app.

No Explorer, abra o arquivo `config/environments/development.rb`. Logo antes do último `end`, acrescente esta linha:

```ruby
  config.action_controller.forgery_protection_origin_check = false
```

Salve o arquivo.

Essa linha desliga só a conferência do endereço de origem, e só enquanto você desenvolve o app (*development*, em inglês). A proteção continua funcionando no app publicado.

Esse arquivo só é lido quando o servidor liga. Então, reinicie o servidor: no terminal do servidor, aperte **Ctrl+C** para desligar e, depois, ligue de novo:

```
bin/rails server
```

{: .dica }
Está usando o seu próprio computador, e não o Codespaces? Você pode pular este passo: o endereço que o navegador usa e o que o app enxerga são o mesmo.

Terminou? Abra o passo **5. Poste o primeiro recado**

</details>

<details class="passo" markdown="1">
<summary>5. Poste o primeiro recado</summary>

Recarregue a página e preencha o formulário:

- **Seu nome:** Ana
- **Recado:** Meu primeiro recado!

Clique em **Postar recado**.

**Dê um palpite:** o recado vai aparecer no mural de recados?

**Confira:** ainda não! Aparece a página de erro **Routing Error**, com a mensagem `No route matches [POST] "/messages"`.

Repare no `POST`. Até agora, o navegador só fazia requisições do tipo `GET`, que servem para **pedir** uma página. Para **enviar** um formulário, ele usa o `POST`. E a rota que você criou no capítulo anterior só recebe `GET`.

Viu o erro? Agora, abra o passo **6. Resolva o erro: crie a rota**

</details>

<details class="passo" markdown="1">
<summary>6. Resolva o erro: crie a rota</summary>

Abra o `config/routes.rb`. Hoje ele tem esta linha:

```ruby
  get "messages", to: "messages#index"
```

Troque essa linha por:

```ruby
  resources :messages, only: [ :index, :create ]
```

Salve o arquivo. Não mexa na linha do `root`.

- `resources :messages` cria as rotas dos recados seguindo a [convenção]({{ site.baseurl }}{% link glossario.md %}#convencao) do Rails: cada [ação]({{ site.baseurl }}{% link glossario.md %}#acao) ganha o seu endereço e o seu tipo de requisição, sem você precisar escrever uma linha para cada uma.
- `only` (somente) lista as ações que você quer. Por enquanto, duas: `index` (ver a lista, com `GET /messages`, a mesma rota de antes) e `create` (criar, com `POST /messages`, a rota que faltava).

**Dê um palpite:** a rota para o `POST` agora existe. Volte para a página principal, preencha o formulário de novo e clique em **Postar recado**. O que vai acontecer?

Viu o novo erro? Agora, abra o passo **7. Ah não! Um novo erro!**

</details>

<details class="passo" markdown="1">
<summary>7. Ah não! Um novo erro!</summary>

**Confira:** aparece um erro diferente! Progresso! Agora é a página **Unknown action**, com a mensagem `The action 'create' could not be found for MessagesController`.

A rota mandou o formulário para a ação `create` do `MessagesController`, mas o controller ainda não sabe fazer `create`.

Abra o `app/controllers/messages_controller.rb` e deixe o arquivo assim:

```ruby
class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc)
    @message = Message.new
  end

  def create
    Message.create(message_params)
    redirect_to root_path
  end

  private

  def message_params
    params.expect(message: [ :author, :content ])
  end
end
```

Salve o arquivo. Tem bastante coisa nova aqui:

- `def create` é a ação que recebe o formulário.
- `Message.create(message_params)` cria o recado com o que veio do formulário e guarda no banco de dados, como o `Message.create` do console.
- `redirect_to root_path` manda o navegador de volta para a página principal, que mostra o mural de recados com o recado novo.
- `private` separa as ações das partes que só o controller usa por dentro. Tudo que vem depois dele não é uma ação.
- `message_params` é a lista do que o controller aceita do formulário: um recado (`message`) com autora (`author`) e mensagem (`content`). Qualquer outra informação que chegar é ignorada.

**Dê um palpite:** volte para a página principal, preencha o formulário e clique em **Postar recado**. E agora?

**Confira:** o recado da Ana aparece no mural de recados! 🎉 O convite sumiu, e o formulário está vazio de novo, pronto para o próximo recado.

<!-- TODO: captura do mural de recados com o recado da Ana -->

Poste mais um, para ver a ordem:

- **Seu nome:** Bia
- **Recado:** Adorei o workshop!

**Confira:** o recado da Bia aparece em cima do da Ana, porque é o mais novo.

Terminou? Abra o passo **8. E se o recado vier vazio?**

</details>

<details class="passo" markdown="1">
<summary>8. E se o recado vier vazio?</summary>

**Dê um palpite:** o que acontece se alguém clicar em **Postar recado** sem escrever nada?

Teste: deixe os dois campos vazios e clique em **Postar recado**.

**Confira:** nenhum erro aparece, e o mural de recados ganha um recado vazio: só um travessão (—), sem mensagem e sem autora.

Você já tinha visto isso no "Quebre de propósito" de [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}): o Rails guarda o recado porque ninguém disse a ele que um recado vazio é proibido. Decidir isso é trabalho de quem programa, e é o assunto do capítulo [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}).

Por enquanto, apague o recado vazio pelo console. No terminal novo:

```
bin/rails console
```

```ruby
Message.last.destroy
```

Esse comando pega o último recado guardado e apaga, como no capítulo 02. Depois, saia do console. Digite:

```
exit
```

Recarregue a página.

**Confira:** o recado vazio sumiu, e os recados da Bia e da Ana continuam lá.

Terminou? Abra o passo **9. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>9. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Posta recados pelo formulário` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Posta recados pelo formulário` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>A página continua mostrando o erro, mesmo depois de corrigir</summary>

Confira se você **salvou** todos os arquivos: no editor, um arquivo com mudanças não salvas tem uma bolinha no lugar do **X**, na aba. Salve (**Cmd+S** ou **Ctrl+S**) e recarregue a página.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>Passed nil to the :model argument</code></summary>

O formulário não recebeu o recado em branco. Confira se o controller tem a linha `@message = Message.new` dentro do `def index` (passo 2), com o `@` e no singular.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>InvalidAuthenticityToken</code> ou <code>HTTP Origin header didn't match</code></summary>

É a proteção de formulários do passo 4. Confira se a linha `config.action_controller.forgery_protection_origin_check = false` está no `config/environments/development.rb`, antes do último `end`, e se você **reiniciou o servidor** depois de salvar (Ctrl+C e `bin/rails server`). Se continuar, peça ajuda para alguém da mentoria. 💜

</details>

<details class="pergunta" markdown="1">
<summary>A ação <code>create</code> existe, mas continua aparecendo <code>could not be found</code></summary>

Confira se o `def create` está **antes** da linha `private`. Tudo que vem depois do `private` não é uma ação, e o Rails não encontra.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>param is missing or the value is empty</code></summary>

O controller não encontrou o recado no que veio do formulário. Confira se a view usa `form_with model: @message` e se os campos se chamam `:author` e `:content`, iguais aos do `message_params`.

</details>

<details class="pergunta" markdown="1">
<summary>Cliquei em Postar recado e nada aconteceu</summary>

Recarregue a página: se o recado aparecer, ele foi guardado, mas o navegador não voltou para o mural de recados. Confira se a ação `create` tem a linha `redirect_to root_path`.

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/o-que-aconteceu.md %}) e entenda cada passo.
