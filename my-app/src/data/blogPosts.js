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
