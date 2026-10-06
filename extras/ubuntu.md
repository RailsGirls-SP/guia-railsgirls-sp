---
title: "No Ubuntu (Linux)"
parent: Instalando no seu computador
grand_parent: Extras
nav_order: 2
---

# No Ubuntu (Linux)

<!-- TODO: testar este caminho do zero, com a versão atual do Ruby e do Rails. -->

Copie e cole **um comando de cada vez** no terminal e espere cada um terminar antes do próximo. A instalação do Ruby pode levar vários minutos.

## 1. O Ruby

Abra o aplicativo **Terminal**. Instale as peças que o Ruby precisa (o `sudo` vai pedir a senha do seu computador):

```
sudo apt update
sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev git
```

Instale o mise e ative ele no terminal:

```
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
```

E, por fim, o Ruby:

```
mise use -g ruby@4
```

## 2. O Rails

```
gem install rails
```

## 3. O Git

Confira se o Git já está instalado com `git --version`. Depois, diga ao Git o seu nome e o e-mail da sua conta do GitHub, que vão aparecer nos seus commits:

```
git config --global user.name "Seu nome"
git config --global user.email "seu.email@exemplo.com"
```

## 4. O editor

Instale o [Visual Studio Code](https://code.visualstudio.com/), o mesmo editor que o Codespaces usa. Assim, as telas do guia ficam parecidas com as suas.

## 5. Confira

Feche e abra o terminal de novo, e digite um comando de cada vez:

```
ruby -v
rails -v
git --version
```

**Confira:** cada comando mostra um número de versão. Se algum disser `command not found`, a ferramenta não foi instalada, ou o terminal ainda não enxerga ela.

## E agora?

Tudo instalado? Veja como começar o projeto no seu computador em [Instalando no seu computador]({{ site.baseurl }}{% link extras/no-seu-computador.md %}#e-o-projeto).
