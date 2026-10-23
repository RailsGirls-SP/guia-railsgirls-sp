{% comment %}translation_of: _includes/mural-de-recados/05/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
Stuck on a step? See [Stuck?](#stuck), at the end of the page.

In this chapter, the errors show up in the browser again, like in [How do we see all the messages?]({{ site.baseurl }}{% link projects/message-board/03-see-all-the-messages/hands-on.md %}). Read each one calmly: they show the next missing piece.

<details class="passo" markdown="1" open>
<summary>1. Start the server</summary>

Open your codespace and start the server, if it isn't running yet:

```
bin/rails server
```

Open the app in the browser (with the **Open in Browser** message or from the **Ports** tab) and leave that tab open. For the other commands, open a new terminal with the **+** button.

**Check:** the browser shows the message board, with the **New message** link at the top and the messages below.

Done? Open step **2. Post a message with a mistake**

</details>

<details class="passo" markdown="1">
<summary>2. Post a message with a mistake</summary>

To have something to fix, click **New message** and post a message with a typo on purpose:

- **Your name:** Bia
- **Message:** I loved the worksop!

**Check:** Bia's message shows up on the message board, with the typo.

![The Message Board page with the New message link and two messages: "I loved the worksop!", by Bia, with the typo, and "My first message!", by Ana]({{ '/assets/images/mural-de-recados/05/recado-com-erro.png' | relative_url }})
{: .ilustracao }

Done? Open step **3. Put the Edit link on each card**

</details>

<details class="passo" markdown="1">
<summary>3. Put the Edit link on each card</summary>

To fix a message, each card needs a way to get to the edit page, like the **New message** link from chapter 04.

Open `app/views/messages/index.html.erb` and make the file look like this, with the new `link_to "Edit"` line inside the card, right below the author:

```erb
<h1>Message Board</h1>

<%= link_to "New message", new_message_path %>

<% if @messages.empty? %>
  <p>There are no messages yet. How about posting the first one?</p>
<% end %>

<% @messages.each do |message| %>
  <div>
    <p><%= message.content %></p>
    <p>— <%= message.author %></p>
    <%= link_to "Edit", edit_message_path(message) %>
  </div>
<% end %>
```

Save the file.

- `link_to` creates a link, like the **New message** one from chapter 04: first the text, then the address.
- `edit_message_path(message)` builds the edit address for **that** message. That's why it receives `message`, the card's message.

**Make a guess:** you've already seen a similar error in chapter 04. Reload the home page: what's going to show up?

**Check:** the **NoMethodError** error page, with the message `undefined method 'edit_message_path'`. Like `new_message_path` in chapter 04, this name only exists once the route exists.

Saw the error? Now open step **4. Fix the error: create the route**

</details>

<details class="passo" markdown="1">
<summary>4. Fix the error: create the route</summary>

Open `config/routes.rb`. The messages line looks like this:

```ruby
resources :messages, only: [ :index, :new, :create ]
```

`only` lists the actions that have a route: for now, seeing the list (`index`), opening the new message page (`new`) and posting (`create`). Add the `edit` action, the one that shows the form to fix a message:

```ruby
resources :messages, only: [ :index, :new, :create, :edit ]
```

Save the file.

Reload the home page.

**Check:** the page is back, and each card got an **Edit** link.

![The Message Board page with Bia's and Ana's messages, each with the Edit link below it]({{ '/assets/images/mural-de-recados/05/links-editar.png' | relative_url }})
{: .ilustracao }

**Make a guess:** the route exists now, but the controller doesn't know how to do `edit` yet. Click **Edit** on Bia's message: what happens?

Before reading the error, notice the browser's address. It ends with something like `/messages/3/edit`, which means "messages, number 3, edit". That number is the `id` of Bia's message: Rails creates a different one for each message, as you saw in [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/hands-on.md %}). In your codespace, the number might be different. Click **Edit** on another card and watch the number change.

Saw the new error? Now open step **5. Oh no! A new error!**

</details>

<details class="passo" markdown="1">
<summary>5. Oh no! A new error!</summary>

**Check:** the **Unknown action** page shows up, with the message `The action 'edit' could not be found for MessagesController`.

The route did its part and sent the request to the controller. But the controller doesn't have any action called `edit`.

Open `app/controllers/messages_controller.rb`. Right before the `private` line, add:

```ruby
  def edit
    @message = Message.find(params[:id])
  end
```

Save the file.

- `params[:id]` takes the number that came in the address: in `/messages/3/edit`, it's the `3`.
- `Message.find` asks the model for the message with that number.
- `@message` keeps the message for the view, like `@messages` in chapter 03.

