---
title: Terminal básico
parent: Comece aqui
nav_order: 3
---

# Terminal básico

## O que é o terminal

O **[terminal]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#terminal)** é um programa em que você conversa com o computador **escrevendo**, em vez de clicar. Você digita um comando, aperta **Enter**, e o computador faz o que foi pedido e responde com texto.

Antes de existirem janelas, ícones e mouse, era assim que todo mundo usava o computador. Hoje, quem programa continua usando o terminal porque ele é rápido, faz exatamente o que você escreveu e é fácil de repetir e de compartilhar: um comando pode ser copiado e colado, e um clique precisa ser descrito passo a passo.

Parece difícil no começo, mas no projeto você vai usar poucos comandos, e o guia mostra cada um na hora certa.

## Como abrir

No Codespaces, o terminal fica no painel de baixo do editor, na aba **Terminal**. Se ele não aparecer, abra o menu (☰) e escolha **Terminal** → **New Terminal**.

![Codespace com a área do terminal destacada no painel de baixo, mostrando os comandos ruby -v e rails -v e as versões do Ruby e do Rails]({{ '/assets/images/mural-de-recados/01/terminal-versoes.png' | relative_url }})
{: .ilustracao }

Para ter mais de um terminal ao mesmo tempo, clique no botão **+** do painel. Os terminais abertos aparecem numa lista, à direita do painel.

### E no Windows, no Mac ou no Linux?

No Codespaces, o terminal é igual para todo mundo, não importa o sistema do seu computador: ele roda no computador na nuvem, que usa Linux. Os comandos do guia funcionam do mesmo jeito no Windows, no Mac e no Linux.

Fora do Codespaces, cada sistema tem o seu programa de terminal, com nomes diferentes:

| Sistema | Programa de terminal |
|---|---|
| Mac | **Terminal** |
| Linux (como o Ubuntu) | **Terminal** |
| Windows | **Terminal**, **PowerShell** ou **Prompt de Comando** |

No Windows, o PowerShell e o Prompt de Comando usam comandos diferentes dos do Linux e do Mac. Por isso, para programar em Rails no Windows, geralmente se usa o **WSL**, que roda um Linux (o Ubuntu) dentro do Windows. Veja como instalar em [No seu computador]({{ site.baseurl }}{% link bonus/no-seu-computador.md %}), nos Extras.

## Lendo o terminal

O terminal mostra uma linha parecida com esta, esperando o seu comando:

```
@ana ➜ /workspaces/mural-de-recados (main) $
```

Essa linha se chama **prompt**. Ela mostra quem você é, a pasta onde você está (`/workspaces/mural-de-recados`) e a branch do Git (`main`). O `$` no fim quer dizer "pode digitar".

Nos comandos do guia, você digita só o comando, sem o prompt e sem o `$`.

## Os comandos do projeto

| Comando | O que faz |
|---|---|
| `ruby -v` e `rails -v` | Mostram a versão do Ruby e do Rails. Servem para conferir se as ferramentas estão instaladas. |
| `rails new .` | Cria um app Rails novo na pasta atual. Você usa uma vez só, no capítulo 01. |
| `bin/rails server` | Liga o servidor do app. |
| `bin/rails console` | Abre o console do Rails. Para sair, digite `exit`. |
| `bin/rails generate …` | Gera arquivos do app, como models, controllers e migrations. |
| `bin/rails db:migrate` | Aplica as migrations no banco de dados. |

Os comandos que começam com `bin/rails` são do Rails e funcionam dentro da pasta do projeto, que é onde o terminal do codespace já começa.

## Atalhos que ajudam

- **Ctrl+C** para um comando que está rodando, como o servidor. Vale no Mac também: é **Ctrl**, e não **Cmd**.
- **Seta para cima (↑)** mostra o último comando que você digitou. Aperte de novo para ver os anteriores. Ótimo para repetir um comando sem digitar tudo.
- **Copiar e colar** no terminal, com o texto selecionado:

  | Sistema | Copiar | Colar |
  |---|---|---|
  | Mac | **Cmd+C** | **Cmd+V** |
  | Windows | **Ctrl+C** | **Ctrl+V** |
  | Linux | **Ctrl+Shift+C** | **Ctrl+Shift+V** |

  No Linux, o **Shift** faz diferença: sem ele, o **Ctrl+C** para o comando que está rodando. Se preferir, clique com o botão direito no terminal e escolha **Copy** ou **Paste**, que funciona em qualquer sistema.

## Quando o terminal não responde

Alguns comandos ficam rodando até você mandar parar, como o `bin/rails server`. Enquanto isso, aquele terminal fica ocupado: o que você digitar nele não vira comando. Para rodar outros comandos ao mesmo tempo, abra um **terminal novo**, pelo botão **+** do painel. É por isso que o guia fala em "terminal do servidor" e "terminal novo".

## Cuidados

- **Leia antes de apertar Enter.** Um comando digitado errado normalmente só mostra uma mensagem de erro, sem estragar nada. Mesmo assim, confira o que você digitou.
- **Tome muito cuidado com comandos de fora do guia.** Antes de colar um comando de um site, de uma IA ou de uma mensagem, entenda pelo menos o que ele faz: alguns apagam arquivos. Na dúvida, pergunte para alguém durante o workshop.
- **Leia as mensagens.** Quando um comando dá errado, a resposta do terminal costuma dizer o motivo. Veja como pedir ajuda para entender uma mensagem em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).
