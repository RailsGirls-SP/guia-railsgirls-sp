---
title: Guia para mentoria
nav_order: 5
has_children: true
---

# Guia para mentoria

Obrigada por mentorar no Rails Girls São Paulo! 💜 Esta parte do guia é para você: como acompanhar as participantes, o roteiro do dia e notas de cada capítulo do projeto.

As participantes seguem o guia por conta própria, no próprio ritmo. O seu papel não é dar aula: é ajudar quando alguém travar, fazer boas perguntas e lembrar que errar faz parte.

## Postura de mentoria

- **Não pegue o teclado.** Mesmo quando for mais rápido. Quem digita aprende; quem assiste esquece. Se precisar mostrar algo, aponte na tela e deixe a pessoa fazer.
- **Pergunte antes de responder.** "O que você acha que aconteceu?", "O que a mensagem de erro diz?", "O que você esperava ver?". Muitas vezes, a resposta aparece durante a explicação.
- **Leia os erros junto.** As telas de erro fazem parte do guia, e várias aparecem de propósito. Em vez de corrigir, pergunte "o que está faltando?". Quando aparecer um erro novo, comemore: quer dizer que houve avanço.
- **Não existe pergunta boba.** Responda com calma, sem "isso é fácil" nem "é só…". Para quem está começando, nada é óbvio.
- **Use as palavras do guia.** Os comandos por extenso (`bin/rails server`, e não `rails s`) e os termos técnicos (model, controller, migration), com a tradução quando ajudar. Veja [Comandos por extenso]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/index.md %}#comandos-por-extenso).
- **Siga o guia, mesmo que você faria diferente.** O guia evita de propósito o scaffold, os testes automatizados e outros caminhos comuns no dia a dia. As notas de cada capítulo explicam o porquê. Se tiver uma sugestão, anote e mande para a organização depois.
- **Respeite o ritmo de cada uma.** Ninguém precisa terminar todos os capítulos. Quem para no meio já sai com um app que funciona.
- **IA como tutora, não como autora.** Se a pessoa quiser usar uma IA, incentive pedir explicações, e não o código pronto. Veja [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

## Formatos de grupo

O projeto Mural de recados é uma sequência: cada capítulo depende do anterior, e todos mexem nos mesmos arquivos. Por isso, não dá para dividir o projeto entre as pessoas de um grupo, cada uma fazendo uma parte.

**O formato recomendado é: cada pessoa constrói o próprio app, no próprio codespace e no próprio ritmo, em grupos pequenos de 3 ou 4 pessoas com alguém da mentoria.** Assim, cada pessoa sai do workshop com o seu repositório e pode continuar em casa. O guia foi escrito para esse formato: os commits, o deploy e o "cada pessoa no seu ritmo".

Dentro desse formato, vale usar momentos em grupo:

- **Capítulo 00 em grupo.** O planejamento fica ainda melhor em conversa: o grupo discute as telas, as informações e o que pode dar errado, cada pessoa no seu papel.
- **Erros em grupo.** Quando alguém travar num erro, o grupo para e lê a mensagem junto, por uns 5 minutos. Depois, cada pessoa volta para o seu app.
- **Comemorações em grupo.** Quando o primeiro recado aparecer na tela de alguém, vale mostrar para o grupo.

| Formato | Quando usar | Cuidados |
|---|---|---|
| **Cada pessoa no seu app** | Sempre que possível. É o padrão do workshop. | Ritmos diferentes no mesmo grupo: quem andar mais rápido pode ajudar a ler os erros de quem travou, sem pegar o teclado. |
| **Pair programming** (dupla num app só) | Quando duas pessoas preferirem fazer juntas, ou para alguém sem computador. | Uma pessoa digita e a outra guia, e as duas trocam a cada capítulo. Só uma sai com o app no próprio repositório. |
| **Mob programming** (o grupo todo num app só) | Plano B, quando vários computadores derem problema ou o grupo pedir. | Quem digita troca a cada 10 ou 15 minutos (use um cronômetro). Quem digita só escreve o que o grupo decidir em voz alta. Garanta que todo mundo passe pelo teclado, inclusive as pessoas mais tímidas. |

No pair e no mob, o app fica no repositório de uma pessoa só. Quem não ficou com ele pode refazer o projeto em casa, seguindo o guia, e vai ser bem mais rápido da segunda vez.

## Roteiro do dia

O workshop dura um dia, com cerca de **4h30 de mão na massa**. O resto do tempo é da abertura, do almoço, dos intervalos e do encerramento.

| Momento | Duração | O que acontece |
|---|---|---|
| Abertura | cerca de 30 min | Boas-vindas e apresentação do projeto. Confira se todo mundo já tem conta no GitHub. |
| Mão na massa (manhã) | cerca de 2h | Planejamento (capítulo 00) e os primeiros capítulos. Meta: chegar ao capítulo 03 ou 04. |
| Almoço | cerca de 1h | |
| Mão na massa (tarde) | cerca de 2h30 | Do capítulo 04 em diante. Meta: chegar ao capítulo 05 (🛴: postar, ver, corrigir e apagar). |
| Intervalos | cerca de 30 min no total | Um de manhã e um à tarde. |
| Encerramento | cerca de 1h30 | Cada pessoa mostra o seu mural de recados, conversa sobre próximos passos e agradecimentos. |

Algumas dicas para o dia:

- **A meta é a etapa 🛴 (capítulo 05).** Os capítulos 06 e 07 são para quem andar mais rápido, e o 08 (publicar no Render) é opcional. Os desafios extras são para quem terminar tudo.
- **O "O que aconteceu?" pode ficar para casa.** No dia, vale fazer o Mão na massa e ler o "Não esqueça" de cada capítulo.
- **Fique de olho em quem está parada no mesmo passo há muito tempo.** Mais de 10 minutos no mesmo passo é sinal para chegar perto, sem esperar pedirem ajuda.
- **No encerramento, todo mural de recados conta.** Quem chegou ao capítulo 03 também tem um app que funciona. Celebre o caminho, não só o ponto de chegada.

## Nesta parte

- [Erros comuns]({{ site.baseurl }}{% link mentoras/erros-comuns.md %}): os problemas que mais aparecem, de ambiente e de código, e como resolver.
- [Notas dos projetos]({{ site.baseurl }}{% link mentoras/projetos/index.md %}): perguntas para o "Pense antes", confusões comuns e contexto técnico de cada capítulo.