**Make a guess:** now the route and the action exist. Reload the page: is anything missing?

Done? Open step **6. One more error: the view is missing**

</details>

<details class="passo" markdown="1">
<summary>6. One more error: the view is missing</summary>

**Check:** the **No view template for interactive request** page shows up, with the message `MessagesController#edit is missing a template for request formats: text/html`. That means: the `edit` action doesn't have a view to show. It's the same error as `new`, in the previous chapter.

Read the rest of the message: Rails itself says where it looked for the view, in `app/views/messages/edit.html.erb`.

In the Explorer, right-click the `app/views/messages` folder, choose **New File…** and create the file `edit.html.erb`. Write this in it:

```erb
<h1>Edit message</h1>

<%= form_with model: @message do |form| %>
  <div>
    <%= form.label :author, "Your name" %>
    <%= form.text_field :author %>
  </div>
  <div>
    <%= form.label :content, "Message" %>
    <%= form.text_area :content %>
  </div>
  <%= form.submit "Save" %>
<% end %>

<%= link_to "Back", root_path %>
```

Save the file. It's the same form as `new.html.erb`, from chapter 04, with a different heading and a different button. If you like, copy `new.html.erb` and change only those two things.

**Make a guess:** reload the edit page. Will the form show up?

**Check:** not yet! The error page **NoMethodError in Messages#edit** shows up, with the message `undefined method 'message_path'`.

Saw the error? Now open step **7. Fix the error: where does the fix go?**

</details>

<details class="passo" markdown="1">
<summary>7. Fix the error: where does the fix go?</summary>

The form needs to know **where** to send the fix. In the new message form, the destination was `/messages`, with `POST`, the `create` route. For a message that already exists, the destination is that message's address, like `/messages/3`, with the `update` action, the one that stores the fix. `message_path` is the name of that address, and it only exists when the `update` route exists.

In `config/routes.rb`, add `:update` to the `only` list:

```ruby
resources :messages, only: [ :index, :new, :create, :edit, :update ]
```

Save the file.

**Make a guess:** reload the edit page. Will the form show up empty or filled in?

**Check:** **Edit message** shows up, with the form already filled in with Bia's message. `form_with model: @message` fills each field with what's stored in the message.

![The Edit message page with the Your name and Message fields already filled in with Bia and "I loved the worksop!", the Save button and the Back link]({{ '/assets/images/mural-de-recados/05/corrigir-recado.png' | relative_url }})
{: .ilustracao }

Done? Open step **8. Save the fix**

</details>


<details class="passo" markdown="1">
<summary>8. Save the fix</summary>

In the fix for Bia's message, change `worksop` to `workshop` and click **Save**.

**Make a guess:** the `update` route already exists. From what you saw in steps 4 and 5, what will the error be now?

**Check:** on the screen, nothing happens. Like in chapter 04, a form's error shows up in the **server's terminal**:

```
AbstractController::ActionNotFound (The action 'update' could not be found for MessagesController):
```

Did you get it right? The action is missing. Also notice the request, a few lines up in the terminal: it starts with `Started PATCH "/messages/3"`. `PATCH` is the kind of request the browser uses to **update** something.

In `app/controllers/messages_controller.rb`, right after `edit` and before `private`, add:

```ruby
  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
    redirect_to root_path
  end
```

Save the file.

- `Message.find(params[:id])` looks up the message, like in `edit`.
- `@message.update(message_params)` replaces the author and the text with what came from the form and stores it in the database. `message_params` is the same one from chapter 04.
- `redirect_to root_path` sends the browser back to the home page.

Go back to the edit page, check the text and click **Save**.

**Check:** you go back to the message board, and Bia's message shows up fixed: "I loved the workshop!". 🎉

![The Message Board page with Bia's message fixed, "I loved the workshop!", and Ana's message, each with the Edit link]({{ '/assets/images/mural-de-recados/05/recado-corrigido.png' | relative_url }})
{: .ilustracao }

Done? Open step **9. Delete a message**

</details>

<details class="passo" markdown="1">
<summary>9. Delete a message</summary>

Now you already know the path: route, action and, on the screen, a way to call the action. To delete, let's do all three at once.

**The route.** In `config/routes.rb`, add the `destroy` action:

```ruby
resources :messages, only: [ :index, :new, :create, :edit, :update, :destroy ]
```

**The action.** In `app/controllers/messages_controller.rb`, right after `update` and before `private`, add:

