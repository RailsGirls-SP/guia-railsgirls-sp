---
title: "02. Como guardar os recados?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 3
---

# 02. Como guardar os recados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/index.md %}) · Código de referência: tag `passo-02`.

## Perguntas para o "Pense antes"

- "Se a gente fechar o navegador, onde o recado fica?" Deixe a pessoa chegar sozinha na ideia de um lugar que guarda informações.
- "Como você anotaria vários recados numa planilha?" A planilha é a ponte para a ideia de tabela, linha e coluna.
- "A autora e a mensagem são do mesmo tipo?" Leva à diferença entre `string` e `text`.

## Confusões comuns

- **Model e migration parecem a mesma coisa.** A migration é a instrução para criar a tabela, e roda uma vez. O model é quem usa a tabela, o tempo todo. Uma analogia que costuma ajudar: a migration é a planta da reforma; o model é quem mora na casa.
- **Esquecer o `bin/rails db:migrate`.** O console responde `no such table: messages`, e o navegador mostra `Migrations are pending`.
- **Ficar "preso" no console.** Quem tenta rodar `bin/rails ...` dentro do console recebe erro de Ruby. O `exit` volta para o terminal.
- **`Message` com m minúsculo** no console dá `NameError`.
- **Nomes em inglês.** Se alguém estranhar `Message`, `author` e `content`, lembre que o código segue o costume do inglês, e o guia traz a tradução de cada nome.
- **O recado vazio do "Quebre de propósito".** É de propósito: o Rails aceita, porque ninguém disse que é proibido. Não adiante a solução; ela é o capítulo 07.

## Onde os recados ficam guardados no Codespaces

O banco de dados é o **SQLite**, que fica num único arquivo: `storage/development.sqlite3`, dentro da pasta do projeto no codespace.

- **Os recados continuam lá** quando o codespace é desligado e religado, quando a participante fecha a aba ou quando o codespace dorme por inatividade.
- **Os recados se perdem** quando o codespace é apagado (inclusive quando o GitHub apaga sozinho um codespace parado por muito tempo, por padrão depois de 30 dias), quando a participante cria um codespace novo para o mesmo repositório ou quando passa a trabalhar no próprio computador.
- **O banco não vai para o GitHub.** O `.gitignore` criado pelo Rails deixa a pasta `storage` fora dos commits. O código viaja com o repositório; os dados, não.

Se alguém perguntar por que os recados sumiram num codespace novo, é isso: o código veio do GitHub, mas o banco começa vazio. Basta rodar `bin/rails db:migrate` para criar a tabela de novo e postar novos recados.

Isso também vale para o capítulo 08: no plano gratuito do Render, o disco também não é permanente, e o SQLite perde os dados a cada deploy (decisão ainda pendente no capítulo).

## SQLite, MySQL e PostgreSQL

{: .atencao }
Isto é contexto para as mentoras. **Não precisa explicar para as participantes agora**: só se alguém perguntar.

O app usa o **SQLite**, que é o padrão do Rails. Ele funciona diferente de bancos como o **MySQL** e o **PostgreSQL**:

| | SQLite | MySQL e PostgreSQL |
|---|---|---|
| **Onde fica** | Num único arquivo dentro do projeto (`storage/development.sqlite3`) | Num programa separado, o servidor do banco de dados, que o app acessa pela rede |
| **Instalação** | Nenhuma: já vem com o Rails | Precisa instalar e configurar o servidor do banco, usuário e senha |
| **Bom para** | Aprender, desenvolver e apps pequenos ou médios | Apps com muitos acessos ao mesmo tempo, vários servidores usando o mesmo banco e recursos avançados |

No dia a dia do Rails, a diferença quase não aparece: o Active Record (a parte do Rails por trás dos models) gera os comandos certos para cada banco, e o código do app praticamente não muda. Quem escolhe o banco é o arquivo `config/database.yml`.

O SQLite não é só "banco de brinquedo": desde o Rails 8, ele também é uma opção recomendada para colocar apps em produção. Mesmo assim, PostgreSQL e MySQL continuam muito comuns em empresas.

Esse assunto volta no capítulo 08: em alguns serviços de hospedagem, como o plano gratuito do Render, o disco não é permanente, e por isso pode ser preciso usar um PostgreSQL em produção (decisão ainda pendente).

## A analogia da planilha e da assistente

O capítulo compara a migration com montar uma planilha e o model com uma assistente especialista que só cuida dessa planilha. É só uma comparação didática, para separar estrutura (migration) de dados (model). Não é uma descrição exata de como o Rails funciona.

O ponto em que ela não funciona é a diferença entre **classe** e **objeto**: `Message`, com M maiúsculo, é a classe (a "assistente"), mas o que `Message.first` devolve é um objeto, um recado específico, uma linha da tabela. Para quem nunca programou, essa diferença dificilmente fica clara de primeira, e não é objetivo deste capítulo.

- Não introduza os termos "classe" e "objeto" se ninguém perguntar.
- No capítulo 03, a analogia ganha um complemento: a assistente "te entrega aquele recado, com todas as informações dele".
- Se alguém perceber a diferença sozinha, ótimo: confirme e diga que esses nomes vão aparecer com mais calma depois.

## Por que `generate model`

O capítulo usa `bin/rails generate model`, e não `scaffold`, para a participante ver só o model e a migration, sem telas. O projeto não usa scaffold em nenhum capítulo (veja [Sem scaffold]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/index.md %}#sem-scaffold)): rotas, controller e views são escritos à mão nos capítulos 03 a 05.
