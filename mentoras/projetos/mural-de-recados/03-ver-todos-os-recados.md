---
title: "03. Como ver todos os recados?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 4
---

# 03. Como ver todos os recados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/index.md %}) · Código de referência: tag `passo-03`.

## Perguntas para o "Pense antes"

- "Quando você abre um site, qual é a primeira coisa que aparece?" Leva à ideia de página principal (`root`).
- "O que tem em cada cartão?" Ajuda a ligar a tela às colunas `author` e `content`.
- "E se ninguém tiver postado ainda?" Prepara o passo do mural de recados vazio.

## Telas de erro de propósito

{: .atencao }
As telas de erro deste capítulo aparecem **de propósito**. Não pule os passos que geram erro, não corrija por ela e não tranquilize dizendo "é só um erro, ignora": o objetivo é justamente ler o erro.

O capítulo começa pelo navegador e segue o caminho da requisição, uma peça de cada vez:

1. Abrir `/messages` antes de existir qualquer coisa: `No route matches [GET] "/messages"`. **Falta a rota.**
2. Criar a rota: `uninitialized constant MessagesController`. **A rota existe, mas falta o controller.**
3. Gerar o controller com `bin/rails generate controller Messages index`: a página de exemplo aparece.
4. Apagar a rota `get "messages/index"` que o gerador acrescentou: `/messages/index` volta a dar `No route matches`.

Quando a tela de erro aparecer, pergunte: "o que a mensagem está dizendo que falta?". Comparar os dois primeiros erros ("não tem rota" e "não tem controller") é uma das melhores formas de entender o que cada peça faz. Ler mensagens de erro é uma das habilidades mais importantes do dia, e este capítulo é o lugar seguro para treinar.

## Confusões comuns

- **Arquivo não salvo.** A causa mais comum de "corrigi e o erro continua". No editor, a aba de um arquivo não salvo mostra uma bolinha no lugar do **X**.
- **O nome no `generate controller`.** Tem que ser `Messages`, no plural. Com o nome errado, o `bin/rails destroy controller` desfaz.
- **Esquecer de apagar a rota do gerador.** Não quebra nada, mas deixa o endereço `/messages/index` sobrando. Vale perguntar: "por que essa linha está aqui?".
- **Esquecer de apagar o texto de exemplo da view** (*Find me in…*).
- **O `@`.** Esquecer o `@` no controller ou na view. O erro na view costuma ser `undefined method 'each' for nil`.
- **`<%=` e `<%`.** Usar `<%` onde deveria ser `<%=` faz o conteúdo não aparecer, sem erro nenhum, o que confunde mais do que um erro.
- **Mural de recados vazio num codespace novo.** O banco de dados não vai para o GitHub (veja as notas do capítulo 02). Basta criar um recado pelo console.

## A página de erro no Codespaces

No terminal do servidor, pode aparecer `Cannot render console from …! Allowed networks: …`. É o Rails dizendo que não vai mostrar o console interativo na página de erro, porque o acesso vem pelo endereço do Codespaces, e não do próprio computador. A página de erro aparece normalmente, só sem esse console. Pode ignorar.
