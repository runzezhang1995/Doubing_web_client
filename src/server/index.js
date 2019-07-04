import express from 'express';
import bodyParser from 'body-parser';
import api from './api/index';
import website from './website/index';
import https from 'https';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/templates');

const isProduction = process.env.NODE_ENV === 'production';
app.use(express.static('build/frontend'));
app.use(express.static('public'));




app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api', api);
app.use('/', website);


app.use((req, res) => {
    res.status(404).render('react', {
        jsHost: global.jsHost,
        title: 'Error (404)',
        message: "The page you're looking for doesn't exist.",
    });
});



// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });


// app.post('/', function (req, res) {
//     res.send('Hello World2!');
// });



const port = 1551;

global.jsHost = '';//'http://localhost:9002';
global.jsHost = 'http://localhost:9002';

global.requestIdToResolve = new Map();

https
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
    console.log("Run 'yarn run wds' in another terminal.");
});