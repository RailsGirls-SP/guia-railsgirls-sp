---
title: "02. How do we store the messages?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 3
translation_of: mentoras/projetos/mural-de-recados/02-como-guardar-os-recados.md
translated_from: 1238896
---

# 02. How do we store the messages?

[See chapter]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-02`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

## Questions for "Think before you code"

- "If we close the browser, where does the message stay?" Let the person get to the idea of a place that stores information on their own.
- "How would you write down several messages in a spreadsheet?" The spreadsheet is the bridge to the idea of table, row and column.
- "Are the author and the text the same kind of thing?" Leads to the difference between `string` and `text` (see [`string` or `text`?](#string-or-text)).

## Common confusions

- **Model and migration look like the same thing.** The migration is the instruction to create the table, and it runs once. The model is what uses the table, all the time. An analogy that usually helps: the migration is the blueprint for the renovation; the model is who lives in the house. And who does the construction? The command `bin/rails db:migrate`: it reads the blueprint and builds the table in the database. Without running it, the blueprint exists, but the house wasn't built, and the model has nowhere to live (that's the error `no such table: messages`).
- **Forgetting `bin/rails db:migrate`.** The console answers `no such table: messages`, and the browser shows `Migrations are pending`.
- **Getting "stuck" in the console.** Whoever tries to run `bin/rails ...` inside the console gets a Ruby error. `exit` goes back to the terminal.
- **`Message` with a lowercase m** in the console gives a `NameError`.
- **The empty message in "Break it on purpose".** It's on purpose: Rails accepts it, because nobody said it isn't allowed. Don't give away the solution; it's chapter 07.

## Where the messages are stored in Codespaces

The database is **SQLite**, which lives in a single file: `storage/development.sqlite3`, inside the project's folder in the codespace.

- **The messages are still there** when the codespace is shut down and started again, when the participant closes the tab or when the codespace goes to sleep due to inactivity.
- **The messages are lost** when the codespace is deleted (including when GitHub deletes on its own a codespace that sat unused for a long time, by default after 30 days), when the participant creates a new codespace for the same repository or when they start working on their own computer.
- **The database doesn't go to GitHub.** The `.gitignore` Rails created leaves the `storage` folder out of the commits. The code travels with the repository; the data doesn't.

If someone asks why the messages disappeared in a new codespace, that's it: the code came from GitHub, but the database starts empty. Just run `bin/rails db:migrate` to create the table again and post new messages.

This also applies to chapter 08: on Render's free plan, the disk isn't permanent either, and SQLite loses the data with every deploy. That's why chapter 08 uses a PostgreSQL on Render.

## `string` or `text`?
{: #string-or-text }

### What to tell participants

A short explanation, for anyone who asks or gets the guess in step 1 wrong:

- **`string` is a short text**, of one line, like a name. It's the `author`.
- **`text` is a long text**, which can have several lines, like a message. It's the message's `content`.
- **You can see the difference on the screen:** in chapter 04, the author will be a one-line box, and the text, a bigger box.
- **If someone asks "so is there a size limit?":** it's not the type that limits it. The message board's 280-character rule will be written in chapter 07.

**If they ask "why are there two types?":** think of a paper form. The "Name" field has a short line, and the "Notes" field has a big box, because each one was designed for a size of text. In the app it's the same: `string` for what's short (a name, a title) and `text` for what can be long (a message). **And performance, under the hood?** In SQLite and PostgreSQL, which the guide uses, both types are stored and read the same way, so the choice doesn't make the app faster or slower. In other databases, there are small differences, but they only show up in very large apps, not in the message board.

The rest of this section is for mentors.

### In more detail (mentors only)

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter only says that `string` is short text and `text`, long text.

Both store text. The difference is in the expected size and in how each database stores it:

| | `string` | `text` |
|---|---|---|
| **What for** | Short, one-line text: name, email, title | Long text, which can have several lines: message, description, comment |
| **In SQLite** (codespace) | `varchar`, but SQLite stores both the same way and doesn't limit the size | `text` |
| **In PostgreSQL** (Render, chapter 08) | `character varying`, with no size limit | `text`, also with no limit (internally, both work the same) |
| **In MySQL** | `varchar(255)`: at most 255 characters | `text`: up to 64 KB (about 65 thousand characters without accents) |
| **In the form** | Goes with `text_field` (one line) | Goes with `text_area` (bigger box) |

In the message board, `author` is a `string` (a name) and `content` is `text` (the message). In the databases the guide uses, the choice makes almost no difference in practice: it states **the intention** of whoever planned it, and that intention shows up again in chapter 04, with `form.text_field :author` and `form.text_area :content`. The Rails scaffold also uses this hint to choose the form field.

If someone asks "couldn't we use only `text`, or only `string`?": in SQLite and PostgreSQL, it would work. Even so, it's worth having both:

- **The intention lives in the code.** Whoever reads `string` knows it's a short text; whoever reads `text`, that it can be long. It's like choosing a variable's name well.
- **Rails and other tools use this hint**, like the scaffold, which chooses the one-line box or the bigger box in the form.
- **The app can change databases.** In MySQL, everything as `string` would cut messages longer than 255 characters. And everything as `text` gets in the way of indexes (used for fast lookups), which in MySQL don't work directly on a `text` column.
- **It's the convention.** Whoever joins a Rails project expects names and titles as `string` and long texts as `text`.

What about space and performance? Contrary to what many people think, `string` doesn't save space. In all three databases, what takes up space is the stored text, not the type: a 3-letter name takes up the same in a `string` or `text` column, and MySQL's `varchar(255)` is just a limit, and doesn't reserve 255 characters. What reserves fixed space is another type, `char(n)`, which Rails hardly uses. By database:

- **SQLite:** no difference. `varchar` and `text` have the same affinity (`TEXT`), and SQLite ignores the number in parentheses: `varchar(255)` doesn't limit anything.
- **PostgreSQL:** no difference. The documentation says there is "no performance difference" between `character varying` and `text`, apart from a small length check when there's a limit. Long texts, in both types, are compressed automatically, and very long ones are kept in support tables (*TOAST*) so they don't get in the way of reading the other columns. All of this is transparent to the app.
- **MySQL (InnoDB):** this is where there are differences, and they're practical:
  - **Indexes:** on a `text` column, the index requires a prefix length (`index(content(100))`), and on a `varchar`, it doesn't.
  - **Sorting:** when sorting by a `text` column, only the first 1024 bytes are used, by default (`max_sort_length`).
  - **Temporary tables:** a query that returns `text` columns and uses a temporary table goes to disk, not to memory, and the documentation recommends avoiding `SELECT *` because of that.
  - **Where the text lives:** long values, of `varchar` **or** `text`, can go outside the table's row when the row gets big; only a 20-byte pointer stays in the row. The type doesn't decide this; the size of the value does.

If someone asks "so the message can be any size?": in the database, yes. The 280-character limit is a message board rule, not a rule of the column's type: it goes into the model, with a validation, in chapter 07.

Sources: the types for each database are in the Active Record 8.1 code (`NATIVE_DATABASE_TYPES` in the SQLite, PostgreSQL and MySQL adapters). The rest comes from the official documentation: [SQLite, data types](https://www.sqlite.org/datatype3.html), [PostgreSQL, character types](https://www.postgresql.org/docs/current/datatype-character.html), [MySQL, BLOB and TEXT](https://dev.mysql.com/doc/refman/8.4/en/blob.html) and [MySQL, InnoDB row format](https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html).

## SQLite, MySQL and PostgreSQL

{: .atencao }
This is context for mentors. **You don't need to explain it to participants now**: only if someone asks.

The app uses **SQLite**, which is the Rails default. It works differently from databases like **MySQL** and **PostgreSQL**:

| | SQLite | MySQL and PostgreSQL |
|---|---|---|
| **Where it lives** | In a single file inside the project (`storage/development.sqlite3`) | In a separate program, the database server, which the app accesses over the network |
| **Installation** | None: it comes with Rails | You need to install and configure the database server, user and password |
| **Good for** | Learning, development and small or medium apps | Apps with many simultaneous accesses, several servers using the same database and advanced features |
| **Reading and writing data at the same time** | **Reading** (showing the messages) can be done by many people at the same time. **Writing** (storing, changing or deleting a message) is one at a time: the others wait in line | Many reads **and** many writes at the same time, as long as they're on different rows of the table |
| **Several servers** | No: the file lives on a single computer, and only the app on it accesses it | Yes: the database lives on its own server, and many apps connect to it over the network |
| **Advanced features** | Fewer: few data types, no users and permissions, no replicas | More: users and permissions, replicas (copies for reading and for backup) and, in PostgreSQL, types like JSON and text search |

**SQLite's limitations, in short:**

- **Writing: one at a time.** While an app stores, changes or deletes a piece of data, the others that want to write wait in line. Each write takes milliseconds, so the line hardly exists with few accesses, and only becomes a problem when many people write at the same instant.
- **Reading: not a limit.** Reading data in parallel works well, even during a write.
- **A single server.** The file lives on one computer, so the app can't run on several servers using the same database.
- **Speed, number of tables and size usually aren't a problem.** With no network in the way, reads are really fast. The maximum size of a database is 281 TB, and the number of tables, in practice, has no limit.

For an app with few accesses per second, like the message board, SQLite handles it easily. When the app starts having a lot of simultaneous writing, or needs to run on several servers, then it's worth migrating to PostgreSQL or MySQL.

**A mini example:** two people click **Post message** at the same instant, and each click becomes an `INSERT` into the `messages` table.

| | SQLite | PostgreSQL and MySQL |
|---|---|---|
| **What happens** | The first `INSERT` locks the whole database for writing. The second one waits, for a few milliseconds, and only then goes in | Both `INSERT`s go in at the same time, each on its own row |
| **What if they're on different tables?** | It waits all the same: the lock applies to the whole file | They go in at the same time |
| **What if both people edit the same message?** | One waits for the other | One waits for the other, only that row is locked |
| **If the wait goes past the limit** | The second request fails with `SQLite3::BusyException: database is locked`. Rails waits up to 5 seconds before giving up (`timeout: 5000` in `config/database.yml`) | It doesn't usually happen at this volume |

SQLite locks the whole file; PostgreSQL and MySQL lock only the row being changed. With dozens of writes per second, this difference starts to show. Rails 8 already tunes SQLite well for this (it uses WAL mode, in which reading and writing go together).

Sources: the [SQLite documentation on WAL mode](https://www.sqlite.org/wal.html) ("there can only be one writer at a time"), the [SQLite limits](https://www.sqlite.org/limits.html) and the [PostgreSQL documentation on MVCC](https://www.postgresql.org/docs/current/mvcc-intro.html) ("reading never blocks writing and writing never blocks reading"). The Rails defaults (WAL and `timeout`) are in Active Record 8.1's SQLite adapter and in a new app's `database.yml`.

In day-to-day Rails, the difference hardly shows: Active Record (the part of Rails behind the models) generates the right commands for each database, and the app's code practically doesn't change. What chooses the database is the file `config/database.yml`.

SQLite isn't just a "toy database": since Rails 8, it's also a recommended option for putting apps in production. Even so, PostgreSQL and MySQL are still very common in companies.

This topic comes back in chapter 08: on some hosting services, like Render's free plan, the disk isn't permanent, and that's why chapter 08 uses a PostgreSQL in production.

## Where Rails writes down the migrations that already ran

{: .atencao }
A curiosity for mentors only. **You don't need to show it to participants.**

The question "Why does the migration's name start with a date and time?" says that Rails writes down in the database the migrations it has already run. That record lives in a table Rails itself creates, `schema_migrations`. It has a single column, `version`, with the number (the date and time) of each applied migration. When you run `bin/rails db:migrate`, Rails compares the files in `db/migrate` with this table and applies only the missing ones.

To see it, in the terminal:

```
bin/rails db:migrate:status
```

The output lists each migration with its number, name and status: `up` (already applied) or `down` (not yet):

```
database: storage/development.sqlite3

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20261003120000  Create messages
```

Or straight from the table, in the console:

```ruby
ActiveRecord::Base.connection.select_values("SELECT version FROM schema_migrations")
```

The number of the last migration also shows up at the beginning of `db/schema.rb`, in `ActiveRecord::Schema[8.1].define(version: 2026_10_03_120000)`.

## Rails conventions are flexible

{: .atencao }
A curiosity for mentors only. **You don't need to tell participants**: for them, what matters now is following the convention.

The chapter says that Rails creates the `id`, `created_at` and `updated_at` columns on its own. It's the default behavior, but it can be changed. Rails has conventions, but it doesn't force anyone to follow them:

- **Without the dates:** just remove `t.timestamps` from the migration. The table ends up without `created_at` and `updated_at`.
- **Without the `id`:** `create_table :messages, id: false do |t|` creates the table without the `id` column. Many people believe every table needs an `id`, but it doesn't: the `id` is just the default way to identify each row. A table can be identified by another column (`primary_key: :code`) or by a combination of columns, the **composite primary key** (`primary_key: [:product_id, :client_id]`). In the database and the migration, this has worked since Rails 5.0. Models, however, only started understanding composite keys in Rails 7.1: before that, Active Record treated such a table as if it had no primary key, and whoever needed it used a gem, `composite_primary_keys`. Tables that only connect two other tables are usually like this, and `create_join_table` already creates them without an `id`. That command doesn't add the dates, but in practice it's common to add them (`t.timestamps` in the block), especially when the connection becomes a model and it's worth knowing **when** it was created.
- **Another kind of `id`:** `id: :uuid` (in PostgreSQL) replaces the number with a unique code (see [UUID or numeric `id`?](#uuid-or-numeric-id)), and `primary_key: :code` uses another column as the identifier.
- **Other names:** in the model, `self.table_name = "notes"` connects `Message` to a table with another name, for example in a database that existed before the app.

Following the convention is the shortest path: Rails connects everything on its own and the code looks like any other Rails app's. Stepping outside it is possible, but each exception needs to be configured by hand.

### UUID or numeric `id`?
{: #uuid-or-numeric-id }

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter only says the `id` is a number Rails creates on its own. Only use it if someone asks.

If someone asks why Rails uses `1, 2, 3…` and when it makes sense to switch to UUID (a random code like `3f2b8c1e-…`), an overview:

| | Numeric `id` (default) | UUID |
|---|---|---|
| **Security** | Predictable: if message 12 exists, so does 13. Whoever sees `/messages/12` tries `/messages/13`, and the app's total number of records is on display | Impossible to guess and doesn't reveal how many records exist |
| **Size** | 8 bytes (`bigint`) | 16 bytes (128 bits). Indexes and foreign keys get bigger |
| **Performance** | Great: it grows in order, and each new record goes at the end of the index. Listing the most recent ones (`ORDER BY id DESC`) reads only the end of the index | A random UUID (v4) has two costs. **On writes:** each new record goes into any position in the index, which touches scattered parts of it and uses memory less well (only matters on big tables). **On listing:** sorting by `id` stops making sense, because the order is random, and you need to sort by `created_at`, with an index just for that. Looking up a record by `id` costs about the same. **UUIDv7**, which starts with the date and time, solves both: it goes into the index in order and sorts by creation (PostgreSQL 18 generates it with `uuidv7()`) |
| **Other differences** | Simple to read and to say ("message 12"). `Message.first` and `.last` are the oldest and the newest | Can be generated outside the database and merge different databases without collisions. With a random UUID, `.first` and `.last` stop being the oldest and the newest, because Rails sorts them by the primary key when nobody asks for another order. You can change that: `self.implicit_order_column = "created_at"` in the model (or in `ApplicationRecord`, for all of them) makes `.first` and `.last` sort by date, and the primary key only breaks ties |

Two things to watch for:

- **UUID doesn't replace authorization.** Hiding the address doesn't stop anyone from seeing what they shouldn't. The rule that protects is checking, on every request, whether the person can see that message (the failure to check is called **IDOR**). The UUID only makes guessing harder, an extra layer.
- **You can have both.** Many apps keep the numeric `id` in the database, for performance, and show a public code in the URL. Active Record has `signed_id`, which generates a signed code, impossible to forge, from the `id`.

For the message board, the numeric `id` is the right choice: the messages are public for whoever has the password, the table is small and the convention keeps everything simpler.

**Going further:**

- [Database normalization](https://en.wikipedia.org/wiki/Database_normalization), on Wikipedia: why to split data into several tables, and the normal forms (1NF, 2NF, 3NF…). That's where join tables come from.
- [Database normalization basics](https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description), by Microsoft: a short introduction, with examples.
- [`has_many :through` or `has_and_belongs_to_many`?](https://guides.rubyonrails.org/association_basics.html#has-many-through-vs-has-and-belongs-to-many), in the Rails associations guide: when the join table needs an `id` and dates (it becomes a model) and when it doesn't.
- [Composite primary keys](https://guides.rubyonrails.org/active_record_composite_primary_keys.html), in the Rails guide.
- [The `uuid` type](https://www.postgresql.org/docs/current/datatype-uuid.html) and [UUID functions](https://www.postgresql.org/docs/current/functions-uuid.html), in the PostgreSQL documentation.
- [Insecure Direct Object Reference Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html), by OWASP: IDOR, and why hard-to-guess identifiers are an extra layer, not the main protection.

## Active Record is a pattern, not just a Rails thing

{: .atencao }
This is just a curiosity for anyone who doesn't know it. **You don't need to tell participants**, not even if someone asks why the model is called `Message` and the table, `messages`: the guide's answer (a Rails convention) is enough.

The part of Rails that takes care of models is called **Active Record**, and that name comes from a **design pattern** described by Martin Fowler in the book *Patterns of Enterprise Application Architecture* (2002). See the summary of the pattern in [Fowler's catalog](https://martinfowler.com/eaaCatalog/activeRecord.html): "an object that wraps a row in a database table or view, encapsulates the database access, and adds domain logic on that data".

**That doesn't explain the names `Message` and `messages`.** The question "Why is the model called Message and the table, messages?" is about the **Rails naming convention**, and the pattern says nothing about names: it only describes that an object represents a row. Singular for the model and plural for the table is a Rails choice, part of "convention over configuration", and what does the conversion is Active Support's *inflector*, which follows the rules of English. When the plural is irregular, you can teach Rails in `config/initializers/inflections.rb`.

The pattern's idea, in Rails:

| In the pattern | In the Message Board |
|---|---|
| one object for each row | `Message.first` is one message, one row |
| one attribute for each column | `message.author`, `message.content` |
| the object stores and looks itself up | `Message.create`, `Message.find`, `message.destroy` |

The connection between the `Message` class and the `messages` table, on the other hand, is the Rails naming convention, and not the pattern.

The pattern isn't exclusive to Rails. Laravel's Eloquent (PHP) follows the same idea, and Django's ORM (Python) is very similar. Other libraries prefer to separate the object from the database access, as in the **Data Mapper** pattern (for example, Doctrine, in PHP, and SQLAlchemy, in Python) or in a separate repository, like Ecto's `Repo`, in Elixir.

## The spreadsheet and assistant analogy

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the analogy shows up in the chapter, but this section is about its limit (class and object), which the chapter doesn't explain.

The chapter compares the migration to setting up a spreadsheet and the model to a specialist assistant who only takes care of that spreadsheet. It's just a teaching comparison, to separate structure (migration) from data (model). It's not an exact description of how Rails works.

The point where it doesn't work is the difference between **class** and **object**: `Message`, with a capital M, is the class (the "assistant"), but what `Message.first` returns is an object, a specific message, a row of the table. For someone who has never programmed, this difference is unlikely to be clear the first time, and it isn't this chapter's goal.

- Don't introduce the terms "class" and "object" if nobody asks.
- In chapter 03, the analogy gets a complement: the assistant "hands you that message, with all its information".
- If someone notices the difference on their own, great: confirm it and say those names will come up more calmly later.

## Why `generate model`

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: it's the reasoning behind how the guide was written. The word *scaffold* only shows up for them in the AI boxes in chapters 03 to 05.

The chapter uses `bin/rails generate model`, and not `scaffold`, so the participant only sees the model and the migration, with no screens. The project doesn't use the scaffold in any chapter (see [No scaffold]({{ site.baseurl }}{% link mentors/projects/message-board/index.md %}#no-scaffold)): routes, controller and views are written by hand in chapters 03 to 05.

## Next notes

[03. How do we see all the messages?]({{ site.baseurl }}{% link mentors/projects/message-board/03-see-all-the-messages.md %})
