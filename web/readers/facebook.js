var facebook = {
    text: "",
    rules: {
        userName: /^([A-Z][áãõéíóõúa-z0-9]+).([A-Z][áãõéíóõúa-z0-9]+)/

    },
    execute: function () {
        this.log("recebendo pelo leitor do facebook.");
        var lines = this.text.split('\n');
        var that = this;

        var messages = [];
        var message = null;
        var message_id = 1;

        this.log(lines.length + " linhas serÃ£o processadas.");

        lines_label:
            for (var i = 0; i < lines.length; i++) {
                var linha_atual = lines[i];
                var message = { texto: [], autor: "" };

                var userNameEncontrado = this.rules.userName.exec(linha_atual);

                if (userNameEncontrado == null)
                    continue;

                message.autor = userNameEncontrado;
                //tira o user name
                message.texto = linha_atual.replace(this.rules.userName, "");

                var proximos_linha = "";
                //enquanto nÃ£o encontrar o prÃ³ximo user name
                while (lines[i + 1] !== undefined && !this.rules.userName.exec(lines[i + 1])) {
                    //adiciono observo as prÃ³ximas linhas vÃ¡lida
                    if (!invalid(lines[i + 1]))
                        proximos_linha += " " + lines[i + 1];
                    i++;
                }

                if (proximos_linha.length > 0)
                    message.texto += " " + proximos_linha;

                message.children = [];
                message.id = message_id;
                messages.push(message);
                message_id++;
            }

        this.log(messages.length + " mensagens foram criadas a partir das linhas");

        return messages;

        function invalid(text) {
            var exp = /(Unlike|Like|ago)/g;
            return (text.match(exp) || text == "");
        }
    },

    log: function (message) {
        if (log !== undefined)
            log(message);
    }
};