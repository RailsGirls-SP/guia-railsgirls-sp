---
title: Mão na massa
parent: "06. Como deixar o mural de recados mais bonito?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: decidir se a parte visual usa Bulma via CDN (como previa o brief) ou CSS escrito à mão, como está agora. -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você só mexe na aparência: a view e um arquivo de estilo. Nenhum recado guardado muda.

<details class="passo" markdown="1" open>
<summary>1. Ligue o servidor</summary>

Abra o seu codespace e ligue o servidor, se ele ainda não estiver ligado:

```
bin/rails server
```

Abra o app no navegador (pelo aviso **Open in Browser** ou pela aba **Ports**) e deixe essa aba aberta.

**Confira:** o navegador mostra o mural de recados, com o formulário e os recados com **Editar** e **Apagar**. Se ainda não tiver uns três recados, poste alguns pelo formulário: assim dá para ver os cartões lado a lado.

Terminou? Abra o passo **2. Dê um nome para cada parte do cartão**

</details>

<details class="passo" markdown="1">
<summary>2. Dê um nome para cada parte do cartão</summary>

Quem cuida da aparência de uma página é o **[CSS]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#css)**. Mas, para o CSS saber o que enfeitar, cada parte da página precisa de um nome. Esse nome se chama **classe** (em inglês, *class*).

Abra o `app/views/messages/index.html.erb`. Troque toda a parte dos recados, do `<% @messages.each` até o último `<% end %>`, por:

```erb
<div class="mural">
  <% @messages.each do |message| %>
    <div class="card">
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
- `class="card"`: cada cartão (*card*, em inglês), um para cada recado.
- `class="author"`: a autora.
- `class="actions"`: as ações do cartão, **Editar** e **Apagar**.

O que está dentro do cartão é o mesmo de antes. Só ganhou nomes e uma `<div>` em volta das ações.

**Dê um palpite:** recarregue a página. O que mudou?

**Confira:** nada! As classes são só nomes. Quem diz o que fazer com eles é o CSS, no próximo passo.

Se quiser ver as classes, clique com o botão direito num recado e escolha **Inspecionar** (*Inspect*): aparece o HTML da página, com o `class="card"` de cada recado.

Terminou? Abra o passo **3. Pinte os cartões**

</details>

<details class="passo" markdown="1">
<summary>3. Pinte os cartões</summary>

No Explorer, abra o arquivo `app/assets/stylesheets/application.css`. Ele só tem um comentário, entre `/*` e `*/`. Logo depois do comentário, acrescente:

```css
.card {
  padding: 16px;
  border-radius: 4px;
  background-color: #fff3a3;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
}

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

- `.card`: todo cartão ganha um espaço por dentro (`padding`), cantos arredondados (`border-radius`), um fundo amarelo (`background-color`) e uma sombra (`box-shadow`), como um papel colado na parede. O `#fff3a3` é um jeito de escrever uma cor com números e letras: esse é um amarelo clarinho.
- `.author`: a autora aparece em itálico (`font-style: italic`).
- `.actions`: o **Editar** e o **Apagar** ficam lado a lado (`display: flex`), com um espaço entre eles (`gap`).

**Dê um palpite:** recarregue a página. Como ficaram os recados?

**Confira:** cada recado aparece num cartão amarelo, com sombra. Se nada mudou, recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux).

<!-- TODO: captura dos cartões amarelos, um embaixo do outro -->

Terminou? Abra o passo **4. Organize o mural de recados**

</details>

<details class="passo" markdown="1">
<summary>4. Organize o mural de recados</summary>

Os cartões estão prontos, mas ainda um embaixo do outro, ocupando a largura toda. No mesmo `application.css`, acrescente no fim:

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

Terminou? Abra o passo **5. Arrume o resto da página**

</details>

<details class="passo" markdown="1">
<summary>5. Arrume o resto da página</summary>

Para terminar, deixe o resto da página combinando com os cartões. No **começo** do `application.css`, logo depois do comentário e antes do `.card`, acrescente:

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
textarea {
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 12px;
}
```

Salve e recarregue a página.

- `body` é a página inteira: ela ganha outra letra (`font-family`), um fundo cor de papel e uma largura máxima, centralizada (`margin: 0 auto`).
- `label` são os rótulos do formulário (**Seu nome** e **Recado**): cada um fica em cima do seu campo, em negrito.
- `input[type="text"], textarea` são os campos do formulário: eles ficam do mesmo tamanho, com espaço entre eles.

Abra também a página de correção de um recado (o link **Editar**): ela usa o mesmo arquivo de estilo, então já aparece com o fundo e o formulário arrumados.

**Confira:** a página fica parecida com esta:

![Mural de recados com fundo bege, o formulário com os campos Seu nome e Recado e quatro cartões amarelos lado a lado, cada um com a mensagem, a autora em itálico, o link Editar e o botão Apagar]({{ '/assets/images/mural-de-recados/06/mural-post-it.png' | relative_url }})
{: .ilustracao }

<!-- TODO: trocar pela captura no Codespaces -->

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
<summary>Os cartões não mudaram</summary>

Confira, nesta ordem:

1. O `application.css` está salvo?
2. Recarregue com **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows e Linux): às vezes o navegador guarda o CSS antigo.
3. Na view, os recados estão dentro de `<div class="card">`, com aspas?
4. No CSS, cada nome de classe começa com ponto: `.card`, e não `card`.

</details>

<details class="pergunta" markdown="1">
<summary>Só uma parte do CSS funcionou</summary>

Provavelmente falta fechar uma chave. Cada bloco do CSS abre com `{` e fecha com `}`. Se um `}` estiver faltando, os blocos que vêm depois param de funcionar. Confira bloco por bloco.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece um erro na página depois de mudar a view, ou a página ficou bagunçada</summary>

Confira se o `<% end %>` do `each` continua lá, antes do último `</div>`: sem ele, aparece um erro. Confira também se cada `<div>` tem o seu `</div>`: um `</div>` faltando não dá erro, mas bagunça a página. Compare com o código do passo 2.

</details>

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/o-que-aconteceu.md %}) e entenda cada passo.
