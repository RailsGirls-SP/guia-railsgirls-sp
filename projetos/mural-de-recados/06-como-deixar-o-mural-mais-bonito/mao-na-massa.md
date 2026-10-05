---
title: Mão na massa
parent: "06. Como deixar o mural de recados mais bonito?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você só mexe na aparência. Nenhum recado guardado muda.

{: .pensando-title }
> Por que usar uma biblioteca pronta?
>
> Para deixar a página bonita, a gente vai usar o **Bulma**, um conjunto de estilos prontos. Em vez de escrever o visual do zero, você só dá nomes (classes) às partes da página, como `button` ou `card`, e o Bulma cuida da aparência. Assim, com poucas mudanças, o mural de recados fica com cara de site pronto. Não precisa decorar nenhum desses nomes: quem programa consulta a documentação sempre que precisa.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta.

**Confira:** o navegador mostra o mural de recados, com o formulário e os recados com **Editar** e **Apagar**. Se ainda não tiver uns três recados, poste alguns pelo formulário: assim dá para ver os cartões lado a lado.

Terminou? Abra o passo **2. Traga o Bulma para o app**

</details>

<details class="passo" markdown="1">
<summary>2. Traga o Bulma para o app</summary>

Toda página do app passa por um arquivo que funciona como uma moldura: o **layout**. É nele que a gente avisa o navegador para usar o Bulma.

No Explorer, abra o arquivo `app/views/layouts/application.html.erb`. Faça duas mudanças:

**1.** Na segunda linha, troque `<html>` por:

```erb
<html data-theme="light">
```

**2.** Procure a linha que começa com `<%# Includes all stylesheet files`. Logo **antes** dela, acrescente:

```erb
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
```

Salve o arquivo.

- A linha do `<link>` diz ao navegador para buscar os estilos do Bulma na internet.
- O `data-theme="light"` deixa o app sempre claro. Sem ele, quem usa o computador no modo escuro veria o mural de recados escuro.

**Dê um palpite:** recarregue a página. Vai mudar alguma coisa?

**Confira:** muda um pouco: a letra da página fica diferente, e o título fica do tamanho do resto do texto. O Bulma já está funcionando, mas ainda não sabe o que é cada parte da página. É isso que você vai dizer a ele nos próximos passos.

Terminou? Abra o passo **3. Arrume o formulário**

</details>

<details class="passo" markdown="1">
<summary>3. Arrume o formulário</summary>

Abra o `app/views/messages/index.html.erb`. Troque o começo do arquivo, do `<h1>` até o `<% end %>` do formulário, por:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Mural de recados</h1>

    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Seu nome", class: "label" %>
        <%= form.text_field :author, class: "input" %>
      </div>
      <div class="field">
        <%= form.label :content, "Recado", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
      </div>
      <%= form.submit "Postar recado", class: "button is-primary" %>
    <% end %>
```

Salve o arquivo. Ainda não recarregue: a `<section>` e a `<div>` que você abriu aqui só fecham no próximo passo.

O formulário é o mesmo de antes. A diferença é o `class:`, que dá um nome do Bulma para cada parte:

- `section` e `container` deixam um espaço em volta e centralizam a página.
- `title` é o título em destaque.
- `box` é a caixa branca em volta do formulário.
- `field`, `label`, `input` e `textarea` arrumam cada campo e o seu rótulo.
- `button is-primary` é o botão principal, colorido.

Terminou? Abra o passo **4. Transforme os recados em cartões**

</details>

<details class="passo" markdown="1">
<summary>4. Transforme os recados em cartões</summary>

No mesmo arquivo, troque todo o resto, do `<% if @messages.empty? %>` até o fim, por:

```erb
    <% if @messages.empty? %>
      <p>Ainda não tem nenhum recado. Que tal postar o primeiro?</p>
    <% end %>

    <div class="columns is-multiline">
      <% @messages.each do |message| %>
        <div class="column is-one-quarter">
          <div class="card has-background-warning-light">
            <div class="card-content">
              <p><%= message.content %></p>
              <p class="is-italic">— <%= message.author %></p>
              <div class="buttons mt-4">
                <%= link_to "Editar", edit_message_path(message), class: "button is-small" %>
                <%= button_to "Apagar", message, method: :delete, class: "button is-small is-danger", form: { data: { turbo_confirm: "Quer mesmo apagar este recado?" } } %>
              </div>
            </div>
          </div>
        </div>
      <% end %>
    </div>
  </div>
