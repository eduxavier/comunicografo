
var messagesView = {
	messages : [],
	show: function ()
	{
		var body = document.getElementById("body_of_messages");

		for (var i = 0; i < this.messages.length; i++) 
		{
			var message =  this.messages[i];
			var li      = create_original_message_view();
		    
			(message.children.length == 0) ?
                    show_no_previus_relationship() :
                    identify_relationships();

			li.appendChild(adicionar_tokens());			
			body.appendChild(li);			
		};

		function show_no_previus_relationship()
		{
		    var sem_relacao = document.createElement('p');
		    sem_relacao.appendChild(document.createTextNode("nao tem relacao"));
		    li.appendChild(sem_relacao);
		}

		function create_original_message_view()
		{
		    var li = document.createElement('li');

		    var usuario = document.createElement('span');
		    usuario.setAttribute("class", "usuario");
		    usuario.innerText = "["+ message.id  +"] " + message.autor[0];

		    var mensagem = document.createElement('span');
		    mensagem.setAttribute("class", "mensagem");
		    mensagem.innerText = message.texto;

		    li.appendChild(usuario);
		    li.appendChild(mensagem);

		    return li;
		}

		function identify_relationships()
		{
		    var relationships = document.createElement('ul');

		    for (var r = 0; r < message.children.length; r++) {

		        var relation = document.createElement('li');
		        relation.appendChild(document.createTextNode(message.children[r].id));
		        relationships.appendChild(relation);
		    }
		    li.appendChild(relationships);
		}

		function adicionar_tokens()
		{
		    var body_of_bag = document.createElement('p');
		    var token = document.createElement('span');
		        token.appendChild(document.createTextNode("tokens: "));

		    body_of_bag.appendChild(token);

		    for (var j = 0; j < message.bag.length; j++)
		        body_of_bag.appendChild(document.createTextNode(message.bag[j] + ", "));

		    body_of_bag.setAttribute("class", "tokens");

		    return body_of_bag;
		}
	}
}