const Koa = require('koa');
const app = new Koa();

const errorHandler = async (ctx, next) => {       //manejo de errores
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.expose ? err.message : 'Ha ocurrido un error !!!';
  }
}

app.use(errorHandler);      // manejo de errores para un elemento no presente

const jsonErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const isJson = ctx.get('Accept') === 'application/json';
    if (isJson) {
      ctx.status = err.status || 500;
      ctx.body = {
        error: `Un error ha ocurrido en estos momentos`
      }
    } else {
      throw err;
    } 
  }
}

app.use(jsonErrorHandler); // manejo de error usuario no autorizado

app.use(async ctx => {
  const user = 'anonymous';
  ctx.throw(401, 'Acceso de negado al recurso', { user });
});

const port = 3007;
app.listen(port, () => {
 console.log(`la aplicacion esta corriendo en el puerto ${port}`);
});