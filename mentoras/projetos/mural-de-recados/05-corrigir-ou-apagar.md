---
title: "05. Errei! Como corrigir ou apagar?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 6
---

# 05. Errei! Como corrigir ou apagar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/index.md %}) · Código de referência: tag `passo-05`.

## Perguntas para o "Pense antes"

- "Se duas pessoas escreverem 'Oi!', como o app sabe qual das duas apagar?" Leva ao `id`.
- "Você já apagou alguma coisa sem querer? O que teria ajudado?" Leva à confirmação.
- "Corrigir é parecido com postar? O que muda?" Leva à ideia de formulário preenchido e às duas ações, `edit` e `update`.

## O caminho dos erros

Como no capítulo 03, os erros aparecem de propósito e seguem o caminho da requisição:

1. `/messages/3/edit`: `No route matches`. **Falta a rota.**
2. Com `:edit` no `only`: **Unknown action**, `The action 'edit' could not be found`. **Falta a ação.**
3. Com a ação: **No view template for interactive request**. **Falta a view.**
4. Clicar em **Salvar**: `No route matches [PATCH]`, e depois `The action 'update' could not be found`.

No passo 8, a participante é convidada a prever os dois erros do `update` antes de ver. Se ela acertar, vale comemorar: é o sinal de que entendeu o caminho. No passo 9 (apagar), rota, ação e botão entram de uma vez.

## Confusões comuns

- **O número do recado.** Cada pessoa vai ter um `id` diferente. Se aparecer `Couldn't find Message`, o número no endereço não existe: use o link **Editar**.
- **Onde colocar as ações.** As ações novas ficam **antes** do `private`. Depois dele, o Rails não encontra a ação, e o erro é o mesmo de quando ela não existe.
- **O `@`.** O `edit` e o `update` usam `@message`; o `destroy` usa `message`, sem `@`. A diferença está explicada no "O que aconteceu?".
- **A confirmação não aparece.** Normalmente é a sintaxe das chaves em `form: { data: { turbo_confirm: "..." } }`, ou a página guardada no navegador (Cmd+Shift+R).
- **O formulário copiado.** Alguém pode perguntar se dá para não repetir o formulário. Dá, com uma *partial*, mas a gente deixou de fora de propósito. Se ela tiver tempo e curiosidade, é um bom desafio.

## Por que não usamos `status: :see_other`

O scaffold do Rails usa `redirect_to ..., status: :see_other` no `destroy`. Ele é necessário quando a requisição sai do navegador como `DELETE` de verdade, por exemplo num link com `data-turbo-method="delete"`. O `button_to` manda um `POST` com `_method=delete`, e o redirecionamento comum funciona. Por isso, o guia deixa o `status` de fora. Se ela trocar o botão por um link, ele passa a ser necessário.
