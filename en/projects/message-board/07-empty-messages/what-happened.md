---
title: "What happened?"
parent: "07. What if someone sends an empty message?"
grand_parent: Message Board
nav_order: 2
translation_of: projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/o-que-aconteceu.md
translated_from: b2293c8
---

# What happened?

<details class="passo" markdown="1" open>
<summary>Inside the app</summary>

When someone clicks **Post message**, the path now has a question in the middle:

1. The controller builds the message with what came from the form (`Message.new`).
2. The model checks the rules (`save`). If everything is right, it stores the message in the database and answers `true`. If something is missing, it doesn't store anything, writes down what was missing in `errors` and answers `false`.
3. The controller decides what to do with the answer: if it worked, it goes back to the message board; if not, it shows the page again (`render`).
4. The view shows the form with what the person wrote and, below each field, the warning about what's missing.

You are here: this is the path a request takes inside the app.

```mermaid
flowchart LR
  Browser --> Route --> Controller
  Controller <--> Model
  Model <--> Database[(Database)]
  Controller --> View --> Browser

  classDef aqui fill:#73121b,stroke:#f2b8be,stroke-width:2px,color:#fff
  classDef visto fill:#fbe3e5,stroke:#c98b91,color:#490606
  class Model,Controller,View aqui
  class Route,Database visto
```

In dark red, the pieces from this chapter; in light pink, the ones you already know from previous chapters.

#### The rules live in the model

The `Message` model is no longer just the place that stores and looks up messages: now it also knows **what a valid message is**. Since every message goes through the model before going to the database, the rule applies to everything: the posting form, the fix and even the console.

#### You are the one who decides

