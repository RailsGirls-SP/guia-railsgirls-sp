---
title: Git básico
parent: Comece aqui
nav_order: 4
---

# Git básico

O **[Git]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#git)** guarda versões do seu projeto. Cada vez que você termina uma parte e quer guardar como ela está, você faz um **[commit]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#commit)**: uma foto do projeto naquele momento, com uma mensagem dizendo o que mudou.

É como o "salvar" de um jogo: se algo der errado depois, dá para voltar ao último ponto salvo.

No projeto Mural de recados, cada capítulo termina com um commit. O histórico do seu repositório vai ficar parecido com este, uma bolinha para cada ponto salvo:

```mermaid
gitGraph
  commit id: "Cria o app"
  commit id: "Cria o model Message"
  commit id: "Mostra os recados"
  commit id: "Posta recados"
  commit id: "Corrige e apaga"
  commit id: "Cara de post-it"
  commit id: "Não aceita vazio"
```

Se algo der errado no meio de um capítulo, dá para voltar para a última bolinha, onde tudo funcionava.

## Por que usar

- **Desfazer.** Se você mudar alguma coisa e o app parar de funcionar, dá para desfazer e voltar à última versão que funcionava.
- **Contar a história do projeto.** Cada commit tem uma mensagem. Juntos, eles mostram o que foi feito e quando.
- **Guardar no GitHub.** O commit fica no seu computador, ou no seu codespace. Quando você envia os commits para o [GitHub]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#github), o projeto fica guardado lá também, e você pode continuar de qualquer lugar.

## Commit e push: duas etapas

Guardar o progresso tem duas etapas, em dois lugares diferentes:

```mermaid
flowchart LR
  subgraph cp_local["💻 No seu codespace (local)"]
    cp1["Arquivos que você mudou"] -->|"1. commit"| cp2["Histórico de commits<br/>do codespace"]
  end
  subgraph cp_remoto["☁️ No GitHub (remoto)"]
    cp3["Histórico de commits<br/>no GitHub"]
  end
  cp2 -->|"2. push<br/>(Sync Changes)"| cp3
```

1. **O commit é local.** Ele guarda uma versão do projeto no histórico do seu codespace. É rápido e não precisa de internet, mas só existe ali: se o codespace for apagado, os commits vão junto.
2. **O push é remoto.** Ele envia os commits do codespace para o seu repositório no GitHub. A partir daí, eles ficam guardados também na internet: dá para ver no site do GitHub, continuar de outro computador e, no capítulo 08, colocar o app no ar.

Por isso o guia sempre pede as duas coisas no passo **Guarde o seu progresso**: o **Commit** e o **Sync Changes**. Um commit sem push fica guardado só no codespace, e o GitHub não fica sabendo dele.

O **Sync Changes** faz um pouco mais que o push: ele também traz para o codespace os commits que estiverem no GitHub e ainda não estiverem no codespace (isso se chama **pull**). No projeto, como só você mexe no repositório, quase sempre ele só envia.

## No Codespaces

O Git já vem instalado no codespace e ligado ao seu repositório no GitHub. Você não precisa configurar nada.

No projeto, o guia usa o painel **Source Control** do editor, no ícone de ramificação na barra da esquerda. Lá, você faz tudo com cliques:

```mermaid
flowchart LR
  sc1["✏️ Você muda<br/>os arquivos"] --> sc2["➕ Stage All Changes<br/>escolhe o que vai<br/>no commit"]
  sc2 --> sc3["✅ Commit<br/>guarda a versão<br/>no codespace"]
  sc3 --> sc4["🔄 Sync Changes<br/>envia para<br/>o GitHub"]
```


1. Clique no **+** ao lado de **Changes** (**Stage All Changes**) para escolher o que vai no commit. No projeto, vai sempre tudo.
2. Escreva a mensagem do commit e clique em **Commit**.
3. Clique em **Sync Changes** para enviar o commit para o GitHub.

Você faz isso pela primeira vez em [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}).

## Os mesmos passos, com comandos

Os cliques do painel **Source Control** rodam comandos do Git por trás. Se quiser, dá para fazer o mesmo no terminal:

| Comando | O que faz | No painel |
|---|---|---|
| `git status` | Mostra o que mudou desde o último commit. | A lista de **Changes** |
| `git add .` | Escolhe todas as mudanças para o próximo commit. | **Stage All Changes** (o **+**) |
| `git commit -m "Mostra os recados no mural"` | Faz o commit, com a mensagem entre aspas. | **Commit** |
| `git push` | Envia os commits para o GitHub. | **Sync Changes** |

O `git status` é o mais útil para usar a qualquer momento: ele não muda nada, só mostra como as coisas estão.

## Quando fazer um commit

No projeto, **todo capítulo termina com um commit**, num passo chamado **Guarde o seu progresso**. É o momento em que o mural de recados está funcionando, um pouco melhor que antes.

Uma boa mensagem de commit diz o que mudou, começando por um verbo: `Mostra os recados no mural`, `Posta recados pelo formulário`.

## Deu errado? Desfazendo mudanças

```mermaid
flowchart LR
  un1["✅ Último commit<br/>o app funcionava"] --> un2["✏️ Você mudou<br/>um arquivo"]
  un2 --> un3["💥 O app parou<br/>de funcionar"]
  un3 -->|"↩️ Discard Changes"| un1
```


Se você mudou um arquivo, o app parou de funcionar e você quer voltar ao último commit:

1. No painel **Source Control**, passe o mouse sobre o arquivo em **Changes**.
2. Clique na seta curva, **Discard Changes** (descartar mudanças), e confirme.

O arquivo volta a ficar como estava no último commit. Pelo terminal, o mesmo comando é `git restore` seguido do nome do arquivo, por exemplo `git restore app/views/messages/index.html.erb`.

{: .atencao }
Descartar apaga as mudanças daquele arquivo desde o último commit, e não tem como recuperar. Antes, confira se é isso mesmo que você quer. Na dúvida, peça ajuda para alguém da mentoria.

Por isso, fazer commits com frequência ajuda: quanto mais recente o último commit, menos trabalho você perde ao voltar.

{: .ia }
> Antes de usar um código que uma IA escreveu, faça um commit do que você já tem funcionando. Se o código da IA não funcionar, ou mudar coisas que você não pediu, é só descartar as mudanças e voltar ao ponto salvo. Depois, com calma, você tenta de novo, com um pedido mais claro ou em etapas menores.
