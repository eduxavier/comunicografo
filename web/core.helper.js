var helper =
{
    empty: function (element)
    {
        for (var i = element.children.length-1; i >= 0; i--)
            element.removeChild(element.children[i]);
    },
    get_checked_radio: function(radio_name)
    {
        var radios = document.getElementsByName(radio_name);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked)                 
                return radios[i].value;
        }
        return 0;
    },
    create_message_li: function (message)
    {
        var li = document.createElement('li');

        var usuario = document.createElement('span');
        usuario.setAttribute("class", "usuario");
        usuario.innerText = "[" + message.id + "] " + message.autor[0];

        var mensagem = document.createElement('span');
        mensagem.setAttribute("class", "mensagem");
        mensagem.innerText = message.texto;


        if (message.rate !== undefined) {
            var rate = document.createElement('span');
            rate.innerHTML = "Distance: " + message.rate;
            rate.setAttribute("class", "rate");
            mensagem.appendChild(rate);
        }

        li.appendChild(usuario);
        li.appendChild(mensagem);

        


        return li;
    },
    create_tokens_p: function (message)
    {
        var body_of_bag = document.createElement('p');
        var token = document.createElement('span');
        token.appendChild(document.createTextNode("tokens: "));

        body_of_bag.appendChild(token);

        for (var j = 0; j < message.bag.length; j++)
            body_of_bag.appendChild(document.createTextNode(message.bag[j].key + ", "));

        body_of_bag.setAttribute("class", "tokens");

        return body_of_bag;
    }
}