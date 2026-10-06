---
title: "02. Como guardar os recados?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 3
has_children: true
---

# 02. Como guardar os recados?

Tempo: uns 30 minutos.
{: .fs-5 }

## O desafio

Imagine que a Bia posta um recado e fecha o navegador. No dia seguinte, a Ana abre o mural de recados: o recado da Bia precisa estar lá.

Mas, para isso, o recado precisa ficar guardado em algum lugar enquanto ninguém está olhando. Hoje, o app Mural de recados ainda não tem onde guardar nada.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Que informações cada recado tem? Volte ao seu plano de [Planejando o app]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}).
- Cada informação é um texto curto, um texto longo ou uma escolha entre opções?
- Se você fosse anotar vários recados numa planilha, como ela ficaria? Desenhe as colunas e preencha duas linhas de exemplo.

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

Os recados vão ficar num **[banco de dados]({{ site.baseurl }}{% link extras/glossario.md %}#banco-de-dados)**, que funciona como uma planilha bem organizada. Cada tipo de informação ganha uma **tabela**: a nossa se chama `messages`. No código, os nomes ficam em inglês, como na maioria dos projetos de programação. Cada recado é uma **linha**, e cada informação do recado é uma **coluna**:

| id | author | content | created_at |
|---|---|---|---|
| 1 | Ana | Bem-vindas ao mural de recados! | 2026-10-03 09:00 |
| 2 | Bia | Adorei o workshop | 2026-10-03 09:05 |

- **author** (autora): texto curto, o nome de quem escreveu.
- **content** (conteúdo): texto longo, a mensagem do recado.

As colunas `id` e `created_at` você não precisava ter imaginado: o Rails cria sozinho. O `id` é um número único para cada recado, e o `created_at` guarda quando ele foi criado. Assim dá para saber qual recado é qual, mesmo que duas pessoas escrevam a mesma coisa.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
