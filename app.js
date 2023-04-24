const Koa = require('koa');
const app = new Koa();

const TiempoDeRespuesta = async (ctx, next) => {
  const { method, path } = ctx.request;
  const start = Date.now();
  await next();
  const TiempoMedido = (Date.now() - start) / 1000; // entrega del tiempo en segundos
  console.log(`${method} La respuesta de ${path} ha tomado ${TiempoMedido}s`);
};


app.use(TiempoDeRespuesta); //es la confeccion con el middleware

app.use(async ctx => {
  ctx.body = 'Ejemplo de middleware';
});


app.listen(3006, () => {
  console.log('El server esta corriendo en el puerto 3006') //indica que ha iniciado la aplicacion
});