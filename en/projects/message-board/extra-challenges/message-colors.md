---
title: "Message colors 🎨"
parent: Extra challenges
grand_parent: Message Board
nav_order: 3
translation_of: projetos/mural-de-recados/desafios-extras/cores-nos-recados.md
translated_from: 98afcfc
---

# Message colors 🎨

## The challenge

On a real board, each person chooses the color of their sticky note. Right now, all the messages are yellow.

Each message gets a **color**, chosen by the person who wrote it, from a short list: yellow, pink, blue or green. The card shows up in the chosen color, and you can change the color when fixing the message.

![The message board with the New message button and four cards side by side: pink, blue, green and yellow, each with the message, the author in italics and the Edit and Delete buttons]({{ '/assets/images/mural-de-recados/desafios/cores.png' | relative_url }})
{: .ilustracao }

![The New message page with the Your name, Message and Color fields, the last one with the Yellow option selected, the Post message button and the Back link]({{ '/assets/images/mural-de-recados/desafios/cores-formulario.png' | relative_url }})
{: .ilustracao }

## Think before you code

- The color is a new piece of information. Where is it stored? What needs to change in the database?
- The messages that already exist don't have a color. Which color do they get?
- Where does the person choose the color? And when fixing a message?
- How does the stored color become the card's color on the screen?

## You'll practice

- Adding a column to a table that already exists, with a new [migration]({{ site.baseurl }}{% link glossary.md %}#migration), and giving it a default value.
- Adding a choice field to the form.
- Using a stored value to build a class name, and writing a bit of [CSS]({{ site.baseurl }}{% link glossary.md %}#css) of your own.

In the code, the column is called `color`, and the colors, `yellow`, `pink`, `blue` and `green`.

Try to solve it on your own before opening the hints. Open one at a time, only if you need to.

<details markdown="1">
<summary>Hint 1: the new column</summary>

Generate a migration that adds the `color` column to the `messages` table:

```
bin/rails generate migration AddColorToMessages color:string
```

Before running it, open the migration and make the old messages (and the new ones, if nobody chooses) yellow, by changing the `add_column` line to:

```ruby
add_column :messages, :color, :string, default: "yellow", null: false
```

Then run `bin/rails db:migrate` and check in the console: `Message.first.color` answers `"yellow"`.

</details>

<details markdown="1">
<summary>Hint 2: the choice field</summary>

In the `new.html.erb` form, right after the message field, add:

```erb
      <div class="field">
        <%= form.label :color, "Color", class: "label" %>
        <div class="select">
          <%= form.select :color, [ [ "Yellow", "yellow" ], [ "Pink", "pink" ], [ "Blue", "blue" ], [ "Green", "green" ] ] %>
        </div>
      </div>
```

Each option has the text the person sees (`"Pink"`) and the value that's stored (`"pink"`). Do the same in `edit.html.erb`, so the color can be changed when fixing a message.

</details>

<details markdown="1">
<summary>Hint 3: the color disappears!</summary>

Chose **Pink**, posted, and in the console `Message.last.color` is still `"yellow"`? Look at the `Parameters` line in the server's terminal: the color arrived. It got lost in the controller.

`message_params` is the list of what the controller accepts from the form, and `color` isn't on it:

```ruby
  def message_params
    params.expect(message: [ :author, :content, :color ])
  end
```

</details>

<details markdown="1">
<summary>Hint 4: the card in the right color</summary>

In `index.html.erb`, replace Bulma's yellow class with the message's color:

```erb
<div class="card card-<%= message.color %>">
```

The cards turn white: Bulma doesn't know `card-pink`. Teach it in your CSS file, `app/assets/stylesheets/application.css`, right after the comment:

```css
.card-yellow { background-color: #feecc3; }
.card-pink   { background-color: #ffd6dd; }
.card-blue   { background-color: #d6ecff; }
.card-green  { background-color: #d4f5df; }
```

This file is read after Bulma, so your colors win over the white.

</details>

## Going further

- Create a fifth color: a new value in both forms and a new line in the CSS. Do you need a migration? Why?
- Show at the top of the message board how many messages there are of each color. Hint: `Message.group(:color).count`.
- A modified form could send a color that isn't on the list. How could the app reject it? See the chapter [What if someone sends an empty message?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/index.md %}).
