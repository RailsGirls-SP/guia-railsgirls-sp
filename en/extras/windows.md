---
title: "On Windows"
parent: Installing on your computer
grand_parent: Extras
nav_order: 3
translation_of: extras/windows.md
translated_from: 17d1e14
---

# On Windows

<!-- TODO: test this path from scratch, with the current version of Ruby and Rails. -->

Copy and paste **one command at a time** into the terminal and wait for each one to finish before the next. Installing Ruby can take several minutes.

## 1. Ruby

Rails works best inside **WSL** (*Windows Subsystem for Linux*), a Linux that runs inside Windows. You install WSL with Ubuntu and then follow the Ubuntu steps inside it.

1. Right-click the Start menu and open **Terminal (Admin)** or **PowerShell (Admin)**.
2. Install WSL with Ubuntu:

   ```
   wsl --install --distribution Ubuntu-24.04
   ```

3. Restart the computer when Windows asks you to.
4. Open the **Ubuntu** app from the Start menu. The first time, it asks you to create a username and a password for Linux. Write down the password: `sudo` will ask for it.
5. Inside Ubuntu, install the pieces Ruby needs, mise and Ruby, like on Ubuntu:

   ```
   sudo apt update
   sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev git
   curl https://mise.run | sh
   echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
   source ~/.bashrc
   mise use -g ruby@4
   ```

   Run one command at a time.

From now on, always use the **Ubuntu** terminal for the guide's commands.

## 2. Rails

```
gem install rails
```

## 3. Git

Check whether Git is already installed with `git --version`. Then tell Git your name and your GitHub account's email, which will show up in your commits:

```
git config --global user.name "Your name"
git config --global user.email "your.email@example.com"
```

## 4. The editor

Install [Visual Studio Code](https://code.visualstudio.com/), the same editor Codespaces uses. That way, the guide's screens look like yours. Also install the **WSL** extension in VS Code: with it, the editor opens the folders that live inside Ubuntu.

## 5. Check

Close and open the terminal again, and type one command at a time:

```
ruby -v
rails -v
git --version
```

**Check:** each command shows a version number. If any of them says `command not found`, the tool wasn't installed, or the terminal can't see it yet.

## What's next?

Everything installed? See how to start the project on your computer in [Installing on your computer]({{ site.baseurl }}{% link extras/on-your-computer.md %}#what-about-the-project).
