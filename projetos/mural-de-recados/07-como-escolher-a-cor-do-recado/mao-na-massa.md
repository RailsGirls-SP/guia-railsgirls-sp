---
title: Mão na massa
parent: "07. Como escolher a cor do recado?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, o recado ganha uma informação nova, a cor. Ela passa por quase todas as peças do app: o banco de dados, o formulário, o controller e, no fim, o CSS.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o mural de recados, com o formulário e os cartões amarelos do capítulo anterior.

Terminou? Abra o passo **2. Gere uma migration para a cor**

</details>

<details class="passo" markdown="1">
<summary>2. Gere uma migration para a cor</summary>

A cor é uma informação nova, então a tabela de recados, no banco de dados, precisa de uma coluna nova. Quem muda uma tabela é uma **[migration]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#migration)**, como no [capítulo 02]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}). Só que agora a tabela já existe: a migration vai **acrescentar** uma coluna a ela.

No terminal novo, digite:

```
bin/rails generate migration AddColorToMessages color:string
```

O nome `AddColorToMessages` quer dizer "acrescentar cor aos recados". E `color:string` é a coluna nova: `color` (cor), um texto curto.

**Dê um palpite:** o `generate model` do capítulo 02 criou vários arquivos. Quantos arquivos este comando vai criar?

**Confira:** o terminal mostra um arquivo só, parecido com isto:

```
invoke  active_record
create    db/migrate/20261003151612_add_color_to_messages.rb
```

Desta vez, o model já existe. Só falta mudar a tabela.

Terminou? Abra o passo **3. Revise a migration**

</details>

<details class="passo" markdown="1">
<summary>3. Revise a migration</summary>

No Explorer, abra a pasta `db/migrate` e clique no arquivo que termina em `_add_color_to_messages.rb`:

```ruby
class AddColorToMessages < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :color, :string
  end
end
```

O `add_column` (acrescentar coluna) diz: na tabela `messages`, acrescente a coluna `color`, do tipo `string`.

**Dê um palpite:** os recados que já estão no mural de recados não têm cor. Depois dessa migration, o que vai ficar na coluna `color` deles?

Ficaria vazia. Mas o nosso plano diz que os recados antigos ficam amarelos. Troque a linha do `add_column` por:

```ruby
    add_column :messages, :color, :string, default: "yellow", null: false
```

Salve o arquivo.

- `default: "yellow"` é o valor padrão: todo recado que não tiver cor fica com `yellow` (amarelo). Vale para os recados antigos e para os novos.
- `null: false` quer dizer que a coluna nunca pode ficar vazia.

Os valores da cor ficam em inglês, como os outros nomes no código: `yellow` (amarelo), `pink` (rosa), `blue` (azul) e `green` (verde). Na tela, a pessoa vai ver os nomes em português.

Terminou? Abra o passo **4. Rode a migration**

</details>

<details class="passo" markdown="1">
<summary>4. Rode a migration</summary>

No terminal novo, digite:

```
bin/rails db:migrate
```

**Confira:** o terminal mostra algo parecido com isto:

```
== 20261003151612 AddColorToMessages: migrating ======
-- add_column(:messages, :color, :string, {default: "yellow", null: false})
   -> 0.0019s
== 20261003151612 AddColorToMessages: migrated (0.0019s)
```

Agora confira os recados antigos pelo console:

```
bin/rails console
```

```ruby
Message.first.color
```

**Confira:** o console responde `"yellow"`. O recado mais antigo ganhou a cor padrão. Saia do console com `exit`.

<!-- TODO: captura do terminal depois do db:migrate e do Message.first.color -->

Terminou? Abra o passo **5. Escolha a cor no formulário**

</details>

<details class="passo" markdown="1">
<summary>5. Escolha a cor no formulário</summary>

Abra o `app/views/messages/index.html.erb`. No formulário, logo depois do bloco do recado (o `<div>` com o `text_area`), acrescente:

