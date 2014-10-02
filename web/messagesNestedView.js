/// <reference path="core.helper.js" />

var messagesNestedView = {
    messages: [],
    show: function () {
        var body = document.getElementById("body_of_nested_messages");

        if (body == null) {
            body = document.createElement("ul");
            body.setAttribute("id", 'body_of_nested_messages');
            document.body.appendChild(body);
        }

        var total_messages = this.messages.length;
        var idented_messages = []; //ids que já foram identados
        var that = this;

        helper.empty(body);
       
        for (var i = 0; i < total_messages; i++)
        {
            var message = this.messages[i];
            if (idented_messages.some(function (e) { return (e.id == message.id); }))
                continue;

            
            var li = helper.create_message_li(message);

            if (message.children !== undefined &&
                message.children.length > 0)
            {
                li.appendChild(create_ul_children(message));                
            }

            body.appendChild(li);
        };

        function create_ul_children(message)
        {
            var ul = document.createElement('ul');

            for (var i = 0; i < message.children.length; i++)
            {
                var child = message.children[i];

                idented_messages.push(child);

                var li = helper.create_message_li(child);

                if (child.children !== undefined &&
                    child.children.length > 0)
                {
                    var nested_ul = create_ul_children(child);
                    li.appendChild(nested_ul);
                }
                ul.appendChild(li);
            }
            return ul;
        }
    }
}