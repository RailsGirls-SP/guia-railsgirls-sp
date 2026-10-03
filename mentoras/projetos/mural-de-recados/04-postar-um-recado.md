---
title: "04. Como postar um recado?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 5
---

# 04. Como postar um recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/index.md %}) · Código de referência: tag `passo-04`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## Erro ao enviar o formulário no Codespaces

No Codespaces, o navegador acessa o app por um endereço `https://…app.github.dev`, mas o Rails recebe o pedido como se viesse de outro endereço. Ao enviar um formulário, a proteção contra envio de formulários de outros sites pode bloquear o pedido, com um erro como `ActionController::InvalidAuthenticityToken` ou "HTTP Origin header didn't match request.base_url".

Na Imersão 2025, a solução foi acrescentar esta linha em `config/environments/development.rb`, antes do último `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Ela desliga só a conferência do endereço de origem, e só em desenvolvimento. Depois, desligue o servidor (Ctrl+C) e ligue de novo.

TODO: decidir se essa linha entra num passo do capítulo 01 ou 04, para ninguém esbarrar no erro, e confirmar se ainda é necessária com a versão atual do Rails e do Codespaces.
