const socket = io('http://127.0.0.1:3000');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#message_form");
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.forms["message_form"]["msg"].value;
        document.forms["message_form"]["msg"].value = '';
        socket.emit('new_message', {msg});
    });
});


function updateMessagesOnScreen(msgs){
    const div_msgs = document.querySelector('#messages');

    let list_msgs = '<ul>';
    msgs.forEach(msg => {
        list_msgs += `<li>${msg}</li>`;
    });
    list_msgs += '</ul>';

    div_msgs.innerHTML = list_msgs;

}

socket.on('update_messages', (messages) => {
    
    updateMessagesOnScreen(messages);
});


