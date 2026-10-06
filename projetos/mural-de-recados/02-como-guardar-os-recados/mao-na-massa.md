---
title: Mão na massa
parent: "02. Como guardar os recados?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

<details class="passo" markdown="1" open>
<summary>1. Abra um terminal novo</summary>

Abra o seu codespace. Se o servidor ainda estiver ligado no terminal, deixe ele lá: abra um terminal novo pelo botão **+** do painel do terminal.

![Terminal com o servidor ligado e o botão + do painel do terminal destacado com a etiqueta Terminal novo]({{ '/assets/images/mural-de-recados/02/terminal-novo-botao.png' | relative_url }})

**Confira:** o terminal novo mostra uma linha terminando em `$`, pronta para receber comandos, e está na pasta do projeto, `/workspaces/mural-de-recados`.

À direita do painel aparece a lista de terminais: **puma** é o terminal do servidor, e **bash** é o terminal novo. Para trocar de um para o outro, clique no nome.

![Terminal novo aberto, com a lista de terminais à direita destacada: puma e bash]({{ '/assets/images/mural-de-recados/02/terminal-novo-lista.png' | relative_url }})

Se aparecer uma dica do Copilot no terminal novo, pode ignorar.

Terminou? Abra o passo **2. Crie o model Message**

</details>

<details class="passo" markdown="1">
<summary>2. Crie o model Message</summary>

