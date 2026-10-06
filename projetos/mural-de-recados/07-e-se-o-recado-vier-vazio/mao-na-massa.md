---
title: Mão na massa
parent: "07. E se alguém mandar um recado vazio?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você vai escrever as regras de um recado e fazer o app avisar a pessoa quando alguma regra não for cumprida.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta. Para os outros comandos, abra um terminal novo pelo botão **+**.

**Confira:** o navegador mostra o mural de recados, com o formulário e os cartões amarelos.

Terminou? Abra o passo **2. Veja o problema de novo**

</details>

<details class="passo" markdown="1">
<summary>2. Veja o problema de novo</summary>

Deixe os dois campos vazios e clique em **Postar recado**.

**Dê um palpite:** o que vai aparecer?

**Confira:** um cartão vazio, só com o travessão (—). O app aceitou um recado sem nome e sem mensagem.

<!-- TODO: captura do cartão vazio no mural de recados -->

Apague esse cartão pelo botão **Apagar**. Ele foi feito no capítulo 05 justamente para isso.

Terminou? Abra o passo **3. Escreva as regras do recado**

</details>

<details class="passo" markdown="1">
<summary>3. Escreva as regras do recado</summary>

As regras sobre os dados ficam no **[model]({{ site.baseurl }}{% link glossario.md %}#model)**. Abra o arquivo `app/models/message.rb`. Ele tem só duas linhas:

```ruby
class Message < ApplicationRecord
end
```

Deixe o arquivo assim:

```ruby
class Message < ApplicationRecord
  validates :author, presence: { message: "Escreva o seu nome." }
  validates :content, presence: { message: "Escreva o seu recado." }
end
```

Salve o arquivo.

- `validates` (valida) cria uma regra, que quem programa chama de **validação**.
- `:author` e `:content` são as colunas que a regra confere: a autora e a mensagem.
- `presence` (presença) quer dizer que a informação precisa estar lá. Um texto vazio, ou só com espaços, não conta.
- `message` é o aviso que a pessoa vai ver quando a regra não for cumprida.

Agora confira as regras no console. No terminal novo:

```
bin/rails console
```

Crie um recado em branco, sem guardar, e pergunte se ele é válido:

```ruby
recado = Message.new
recado.valid?
```

**Confira:** o console responde `false` (falso): o recado não cumpre as regras. Agora pergunte quais avisos ele tem:

```ruby
recado.errors[:author]
recado.errors[:content]
```

**Confira:** o console responde `["Escreva o seu nome."]` e `["Escreva o seu recado."]`.

Saia do console. Digite:

```
exit
```

Terminou? Abra o passo **4. Teste no navegador**

</details>

<details class="passo" markdown="1">
<summary>4. Teste no navegador</summary>

Volte para a aba do app, deixe os dois campos vazios e clique em **Postar recado**.

**Dê um palpite:** o cartão vazio vai aparecer?

**Confira:** não aparece. O model recusou o recado, e nada foi guardado. Mas repare: também não aparece **nenhum aviso**. A página só volta como estava, e quem tentou postar não sabe o que aconteceu.

O problema está no controller. Abra o `app/controllers/messages_controller.rb` e olhe a ação `create`:

```ruby
  def create
    Message.create(message_params)
    redirect_to root_path
  end
```

Ela tenta guardar o recado e, dando certo ou não, manda o navegador de volta para a página principal. Ninguém confere se o recado foi guardado.

Terminou? Abra o passo **5. Confira se o recado foi guardado**

</details>

<details class="passo" markdown="1">
<summary>5. Confira se o recado foi guardado</summary>

No `app/controllers/messages_controller.rb`, troque a ação `create` por:

```ruby
  def create
    @message = Message.new(message_params)

    if @message.save
      redirect_to root_path
    else
      @messages = Message.order(created_at: :desc)
      render :index, status: :unprocessable_entity
    end
  end
```

Salve o arquivo. Leia com calma, de cima para baixo:

- `Message.new(message_params)` monta o recado com o que veio do formulário, ainda sem guardar.
- `@message.save` tenta guardar. Ele responde `true` (verdadeiro) se o recado cumpre as regras e foi guardado, e `false` (falso) se não.
- `if` e `else` querem dizer "se" e "senão". **Se** guardou, volta para a página principal, como antes. **Senão**, mostra a página do mural de recados de novo, com o recado recusado no formulário.
- `render :index` mostra a view `index` sem fazer uma requisição nova. Por isso, o que a pessoa escreveu continua no formulário.
- A view `index` também precisa da lista de recados, então o `@messages` é buscado de novo, como na ação `index`.
- `status: :unprocessable_entity` avisa o navegador que o formulário foi recusado.

**Dê um palpite:** escreva só o seu nome, deixe o recado vazio e clique em **Postar recado**. O seu nome continua no formulário?

**Confira:** continua! Nenhum cartão vazio aparece, e o nome fica no campo. Mas o aviso ainda não aparece: falta a view mostrar.

Terminou? Abra o passo **6. Mostre o que falta**

</details>

<details class="passo" markdown="1">
<summary>6. Mostre o que falta</summary>

Abra o `app/views/messages/index.html.erb`. No formulário, logo abaixo da linha do `form.text_field :author`, acrescente:

```erb
        <% @message.errors[:author].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
```

E logo abaixo da linha do `form.text_area :content`, acrescente:

```erb
        <% @message.errors[:content].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
```

O formulário fica assim:

```erb
    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Seu nome", class: "label" %>
        <%= form.text_field :author, class: "input" %>
        <% @message.errors[:author].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <div class="field">
        <%= form.label :content, "Recado", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
        <% @message.errors[:content].each do |error| %>
          <p class="help is-danger"><%= error %></p>
        <% end %>
      </div>
      <%= form.submit "Postar recado", class: "button is-primary" %>
    <% end %>
```

Salve o arquivo.

- `@message.errors[:author]` é a lista de avisos da autora, a mesma que você viu no console. O `each` mostra cada aviso.
- `help is-danger` é do Bulma: um texto pequeno, em vermelho, embaixo do campo.
- Quando o formulário aparece pela primeira vez, o recado em branco ainda não foi conferido, então não tem aviso nenhum.

**Dê um palpite:** deixe os dois campos vazios e clique em **Postar recado**. O que aparece?

**Confira:** embaixo de cada campo, em vermelho, aparece o que falta:

![Mural de recados com o formulário: embaixo do campo Seu nome, em vermelho, a mensagem "Escreva o seu nome."; embaixo do campo Recado, "Escreva o seu recado."; e, mais abaixo, os cartões amarelos dos recados que já existiam]({{ '/assets/images/mural-de-recados/07/recado-recusado.png' | relative_url }})
{: .ilustracao }

<!-- TODO: trocar pela captura no Codespaces -->

Agora preencha os dois campos e poste: o recado aparece normalmente. 🎉

Terminou? Abra o passo **7. E um recado enorme?**

</details>

<details class="passo" markdown="1">
<summary>7. E um recado enorme?</summary>

Um post-it não cabe um livro. O nosso plano limita a mensagem a 280 caracteres.

No `app/models/message.rb`, acrescente mais uma regra, logo abaixo das outras:

```ruby
  validates :content, length: { maximum: 280, message: "O recado pode ter no máximo 280 caracteres." }
```

O model fica assim:

```ruby
class Message < ApplicationRecord
  validates :author, presence: { message: "Escreva o seu nome." }
  validates :content, presence: { message: "Escreva o seu recado." }
  validates :content, length: { maximum: 280, message: "O recado pode ter no máximo 280 caracteres." }
end
```

Salve o arquivo.

- `length` (comprimento) confere o tamanho do texto.
- `maximum: 280` quer dizer "no máximo 280 caracteres". Letras, espaços e emojis contam.

Digitar 281 caracteres no formulário daria trabalho. Então teste no console:

```
bin/rails console
```

```ruby
recado = Message.new(author: "Ana", content: "a" * 281)
recado.valid?
recado.errors[:content]
```

O `"a" * 281` monta um texto com a letra "a" repetida 281 vezes.

**Confira:** o `valid?` responde `false`, e o `errors[:content]` mostra `["O recado pode ter no máximo 280 caracteres."]`. Troque o `281` por `280` e teste de novo: agora o recado é válido.

Saia do console com `exit`.

Terminou? Abra o passo **8. E na correção?**

</details>

<details class="passo" markdown="1">
<summary>8. E na correção?</summary>

**Dê um palpite:** clique em **Editar** num recado, apague a mensagem e clique em **Salvar**. O que vai acontecer?

**Confira:** você volta para o mural de recados, e o recado continua com a mensagem antiga. A regra funcionou, e a mensagem vazia não foi guardada. Mas, de novo, ninguém avisou a pessoa: parece que a correção foi ignorada.

É o mesmo problema do passo 4, agora na ação `update`. No `app/controllers/messages_controller.rb`, troque a ação `update` por:

```ruby
  def update
    @message = Message.find(params[:id])

    if @message.update(message_params)
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end
```

O `@message.update` também responde `true` ou `false`, como o `save`. Se der errado, a página de correção aparece de novo, com o que a pessoa escreveu.

Agora abra o `app/views/messages/edit.html.erb` e acrescente os avisos nos mesmos lugares do passo 6: o bloco do `@message.errors[:author]` logo abaixo do `form.text_field :author`, e o do `@message.errors[:content]` logo abaixo do `form.text_area :content`.

Salve os dois arquivos.

**Confira:** abra a correção de um recado, apague a mensagem e clique em **Salvar**. Aparece o aviso **Escreva o seu recado.** embaixo do campo, e o recado não muda até você escrever alguma coisa.

Terminou? Abra o passo **9. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>9. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Não aceita recado vazio` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Não aceita recado vazio` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>A página continua aceitando o recado vazio</summary>

Confira se o `app/models/message.rb` está salvo e se cada `validates` está **dentro** da `class`, antes do `end`. Confira também se os nomes das colunas estão certos: `:author` e `:content`.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece <code>undefined method 'empty?' for nil</code></summary>

A view do mural de recados precisa da lista de recados. Confira se a ação `create` tem a linha `@messages = Message.order(created_at: :desc)` dentro do `else`, antes do `render`.

</details>

<details class="pergunta" markdown="1">
<summary>Cliquei em Postar recado e nada aconteceu, nem o aviso</summary>

Confira se o `render :index` tem o `status: :unprocessable_entity` no fim. Sem ele, o navegador não mostra a página com o aviso. Depois, confira se a view tem os blocos do `@message.errors` do passo 6.

</details>

<details class="pergunta" markdown="1">
<summary>O aviso aparece em inglês, como <code>can't be blank</code></summary>

Falta o `message:` na regra, no model. Confira se cada `validates` está igual ao do passo 3, com o aviso entre aspas.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece um erro de sintaxe depois de mudar o controller</summary>

Confira se cada `if` tem o seu `end`, e se cada `def` também. Na ação `create`, são dois `end` no fim: um do `if` e um do `def`. Compare com o código do passo 5. Na dúvida, peça ajuda para alguém da mentoria. 💜

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/07-e-se-o-recado-vier-vazio.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/o-que-aconteceu.md %}) e entenda cada passo.