```ruby
  def destroy
    message = Message.find(params[:id])
    message.destroy
    redirect_to root_path
  end
```

- `message.destroy` deletes the message from the database.
- Here the variable doesn't have an `@`, because no view is going to use the message: it was just deleted.
- `redirect_to root_path` goes back to the home page, like in `update`.

**The button.** In `app/views/messages/index.html.erb`, right below the **Edit** link, add:

```erb
<%= button_to "Delete", message, method: :delete %>
```

`button_to` creates a button that sends a `DELETE` request to that message's address, like `/messages/3`.

Save the three files and reload the home page: each message got a **Delete** button, below the **Edit** link.

![The Message Board page with Bia's and Ana's messages, each with the Edit link and, below it, the Delete button]({{ '/assets/images/mural-de-recados/05/botoes-apagar.png' | relative_url }})
{: .ilustracao }

**Make a guess:** post a test message from the **New message** page and click **Delete** on it. What happens?

**Check:** the message disappears from the message board.

Done? Open step **10. What if someone clicks by accident?**

</details>

<details class="passo" markdown="1">
<summary>10. What if someone clicks by accident?</summary>

One accidental click on **Delete**, and the message is gone forever. Our plan asks for a question before deleting.

In `app/views/messages/index.html.erb`, replace the button's line with:

```erb
<%= button_to "Delete", message, method: :delete, form: { data: { turbo_confirm: "Do you really want to delete this message?" } } %>
```

Save the file and reload the page.

`turbo_confirm` makes the browser ask before sending the request. If the person cancels, nothing happens.

**Make a guess:** post another test message and click **Delete**. Then click **Cancel**. Is the message still there?

**Check:** the question **Do you really want to delete this message?** shows up. With **Cancel**, the message stays on the message board. With **OK**, it's deleted.

![A browser window, with the codespace's address, the question "Do you really want to delete this message?" and the Cancel and OK buttons]({{ '/assets/images/mural-de-recados/05/confirmar-apagar.png' | relative_url }})
{: .ilustracao }

The buttons follow your browser's language, and the window's color changes with the browser and with your computer's light or dark mode.

The whole card looks like this:

```erb
  <div>
    <p><%= message.content %></p>
    <p>— <%= message.author %></p>
    <%= link_to "Edit", edit_message_path(message) %>
    <%= button_to "Delete", message, method: :delete, form: { data: { turbo_confirm: "Do you really want to delete this message?" } } %>
  </div>
```

Done? Open step **11. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>11. Save your progress</summary>

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Fix and delete messages` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Fix and delete messages` shows up with the **main** label and the cloud icon.

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The page keeps showing the error, even after fixing it</summary>

Check that you **saved** all the files: in the editor, a file with unsaved changes has a dot instead of the **X** on its tab. Save (**Cmd+S** or **Ctrl+S**) and reload the page.

</details>

<details class="pergunta" markdown="1">
<summary><code>Couldn't find Message with 'id'=...</code> shows up</summary>

There's no message with the number that's in the address. Maybe you typed a different number or the message was deleted. Go back to the home page and click **Edit** on the card: the link always uses the right number.

</details>

<details class="pergunta" markdown="1">
<summary><code>undefined method 'edit_message_path'</code> shows up</summary>

The view is using the edit address, but the `edit` route doesn't exist. Check that `:edit` is on the `only` list, in `config/routes.rb`, and that the file is saved.

</details>

<details class="pergunta" markdown="1">
<summary><code>undefined method 'message_path'</code> shows up</summary>

The edit form doesn't know where to send the fix. Check that `:update` is on the `only` list, in `config/routes.rb` (step 7), and that the file is saved.

</details>

<details class="pergunta" markdown="1">
<summary>I clicked Save, but the message didn't change</summary>

First, look at the **server's terminal**: if an error showed up, it's there, not in the browser. If there's no error, check the `update` action in the controller: it needs the line `@message.update(message_params)`. Without it, Rails looks up the message and goes back to the home page without changing anything.

</details>

<details class="pergunta" markdown="1">
<summary>The Delete button doesn't ask anything</summary>

Check that the button's line is the same as in step 10, with `form: { data: { turbo_confirm: "..." } }`, and that the `{ }` braces are closed. Save and reload the page with **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows and Linux).

</details>

<details class="pergunta" markdown="1">
<summary><code>InvalidAuthenticityToken</code> shows up when saving or deleting</summary>

It's the same Codespaces form error from chapter 04. Ask someone on the mentoring team for help. 💜

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/05-fix-or-delete.md %}).
