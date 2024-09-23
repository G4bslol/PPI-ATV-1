import express from 'express';
import auth from './auth/auth.js';
import { validateAuth } from './auth/auth.js'
import session from 'express-session';

const host = '0.0.0.0';
const port = 3333;
const app = express();


app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}))
 
app.use(express.static('./public', (req, res) => {
    res.send('Pagina não encontrada')
}))

app.get('/detalhes1', (req, res) => {
    res.redirect('/details.html')
})

app.post('/login', auth)

app.use((req, res) => {
    res.redirect('/main.html')
})

app.use(validateAuth, express.static('./private'))

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`)
}) 