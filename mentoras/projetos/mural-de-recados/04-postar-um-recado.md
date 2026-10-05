---
title: "04. Como postar um recado?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 5
---

# 04. Como postar um recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-04`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Onde você procuraria o lugar para escrever o seu recado?" Leva ao formulário em cima do mural de recados, como no plano.
- "Depois de clicar no botão, o que você espera ver?" Prepara a ideia de voltar para o mural de recados (o `redirect_to`).
- "E se alguém clicar sem escrever nada?" Não precisa responder agora: é o gancho para o capítulo do recado vazio.

## O caminho dos erros

Como nos capítulos 03 e 05, os erros aparecem de propósito, na ordem do caminho da requisição:

1. Enviar o formulário com a rota antiga (`get "messages"`): **Routing Error**, `No route matches [POST] "/messages"`. **Falta a rota para o `POST`.**
2. Com o `resources :messages, only: [ :index, :create ]`: **Unknown action**, `The action 'create' could not be found`. **Falta a ação.**
3. Com a ação `create`: o recado aparece. Comemore! 🎉

O formulário aparece antes de existir a rota do `POST` porque a rota antiga (`get "messages"`) já cria o nome `messages_path`, que o `form_with` usa para montar o endereço do formulário. O erro só aparece ao enviar.

## Confusões comuns

- **`@message` e `@messages`.** Uma letra de diferença: `@message` é o recado em branco do formulário, `@messages` é a lista. Trocar um pelo outro dá erros confusos, como `Passed nil to the :model argument`.
- **Esquecer o `=` no `<%= form_with`.** Sem o `=`, o formulário não aparece, e não aparece erro nenhum.
- **Ações depois do `private`.** O `def create` escrito depois do `private` não é uma ação, e o erro é o mesmo de quando ela não existe.
- **Não reiniciar o servidor depois do passo 4.** O `config/environments/development.rb` só é lido quando o servidor liga.
- **O recado vazio do passo 8.** É de propósito: o Rails aceita, porque ninguém disse que é proibido. Não adiante a solução; ela é o capítulo do recado vazio.
- **O `params.expect`.** Quem conhece versões antigas do Rails pode esperar `params.require(:message).permit(:author, :content)`. O `params.expect` é a forma nova (Rails 8), e faz a mesma coisa com uma checagem a mais do formato do que chegou.

## Erro ao enviar o formulário no Codespaces

No Codespaces, o navegador acessa o app por um endereço `https://…app.github.dev`, mas o Rails recebe a requisição como se viesse de outro endereço. Ao enviar um formulário, a proteção contra envio de formulários de outros sites pode bloquear o pedido, com um erro como `ActionController::InvalidAuthenticityToken` ou "HTTP Origin header didn't match request.base_url".

Na Imersão 2025, a solução foi acrescentar esta linha em `config/environments/development.rb`, antes do último `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Ela desliga só a conferência do endereço de origem, e só em desenvolvimento. Depois, desligue o servidor (Ctrl+C) e ligue de novo.

Decisão: a linha entra no passo 4 do capítulo 04, antes do primeiro formulário.

<!-- TODO: confirmar no Codespaces se ela ainda é necessária com o Rails 8.1, e se a linha `config.hosts << /.*\.app\.github\.dev/` da Imersão 2025 faz falta (o template já libera o endereço pela variável `RAILS_DEVELOPMENT_HOSTS`). -->
