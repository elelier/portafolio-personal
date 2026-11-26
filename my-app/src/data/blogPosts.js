// Artículos del blog. Cada post vive aquí como datos para que publicar uno nuevo
// sea agregar un objeto, sin tocar componentes.
//
// Formato del cuerpo (`body`): texto plano con párrafos separados por una línea en blanco.
//   "## Subtítulo"   -> subtítulo
//   "- elemento"     -> lista (líneas consecutivas)
//   "> cita"         -> cita
//   ![texto alternativo](/images/blog/foto.webp "Pie de foto")  -> imagen (sola en su párrafo)
//   **negritas**     -> negritas dentro del texto
//
// `draft: true` oculta el post del listado y de su URL pública.
// `cover` es la imagen del listado; `ogImage` (1200×630 jpg) es la que se ve al compartir el enlace.
// Al publicar uno nuevo, agrega `/blog/<slug>/` a INDEXABLE_SITEMAP_PATHS y a public/sitemap.xml.

const blogPosts = [
  {
    slug: 'app-rancho-de-mi-papa',
    date: '2026-11-26',
    tags: ['Producto', 'MiRancho', 'Historias'],
    cover: '/images/blog/rancho/portada-papa-corral.webp',
    ogImage: '/images/blog/rancho/portada-og.jpg',
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

Ahí se me ocurrió. Si lo único que siempre lo acompaña es el teléfono, ahí también podía vivir lo que hoy vive en la libreta. No para cambiar su forma de trabajar, sino para que la información estuviera con él en el momento en que la necesita.

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

Lo que más me gusta es que la usa a su manera. Cada vaca tiene su galería: le toma fotos ahí mismo en el corral, o sube las que ya traía en el celular, y escoge cuál es la principal. Poco a poco se ha ido armando una colección de su hato.

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

Si en tu operación también hay una libreta que no siempre está donde pasan las cosas, cuéntame dónde se está atorando. Me encantaría escucharte.`,
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

export function formatPostDate(isoDate, language = 'es') {
  const tag = { es: 'es-MX', en: 'en-US', 'pt-br': 'pt-BR' }[language] || 'es-MX';
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export default blogPosts;
