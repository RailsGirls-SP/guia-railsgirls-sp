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

- **Model e migration parecem a mesma coisa.** A migration é a instrução para criar a tabela, e roda uma vez. O model é quem usa a tabela, o tempo todo. Uma analogia que costuma ajudar: a migration é a planta da reforma; o model é quem mora na casa. E quem faz a obra? O comando `bin/rails db:migrate`: ele lê a planta e constrói a tabela no banco de dados. Sem rodá-lo, a planta existe, mas a casa não foi construída, e o model não tem onde morar (é o erro `no such table: messages`).
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

E o espaço? Ao contrário do que muita gente pensa, `string` não economiza espaço. Nos três bancos, o que ocupa espaço é o texto guardado, e não o tipo: um nome de 3 letras ocupa o mesmo numa coluna `string` ou `text`. O `varchar(255)` do MySQL é só um limite, e não reserva 255 caracteres. No PostgreSQL, os dois são guardados exatamente do mesmo jeito. No MySQL, a diferença é *onde* o texto fica: textos longos de uma coluna `text` podem ser guardados fora da linha da tabela, o que pesa um pouco em algumas buscas. Quem reserva espaço fixo é outro tipo, o `char(n)`, que o Rails quase não usa.

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
| **Leitura e escrita de dados ao mesmo tempo** | **Ler** (mostrar os recados) pode ser feito por várias pessoas ao mesmo tempo. **Escrever** (guardar, mudar ou apagar um recado) é uma de cada vez: as outras esperam na fila | Várias leituras **e** várias escritas ao mesmo tempo, desde que em linhas diferentes da tabela |
| **Vários servidores** | Não: o arquivo fica num computador só, e só o app que está nele acessa | Sim: o banco fica num servidor próprio, e vários apps conectam a ele pela rede |
| **Recursos avançados** | Menos: poucos tipos de dados, sem usuários e permissões, sem réplicas | Mais: usuários e permissões, réplicas (cópias para leitura e para backup) e, no PostgreSQL, tipos como JSON e busca em texto |

**Limitações do SQLite, em resumo:**

- **Escrita: uma por vez.** Enquanto um app guarda, muda ou apaga um dado, os outros que querem escrever esperam na fila. Cada escrita leva milissegundos, então a fila quase não existe com poucos acessos, e vira problema só quando muita gente escreve no mesmo instante.
- **Leitura: não é limite.** Ler dados em paralelo funciona bem, inclusive durante uma escrita.
- **Um servidor só.** O arquivo fica num computador, então o app não consegue rodar em vários servidores usando o mesmo banco.
- **Velocidade, número de tabelas e tamanho não costumam ser problema.** Sem rede no caminho, as leituras são rapidíssimas. O tamanho máximo de um banco é de 281 TB, e o número de tabelas, na prática, não tem limite.

Para um app com poucos acessos por segundo, como o mural de recados, o SQLite dá conta com folga. Quando o app passa a ter muita escrita ao mesmo tempo, ou precisa rodar em vários servidores, aí vale migrar para o PostgreSQL ou o MySQL.

**Um mini exemplo:** duas pessoas clicam em **Postar recado** no mesmo instante, e cada clique vira um `INSERT` na tabela `messages`.

| | SQLite | PostgreSQL e MySQL |
|---|---|---|
| **O que acontece** | O primeiro `INSERT` trava o banco inteiro para escrita. O segundo espera, por alguns milissegundos, e só então entra | Os dois `INSERT` entram ao mesmo tempo, cada um na sua linha |
| **E se forem em tabelas diferentes?** | Espera do mesmo jeito: o trava vale para o arquivo todo | Entram ao mesmo tempo |
| **E se as duas pessoas editarem o mesmo recado?** | Uma espera a outra | Uma espera a outra, só aquela linha fica travada |
| **Se a espera passar do limite** | O segundo pedido falha com `SQLite3::BusyException: database is locked`. O Rails espera até 5 segundos antes de desistir (`timeout: 5000` no `config/database.yml`) | Não costuma acontecer com esse volume |

