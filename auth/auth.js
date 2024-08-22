export default function auth(req, res) {
    const user = req.body.user
    const password = req.body.password

    if (user == 'admin' && password == 'admin') {
        req.session.auth = true
        res.redirect('/menu.html')
    } else {
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Falha no login</title>');
        res.write('<meta charset="utf-8">');
        res.write('</head>');
        res.write('<body>');
        res.write('<p>Usuário ou senha inválidos</p>');
        res.write('<a href="/login.html">Voltar para tela de login</a>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
}

export function validateAuth(req, res, nextStep){
    //HTTP ser um protocolo stateless
    //Para permitir que o nosso servidor tenha memória, será preciso fazer uso do conceito de sessão para dar ao servidor capacidade de memorizar, com quem ele está conversando

    if(req.session.auth != undefined && req.session.auth == true) {
        nextStep()
    } else {
        res.redirect('/main.html')
    }
}

export function logout(req, res) {
    req.session.auth = undefined;
    res.redirect('./main.html')
}