const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('Tiempo de inicio en: ', Date.now()) // primer comentario en realidad
  await next()
})

app.use(async (ctx, next) => {
  console.log("Soy el primer comentario") // comentarios capa exterior anidada
  await next()
  console.log("Soy el último comentario")
})

app.use(async (ctx, next) => {
  console.log("Soy el segundo comentario") // comentarios capa interior anidada
  await next()
  console.log("Soy el tercer comentario")
})

app.use(async ctx => {
  console.log('Ejemplo de promesas y asincronia con KoaJs') // comentario como elemento central
  ctx.body = 'Ejemplo de promesas y asincronia con KoaJs'
})

app.listen(3008)