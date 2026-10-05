---
title: "Desafios extras"
parent: Mural de recados
grand_parent: Projetos
nav_order: 11
---

# Desafios extras

Terminou o projeto antes do tempo? Aqui estão desafios para continuar. Cada um começa pelo problema, e as dicas ficam escondidas: tente primeiro sozinha.

TODO: ordenar os desafios do mais fácil ao mais difícil.

- TODO: desafio com dica (ex.: mostrar a data de cada recado)
- TODO: desafio só com o problema (ex.: filtrar recados por cor)

## Curtidas ❤️

### O desafio

Cada recado ganha um botão **Curtir**. Toda vez que alguém clica, o número de curtidas daquele recado aumenta em 1, e o número aparece no cartão: ❤️ 3.

Não precisa saber **quem** curtiu, só **quantas** curtidas cada recado tem.

### Pense antes de programar

- Onde o número de curtidas fica guardado? Que tipo de informação ele é: texto ou número?
- Um recado que acabou de ser postado tem quantas curtidas?
- O que acontece, passo a passo, quando alguém clica em **Curtir**?

### Você vai praticar

- Acrescentar uma coluna a uma tabela que já existe, com uma [migration]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#migration) nova.
- Fazer contas com números inteiros.

No código, os nomes ficam em inglês: a coluna das curtidas se chama `likes`, e a ação de curtir, `like`.
- Criar um botão que muda um dado no banco de dados.

Tente resolver sozinha antes de abrir as dicas. Abra uma de cada vez, só se precisar.

<details markdown="1">
<summary>Dica 1: a coluna nova</summary>

Gere uma migration que acrescenta uma coluna de número inteiro (`integer`) à tabela `messages` (os recados):

```
bin/rails generate migration AddLikesToMessages likes:integer
```

Antes de rodar, abra a migration e faça a coluna começar em zero, mudando a linha do `add_column` para:

```ruby
add_column :messages, :likes, :integer, default: 0, null: false
```

Depois, rode `bin/rails db:migrate`, como no capítulo [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}).

</details>

<details markdown="1">
<summary>Dica 2: somar 1</summary>

No console, teste antes de mexer nas telas:

```ruby
message = Message.first
message.likes
message.increment!(:likes)
message.likes
```

O `increment!` soma 1 e já guarda no banco de dados. Rode duas vezes e veja o número mudar.

</details>

<details markdown="1">
<summary>Dica 3: a rota e o controller</summary>

O clique no botão precisa de uma [rota]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#rota) nova para o recado. Em `config/routes.rb`, dentro de `resources :messages`:

```ruby
resources :messages do
  member do
    post :like
  end
end
```

E uma ação nova no `MessagesController`:

```ruby
def like
  message = Message.find(params[:id])
  message.increment!(:likes)
  redirect_to messages_path
end
```

</details>

<details markdown="1">
<summary>Dica 4: o botão</summary>

No cartão de cada recado, na view, use o `button_to`:

```erb
<%= button_to "❤️ #{message.likes}", like_message_path(message) %>
```

O botão mostra o número de curtidas e, ao ser clicado, chama a ação `like` (curtir).

</details>

### Indo além

- Faça o botão mostrar só ❤️ enquanto o recado não tem curtidas, e ❤️ 1, ❤️ 2… depois disso.
- Mostre no topo do mural de recados o total de curtidas de todos os recados somados. Dica: `Message.sum(:likes)`.
- Ordene os recados do mais curtido para o menos curtido.

<!-- TODO: conferir os nomes da rota, do controller e da view (MessagesController, messages_path) quando os capítulos 03 a 05 estiverem escritos. -->
