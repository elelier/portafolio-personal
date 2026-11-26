// Artículos del blog. Cada post vive aquí como datos para que publicar uno nuevo
// sea agregar un objeto, sin tocar componentes.
//
// Formato del cuerpo (`body`): texto plano con párrafos separados por una línea en blanco.
//   "## Subtítulo"   -> subtítulo
//   "- elemento"     -> lista (líneas consecutivas)
//   "> cita"         -> cita
//   ![texto alternativo](/images/blog/foto.webp "Pie de foto")  -> imagen (sola en su párrafo)
//   varias imágenes en líneas seguidas, sin línea en blanco -> se muestran lado a lado
//   **negritas**     -> negritas dentro del texto
//
// `draft: true` oculta el post del listado y de su URL pública.
// `cover` es la imagen del listado; `ogImage` (1200×630 jpg) es la que se ve al compartir el enlace.
// Traducciones: agrega `en` y/o `'pt-br'` con title, summary, body y (opcional) tags; sin ellas se muestra el español.
// Al publicar uno nuevo, agrega `/blog/<slug>/` (y `/en/...`, `/pt-br/...` si está traducido)
// a INDEXABLE_SITEMAP_PATHS y a public/sitemap.xml.

const blogPosts = [
  {
    slug: 'vender-mis-cosas-con-mi-propia-app',
    date: '2026-11-26',
    tags: ['Producto', 'SeVa', 'Historias'],
    cover: '/images/blog/seva/portada.webp',
    ogImage: '/images/blog/seva/portada-og.jpg',
    product: {
      name: 'SeVa',
      url: 'https://seva.elelier.com/',
      icon: '/images/blog/seva-icon.png',
      tryText: {
        es: 'SeVa ya está en línea. Entra con tu cuenta de Google y crea tu propio catálogo; tú decides a quién invitas.',
        en: 'SeVa is live. Sign in with Google and create your own catalog; you decide who gets an invite.',
        'pt-br': 'O SeVa já está no ar. Entre com sua conta Google e crie seu próprio catálogo; você decide quem convidar.',
      },
    },
    es: {
      title: 'Lo que aprendí cuando me tocó vender mis cosas con mi propia app',
      summary:
        'Ilse y yo nos vamos a mudar a São Paulo. De pronto cada mueble del departamento era una decisión pendiente. Así nació SeVa, y así descubrí lo que no sabía de mi propio producto.',
      body: `![Portada de SeVa: catálogo privado con acceso por invitación, con cajas de mudanza, libros, una taza y una guitarra](/images/blog/seva/portada.webp "SeVa: objetos con historia para vender, regalar o apartar entre familia y amigos.")

Ilse y yo nos vamos a vivir a São Paulo. Cuando esa posibilidad empezó a convertirse en un plan real, con fechas, presupuestos y pendientes, cambió algo que no esperaba: la manera en que veía nuestro departamento.

Los muebles, los electrodomésticos, los escritorios, las sillas, las mesas, el refrigerador, mi monitor ultrawide de 34 pulgadas y un montón de cosas pequeñas que fuimos comprando con los años. Antes eran simplemente nuestra casa. De repente, cada una era una pregunta: ¿nos la llevamos?, ¿la vendemos?, ¿la regalamos?, ¿la guardamos?

No estábamos desocupando un departamento. Estábamos organizando una transición de vida, con muchas decisiones al mismo tiempo. Y yo no quería que darle salida a todo se convirtiera en otro trabajo de tiempo completo.

## El problema no era encontrar compradores

Cuando piensas en vender tus cosas, lo primero que imaginas es el anuncio: la foto, el precio, alguien que pregunta. Pero ese es el momento fácil.

Lo cansado es todo lo demás. Las fotos dispersas en el celular. Escribir la misma descripción otra vez. Contestar las mismas preguntas. Acordarte de quién preguntó primero. Llevar en la cabeza qué sigue disponible, qué ya está apartado y qué falta entregar.

El problema no era conseguir a alguien interesado. Era administrar el proceso completo sin perder el control.

Como ingeniero tengo esa manía de buscar cómo simplificar las cosas. Y como me encanta hacer productos digitales, vi la oportunidad de construir algo que yo mismo iba a usar. Así nació [SeVa](https://seva.elelier.com): un lugar para tomar fotos de tus cosas, darle a cada una su ficha, compartirlas con gente de confianza y saber en todo momento quién está interesado, qué está apartado, qué se vendió y qué falta entregar.

La idea de fondo es sencilla: que las cosas que ya no necesitamos encuentren una nueva vida con alguien más.

## Por qué no quise hacer otro marketplace

No estaba buscando venderle a miles de desconocidos. Quería ofrecer nuestras cosas a gente cercana, y a quien llegara por medio de alguien de confianza.

Hay una diferencia grande entre publicar algo en internet para que cualquiera lo encuentre y abrirle una parte de tu vida a un círculo conocido. Cuando vendes las cosas de tu casa también cuentas, sin querer, qué tienes, cómo son tus espacios, dónde vives y a qué hora estás.

Por eso la privacidad fue una decisión de producto desde el principio: en SeVa entras por invitación.

Esa decisión además me quitó de encima problemas que no tenía. Entre conocidos no necesito construir pagos, reputación ni protección al comprador. La confianza ya existe; la app solo tiene que ordenar lo que pasa alrededor de ella.

![Pantalla de invitación privada de SeVa que pide el nombre antes de entrar al catálogo](/images/blog/seva/app-invitacion.webp "La puerta de entrada: una invitación, tu nombre y listo.")
![El catálogo de SeVa visto por un invitado: tarjetas con foto, nombre, precio y disponibilidad de cada objeto](/images/blog/seva/app-catalogo-invitado.webp "Nuestro catálogo, como lo ve alguien invitado.")

## Cuando el desarrollador se convirtió en vendedor

Mientras construía SeVa, mi cabeza estaba en lo obvio: capturar objetos, organizarlos, publicarlos. Si eso funcionaba, pensaba, lo demás era detalle.

Luego empecé a usarla para vender nuestras cosas de verdad, y el detalle resultó ser casi todo.

Hubo un momento que recuerdo muy bien. Teníamos varios objetos apartados. Cerré algunos de esos apartados como ventas hechas. Después me di cuenta de que esos mismos objetos seguían publicados. Y disponibles.

Vendidos para mí, disponibles para cualquiera que abriera el catálogo.

Si alguien ya compró algo, ¿por qué otra persona todavía puede pensar que se lo puede llevar? Es justo el tipo de confusión que SeVa existe para evitar, y la estaba causando SeVa. Eso me obligó a revisar desde la base cómo se relacionaban los apartados, las ventas y el inventario.

![Bandeja de solicitudes en SeVa con dos apartados confirmados pendientes de cerrar o liberar](/images/blog/seva/app-solicitudes.webp "Apartados confirmados, esperando a que los cierre o los libere. Nombres ocultos.")

Casi enseguida apareció otro hueco. Vender algo no es lo mismo que haberlo cobrado. Hay ventas con el pago pendiente, ventas ya pagadas y ventas con un abono. Para la app, todo era «vendido». Para mí, como vendedor, eran tres situaciones muy distintas.

![Pantalla de ventas y cobros en SeVa con filtros de sin revisar, pendientes y cobradas](/images/blog/seva/app-ventas-cobros.webp "Hoy la venta y el cobro se ven por separado. Datos sensibles ocultos.")

Son cosas que parecen pequeñas mientras diseñas. Dejan de serlo en cuanto la usas. Ahí SeVa dejó de ser un proyecto de desarrollo y se volvió un producto que tenía que contestar bien a situaciones reales.

## Lo que cambió por usarla yo

Usarla me cambió la lista de prioridades. Algunas cosas ya están en la app; otras siguen en camino o falta validarlas:

- **Separar lo disponible de lo vendido**, para que nadie se ilusione con algo que ya tiene dueño.
- **Distinguir la venta del cobro**, para saber qué ya está pagado y qué no.
- **Precios visibles en las tarjetas**, sin tener que abrir cada objeto.
- **No perder tu lugar** cuando regresas de ver un objeto al catálogo.
- **Captura rápida.** Cuando tienes decenas de cosas por registrar, no quieres llenar veinte campos por cada una. Tomas las fotos, guardas y sigues. Los detalles pueden esperar.

![Ficha de un florero en SeVa con fotos, precio, unidades disponibles y los botones Me interesa, Preguntar y Apartar](/images/blog/seva/app-ficha-objeto-recorte.webp "La ficha de cada objeto, desde el lado del invitado.")

Hubo otra lección menos técnica y más incómoda. Algunas pantallas que ya había aprobado en el prototipo, cuando llegaron a la app real, no se parecían lo suficiente a lo que había diseñado. Funcionaban, pero no se sentían bien. Una app que funciona no es lo mismo que una app agradable de usar, y tuve que cambiar la forma en que revisaba que la experiencia fuera la que imaginé.

Si tuviera que resumir todo en una frase: **dejé de pensar en funcionalidades y empecé a revisar recorridos completos.** Desde que alguien ve un objeto hasta que se lo lleva a su casa, ya pagado.

## No todo necesita otro botón

Hay algo que tengo cada vez más claro: no quiero que SeVa reemplace todas las conversaciones entre personas.

Una app puede ayudarte a ordenar el inventario, registrar solicitudes, recordar compromisos y saber qué está pendiente. Pero ponerse de acuerdo sobre una entrega muchas veces se resuelve mejor con un mensaje. No todo necesita un botón más, una automatización o un flujo de diez pasos.

Mi objetivo no es que la gente pase el mayor tiempo posible dentro de SeVa. Es que resuelva lo que necesita con la menor fricción, y luego se vaya a vivir su vida.

## Lo que sigue

Hoy SeVa es una app web donde puedes armar catálogos de tus cosas, compartirlos, recibir preguntas y solicitudes de apartado y llevar la salida de cada objeto. Tiene usuarios con permisos, fotos, colaboración y pruebas automáticas. También tiene problemas que sigo resolviendo, y no la voy a presentar como algo terminado.

![Pantalla de inicio de SeVa con publicadas, por revisar, apartados, preguntas y los objetos que se están moviendo](/images/blog/seva/app-inicio.webp "El inicio: lo importante de la venta, de un vistazo.")

Primero quiero que resuelva bien nuestro caso: una mudanza con decenas de objetos y gente interesada. Después me gustaría probarla con otras personas que estén en algo parecido: una mudanza, una venta de garaje o simplemente las ganas de liberar espacio. No quiero convertirla antes de tiempo en otro marketplace gigante. Prefiero que crezca a partir de necesidades reales.

## Lo que sí nos vamos a llevar

La mudanza me ha hecho ver cuántas cosas acumulamos sin darnos cuenta. Unas tienen una función, otras tienen recuerdos, y otras siguen con nosotros solo porque nunca nos detuvimos a decidir qué hacer con ellas.

Mi monitor, por ejemplo. Lo he usado varios años y ha estado ahí en muchos proyectos. Venderlo no es vender un aparato: es soltar algo que ha sido parte de mi rutina y de mi espacio de trabajo.

Irnos a Brasil es mucho más que cambiar de país. Ilse y yo queremos más libertad, conocer lugares, estar cerca de la naturaleza, aprender y disfrutar el tiempo con quienes queremos. Y eso me hace preguntarme cuánto necesitamos de verdad para vivir bien.

Todavía no sabemos todo lo que nos vamos a llevar. Pero me gusta pensar que esta mudanza es una oportunidad para elegir con más conciencia qué conservar. Los objetos pueden acompañarnos durante una etapa de la vida sin tener que acompañarnos en todas las siguientes.

Si estás por mudarte o quieres liberar espacio y te late probarla, SeVa está en [seva.elelier.com](https://seva.elelier.com). Y si en tu operación hay un proceso que se ve sencillo en el diagrama pero se complica en cuanto alguien lo usa de verdad, cuéntame dónde se está atorando. Me encantaría escucharte.`,
    },
    en: {
      title: 'What I learned when I had to sell my things with my own app',
      tags: ['Product', 'SeVa', 'Stories'],
      summary:
        'Ilse and I are moving to São Paulo. Suddenly every piece of furniture in our apartment was a pending decision. That’s how SeVa was born, and how I found out what I didn’t know about my own product.',
      body: `![SeVa cover: a private catalog with invite-only access, with moving boxes, books, a mug and a guitar](/images/blog/seva/portada.webp "SeVa: things with a story to sell, give away or set aside among family and friends.")

Ilse and I are moving to São Paulo. When that possibility started turning into a real plan, with dates, budgets and to-dos, something changed that I didn't expect: the way I looked at our apartment.

The furniture, the appliances, the desks, the chairs, the tables, the fridge, my 34-inch ultrawide monitor and a pile of small things we bought over the years. Before, they were simply our home. Suddenly, each one was a question: do we take it, sell it, give it away or store it?

We weren't just emptying an apartment. We were organizing a life transition, with many decisions at once. And I didn't want getting rid of everything to become another full-time job.

## The problem wasn't finding buyers

When you think about selling your stuff, the first thing you picture is the listing: the photo, the price, someone asking about it. But that's the easy part.

What wears you out is everything else. Photos scattered across your phone. Writing the same description again. Answering the same questions. Remembering who asked first. Keeping track in your head of what's still available, what's on hold and what still needs to be handed over.

The problem wasn't getting someone interested. It was managing the whole process without losing control.

As an engineer, I have this habit of looking for ways to simplify things. And since I love building digital products, I saw the chance to build something I'd use myself. That's how [SeVa](https://seva.elelier.com) was born: a place to take photos of your things, give each one its own page, share them with people you trust and always know who's interested, what's on hold, what's sold and what still needs to be delivered.

The idea underneath is simple: that the things we no longer need find a new life with someone else.

## Why I didn't want another marketplace

I wasn't trying to sell to thousands of strangers. I wanted to offer our things to people close to us, and to whoever came through someone we trust.

There's a big difference between posting something online for anyone to find and opening part of your life to a known circle. When you sell the things in your home, you also reveal, without meaning to, what you own, what your place looks like, where you live and when you're home.

That's why privacy was a product decision from the start: you get into SeVa by invitation.

That decision also spared me problems I didn't have. Among people who know each other, I don't need to build payments, reputation or buyer protection. The trust already exists; the app just has to organize what happens around it.

![SeVa's private invitation screen asking for your name before entering the catalog](/images/blog/seva/app-invitacion.webp "The front door: an invitation, your name, and you're in.")
![The SeVa catalog as a guest sees it: cards with each item's photo, name, price and availability](/images/blog/seva/app-catalogo-invitado.webp "Our catalog, as an invited guest sees it.")

## When the developer became the seller

While I was building SeVa, my head was on the obvious: capturing items, organizing them, publishing them. If that worked, I thought, the rest was detail.

Then I started using it to actually sell our things, and the detail turned out to be almost everything.

There's one moment I remember well. We had several items on hold. I closed some of those holds as completed sales. Later I noticed those same items were still published. And available.

Sold, as far as I knew. Available for anyone who opened the catalog.

If someone already bought something, why can another person still think they can take it home? That's exactly the kind of confusion SeVa exists to prevent, and SeVa was causing it. It forced me to rethink, from the ground up, how holds, sales and inventory relate to each other.

![SeVa's requests inbox with two confirmed holds waiting to be closed or released](/images/blog/seva/app-solicitudes.webp "Confirmed holds, waiting for me to close or release them. Names hidden.")

Right after that, another gap showed up. Selling something isn't the same as getting paid for it. There are sales with payment pending, sales already paid and sales with a partial payment. For the app, it was all "sold". For me, as the seller, those were three very different situations.

![SeVa's sales and payments screen with filters for unreviewed, pending and paid](/images/blog/seva/app-ventas-cobros.webp "Today, the sale and the payment are shown separately. Sensitive data hidden.")

These things seem small while you're designing. They stop being small the moment you use the product. That's when SeVa stopped being a development project and became a product that had to respond correctly to real situations.

## What changed because I used it myself

Using it changed my list of priorities. Some of these are already in the app; others are on the way or still need validation:

- **Separating what's available from what's sold**, so nobody gets their hopes up about something that already has an owner.
- **Telling the sale apart from the payment**, to know what's paid and what isn't.
- **Prices visible on the cards**, without opening each item.
- **Not losing your place** when you go back from an item to the catalog.
- **Quick capture.** When you have dozens of things to register, you don't want to fill twenty fields for each one. Take the photos, save, keep going. The details can wait.

![A vase's page in SeVa with photos, price, available units and the buttons I'm interested, Ask and Hold](/images/blog/seva/app-ficha-objeto-recorte.webp "Each item's page, from the guest's side.")

There was another lesson, less technical and more uncomfortable. Some screens I had already approved in the prototype didn't look close enough to my design once they reached the real app. They worked, but they didn't feel right. An app that works isn't the same as an app that's pleasant to use, and I had to change how I checked that the experience was the one I had imagined.

If I had to sum it all up in one sentence: **I stopped thinking in features and started reviewing complete journeys.** From the moment someone sees an item until they take it home, already paid for.

## Not everything needs another button

There's something I'm more and more sure about: I don't want SeVa to replace every conversation between people.

An app can help you organize inventory, log requests, remember commitments and know what's pending. But agreeing on a pickup is often better solved with a message. Not everything needs one more button, an automation or a ten-step flow.

My goal isn't for people to spend as much time as possible inside SeVa. It's for them to get what they need done with the least friction, and then go live their lives.

## What's next

Today SeVa is a web app where you can build catalogs of your things, share them, receive questions and hold requests, and track where each item ends up. It has users with permissions, photos, collaboration and automated tests. It also has problems I'm still solving, and I won't present it as something finished.

![SeVa's home screen with published items, items to review, holds, questions and what's moving](/images/blog/seva/app-inicio.webp "Home: what matters in your sale, at a glance.")

First, I want it to solve our own case well: a move with dozens of items and interested people. After that, I'd like to try it with other people going through something similar: a move, a garage sale or simply the urge to free up space. I don't want to turn it into another giant marketplace too soon. I'd rather it grow from real needs.

## What we will take with us

The move has made me see how many things we accumulate without noticing. Some have a purpose, some carry memories, and some are still with us only because we never stopped to decide what to do with them.

My monitor, for example. I've used it for years and it's been there for many projects. Selling it isn't selling a device: it's letting go of something that has been part of my routine and my workspace.

Moving to Brazil is much more than changing countries. Ilse and I want more freedom, to discover places, to be close to nature, to learn and to enjoy time with the people we love. And that makes me ask how much we really need to live well.

We still don't know everything we'll take. But I like to think of this move as a chance to choose more consciously what to keep. Objects can be with us for one stage of life without having to come along for all the next ones.

If you're about to move or want to free up space and feel like trying it, SeVa is at [seva.elelier.com](https://seva.elelier.com). And if your operation has a process that looks simple on the diagram but gets complicated as soon as someone actually uses it, tell me where it's getting stuck. I'd love to hear from you.`,
    },
    'pt-br': {
      title: 'O que aprendi quando tive que vender minhas coisas com meu próprio app',
      tags: ['Produto', 'SeVa', 'Histórias'],
      summary:
        'Eu e a Ilse vamos nos mudar para São Paulo. De repente, cada móvel do apartamento virou uma decisão pendente. Assim nasceu o SeVa, e assim descobri o que eu não sabia sobre o meu próprio produto.',
      body: `![Capa do SeVa: catálogo privado com acesso por convite, com caixas de mudança, livros, uma caneca e uma guitarra](/images/blog/seva/portada.webp "SeVa: objetos com história para vender, doar ou reservar entre família e amigos.")

Eu e a Ilse vamos morar em São Paulo. Quando essa possibilidade começou a virar um plano de verdade, com datas, orçamentos e pendências, mudou algo que eu não esperava: o jeito como eu olhava para o nosso apartamento.

Os móveis, os eletrodomésticos, as escrivaninhas, as cadeiras, as mesas, a geladeira, meu monitor ultrawide de 34 polegadas e um monte de coisas pequenas que fomos comprando ao longo dos anos. Antes, eram simplesmente a nossa casa. De repente, cada uma virou uma pergunta: levamos?, vendemos?, doamos?, guardamos?

A gente não estava só esvaziando um apartamento. Estávamos organizando uma transição de vida, com muitas decisões ao mesmo tempo. E eu não queria que dar destino a tudo virasse mais um trabalho em tempo integral.

## O problema não era encontrar compradores

Quando você pensa em vender suas coisas, a primeira coisa que imagina é o anúncio: a foto, o preço, alguém perguntando. Mas essa é a parte fácil.

O que cansa é todo o resto. As fotos espalhadas no celular. Escrever a mesma descrição de novo. Responder às mesmas perguntas. Lembrar quem perguntou primeiro. Guardar de cabeça o que ainda está disponível, o que já está reservado e o que falta entregar.

O problema não era conseguir alguém interessado. Era administrar o processo inteiro sem perder o controle.

Como engenheiro, tenho essa mania de procurar como simplificar as coisas. E como adoro criar produtos digitais, vi a oportunidade de construir algo que eu mesmo ia usar. Assim nasceu o [SeVa](https://seva.elelier.com): um lugar para fotografar suas coisas, dar a cada uma a sua ficha, compartilhá-las com pessoas de confiança e saber o tempo todo quem está interessado, o que está reservado, o que foi vendido e o que falta entregar.

A ideia de fundo é simples: que as coisas de que não precisamos mais encontrem uma nova vida com outra pessoa.

## Por que eu não quis fazer mais um marketplace

Eu não estava tentando vender para milhares de desconhecidos. Queria oferecer nossas coisas para pessoas próximas e para quem chegasse por meio de alguém de confiança.

Existe uma grande diferença entre publicar algo na internet para qualquer um encontrar e abrir uma parte da sua vida para um círculo conhecido. Quando você vende as coisas da sua casa, também conta, sem querer, o que você tem, como são os seus espaços, onde você mora e a que horas está em casa.

Por isso a privacidade foi uma decisão de produto desde o começo: no SeVa, você entra por convite.

Essa decisão ainda me livrou de problemas que eu não tinha. Entre conhecidos, não preciso construir pagamentos, reputação nem proteção ao comprador. A confiança já existe; o app só precisa organizar o que acontece em volta dela.

![Tela de convite privado do SeVa pedindo o nome antes de entrar no catálogo](/images/blog/seva/app-invitacion.webp "A porta de entrada: um convite, seu nome e pronto.")
![O catálogo do SeVa visto por um convidado: cards com foto, nome, preço e disponibilidade de cada objeto](/images/blog/seva/app-catalogo-invitado.webp "Nosso catálogo, como um convidado o vê.")

## Quando o desenvolvedor virou vendedor

Enquanto construía o SeVa, minha cabeça estava no óbvio: cadastrar objetos, organizá-los, publicá-los. Se isso funcionasse, eu pensava, o resto era detalhe.

Depois comecei a usá-lo para vender nossas coisas de verdade, e o detalhe acabou sendo quase tudo.

Teve um momento de que me lembro bem. Tínhamos vários objetos reservados. Fechei algumas dessas reservas como vendas concluídas. Depois percebi que esses mesmos objetos continuavam publicados. E disponíveis.

Vendidos para mim, disponíveis para qualquer um que abrisse o catálogo.

Se alguém já comprou algo, por que outra pessoa ainda pode achar que pode levar? É exatamente o tipo de confusão que o SeVa existe para evitar, e quem estava causando era o próprio SeVa. Isso me obrigou a revisar desde a base como se relacionavam as reservas, as vendas e o inventário.

![Caixa de solicitações do SeVa com duas reservas confirmadas esperando para serem fechadas ou liberadas](/images/blog/seva/app-solicitudes.webp "Reservas confirmadas, esperando que eu as feche ou libere. Nomes ocultos.")

Logo em seguida apareceu outra lacuna. Vender algo não é o mesmo que ter recebido por ele. Há vendas com pagamento pendente, vendas já pagas e vendas com um sinal. Para o app, tudo era "vendido". Para mim, como vendedor, eram três situações muito diferentes.

![Tela de vendas e cobranças do SeVa com filtros de não revisadas, pendentes e recebidas](/images/blog/seva/app-ventas-cobros.webp "Hoje a venda e o pagamento aparecem separados. Dados sensíveis ocultos.")

São coisas que parecem pequenas enquanto você desenha. Deixam de ser assim que você usa. Foi aí que o SeVa deixou de ser um projeto de desenvolvimento e virou um produto que precisava responder bem a situações reais.

## O que mudou por eu mesmo usar

Usar o app mudou minha lista de prioridades. Algumas coisas já estão nele; outras ainda estão a caminho ou falta validar:

- **Separar o disponível do vendido**, para ninguém se animar com algo que já tem dono.
- **Distinguir a venda do pagamento**, para saber o que já foi pago e o que não.
- **Preços visíveis nos cards**, sem precisar abrir cada objeto.
- **Não perder o lugar** quando você volta de um objeto para o catálogo.
- **Cadastro rápido.** Quando você tem dezenas de coisas para registrar, não quer preencher vinte campos para cada uma. Tira as fotos, salva e segue. Os detalhes podem esperar.

![Ficha de um vaso no SeVa com fotos, preço, unidades disponíveis e os botões Tenho interesse, Perguntar e Reservar](/images/blog/seva/app-ficha-objeto-recorte.webp "A ficha de cada objeto, do lado do convidado.")

Teve outra lição, menos técnica e mais incômoda. Algumas telas que eu já tinha aprovado no protótipo, quando chegaram ao app real, não se pareciam o suficiente com o que eu tinha desenhado. Funcionavam, mas não pareciam certas. Um app que funciona não é o mesmo que um app agradável de usar, e tive que mudar o jeito como eu conferia se a experiência era a que eu tinha imaginado.

Se eu tivesse que resumir tudo em uma frase: **parei de pensar em funcionalidades e comecei a revisar jornadas completas.** Desde que alguém vê um objeto até levá-lo para casa, já pago.

## Nem tudo precisa de mais um botão

Tem uma coisa que está cada vez mais clara para mim: não quero que o SeVa substitua todas as conversas entre as pessoas.

Um app pode ajudar a organizar o inventário, registrar solicitações, lembrar compromissos e saber o que está pendente. Mas combinar uma entrega muitas vezes se resolve melhor com uma mensagem. Nem tudo precisa de mais um botão, uma automação ou um fluxo de dez passos.

Meu objetivo não é que as pessoas passem o maior tempo possível dentro do SeVa. É que resolvam o que precisam com o mínimo de atrito, e depois sigam com a vida.

## O que vem pela frente

Hoje o SeVa é um app web onde você pode montar catálogos das suas coisas, compartilhá-los, receber perguntas e pedidos de reserva e acompanhar o destino de cada objeto. Tem usuários com permissões, fotos, colaboração e testes automatizados. Também tem problemas que continuo resolvendo, e não vou apresentá-lo como algo pronto.

![Tela inicial do SeVa com publicados, a revisar, reservas, perguntas e os objetos que estão se movendo](/images/blog/seva/app-inicio.webp "O início: o que importa da sua venda, num relance.")

Primeiro quero que ele resolva bem o nosso caso: uma mudança com dezenas de objetos e pessoas interessadas. Depois, gostaria de testá-lo com outras pessoas passando por algo parecido: uma mudança, um bazar de garagem ou simplesmente a vontade de liberar espaço. Não quero transformá-lo cedo demais em mais um marketplace gigante. Prefiro que cresça a partir de necessidades reais.

## O que a gente vai levar

A mudança me fez ver quantas coisas acumulamos sem perceber. Umas têm uma função, outras têm lembranças, e outras continuam com a gente só porque nunca paramos para decidir o que fazer com elas.

Meu monitor, por exemplo. Uso há vários anos e ele esteve presente em muitos projetos. Vendê-lo não é vender um aparelho: é soltar algo que fez parte da minha rotina e do meu espaço de trabalho.

Ir para o Brasil é muito mais do que mudar de país. Eu e a Ilse queremos mais liberdade, conhecer lugares, ficar perto da natureza, aprender e aproveitar o tempo com quem a gente ama. E isso me faz perguntar quanto realmente precisamos para viver bem.

Ainda não sabemos tudo o que vamos levar. Mas gosto de pensar que esta mudança é uma oportunidade de escolher com mais consciência o que guardar. Os objetos podem nos acompanhar durante uma etapa da vida sem precisar nos acompanhar em todas as seguintes.

Se você está prestes a se mudar ou quer liberar espaço e tem vontade de testar, o SeVa está em [seva.elelier.com](https://seva.elelier.com). E se na sua operação existe um processo que parece simples no diagrama mas se complica assim que alguém o usa de verdade, me conta onde ele está travando. Vou adorar te ouvir.`,
    },
  },
  {
    slug: 'app-rancho-de-mi-papa',
    date: '2026-11-26',
    tags: ['Producto', 'MiRancho', 'Historias'],
    cover: '/images/blog/rancho/portada-papa-corral.webp',
    ogImage: '/images/blog/rancho/portada-og.jpg',
    // App de la que habla el post: se muestra como tarjeta arriba, botón al final y enlace en el listado.
    product: { name: 'MiRancho', url: 'https://mirancho.elelier.com/', icon: '/images/blog/mirancho-icon.svg' },
    es: {
      title: 'Lo que cambió cuando diseñé una app para el rancho de mi papá',
      summary:
        'Mi papá lleva más de veinte años con su rancho en Sonora. Siempre traía el celular en la bolsa; la libreta, no. Así empezó MiRancho.',
      body: `![Un ranchero de espaldas, recargado en la cerca del corral, mira a sus vacas al amanecer](/images/blog/rancho/portada-papa-corral.webp "Imagen ilustrativa.")

Mi papá es el Dr. Loya. Ha estado en el campo toda la vida, y desde hace más de veinte años tiene su rancho en Sonora: Tinaja Blanca. Ahí tiene más de cien vacas, una que otra gallina y, alguna vez, hasta borregos.

Es un rancho de pie de cría. No engorda: las vacas andan libres en los potreros y el trabajo está en cuidar que el hato crezca sano. Un día normal se le va en revisar las pilas y el agua, recorrer cercos, contar animales potrero por potrero, ver cuáles están en celo, cuáles ya fueron montadas, cuáles hay que apartar y cuáles toca vacunar.

Es mucho que recordar. Y durante años casi todo vivió en dos lugares: su memoria y una libreta.

## La libreta que se quedaba en la troca

![Una libreta de espiral con anotaciones a lápiz sobre el tablero de una troca, frente al corral](/images/blog/rancho/libreta-troca.webp "Imagen ilustrativa.")

La libreta funciona. No necesita señal, no se le acaba la pila y él sabe exactamente dónde anotó qué. Pero tiene un problema que tardé en ver: no siempre está donde pasan las cosas.

Mi papá está todo el tiempo afuera. En el potrero, en el corral, recorriendo un cerco. Un día me di cuenta de algo muy simple: el celular siempre lo trae en la bolsa. La libreta, no.

Ahí se me ocurrió. Si lo único que siempre lo acompaña es el teléfono, ahí también podía vivir lo que hoy vive en la libreta. No para cambiar su forma de trabajar, sino para que la información estuviera con él en el momento en que la necesita. Así nació [MiRancho](https://mirancho.elelier.com/).

## Cambiar la pluma por los dedos

Hice la primera versión pensando que lo difícil iba a ser la tecnología: guardar datos, sincronizar, ordenar el hato. Me equivoqué de problema.

Lo difícil para él fue acostumbrarse a escribir con los dedos en lugar de con una pluma. Suena menor, pero es todo. Una pluma no se equivoca de tecla, no tiene un botón diminuto junto a otro y no te pide que le atines a un campo de texto con las manos llenas de tierra.

Viéndolo usarla, cambié muchas cosas:

- **Letra grande** y fácil de leer, aun con el sol de frente.
- **Iconos grandes**, para tocar sin tener que atinarle.
- **Palabras de rancho**, no de sistema: «¿Cómo llegó?», «Nació aquí», «Lo compré».
- **Que funcione sin señal.** En el potrero muchas veces no hay. La app guarda todo en el celular y avisa qué falta por enviar cuando vuelve la conexión.

![Pantalla de MiRancho que pregunta cómo llegó el animal: ya estaba en mi rancho, nació aquí, lo compré, me lo regalaron o lo cambié por otro](/images/blog/rancho/app-origen.webp "Registrar un animal empieza con una pregunta que cualquiera en el rancho sabe contestar.")

![Un potrero de pasto seco con una cerca de alambre y un camino de terracería hacia la sierra](/images/blog/rancho/potrero-sin-senal.webp "En el potrero, la señal es opcional. Imagen ilustrativa.")

Nada de eso estaba en mi plan original. Todo salió de verlo usar la app, no de imaginarme cómo la iba a usar.

## Cómo la usa hoy

Lo que más me gusta es que la usa a su manera. Cada vaca tiene su galería: le toma fotos ahí mismo en el corral, o sube las que ya traía en el celular, y escoge cuál es la principal. Poco a poco se ha ido armando una colección de su hato. Si quieres ver cómo se ve, la app está en [mirancho.elelier.com](https://mirancho.elelier.com/).

![Galería de fotos de una vaca en MiRancho, con botones para tomar foto o subirla de la galería](/images/blog/rancho/app-galeria.webp "La galería de cada animal: tomar foto, subir las que ya tienes y elegir la principal. Datos de ejemplo.")

Y cuando alguien le pregunta por un animal, ya no tiene que mandar la foto y luego escribir los datos aparte. Escoge la foto, marca qué datos quiere que vayan con ella (nombre, sexo, edad, raza, peso) y la app arma la imagen, lista para mandarla por donde quiera.

![Pantalla para compartir una foto en MiRancho, con casillas para elegir qué datos van en la imagen](/images/blog/rancho/app-compartir.webp "Él decide qué datos acompañan la foto. Datos de ejemplo.")
![Foto de una vaca con su nombre, sexo, edad, raza y peso escritos en la parte de abajo](/images/blog/rancho/foto-compartida-canela.webp "Lo que recibe quien pregunta por Canela. Datos de ejemplo.")

Y cuando una vaca fue montada, lo anota ahí mismo, en el corral, en lugar de esperar a llegar a la libreta.

![Ficha de una vaca en MiRancho con su foto, su corral, su estado de preñez y su peso](/images/blog/rancho/app-ficha.webp "La ficha de cada animal: fotos, lugar, reproducción y peso. Datos de ejemplo.")

## Lo que me importa de esto

Podría contar MiRancho como un caso de producto: usuario, problema, solución. Y sí, es eso. Pero lo que más me importa es otra cosa.

Quería que resolviera un problema real de mi papá, de una forma sencilla y hasta divertida. Y que, cuando la abriera para enseñarle a alguien sus vacas, se sintiera orgulloso. No de la app: de su rancho.

De ahí me quedó una forma de trabajar que hoy aplico en todo. Antes de diseñar, veo dónde vive de verdad la información. Muchas veces no está en el sistema: está en una libreta, en la memoria de alguien o en un chat. Y la pregunta útil no es «¿cómo la meto al sistema?», sino «¿qué trae esta persona consigo cuando pasan las cosas?».

Si tienes ganado y quieres probarla, MiRancho está abierta en [mirancho.elelier.com](https://mirancho.elelier.com/). Y si en tu operación también hay una libreta que no siempre está donde pasan las cosas, cuéntame dónde se está atorando. Me encantaría escucharte.`,
    },
    en: {
      title: 'What changed when I designed an app for my dad’s ranch',
      tags: ['Product', 'MiRancho', 'Stories'],
      summary:
        'My dad has had his ranch in Sonora, Mexico, for more than twenty years. His phone was always in his pocket; his notebook, not so much. That’s how MiRancho started.',
      body: `![A rancher seen from behind, leaning on the corral fence and watching his cows at sunrise](/images/blog/rancho/portada-papa-corral.webp "Illustrative image.")

My dad is Dr. Loya. He has worked the land his whole life, and for more than twenty years he has had his own ranch in Sonora, Mexico: Tinaja Blanca. He keeps more than a hundred cows there, a few chickens and, at one point, even some sheep.

It's a cow-calf operation. He doesn't fatten cattle: the cows roam free across the pastures, and the job is making sure the herd grows healthy. A normal day goes into checking the water tanks, riding the fence lines, counting animals pasture by pasture, and keeping track of which cows are in heat, which have already been bred, which need to be sorted out and which are due for vaccines.

That's a lot to remember. And for years almost all of it lived in two places: his memory and a notebook.

## The notebook that stayed in the truck

![A spiral notebook with pencil notes on the dashboard of a pickup truck, facing the corral](/images/blog/rancho/libreta-troca.webp "Illustrative image.")

The notebook works. It doesn't need signal, its battery never dies, and he knows exactly where he wrote what. But it has a problem that took me a while to see: it isn't always where things happen.

My dad is outside all the time. In the pasture, in the corral, riding a fence line. One day I noticed something very simple: he always has his phone in his pocket. The notebook, not so much.

That's when it clicked. If the one thing that always goes with him is his phone, then what lives in the notebook today could live there too. Not to change the way he works, but so the information is with him at the moment he needs it. That's how [MiRancho](https://mirancho.elelier.com/) was born.

## Trading the pen for his fingers

I built the first version thinking the hard part would be the technology: saving data, syncing, organizing the herd. I had the wrong problem.

The hard part for him was getting used to writing with his fingers instead of a pen. It sounds minor, but it's everything. A pen never hits the wrong key, never has a tiny button right next to another one, and never asks you to hit a text field with hands covered in dirt.

Watching him use it, I changed a lot:

- **Large text**, easy to read even with the sun in your face.
- **Large icons**, so you can tap without having to aim.
- **Ranch words**, not system words: «¿Cómo llegó?» (how did it arrive?), «Nació aquí» (born here), «Lo compré» (I bought it).
- **It works without signal.** Out in the pasture there often isn't any. The app saves everything on the phone and shows what still needs to be sent when the connection comes back.

![MiRancho screen asking how the animal arrived: it was already on my ranch, born here, I bought it, it was a gift, or I traded for it](/images/blog/rancho/app-origen.webp "Registering an animal starts with a question anyone on a ranch can answer.")

![A pasture of dry grass with a barbed-wire fence and a dirt road leading to the mountains](/images/blog/rancho/potrero-sin-senal.webp "Out in the pasture, signal is optional. Illustrative image.")

None of that was in my original plan. All of it came from watching him use the app, not from imagining how he would use it.

## How he uses it today

What I like most is that he uses it his own way. Every cow has its own gallery: he takes photos right there in the corral, or uploads the ones he already had on his phone, and picks the main one. Little by little he has been building a collection of his herd. If you want to see what it looks like, the app is at [mirancho.elelier.com](https://mirancho.elelier.com/).

![Photo gallery of a cow in MiRancho, with buttons to take a photo or upload one from the phone](/images/blog/rancho/app-galeria.webp "Each animal's gallery: take a photo, upload the ones you already have and pick the main one. Sample data.")

And when someone asks him about an animal, he no longer has to send the photo and then type the details separately. He picks the photo, checks which details should go with it (name, sex, age, breed, weight) and the app puts the image together, ready to send wherever he wants.

![MiRancho screen for sharing a photo, with checkboxes to choose which details go on the image](/images/blog/rancho/app-compartir.webp "He decides which details go with the photo. Sample data.")
![Photo of a cow with her name, sex, age, breed and weight written across the bottom](/images/blog/rancho/foto-compartida-canela.webp "What someone asking about Canela receives. Sample data.")

And when a cow has been bred, he records it right there in the corral, instead of waiting to get back to the notebook.

![A cow's profile in MiRancho with her photo, her corral, her pregnancy status and her weight](/images/blog/rancho/app-ficha.webp "Each animal's profile: photos, location, breeding and weight. Sample data.")

## What matters to me about this

I could tell the MiRancho story as a product case: user, problem, solution. And yes, it is that. But what matters most to me is something else.

I wanted it to solve a real problem for my dad, in a simple and even fun way. And when he opens it to show someone his cows, I wanted him to feel proud. Not of the app: of his ranch.

It left me with a way of working I now apply to everything. Before designing anything, I look at where the information really lives. Often it isn't in the system: it's in a notebook, in someone's memory or in a chat. And the useful question isn't "how do I get it into the system?" but "what does this person carry with them when things happen?"

If you raise cattle and want to try it, MiRancho is open at [mirancho.elelier.com](https://mirancho.elelier.com/) (it's in Spanish). And if your operation also has a notebook that isn't always where things happen, tell me where things are getting stuck. I'd love to hear from you.`,
    },
    'pt-br': {
      title: 'O que mudou quando desenhei um app para a fazenda do meu pai',
      tags: ['Produto', 'MiRancho', 'Histórias'],
      summary:
        'Meu pai tem sua fazenda em Sonora, no México, há mais de vinte anos. O celular estava sempre no bolso; o caderninho, nem sempre. Foi assim que o MiRancho começou.',
      body: `![Um fazendeiro de costas, apoiado na cerca do curral, olha suas vacas ao amanhecer](/images/blog/rancho/portada-papa-corral.webp "Imagem ilustrativa.")

Meu pai é o Dr. Loya. Ele trabalha no campo a vida inteira e, há mais de vinte anos, tem sua própria fazenda em Sonora, no México: Tinaja Blanca. Lá ele tem mais de cem vacas, uma ou outra galinha e, em algum momento, até ovelhas.

É uma fazenda de cria. Ele não faz engorda: as vacas andam soltas pelos pastos e o trabalho está em cuidar para que o rebanho cresça saudável. Um dia normal vai em conferir os bebedouros e a água, percorrer as cercas, contar os animais pasto por pasto, ver quais estão no cio, quais já foram cobertas, quais precisam ser apartadas e quais estão na hora da vacina.

É muita coisa para lembrar. E durante anos quase tudo viveu em dois lugares: na memória dele e num caderninho.

## O caderninho que ficava na caminhonete

![Um caderno de espiral com anotações a lápis sobre o painel de uma caminhonete, de frente para o curral](/images/blog/rancho/libreta-troca.webp "Imagem ilustrativa.")

O caderninho funciona. Não precisa de sinal, não fica sem bateria e ele sabe exatamente onde anotou o quê. Mas tem um problema que eu demorei para ver: nem sempre está onde as coisas acontecem.

Meu pai está o tempo todo lá fora. No pasto, no curral, percorrendo uma cerca. Um dia percebi algo muito simples: o celular ele sempre leva no bolso. O caderninho, não.

Foi aí que me veio a ideia. Se a única coisa que sempre o acompanha é o celular, ali também podia viver o que hoje vive no caderninho. Não para mudar o jeito dele de trabalhar, mas para que a informação estivesse com ele no momento em que ele precisa. Foi assim que nasceu o [MiRancho](https://mirancho.elelier.com/).

## Trocar a caneta pelos dedos

Fiz a primeira versão achando que o difícil seria a tecnologia: salvar dados, sincronizar, organizar o rebanho. Eu estava olhando para o problema errado.

O difícil para ele foi se acostumar a escrever com os dedos em vez de com uma caneta. Parece pouco, mas é tudo. Uma caneta não erra a tecla, não tem um botão minúsculo do lado de outro e não pede que você acerte um campo de texto com as mãos cheias de terra.

Vendo ele usar, mudei muita coisa:

- **Letra grande**, fácil de ler mesmo com o sol de frente.
- **Ícones grandes**, para tocar sem precisar mirar.
- **Palavras de fazenda**, não de sistema: «¿Cómo llegó?» (como chegou?), «Nació aquí» (nasceu aqui), «Lo compré» (eu comprei).
- **Funciona sem sinal.** No pasto, muitas vezes não tem. O app salva tudo no celular e avisa o que falta enviar quando a conexão volta.

![Tela do MiRancho que pergunta como o animal chegou: já estava na minha fazenda, nasceu aqui, eu comprei, ganhei de presente ou troquei por outro](/images/blog/rancho/app-origen.webp "Cadastrar um animal começa com uma pergunta que qualquer pessoa na fazenda sabe responder.")

![Um pasto de capim seco com uma cerca de arame farpado e uma estrada de terra em direção à serra](/images/blog/rancho/potrero-sin-senal.webp "No pasto, o sinal é opcional. Imagem ilustrativa.")

Nada disso estava no meu plano original. Tudo saiu de ver ele usando o app, não de imaginar como ele ia usar.

## Como ele usa hoje

O que eu mais gosto é que ele usa do jeito dele. Cada vaca tem sua galeria: ele tira fotos ali mesmo no curral, ou sobe as que já tinha no celular, e escolhe qual é a principal. Aos poucos ele foi montando uma coleção do rebanho. Se quiser ver como fica, o app está em [mirancho.elelier.com](https://mirancho.elelier.com/).

![Galeria de fotos de uma vaca no MiRancho, com botões para tirar foto ou enviar da galeria](/images/blog/rancho/app-galeria.webp "A galeria de cada animal: tirar foto, enviar as que você já tem e escolher a principal. Dados de exemplo.")

E quando alguém pergunta por um animal, ele já não precisa mandar a foto e depois escrever os dados à parte. Escolhe a foto, marca quais dados vão junto (nome, sexo, idade, raça, peso) e o app monta a imagem, pronta para mandar por onde ele quiser.

![Tela para compartilhar uma foto no MiRancho, com caixas para escolher quais dados vão na imagem](/images/blog/rancho/app-compartir.webp "Ele decide quais dados acompanham a foto. Dados de exemplo.")
![Foto de uma vaca com nome, sexo, idade, raça e peso escritos na parte de baixo](/images/blog/rancho/foto-compartida-canela.webp "O que recebe quem pergunta pela Canela. Dados de exemplo.")

E quando uma vaca foi coberta, ele anota ali mesmo, no curral, em vez de esperar chegar ao caderninho.

![Ficha de uma vaca no MiRancho com a foto, o curral, o estado de prenhez e o peso](/images/blog/rancho/app-ficha.webp "A ficha de cada animal: fotos, local, reprodução e peso. Dados de exemplo.")

## O que me importa nisso tudo

Eu poderia contar o MiRancho como um caso de produto: usuário, problema, solução. E sim, é isso. Mas o que mais me importa é outra coisa.

Eu queria que resolvesse um problema real do meu pai, de um jeito simples e até divertido. E que, quando ele abrisse o app para mostrar suas vacas para alguém, sentisse orgulho. Não do app: da fazenda dele.

Daí ficou para mim um jeito de trabalhar que hoje aplico em tudo. Antes de desenhar, eu vejo onde a informação vive de verdade. Muitas vezes ela não está no sistema: está num caderninho, na memória de alguém ou num chat. E a pergunta útil não é «como coloco isso no sistema?», mas «o que essa pessoa leva consigo quando as coisas acontecem?».

Se você cria gado e quer experimentar, o MiRancho está aberto em [mirancho.elelier.com](https://mirancho.elelier.com/) (em espanhol). E se na sua operação também existe um caderninho que nem sempre está onde as coisas acontecem, me conte onde o seu processo está travando. Vou adorar ouvir você.`,
    },
  },
  // {
  //   slug: 'mi-primer-articulo',
  //   date: '2026-12-01',
  //   tags: ['Producto', 'IA'],
  //   draft: true,
  //   es: {
  //     title: 'Título del artículo',
  //     summary: 'Resumen de una o dos líneas para el listado y la meta descripción.',
  //     body: `Primer párrafo.\n\n## Subtítulo\n\nOtro párrafo.`,
  //   },
  // },
];