</section>
```

Salve o arquivo.

- `columns is-multiline` e `column is-one-quarter` montam a grade: quatro recados por linha, que descem para a linha de baixo quando não cabem mais.
- `card` e `card-content` fazem o cartão, e `has-background-warning-light` pinta o fundo de amarelo clarinho, como um post-it.
- `is-italic` deixa a autora em itálico.
- `buttons`, `button is-small` e `is-danger` transformam o **Editar** e o **Apagar** em botões pequenos, o **Apagar** em vermelho. O `mt-4` dá um espaço em cima deles.
- As duas últimas linhas, `</div>` e `</section>`, fecham o que você abriu no passo 3.

**Dê um palpite:** recarregue a página. Como ficou o mural de recados?

**Confira:** a página fica parecida com esta:

![Mural de recados com o título em destaque, o formulário numa caixa branca com os campos Seu nome e Recado e o botão verde Postar recado e, embaixo, quatro cartões amarelos lado a lado, cada um com a mensagem, a autora em itálico e os botões Editar e Apagar]({{ '/assets/images/mural-de-recados/06/mural-post-it.png' | relative_url }})
{: .ilustracao }

<!-- TODO: trocar pela captura no Codespaces -->

Diminua a largura da janela do navegador: os cartões vão para baixo, um por linha, como numa tela de celular.

Terminou? Abra o passo **5. Arrume a página de correção**

</details>

<details class="passo" markdown="1">
<summary>5. Arrume a página de correção</summary>

A página de correção também usa o layout, então já tem o Bulma. Só falta dar os nomes às partes dela.

Abra o `app/views/messages/edit.html.erb` e troque tudo por:

```erb
<section class="section">
  <div class="container">
    <h1 class="title">Corrigir recado</h1>

    <%= form_with model: @message, class: "box" do |form| %>
      <div class="field">
        <%= form.label :author, "Seu nome", class: "label" %>
        <%= form.text_field :author, class: "input" %>
      </div>
      <div class="field">
        <%= form.label :content, "Recado", class: "label" %>
        <%= form.text_area :content, class: "textarea" %>
      </div>
      <%= form.submit "Salvar", class: "button is-primary" %>
    <% end %>

    <%= link_to "Voltar", root_path %>
  </div>
</section>
```

Salve o arquivo e clique em **Editar** num recado.

**Confira:** a página de correção fica com o mesmo jeito do mural de recados: o título em destaque, o formulário numa caixa branca e o botão colorido.

Terminou? Abra o passo **6. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>6. Guarde o seu progresso</summary>

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Deixa os recados com cara de post-it` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Deixa os recados com cara de post-it` aparece com a etiqueta **main** e o ícone de nuvem.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>A página não mudou nada</summary>

Confira, nesta ordem:

1. O `application.html.erb` e o `index.html.erb` estão salvos?
2. A linha do `<link>` do Bulma está igual à do passo 2, dentro do `<head>`?
3. Recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux): às vezes o navegador guarda a página antiga.
4. O Bulma vem da internet: confira se a sua conexão está funcionando.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece um erro na página depois de mudar a view</summary>

Confira se o `<% end %>` do `each` e o `<% end %>` do formulário continuam lá, e se não sobrou nenhum pedaço do código antigo. Compare o arquivo inteiro com o código dos passos 3 e 4. Na dúvida, peça ajuda para alguém da mentoria. 💜

</details>

<details class="pergunta" markdown="1">
<summary>A página ficou bagunçada, com partes fora do lugar</summary>

Provavelmente falta fechar alguma `<div>`. Cada `<div>` precisa do seu `</div>`, e a `<section>`, do seu `</section>`. Uma `</div>` faltando não dá erro, mas bagunça a página. Compare com o código dos passos 3 e 4.

</details>

<details class="pergunta" markdown="1">
<summary>O mural de recados ficou escuro</summary>

Falta o `data-theme="light"` na linha do `<html>`, no `app/views/layouts/application.html.erb` (passo 2). Sem ele, o Bulma segue o modo escuro do seu computador.

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/o-que-aconteceu.md %}) e entenda cada passo.
