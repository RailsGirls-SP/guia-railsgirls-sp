---
title: "04. How do we post a message?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 5
translation_of: mentoras/projetos/mural-de-recados/04-postar-um-recado.md
translated_from: 1238896
---

# 04. How do we post a message?

[See chapter]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-04`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

{: .atencao }
**Let the errors happen.** The errors in this chapter show up **on purpose**, in the order of the request's path (see "The path of the errors", below). Don't fix them beforehand, don't say "it's just an error, ignore it" and don't give away the solution: ask "what is the message saying is missing?". Several only show up in the server's terminal, and that's also part of the learning (see "Form errors only show up in the terminal").

**And the form doesn't use a partial, on purpose.** The chapter writes the form directly in `new.html.erb`. The partial would be one more concept (`render` and local variables) in a chapter that already brings the route, the action, the view, the form and the form protection, and it only makes sense when the form repeats itself, which happens in chapter 05. It shows up later, as "Going further", in step 9 of chapter 07. If someone asks before that, say it exists, and that it's coming.

## Questions for "Think before you code"

- "Where would you look for the place to write your message?" Leads to the **New message** link on the home page and to the page just for the form, as in the plan.
- "After clicking the button, what do you expect to see?" Prepares the idea of going back to the message board (`redirect_to`).
- "What if someone clicks without writing anything?" No need to answer now: it's the hook for the empty message chapter.

## The path of the errors

As in chapters 03 and 05, the errors show up on purpose, in the order of the request's path:

1. The link `link_to "New message", new_message_path` with the old route: **NameError**, `undefined local variable or method 'new_message_path'`. **The route is missing.** What breaks is the whole home page, because the link is on it.
2. With `resources :messages, only: [ :index, :new ]`, clicking the link: **Unknown action**, `The action 'new' could not be found`. **The action is missing.**
3. With the `new` action: **No view template for interactive request**. **The view is missing.** It's the first time this error shows up: in chapter 03, the generator created the `index` view.
4. With `new.html.erb`, sending the form: nothing happens on the screen, and the server's terminal shows `ActionController::RoutingError (No route matches [POST] "/messages")`. **The route for `POST` is missing.**
5. With `:create` on the `only` list: again nothing on the screen, and the terminal shows `The action 'create' could not be found`. **The action is missing.**
6. With the `create` action, in Codespaces: nothing on the screen, and the terminal shows `ActionController::InvalidAuthenticityToken (HTTP Origin header (https://localhost:3000) didn't match request.base_url (…app.github.dev))`. **The form protection adjustment is missing** (step 9). On a local computer, this error doesn't show up.
7. With the `forgery_protection_origin_check` line and the server restarted: the message shows up. Celebrate! 🎉

The form shows up before the `POST` route exists because the `index` route already creates the name `messages_path`, which `form_with` uses to build the form's address. The error only shows up when sending.

**Form errors only show up in the terminal.** When a form is sent, Turbo (the part of Rails that sends forms without reloading the page) receives the error page, but it asks to reload the page (`turbo-visit-control: reload`). The browser reloads the form's page, the screen stays the same, and the error only shows up in the server's terminal. That's how it is in steps 4, 5 and 6 above, and in `update` and `destroy` in chapter 05. If someone says "I clicked and nothing happened", the first question is: "what does the server's terminal say?". To learn more about Turbo: [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction) and [Ensuring Specific Pages Trigger a Full Reload](https://turbo.hotwired.dev/handbook/drive#ensuring-specific-pages-trigger-a-full-reload), which explains `turbo-visit-control`. The explanation of the status codes is in the notes for [chapter 05]({{ site.baseurl }}{% link mentors/projects/message-board/05-fix-or-delete.md %}#rest-http-verbs-and-status-codes).

The `NameError` in the first step is different from the others: the message doesn't talk about a route. It's worth asking "where would Rails get this `new_message_path` from?" to connect the address's name to the route.

**Why the message doesn't talk about a route.** For Ruby, `new_message_path` is just a name it doesn't know: it looks for a variable or a method with that name, doesn't find one and complains (`undefined local variable or method`). Rails is what knows that name has to do with the routes, and Ruby doesn't take that into account in the message.

**Where the name comes from.** Each named route gets a method with its name plus `_path` (the address, like `/messages/new`) and `_url` (the full address, with the domain). The route's name shows up in the `Prefix` column of `bin/rails routes`:

| Prefix | Route | Methods created |
|---|---|---|
| `messages` | `GET /messages` (`index`) | `messages_path` and `messages_url` |
| `new_message` | `GET /messages/new` (`new`) | `new_message_path` and `new_message_url` |
| `root` | `GET /` (`root "messages#index"`) | `root_path` and `root_url` |

`resources :messages` chooses these names by convention: `new_` plus the singular for the form's page, and the plural for the list. Without the `new` route, the method doesn't exist, and the home page's link breaks. The error is in the missing route, not in the link. For the participant to see this, `bin/rails routes` shows the `Prefix` column: `new_message` only shows up in the list after `:new` is on the `only` list.

## Common confusions

- **`@message` and `@messages`.** One letter's difference: `@message` is the form's blank message, in the `new` action, and `@messages` is the list, in the `index` action. Swapping one for the other causes confusing errors, like `Passed nil to the :model argument`.
- **Creating `new.html.erb` in the wrong folder.** The file needs to be in `app/views/messages`, together with `index.html.erb`. In another folder, the view error continues.
- **Forgetting the `=` in `<%= form_with`.** Without the `=`, the form doesn't show up, and no error shows up either.
- **Actions after `private`.** A `def new` or `def create` written after `private` isn't an action, and the error is the same as when it doesn't exist.
- **Not restarting the server after step 9.** `config/environments/development.rb` is only read when the server starts.
- **The empty message in step 10.** It's on purpose: Rails accepts it, because nobody said it isn't allowed. Don't give away the solution; it's the empty message chapter.
- **`params.expect`.** People who know older versions of Rails may expect `params.require(:message).permit(:author, :content)`. `params.expect` is the new form (Rails 8), and does the same thing with an extra check of the shape of what arrived. See [Why `params.expect`](#why-params-expect).

## Why `params.expect`
{: #why-params-expect }

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: in the chapter, it's enough that `message_params` is "the list of what the controller accepts from the form".

`params.expect(message: [ :author, :content ])` does two things at once: it **requires** that `message` arrived and **permits** only the fields on the list. It has existed since Rails 8.0 (I checked the packages: 7.2.3 doesn't have it, and 8.0.0 does). Before, the way was `params.require(:message).permit(:author, :content)`.

**1. The list of fields protects against "mass assignment".** What sends the request isn't just the guide's form: anyone can open the browser's tools (**Inspect**), add a field to the form on the screen and send it. Rails doesn't notice the difference, because the edited form carries the same token as the form protection from step 9. If the controller accepted everything, they could change what they shouldn't. An example that doesn't exist in the app yet, but is in the notes: the "Moderation" idea, from the "How to take the project further" table (see the [notes for the extra challenges]({{ site.baseurl }}{% link mentors/projects/message-board/extra-challenges.md %}#how-to-take-the-project-further)), in which a person needs to approve the messages before they show up, and for that the message would get an `approved` column. If `message_params` included `:approved` (or if the controller accepted all fields), anyone could post an already-approved message, just by adding a field like this to the form:

```html
<input type="hidden" name="message[approved]" value="true">
```

With the two-field list, `approved` is discarded. I tested it: `expect` returned only `author` and `content`. This applies to both `expect` and `require.permit`: it's Rails's *strong parameters*. The most famous case was in 2012, when a researcher used this kind of flaw to add an SSH key to a GitHub account (the summary is on [Wikipedia](https://en.wikipedia.org/wiki/Mass_assignment_vulnerability)).

**2. `expect` checks the shape of what arrived.** That's its difference from `require.permit`. If someone sends `message=hack` (a text) instead of a message with fields:

| | What happens | Response to the browser |
|---|---|---|
| `params.require(:message).permit(:author, :content)` | `NoMethodError: undefined method 'permit' for an instance of String` | **500**, server error |
| `params.expect(message: [ :author, :content ])` | `ActionController::ParameterMissing: param is missing or the value is empty or invalid: message` | **400**, bad request |

Rails treats malformed input as a problem of whoever sent it (400), and not of the app (500). This matters for three reasons: the app doesn't "break" with invalid input, the real 500 errors don't get mixed with abuse attempts (whoever monitors the app, with error alerts, will be thankful), and the risk of the code moving on with an unexpected shape goes down. The Rails documentation describes `expect` as protected against "array tampering": for fields that are lists (like `comments`), `require.permit` accepts a hash where a list of hashes was expected, and `expect` doesn't.

**The risk is real, but moderate.** `expect` doesn't replace authorization or, on its own, close a serious flaw: the classic flaw is mass assignment, and what prevents it is the list of fields. `expect` closes a smaller door, that of malformed input, and that's why Rails 8 recommends it as the default. Sources: the [Action Controller Overview guide](https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters) and the documentation for `expect` in the Rails 8.1 code.

## Simple Form: why the guide doesn't use it

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: only if someone asks, because they saw it in another project.

[Simple Form](https://github.com/heartcombo/simple_form) is a gem that simplifies building forms. Instead of writing the `label` and the field for each piece of information, the person writes one line per field (`f.input :author`), and the gem chooses the field from the column's type (`string` becomes a one-line box, and `text`, a bigger box), adds the label, marks what's required and shows the error warnings.

**Is it still used?** Yes. It's still maintained by the Heartcombo group (Rafael França and Carlos Antonio da Silva; before that, by Plataformatec), with version 5.4.1 from January 2026, which requires Rails 7.0 or newer, and it has more than 99 million downloads. I tested it in an app with Rails 8.1.4: `simple_form_for` generated the form as usual. Even so, it doesn't come in a new app, and my impression is that, in new apps, it's common to stick with Rails's own `form_with`. That impression is mine, and doesn't come from a survey.

**Why the guide doesn't use it:**

- **It hides what the participant needs to see.** The chapter shows that each `form_with` field (`text_field`, `text_area`) becomes a form field in the HTML, and that the field's `name` becomes the controller's `params`. With Simple Form, one line does all that, and the connection between the code and the screen disappears.
- **It's one more concept and more steps.** A new gem, a generator (`bin/rails generate simple_form:install`) and a configuration file (`config/initializers/simple_form.rb`), for a two-field form.
- **It only works with Bulma after configuration.** Chapter 06 writes Bulma's classes by hand (`field`, `label`, `input`, `textarea`). With Simple Form, you'd need to configure a *wrapper* to generate that markup.
- **It shows the error warnings on its own.** In chapter 07, the participant writes the block of `@message.errors` warnings in the view, and that's what teaches how the model and the view talk to each other. With Simple Form, the warnings would show up without her writing anything.
- **The Rails default is what they'll find** in the documentation and in most tutorials.

**When it's worth it:** apps with many forms, in which the same look, labels, error warnings and translation need to be the same everywhere. Then writing the configuration once pays off, and each new field takes one line.

**What Simple Form does on its own that can be surprising:** in the test, it marked both fields as required (with a `*` in the label), even without a validation in the model, because it considers everything required by default (`required_by_default`). It also turned off the browser's validation (`novalidate`) and used the attribute names in the labels (`Author`, `Content`), unless the label is given.

## Error when sending the form in Codespaces

In Codespaces, the browser accesses the app through an `https://…app.github.dev` address, but Rails receives the request as if it came from another address. When sending a form, the protection against forms sent from other websites can block the request, with an error like `ActionController::InvalidAuthenticityToken` or "HTTP Origin header didn't match request.base_url".

At Imersão 2025, the solution was to add this line to `config/environments/development.rb`, before the last `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

It turns off only the check of the origin address, and only in development. Then shut down the server (Ctrl+C) and start it again.

Tested in Codespaces on 2026-10-06, with Rails 8.1: without the line, the form is rejected with `HTTP Origin header (https://localhost:3000) didn't match request.base_url`. Codespaces hands the request to the app with the origin `localhost:3000`, while the app's address is the `.app.github.dev` one. The template's `RAILS_DEVELOPMENT_HOSTS` solves "Blocked hosts", but not this error.

Decision: the line goes into step 9 of chapter 04, as one more error on the path, after the `create` action.

<!-- TODO: confirm whether the line `config.hosts << /.*\.app\.github\.dev/` from Imersão 2025 is needed (the template already allows the address through the `RAILS_DEVELOPMENT_HOSTS` variable). -->

## Next notes

[05. Oops! How do we fix or delete a message?]({{ site.baseurl }}{% link mentors/projects/message-board/05-fix-or-delete.md %})
