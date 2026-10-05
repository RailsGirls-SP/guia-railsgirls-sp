---
title: "06. Como deixar o mural de recados mais bonito?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 7
---

# 06. Como deixar o mural de recados mais bonito?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/index.md %}) · Código de referência: tag `passo-06`.

## Perguntas para o "Pense antes"

- "Como é um post-it de verdade? O que faz ele parecer um papel colado na parede?" Leva à cor de fundo e à sombra.
- "Num celular, os cartões cabem lado a lado?" Leva à grade que se ajusta à largura da tela.
- "O que muda nos dados para os recados ficarem bonitos?" Nada: é o ponto do capítulo, só a aparência muda.

## Confusões comuns

- **O ponto no CSS.** No CSS, a classe começa com ponto (`.card`); na view, não (`class="card"`).
- **O navegador guarda o CSS antigo.** Recarregar com Cmd+Shift+R (Mac) ou Ctrl+Shift+R resolve.
- **Chave sem fechar.** Um `}` faltando faz os blocos seguintes pararem de funcionar, sem erro nenhum.
- **Apagar o `<% end %>` sem querer** ao trocar a parte dos recados na view. Aí aparece um erro de sintaxe na página.
- **Inspecionar.** Vale mostrar o **Inspecionar** do navegador: ela vê as classes de cada cartão e pode mudar o CSS ao vivo para testar, sem medo de quebrar o arquivo.

## Bulma ou CSS à mão

O brief original previa o visual com Bulma via CDN. Hoje o capítulo usa CSS escrito à mão, para a participante ver que uma classe é só um nome e que o CSS dá a aparência. Essa decisão ainda está em aberto.

## Ir além com o CSS

Se sobrar tempo, sugestões para ela brincar sozinha no `application.css`:

- Girar os cartões um pouquinho, como post-its: já está no "Para ir além" do capítulo.
- Trocar a fonte por uma do [Google Fonts](https://fonts.google.com/).
