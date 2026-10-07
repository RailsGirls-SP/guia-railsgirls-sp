---
title: Mão na massa
parent: "04. Como postar um recado?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: confirmar no Codespaces se a linha config.hosts << /.*\.app\.github\.dev/ da Imersão 2025 faz falta (o template codespaces-rails já libera o endereço pela variável RAILS_DEVELOPMENT_HOSTS). -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você vai criar a página Novo recado, com um formulário, e seguir o caminho do recado até ele aparecer no mural de recados. Os erros voltam a aparecer, como em [Como ver todos os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/mao-na-massa.md %}), e cada um mostra a próxima peça que falta.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o título **Mural de recados** e o convite **Ainda não tem nenhum recado. Que tal postar o primeiro?**, do fim do capítulo anterior.

Terminou? Abra o passo **2. Coloque o link Novo recado na página principal**

</details>

<details class="passo" markdown="1">
<summary>2. Coloque o link Novo recado na página principal</summary>

O recado novo vai ser escrito numa página só para o formulário. Primeiro, a página principal precisa de um caminho até lá: um link.

Abra o `app/views/messages/index.html.erb`. Logo abaixo do título (a linha do `<h1>`), acrescente:

```erb
<%= link_to "Novo recado", new_message_path %>
```

Salve o arquivo.

- `link_to` cria um link. O primeiro pedaço é o texto que aparece na página: **Novo recado**.
- `new_message_path` é o endereço da página do recado novo. É um nome que o Rails cria a partir das rotas, como o `root_path`.

**Dê um palpite:** na aba do app, abra a página principal: o endereço sem nada depois do `.app.github.dev`, parecido com este:

```
https://seu-codespace-3000.app.github.dev/
```

O link vai aparecer?

**Confira:** ainda não! Aparece a página de erro **NameError**, com a mensagem `undefined local variable or method 'new_message_path'`.

O Rails não conhece o `new_message_path` porque ainda não existe uma rota para a página do recado novo.

Viu o erro? Agora, abra o passo **3. Resolva o erro: crie a rota**

</details>

<details class="passo" markdown="1">
<summary>3. Resolva o erro: crie a rota</summary>

Abra o `config/routes.rb`. Hoje ele tem esta linha:

```ruby
get "messages", to: "messages#index"
```

Troque essa linha por:

```ruby
resources :messages, only: [ :index, :new ]
```

Salve o arquivo. Não mexa na linha do `root`.

