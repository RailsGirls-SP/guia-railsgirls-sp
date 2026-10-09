---
title: "02. Como guardar os recados?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 3
---

# 02. Como guardar os recados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-02`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Se a gente fechar o navegador, onde o recado fica?" Deixe a pessoa chegar por conta própria na ideia de um lugar que guarda informações.
- "Como você anotaria vários recados numa planilha?" A planilha é a ponte para a ideia de tabela, linha e coluna.
- "A autora e a mensagem são do mesmo tipo?" Leva à diferença entre `string` e `text` (veja [`string` ou `text`?](#string-ou-text)).

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

Isso também vale para o capítulo 08: no plano gratuito do Render, o disco também não é permanente, e o SQLite perde os dados a cada deploy. Por isso, o capítulo 08 usa um PostgreSQL no Render.

## `string` ou `text`?

Os dois guardam texto. A diferença está no tamanho esperado e em como cada banco de dados guarda:

| | `string` | `text` |
|---|---|---|
| **Para quê** | Texto curto, de uma linha: nome, e-mail, título | Texto longo, que pode ter várias linhas: mensagem, descrição, comentário |
| **No SQLite** (codespace) | `varchar`, mas o SQLite guarda os dois do mesmo jeito e não limita o tamanho | `text` |
| **No PostgreSQL** (Render, capítulo 08) | `character varying`, sem limite de tamanho | `text`, também sem limite (por dentro, os dois funcionam igual) |
| **No MySQL** | `varchar(255)`: no máximo 255 caracteres | `text`: até 64 KB (uns 65 mil caracteres sem acento) |
| **No formulário** | Combina com `text_field` (uma linha) | Combina com `text_area` (caixa maior) |

No mural de recados, `author` é `string` (um nome) e `content` é `text` (a mensagem). Nos bancos que o guia usa, a escolha quase não muda nada na prática: ela diz **a intenção** de quem planejou, e essa intenção reaparece no capítulo 04, com o `form.text_field :author` e o `form.text_area :content`. O scaffold do Rails também usa essa dica para escolher o campo do formulário.

Se alguém perguntar "não dava para usar só `text`, ou só `string`?": no SQLite e no PostgreSQL, funcionaria. Mesmo assim, vale ter os dois:

- **A intenção fica no código.** Quem lê `string` sabe que é um texto curto; quem lê `text`, que pode ser longo. É como escolher bem o nome de uma variável.
- **O Rails e outras ferramentas usam essa dica**, como o scaffold, que escolhe a caixa de uma linha ou a caixa maior no formulário.
- **O app pode mudar de banco de dados.** No MySQL, tudo `string` cortaria mensagens acima de 255 caracteres. E tudo `text` atrapalha os índices (usados para buscar rápido), que no MySQL não funcionam direto numa coluna `text`.
- **É a convenção.** Quem chega num projeto Rails espera nomes e títulos como `string` e textos longos como `text`.

Se alguém perguntar "então a mensagem pode ter qualquer tamanho?": no banco de dados, sim. O limite de 280 caracteres é uma regra do mural de recados, e não do tipo da coluna: ela entra no model, com uma validação, no capítulo 07.

Fonte: os tipos de cada banco estão no código do Active Record 8.1 (`NATIVE_DATABASE_TYPES` dos adaptadores do SQLite, PostgreSQL e MySQL).

## SQLite, MySQL e PostgreSQL

{: .atencao }
Isto é contexto para a mentoria. **Não precisa explicar para as participantes agora**: só se alguém perguntar.

O app usa o **SQLite**, que é o padrão do Rails. Ele funciona diferente de bancos como o **MySQL** e o **PostgreSQL**:

| | SQLite | MySQL e PostgreSQL |
|---|---|---|
| **Onde fica** | Num único arquivo dentro do projeto (`storage/development.sqlite3`) | Num programa separado, o servidor do banco de dados, que o app acessa pela rede |
| **Instalação** | Nenhuma: já vem com o Rails | Precisa instalar e configurar o servidor do banco, usuário e senha |
| **Bom para** | Aprender, desenvolver e apps pequenos ou médios | Apps com muitos acessos ao mesmo tempo, vários servidores usando o mesmo banco e recursos avançados |

No dia a dia do Rails, a diferença quase não aparece: o Active Record (a parte do Rails por trás dos models) gera os comandos certos para cada banco, e o código do app praticamente não muda. Quem escolhe o banco é o arquivo `config/database.yml`.

O SQLite não é só "banco de brinquedo": desde o Rails 8, ele também é uma opção recomendada para colocar apps em produção. Mesmo assim, PostgreSQL e MySQL continuam muito comuns em empresas.

Esse assunto volta no capítulo 08: em alguns serviços de hospedagem, como o plano gratuito do Render, o disco não é permanente, e por isso o capítulo 08 usa um PostgreSQL em produção.

## Onde o Rails anota as migrations que já rodaram

{: .atencao }
Curiosidade só para a mentoria. **Não precisa mostrar para as participantes.**

A pergunta "Por que o nome da migration começa com data e hora?" diz que o Rails anota no banco de dados as migrations que já rodou. Essa anotação fica numa tabela que o próprio Rails cria, a `schema_migrations`. Ela tem uma coluna só, `version`, com o número (a data e a hora) de cada migration aplicada. Quando você roda `bin/rails db:migrate`, o Rails compara os arquivos de `db/migrate` com essa tabela e aplica só os que faltam.

Para ver, no terminal:

```
bin/rails db:migrate:status
```

A saída lista cada migration com o número, o nome e o status: `up` (já aplicada) ou `down` (ainda não):

```
database: storage/development.sqlite3

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20261003120000  Create messages
```

Ou direto na tabela, pelo console:

```ruby
ActiveRecord::Base.connection.select_values("SELECT version FROM schema_migrations")
```

O número da última migration também aparece no começo do `db/schema.rb`, em `ActiveRecord::Schema[8.1].define(version: 2026_10_03_120000)`.

## As convenções do Rails são flexíveis

{: .atencao }
Curiosidade só para a mentoria. **Não precisa falar para as participantes**: para elas, o importante agora é seguir a convenção.

O capítulo diz que o Rails cria sozinho as colunas `id`, `created_at` e `updated_at`. É o comportamento padrão, mas dá para mudar. O Rails tem convenções, mas não obriga ninguém a segui-las:

- **Sem as datas:** basta tirar o `t.timestamps` da migration. A tabela fica sem `created_at` e `updated_at`.
- **Sem o `id`:** `create_table :messages, id: false do |t|` cria a tabela sem a coluna `id`. É comum em tabelas que só ligam outras duas tabelas; o `create_join_table` já cria assim, sem `id` e sem as datas.
- **Outro tipo de `id`:** `id: :uuid` (no PostgreSQL) troca o número por um código único, e `primary_key: :code` usa outra coluna como identificador.
- **Outros nomes:** no model, `self.table_name = "recados"` liga o `Message` a uma tabela com outro nome, por exemplo num banco de dados que já existia antes do app.

Seguir a convenção é o caminho mais curto: o Rails liga tudo sozinho e o código fica parecido com o de qualquer outro app Rails. Sair dela é possível, mas cada exceção precisa ser configurada à mão.

## Active Record é um padrão, não só do Rails

{: .atencao }
Isto é só curiosidade para quem não conhece. **Não precisa falar para as participantes**, nem se alguém perguntar por que o model se chama `Message` e a tabela, `messages`: a resposta do guia (convenção do Rails) basta.

A pergunta "Por que o model se chama Message e a tabela, messages?" tem uma história por trás. A parte do Rails que cuida dos models se chama **Active Record**, e esse nome vem de um **padrão de projeto** (*design pattern*) descrito por Martin Fowler no livro *Patterns of Enterprise Application Architecture* (2002). Veja o resumo do padrão no [catálogo do Fowler](https://martinfowler.com/eaaCatalog/activeRecord.html).

A ideia do padrão: um objeto representa uma linha de uma tabela e também sabe se guardar e se buscar no banco de dados.

| No padrão | No Mural de recados |
|---|---|
| uma classe para cada tabela | `Message` ↔ tabela `messages` |
| um objeto para cada linha | `Message.first` é um recado, uma linha |
| um atributo para cada coluna | `message.author`, `message.content` |
| o próprio objeto se guarda e se busca | `Message.create`, `Message.find`, `message.destroy` |

O padrão não é exclusivo do Rails. O Eloquent, do Laravel (PHP), segue a mesma ideia, e o ORM do Django (Python) é bem parecido. Outras bibliotecas preferem separar o objeto do acesso ao banco, como no padrão **Data Mapper** (por exemplo, Doctrine, em PHP, e SQLAlchemy, em Python) ou num repositório à parte, como o `Repo` do Ecto, em Elixir.

O que é do Rails, e não do padrão, é a convenção de nomes: model no singular e tabela no plural, ligados sem configuração.

## A analogia da planilha e da assistente

O capítulo compara a migration com montar uma planilha e o model com uma assistente especialista que só cuida dessa planilha. É só uma comparação didática, para separar estrutura (migration) de dados (model). Não é uma descrição exata de como o Rails funciona.

O ponto em que ela não funciona é a diferença entre **classe** e **objeto**: `Message`, com M maiúsculo, é a classe (a "assistente"), mas o que `Message.first` devolve é um objeto, um recado específico, uma linha da tabela. Para quem nunca programou, essa diferença dificilmente fica clara de primeira, e não é objetivo deste capítulo.

- Não introduza os termos "classe" e "objeto" se ninguém perguntar.
- No capítulo 03, a analogia ganha um complemento: a assistente "te entrega aquele recado, com todas as informações dele".
- Se alguém perceber a diferença sem ajuda, ótimo: confirme e diga que esses nomes vão aparecer com mais calma depois.

## Por que `generate model`

O capítulo usa `bin/rails generate model`, e não `scaffold`, para a participante ver só o model e a migration, sem telas. O projeto não usa scaffold em nenhum capítulo (veja [Sem scaffold]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/index.md %}#sem-scaffold)): rotas, controller e views são escritos à mão nos capítulos 03 a 05.

## Próximas notas

[03. Como ver todos os recados?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/03-ver-todos-os-recados.md %})
