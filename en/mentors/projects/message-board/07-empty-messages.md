---
title: "07. What if someone sends an empty message?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 8
translation_of: mentoras/projetos/mural-de-recados/07-e-se-o-recado-vier-vazio.md
translated_from: 1238896
---

# 07. What if someone sends an empty message?

[See chapter]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-07`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

## Questions for "Think before you code"

- "Who decides that an empty message is wrong: Rails or you?" It's the chapter's central idea, and the hook for the conversation about AI.
- "What about a name with only spaces?" Leads to `presence`, which treats blank spaces as empty.
- "When the message is rejected, do you want to type everything again?" Prepares the difference between `render` and `redirect_to`.

## The chapter's thread

This is the guide's hook chapter for the topic of engineering and AI: **the code works and accepts an empty message; the programmer is the one who decides that's an error**. It's worth reinforcing out loud when the warning shows up for the first time: the rule only exists because the person wrote it.

The steps follow one problem at a time, and each one shows up on the screen before it's solved:

1. The empty card shows up (step 2).
2. With the rule in the model, the empty message disappears, but **with no warning at all** (step 4). Ask: "how does the person know it went wrong?".
3. In the console, the warnings exist (step 5): the model knows what's missing, and the problem is that nobody shows it.
4. With the `if` in the controller, what was written stays in the form, but still without a warning (step 6).
5. With the warnings in the view, everything works (step 7).
6. Fixing a message has the same problem as posting, and the solution is the same (step 9).

## Common confusions

- **The two `end`s at the end of `create`.** One closes the `if`, the other, the `def`. Missing one causes a syntax error, and the error sometimes points to the end of the file, far from the problem.
- **Forgetting `status: :unprocessable_entity`.** With Turbo, a form response with status 200 isn't shown: nothing happens on the screen, and the browser logs "Form responses must redirect to another location" in the console. It's one of the hardest confusions to find, because no error shows up on the page.
- **`render :index` instead of `render :new`.** The form is in the `new` view, so that's the one that needs to show up again with the warnings. With `render :index`, `undefined method 'empty?' for nil` shows up, because the message board's view needs the `@messages` list, which `create` doesn't prepare.
- **Rails's default warnings.** Without `message:`, `can't be blank` shows up instead of the participant's own sentence.
- **Old invalid messages.** Validations don't delete or fix what was already in the database.

## Why the warnings go below each field

`errors.full_messages` builds the sentences by joining the column's name with the warning: `Author Write your name.`. To show a full sentence the right way, you'd need to customize the attributes' names (with a locale file in `config/locales`), which is a lot of new stuff for the end of the day. With `errors[:author]` below each field, the participant writes the whole sentence in `message:` and sees exactly that on the screen.

If a participant wants to go further, Rails's I18n (translating the app and the warnings) is a good challenge for after the workshop.

## Business rules in the model

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter shows that the rules live in the model, but without the term "business rules" and without the discussion about skinny controllers and service objects.

The chapter's validations are a small example of **business rules**: the rules that say what makes sense for the app, like "a message needs an author" or "the text has at most 280 characters". In Rails, the good practice is to keep these rules in the **model**, and not in the controller or the view:

- **A single place.** Every creation and every change to a message goes through the model, whether it comes from the form, the console, a scheduled task or an API. The rule applies to every path, without repeating it.
- **A lean controller.** The controller only receives the request, calls the model and chooses the response (`redirect_to` or `render`). It's the idea known as *"skinny controller, fat model"*, popularized by Jamis Buck in the text [Skinny Controller, Fat Model](https://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model), from 2006.
- **The official guide recommends it.** The guide [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html) compares validations in the database, in the browser, in the controller and in the model, and points to the model's as the best way to make sure only valid data gets stored.

One caution, if the conversation goes far: in big apps, an overly "fat model" also becomes a problem, and it's common to split complex rules into other objects (like *concerns*, *form objects* or *service objects*). A common split: rules about the data stay in the model (what a valid message is); rules about a process, like limiting how many messages someone posts per hour or notifying moderators when posting, go to a service object. The service object only applies to whatever goes through it, so the minimum that can never be broken stays in the model. For the size of the Message Board, the model is the right place, and it's not worth bringing this discussion to the day.

## Why not use `required` in the HTML

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter doesn't talk about `required`. Only use it if someone asks, for example when seeing the empty message get through the form.

The form could have `required: true` on the fields, and the browser would already prevent the empty submission. The guide doesn't use it on purpose: the rule in the browser is easy to get around (just send the request some other way), and the chapter's goal is to show that the rule that really counts lives in the model. If someone asks, both can go together: `required` helps whoever uses it, and `validates` protects the data.

## If time is short

The chapter is a "nice to have", but it's the most important of the optional ones: it's where the idea shows up that the programmer is the one who decides what an error is. If there's little time left, the **minimum** is:

| Do | Steps | What the participant gets |
|---|---|---|
| See the problem and write the rule in the model | 1 to 4 | The empty message stops being stored |
| Show the warnings | 5 to 7 | The person sees what was missing, and what was written stays in the form |
| Save the progress | 10 | A commit with the rule and the warnings |

Left for later, or for home: **step 8** (the 280-character limit) and **step 9** (the warnings when fixing a message, which repeat step 7's pattern in the `update` action). If only part of it can be done, prefer finishing at step 7: stopping at 4 leaves the message disappearing with no warning, which is the problem the chapter shows on purpose, and which steps 5 to 7 solve. If they stop at 4 anyway, step 10's commit doesn't tell the truth (`Validate the messages and show the warnings`): use `Validate the messages`.

## Next notes

[08. How do we show the message board to the world?]({{ site.baseurl }}{% link mentors/projects/message-board/08-show-it-to-the-world.md %})
