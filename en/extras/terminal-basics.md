---
title: Terminal basics
parent: Extras
nav_order: 3
translation_of: extras/terminal-basico.md
translated_from: 52a4d4b
---

# Terminal basics

## What the terminal is

The **[terminal]({{ site.baseurl }}{% link glossary.md %}#terminal)** is a way to interact with the computer through text: instead of clicking, you write. It's also called the **command line** or the **shell**.

Day to day, you use the computer through a **graphical interface**: screens with windows, icons and buttons that you point at and click with the mouse. The terminal is a **text interface**: you write a **command**, press **Enter**, and the computer answers in writing too. Before windows, icons and mice existed, that's how everyone used the computer.

Both do many of the same things. For example, to create a folder called `recipes`:

| In the graphical interface | In the terminal |
|---|---|
| Right-click, choose **New folder** and type the name `recipes` | Write `mkdir recipes` and press **Enter** |

Why do programmers use the terminal so much?

- **Many tools only exist there.** Rails, for example, doesn't have buttons: you use it through commands.
- **One command does the work of many clicks.** `rails new` creates dozens of files at once.
- **Commands are easy to repeat and share.** Someone on the mentoring team can send you the exact command, and you copy and paste it. With clicks, you'd have to describe each step.
- **It works on computers without a screen,** like the servers on the internet that keep websites online.

It seems hard at first, but in the project you'll use only a few commands, and the guide shows each one at the right moment.

## How to open it

In Codespaces, the terminal is in the editor's bottom panel, in the **Terminal** tab. If it doesn't show up, open the menu (☰) and choose **Terminal** → **New Terminal**.

![A codespace with the terminal area highlighted in the bottom panel, showing the commands ruby -v and rails -v and the Ruby and Rails versions]({{ '/assets/images/mural-de-recados/01/terminal-versoes.png' | relative_url }})
{: .ilustracao }

To have more than one terminal at the same time, click the **+** button on the panel. The open terminals show up in a list, on the right of the panel.

### What about on Windows, Mac or Linux?

In Codespaces, the terminal is the same for everyone, no matter your computer's system: it runs on the computer in the cloud, which uses Linux. The guide's commands work the same way on Windows, Mac and Linux.

Outside Codespaces, each system has its own terminal program, with different names:

| System | Terminal program |
|---|---|
| Mac | **Terminal** |
| Linux (like Ubuntu) | **Terminal** |
| Windows | **Terminal**, **PowerShell** or **Command Prompt** |

On Windows, PowerShell and Command Prompt use different commands from Linux and Mac. That's why, to program in Rails on Windows, people usually use **WSL**, which runs a Linux (Ubuntu) inside Windows. See how to install it in [Installing on your computer]({{ site.baseurl }}{% link extras/on-your-computer.md %}), in the Extras.

## Reading the terminal

The terminal shows a line similar to this one, waiting for your command:

```
@ana ➜ /workspaces/message-board (main) $
```

This line is called the **prompt**. It shows who you are, the folder you're in (`/workspaces/message-board`) and the Git branch (`main`). The `$` at the end means "you can type".

In the guide's commands, you type only the command, without the prompt and without the `$`.

## The project's commands

| Command | What it does |
|---|---|
| `ruby -v` and `rails -v` | Show the version of Ruby and Rails. They're for checking that the tools are installed. |
| `rails new .` | Creates a new Rails app in the current folder. You use it only once, in chapter 01. |
| `bin/rails server` | Starts the app's server. |
| `bin/rails console` | Opens the Rails console. To leave, type `exit`. |
| `bin/rails generate …` | Generates the app's files, like models, controllers and migrations. |
| `bin/rails db:migrate` | Applies the migrations to the database. |

The commands that start with `bin/rails` belong to Rails and work inside the project's folder, which is where the codespace's terminal already starts.

## Shortcuts that help

- **Ctrl+C** stops a command that's running, like the server. It's the same on a Mac: it's **Ctrl**, not **Cmd**.
- **Up arrow (↑)** shows the last command you typed. Press it again to see the earlier ones. Great for repeating a command without typing it all.
- **Copy and paste** in the terminal, with the text selected:

  | System | Copy | Paste |
  |---|---|---|
  | Mac | **Cmd+C** | **Cmd+V** |
  | Windows | **Ctrl+C** | **Ctrl+V** |
  | Linux | **Ctrl+Shift+C** | **Ctrl+Shift+V** |

  On Linux, **Shift** makes a difference: without it, **Ctrl+C** stops the command that's running. If you prefer, right-click the terminal and choose **Copy** or **Paste**, which works on any system.

## When the terminal doesn't respond

Some commands keep running until you tell them to stop, like `bin/rails server`. Meanwhile, that terminal is busy: what you type in it doesn't become a command. To run other commands at the same time, open a **new terminal**, with the **+** button on the panel. That's why the guide talks about the "server's terminal" and the "new terminal".

## Be careful

- **Read before pressing Enter.** A mistyped command usually just shows an error message, without breaking anything. Even so, check what you typed.
- **Be very careful with commands from outside the guide.** Before pasting a command from a website, an AI or a message, understand at least what it does: some of them delete files. If in doubt, ask someone during the workshop.
- **Read the messages.** When a command goes wrong, the terminal's answer usually says why. See how to ask for help understanding a message in [Using AI as a tutor]({{ site.baseurl }}{% link getting-started/ai-as-a-tutor.md %}).
