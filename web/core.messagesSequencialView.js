/// <reference path="core.helper.js" />

var messagesSequencialView = {
    messages: [],
    show: function () {
        var body = document.getElementById("body_of_messages");
        helper.empty(body);
        for (var i = 0; i < this.messages.length; i++) {
            var message = this.messages[i];

            var li = helper.create_message_li(message);

           // li.appendChild(helper.create_tokens_p(message));
            body.appendChild(li);
        };       
    }
}