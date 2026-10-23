---
title: "On a Mac"
parent: Installing on your computer
grand_parent: Extras
nav_order: 1
translation_of: extras/mac.md
translated_from: 17d1e14
---

# On a Mac

<!-- TODO: test this path from scratch, with the current version of Ruby and Rails. -->

Copy and paste **one command at a time** into the terminal and wait for each one to finish before the next. Installing Ruby can take several minutes.

## 1. Ruby

Open the **Terminal** app (search for "Terminal" in Spotlight, with **Cmd+Space**). First, install Apple's command line tools (a window will open asking you to confirm):

```
xcode-select --install
```

Then install [Homebrew](https://brew.sh/), a program that installs other programs, and the pieces Ruby needs:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
brew install openssl@3 libyaml gmp rust
```

Install mise and activate it in the terminal:

```
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

And, finally, Ruby:

```
mise use -g ruby@4
```

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

Install [Visual Studio Code](https://code.visualstudio.com/), the same editor Codespaces uses. That way, the guide's screens look like yours.

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
