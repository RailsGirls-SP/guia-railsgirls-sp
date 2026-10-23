---
title: Installing on your computer
parent: Extras
nav_order: 1
has_children: true
translation_of: extras/no-seu-computador.md
translated_from: f922f7d
---

# Installing on your computer

To program on your own computer, you install **Ruby**, **Rails**, **Git** and a **code editor**. The official Rails guide, [Install Ruby on Rails](https://guides.rubyonrails.org/install_ruby_on_rails.html), is the basis for these steps.

{: .atencao }
Installing on your own computer can take a while and cause errors that depend on each machine. At the workshop, use [Codespaces]({{ site.baseurl }}{% link start-here/setup.md %}).

## A version manager for Ruby

Ruby is installed with a **version manager**: a program that installs Ruby just for you, without touching the rest of the system, and lets you have more than one version on the same computer. It helps because:

- **the Ruby that comes with the system** (like on a Mac) is usually old, and changing it can get in the way of other programs on the computer;
- **each project can ask for a different version** of Ruby, and the manager switches versions on its own when you enter the project's folder;
- **you can install and update without needing the computer's administrator password**.

The Rails guide recommends the **mise** manager, and that's the one the steps use.

## Choose your system

| System | Step by step |
|---|---|
| Mac | [On a Mac]({{ site.baseurl }}{% link extras/mac.md %}) |
| Ubuntu and other similar Linux systems | [On Ubuntu (Linux)]({{ site.baseurl }}{% link extras/ubuntu.md %}) |
| Windows | [On Windows]({{ site.baseurl }}{% link extras/windows.md %}), using WSL, a Linux inside Windows |

## What about the project?

In the chapter [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/index.md %}), create your repository from the template, like in step 1. Then, instead of opening the codespace:

1. In VS Code, open the command palette (**Cmd+Shift+P** on a Mac, **Ctrl+Shift+P** on Windows and Linux), choose **Git: Clone** and paste your repository's address.
2. Open the repository's folder in VS Code and follow the chapter from step 3, **Check the tools**.

The steps are the same, with one difference: the app opens at the address `http://localhost:3000`, and not at a Codespaces address. The steps that only exist in Codespaces, like the line in step 9 of chapter 04, can be skipped: the guide tells you when that's the case.
