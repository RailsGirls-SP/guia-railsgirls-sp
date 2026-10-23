{% comment %}translation_of: _includes/mural-de-recados/04/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
<!-- TODO: check in Codespaces whether the line config.hosts << /.*\.app\.github\.dev/ from Imersão 2025 is needed (the codespaces-rails template already allows the address through the RAILS_DEVELOPMENT_HOSTS variable). -->

Stuck on a step? See [Stuck?](#stuck), at the end of the page.

In this chapter, you're going to create the New message page, with a form, and follow the message's path until it shows up on the message board. The errors come back, like in [How do we see all the messages?]({{ site.baseurl }}{% link projects/message-board/03-see-all-the-messages/hands-on.md %}), and each one shows the next missing piece.

<details class="passo" markdown="1" open>
<summary>1. Start the server</summary>

Open your codespace and start the server, if it isn't running yet:

```
bin/rails server
```

Open the app in the browser (with the **Open in Browser** message or from the **Ports** tab) and leave that tab open. For the other commands, open a new terminal with the **+** button.

**Check:** the browser shows the heading **Message Board** and the invitation **There are no messages yet. How about posting the first one?**, from the end of the previous chapter.

Done? Open step **2. Put the New message link on the home page**

</details>

<details class="passo" markdown="1">
<summary>2. Put the New message link on the home page</summary>

The new message will be written on a page just for the form. First, the home page needs a way to get there: a link.

Open `app/views/messages/index.html.erb`. Right below the heading (the `<h1>` line), add:

```erb
<%= link_to "New message", new_message_path %>
```

Save the file.

- `link_to` creates a link. The first piece is the text that shows up on the page: **New message**.
- `new_message_path` is the address of the new message page. It's a name Rails creates from the routes, like `root_path`.

**Make a guess:** in the app's tab, open the home page: the address with nothing after `.app.github.dev`, similar to this one:

```
https://your-codespace-3000.app.github.dev/
```

Will the link show up?

**Check:** not yet! The **NameError** error page shows up, with the message `undefined local variable or method 'new_message_path'`.

Rails doesn't know `new_message_path` because there's no route for the new message page yet.

Saw the error? Now open step **3. Fix the error: create the route**

</details>

<details class="passo" markdown="1">
<summary>3. Fix the error: create the route</summary>

Open `config/routes.rb`. Right now it has this line:

```ruby
get "messages", to: "messages#index"
```

Replace that line with:

```ruby
resources :messages, only: [ :index, :new ]
```

Save the file. Don't touch the `root` line.

- `resources :messages` creates the routes for the messages following the Rails [convention]({{ site.baseurl }}{% link glossary.md %}#convention): each [action]({{ site.baseurl }}{% link glossary.md %}#action) gets its address and its kind of request, without you having to write a line for each one.
- `only` lists the actions you want. For now, two: `index` (see the list, with `GET /messages`, the same route as before) and `new` (the new message page, with `GET /messages/new`).

Reload the page.

**Check:** the home page is back, now with the **New message** link below the heading.

**Make a guess:** click **New message**. What's going to happen?

**Check:** a different error shows up! Progress! Now it's the **Unknown action** page, with the message `The action 'new' could not be found for MessagesController`.

The route led to the `new` action of `MessagesController`, but the controller doesn't know how to do `new` yet.

Saw the new error? Now open step **4. Create the new action**

</details>

<details class="passo" markdown="1">
<summary>4. Create the new action</summary>

A form needs to know **what** it's going to fill in. In our case, a new message, still blank. The `new` action is what prepares that message.

Open `app/controllers/messages_controller.rb` and add the `new` action, right after `index`:

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

Save the file.

- `Message.new` creates a new, blank message, only in the app's memory. It is **not** stored in the database. That's different from the `Message.create` you used in the console, which creates and stores it right away.
- `@message` (singular) is the form's blank message. `@messages` (plural) is still the list of messages. Notice the one-letter difference.

**Make a guess:** reload the page. What now?

**Check:** another error! It's the **No view template for interactive request** page, with the message `MessagesController#new is missing a template for request formats: text/html`. That means: the `new` action exists, but it doesn't have a [view]({{ site.baseurl }}{% link glossary.md %}#view) to show.

Read the rest of the message: Rails itself says where it looked for the view, in `app/views/messages/new.html.erb`. In the previous chapter, the generator created the `index` view. Now, you're going to create the view by hand.

Saw the error? Now open step **5. Create the form page**

</details>

<details class="passo" markdown="1">
<summary>5. Create the form page</summary>

In the Explorer, right-click the `app/views/messages` folder, choose **New File…** and create the file `new.html.erb`. Write this in it:

```erb
<h1>New message</h1>

<%= form_with model: @message do |form| %>
  <div>
    <%= form.label :author, "Your name" %>
    <%= form.text_field :author %>
  </div>
  <div>
    <%= form.label :content, "Message" %>
    <%= form.text_area :content %>
  </div>
  <%= form.submit "Post message" %>
<% end %>

<%= link_to "Back", root_path %>
```

Save the file.

- `form_with model: @message` creates a form for the blank message the `new` action prepared.
- `form.label` is the text that shows up next to each field: **Your name** and **Message**.
- `form.text_field :author` is a one-line text box, for the author. `form.text_area :content` is a bigger box, for the text of the message.
- `form.submit` is the button that sends the form.
- `link_to "Back", root_path` is a link back to the home page.

**Make a guess:** reload the page. How will the form look?

**Check:** the heading **New message**, the **Your name** and **Message** fields, the **Post message** button and the **Back** link show up, still without any decoration. How it looks is for another chapter.

<!-- TODO: screenshot of the New message page with the form -->

Click **Back** and then **New message** again, to see the path between the two pages.

Done? Open step **6. Post the first message**

</details>

<details class="passo" markdown="1">
<summary>6. Post the first message</summary>

On the **New message** page, fill in the form:

- **Your name:** Ana
- **Message:** My first message!

Click **Post message**.

**Make a guess:** will the message show up on the message board?

**Check:** not yet! And this time, nothing happens on the screen: the **New message** page stays the same. When a form causes an error, Rails doesn't show the error page in the browser. The error shows up somewhere else: in the **server's terminal**.

Go to the terminal where `bin/rails server` is running and look at the last lines. There you'll see:

```
Started POST "/messages"
ActionController::RoutingError (No route matches [POST] "/messages"):
```

{: .dica }
Keep this tip for the rest of the project: **clicked and nothing happened? Look at the server's terminal.** That's where the app tells you what went wrong.

Notice the `POST`. Until now, the browser only made `GET` requests, which are for **asking for** a page. To **send** a form, it uses `POST`. And the routes you created only take `GET`.

Saw the error in the terminal? Now open step **7. Fix the error: complete the route**

</details>
<details class="passo" markdown="1">
<summary>7. Fix the error: complete the route</summary>

Open `config/routes.rb` and add `:create` to the `only` list:

```ruby
resources :messages, only: [ :index, :new, :create ]
```

Save the file.

- `create` is the action that receives the form, with `POST /messages`, the route that was missing.

**Make a guess:** the route for `POST` exists now. Go back to the **New message** page, fill in the form again and click **Post message**. What will show up in the server's terminal?

Saw the new error in the terminal? Now open step **8. Oh no! A new error!**

</details>
<details class="passo" markdown="1">
<summary>8. Oh no! A new error!</summary>

**Check:** again, nothing happens on the screen. Look at the server's terminal: a different error shows up! Progress!

```
AbstractController::ActionNotFound (The action 'create' could not be found for MessagesController):
```

The route sent the form to the `create` action of `MessagesController`, but the controller doesn't know how to do `create` yet.

Open `app/controllers/messages_controller.rb` and make the file look like this:

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

Save the file. There's a lot of new stuff here:

- `def create` is the action that receives the form.
- `Message.create(message_params)` creates the message with what came from the form and stores it in the database, like the `Message.create` in the console.
- `redirect_to root_path` sends the browser back to the home page, which shows the message board with the new message.
- `private` separates the actions from the parts that only the controller uses internally. Nothing that comes after it is an action.
- `message_params` is the list of what the controller accepts from the form: a message (`message`) with an author (`author`) and a text (`content`). Any other information that arrives is ignored.

**Make a guess:** go back to the **New message** page, fill in the form and click **Post message**. What now?

**Check:** in Codespaces, nothing happens on the screen, once again. Look at the server's terminal: a new error shows up, similar to this one:

```
ActionController::InvalidAuthenticityToken (HTTP Origin header (https://localhost:3000) didn't match request.base_url (https://your-codespace-3000.app.github.dev)):
```

The route and the action exist now. This time, what rejected the form was a Rails protection. That's the topic of the next step.

{: .dica }
Are you using your own computer, and not Codespaces? For you, the message already shows up on the message board. Skip the next step and go on to step **10. What if the message is empty?**

Saw the error in the terminal? Now open step **9. One more error: form protection**

</details>
<details class="passo" markdown="1">
<summary>9. One more error: form protection</summary>

Rails has a protection that checks whether a form came from the app itself, and not from another website. Read the error again: the address the form came from (`localhost:3000`) doesn't match the app's address (the `.app.github.dev` one). In Codespaces, the two addresses are different, and this protection ends up rejecting the app's own forms.

In the Explorer, open the file `config/environments/development.rb`. Right before the last `end`, add this line:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Save the file.

This line turns off only the check of the origin address, and only while you're developing the app (*development*). The protection keeps working in the published app.

This file is only read when the server starts. So, restart the server: in the server's terminal, press **Ctrl+C** to stop it and then start it again:

```
bin/rails server
```

**Make a guess:** go back to the **New message** page, fill in the form and click **Post message**. What now?

**Check:** the browser goes back to the home page, and Ana's message shows up on the message board! 🎉 The invitation is gone.

<!-- TODO: screenshot of the message board with Ana's message -->

Post one more, to see the order. Click **New message** and fill in:

- **Your name:** Bia
- **Message:** I loved the workshop!

**Check:** Bia's message shows up above Ana's, because it's the newest.

Done? Open step **10. What if the message is empty?**

</details>

<details class="passo" markdown="1">
<summary>10. What if the message is empty?</summary>

**Make a guess:** what happens if someone clicks **Post message** without writing anything?

Test it: click **New message**, leave both fields empty and click **Post message**.

**Check:** no error shows up, and the message board gets an empty message: just a dash (—), with no text and no author.

You had already seen this in "Break it on purpose" in [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/what-happened.md %}): Rails stores the message because nobody told it that an empty message isn't allowed. Deciding that is the programmer's job, and it's the topic of the chapter [What if someone sends an empty message?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/index.md %}).

For now, delete the empty message from the console. In the new terminal:

```
bin/rails console
```

```ruby
Message.last.destroy
```

This command takes the last stored message and deletes it, like in chapter 02. Then leave the console. Type:

```
exit
```

Reload the page.

**Check:** the empty message is gone, and Bia's and Ana's messages are still there.

Done? Open step **11. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>11. Save your progress</summary>

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Post messages through the form` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Post messages through the form` shows up with the **main** label and the cloud icon.

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The page keeps showing the error, even after fixing it</summary>

Check that you **saved** all the files: in the editor, a file with unsaved changes has a dot instead of the **X** on its tab. Save (**Cmd+S** or **Ctrl+S**) and reload the page.

</details>

<details class="pergunta" markdown="1">
<summary><code>Passed nil to the :model argument</code> shows up</summary>

The form didn't get the blank message. Check that the controller has the line `@message = Message.new` inside `def new` (step 4), with the `@` and in the singular.

</details>

<details class="pergunta" markdown="1">
<summary><code>InvalidAuthenticityToken</code> or <code>HTTP Origin header didn't match</code> shows up</summary>

It's the form protection from step 9. Check that the line `config.action_controller.forgery_protection_origin_check = false` is in `config/environments/development.rb`, before the last `end`, and that you **restarted the server** after saving (Ctrl+C and `bin/rails server`). If it keeps happening, ask someone on the mentoring team for help. 💜

</details>

<details class="pergunta" markdown="1">
<summary>The <code>new</code> or <code>create</code> action exists, but <code>could not be found</code> keeps showing up</summary>

Check that `def new` and `def create` are **before** the `private` line. Nothing that comes after `private` is an action, and Rails can't find it.

</details>

<details class="pergunta" markdown="1">
<summary><code>param is missing or the value is empty</code> shows up</summary>

The controller didn't find the message in what came from the form. Check that `new.html.erb` uses `form_with model: @message` and that the fields are called `:author` and `:content`, the same as in `message_params`.

</details>

<details class="pergunta" markdown="1">
<summary>I clicked Post message and nothing happened</summary>

First, look at the **server's terminal**: when a form causes an error, that's where the error shows up, not in the browser. Read the last error line and compare it with steps 6, 8 and 9.

If there's no error in the terminal, click **Back**: if the message shows up, it was stored, but the browser didn't go back to the message board. Check that the `create` action has the line `redirect_to root_path`.

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/04-post-a-message.md %}).
