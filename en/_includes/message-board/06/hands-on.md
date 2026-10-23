{% comment %}translation_of: _includes/mural-de-recados/06/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
Stuck on a step? See [Stuck?](#stuck), at the end of the page.

In this chapter, you only change how things look. No stored message changes.

{: .pensando-title }
> Why use a ready-made library?
>
> To make the page look nice, we're going to use **Bulma**, a set of ready-made styles. Instead of writing the look from scratch, you just give names (classes) to the parts of the page, like `button` or `card`, and Bulma takes care of how they look. That way, with just a few changes, the message board looks like a finished website. You don't need to memorize any of these names: programmers look things up in the documentation whenever they need to.

<details class="passo" markdown="1" open>
<summary>1. Start the server</summary>

Open your codespace and start the server, if it isn't running yet:

```
bin/rails server
```

Open the app in the browser (with the **Open in Browser** message or from the **Ports** tab) and leave that tab open.

**Check:** the browser shows the message board, with the **New message** link and the messages with **Edit** and **Delete**. If you don't have about three messages yet, post a few through the form: that way you can see the cards side by side.

Done? Open step **2. Bring Bulma into the app**

</details>

<details class="passo" markdown="1">
<summary>2. Bring Bulma into the app</summary>

Every page in the app goes through a file that works like a frame: the **layout**. That's where we tell the browser to use Bulma.

In the Explorer, open the file `app/views/layouts/application.html.erb`. Make two changes:

**1.** On the second line, replace `<html>` with:

```erb
<html data-theme="light">
```

**2.** Look for the line that starts with `<%# Includes all stylesheet files`. Right **before** it, add:

```erb
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
```

Save the file.

- The `<link>` line tells the browser to fetch Bulma's styles from the internet.
- `data-theme="light"` keeps the app always light. Without it, anyone using their computer in dark mode would see a dark message board.

**Make a guess:** reload the page. Will anything change?

**Check:** it changes a little: the page's font looks different, and the heading becomes the same size as the rest of the text. Bulma is already working, but it doesn't know yet what each part of the page is. That's what you'll tell it in the next steps.

Done? Open step **3. Tidy up the heading and the New message link**

</details>

<details class="passo" markdown="1">
<summary>3. Tidy up the heading and the New message link</summary>

Open `app/views/messages/index.html.erb` and make the file look like this:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Message Board</h1>

    <%= link_to "New message", new_message_path, class: "button is-primary mb-5" %>

    <% if @messages.empty? %>
      <p>There are no messages yet. How about posting the first one?</p>
    <% end %>

    <% @messages.each do |message| %>
      <div>
        <p><%= message.content %></p>
        <p>— <%= message.author %></p>
        <%= link_to "Edit", edit_message_path(message) %>
        <%= button_to "Delete", message, method: :delete, form: { data: { turbo_confirm: "Do you really want to delete this message?" } } %>
      </div>
    <% end %>
  </div>
</section>
```

Save the file and reload the page.

The heading, the link and the messages are the same as before. The differences are the `<section>` and the `<div>` around everything, and `class:`, which gives a Bulma name to each part:

- `section` and `container` leave some space around and center the page.
- `title` is the highlighted heading.
- `button is-primary` turns the **New message** link into a colorful button, the main one on the page. `mb-5` adds some space below it.

**Check:** the heading stands out, and **New message** becomes a colorful button. The messages are still just text: that's the next step.

Done? Open step **4. Turn the messages into cards**

</details>

<details class="passo" markdown="1">
<summary>4. Turn the messages into cards</summary>

In the same file, replace the messages block, from `<% @messages.each do |message| %>` to its `<% end %>`, with the grid of cards. The whole file looks like this:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Message Board</h1>

    <%= link_to "New message", new_message_path, class: "button is-primary mb-5" %>

    <% if @messages.empty? %>
      <p>There are no messages yet. How about posting the first one?</p>
    <% end %>

    <div class="columns is-multiline">
      <% @messages.each do |message| %>
        <div class="column is-one-quarter">
          <div class="card has-background-warning-light">
            <div class="card-content">
              <p><%= message.content %></p>
              <p class="is-italic">— <%= message.author %></p>
              <div class="buttons mt-4">
                <%= link_to "Edit", edit_message_path(message), class: "button is-small" %>
                <%= button_to "Delete", message, method: :delete, class: "button is-small is-danger", form: { data: { turbo_confirm: "Do you really want to delete this message?" } } %>
              </div>
            </div>
          </div>
        </div>
      <% end %>
    </div>
  </div>
</section>
```

Save the file.

- `columns is-multiline` and `column is-one-quarter` build the grid: four messages per row, which move down to the next row when they no longer fit.
- `card` and `card-content` make the card, and `has-background-warning-light` paints the background a very light yellow, like a sticky note.
- `is-italic` puts the author in italics.
- `buttons`, `button is-small` and `is-danger` turn **Edit** and **Delete** into small buttons, with **Delete** in red. `mt-4` adds some space above them.

**Make a guess:** reload the page. How does the message board look?

**Check:** the page looks something like this:

![The message board with the title at the top, the green New message button and, below it, four yellow cards side by side, each with the message, the author in italics and the Edit and Delete buttons]({{ '/assets/images/mural-de-recados/06/mural-post-it.png' | relative_url }})
{: .ilustracao }

<!-- TODO: replace with the screenshot from Codespaces -->

Make the browser window narrower: the cards move down, one per row, like on a phone screen.

Done? Open step **5. Tidy up the form pages**

</details>

<details class="passo" markdown="1">
<summary>5. Tidy up the form pages</summary>

The **New message** and **Edit message** pages also use the layout, so they already have Bulma. All that's left is to give names to their parts.

Open `app/views/messages/new.html.erb` and replace everything with:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">New message</h1>

    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Your name", class: "label" %>
        <%= form.text_field :author, class: "input" %>
      </div>
      <div class="field">
        <%= form.label :content, "Message", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
      </div>
      <%= form.submit "Post message", class: "button is-primary" %>
    <% end %>

    <%= link_to "Back", root_path %>
  </div>
</section>
```

Save the file.

- `box` is the white box around the form.
- `field`, `label`, `input` and `textarea` arrange each field and its label.
- `button is-primary` is the main, colorful button, like **New message**.

Now do the same in `app/views/messages/edit.html.erb`. Replace everything with:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Edit message</h1>

    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Your name", class: "label" %>
        <%= form.text_field :author, class: "input" %>
      </div>
      <div class="field">
        <%= form.label :content, "Message", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
      </div>
      <%= form.submit "Save", class: "button is-primary" %>
    <% end %>

    <%= link_to "Back", root_path %>
  </div>
</section>
```

Save the file. Notice: it's the same code as `new.html.erb`, just with a different heading and a different button.

**Check:** click **New message** and then **Edit** on a message. Both pages now look like the message board: the heading stands out, the form is in a white box and the button is colorful.

Done? Open step **6. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>6. Save your progress</summary>

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Make the messages look like sticky notes` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Make the messages look like sticky notes` shows up with the **main** label and the cloud icon.

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The page didn't change at all</summary>

Check, in this order:

1. Are `application.html.erb` and `index.html.erb` saved?
2. Is Bulma's `<link>` line the same as in step 2, inside the `<head>`?
3. Reload with **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows and Linux): sometimes the browser keeps the old page.
4. Bulma comes from the internet: check that your connection is working.

</details>

<details class="pergunta" markdown="1">
<summary>An error shows up on the page after changing the view</summary>

Check that the `<% end %>` lines are still there (the one for `each`, in `index.html.erb`, and the one for the form, in `new.html.erb` and `edit.html.erb`), and that no piece of the old code is left over. Compare the whole file with the code from steps 3, 4 and 5. If in doubt, ask someone on the mentoring team for help. 💜

</details>

<details class="pergunta" markdown="1">
<summary>The page got messed up, with parts out of place</summary>

Probably a `<div>` is missing its closing tag. Each `<div>` needs its `</div>`, and the `<section>`, its `</section>`. A missing `</div>` doesn't cause an error, but it messes up the page. Compare with the code from steps 3 and 4.

</details>

<details class="pergunta" markdown="1">
<summary>The message board turned dark</summary>

The `data-theme="light"` is missing from the `<html>` line, in `app/views/layouts/application.html.erb` (step 2). Without it, Bulma follows your computer's dark mode.

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/06-make-it-look-nicer.md %}).
