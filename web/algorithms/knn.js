/// <reference path="euclidian.js" />
/// <reference path="cosine.js" />
/// <reference path="Manhattan.js" />


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}



var knn = {
    similarity_measure: 1,  //calculo de similaridade da correlação: 1 cosine, 2 manhattan, 3 others
    messages: [],  //mensagens que já foram correlacionadas anteriormente
    minimum_distance: 0.5,
    nested: false,
    assignments: 0,
    offset: -1,
    log: function (message) {
        if (this.log !== undefined)
            this.log(message);
    },
    find_message: function(id)
    {
        for (var i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id == id)
                return this.messages[i];
        }
        return null;
    },
    run: function (messages)
    {
        //log("Checando as relações entre as mensagens por KNN ");
        /*
            Dado uma mensagem lida
                Monta modelo
                Calcula peso da mensagem
                Verifica mensagens vizinhas (anteriores)
                    Em cada vizinho, calcula similaridade dos pesos
                Escolha melhor similaridade
                Anexa-se a mensagem
            Pula para próxima mensagem
        */
        var that = this;

        var messages_raw = [];
        for (var i = 0; i < messages.length; i++) {
            messages_raw.push(clone(messages[i]));
        }

        
        if (messages_raw.length == 1)
            return;
        /*
            O calculo de distâncias entre visinhos obedece a uma ordem cronológica
            Os primeiros documentos, ou primeiras mensagens, tem prioridade para definir como pais.
            Por exemplo, a 10 mensagem não pode ser pai da 5 mensagem.
            A medida para evitar esse erro de relacionamento considera o seguinte:
            1 - O calculo de correlação é disparado de trás para frente
            2 - Se uma mensagem Xn tiver distância considerável com alguma mensagem anterior Xy
                Xy é considerada pai desta mensagem.
                No entanto, se Xy, já tiver relacionada a uma outra mensagem Xp
                Xp é considerada pai da mensagem Xy
                Xy é adicionada posteriormente a Xp 
        */

        this.messages = [];

        for (var i = 1; i < messages_raw.length; i++) 
        {
            var actual_message = messages_raw[i];

            var calculated_messages = find_correlation_at_neighborhood(
                        actual_message, //mensagem em questão
                        i - 1,       // posição das mensagens anteriores
                        messages_raw     //todas as mensagens
                        );

            define_relationship(actual_message, calculated_messages);
        }

        function find_correlation_at_neighborhood(actual_message, neighborhood_index, messages_raw)
        {
            //dado uma mensagem X, verica qual mensagem X - N é mais similar de X, agrupa
            var calculated_messages = [];

            if (that.offset <= 0)
            {
                //gera as similaridades de trás pra frente
                for (var i = neighborhood_index; i >= 0; i--)
                {
                    var distance = that.measure(actual_message, messages_raw[i]);

                    calculated_messages.push({ message: messages_raw[i], distance: distance });
                }
            }
            else
            {
                var offset_reached = 0;
                for (var i = neighborhood_index; i >= 0; i--)
                {                    
                    var distance = that.measure(actual_message, messages_raw[i]);

                    calculated_messages.push({ message: messages_raw[i], distance: distance });

                    if (offset_reached == that.offset)
                        break;

                    offset_reached++;
                }
            }



            return calculated_messages;
        }

        function define_relationship(message, neighborhood)
        {
            var neighbor = choose_best_at(neighborhood);

            if (neighbor != null)
            {
                console.log("Vizinho mais próximo " + neighbor.message.id);
                //procura o neighbor na lista de mensagens correlacionadas
                var neighbor_as_group = that.find_message(neighbor.message.id);

                if (neighbor_as_group == null) //o primeiro item não está na lista
                {
                    that.messages.push(neighbor.message);
                    neighbor_as_group = that.messages[0]; // hack it ;)
                }

                //cria o relacionamento
                create_relashionships(message, neighbor_as_group);
            }                    

            //adiciono a mensagem na lista de mensagens calculadas
            that.messages.push(message);
        }

        function create_relashionships(message, neighbor)
        {
            /*
                Responsável em criar o relacionamento.
                Considerações:
                1 - Se a relação da mensagem nunca existiu, 
                    o visinho mais próximo torna-se pai da nova mensagem
    
                2 - Caso o visinho mais próximo já tenha um pai, a mensagem é adicionada
                    sequencialmente, na lista de filhos deste pai existente.
            */
            if (neighbor.parent !== undefined && neighbor.parent != null)
            {
                var root = {}

                //aninhar exatamente em baixo da mensagem correlata
                //aninha em baixo da mensagem pai
                //aninhar em baixo do root geral

                if (!that.nested)
                    root = neighbor;
                else
                    root = find_root(neighbor);

                if (root.children === undefined)
                    root.children = [];

                root.children.push(message);
                message.parent = root;
                that.assignments++;

                function find_root(message)
                {
                    if (message.parent == null || message.parent === undefined) //root finded
                        return message;
                    else
                    {
                        if (message.parent.parent == null || message.parent.parent === undefined)
                            return message.parent;

                        find_root(message.parent.parent);
                    }                        
                    return null;
                }
            }
            else
            {
                
                if (neighbor.children === undefined)
                    neighbor.children = [];

                message.parent = neighbor;
                neighbor.children.push(message);
                that.assignments++;
            }
        }

        function choose_best_at(neighborhood)
        {
            neighborhood = neighborhood.sort(function (a, b) {
                //return a.distance > b.distance ? -1 : 1;
                return a.distance - b.distance;
            });

            var accepted_distance = false;
            var posicao = 1;
            while (!accepted_distance)
            {
                var message = neighborhood[neighborhood.length - posicao];

                if (message === undefined)
                    return null;

                if (minimal_distance(message.distance))
                {
                    return message;
                }
                else
                {                    
                    posicao++;
                    accepted_distance = false;
                }

                if (posicao <= neighborhood.length)
                    return null;
            }

            return null;
        }
        function minimal_distance(distance)
        {
            switch (that.similarity_measure)
            {
                case 3:
                    return (distance >= 0.0);
                case 4:
                    return (distance >= 0.0);
                default:
                    return ( Math.abs(distance) > 0);
            }
        }
    },
    measure: function (message_a, message_b) {
        switch (this.similarity_measure)
        {
            case 1:
                console.log("Similaridade EUCLIDIANA por mensagens");
                return euclidian.by_message(message_a, message_b);
            case 2:
                return euclidian.by_tokens(message_a, message_b);
            case 3:
                console.log("Similaridade COSSENO por mensagens");
                return consine.by_message(message_a, message_b);
            case 4:
                console.log("Similaridade MANHATTAN por mensagens");
                return manhattan.by_message(message_a, message_b);
        }
        return 0;
    },
    measure_distance_cosine_message: function (message_a, message_b)
    {
        var media_a = message_a.weight;
        var media_b = message_b.weight;

        var value = Math.abs(message_a.weight - message_b.weight);

        return Math.sqrt(value);
    }
}