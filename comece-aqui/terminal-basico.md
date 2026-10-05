---
title: Terminal básico
parent: Comece aqui
nav_order: 2
---

# Terminal básico

O **[terminal]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#terminal)** é um jeito de conversar com o computador escrevendo comandos, em vez de clicar em botões. Você digita um comando, aperta **Enter**, e o computador responde com texto.

Parece difícil no começo, mas no projeto você vai usar poucos comandos, e o guia mostra cada um na hora certa.

## Como abrir o terminal

- **No Codespaces:** o terminal fica no painel de baixo do editor. Se ele não aparecer, abra o menu (☰) e escolha **Terminal** → **New Terminal**. Para ter mais de um terminal ao mesmo tempo, clique no botão **+** do painel.
- **No Mac:** abra o aplicativo **Terminal** (procure por "Terminal" no Spotlight, com **Cmd+Espaço**).
- **No Linux:** abra o aplicativo **Terminal**.
- **No Windows, com WSL:** abra o aplicativo **Ubuntu**.
- **No VS Code, no seu computador:** use o menu **Terminal** → **New Terminal**, como no Codespaces.

## Lendo o terminal

O terminal mostra uma linha parecida com esta, esperando o seu comando:

```
@ana ➜ /workspaces/mural-de-recados (main) $
```

Essa linha se chama **prompt**. Ela mostra quem você é, a pasta onde você está (`/workspaces/mural-de-recados`) e, às vezes, a branch do Git (`main`). O `$` no fim quer dizer "pode digitar". No seu computador, o prompt é diferente, mas a ideia é a mesma.

Nos comandos do guia, você digita só o comando, sem o prompt e sem o `$`.

## Os comandos que você vai usar

| Comando | O que faz |
|---|---|
| `pwd` | Mostra em qual pasta você está (*print working directory*, mostrar a pasta atual). |
| `ls` | Lista os arquivos e as pastas da pasta atual (*list*, listar). |
| `cd nome-da-pasta` | Entra numa pasta (*change directory*, mudar de pasta). `cd ..` volta para a pasta de cima. |
| `clear` | Limpa a tela do terminal. Nada é apagado, só a tela fica limpa. |
| `bin/rails server` | Liga o servidor do app. |
| `bin/rails console` | Abre o console do Rails. Para sair, digite `exit`. |
| `bin/rails generate …` | Gera arquivos do app, como models, controllers e migrations. |
| `bin/rails db:migrate` | Aplica as migrations no banco de dados. |

Os comandos que começam com `bin/rails` são do Rails e só funcionam dentro da pasta do projeto.

## Atalhos que ajudam

- **Ctrl+C** para um comando que está rodando, como o servidor. Vale no Mac também: é **Ctrl**, e não **Cmd**.
- **Seta para cima (↑)** mostra o último comando que você digitou. Aperte de novo para ver os anteriores. Ótimo para repetir um comando sem digitar tudo.
- **Tab** completa o nome de um arquivo ou de uma pasta. Digite o começo do nome e aperte **Tab**.
- **Copiar e colar:** no terminal do Codespaces e do VS Code, use **Cmd+C** e **Cmd+V** no Mac, ou **Ctrl+C** e **Ctrl+V** no Windows e no Linux, com o texto selecionado. Em outros terminais, colar pode ser **Ctrl+Shift+V**.

## Um terminal ocupado

Alguns comandos ficam rodando até você mandar parar, como o `bin/rails server`. Enquanto isso, aquele terminal fica ocupado: o que você digitar nele não vira comando. Para rodar outros comandos ao mesmo tempo, abra um **terminal novo**, pelo botão **+** do painel. É por isso que o guia fala em "terminal do servidor" e "terminal novo".

## Cuidados

- **Leia antes de apertar Enter.** Um comando digitado errado normalmente só mostra uma mensagem de erro, sem estragar nada. Mesmo assim, confira o que você digitou.
- **Não cole comandos que você não entende,** de nenhum lugar: de um site, de uma IA, de uma mensagem. Na dúvida, pergunte para alguém da mentoria o que o comando faz.
- **Leia as mensagens.** Quando um comando dá errado, a resposta do terminal costuma dizer o motivo. Veja como pedir ajuda para entender uma mensagem em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).
