# Tradução do guia para o inglês

O guia em inglês fica em `en/` e é publicado em guide.railsgirls.com.br pelo `bin/build-en`.

Cada página em inglês aponta para o original em português:

```yaml
translation_of: projetos/mural-de-recados/index.md   # arquivo em português
translated_from: a1f4c0b                              # commit do português usado na tradução
```

Ao mudar uma página em português, atualize a tradução e o `translated_from`.

## Arquivos

| Português | Inglês (`en/`) |
|---|---|
| `index.md` | `index.md` |
| `por-que-aprender-a-programar.md` | `why-learn-to-program.md` |
| `glossario.md` | `glossary.md` |
| `comece-aqui/` | `start-here/` |
| `comece-aqui/instalacao.md` | `start-here/setup.md` |
| `comece-aqui/conta-no-github.md` | `start-here/github-account.md` |
| `comece-aqui/ruby-rails-e-git.md` | `start-here/ruby-rails-and-git.md` |
| `comece-aqui/ia-como-tutora.md` | `start-here/ai-as-a-tutor.md` |
| `comece-aqui/termos-em-ingles.md` | `start-here/technical-terms.md` |
| `modo-workshop/` | `workshop-mode/` |
| `projetos/` | `projects/` |
| `projetos/mural-de-recados/` | `projects/message-board/` |
| `00-planejando-o-mural.md` | `00-planning-the-app.md` |
| `01-por-onde-comecar/` | `01-where-to-start/` |
| `02-como-guardar-os-recados/` | `02-store-the-messages/` |
| `03-ver-todos-os-recados/` | `03-see-all-the-messages/` |
| `04-postar-um-recado/` | `04-post-a-message/` |
| `05-corrigir-ou-apagar/` | `05-fix-or-delete/` |
| `06-como-deixar-o-mural-mais-bonito/` | `06-make-it-look-nicer/` |
| `07-e-se-o-recado-vier-vazio/` | `07-empty-messages/` |
| `08-como-mostrar-o-mural-para-o-mundo/` | `08-show-it-to-the-world/` |
| `09-terminei-e-agora/` | `09-whats-next/` |
| `mao-na-massa.md` | `hands-on.md` |
| `o-que-aconteceu.md` | `what-happened.md` |
| `desafios-extras/` | `extra-challenges/` |
| `desafios-extras/cores-nos-recados.md` | `extra-challenges/message-colors.md` |
| `desafios-extras/curtidas.md` | `extra-challenges/likes.md` |
| `desafios-extras/data-dos-recados.md` | `extra-challenges/message-dates.md` |
| `desafios-extras/filtrar-por-cor.md` | `extra-challenges/filter-by-color.md` |
| `desafios-extras/formulario-no-mural.md` | `extra-challenges/post-from-the-board.md` |
| `mentoras/` | `mentors/` |
| `mentoras/erros-comuns.md` | `mentors/common-errors.md` |
| `mentoras/projetos/mural-de-recados/` | `mentors/projects/message-board/` |
| `extras/terminal-basico.md` | `extras/terminal-basics.md` |
| `extras/git-basico.md` | `extras/git-basics.md` |
| `extras/no-seu-computador.md` | `extras/on-your-computer.md` |
| `extras/como-pedir-codigo-para-uma-ia.md` | `extras/asking-ai-for-code.md` |
| `_includes/mural-de-recados/NN/desafio.md` | `en/_includes/message-board/NN/challenge.md` |
| `_includes/mural-de-recados/NN/mao-na-massa.md` | `en/_includes/message-board/NN/hands-on.md` |

O modo workshop usa os mesmos nomes dos capítulos (`workshop-mode/03-see-all-the-messages.md`): é assim que o progresso dos passos é compartilhado com o mão na massa completo.

## Termos do guia

| Português | Inglês |
|---|---|
| mural de recados / app Mural de recados | message board / the Message Board app |
| recado | message |
| post-it | sticky note |
| autora (`author`) | author |
| mensagem (`content`) | message (`content`) |
| curtidas | likes |
| O desafio | The challenge |
| Pense antes de programar | Think before you code |
| Compare com o nosso plano | Compare with our plan |
| Mão na massa | Hands-on |
| O que aconteceu? | What happened? |
| Dê um palpite | Make a guess |
| Confira | Check |
| Quebre de propósito | Break it on purpose |
| Travou? | Stuck? |
| Terminou? Abra o passo… | Done? Open step… |
| Não esqueça | Remember |
| E se fosse com IA? | What if you used AI? |
| Modo workshop | Workshop mode |
| Comece aqui | Start here |
| Desafios extras | Extra challenges |
| Guia para mentoria | Mentoring guide |
| equipe de mentoria / mentora | mentoring team / mentor |
| Para ir além | Going further |
| Opcional | Optional |

## Interface do app em inglês

| Português | Inglês |
|---|---|
| Mural de recados (título) | Message Board |
| Novo recado | New message |
| Seu nome | Your name |
| Recado (campo) | Message |
| Postar recado | Post message |
| Corrigir recado | Edit message |
| Salvar | Save |
| Editar / Apagar | Edit / Delete |
| voltar | back |
| repositório `mural-de-recados` | repository `message-board` |

## Escrita

- Mesmas regras do português: linguagem neutra ("you", "they", "the person"), termo técnico primeiro e analogia depois, repetir de propósito o que reforça o ensino.
- Pronúncias e traduções de termos em inglês, que só fazem sentido para quem fala português, saem da versão em inglês.
- Links para páginas que só existem em português ganham "(in Portuguese)".

## Pendências

- Prints do app: ainda são os do português. Refazer com a interface em inglês.
- Repositório de referência: versão em inglês.
- Rubi: desligada no inglês até responder em inglês.
