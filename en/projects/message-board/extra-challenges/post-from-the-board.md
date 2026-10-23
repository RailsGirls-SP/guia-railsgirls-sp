---
title: "Post straight from the message board 📝"
parent: Extra challenges
grand_parent: Message Board
nav_order: 2
translation_of: projetos/mural-de-recados/desafios-extras/formulario-no-mural.md
translated_from: 98afcfc
---

# Post straight from the message board 📝

## The challenge

Right now, to post a message, the person clicks **New message** and goes to another page. On a real board, you write the message right there, in front of the wall.

The challenge is to put the form **on the home page**, above the cards, so people can post without leaving the message board:

![The message board with the form in a white box, with the Your name and Message fields and the Post message button and, below it, three yellow cards with Carla's, Bia's and Ana's messages]({{ '/assets/images/mural-de-recados/desafios/formulario-no-mural.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

This challenge is for after the chapter [What if someone sends an empty message?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/index.md %}), because it changes the form's warnings.

## Think before you code

- The form needs a blank message to fill in. On the New message page, the `new` action prepares that message. What about on the home page?
- Do the **New message** button and the New message page still make sense? Do they stay, or go?
- When a message is rejected, where should the warnings show up: on the New message page or on the home page?

## You'll practice

- Using the same form on more than one page.
- Preparing, in the `index` action, what the view needs.
- Choosing which view the controller shows when the message is rejected.

Try to solve it on your own before opening the hints. Open one at a time, only if you need to.

<details markdown="1">
<summary>Hint 1: the blank message</summary>

The form uses `@message`, a blank message. In the controller's `index` action, right below the `@messages` line, add:

```ruby
@message = Message.new
```

Notice the one-letter difference, like in chapter 04: `@message` is the blank message, and `@messages` is the list.

</details>

<details markdown="1">
<summary>Hint 2: the form on the home page</summary>

In `app/views/messages/index.html.erb`, replace the **New message** link line with the form.

If you did the partial bonus, in step 9 of chapter 07, it's a single line:

```erb
<%= render "form", message: @message, submit_text: "Post message" %>
```

If you didn't, copy the form from `new.html.erb`, from `<%= form_with` to its `<% end %>`. It's a good time to try the partial: now the same form shows up in three places.

</details>

<details markdown="1">
<summary>Hint 3: what about when the message is rejected?</summary>

Post a message without a name. The person ends up on the **New message** page, with the warning. It works, but it takes the person away from the message board.

For the warnings to show up on the home page, replace, in the `create` action, the `render :new` line with these two:

```ruby
@messages = Message.order(created_at: :desc)
render :index, status: :unprocessable_entity
```

`render :index` shows the message board's view, and it needs the list of messages. That's why `@messages` is looked up again, like in the `index` action. Without that line, the error `undefined method 'empty?' for nil` shows up.

</details>

## Going further

- Remove what's no longer used: the New message page (`new.html.erb`), the `new` action and `:new` on the `only` list, in `config/routes.rb`. Does the app keep working? What did you need to check before deleting?
- Make the form smaller, in a column next to the cards. Hint: look for `columns` in the [Bulma documentation](https://bulma.io/documentation/).
