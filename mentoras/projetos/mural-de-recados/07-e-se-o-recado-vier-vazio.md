---
title: "07. E se alguém mandar um recado vazio?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 8
---

# 07. E se alguém mandar um recado vazio?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-07`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Quem decide que um recado vazio é errado: o Rails ou você?" É a ideia central do capítulo, e o gancho para a conversa sobre IA.
- "E um nome só com espaços?" Leva ao `presence`, que trata espaços em branco como vazio.
- "Quando o recado é recusado, você quer digitar tudo de novo?" Prepara a diferença entre `render` e `redirect_to`.

## O fio do capítulo

Este é o capítulo-gancho do guia para o tema de engenharia e IA: **o código funciona e aceita um recado vazio; quem decide que isso é um erro é quem programa**. Vale reforçar em voz alta quando o aviso aparecer pela primeira vez: a regra só existe porque a pessoa escreveu.

Os passos seguem um problema de cada vez, e cada um aparece na tela antes de ser resolvido:

1. O cartão vazio aparece (passo 2).
2. Com a regra no model, o recado vazio some, mas **sem aviso nenhum** (passo 4). Pergunte: "como a pessoa sabe que deu errado?".
3. No console, os avisos existem (passo 5): o model sabe o que falta, e o problema é que ninguém mostra.
4. Com o `if` no controller, o que foi escrito fica no formulário, mas ainda sem aviso (passo 6).
5. Com os avisos na view, tudo funciona (passo 7).
6. A correção tem o mesmo problema da postagem, e a solução é a mesma (passo 9).

## Confusões comuns

- **Os dois `end` no fim do `create`.** Um fecha o `if`, o outro, o `def`. Faltar um dá erro de sintaxe, e o erro às vezes aponta para o fim do arquivo, longe do problema.
- **Esquecer o `status: :unprocessable_entity`.** Com o Turbo, uma resposta de formulário com status 200 não é mostrada: nada acontece na tela, e o navegador registra no console "Form responses must redirect to another location". É uma das confusões mais difíceis de achar, porque não aparece erro na página.
- **`render :index` em vez de `render :new`.** O formulário está na view `new`, então é ela que precisa aparecer de novo com os avisos. Com `render :index`, aparece `undefined method 'empty?' for nil`, porque a view do mural de recados precisa da lista `@messages`, que o `create` não prepara.
- **Os avisos em inglês.** Sem o `message:`, aparece `can't be blank`.
- **Recados inválidos antigos.** As validações não apagam nem corrigem o que já estava no banco de dados.

## Por que os avisos ficam embaixo de cada campo

O `errors.full_messages` monta as frases juntando o nome da coluna (em inglês) com o aviso: `Author Escreva o seu nome.`. Para mostrar tudo em português do jeito certo, seria preciso traduzir os nomes das colunas (com `config/locales/pt-BR.yml` e, de preferência, a gem `rails-i18n`), o que é muita coisa nova para o fim do dia. Com `errors[:author]` embaixo de cada campo, a participante escreve a frase inteira no `message:` e vê exatamente ela na tela.

Se uma participante quiser ir além, traduzir o app com o `rails-i18n` é um bom desafio para depois do workshop.

## Regras de negócio no model

Contexto para a mentoria. As validações do capítulo são um exemplo pequeno de **regras de negócio**: as regras que dizem o que faz sentido para o app, como "um recado precisa ter autora" ou "a mensagem tem no máximo 280 caracteres". No Rails, a boa prática é deixar essas regras no **model**, e não no controller nem na view:

- **Um lugar só.** Toda criação e toda mudança de um recado passa pelo model, venha do formulário, do console, de uma tarefa agendada ou de uma API. A regra vale para todos os caminhos, sem repetir.
- **Controller enxuto.** O controller só recebe a requisição, chama o model e escolhe a resposta (`redirect_to` ou `render`). É a ideia conhecida como *"skinny controller, fat model"* (controller magro, model gordo), popularizada por Jamis Buck no texto [Skinny Controller, Fat Model](https://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model), de 2006, em inglês.
- **O guia oficial recomenda.** O guia [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html), em inglês, compara validações no banco de dados, no navegador, no controller e no model, e aponta as do model como o melhor jeito de garantir que só dados válidos sejam guardados.

Um cuidado, se a conversa for longe: em apps grandes, "model gordo" demais também vira problema, e é comum separar regras complexas em outros objetos (como *concerns*, *form objects* ou *service objects*). Uma divisão comum: regras sobre os dados ficam no model (o que é um recado válido); regras de um processo, como limitar quantos recados alguém posta por hora ou avisar a moderação ao postar, vão para um service object. O service object só vale para quem passa por ele, por isso o mínimo que nunca pode ser quebrado continua no model. Para o tamanho do Mural de recados, o model é o lugar certo, e não vale levar essa discussão para o dia.

## Por que não usar `required` no HTML

O formulário poderia ter `required: true` nos campos, e o navegador já impediria o envio vazio. O guia não usa isso de propósito: a regra no navegador é fácil de contornar (basta mandar a requisição de outro jeito), e o objetivo do capítulo é mostrar que a regra que vale de verdade fica no model. Se alguém perguntar, as duas coisas podem andar juntas: o `required` ajuda quem usa, e o `validates` protege os dados.

## Se o tempo apertar

O capítulo é um "nice to have", mas é o mais importante dos opcionais: é onde aparece a ideia de que quem decide o que é um erro é quem programa. Se sobrar pouco tempo, o **mínimo** é:

| Fazer | Passos | O que a participante ganha |
|---|---|---|
| Ver o problema e escrever a regra no model | 1 a 4 | O recado vazio deixa de ser guardado |
| Mostrar os avisos | 5 a 7 | A pessoa vê o que faltou, e o que foi escrito continua no formulário |
| Guardar o progresso | 10 | Um commit com a regra e os avisos |

Ficam para depois, ou para casa: o **passo 8** (o limite de 280 caracteres) e o **passo 9** (os avisos na correção, que repetem o padrão do passo 7 na ação `update`). Se der para fazer só uma parte, prefira terminar no passo 7: parar no 4 deixa o recado sumindo sem aviso, que é o problema que o capítulo mostra de propósito, e que os passos 5 a 7 resolvem. Se parar no 4 mesmo assim, o commit do passo 10 não diz a verdade (`Valida os recados e mostra os avisos`): use `Valida os recados`.

## Próximas notas

[08. Como mostrar o mural de recados para o mundo?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo.md %})
