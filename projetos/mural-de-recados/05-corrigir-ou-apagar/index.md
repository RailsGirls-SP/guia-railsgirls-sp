---
title: "Errei! Como corrigir ou apagar?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 6
has_children: true
---

# Errei! Como corrigir ou apagar?

Tempo: uns 45 minutos.
{: .fs-5 }

## O desafio

A Bia postou o recado "Adorei o worksop!" e só depois viu o erro de digitação. A Carla postou um recado de teste e agora quer tirar do mural de recados.

Hoje, dá para postar e ver os recados, mas não dá para mudar nada depois. O desafio agora é deixar cada pessoa **corrigir** ou **apagar** um recado.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Como o app Mural de recados sabe **qual** recado você quer corrigir ou apagar? Lembre das colunas da planilha de recados, no [capítulo 02]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/index.md %}).
- Onde ficam os botões de corrigir e apagar? Desenhe no cartão.
- Para corrigir, o que aparece na tela? Um formulário vazio ou já preenchido?
- E se a pessoa clicar em apagar sem querer?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

Cada cartão ganha um link **Editar** e um botão **Apagar**:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto do cartão com os botões. -->
```
┌──────────────────────────────┐
│ Adorei o worksop!            │
│ — Bia                        │
│                              │
│ Editar   ( Apagar )          │
└──────────────────────────────┘
```

O **Editar** abre uma página só para corrigir aquele recado, com o formulário já preenchido:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto da tela de correção. -->
```
┌────────────────────────────────────────────────┐
│  Corrigir recado                               │
│                                                │
│  Seu nome:  [ Bia______________]               │
│  Recado:    [ Adorei o worksop!]               │
│             [__________________]               │
│             ( Salvar )                         │
│                                                │
│  Voltar                                        │
└────────────────────────────────────────────────┘
```

O **Apagar** pergunta antes de apagar:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto da pergunta de confirmação. -->
```
┌────────────────────────────────────┐
│  Quer mesmo apagar este recado?    │
│                                    │
│         ( Cancelar )  ( OK )       │
└────────────────────────────────────┘
```

- **Qual recado:** cada recado tem um número só dele, o `id`, que o Rails criou sozinho. É por ele que o app sabe qual recado corrigir ou apagar.
- **Corrigir** tem duas partes: abrir o formulário preenchido e, depois, salvar a correção.
- **Apagar** pede confirmação, porque um recado apagado não volta mais.
- **Quem pode:** qualquer pessoa pode corrigir ou apagar qualquer recado. Como você viu em [Planejando o app]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}), a gente aceita esse risco por enquanto.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
