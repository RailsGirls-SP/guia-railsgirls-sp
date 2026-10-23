---
title: "03. How do we see all the messages?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 4
translation_of: mentoras/projetos/mural-de-recados/03-ver-todos-os-recados.md
translated_from: 886a813
---

# 03. How do we see all the messages?

[See chapter]({{ site.baseurl }}{% link projects/message-board/03-see-all-the-messages/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-03`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

## Questions for "Think before you code"

- "When you open a website, what's the first thing that shows up?" Leads to the idea of a home page (`root`).
- "What shows up on each message?" Helps connect the screen to the `author` and `content` columns.
- "What if nobody has posted yet?" Prepares the step about the empty message board.

## Error screens on purpose

{: .atencao }
The error screens in this chapter show up **on purpose**. Don't skip the steps that cause errors, don't fix things for the person and don't reassure them by saying "it's just an error, ignore it": the goal is precisely to read the error.

The chapter starts from the browser and follows the request's path, one piece at a time:

1. Open `/messages` before anything exists: **Routing Error**, `No route matches [GET] "/messages"`. **The route is missing.**
2. Create the route: **ActionDispatch::MissingController**, `uninitialized constant MessagesController`. **The route exists, but the controller is missing.**
3. Generate the controller with `bin/rails generate controller Messages index`: the example page shows up.
4. Delete the route `get "messages/index"` that the generator added: `/messages/index` goes back to giving **Routing Error**, `No route matches`.

When the error screen shows up, ask: "what is the message saying is missing?". Comparing the first two errors ("there's no route" and "there's no controller") is one of the best ways to understand what each piece does. Reading error messages is one of the most important skills of the day, and this chapter is the safe place to practice.

### Celebrate new errors

An error **different** from the previous one means the participant moved forward: the piece from before is working, and now the message points to the next one. The guide says so in step 4 ("Progress!"), and it's worth reinforcing out loud: "Look, the error changed! The route already works."

For a beginner, an error screen feels like failure. Celebrating each new error helps swap that feeling for curiosity, and this way of seeing errors helps for the rest of the day, not just this chapter.

## Common confusions

- **Unsaved file.** The most common cause of "I fixed it and the error is still there". In the editor, the tab of an unsaved file shows a dot instead of the **X**.
- **The name in `generate controller`.** It has to be `Messages`, plural. With the wrong name, `bin/rails destroy controller` undoes it.
- **Forgetting to delete the generator's route.** It doesn't break anything, but it leaves the `/messages/index` address lying around. It's worth asking: "why is this line here?".
- **Forgetting to delete the view's example text** (*Find me in…*).
- **The `@`.** Forgetting the `@` in the controller or in the view. The error in the view is usually `undefined method 'each' for nil`.
- **`<%=` and `<%`.** Using `<%` where it should be `<%=` makes the content not show up, with no error at all, which is more confusing than an error.
- **The `Message.destroy_all` in step 8.** It's on purpose: the participant deletes the messages to see the empty page and the invitation. The messages come back in chapter 04, posted through the browser. If someone is sad about losing Ana's message, remind them it can be posted again through the form.

  {: .atencao }
  > `destroy_all` deletes everything and **can't be undone**. There's no risk here: it's the development database, with test messages. But it's worth being careful when showing the command: check that the participant is in the console of their own codespace, and not in a real app. If the conversation comes up, explain that, in an online app, a command like this would delete the data of everyone who uses the app, and that's why programmers avoid running commands that delete data in the production database, or do it very carefully and with a backup.
- **Empty message board in a new codespace.** The database doesn't go to GitHub (see the notes for chapter 02). Just create a message from the console.

## Why step 8 uses only `if`, without `else`

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: step 8 only shows the `if` and explains that the invitation shows up when the list is empty. `else` only comes in if someone asks.

People who already program may find step 8 odd: the invitation shows up with an `if`, but the list of messages is outside it, with no `else`.

```erb
<% if @messages.empty? %>
  <p>There are no messages yet. How about posting the first one?</p>
<% end %>

<% @messages.each do |message| %>
  ...
<% end %>
```

You don't need `else` because `each` already handles the empty case on its own: on a list with no messages, it repeats the part **zero times**, and no message shows up. So the only thing missing is the `if` to show the invitation. With messages, the `if` is false and the invitation doesn't show up.

With `else` it would work too:

```erb
<% if @messages.empty? %>
  <p>There are no messages yet. How about posting the first one?</p>
<% else %>
  <% @messages.each do |message| %>
    ...
  <% end %>
<% end %>
```

The guide prefers the first form because the participant only **adds** three lines, without touching code that already works, and learns one new concept (`if`) at a time. If the person asks "what if there are messages?", it's a good moment to show what `each` does with an empty list.

## Why the generator's route is different from the guide's

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: step 9 only shows that both routes lead to the same place and that the generator's creates a repeated address. Only use it if someone asks what the difference between the two is.

In step 9, the participant compares two routes that lead to the same action:

```ruby
get "messages/index"                    # the generator's
get "messages", to: "messages#index"    # the guide's, from step 3
```

- **The generator's is the short form.** Without `to:`, Rails deduces the controller and the action from the address itself: `messages/index` goes to `messages#index`. `generate controller` doesn't know what each action is for, so it creates one route per action in this format, and the address ends up with the action's name (`/messages/index`).
- **The guide's chooses the address.** With `to:`, the address (`/messages`) and the destination (`messages#index`) are written separately. That way, the list of messages lives at the address we want, without `index` at the end.
- **Both work.** The reason to delete the generator's is to not have two addresses for the same page. In chapter 04, both forms give way to `resources :messages`, which creates the routes following the Rails standard.

People who learned Rails a while ago may remember the generator's route with single quotes (`get 'messages/index'`). Recent versions of Rails generate code with double quotes, following the RuboCop style that comes with new apps. For Ruby, both forms are the same.

## MVC

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the name MVC doesn't show up in the chapter. "Inside the app" only explains why the view is kept separate from the model ("Why keep the view separate from the model?"). If someone gets interested, great, but it's not a goal for the day.

**What it is.** MVC (*Model-View-Controller*) is an architecture pattern that splits the app into three responsibilities:

| Piece | Responsibility | In the Message Board |
|---|---|---|
| **Model** | the data and the rules about it | `Message`: what a message has, how to store and look it up, and (in chapter 07) what a valid message is |
| **View** | the presentation | `app/views/messages/index.html.erb`: how the messages show up on the screen |
| **Controller** | receives the request and coordinates model and view | `MessagesController#index`: looks up the messages and hands them to the view |

**Where it comes from.** The pattern was created in the late 1970s by Trygve Reenskaug, at Xerox PARC, for graphical interfaces in Smalltalk. It reached the web in the 1990s and 2000s, with frameworks like Struts (Java), and Rails helped popularize it. Today it shows up with variations in many frameworks, like Django, Laravel, Phoenix and ASP.NET MVC.

**Rails's role.** Rails (August 2004) and Django (July 2005) showed up with an emphasis on rapid development, and that took MVC beyond the world of large companies, where it had already been used for a long time. That's what the Wikipedia article on MVC says, which also notes that Django adopted a variation, *model-template-view*, and that the pattern was already popular among Java programmers. Saying that Rails "helped popularize it" is a reasonable reading, but it didn't invent anything: MVC is more than 20 years older (1979 versus 2004), and it already existed on the web.

To learn more:

- [Model–view–controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), on Wikipedia, with the history, the variations and the references: from its creation, in Smalltalk, to Rails and Django.
- [Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html#model-view-controller-basics), in the "Model-View-Controller Basics" section: how Rails itself describes MVC.
- [GUI Architectures](https://martinfowler.com/eaaDev/uiArchs.html), by Martin Fowler: MVC's origin in graphical interfaces and variations like MVP. The text only talks about graphical interfaces, not the web.

**In Rails.** MVC shows up in the folder names: `app/models`, `app/views` and `app/controllers`. But Rails has more pieces around it, which the guide introduces little by little: the **routes** (`config/routes.rb`), which come before the controller; the **layouts**, which wrap every view; the **helpers**; and the **migrations**, which change the database, but aren't part of MVC itself. If a participant asks "and the route, what is it in MVC?", the honest answer is: none of the three; it's the front door that chooses the controller.

**Why separate.** The chapter's argument is the same one used day to day: change how things look without touching the data, use the same data on different screens and know where to look for each problem. Chapter 06 is the practical proof: the cards change completely, and the model doesn't change at all.

A comparison that helps here is **how a house is organized**: each thing is in the right room, the pots and groceries in the kitchen, the clothes in the bedroom. You can replace the living room sofa without touching the pantry, and, when you run out of salt, nobody looks in the wardrobe. In the app it's the same: each kind of file lives in its folder (`app/models`, `app/views`, `app/controllers`), and, when there's a problem, the person already knows which room to look in. The comparison works well for **why** to separate and for the folders, but not for explaining each piece's role, because a house doesn't have a "controller".

**Tips for talking about this:**

- Stick to the three responsibilities and the Message Board's files. Terms like "layer", "architecture" or "separation of concerns" don't help beginners.
- A common rule in the Rails community is "skinny controller, fat model": the rules live in the model, and the controller only coordinates. You don't need to mention it now, but it's what the guide follows when, in chapter 07, the rule "a message can't be empty" goes into the model.

## The error page in Codespaces

In the server's terminal, `Cannot render console from …! Allowed networks: …` may show up. It's Rails saying it won't show the interactive console on the error page, because the access comes through the Codespaces address, and not from the computer itself. The error page shows up as usual, just without that console. You can ignore it.

## Next notes

[04. How do we post a message?]({{ site.baseurl }}{% link mentors/projects/message-board/04-post-a-message.md %})
