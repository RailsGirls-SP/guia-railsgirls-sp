{% comment %}translation_of: _includes/mural-de-recados/07/desafio.md translated_from: a42ccdc {% endcomment %}
You've already seen this twice: in the console, in [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/what-happened.md %}), and in the form, in [How do we post a message?]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/hands-on.md %}). If someone clicks **Post message** without writing anything, an empty card shows up on the message board.

![The message board with the New message button and four yellow cards: the first one is empty, with only the dash and the Edit and Delete buttons; the others have Carla's, Bia's and Ana's messages]({{ '/assets/images/mural-de-recados/07/recado-vazio.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Rails accepts it because nobody told it that's not allowed.

{: .desafio }
Decide **what a valid message is** and make the app reject anything that isn't, telling the person what's missing.
