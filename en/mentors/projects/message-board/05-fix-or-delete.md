---
title: "05. Oops! How do we fix or delete a message?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 6
translation_of: mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md
translated_from: 1238896
---

# 05. Oops! How do we fix or delete a message?

[See chapter]({{ site.baseurl }}{% link projects/message-board/05-fix-or-delete/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-05`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

{: .atencao }
**Let the errors happen.** As in chapter 04, the errors in this chapter show up **on purpose**, following the request's path starting from the **Edit** link (see "The path of the errors", below). Don't fix them beforehand, don't say "it's just an error, ignore it" and don't give away the solution. Whoever predicts the `update` error before it shows up is showing they understood the path, and that's worth celebrating.

**And the repeated form is on purpose.** `edit.html.erb` is a copy of `new.html.erb`, with a different heading and a different button, and **we don't use a partial now**. Writing the form twice shows the participant what changes (the existing message sends the form to `update`) and what doesn't, and the repetition reinforces what they just learned. The partial comes later, as "Going further", in step 9 of chapter 07, and whoever misses it before that can see the answer in this chapter's "What happened?". See also "The copied form", in "Common confusions".

## Questions for "Think before you code"

- "If two people write 'Hi!', how does the app know which of the two to delete?" Leads to the `id`.
- "Have you ever deleted something by accident? What would have helped?" Leads to the confirmation.
- "Is fixing similar to posting? What changes?" Leads to the idea of a filled-in form and to the two actions, `edit` and `update`, which pair up with `new` and `create` from chapter 04.

## The path of the errors

As in chapter 04, the errors show up on purpose and follow the request's path, starting with the link:

1. The link `link_to "Edit", edit_message_path(message)` without the route: **NoMethodError**, `undefined method 'edit_message_path'`. **The route is missing.** As with `new_message_path`, what breaks is the whole home page.
2. With `:edit` in `only`, clicking **Edit**: **Unknown action**, `The action 'edit' could not be found`. **The action is missing.**
3. With the action: **No view template for interactive request**. **The view is missing.**
4. With `edit.html.erb`: **NoMethodError in Messages#edit**, `undefined method 'message_path'`. The `form_with` of an existing message points to `/messages/3` (the `update`), and that route doesn't exist yet. **The `update` route is missing.**
5. Clicking **Save**: nothing happens on the screen. In the server's terminal, `The action 'update' could not be found` shows up. As in chapter 04, form errors only show up in the terminal.

In step 4, the participant sees the message's number in the address (`/messages/3/edit`) and connects it to the `id` from chapter 02. In step 8, they're invited to predict the `update` error before seeing it. If the person gets it right, it's worth celebrating: it's the sign they understood the path. In step 9 (delete), the route, the action and the button come in all at once.

## Common confusions

- **The message's number.** Each person will have a different `id`. If `Couldn't find Message` shows up, the number in the address doesn't exist: use the **Edit** link.
- **Where to put the actions.** The new actions go **before** `private`. After it, Rails doesn't find the action, and the error is the same as when it doesn't exist.
- **The `@`.** `edit` and `update` use `@message`; `destroy` uses `message`, without `@`. The difference is explained in "What happened?".
- **The confirmation doesn't show up.** It's usually the braces syntax in `form: { data: { turbo_confirm: "..." } }`, or the page kept by the browser (Cmd+Shift+R).
- **The copied form.** `edit.html.erb` is a copy of `new.html.erb`, with a different heading and a different button. Someone may ask whether there's a way not to repeat the form. There is, with a *partial*, but we left it out on purpose. If there's time and curiosity, it's a good challenge.

## REST, HTTP verbs and status codes
{: #rest-http-verbs-and-status-codes }

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the guide shows the verbs in practice (the table in this chapter's "What happened?"), without using the word REST. If someone gets interested, it's a great topic for after the workshop.

**What REST is.** It's a way to organize a web app (or an API) around **resources**, like "messages", in which each operation is the combination of an **address** with an **HTTP verb**. `resources :messages` is Rails's REST: it creates the seven default routes, and `only` chooses which ones. The Message Board uses six of them (all except `show`).

**Other names you'll hear.**

- **REST** stands for *Representational State Transfer*, and was described by Roy Fielding in his doctoral dissertation, in 2000 ([chapter 5 of the dissertation](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)).
- **RESTful** is the adjective: a "RESTful" app, route or API is one that follows REST. The Rails routing guide uses this word ("RESTful routes").
- **REST API** or **RESTful API** (at companies, usually just "API") is an API that uses this style: the same routes and the same verbs, but answering with data, usually in JSON, and not with HTML pages.
- **Resourceful routing**, or *resource routing*, is what Rails calls `resources` in the documentation ("Resource Routing: the Rails Default"): declaring a resource's routes all at once.
- **CRUD** (*Create, Read, Update, Delete*) is the name of the four basic operations on data. Many people use "CRUD" and "REST" as synonyms, but CRUD is about what you do with the data, and REST, about how to organize addresses and verbs. The Message Board's six actions cover all of CRUD: `create` and `new` (create), `index` (read), `edit` and `update` (update) and `destroy` (delete).

A caveat that often comes up in conversations among people who already program: in practice, almost every "REST API" follows only part of Fielding's ideas. Full REST rigor includes, for example, links inside the responses that say what can be done next (HATEOAS), and almost nobody uses it. That's why "REST", day to day, usually just means "resources with addresses and verbs, like Rails's `resources`".

| Verb | Address | Action | What for |
|---|---|---|---|
| `GET` | `/messages` | `index` | see the list |
| `GET` | `/messages/new` | `new` | open the new message form |
| `POST` | `/messages` | `create` | create |
| `GET` | `/messages/3/edit` | `edit` | open the edit form |
| `PATCH` | `/messages/3` | `update` | update |
| `DELETE` | `/messages/3` | `destroy` | delete |

**Why the verbs matter.**

- **The address says what, the verb says what to do.** `/messages/3` is for updating (`PATCH`) and for deleting (`DELETE`). Without the verb, the route wouldn't know which action to call.
- **`GET` doesn't change anything.** It's the most important rule: a `GET` only reads. Browsers, search engines and tools that "preload" links make `GET` requests freely. If deleting a message were a `GET`, a bot passing through the website would delete everything. That's why **Delete** is a button (`button_to`), and not a link.
- **HTML forms only know `GET` and `POST`.** Rails simulates `PATCH` and `DELETE` with a hidden field, `_method`, which `form_with` and `button_to` add on their own. In the server's terminal, the final verb shows up (`PATCH`, `DELETE`).

**Status codes.** Every response carries a number that says how the request went. The ones that show up in the project, in the server's terminal (on the `Completed …` line):

| Code | Name | Where it shows up |
|---|---|---|
| `200` | OK | any page that opened properly |
| `302` | Found (redirect) | after `create`, `update` and `destroy`, with `redirect_to` |
| `404` | Not Found | a route that doesn't exist, or an action that doesn't exist |
| `422` | Unprocessable Content | a message rejected by the validations, in chapter 07 |
| `500` | Internal Server Error | an error in the app's code, like a `NoMethodError` |

- **Chapter 07's `422` is what makes Turbo show the page.** After sending a form, Turbo only swaps the screen if the response is a redirect or an error (`4xx` or `5xx`). With `render :new` and status `200`, nothing shows up, and the browser's console warns "Form responses must redirect to another location". Hence the `status: :unprocessable_entity`.
- **The name changed.** The guide uses `:unprocessable_entity`, which is the name most examples on the internet use. In Rails 8.1, the official name became `:unprocessable_content`, and the terminal shows `422 Unprocessable Content`. Both work, with no warning.
- **Chapter 04's form errors don't show up on the screen either.** They're `404` (the `create` route or action is missing) and `422` (the form protection, in Codespaces). Why don't they show up, if chapter 07's `422` does? The Rails error page has the line `<meta name="turbo-visit-control" content="reload">`, which asks Turbo to reload the page instead of showing the response. The browser reloads the New message page, and the error stays only in the terminal. The `422` page is a view of the app itself, without that line, and that's why it shows up.
- **To learn more about Turbo**, in the official Turbo Drive documentation: [Redirecting After a Form Submission](https://turbo.hotwired.dev/handbook/drive#redirecting-after-a-form-submission) (what Turbo expects as a response to a form: a redirect or a `4xx` or `5xx` error) and [Ensuring Specific Pages Trigger a Full Reload](https://turbo.hotwired.dev/handbook/drive#ensuring-specific-pages-trigger-a-full-reload) (`turbo-visit-control`). The general explanation of Turbo is in the [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction). Chapter 04 also talks about this, in "Form errors only show up in the terminal".

**For anyone who wants to go further after the workshop:** a REST API uses the same routes and the same verbs, but answers with data (usually JSON) instead of HTML pages. It's a good next step, together with the official guide [Rails Routing from the Outside In](https://guides.rubyonrails.org/routing.html).

## Why we don't use `status: :see_other`

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter doesn't talk about `:see_other` or the `303` status. Only use it if someone compares with a scaffold's code or another tutorial's.

The Rails scaffold uses `redirect_to ..., status: :see_other` in `destroy`. It's needed when the request leaves the browser as a real `DELETE`, for example in a link with `data-turbo-method="delete"`. `button_to` sends a `POST` with `_method=delete`, and the regular redirect works. That's why the guide leaves `status` out. If the person replaces the button with a link, it becomes necessary.

## Next notes

[06. How do we make the message board look nicer?]({{ site.baseurl }}{% link mentors/projects/message-board/06-make-it-look-nicer.md %})
