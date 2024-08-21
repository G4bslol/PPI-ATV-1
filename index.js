import express from 'express';
import auth from './auth/auth.js';
import { validateAuth, logout } from './auth/auth.js'
import session from 'express-session';

const host = '0.0.0.0' //todas as interfaces de rede disponíveis
const port = 3000 // em um computador há diversos programas sendo executados, e cada um é identificado pela porta
const app = express()

//Biblioteca qs fará o tratamento dos parametros das requisições
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'segredo', //chave para criptografia
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}))

app.use(express.static('./plubic'))

app.get('/login', (req, res) => {
    res.redirect('/login.html')
})

app.get('/logout', logout)

app.post('/login', auth)

app.use(validateAuth, express.static('./private'))

//listen = escutar por requisições dos usuários
app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`)
}) 