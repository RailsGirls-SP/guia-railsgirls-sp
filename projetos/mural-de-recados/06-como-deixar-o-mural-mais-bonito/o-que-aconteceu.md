---
title: "O que aconteceu?"
parent: "Como deixar o mural de recados mais bonito?"
grand_parent: Mural de recados
nav_order: 2
---

# O que aconteceu?

<details class="passo" markdown="1" open>
<summary>Por dentro do app</summary>

A cor passou por quase todas as peças do app. Siga o caminho dela:

1. A **migration** acrescentou a coluna `color` à tabela de recados, com `yellow` como valor padrão.
2. O **formulário**, na view, ganhou a caixa de escolha da cor.
3. O **controller** passou a aceitar a `color` no `message_params`.
4. O **model** guardou a cor no banco de dados, junto com a autora e a mensagem.
5. A **view** usou a cor para dar uma classe a cada cartão, e o **CSS** pintou o cartão.

Você está aqui: este é o caminho que uma requisição percorre dentro do app.

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador

  classDef aqui fill:#73121b,stroke:#73121b,color:#fff
  class Controller,Banco,View aqui
```

**Uma migration nova, e não a antiga editada.** A migration do capítulo 02 já foi aplicada: a tabela já existe. Para mudar a tabela, a gente cria outra migration, que diz só o que mudou. As migrations ficam guardadas em ordem, como um histórico de tudo que aconteceu com o banco de dados.

**A lista do que entra.** O `message_params` é uma lista de permissão: o controller só deixa passar para o model as informações que estão nela. A cor chegou no app, mas foi ignorada até entrar na lista. Parece trabalho a mais, mas é uma proteção: se um dia o recado tiver uma coluna que ninguém deveria mudar pelo formulário, como o número de curtidas, alguém mal-intencionado não consegue mudar essa coluna mandando um formulário modificado.

**HTML diz o que é; CSS diz como aparece.** A view montou a página em [HTML]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#html), com as classes dizendo o que é cada parte: o mural de recados, o cartão, a autora. O [CSS]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#css) usou essas classes para dizer como cada parte aparece. Por isso, no passo 7, nada mudou na tela: os nomes estavam lá, mas ninguém tinha dito o que fazer com eles.

**A separação valeu a pena.** No [capítulo 03]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/o-que-aconteceu.md %}), você viu que a view e o model ficam separados. Neste capítulo, você trocou toda a aparência dos cartões sem mexer em nenhum recado guardado: só a view e o CSS mudaram.

</details>

<details class="passo" markdown="1">
<summary>Não existem perguntas bobas</summary>

<details class="pergunta" markdown="1">
<summary>Por que guardar "pink" e não "Rosa"?</summary>

O valor guardado é usado pelo código: ele vira o nome da classe, `card-pink`. Nomes de código ficam em inglês, sem acento e sem espaço. O texto que a pessoa vê, **Rosa**, fica só na tela. Se um dia o app for traduzido, o texto muda e o valor guardado continua o mesmo.

</details>

<details class="pergunta" markdown="1">
<summary>Por que não editar a migration do capítulo 02?</summary>

Porque ela já foi aplicada: o Rails anota quais migrations já rodou e não roda de novo. Editar uma migration antiga não muda a tabela. Além disso, se outra pessoa já tivesse baixado o código, o banco de dados dela e o seu ficariam diferentes.

</details>

<details class="pergunta" markdown="1">
<summary>O que é o #fff3a3?</summary>

É um jeito de escrever cores no CSS, chamado **hexadecimal**. Os seis caracteres dizem quanto de vermelho, verde e azul a cor tem, de `00` (nada) a `ff` (o máximo). `#ffffff` é branco, `#000000` é preto. Ninguém decora: quem programa escolhe a cor num seletor de cores e copia o código.

</details>

<details class="pergunta" markdown="1">
<summary>Por que um cartão tem duas classes?</summary>

Cada classe cuida de uma coisa. A `card` dá o que todo cartão tem igual: o espaço por dentro, os cantos e a sombra. A `card-pink` dá só a cor. Assim, o jeito de um cartão é escrito uma vez só, e cada cor é uma linha.

