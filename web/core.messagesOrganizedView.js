/// <reference path="core.helper.js" />

var messagesOrganizedView = {
    messages: [],
    show: function ()
    {
        var body = document.getElementById("body_of_organized_messages");

        if (body == null)
        {
            body = document.createElement("ul");
            body.setAttribute("id", 'body_of_organized_messages');
            
        }

        var total_messages   = this.messages.length;
        var idented_messages = []; //ids que já foram identados
        var that = this;

        helper.empty(body);       

        for (var i = 0; i < total_messages; i++) {

            if (idented_messages.some(function (e) { return (e == i); }))
                continue;

            var message  = this.messages[i];
            var li       = helper.create_message_li(message);
            var children = document.createElement('ul');

            //for (var c = i - 1; c >= 0; c--) {
            for (var c = i + 1; c <= total_messages; c++) {
                var next_message = this.messages[c];
                if (next_message !== undefined &&
                    next_message.parent !== undefined &&
                    next_message.parent.id == message.id)
                {
                    idented_messages.push(c);
                    children.appendChild(helper.create_message_li(next_message));                    
                }                    
            }

            if (children.childNodes.length > 0)
                li.appendChild(children);

            body.appendChild(li);
        };
    }
}