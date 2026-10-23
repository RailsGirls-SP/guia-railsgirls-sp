{% comment %}translation_of: _includes/mural-de-recados/07/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
Stuck on a step? See [Stuck?](#stuck), at the end of the page.

In this chapter, you're going to write the rules for a message and make the app tell the person when a rule isn't met.

<details class="passo" markdown="1" open>
<summary>1. Start the server</summary>

Open your codespace and start the server, if it isn't running yet:

```
bin/rails server
```

Open the app in the browser (with the **Open in Browser** message or from the **Ports** tab) and leave that tab open. For the other commands, open a new terminal with the **+** button.

**Check:** the browser shows the message board, with the **New message** button and the yellow cards.

Done? Open step **2. See the problem again**

</details>

<details class="passo" markdown="1">
<summary>2. See the problem again</summary>

Click **New message**, leave both fields empty and click **Post message**.

**Make a guess:** what's going to show up?

**Check:** an empty card, with only the dash (—). The app accepted a message with no name and no text.

![An empty yellow card, with only the dash and the Edit and Delete buttons]({{ '/assets/images/mural-de-recados/07/cartao-vazio.png' | relative_url }})
{: .ilustracao .ilustracao-pequena }

Delete this card with the **Delete** button. It was made in chapter 05 for exactly this.

Done? Open step **3. Write the rules for a message**

</details>

<details class="passo" markdown="1">
<summary>3. Write the rules for a message</summary>

The rules about the data live in the **[model]({{ site.baseurl }}{% link glossary.md %}#model)**. Open the file `app/models/message.rb`. It has only two lines:

```ruby
class Message < ApplicationRecord
end
```

Make the file look like this:

```ruby
class Message < ApplicationRecord
  validates :author, presence: { message: "Write your name." }
  validates :content, presence: { message: "Write your message." }
end
```

Save the file.

- `validates` creates a rule, which programmers call a **validation**.
- `:author` and `:content` are the columns the rule checks: the author and the text.
- `presence` means the information needs to be there. An empty text, or one with only spaces, doesn't count.
- `message` is the warning the person will see when the rule isn't met.

Done? Open step **4. Test it in the browser**

</details>

<details class="passo" markdown="1">
<summary>4. Test it in the browser</summary>

Go back to the app's tab, click **New message**, leave both fields empty and click **Post message**.

**Make a guess:** will the empty card show up?

**Check:** it doesn't. The model rejected the message, and nothing was stored. But notice: **no warning** shows up either. The app just goes back to the message board, as it was, and the person who tried to post doesn't know what happened.

<details class="pergunta" markdown="1">
<summary>See how it looks on the screen</summary>

![Animation: on the New message page, with the fields empty, the person clicks Post message; the app goes back to the message board, which still has only the invitation to post the first message, with no new card and no warning]({{ '/assets/images/mural-de-recados/07/postar-vazio-sem-aviso.gif' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

Done? Open step **5. See the warnings in the console**

</details>

<details class="passo" markdown="1">
<summary>5. See the warnings in the console</summary>

If the app rejected the message, where are the warnings? Let's ask the model, from the console.

In the new terminal, open the console:

```
bin/rails console
```

Create a blank message, without storing it, and ask whether it's valid:

```ruby
message = Message.new
message.valid?
```

**Check:** the console answers `false`: the message doesn't meet the rules. Now ask which warnings it has, one at a time. First, the author's warning:

```ruby
message.errors[:author]
```

**Check:** the console answers `["Write your name."]`.

Then, the text's warning:

```ruby
message.errors[:content]
```

**Check:** the console answers `["Write your message."]`.

Leave the console. Type:

```
exit
```

The warnings exist: the model knows what's missing. So why didn't they show up in the browser?

The problem is in the controller. Open `app/controllers/messages_controller.rb` and look at the `create` action:

```ruby
  def create
    Message.create(message_params)
    redirect_to root_path
  end
```

It tries to store the message and, whether it works or not, sends the browser back to the home page. Nobody checks whether the message was stored. **That's the bug:** when the model rejects the message, the `create` action needs to show the form again, with the warnings, and not go back to the message board as if everything had worked. That's what you're going to fix in the next step.

Done? Open step **6. Check whether the message was stored**

</details>

<details class="passo" markdown="1">
<summary>6. Check whether the message was stored</summary>

In `app/controllers/messages_controller.rb`, replace the `create` action with:

```ruby
  def create
    @message = Message.new(message_params)

    if @message.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end
```

Save the file. Read it calmly, from top to bottom:

- `Message.new(message_params)` builds the message with what came from the form, still without storing it.
- `@message.save` tries to store it. It answers [`true`]({{ site.baseurl }}{% link glossary.md %}#true-and-false) if the message meets the rules and was stored, and `false` if not.
- [`if` and `else`]({{ site.baseurl }}{% link glossary.md %}#condition): **if** it was stored, it goes back to the home page, like before. **Otherwise**, it shows the **New message** page again, with the rejected message in the form.
- `render :new` shows the `new` view without making a new request. That's why what the person wrote stays in the form.
- `status: :unprocessable_entity` tells the browser the form was rejected.

**Make a guess:** click **New message**, write only your name, leave the message empty and click **Post message**. Is your name still in the form?

**Check:** it is! The **New message** page stays open, with the name in the field, and no empty card is stored. But the warning doesn't show up yet: the view still needs to show it.

Done? Open step **7. Show what's missing**

</details>

<details class="passo" markdown="1">
<summary>7. Show what's missing</summary>

Open `app/views/messages/new.html.erb`. In the form, right below the `form.text_field :author` line, add:

```erb
        <% @message.errors[:author].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
```

And right below the `form.text_area :content` line, add:

```erb
        <% @message.errors[:content].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
```

The form looks like this:

```erb
    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Your name", class: "label" %>
        <%= form.text_field :author, class: "input" %>
        <% @message.errors[:author].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <div class="field">
        <%= form.label :content, "Message", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
        <% @message.errors[:content].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <%= form.submit "Post message", class: "button is-primary" %>
    <% end %>
```

Save the file.

- `@message.errors[:author]` is the list of warnings for the author, the same one you saw in the console. `each` shows each warning.
- `help is-danger` is from Bulma: small text, in red, below the field.
- When the form shows up for the first time, the blank message hasn't been checked yet, so there are no warnings.

**Make a guess:** leave both fields empty and click **Post message**. What shows up?

**Check:** below each field, in red, it shows what's missing:

![The New message page with the form: below the Your name field, in red, the message "Write your name."; below the Message field, "Write your message."; then, the Post message button and the Back link]({{ '/assets/images/mural-de-recados/07/recado-recusado.png' | relative_url }})
{: .ilustracao }

<!-- TODO: replace with the screenshot from Codespaces -->

Now fill in both fields and post: the message shows up as usual. 🎉

Done? Open step **8. What about a huge message?**

</details>

<details class="passo" markdown="1">
<summary>8. What about a huge message?</summary>

A book doesn't fit on a sticky note. Our plan limits the text to 280 characters.

In `app/models/message.rb`, add one more rule, right below the others:

```ruby
validates :content, length: { maximum: 280, message: "The message can have at most 280 characters." }
```

The model looks like this:

```ruby
class Message < ApplicationRecord
  validates :author, presence: { message: "Write your name." }
  validates :content, presence: { message: "Write your message." }
  validates :content, length: { maximum: 280, message: "The message can have at most 280 characters." }
end
```

Save the file.

- `length` checks the size of the text.
- `maximum: 280` means "at most 280 characters". Letters, spaces and emojis count.

Typing 281 characters into the form would be a lot of work. So test it in the console:

```
bin/rails console
```

```ruby
message = Message.new(author: "Ana", content: "a" * 281)
message.valid?
```

`"a" * 281` builds a text with the letter "a" repeated 281 times.

**Check:** `valid?` answers `false`. Now look at the warning:

```ruby
message.errors[:content]
```

**Check:** the console shows `["The message can have at most 280 characters."]`. Change `281` to `280` and test again: now the message is valid.

Leave the console with `exit`.

Done? Open step **9. What about fixing a message?**

</details>

<details class="passo" markdown="1">
<summary>9. What about fixing a message?</summary>

**Make a guess:** click **Edit** on a message, delete its text and click **Save**. What's going to happen?

**Check:** you go back to the message board, and the message still has the old text. The rule worked, and the empty text wasn't stored. But, again, nobody told the person: it looks like the fix was ignored.

It's the same problem as in steps 4 and 5, now in the `update` action. In `app/controllers/messages_controller.rb`, replace the `update` action with:

```ruby
  def update
    @message = Message.find(params[:id])

    if @message.update(message_params)
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end
```

`@message.update` also answers `true` or `false`, like `save`. If it goes wrong, the edit page shows up again, with what the person wrote.

Now the edit page needs to show the warnings, like the New message page. Open `app/views/messages/edit.html.erb` and make the file look like this:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Edit message</h1>

    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Your name", class: "label" %>
        <%= form.text_field :author, class: "input" %>
        <% @message.errors[:author].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <div class="field">
        <%= form.label :content, "Message", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
        <% @message.errors[:content].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <%= form.submit "Save", class: "button is-primary" %>
    <% end %>

    <%= link_to "Back", root_path %>
  </div>
</section>
```

Save both files.

**Check:** open the edit page for a message, delete its text and click **Save**. The warning **Write your message.** shows up below the field, and the message doesn't change until you write something.

Notice: the form in `edit.html.erb` is the same as the one in `new.html.erb`, with the same warnings. Only the heading and the button's text change.

<details class="pergunta" markdown="1">
<summary>One form for both pages <span class="label label-purple">Going further</span></summary>

You wrote the same form twice. If a message ever gets a new field, like the color from the extra challenge, you'll have to change both files, and it's easy to forget one of them. Rails has a way to write a piece of a view only once and use it on several pages: the **partial**.

**1.** In the Explorer, right-click the `app/views/messages` folder, choose **New File…** and create the file `_form.html.erb`. The `_` at the beginning of the name is what tells Rails the file is a partial. Write this in it:

```erb
<%= form_with model: message, class: "box" do |form| %>
  <div class="field">
    <%= form.label :author, "Your name", class: "label" %>
    <%= form.text_field :author, class: "input" %>
    <% message.errors[:author].each do |error| %>
      <p class="help is-danger"><%= error %></p>
    <% end %>
  </div>
  <div class="field">
    <%= form.label :content, "Message", class: "label" %>
    <%= form.text_area :content, class: "textarea" %>
    <% message.errors[:content].each do |error| %>
      <p class="help is-danger"><%= error %></p>
    <% end %>
  </div>
  <%= form.submit submit_text, class: "button is-primary" %>
<% end %>
```

It's the same form, with two differences: the message is called `message`, without the `@`, and the button's text is `submit_text`. Whoever uses the partial is the one who says what goes in each.

**2.** Make `app/views/messages/new.html.erb` look like this:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">New message</h1>

    <%= render "form", message: @message, submit_text: "Post message" %>

    <%= link_to "Back", root_path %>
  </div>
</section>
```

**3.** And `app/views/messages/edit.html.erb` like this:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Edit message</h1>

    <%= render "form", message: @message, submit_text: "Save" %>

    <%= link_to "Back", root_path %>
  </div>
</section>
```

Save the three files.

- `render "form"` puts the partial `_form.html.erb` in that spot on the page. In `render`, the name goes without the `_` and without the `.html.erb`.
- `message: @message` hands the message to the partial, and `submit_text:` hands over the button's text.

**Check:** open the **New message** page and the edit page for a message. Both look the same as before, with the warnings when something is missing. The difference is in the code: the form now lives in a single place.

</details>

Done? Open step **10. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>10. Save your progress</summary>

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Validate the messages and show the warnings` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Validate the messages and show the warnings` shows up with the **main** label and the cloud icon.

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The page still accepts the empty message</summary>

Check that `app/models/message.rb` is saved and that each `validates` is **inside** the `class`, before the `end`. Also check that the column names are right: `:author` and `:content`.

</details>

<details class="pergunta" markdown="1">
<summary>I clicked Post message and nothing happened, not even the warning</summary>

Check that `render :new` has `status: :unprocessable_entity` at the end. Without it, the browser doesn't show the page with the warning. Then check that the view has the `@message.errors` blocks from step 7.

</details>

<details class="pergunta" markdown="1">
<summary>The warning shows up as <code>can't be blank</code>, not as the text I wrote</summary>

The `message:` is missing from the rule, in the model. Without it, Rails uses its default warning. Check that each `validates` is the same as in step 3, with the warning in quotes.

</details>

<details class="pergunta" markdown="1">
<summary>A syntax error shows up after changing the controller</summary>

Check that each `if` has its `end`, and each `def` too. In the `create` action, there are two `end`s at the end: one for the `if` and one for the `def`. Compare with the code from step 6. If in doubt, ask someone on the mentoring team for help. 💜

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/07-empty-messages.md %}).