O SQLite trava o arquivo inteiro; o PostgreSQL e o MySQL travam só a linha que está sendo alterada. Com dezenas de escritas por segundo, essa diferença começa a aparecer. O Rails 8 já deixa o SQLite bem ajustado para isso (usa o modo WAL, em que leitura e escrita andam juntas).

Fontes: a [documentação do SQLite sobre o modo WAL](https://www.sqlite.org/wal.html) ("there can only be one writer at a time"), os [limites do SQLite](https://www.sqlite.org/limits.html) e a [documentação do PostgreSQL sobre MVCC](https://www.postgresql.org/docs/current/mvcc-intro.html) ("reading never blocks writing and writing never blocks reading"). Os padrões do Rails (WAL e `timeout`) estão no adaptador do SQLite do Active Record 8.1 e no `database.yml` de um app novo.

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
- **Sem o `id`:** `create_table :messages, id: false do |t|` cria a tabela sem a coluna `id`. Muita gente acredita que toda tabela precisa de `id`, mas não precisa: o `id` é só o jeito padrão de identificar cada linha. Uma tabela pode ser identificada por outra coluna (`primary_key: :code`) ou por uma combinação de colunas, a **chave primária composta** (`primary_key: [:product_id, :client_id]`, que o Rails aceita desde a versão 7.1). Tabelas que só ligam outras duas tabelas costumam ser assim, e o `create_join_table` já cria sem `id`. Esse comando não acrescenta as datas, mas na prática é comum colocá-las (`t.timestamps` no bloco), principalmente quando a ligação vira um model e vale saber **quando** ela foi criada.
- **Outro tipo de `id`:** `id: :uuid` (no PostgreSQL) troca o número por um código único (veja [UUID ou `id` numérico?](#uuid-ou-id-numérico)), e `primary_key: :code` usa outra coluna como identificador.
- **Outros nomes:** no model, `self.table_name = "recados"` liga o `Message` a uma tabela com outro nome, por exemplo num banco de dados que já existia antes do app.

Seguir a convenção é o caminho mais curto: o Rails liga tudo sozinho e o código fica parecido com o de qualquer outro app Rails. Sair dela é possível, mas cada exceção precisa ser configurada à mão.

### UUID ou `id` numérico?

Se alguém perguntar por que o Rails usa `1, 2, 3…` e quando faz sentido trocar por UUID (um código aleatório como `3f2b8c1e-…`), um overview:

| | `id` numérico (padrão) | UUID |
|---|---|---|
| **Segurança** | Previsível: se o recado 12 existe, o 13 também. Quem vê `/messages/12` tenta `/messages/13`, e o total de registros do app fica à mostra | Impossível de adivinhar e não revela quantos registros existem |
| **Tamanho** | 8 bytes (`bigint`) | 16 bytes (128 bits). Índices e chaves estrangeiras ficam maiores |
| **Desempenho** | Ótimo: cresce em ordem, e cada novo registro entra no fim do índice | UUID aleatório (v4) entra em posições espalhadas do índice, o que custa mais em tabelas grandes. O **UUIDv7**, que começa com a data e a hora, volta a entrar em ordem (o PostgreSQL 18 gera com `uuidv7()`) |
| **Outras diferenças** | Simples de ler e de falar ("recado 12"). `Message.first` e `.last` são o mais antigo e o mais novo | Pode ser gerado fora do banco e juntar bancos diferentes sem colisão. Com UUID aleatório, `.first` e `.last` deixam de ser o mais antigo e o mais novo (dá para ordenar por data com `implicit_order_column`) |

Dois cuidados:

- **UUID não substitui autorização.** Esconder o endereço não impede ninguém de ver o que não deveria. A regra que protege é conferir, em cada pedido, se a pessoa pode ver aquele recado (a falha de não conferir se chama **IDOR**). O UUID só dificulta adivinhar, uma camada extra.
- **Dá para ter os dois.** Muitos apps guardam o `id` numérico no banco, por desempenho, e mostram na URL um código público. O Active Record tem o `signed_id`, que gera um código assinado, impossível de forjar, a partir do `id`.

Para o mural de recados, o `id` numérico é a escolha certa: os recados são públicos para quem tem a palavra-chave, a tabela é pequena e a convenção deixa tudo mais simples.

**Para ir além:**

- [Normalização de dados](https://pt.wikipedia.org/wiki/Normaliza%C3%A7%C3%A3o_de_dados), na Wikipédia: por que dividir os dados em várias tabelas, e as formas normais (1FN, 2FN, 3FN…). É daí que vêm as tabelas de ligação.
- [Database normalization basics](https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description), da Microsoft (em inglês): uma introdução curta, com exemplos.
- [`has_many :through` ou `has_and_belongs_to_many`?](https://guides.rubyonrails.org/association_basics.html#has-many-through-vs-has-and-belongs-to-many), no guia de associações do Rails (em inglês): quando a tabela de ligação precisa de `id` e de datas (vira um model) e quando não.
- [Chaves primárias compostas](https://guides.rubyonrails.org/active_record_composite_primary_keys.html), no guia do Rails (em inglês).
- [Tipo `uuid`](https://www.postgresql.org/docs/current/datatype-uuid.html) e [funções de UUID](https://www.postgresql.org/docs/current/functions-uuid.html), na documentação do PostgreSQL (em inglês).
- [Insecure Direct Object Reference Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html), da OWASP (em inglês): o IDOR, e por que identificadores difíceis de adivinhar são uma camada extra, e não a proteção principal.

## Active Record é um padrão, não só do Rails

{: .atencao }
Isto é só curiosidade para quem não conhece. **Não precisa falar para as participantes**, nem se alguém perguntar por que o model se chama `Message` e a tabela, `messages`: a resposta do guia (convenção do Rails) basta.

A parte do Rails que cuida dos models se chama **Active Record**, e esse nome vem de um **padrão de projeto** (*design pattern*) descrito por Martin Fowler no livro *Patterns of Enterprise Application Architecture* (2002). Veja o resumo do padrão no [catálogo do Fowler](https://martinfowler.com/eaaCatalog/activeRecord.html): "um objeto que envolve uma linha de uma tabela do banco de dados, encapsula o acesso ao banco e acrescenta regras sobre esses dados" (tradução livre).

**Isso não explica os nomes `Message` e `messages`.** A pergunta "Por que o model se chama Message e a tabela, messages?" é sobre a **convenção de nomes do Rails**, e o padrão não diz nada sobre nomes: ele só descreve que um objeto representa uma linha. Singular para o model e plural para a tabela é uma escolha do Rails, parte do "convenção em vez de configuração", e quem faz a conversão é o *inflector* do Active Support, que segue as regras do inglês (por isso `Mensagem` viraria `mensagems`). Quando o plural é irregular, dá para ensinar o Rails em `config/initializers/inflections.rb`.

A ideia do padrão, em Rails:

| No padrão | No Mural de recados |
|---|---|
| um objeto para cada linha | `Message.first` é um recado, uma linha |
| um atributo para cada coluna | `message.author`, `message.content` |
| o próprio objeto se guarda e se busca | `Message.create`, `Message.find`, `message.destroy` |

Já a ligação entre a classe `Message` e a tabela `messages` é a convenção de nomes do Rails, e não do padrão.

O padrão não é exclusivo do Rails. O Eloquent, do Laravel (PHP), segue a mesma ideia, e o ORM do Django (Python) é bem parecido. Outras bibliotecas preferem separar o objeto do acesso ao banco, como no padrão **Data Mapper** (por exemplo, Doctrine, em PHP, e SQLAlchemy, em Python) ou num repositório à parte, como o `Repo` do Ecto, em Elixir.

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