export function getPublishedPosts(posts = blogPosts) {
  return posts
    .filter((post) => !post.draft)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug, posts = blogPosts) {
  return getPublishedPosts(posts).find((post) => post.slug === slug) || null;
}

export function getPostCopy(post, language = 'es') {
  return post[language] || post.es;
}

export const BLOG_LOCALE_PREFIX = { es: '', en: '/en', 'pt-br': '/pt-br' };

// Rutas del blog por idioma: /blog/, /en/blog/, /pt-br/blog/ (y /<slug>/ para cada artículo).
export function blogPath(language = 'es', slug) {
  const prefix = BLOG_LOCALE_PREFIX[language] ?? '';
  return slug ? `${prefix}/blog/${slug}/` : `${prefix}/blog/`;
}

// Idioma en que está escrito el texto que se va a mostrar (puede caer a español).
export function postContentLanguage(post, language = 'es') {
  return post[language] ? language : 'es';
}

export const BLOG_LANGUAGES = ['es', 'en', 'pt-br'];

export function postLanguages(post) {
  return BLOG_LANGUAGES.filter((lang) => post[lang]);
}

export function readingMinutes(post, language = 'es') {
  const copy = getPostCopy(post, language);
  const words = String(copy.body || '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(isoDate, language = 'es') {
  const tag = { es: 'es-MX', en: 'en-US', 'pt-br': 'pt-BR' }[language] || 'es-MX';
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export default blogPosts;
