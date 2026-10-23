---
title: "01. Where do we start?"
parent: Workshop mode
nav_order: 1
search_exclude: true
translation_of: modo-workshop/01-por-onde-comecar.md
translated_from: a42ccdc
---

# 01. Where do we start?

## The challenge

Today you're going to create a message board: a website where anyone can leave a message for everyone to see. But how do you go from nothing to a website you open in the browser and actually use?

A website starts as **code**: files with instructions written in a programming language, like **[Ruby]({{ site.baseurl }}{% link glossary.md %}#ruby)**. **[Rails]({{ site.baseurl }}{% link glossary.md %}#rails)** is a set of tools made in Ruby, which already comes with what almost every website needs.

For the code to become a website, it needs a computer that understands Ruby. At the workshop, we use a **[codespace]({{ site.baseurl }}{% link glossary.md %}#codespace)**: a computer in the cloud, already set up, which you use through the browser.

{: .desafio }
Create the Message Board app in a codespace and open it in the browser.

At the end of this chapter, your app will show the Rails welcome page:

![The Rails welcome page open at an address ending in app.github.dev: the Rails logo in a red circle and, below it, Rails version 8.1.4 and Ruby version 4.0.6]({{ '/assets/images/mural-de-recados/01/pagina-boas-vindas-rails.png' | relative_url }})
{: .ilustracao }

## Hands-on

{% include message-board/01/hands-on.md %}

## Done?

Go on to [02. How do we store the messages?]({{ site.baseurl }}{% link workshop-mode/02-store-the-messages.md %}).

Want to understand what each step did? Read [What happened?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/what-happened.md %}), in the full version of the chapter.
