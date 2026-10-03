---
title: Mão na massa
parent: "Como deixar o mural de recados mais bonito?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: este capítulo supõe o código do fim do capítulo 05 e o formulário do capítulo 04 (form_with model: @message, rótulos "Seu nome" e "Recado", message_params com params.expect(message: [ :author, :content ])). Conferir quando o capítulo 04 estiver escrito. -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Este capítulo tem duas partes. Primeiro, o recado ganha uma informação nova, a cor. Depois, os cartões ganham cara de post-it.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o mural de recados, com o formulário e os cartões com **Editar** e **Apagar**.

Terminou? Abra o passo **2. Gere uma migration para a cor**

</details>

<details class="passo" markdown="1">
<summary>2. Gere uma migration para a cor</summary>

A cor é uma informação nova, então a planilha de recados precisa de uma coluna nova. Quem muda a planilha é uma **[migration]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#migration)**, como no [capítulo 02]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}). Só que agora a tabela já existe: a migration vai **acrescentar** uma coluna a ela.

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

Salve os dois arquivos e recarregue a página.

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

Os cartões ainda não mostram cor nenhuma. Então confira pelo console, no terminal novo:

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

Terminou? Abra o passo **7. Dê um nome para cada parte do cartão**

</details>

<details class="passo" markdown="1">
<summary>7. Dê um nome para cada parte do cartão</summary>

A cor está guardada. Agora vamos à aparência. Quem cuida da aparência de uma página é o **[CSS]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#css)**. Mas, para o CSS saber o que pintar, cada parte da página precisa de um nome. Esse nome se chama **classe** (em inglês, *class*).

Abra o `app/views/messages/index.html.erb`. Troque toda a parte dos cartões, do `<% @messages.each` até o último `<% end %>`, por:

```erb
<div class="mural">
  <% @messages.each do |message| %>
    <div class="card card-<%= message.color %>">
      <p><%= message.content %></p>
      <p class="author">— <%= message.author %></p>
      <div class="actions">
        <%= link_to "Editar", edit_message_path(message) %>
        <%= button_to "Apagar", message, method: :delete, form: { data: { turbo_confirm: "Quer mesmo apagar este recado?" } } %>
      </div>
    </div>
  <% end %>
</div>
```

Salve o arquivo.

- `class="mural"`: o lugar onde ficam todos os cartões.
- `class="card card-<%= message.color %>"`: cada cartão (*card*, em inglês) ganha **duas** classes, separadas por espaço. A primeira é `card`, igual para todos. A segunda muda com a cor do recado: `card-pink` para um recado rosa, `card-yellow` para um amarelo.
- `class="author"`: a autora.
- `class="actions"`: as ações do cartão, **Editar** e **Apagar**.

**Dê um palpite:** recarregue a página. O que mudou?

**Confira:** nada! As classes são só nomes. Quem diz o que fazer com eles é o CSS, no próximo passo.

Se quiser ver as classes, clique com o botão direito num cartão e escolha **Inspecionar** (*Inspect*): aparece o HTML da página, com o `card card-pink` do recado da Duda.

Terminou? Abra o passo **8. Pinte os cartões**

</details>

<details class="passo" markdown="1">
<summary>8. Pinte os cartões</summary>

No Explorer, abra o arquivo `app/assets/stylesheets/application.css`. Ele só tem um comentário, entre `/*` e `*/`. Logo depois do comentário, acrescente:

```css
.card {
  padding: 16px;
  border-radius: 4px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
}

.card-yellow { background-color: #fff3a3; }
.card-pink   { background-color: #ffc8dd; }
.card-blue   { background-color: #bde0fe; }
.card-green  { background-color: #c7f0c2; }

.author {
  font-style: italic;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
```

Salve o arquivo.

Cada bloco começa com um nome de classe, com um ponto na frente (`.card`), e diz, entre chaves, como as partes com essa classe devem aparecer:

- `.card`: todo cartão ganha um espaço por dentro (`padding`), cantos arredondados (`border-radius`) e uma sombra (`box-shadow`), como um papel colado na parede.
- `.card-yellow`, `.card-pink`…: cada cor ganha a sua cor de fundo (`background-color`). O `#fff3a3` é um jeito de escrever uma cor com números e letras: esse é um amarelo clarinho.
- `.author`: a autora aparece em itálico (`font-style: italic`).
- `.actions`: o **Editar** e o **Apagar** ficam lado a lado (`display: flex`), com um espaço entre eles (`gap`).

**Dê um palpite:** recarregue a página. Como ficou o cartão da Duda?

**Confira:** cada recado aparece num cartão com a sua cor: o da Duda rosa, os antigos amarelos. Se nada mudou, recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux).

<!-- TODO: captura dos cartões coloridos, um embaixo do outro -->

Terminou? Abra o passo **9. Organize o mural de recados**

</details>

<details class="passo" markdown="1">
<summary>9. Organize o mural de recados</summary>

Os cartões estão coloridos, mas ainda um embaixo do outro, ocupando a largura toda. No mesmo `application.css`, acrescente no fim:

```css
.mural {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 32px;
}
```

Salve e recarregue a página.

- `display: grid` organiza os cartões em grade, como uma tabela.
- `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` quer dizer: "coloque quantos cartões couberem em cada linha, cada um com pelo menos 200 pixels de largura".
- `gap` é o espaço entre os cartões, e `margin-top`, o espaço entre o formulário e o mural de recados.

**Dê um palpite:** se a janela do navegador ficar mais estreita, o que acontece com os cartões?

**Confira:** os cartões ficam lado a lado. Diminua a largura da janela: eles vão descendo para a linha de baixo, até ficar um por linha, como numa tela de celular.

Para terminar, deixe o resto da página combinando. No **começo** do `application.css`, logo depois do comentário e antes do `.card`, acrescente:

```css
body {
  font-family: sans-serif;
  background-color: #f4ede4;
  color: #333333;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

label {
  display: block;
  font-weight: bold;
}

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

- `body` é a página inteira: ela ganha outra letra (`font-family`), um fundo cor de papel e uma largura máxima, centralizada (`margin: 0 auto`).
- `label` são os rótulos do formulário (**Seu nome**, **Recado**, **Cor**): cada um fica em cima do seu campo, em negrito.
- `input[type="text"], textarea, select` são os campos do formulário: eles ficam do mesmo tamanho, com espaço entre eles.

**Confira:** a página fica parecida com esta:

![Mural de recados com fundo bege, o formulário com os campos Seu nome, Recado e Cor, e quatro cartões lado a lado: rosa, azul, verde e amarelo, cada um com a mensagem, a autora em itálico, o link Editar e o botão Apagar]({{ '/assets/images/mural-de-recados/06/mural-colorido.png' | relative_url }})
{: .ilustracao }

<!-- TODO: trocar pela captura no Codespaces, com o recado da Duda em rosa -->

Terminou? Abra o passo **10. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>10. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Deixa os cartões coloridos` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Deixa os cartões coloridos` aparece com a etiqueta **main** e o ícone de nuvem.

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

</details>

<details class="pergunta" markdown="1">
<summary>Só alguns cartões ficaram sem cor</summary>

Confira no CSS o nome da cor desses cartões. Por exemplo, se o `.card-blue` estiver escrito `.card-azul`, os recados azuis ficam sem cor: o nome no CSS precisa ser igual ao valor guardado, `blue`.

</details>

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/o-que-aconteceu.md %}) e entenda cada passo.
