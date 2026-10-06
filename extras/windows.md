---
title: "No Windows"
parent: Instalando no seu computador
grand_parent: Extras
nav_order: 3
---

# No Windows

<!-- TODO: testar este caminho do zero, com a versão atual do Ruby e do Rails. -->

Copie e cole **um comando de cada vez** no terminal e espere cada um terminar antes do próximo. A instalação do Ruby pode levar vários minutos.

## 1. O Ruby

O Rails funciona melhor dentro do **WSL** (*Windows Subsystem for Linux*), um Linux que roda dentro do Windows. Você instala o WSL com o Ubuntu e, depois, segue os passos do Ubuntu lá dentro.

1. Clique com o botão direito no menu Iniciar e abra o **Terminal (Admin)** ou o **PowerShell (Admin)**.
2. Instale o WSL com o Ubuntu:

   ```
   wsl --install --distribution Ubuntu-24.04
   ```

3. Reinicie o computador quando o Windows pedir.
4. Abra o aplicativo **Ubuntu** pelo menu Iniciar. Na primeira vez, ele pede para você criar um nome de usuária ou usuário e uma senha para o Linux. Anote a senha: o `sudo` vai pedir ela.
5. Dentro do Ubuntu, instale as peças que o Ruby precisa, o mise e o Ruby, como no Ubuntu:

   ```
   sudo apt update
   sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev git
   curl https://mise.run | sh
   echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
   source ~/.bashrc
   mise use -g ruby@4
   ```

   Rode um comando de cada vez.

Daqui para a frente, use sempre o terminal do **Ubuntu** para os comandos do guia.

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

Instale o [Visual Studio Code](https://code.visualstudio.com/), o mesmo editor que o Codespaces usa. Assim, as telas do guia ficam parecidas com as suas. Instale também a extensão **WSL** no VS Code: com ela, o editor abre as pastas que estão dentro do Ubuntu.

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
