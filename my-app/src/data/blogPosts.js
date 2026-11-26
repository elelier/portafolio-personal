// Artículos del blog. Cada post vive aquí como datos para que publicar uno nuevo
// sea agregar un objeto, sin tocar componentes.
//
// Formato del cuerpo (`body`): texto plano con párrafos separados por una línea en blanco.
//   "## Subtítulo"   -> subtítulo
//   "- elemento"     -> lista (líneas consecutivas)
//   "> cita"         -> cita
//   **negritas**     -> negritas dentro del texto
//
// `draft: true` oculta el post del listado y de su URL pública.

const blogPosts = [
  {
    slug: 'app-rancho-de-mi-papa',
    date: '2026-12-01',
    tags: ['Producto', 'Operaciones', 'MiRancho360'],
    // Borrador: tiene huecos [EL: ...] por llenar. Quitar `draft` para publicar.
    draft: true,
    es: {
      title: 'Lo que cambió cuando diseñé una app para el rancho de mi papá',
      summary:
        'Un formulario que pedía la edad de cada animal me enseñó más sobre diseño de producto que muchos proyectos grandes. Lo que aprendí construyendo MiRancho360 para el trabajo real de mi papá.',
      body: `Una de las primeras decisiones que tomé en MiRancho360 parece mínima: dejar que alguien registre un animal aunque no sepa su edad.

En la primera versión del formulario, la edad era obligatoria. Tenía lógica. Si vas a llevar el control de un hato, la edad importa para casi todo: cuándo vacunar, cuándo una vaca puede cargar, cuánto vale un animal. Un sistema "bien hecho" debería pedirla. Eso pensaba yo desde el escritorio.

En el rancho, la realidad era otra. **[EL: cuenta el momento concreto en que esto se atoró. ¿Fue tu papá registrando un animal comprado sin papeles? ¿Una vaca que lleva años ahí y nadie recuerda cuándo nació? ¿Qué dijo él?]**

## El formulario pedía una certeza que no existía

Cuando un campo obligatorio pide un dato que la persona no tiene, pasan dos cosas. O la persona inventa un número para poder avanzar, o deja de usar la herramienta. Las dos son malas. La primera ensucia los datos sin que nadie se dé cuenta. La segunda te regresa a la libreta.

Y la libreta no es el enemigo. La libreta funciona porque acepta lo que sabes como lo sabes: "la pinta, la que compramos en la feria, ya está grande". Un sistema que no puede guardar eso con la misma facilidad pierde contra una hoja de papel, aunque tenga mejores reportes.

Así que cambié la pregunta. En vez de "¿cuál es la edad?", la app pregunta lo que la persona sí puede responder. **[EL: describe cómo quedó: ¿edad opcional? ¿edad aproximada o rango, tipo "becerro / joven / adulto"? ¿se puede completar después?]**

## Diseñar para el dato que sí existe

Lo que me llevé de esa decisión va más allá del rancho:

- **Un campo obligatorio es una afirmación sobre el mundo.** Dice "esta información siempre existe en el momento de capturar". Si eso no es cierto, el sistema está mal, no el usuario.
- **Un dato aproximado vale más que un dato inventado.** "Adulto, más o menos 5 años" es honesto y útil. "01/01/2019" puesto para pasar la validación es peor que nada, porque parece verdad.
- **Completar después también es diseño.** Mucha información llega con el tiempo. Un buen registro deja huecos visibles y fáciles de llenar, en lugar de exigir todo de una vez.
- **Si la gente vuelve a la libreta, la libreta te está diciendo algo.** Vale la pena preguntar qué hace bien antes de intentar reemplazarla.

## Lo que vino después

Esa primera decisión cambió cómo miré el resto de la app. Registrar animales, lugares y movimientos desde el celular suena sencillo hasta que lo haces con la señal que hay, con las manos ocupadas y con la información a medias. **[EL: uno o dos ejemplos más de ajustes que salieron de situaciones reales: movimientos entre potreros, algo que tu papá hizo distinto a como lo imaginaste, algo que usaste tú y no funcionó.]**

Lo más valioso no fue una función. Fue ver a mi papá usarla y escuchar dónde se atoraba. **[EL: una frase o reacción suya que te haya cambiado una decisión, si te sientes cómodo compartiéndola.]**

## Por qué te cuento esto

Si diriges una operación o un producto, seguro tienes un formulario así en algún lado: un campo que alguien llena con "N/A", un sistema que la gente "usa" pero en paralelo a su Excel, un proceso donde la información real vive en un chat. No es flojera del equipo. Casi siempre es el sistema pidiendo una certeza que el trabajo no tiene.

Una prueba que puedes hacer mañana: toma tu formulario más importante y, por cada campo obligatorio, pregúntale a quien lo llena "¿qué tan seguido no sabes esto cuando estás capturando?". Las respuestas te van a decir dónde se están inventando datos.

Si te reconoces en esto y quieres contarme dónde se está atorando tu proceso, escríbeme desde la página de contacto. Me encanta este tipo de problema.`,
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
