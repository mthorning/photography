import serve from 'serve-static';
import polka from 'polka';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
    .use(
        compression({threshold: 0}),
        serve('static', {dev}),
        bodyParser.json(),
        sapper.middleware()
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
