const formEvent = document.getElementById("formEvent");
formEvent.onsubmit = validateFields;
const UrlApi = "http://localhost:4000/events"
searchAllEvents()

var reasonAction = "CADASTRAR";

function recordEvent() {
    const eventObject = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        local: document.getElementById('local').value,
        date: document.getElementById('date').value,
        ticketValue: document.getElementById('ticketValue').value,
    }

    fetch(UrlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObject)
    }).then((res) => {
        return res.json();
    }).then((resAPI) => {
        if (resAPI.status == true) {
            showMessage(resAPI.message, 'green')
        } else {
            showMessage(resAPI.message, 'red')
        }
    }).catch((erro) => {
        showMessage(erro, '#DAA520')
    });
}

function selectEvent(title, description, local, date, ticketValue, motivo) {
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('local').value = local;
    document.getElementById('date').value = date;
    document.getElementById('ticketValue').value = ticketValue;

    reasonAction = motivo

    const buttonConfirm = document.getElementById('confirmButton');
    if(reasonAction == 'EDITAR'){
        buttonConfirm.innerHTML = 'EDITAR'
    }else if (reasonAction == "EXCLUIR"){
        buttonConfirm.innerHTML = 'EXCLUIR'
    }
}

function deleteEvent() {
    fetch(UrlApi, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: document.getElementById('title').value })
    }).then((res) => {
        return res.json()
    }).then((resAPI) => {
        if (resAPI.status == true) {
            showMessage(resAPI.message, 'green')
        } else {
            showMessage(resAPI, 'red')
        }
    }).catch((erro) => {
        showMessage(erro, '#DAA520')
    })
}

function updateEvent() {
    const eventObject = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        local: document.getElementById('local').value,
        date: document.getElementById('date').value,
        ticketValue: document.getElementById('ticketValue').value,
    }

    fetch(UrlApi, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObject)
    }).then((res) => {
        return res.json()
    }).then((resAPI) => {
        if (resAPI.status == true) {
            showMessage(resAPI.message, 'green')
        } else {
            showMessage(resAPI, 'red')
        }
    }).catch((erro) => {
        showMessage(erro, '#DAA520')
    })
}

function searchAllEvents() {
    fetch(UrlApi, { method: 'GET' })
        .then((res) => {
            return res.json()
        }).then((resAPI) => {
            if (resAPI.status == true) {
                displayEvents(resAPI.listaEventos)
            } else {
                showMessage(resAPI.message, 'red')
            }
        }).catch((erro) => {
            showMessage(erro, '#DAA520')
        })
}

function validateFields(evento) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const local = document.getElementById('local').value;
    const date = document.getElementById('date').value;
    const ticketValue = document.getElementById('ticketValue').value;

    evento.stopPropagation();
    evento.preventDefault()

    if (title && description && local && date && ticketValue) {
        if (reasonAction == "CADASTRAR") {
            recordEvent()
        } else if (reasonAction == "EDITAR") {
            updateEvent()
            reasonAction = "CADASTRAR";
        } else if (reasonAction == "EXCLUIR") {
            deleteEvent()
            reasonAction = "CADASTRAR";
        }

        formEvent.reset();
        searchAllEvents()
        return true;
    } else {
        showMessage("Por favor, preencha todos os dados do formulário")
        return false
    }
}

function showMessage(message, color = 'white') {
    const divMessage = document.getElementById('message');
    divMessage.innerHTML = "<p style='color:" + color + ";'>" + message + "</p>";
    setTimeout(() => {
        divMessage.innerHTML = ""
    }, 5000);
}

function displayEvents(eventList) {
    if (eventList) {
        const tableEspace = document.getElementById('containerTabel');
        const table = document.createElement('table');
        const head = document.createElement('thead');

        head.innerHTML = `
        
            <tr>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>LOCAL</th>
                <th>DATE</th>
                <th>TICKET VALUE</th>
                <th>OPTIONS</th>
            </tr>
        
        `
        const body = document.createElement('tbody')
        for (const event of eventList) {
            const row = document.createElement('tr')
            row.innerHTML = `
            
                <td>${event.title}<td>
                <td>${event.description}<td>
                <td>${event.local}<td>
                <td>${event.date}<td>
                <td>${event.ticketValue}<td>
                <td>
                    <button onclick="selectEvent('${event.title}', '${event.description}', '${event.local}', '${event.date}', '${event.ticketValue}', 'EDITAR')">Alterar</button>
                    <button onclick="selectEvent('${event.title}', '${event.description}', '${event.local}', '${event.date}', '${event.ticketValue}', 'EXCLUIR')">Excluir</button>
                </td>

            `
            body.appendChild(row)
        }
        table.appendChild(head)
        table.appendChild(body)
        tableEspace.innerHTML = "";
        tableEspace.appendChild(table)



    } else {
        showMessage('Nenhum evento encontrado!', 'red')
    }
}