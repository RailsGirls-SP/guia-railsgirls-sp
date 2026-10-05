---
title: Mão na massa
parent: "04. Como postar um recado?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

TODO: escrever rotas, controller e views à mão, sem scaffold (decidido).

TODO: o capítulo 03 usa a rota simples `get "messages", to: "messages#index"`. Quando aparecerem as rotas para postar (e, no capítulo 05, corrigir e apagar), apresentar o `resources :messages` como o atalho que cria todas essas rotas de uma vez, trocando as linhas soltas por ele.

<!-- TODO: trecho da Imersão 2025 para aproveitar no passo do primeiro formulário:

## Passo 8: Criando seu primeiro formulário

Não vamos dar o spoiler aqui 🙂

Mas não esqueçam de adicionar essa configuração em `config/environments/development.rb` :

```ruby
config.hosts << /.*\.app\.github\.dev/
config.action_controller.forgery_protection_origin_check = false
```

Observação: o template codespaces-rails já libera o endereço do Codespaces pela variável RAILS_DEVELOPMENT_HOSTS, então a linha do config.hosts talvez não seja necessária. Ver também as notas para mentoras deste capítulo (Erro ao enviar o formulário no Codespaces). -->

TODO: o capítulo 03 termina com o mural de recados vazio (o passo 8 apaga os recados com Message.destroy_all para mostrar o convite). O primeiro recado deste capítulo é postado pelo formulário.

TODO: em cada passo, um "Dê um palpite" antes de rodar e um "Confira" logo depois.

TODO: cada passo num bloco que abre ao clicar (`<details class="passo" markdown="1">`), como em Por onde começar?. O passo 1 começa aberto, e cada passo termina com "Terminou? Abra o passo …".

TODO: último passo: guardar o progresso com um commit e o Sync Changes.

## Travou?

TODO: os 2–3 erros mais prováveis deste passo e como resolver.

Mentoras: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/o-que-aconteceu.md %}) e entenda cada passo.