```erb
  <div>
    <%= form.label :color, "Cor" %>
    <%= form.select :color, [ [ "Amarelo", "yellow" ], [ "Rosa", "pink" ], [ "Azul", "blue" ], [ "Verde", "green" ] ] %>
  </div>
```

O `form.select` cria uma caixa de escolha. Cada opção tem duas partes: o texto que a pessoa vê (`"Rosa"`) e o valor que vai ser guardado (`"pink"`).

Faça o mesmo no `app/views/messages/edit.html.erb`, também logo depois do bloco do recado. Assim, dá para trocar a cor na correção.

Salve os dois arquivos.

Para a caixa de escolha ficar do mesmo tamanho dos outros campos, abra o `app/assets/stylesheets/application.css` e acrescente `select` ao bloco dos campos do formulário, que fica assim:

```css
input[type="text"],
textarea,
select {
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 12px;
}
```

Salve e recarregue a página.

**Confira:** o formulário tem um campo **Cor**, com **Amarelo** escolhido. Abra a correção de um recado: o campo também aparece lá.

<!-- TODO: captura do formulário com o campo Cor -->

Terminou? Abra o passo **6. Cadê a cor?**

</details>

<details class="passo" markdown="1">
<summary>6. Cadê a cor?</summary>

Poste um recado escolhendo a cor **Rosa**:

- **Seu nome:** Duda
- **Recado:** Obrigada, mentoras! 💜
- **Cor:** Rosa

Os cartões ainda não mostram a cor escolhida: todos continuam amarelos. Então confira pelo console, no terminal novo:

```
bin/rails console
```

```ruby
Message.last.color
```

**Dê um palpite:** o que o console vai responder?

**Confira:** ele responde `"yellow"`, e não `"pink"`! Você escolheu rosa, mas o recado foi guardado amarelo. Saia do console com `exit`.

Vamos investigar. No painel do terminal, volte para o terminal do servidor (na lista de terminais, à direita, é o primeiro). Procure as linhas do último recado postado, que começam com `Started POST "/messages"`. Logo abaixo, tem uma linha parecida com esta:

```
Parameters: {"authenticity_token" => "[FILTERED]", "message" => {"author" => "Duda", "content" => "Obrigada, mentoras! 💜", "color" => "pink"}, "commit" => "Postar recado"}
```

**Confira:** o `"color" => "pink"` está lá. A cor **chegou** no app. Então ela se perdeu no caminho, dentro do controller.

<!-- TODO: captura do terminal do servidor com a linha Parameters -->

Abra o `app/controllers/messages_controller.rb` e procure o `message_params`, lá embaixo:

```ruby
  def message_params
    params.expect(message: [ :author, :content ])
  end
```

Essa é a lista do que o controller aceita do formulário, como você viu no capítulo 04. Tudo que não estiver na lista é ignorado. E a `color` não está.

Acrescente a `:color` na lista:

```ruby
  def message_params
    params.expect(message: [ :author, :content, :color ])
  end
```

Salve o arquivo.

**Dê um palpite:** corrija o recado da Duda, escolha **Rosa** de novo e salve. E agora, o console responde o quê?

**Confira:** `Message.last.color` responde `"pink"`. 🎉

Terminou? Abra o passo **7. Uma classe para cada cor**

</details>

<details class="passo" markdown="1">
<summary>7. Uma classe para cada cor</summary>

A cor está guardada. Agora, cada cartão precisa mostrar a sua. Para o CSS saber a cor de cada cartão, o cartão ganha mais uma [classe]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/mao-na-massa.md %}), que muda conforme a cor do recado.

Abra o `app/views/messages/index.html.erb` e troque a linha do cartão:

```erb
    <div class="card">
```

por:

```erb
    <div class="card card-<%= message.color %>">
```

Salve o arquivo.

Agora cada cartão tem **duas** classes, separadas por espaço. A primeira, `card`, é igual para todos e dá a cara de post-it do capítulo anterior. A segunda muda com a cor do recado: `card-pink` para um recado rosa, `card-yellow` para um amarelo.

