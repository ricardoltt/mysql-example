require('dotenv').config();
const port = process.env.PORT;
const db = require('./server');

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/user', async (ctx) => {
    ctx.body = await db.getUsers();
});

router.post('/user', async (ctx) => {
    const { username } = ctx.request.body
    console.log(username)
    const postedUser = await db.postUser(username)
    ctx.body = postedUser
});

app
    .use(require('koa-body')())
    .use(router.allowedMethods(['GET', 'POST']))
    .use(router.routes());

if (!port) {
    port = 3000
}

app.listen(port, async () => {

    try {
        console.log(`Listening at http://localhost:${port}`);

    } catch (err) {
        console.error(err);
    }

});