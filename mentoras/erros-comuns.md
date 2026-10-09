---
title: Erros comuns
parent: Guia para mentoria
nav_order: 1
---

# Erros comuns

Os problemas que mais aparecem durante o projeto Mural de recados, e como resolver. Antes de corrigir, lembre: vários erros aparecem **de propósito** no guia, para a participante aprender a ler a mensagem. Confira nas [notas de cada capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/index.md %}) se o erro faz parte do caminho.

## Problemas de ambiente

| O que aparece | Causa provável | Como resolver |
|---|---|---|
| "Corrigi e o erro continua" | O arquivo não foi salvo. | No editor, a aba de um arquivo não salvo tem uma bolinha no lugar do **X**. Salve com Cmd+S ou Ctrl+S e recarregue a página. |
| A página não muda depois de mudar o visual | O navegador guardou a versão antiga. | Recarregue com Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows e Linux). |
| O primeiro codespace demora para abrir | O computador na nuvem está sendo preparado. | Esperar. Só acontece na primeira vez. |
| A página do app não abre, ou dá erro de conexão | O servidor está desligado. | Ligar com `bin/rails server`. Se o codespace dormiu, ele desliga o servidor junto. |
| O aviso **Open in Browser** sumiu | O aviso só aparece uma vez. | Abrir pela aba **Ports**, no ícone de globo da porta 3000. |
| Um comando digitado não faz nada | Foi digitado no terminal do servidor, que está ocupado. | Abrir um terminal novo pelo botão **+** do painel do terminal. |
| `rails: command not found` | O codespace não foi criado pelo modelo do Rails Girls SP, ou ainda está terminando de preparar. | Esperar uns minutos e abrir um terminal novo. Se continuar, conferir se o repositório veio do modelo. |
| **Blocked hosts** | O codespace foi criado sem o modelo. | Ver "Erro Blocked hosts" nas [notas do capítulo 01]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/01-por-onde-comecar.md %}#erro-blocked-hosts). |
| `InvalidAuthenticityToken` ou `HTTP Origin header didn't match` ao enviar um formulário | A proteção de formulários do Rails estranha o endereço do Codespaces. | Ver o passo 9 do capítulo 04 e as [notas do capítulo 04]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %}). Depois de mudar o `development.rb`, reiniciar o servidor. |
| Os recados sumiram | O codespace é novo: o banco de dados não vai para o GitHub. | Rodar `bin/rails db:migrate` e postar recados de novo. Ver as [notas do capítulo 02]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/02-como-guardar-os-recados.md %}). |
| O commit não aparece no GitHub | Faltou o **Sync Changes**. | No painel **Source Control**, clicar em **Sync Changes**. |
| ❌ vermelho e pull requests automáticos no GitHub | O GitHub Actions e o Dependabot, que o `rails new` configura. | Pode ignorar. Ver as [notas do capítulo 01]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/01-por-onde-comecar.md %}). |
| O mural de recados ficou escuro | Falta o `data-theme="light"` no layout, e o computador está no modo escuro. | Ver o passo 2 do capítulo 06. |
| Mudou um arquivo da pasta `config` e nada mudou | Esses arquivos só são lidos quando o servidor liga. | Desligar o servidor com Ctrl+C e ligar de novo com `bin/rails server`. |

## Problemas de código

| Mensagem de erro (ou sintoma) | Causa provável | Onde aparece |
|---|---|---|
| `NameError: uninitialized constant Message` (no console) | `message` com m minúsculo, ou o model ainda não foi criado. | Capítulo 02 |
| `no such table: messages`, ou a página **PendingMigrationError** | A migration ainda não rodou. | Capítulos 02 e 07 |
| `unknown attribute 'title' for Message` | O nome de uma coluna está errado. | Capítulo 02 (de propósito, no "Quebre de propósito") |
| `No route matches [GET]`, `[POST]`, `[PATCH]` ou `[DELETE]` | Falta a rota, ou a ação não está no `only` do `resources`. | Capítulos 03, 04 e 05 (de propósito) |
| `uninitialized constant MessagesController` | O controller não existe, ou o nome está diferente (precisa ser `Messages`, no plural). | Capítulo 03 (de propósito) |
| **Unknown action**: `The action '…' could not be found` | A ação não existe, ou está escrita **depois** do `private`. | Capítulos 04 e 05 (de propósito) |
| **No view template for interactive request** | Falta a view da ação. | Capítulos 04 e 05 (de propósito) |
| `undefined method 'each' for nil` ou `undefined method 'empty?' for nil` | Falta o `@`, ou o controller não preparou a variável (por exemplo, um `render :index` no `create`, no lugar de `render :new`). | Capítulos 03 e 07 |
| `Passed nil to the :model argument` | Falta o `@message = Message.new` na ação `new`. | Capítulo 04 |
| `undefined local variable or method 'new_message_path'` | Falta o `:new` na rota. | Capítulo 04 (de propósito) |
| `param is missing or the value is empty` | Os campos do formulário não batem com o `message_params`. | Capítulo 04 |
| `undefined method 'edit_message_path'` | Falta o `:edit` na rota. | Capítulo 05 |
| `undefined method 'message_path'` ao abrir a correção | Falta o `:update` na rota: o formulário de correção não tem para onde enviar. | Capítulo 05 (de propósito) |
| `Couldn't find Message with 'id'=…` | O número no endereço não é de nenhum recado. | Capítulo 05 |
| `syntax error` apontando para o fim do arquivo | Falta um `end` (de um `def`, de um `if` ou de um `do`), ou sobra um. | Qualquer capítulo, principalmente o 07 |
| O conteúdo não aparece, sem erro | `<% %>` no lugar de `<%= %>`. | Capítulos 03 e 04 |
| A cor escolhida não é guardada, sem erro | Falta a `:color` no `message_params`. | Desafio extra "Cores nos recados" (de propósito) |
| Clicou num botão de formulário (**Postar recado**, **Salvar**, **Apagar**) e nada aconteceu na tela | O erro de um formulário não aparece no navegador, só no **terminal do servidor**. Se lá também não tiver erro: falta o `redirect_to` no `create`, ou falta o `status: :unprocessable_entity` no `render`. | Capítulos 04, 05 e 07 |
| Os avisos aparecem em inglês (`can't be blank`) | Falta o `message:` na validação. | Capítulo 07 |

## Quando nada disso resolve

- **Leia a mensagem de erro inteira, junto com a pessoa.** A primeira linha costuma dizer o que aconteceu, e o nome do arquivo e o número da linha dizem onde.
- **Compare com o código do guia,** linha por linha. A maioria dos erros é uma letra, um `end` ou um `@`.
- **Volte para o último commit** se a confusão ficou grande. No painel **Source Control**, dá para descartar as mudanças de um arquivo e começar o passo de novo.
- **Chame outra pessoa da mentoria.** Dois pares de olhos acham mais rápido, e a participante vê que pedir ajuda é normal, mesmo para quem já programa.

## Notas dos projetos

Para as confusões de cada capítulo, veja as [Notas dos projetos]({{ site.baseurl }}{% link mentoras/projetos/index.md %}).
