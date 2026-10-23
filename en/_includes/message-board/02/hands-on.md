{% comment %}translation_of: _includes/mural-de-recados/02/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
Stuck on a step? See [Stuck?](#stuck), at the end of the page.

<details class="passo" markdown="1" open>
<summary>1. Open a new terminal</summary>

Open your codespace. If the server is still running in the terminal, leave it there: open a new terminal with the **+** button on the terminal panel.

![The terminal with the server running and the + button on the terminal panel highlighted with the label New terminal]({{ '/assets/images/mural-de-recados/02/terminal-novo-botao.png' | relative_url }})

**Check:** the new terminal shows a line ending in `$`, ready to take commands, and it's in the project folder, `/workspaces/message-board`.

On the right of the panel is the list of terminals: **puma** is the server's terminal, and **bash** is the new terminal. To switch from one to the other, click its name.

![A new terminal open, with the list of terminals on the right highlighted: puma and bash]({{ '/assets/images/mural-de-recados/02/terminal-novo-lista.png' | relative_url }})

If a Copilot tip shows up in the new terminal, you can ignore it.

Done? Open step **2. Create the Message model**

</details>

<details class="passo" markdown="1">
<summary>2. Create the Message model</summary>

In Rails, the part of the app that takes care of one kind of information, like the messages, is called a **[model]({{ site.baseurl }}{% link glossary.md %}#model)**. Let's create the model for the messages, saying which information it has: the message is called `Message`, the author is `author` and the text of the message is `content`. The text is called `content`, and not `message`, so the code doesn't end up saying `message.message`.

**Make a guess:** the command below says `author:string` and `content:text`. What do you think `string` and `text` mean?

In the terminal, type:

```
bin/rails generate model Message author:string content:text
```

**Check:** the terminal shows a list of created files, similar to this one:

```
invoke  active_record
create    db/migrate/20261003120000_create_messages.rb
create    app/models/message.rb
invoke    test_unit
create      test/models/message_test.rb
create      test/fixtures/messages.yml
```

The command created four files:

- `db/migrate/…_create_messages.rb`: the **migration**, with the instructions to create the messages table in the database. You'll review this file in the next step. The number at the beginning of the name is the date and time you ran the command, so yours will be different.
- `app/models/message.rb`: the `Message` **model**, which represents a message inside the app.
- `test/models/message_test.rb`: a place to write [automated tests]({{ site.baseurl }}{% link glossary.md %}#automated-test) for the model.
- `test/fixtures/messages.yml`: example messages, used only by the tests.

{: .pensando-title }
> Model and migration
>
> Think of a spreadsheet of messages:
>
> - The **migration** sets up the spreadsheet: it creates the tab and names the columns, `author` and `content`.
> - The **model** is a specialist assistant: they only take care of the messages spreadsheet. They write a new row for each message, look things up, count and delete. If the app ever stores another kind of information, it gets an assistant of its own, that is, another model.
>
> One prepares the place; the other works with what's inside it.

**For now, we're going to skip the tests.** You don't need to open or change the two files in the `test` folder: you can leave them there, the way Rails created them.

About the guess: `string` is a short text, like a name; `text` is a long text, like a message.

Done? Open step **3. Review the migration**

</details>

<details class="passo" markdown="1">
<summary>3. Review the migration</summary>

`generate` created a **[migration]({{ site.baseurl }}{% link glossary.md %}#migration)**: a file with the instructions to create the messages table in the database. It hasn't been applied yet.

In the Explorer, open the `db/migrate` folder and click the file that ends in `_create_messages.rb`. It looks like this:

```ruby
class CreateMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :messages do |t|
      t.string :author
      t.text :content

      t.timestamps
    end
  end
end
```

**Make a guess:** can you find where the author and the message text show up? And what do you think `t.timestamps` does?

**Check:** the line `create_table :messages` creates the `messages` table, and the lines `t.string :author` and `t.text :content` create a column for each piece of information. `t.timestamps` creates two columns that Rails fills in on its own: `created_at` (when the message was created) and `updated_at` (when it was last changed).

You don't need to change anything in this file.

{: .pensando-title }
> Notice
>
> The migration hasn't created anything yet. It's just the instruction, like the drawing of a spreadsheet with the name of each column. The real spreadsheet, the table in the database, doesn't exist yet: it's created in the next step.

Done? Open step **4. Run the migration**

</details>

<details class="passo" markdown="1">
<summary>4. Run the migration</summary>

Now let's apply the migration, so the table really exists in the database. In the terminal, type:

```
bin/rails db:migrate
```

**Check:** the terminal shows something like this:

```
== 20261003120000 CreateMessages: migrating ==========
-- create_table(:messages)
   -> 0.0012s
== 20261003120000 CreateMessages: migrated (0.0013s) =
```

The `messages` table was created. Also notice the `db/schema.rb` file: it shows what the database looks like now, with the new table.

Done? Open step **5. Store a message from the console**

</details>

<details class="passo" markdown="1">
<summary>5. Store a message from the console</summary>

There isn't a screen to post messages yet: that comes in chapter 04. But you can already store a message from the **console**, a way of talking to the app by writing Ruby code straight into the terminal.

In the terminal, type:

```
bin/rails console
```

The terminal changes and starts waiting for Ruby code. Type:

```ruby
Message.create(author: "Ana", content: "My first message!")
```

**Check:** the console shows a line with `INSERT INTO "messages"` (Rails storing the message in the database) and, at the end, the created message, with `id: 1`, the author, the text and the dates.

Now ask how many messages there are:

```ruby
Message.count
```

**Check:** the answer is `1`.

{: .pensando-title }
> What did the model do here?
>
> `Message.create` asked the model, the assistant who specializes in messages, to write a new row in the `messages` spreadsheet:
>
> | id | author | content | created_at |
> |---|---|---|---|
> | 1 | Ana | My first message! | (now) |
>
> You only gave the author and the text: the assistant filled in the `id` and the dates on their own. And `Message.count` asked them to count how many rows the spreadsheet has.

Done? Open step **6. Close the console and open it again**

</details>

<details class="passo" markdown="1">
<summary>6. Close the console and open it again</summary>

**Make a guess:** if you close the console and open it again, will Ana's message still be there?

To leave the console, type:

```ruby
exit
```

Open the console again:

```
bin/rails console
```

And ask again:

```ruby
Message.count
```

**Check:** the answer is still `1`. The message wasn't stored in the console: it was in the database, and it's still there even after closing everything. That was the chapter's challenge! 🎉

To see the whole message, type:

```ruby
Message.first
```

Then leave the console with `exit`.

Done? Open step **7. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>7. Save your progress</summary>

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Create the Message model` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Create the Message model` shows up with the **main** label and the cloud icon.

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The terminal says <code>Could not find command</code> or <code>No such file or directory</code></summary>

You're probably outside the project folder. Type `cd /workspaces/message-board` and try again.

</details>

<details class="pergunta" markdown="1">
<summary>I got a field name wrong in <code>generate</code></summary>

If you **haven't** run the migration yet, undo what `generate` created and generate it again:

```
bin/rails destroy model Message
```

If you **already** ran the migration, undo it first, with `bin/rails db:rollback`, and then run `destroy`.

If in doubt, ask someone on the mentoring team for help. 💜

</details>

<details class="pergunta" markdown="1">
<summary>The console says <code>NameError: uninitialized constant Message</code></summary>

Check that you wrote `Message` with a capital **M**: for Ruby, `message` and `Message` are different things. If that's right, check that the file `app/models/message.rb` exists (step 2).

</details>

<details class="pergunta" markdown="1">
<summary>The console says <code>no such table: messages</code></summary>

The migration hasn't been applied yet. Leave the console with `exit` and run `bin/rails db:migrate` (step 4).

</details>

<details class="pergunta" markdown="1">
<summary>The browser shows the error <code>Migrations are pending</code></summary>

You created the migration, but haven't run it yet. Run `bin/rails db:migrate` (step 4) and reload the page.

</details>

<details class="pergunta" markdown="1">
<summary>The console won't let me type terminal commands</summary>

You're still inside the console, which only understands Ruby. Type `exit` to go back to the terminal.

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/02-store-the-messages.md %}).