- `resources :messages` cria as rotas dos recados seguindo a [convenção]({{ site.baseurl }}{% link glossario.md %}#convencao) do Rails: cada [ação]({{ site.baseurl }}{% link glossario.md %}#acao) ganha o seu endereço e o seu tipo de requisição, sem você precisar escrever uma linha para cada uma.
- `only` (somente) lista as ações que você quer. Por enquanto, duas: `index` (ver a lista, com `GET /messages`, a mesma rota de antes) e `new` (a página do recado novo, com `GET /messages/new`).

Recarregue a página.

**Confira:** a página principal volta, agora com o link **Novo recado** embaixo do título.

**Dê um palpite:** clique em **Novo recado**. O que vai acontecer?

**Confira:** aparece um erro diferente! Progresso! Agora é a página **Unknown action**, com a mensagem `The action 'new' could not be found for MessagesController`.

A rota levou até a ação `new` do `MessagesController`, mas o controller ainda não sabe fazer `new`.

Viu o novo erro? Agora, abra o passo **4. Crie a ação new**

</details>

<details class="passo" markdown="1">
<summary>4. Crie a ação new</summary>

Um formulário precisa saber **o que** ele vai preencher. No nosso caso, um recado novo, ainda em branco. É a ação `new` que prepara esse recado.

Abra o `app/controllers/messages_controller.rb` e acrescente a ação `new`, logo depois do `index`:

```ruby
class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc)
  end

  def new
    @message = Message.new
  end
end
```

Salve o arquivo.

- `Message.new` cria um recado novo, em branco, só na memória do app. Ele **não** é guardado no banco de dados. É diferente do `Message.create` que você usou no console, que cria e já guarda.
- `@message` (no singular) é o recado em branco do formulário. `@messages` (no plural) continua sendo a lista de recados. Repare na diferença de uma letra.

**Dê um palpite:** recarregue a página. E agora?

**Confira:** mais um erro! É a página **No view template for interactive request**, com a mensagem `MessagesController#new is missing a template for request formats: text/html`. Quer dizer: a ação `new` existe, mas não tem uma [view]({{ site.baseurl }}{% link glossario.md %}#view) para mostrar.

Leia o resto da mensagem: o próprio Rails diz onde ele procurou a view, em `app/views/messages/new.html.erb`. No capítulo anterior, quem criou a view do `index` foi o gerador. Agora, você vai criar a view à mão.

Viu o erro? Agora, abra o passo **5. Crie a página do formulário**

</details>

<details class="passo" markdown="1">
<summary>5. Crie a página do formulário</summary>

No Explorer, clique com o botão direito na pasta `app/views/messages`, escolha **New File…** e crie o arquivo `new.html.erb`. Escreva nele:

```erb
<h1>Novo recado</h1>

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

<%= link_to "Voltar", root_path %>
```

Salve o arquivo.

- `form_with model: @message` cria um formulário para o recado em branco que a ação `new` preparou.
- `form.label` é o texto que aparece ao lado de cada campo: **Seu nome** e **Recado**.
- `form.text_field :author` é uma caixa de texto de uma linha só, para a autora. `form.text_area :content` é uma caixa maior, para a mensagem.
- `form.submit` é o botão que envia o formulário.
- `link_to "Voltar", root_path` é um link de volta para a página principal.

**Dê um palpite:** recarregue a página. Como o formulário vai aparecer?

**Confira:** aparecem o título **Novo recado**, os campos **Seu nome** e **Recado**, o botão **Postar recado** e o link **Voltar**, ainda sem nenhum enfeite. O visual fica para outro capítulo.

<!-- TODO: captura da página Novo recado com o formulário -->

Clique em **Voltar** e depois em **Novo recado** de novo, para ver o caminho entre as duas páginas.

Terminou? Abra o passo **6. Poste o primeiro recado**

</details>

<details class="passo" markdown="1">
<summary>6. Poste o primeiro recado</summary>

Na página **Novo recado**, preencha o formulário:

- **Seu nome:** Ana
- **Recado:** Meu primeiro recado!

Clique em **Postar recado**.

**Dê um palpite:** o recado vai aparecer no mural de recados?

**Confira:** ainda não! E, desta vez, na tela não acontece nada: a página **Novo recado** continua igual. Quando um formulário dá erro, o Rails não mostra a página de erro no navegador. O erro aparece em outro lugar: no **terminal do servidor**.

Vá até o terminal onde está rodando o `bin/rails server` e olhe as últimas linhas. Lá aparece:

```
Started POST "/messages"
ActionController::RoutingError (No route matches [POST] "/messages"):
```

{: .dica }
Guarde esta dica para o resto do projeto: **clicou e nada aconteceu? Olhe o terminal do servidor.** É lá que o app conta o que deu errado.

Repare no `POST`. Até agora, o navegador só fazia requisições do tipo `GET`, que servem para **pedir** uma página. Para **enviar** um formulário, ele usa o `POST`. E as rotas que você criou só recebem `GET`.

Viu o erro no terminal? Agora, abra o passo **7. Resolva o erro: complete a rota**

</details>
<details class="passo" markdown="1">
<summary>7. Resolva o erro: complete a rota</summary>

Abra o `config/routes.rb` e acrescente o `:create` na lista do `only`:

```ruby
resources :messages, only: [ :index, :new, :create ]
```

Salve o arquivo.

- `create` (criar) é a ação que recebe o formulário, com `POST /messages`, a rota que faltava.

**Dê um palpite:** a rota para o `POST` agora existe. Volte para a página **Novo recado**, preencha o formulário de novo e clique em **Postar recado**. O que vai aparecer no terminal do servidor?

Viu o novo erro no terminal? Agora, abra o passo **8. Ah não! Um novo erro!**

</details>
<details class="passo" markdown="1">
<summary>8. Ah não! Um novo erro!</summary>

**Confira:** de novo, nada acontece na tela. Olhe o terminal do servidor: aparece um erro diferente! Progresso!

```
AbstractController::ActionNotFound (The action 'create' could not be found for MessagesController):
```

A rota mandou o formulário para a ação `create` do `MessagesController`, mas o controller ainda não sabe fazer `create`.

Abra o `app/controllers/messages_controller.rb` e deixe o arquivo assim:

```ruby
class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc)
  end

  def new
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

**Dê um palpite:** volte para a página **Novo recado**, preencha o formulário e clique em **Postar recado**. E agora?

**Confira:** no Codespaces, nada acontece na tela, mais uma vez. Olhe o terminal do servidor: aparece um erro novo, parecido com este:

```
ActionController::InvalidAuthenticityToken (HTTP Origin header (https://localhost:3000) didn't match request.base_url (https://seu-codespace-3000.app.github.dev)):
```

A rota e a ação já existem. Agora quem recusou o formulário foi uma proteção do Rails. É o assunto do próximo passo.

{: .dica }
Está usando o seu próprio computador, e não o Codespaces? Para você, o recado já aparece no mural de recados. Pule o próximo passo e siga para o passo **10. E se o recado vier vazio?**

Viu o erro no terminal? Agora, abra o passo **9. Mais um erro: a proteção de formulários**

</details>
<details class="passo" markdown="1">
<summary>9. Mais um erro: a proteção de formulários</summary>

O Rails tem uma proteção que confere se um formulário veio do próprio app, e não de outro site. Leia o erro de novo: o endereço de origem do formulário (`localhost:3000`) não bate com o endereço do app (o `.app.github.dev`). No Codespaces, os dois endereços são diferentes, e essa proteção acaba recusando os formulários do próprio app.

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

**Dê um palpite:** volte para a página **Novo recado**, preencha o formulário e clique em **Postar recado**. E agora?

**Confira:** o navegador volta para a página principal, e o recado da Ana aparece no mural de recados! 🎉 O convite sumiu.

<!-- TODO: captura do mural de recados com o recado da Ana -->

Poste mais um, para ver a ordem. Clique em **Novo recado** e preencha:

- **Seu nome:** Bia
- **Recado:** Adorei o workshop!

**Confira:** o recado da Bia aparece em cima do da Ana, porque é o mais novo.

Terminou? Abra o passo **10. E se o recado vier vazio?**

</details>

<details class="passo" markdown="1">
<summary>10. E se o recado vier vazio?</summary>

**Dê um palpite:** o que acontece se alguém clicar em **Postar recado** sem escrever nada?

Teste: clique em **Novo recado**, deixe os dois campos vazios e clique em **Postar recado**.

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

Terminou? Abra o passo **11. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>11. Guarde o seu progresso</summary>

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

O formulário não recebeu o recado em branco. Confira se o controller tem a linha `@message = Message.new` dentro do `def new` (passo 4), com o `@` e no singular.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>InvalidAuthenticityToken</code> ou <code>HTTP Origin header didn't match</code></summary>

É a proteção de formulários do passo 9. Confira se a linha `config.action_controller.forgery_protection_origin_check = false` está no `config/environments/development.rb`, antes do último `end`, e se você **reiniciou o servidor** depois de salvar (Ctrl+C e `bin/rails server`). Se continuar, peça ajuda para alguém da mentoria. 💜

</details>

<details class="pergunta" markdown="1">
<summary>A ação <code>new</code> ou <code>create</code> existe, mas continua aparecendo <code>could not be found</code></summary>

Confira se o `def new` e o `def create` estão **antes** da linha `private`. Tudo que vem depois do `private` não é uma ação, e o Rails não encontra.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>param is missing or the value is empty</code></summary>

O controller não encontrou o recado no que veio do formulário. Confira se o `new.html.erb` usa `form_with model: @message` e se os campos se chamam `:author` e `:content`, iguais aos do `message_params`.

</details>

<details class="pergunta" markdown="1">
<summary>Cliquei em Postar recado e nada aconteceu</summary>

Primeiro, olhe o **terminal do servidor**: quando um formulário dá erro, é lá que o erro aparece, e não no navegador. Leia a última linha de erro e compare com os passos 6, 8 e 9.

Se não tiver erro no terminal, clique em **Voltar**: se o recado aparecer, ele foi guardado, mas o navegador não voltou para o mural de recados. Confira se a ação `create` tem a linha `redirect_to root_path`.

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/o-que-aconteceu.md %}) e entenda cada passo.