</details>

<details class="pergunta" markdown="1">
<summary>E se alguém mandar uma cor que não está na lista?</summary>

Hoje, o app guardaria, e o cartão ficaria sem cor, porque não existe CSS para ela. A caixa de escolha só mostra as quatro cores, mas alguém poderia mandar um formulário modificado. Recusar valores que não fazem sentido é o assunto do [próximo capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}).

</details>

</details>

<details class="passo" markdown="1">
<summary>Quebre de propósito</summary>

No `application.css`, troque `.card-pink` por `.card-rosa`. Salve e recarregue a página.

**Dê um palpite:** o que acontece com o cartão da Duda?

Ele fica sem cor: continua com o espaço, os cantos e a sombra do `.card`, mas o fundo some. Nenhum erro aparece. O CSS procura uma parte com a classe `card-rosa`, e nenhuma tem esse nome: o cartão da Duda tem a classe `card-pink`.

Repare: um erro de CSS não mostra mensagem nenhuma, ele só faz a página ficar diferente do esperado. Para descobrir, você compara o nome na view com o nome no CSS. Clicar com o botão direito e escolher **Inspecionar** ajuda.

Volte para `.card-pink`, salve e recarregue: o cartão fica rosa de novo.

</details>

<details class="passo" markdown="1">
<summary>Preciso de IA para este capítulo?</summary>

Para a cor, não: a migration, o formulário e o `message_params` seguem o que você já fez nos capítulos anteriores.

Para o CSS, uma IA pode ajudar bastante: existem muitas propriedades, e é fácil esquecer o nome de cada uma. Mas, de novo, o pedido funciona melhor com o seu plano:

> No meu app Rails, cada recado aparece numa `div` com as classes `card` e `card-yellow`, `card-pink`, `card-blue` ou `card-green`. Escreva CSS puro, sem nenhuma biblioteca, para os cartões parecerem post-its, lado a lado em grade, com um por linha no celular. O texto precisa ficar fácil de ler em todas as cores.

Confira o resultado:

- Ele usa as **suas** classes, ou inventou outras? Se inventou, você vai ter que mudar a view também.
- É CSS puro, ou ele sugeriu instalar alguma coisa, como Bootstrap ou Tailwind? Isso pode ficar para depois.
- Diminua a janela: os cartões descem para a linha de baixo?
- O texto fica fácil de ler em todas as cores?

</details>

<details class="passo" markdown="1">
<summary>Não esqueça</summary>

- Para mudar uma tabela que já existe, crie uma migration nova, como a `add_column`. Não edite as antigas.
- O `default` dá um valor para os recados antigos e para os novos que não disserem nada.
- O `message_params` é a lista do que o controller aceita do formulário: uma coluna nova precisa entrar nela.
- A view diz o que é cada parte, com classes; o CSS diz como cada parte aparece.
- Um erro de CSS não mostra mensagem: compare os nomes na view e no CSS.

</details>

<details class="passo" markdown="1">
<summary>Quiz</summary>

1. Você escolheu **Verde** no formulário, mas o recado foi guardado com `yellow`. Qual é o primeiro lugar para olhar?
2. Na view, um cartão tem `class="card card-blue"`. Quais blocos do CSS valem para ele?
3. Por que os recados que já existiam ficaram amarelos?

<details markdown="1">
<summary>Ver respostas</summary>

1. O `message_params`, no controller: confira se a `:color` está na lista.
2. O `.card` e o `.card-blue`.
3. Por causa do `default: "yellow"` na migration: quem não tinha cor ganhou o valor padrão.

</details>

</details>

<details class="passo" markdown="1">
<summary>Para saber mais</summary>

Em inglês:

- [Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html): tudo sobre migrations, incluindo como mudar tabelas que já existem.
- [Strong Parameters](https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters): a lista do que o controller aceita.
- [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout), na MDN: como funciona a grade.

</details>

## E agora?

O mural de recados está bonito, mas ainda aceita qualquer coisa: até um recado sem mensagem. Próximo desafio: [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %})