No Rails, a parte do app que cuida de uma informação, como os recados, se chama **[model]({{ site.baseurl }}{% link glossario.md %}#model)** (modelo, em português). Vamos criar o model dos recados, dizendo quais informações ele tem. No código, os nomes ficam em inglês: o recado se chama `Message`, a autora é `author` e a mensagem é `content` (conteúdo). A mensagem se chama `content`, e não `message`, para o código não ficar `message.message`.

**Dê um palpite:** o comando abaixo diz `author:string` e `content:text`. O que você acha que `string` e `text` querem dizer?

No terminal, digite:

```
bin/rails generate model Message author:string content:text
```

**Confira:** o terminal mostra uma lista de arquivos criados, parecida com esta:

```
invoke  active_record
create    db/migrate/20261003120000_create_messages.rb
create    app/models/message.rb
invoke    test_unit
create      test/models/message_test.rb
create      test/fixtures/messages.yml
```

O comando criou quatro arquivos:

- `db/migrate/…_create_messages.rb`: a **migration**, com as instruções para criar a tabela dos recados no banco de dados. Você vai revisar esse arquivo no próximo passo. O número no começo do nome é a data e a hora em que você rodou o comando, então o seu vai ser diferente.
- `app/models/message.rb`: o **model** `Message`, que representa um recado dentro do app.
- `test/models/message_test.rb`: um lugar para escrever [testes automatizados]({{ site.baseurl }}{% link glossario.md %}#teste-automatizado) do model.
- `test/fixtures/messages.yml`: recados de exemplo, usados só pelos testes.

{: .pensando-title }
> Model e migration
>
> Pense numa planilha de recados:
>
> - A **migration** monta a planilha: cria a aba e dá nome às colunas, `author` e `content`.
> - O **model** é uma assistente especialista: ela só cuida da planilha de recados. Escreve uma linha nova para cada recado, procura, conta e apaga. Se um dia o app guardar outro tipo de informação, ela ganha uma assistente própria, ou seja, outro model.
>
> Um prepara o lugar; o outro trabalha com o que está lá dentro.

**Por enquanto, a gente vai pular os testes.** Você não precisa abrir nem mexer nos dois arquivos da pasta `test`: pode deixar eles lá, do jeito que o Rails criou.

Sobre o palpite: `string` é um texto curto, como um nome; `text` é um texto longo, como uma mensagem.

Terminou? Abra o passo **3. Revise a migration**

</details>

<details class="passo" markdown="1">
<summary>3. Revise a migration</summary>

O `generate` criou uma **[migration]({{ site.baseurl }}{% link glossario.md %}#migration)** (migração, em português): um arquivo com as instruções para criar a tabela de recados no banco de dados. Ela ainda não foi aplicada.

No Explorer, abra a pasta `db/migrate` e clique no arquivo que termina em `_create_messages.rb`. Ele é parecido com isto:

```ruby
class CreateMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :messages do |t|
      t.string :author
      t.text :content

      t.timestamps
    end
  end
end
```

**Dê um palpite:** você consegue achar onde aparecem a autora e a mensagem? E o que você acha que faz o `t.timestamps`?

**Confira:** a linha `create_table :messages` cria a tabela `messages` (os recados), e as linhas `t.string :author` e `t.text :content` criam uma coluna para cada informação. O `t.timestamps` cria duas colunas que o Rails preenche sozinho: `created_at` (quando o recado foi criado) e `updated_at` (quando foi alterado pela última vez).

Você não precisa mudar nada neste arquivo.

{: .pensando-title }
> Repare
>
> A migration ainda não criou nada. Ela é só a instrução, como o desenho de uma planilha com o nome de cada coluna. A planilha de verdade, a tabela no banco de dados, ainda não existe: ela é criada no próximo passo.

Terminou? Abra o passo **4. Rode a migration**

</details>

<details class="passo" markdown="1">
<summary>4. Rode a migration</summary>

Agora vamos aplicar a migration, para a tabela existir de verdade no banco de dados. No terminal, digite:

```
bin/rails db:migrate
```

**Confira:** o terminal mostra algo parecido com isto:

```
== 20261003120000 CreateMessages: migrating ==========
-- create_table(:messages)
   -> 0.0012s
== 20261003120000 CreateMessages: migrated (0.0013s) =
```

A tabela `messages` foi criada. Repare também no arquivo `db/schema.rb`: ele mostra como o banco de dados está agora, com a tabela nova.

Terminou? Abra o passo **5. Guarde um recado pelo console**

</details>

<details class="passo" markdown="1">
<summary>5. Guarde um recado pelo console</summary>

Ainda não existe uma tela para postar recados: ela vem no capítulo 04. Mas já dá para guardar um recado pelo **console**, um jeito de conversar com o app escrevendo código Ruby direto no terminal.

No terminal, digite:

```
bin/rails console
```

O terminal muda e passa a esperar código Ruby. Digite:

```ruby
Message.create(author: "Ana", content: "Meu primeiro recado!")
```

**Confira:** o console mostra uma linha com `INSERT INTO "messages"` (o Rails guardando o recado no banco de dados) e, no fim, o recado criado, com `id: 1`, a autora, a mensagem e as datas.

Agora pergunte quantos recados existem:

```ruby
Message.count
```

**Confira:** a resposta é `1`.

{: .pensando-title }
> O que o model fez aqui?
>
> O `Message.create` pediu para o model, a assistente especialista em recados, escrever uma linha nova na planilha `messages`:
>
> | id | author | content | created_at |
> |---|---|---|---|
> | 1 | Ana | Meu primeiro recado! | (agora) |
>
> Você só disse a autora e a mensagem: o `id` e as datas ela preencheu sozinha. E o `Message.count` pediu para ela contar quantas linhas a planilha tem.

Terminou? Abra o passo **6. Feche e abra o console de novo**

</details>

<details class="passo" markdown="1">
<summary>6. Feche e abra o console de novo</summary>

**Dê um palpite:** se você fechar o console e abrir de novo, o recado da Ana continua lá?

Para sair do console, digite:

```ruby
exit
```

Abra o console de novo:

```
bin/rails console
```

E pergunte de novo:

```ruby
Message.count
```

**Confira:** a resposta continua sendo `1`. O recado não estava guardado no console: estava no banco de dados, e continua lá mesmo depois de fechar tudo. Esse era o desafio do capítulo! 🎉

Para ver o recado inteiro, digite:

```ruby
Message.first
```

Depois, saia do console com `exit`.

Terminou? Abra o passo **7. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>7. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Cria o model Message` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Cria o model Message` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>O terminal diz <code>Could not find command</code> ou <code>No such file or directory</code></summary>

Você provavelmente está fora da pasta do projeto. Digite `cd /workspaces/mural-de-recados` e tente de novo.

</details>

<details class="pergunta" markdown="1">
<summary>Errei o nome de um campo no <code>generate</code></summary>

Se você ainda **não** rodou a migration, desfaça o que o `generate` criou e gere de novo:

```
bin/rails destroy model Message
```

Se você **já** rodou a migration, desfaça ela antes, com `bin/rails db:rollback`, e depois rode o `destroy`.

Na dúvida, peça ajuda para alguém da mentoria. 💜

</details>

<details class="pergunta" markdown="1">
<summary>O console diz <code>NameError: uninitialized constant Message</code></summary>

Confira se você escreveu `Message` com **M** maiúsculo: para o Ruby, `message` e `Message` são coisas diferentes. Se estiver certo, confira se o arquivo `app/models/message.rb` existe (passo 2).

</details>

<details class="pergunta" markdown="1">
<summary>O console diz <code>no such table: messages</code></summary>

A migration ainda não foi aplicada. Saia do console com `exit` e rode `bin/rails db:migrate` (passo 4).

</details>

<details class="pergunta" markdown="1">
<summary>O navegador mostra o erro <code>Migrations are pending</code></summary>

Você criou a migration, mas ainda não rodou. Rode `bin/rails db:migrate` (passo 4) e recarregue a página.

</details>

<details class="pergunta" markdown="1">
<summary>O console não deixa digitar comandos do terminal</summary>

Você ainda está dentro do console, que só entende Ruby. Digite `exit` para voltar ao terminal.

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/02-como-guardar-os-recados.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}) e entenda cada passo.