**Dê um palpite:** recarregue a página. O cartão da Duda ficou rosa?

**Confira:** ainda não! Todos continuam amarelos. Clique com o botão direito no cartão da Duda e escolha **Inspecionar** (*Inspect*): a classe `card card-pink` está lá. Falta o CSS dizer o que fazer com ela.

Terminou? Abra o passo **8. Pinte cada cor**

</details>

<details class="passo" markdown="1">
<summary>8. Pinte cada cor</summary>

No `application.css`, logo **depois** do bloco `.card`, acrescente:

```css
.card-yellow { background-color: #fff3a3; }
.card-pink   { background-color: #ffc8dd; }
.card-blue   { background-color: #bde0fe; }
.card-green  { background-color: #c7f0c2; }
```

Salve o arquivo.

Cada linha dá uma cor de fundo para uma classe. Como elas vêm depois do `.card`, ganham dele: o cartão continua com o espaço, os cantos e a sombra do `.card`, mas com o fundo da sua cor.

**Dê um palpite:** recarregue a página. Como ficou o cartão da Duda?

**Confira:** cada recado aparece com a sua cor: o da Duda rosa, os antigos amarelos. Se nada mudou, recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux).

Corrija outros recados e escolha cores diferentes para ver o mural de recados colorido:

![Mural de recados com fundo bege, o formulário com os campos Seu nome, Recado e Cor e quatro cartões lado a lado: rosa, azul, verde e amarelo, cada um com a mensagem, a autora em itálico, o link Editar e o botão Apagar]({{ '/assets/images/mural-de-recados/07/mural-colorido.png' | relative_url }})
{: .ilustracao }

<!-- TODO: trocar pela captura no Codespaces, com o recado da Duda em rosa -->

Terminou? Abra o passo **9. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>9. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Deixa cada recado com a sua cor` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Deixa cada recado com a sua cor` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>Aparece a página <strong>ActiveRecord::PendingMigrationError</strong></summary>

Existe uma migration que ainda não foi aplicada. Rode `bin/rails db:migrate` no terminal novo e recarregue a página.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>undefined method 'color'</code></summary>

A coluna `color` ainda não existe na tabela. Confira se você rodou o `bin/rails db:migrate` (passo 4) e se ele terminou com `migrated`.

</details>

<details class="pergunta" markdown="1">
<summary>Errei a migration e já rodei o db:migrate</summary>

Desfaça a última migration com `bin/rails db:rollback`, corrija o arquivo, salve e rode `bin/rails db:migrate` de novo. Na dúvida, peça ajuda para uma mentora. 💜

</details>

<details class="pergunta" markdown="1">
<summary>Escolho uma cor, mas o recado continua amarelo</summary>

Falta a `:color` na lista do `message_params`, no controller. Veja o passo 6.

</details>

<details class="pergunta" markdown="1">
<summary>Os cartões não mudaram de cor</summary>

Confira, nesta ordem:

1. O `application.css` está salvo?
2. Recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux): às vezes o navegador guarda o CSS antigo.
3. Na view, a classe está escrita `card card-<%= message.color %>`, com um espaço entre `card` e `card-`, e sem espaço entre `card-` e o `<%=`?
4. No CSS, cada nome de classe começa com ponto: `.card-pink`, e não `card-pink`.
5. As linhas das cores estão **depois** do bloco `.card`? Se estiverem antes, o fundo amarelo do `.card` ganha delas.

</details>

<details class="pergunta" markdown="1">
<summary>Só alguns cartões continuam amarelos</summary>

Confira no CSS o nome da cor desses cartões. Por exemplo, se o `.card-blue` estiver escrito `.card-azul`, os recados azuis continuam amarelos: o nome no CSS precisa ser igual ao valor guardado, `blue`.

</details>

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/07-como-escolher-a-cor-do-recado.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-como-escolher-a-cor-do-recado/o-que-aconteceu.md %}) e entenda cada passo.