Rails had no way of knowing that an empty message is a problem: for it, an empty text is a text like any other. Deciding the rules (what's required, what the maximum size is, what happens when something is missing) is the programmer's job. That's why you thought about them in the plan, before writing code.

#### Redirect or render

Until now, after storing, the controller used `redirect_to`: it tells the browser to make a new request, and the page starts from scratch, with an empty form. Now, when the message is rejected, the controller uses `render`: it puts the page together right away, with the `@message` that was just rejected. That's why what the person wrote stays in the form, together with the warnings.

</details>

<details class="passo" markdown="1">
<summary>There are no silly questions</summary>

<details class="pergunta" markdown="1">
<summary>Why does the rule live in the model, and not in the view?</summary>

Because the form is only one of the ways to create a message. You can also create one from the console, from the fix and, in a bigger app, in other ways. With the rule in the model, every message goes through it, wherever it comes from.

It's the idea of **centralizing**: the rule is written in a single place. If it were in each form, you'd have to repeat the same rule in `new.html.erb`, in `edit.html.erb` and in any other new page, and forgetting one would be enough for an empty message to get through. With the rule in the model, changing the limit from 280 to 200 characters means changing one line, and the change applies to the whole app.

</details>

<details class="pergunta" markdown="1">
<summary>What about the empty messages that were already stored?</summary>

The rules only apply to what gets stored from now on. An empty message stored before stays there, until someone deletes it. That's why, in step 2, you deleted the empty card.

</details>

<details class="pergunta" markdown="1">
<summary>Why 280 characters?</summary>

It's a decision for whoever plans the app: enough for a message, and short enough to fit on a card. The number 280 is just an example, based on the limit for a post on X (formerly Twitter), a size many people already know as a short message. Another app, or another group, could choose another number. What matters is that the rule exists and is written in a single place, the model.

</details>

<details class="pergunta" markdown="1">
<summary>What is unprocessable_entity? <span class="label label-purple">Going further</span></summary>

It's the name of a **status code**, a number the app sends along with each page to say how the request went. This one is 422, which means "I got the form, but I couldn't use what came in it". The browser uses this code to know it needs to show the page with the warnings, instead of moving on.

</details>

<details class="pergunta" markdown="1">
<summary>Why don't all the warnings show up together, above the form? <span class="label label-purple">Going further</span></summary>

They could, with `@message.errors.full_messages`, but Rails builds those sentences by joining the column's name with the warning: it would come out as `Author Write your name.`. By showing each warning below its field, the person sees only the sentence you wrote, and already knows where to fix it.

</details>

</details>

<details class="passo" markdown="1">
<summary>Break it on purpose <span class="label label-opcional">Optional</span></summary>

In the `create` action, replace the line `render :new, status: :unprocessable_entity` with `redirect_to new_message_path`. Save, click **New message**, write only your name and click **Post message**.

**Make a guess:** what's going to happen?

The **New message** page comes back, but empty: your name is gone, and no warning shows up. `redirect_to` tells the browser to make a new request, and the `new` action prepares a blank message, with nothing you wrote and without the warnings. That's why, when the message is rejected, the controller uses `render`.

Change the line back to `render :new, status: :unprocessable_entity` and save.

Now, in the model, replace `presence: { message: "Write your name." }` with just `presence: true`. Save and post a message without a name.

**Make a guess:** what will the warning say?

`can't be blank` shows up: it's the warning Rails uses when you don't write your own.

Go back to `presence: { message: "Write your name." }`, save and post again: your own warning is back.

</details>

<details class="passo" markdown="1">
<summary>Do I need AI for this chapter?</summary>

No. The rules are a few lines in the model, and Rails itself keeps the warnings for each field.

If you want to use an AI, use it as a tutor: ask it to explain, and do each step yourself. For example:

> Why do the rules for a message live in the model, and not in the form? Explain it without giving me code.
{: .pedido-ia }

See how to start the conversation in [Using AI as a tutor]({{ site.baseurl }}{% link getting-started/ai-as-a-tutor.md %}).

<details class="pergunta" markdown="1">
<summary>What if I asked the AI for the code? <span class="label label-purple">Going further</span></summary>

This chapter is the best example of why you should think before asking.

If you ask an AI to "make a message board in Rails", the generated code may accept empty messages, like yours did until now, or it may come with rules the AI chose on its own, which might not be the ones you wanted. It depends on the tool and on the request. **You are the one who decides that an empty message is an error**, and the AI only knows that if you tell it.

With the plan, the request looks like this:

> In my Rails app, the `Message` model has `author` and `content`. I want these rules: `author` and `content` required, and `content` with at most 280 characters. The warnings should be: "Write your name.", "Write your message." and "The message can have at most 280 characters.". When the message is rejected, the form comes back with what the person wrote and with the warning below each field.
{: .pedido-ia }

Check the result against the plan:

- Are the three rules in the model?
- Is a message with only spaces rejected?
- Do the `create` action and the `update` action check whether it worked, with `if`?
- Does what the person wrote stay in the form when the message is rejected?

See more tips in [Asking an AI for code]({{ site.baseurl }}{% link extras/asking-ai-for-code.md %}), in the Extras.

</details>
</details>

<details class="passo" markdown="1">
<summary>Remember</summary>

- The rules for the data live in the model, with `validates`, and apply to every message, wherever it comes from.
- `save` and `update` answer `true` if it worked and `false` if the message was rejected.
- When it works, the controller uses `redirect_to`; when the message is rejected, it uses `render`, which keeps what the person wrote.
- Rails doesn't know what a valid message is: the programmer decides.

</details>

<details class="passo" markdown="1">
<summary>Quiz</summary>

1. Someone tries to post a message with only the name. Is the message stored in the database?
2. Why does the name the person wrote stay in the form when the message is rejected?
3. You want the name to have at most 50 characters. Which file do you write this rule in?

<details markdown="1">
<summary>See the answers</summary>

1. No. The model checks the rules before storing, and `save` answers `false`.
2. Because the controller uses `render`, which shows the page with the rejected `@message`, instead of `redirect_to`, which would start from scratch.
3. In the model, `app/models/message.rb`: `validates :author, length: { maximum: 50, message: "..." }`.

</details>

</details>

<details class="passo" markdown="1">
<summary>Learn more</summary>

Official Rails guide:

- [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html): all the rules Rails already comes with.

</details>

## What's next?

The message board is ready: it looks nice, and it only accepts real messages. But it only works inside your codespace. Next challenge, optional: [How do we show the message board to the world?]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/index.md %})

Stopping here for today? See how to shut everything down and come back another day in [All done! What's next?]({{ site.baseurl }}{% link projects/message-board/09-whats-next/index.md %}).
