// Instanciar un socket
const socket = io()
let user = ""

//socket.emit('mensajeCliente', 'usando server como cliente!')

/* socket.on('solo-actual', dataServer => {
    console.log(dataServer)
}) 

socket.on('todos-menos-actual', dataServer => {
    console.log(dataServer)
}) 

socket.on('todos', dataServer => {
    console.log(dataServer)
}) */

/* socket.on('enviar-mensajes-cliente', data => {
    console.log(data)
})

const input = document.querySelector('#text')
const msj = document.querySelector('#mensajes')

input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        socket.emit('message', input.value)
        input.value = ""
    }
})

socket.on('recibir-mensajes-cliente', messagesArray => {
    console.log(messagesArray)
    let mensajes = ''
    messagesArray.forEach(mensaje => {
        mensajes += `<ul> ${mensaje.id} dice: ${mensaje.message} </ul>`
    });
    msj.innerHTML = mensajes
}) */

Swal.fire({
    title: 'Indicar usuario',
    input: 'text',
    text: 'Ingresar nombre de usuario:',
    allowOutsideClick: false,
    inputValidator: value => {
        return !value && 'Necesitas un usuario para continuar!'
    }
    // icon: 'success'
}).then(result => {
    user = result.value
    console.log(user)
})

let chatBox = document.querySelector('#chatBox')
chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        // Para eliminar los espacios por si alguien no pone nada
        if(chatBox.value.trim().length > 0){
            //console.log(user, chatBox.value )
            socket.emit('message', {user, message: chatBox.value})
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', messagesArray => {
    let messageLogs = document.querySelector('#messageLogs')    
    let mensajes = ''
    messagesArray.forEach(mensaje => {
        mensajes += `${mensaje.user} dice: ${mensaje.message} <br>`
    });
    messageLogs.innerHTML = mensajes
})
