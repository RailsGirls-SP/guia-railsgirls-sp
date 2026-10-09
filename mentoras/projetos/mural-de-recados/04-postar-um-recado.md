---
title: "04. Como postar um recado?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 5
---

# 04. Como postar um recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-04`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Onde você procuraria o lugar para escrever o seu recado?" Leva ao link **Novo recado** na página principal e à página só para o formulário, como no plano.
- "Depois de clicar no botão, o que você espera ver?" Prepara a ideia de voltar para o mural de recados (o `redirect_to`).
- "E se alguém clicar sem escrever nada?" Não precisa responder agora: é o gancho para o capítulo do recado vazio.

## O caminho dos erros

Como nos capítulos 03 e 05, os erros aparecem de propósito, na ordem do caminho da requisição:

1. O link `link_to "Novo recado", new_message_path` com a rota antiga: **NameError**, `undefined local variable or method 'new_message_path'`. **Falta a rota.** Quem quebra é a página principal inteira, porque o link está nela.
2. Com o `resources :messages, only: [ :index, :new ]`, clicar no link: **Unknown action**, `The action 'new' could not be found`. **Falta a ação.**
3. Com a ação `new`: **No view template for interactive request**. **Falta a view.** É a primeira vez que esse erro aparece: no capítulo 03, o gerador criou a view do `index`.
4. Com o `new.html.erb`, enviar o formulário: nada acontece na tela, e o terminal do servidor mostra `ActionController::RoutingError (No route matches [POST] "/messages")`. **Falta a rota para o `POST`.**
5. Com o `:create` na lista do `only`: de novo nada na tela, e o terminal mostra `The action 'create' could not be found`. **Falta a ação.**
6. Com a ação `create`, no Codespaces: nada na tela, e o terminal mostra `ActionController::InvalidAuthenticityToken (HTTP Origin header (https://localhost:3000) didn't match request.base_url (…app.github.dev))`. **Falta o ajuste da proteção de formulários** (passo 9). No computador local, esse erro não aparece.
7. Com a linha do `forgery_protection_origin_check` e o servidor reiniciado: o recado aparece. Comemore! 🎉

O formulário aparece antes de existir a rota do `POST` porque a rota do `index` já cria o nome `messages_path`, que o `form_with` usa para montar o endereço do formulário. O erro só aparece ao enviar.

**Erros de formulário só aparecem no terminal.** Quando um formulário é enviado, o Turbo (a parte do Rails que envia formulários sem recarregar a página) recebe a página de erro, mas ela pede para recarregar a página (`turbo-visit-control: reload`). O navegador recarrega a página do formulário, a tela fica igual, e o erro aparece só no terminal do servidor. É assim nos passos 4, 5 e 6 acima, e no `update` e no `destroy` do capítulo 05. Se alguém disser "cliquei e nada aconteceu", a primeira pergunta é: "o que diz o terminal do servidor?".

O `NameError` do primeiro passo é diferente dos outros: a mensagem não fala de rota. Vale perguntar "de onde o Rails tiraria esse `new_message_path`?" para ligar o nome do endereço à rota.

## Confusões comuns

- **`@message` e `@messages`.** Uma letra de diferença: `@message` é o recado em branco do formulário, na ação `new`, e `@messages` é a lista, na ação `index`. Trocar um pelo outro dá erros confusos, como `Passed nil to the :model argument`.
- **Criar o `new.html.erb` na pasta errada.** O arquivo precisa ficar em `app/views/messages`, junto com o `index.html.erb`. Em outra pasta, o erro de view continua.
- **Esquecer o `=` no `<%= form_with`.** Sem o `=`, o formulário não aparece, e não aparece erro nenhum.
- **Ações depois do `private`.** O `def new` ou o `def create` escrito depois do `private` não é uma ação, e o erro é o mesmo de quando ela não existe.
- **Não reiniciar o servidor depois do passo 9.** O `config/environments/development.rb` só é lido quando o servidor liga.
- **O recado vazio do passo 10.** É de propósito: o Rails aceita, porque ninguém disse que é proibido. Não adiante a solução; ela é o capítulo do recado vazio.
- **O `params.expect`.** Quem conhece versões antigas do Rails pode esperar `params.require(:message).permit(:author, :content)`. O `params.expect` é a forma nova (Rails 8), e faz a mesma coisa com uma checagem a mais do formato do que chegou.

## Erro ao enviar o formulário no Codespaces

No Codespaces, o navegador acessa o app por um endereço `https://…app.github.dev`, mas o Rails recebe a requisição como se viesse de outro endereço. Ao enviar um formulário, a proteção contra envio de formulários de outros sites pode bloquear o pedido, com um erro como `ActionController::InvalidAuthenticityToken` ou "HTTP Origin header didn't match request.base_url".

Na Imersão 2025, a solução foi acrescentar esta linha em `config/environments/development.rb`, antes do último `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Ela desliga só a conferência do endereço de origem, e só em desenvolvimento. Depois, desligue o servidor (Ctrl+C) e ligue de novo.

Testado no Codespaces em 2026-10-06, com o Rails 8.1: sem a linha, o formulário é recusado com `HTTP Origin header (https://localhost:3000) didn't match request.base_url`. O Codespaces entrega a requisição ao app com a origem `localhost:3000`, enquanto o endereço do app é o `.app.github.dev`. O `RAILS_DEVELOPMENT_HOSTS` do template resolve o "Blocked hosts", mas não esse erro.

Decisão: a linha entra no passo 9 do capítulo 04, como mais um erro do caminho, depois da ação `create`.

<!-- TODO: confirmar se a linha `config.hosts << /.*\.app\.github\.dev/` da Imersão 2025 faz falta (o template já libera o endereço pela variável `RAILS_DEVELOPMENT_HOSTS`). -->

## Próximas notas

[05. Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md %})
