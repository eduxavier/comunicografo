var TFIDF =
{
    keywords: [],
    messages: [],
    find_key: function(key)
    {
        for (var k = 0; k < this.keywords.length; k++)
            if (this.keywords[k].key == key)
                return this.keywords[k];
        return null;
    },
    get_total_documents: function()
    {
        return this.messages.length;
    },
    add: function (message)
    {
        var that = this;

        message.weight = 0;

        this.messages.push(message);

        this.update_document_model(message);

        //atualiza o peso de todas as mensagens
        this.update_messages_weight();

        return message;
    },
    //atualiza o peso das mensagens toda vez que chegar uma nova mensagem
    //esta função assume o fato de que o dicionário de palavras e suas frequências poderão
    //alterar a relvancia da palavra como um todo.
    //então, a partir do momento que a mensagem tem um peso, esse peso é dinamico em relação
    //ao montante geral
    update_messages_weight: function()
    {
        var that = this;

        for (var i = 0; i < this.messages.length; i++)
        {
            calculate_terms_weight(this.messages[i]);
        }

        function calculate_terms_weight(message) {
            /*
                TF-IDF_Weigth(W,D) = TermFreq(W,W) . log (N / docFreq(W)) 
    
                TermFreq(W,D)  = frequência de W no documento D
                N              = total de todos documentos
                DocFreq(W)     = quantidade de documentos que contém a palavra W
            */
            var weight_sum = 0;
            var total_documents = that.messages.length;

            for (var i = 0; i < message.bag.length; i++) {
                var key = message.bag[i];
                var key_at_document_level = that.find_key(key.key)

                if (key_at_document_level == null) {
                    key.weight = 0.0;
                    weight_sum = key.weight.toFixed(4);
                    continue;
                }

                var document_ratio = total_documents  / key_at_document_level.documents.length;
                key.weight = (key.frequency * Math.log(document_ratio));
                weight_sum += key.weight;
            }
            message.weight = weight_sum.toFixed(4);
        }
    },
    /*
        Atualiza o modelo com as informações da mensagem
    */
    update_document_model: function (message)
    {
        var that = this;

        for (var j = 0; j < message.bag.length; j++)
            apure(message.bag[j], message);

        function apure(token, message) {
            var total = that.keywords.length;
            var counted = false;

            for (var t = 0; t < total; t++) {
                if (token.key == that.keywords[t].key)
                {
                    that.keywords[t].documents.push(message);
                    that.keywords[t].frequency += token.frequency;
                    return;
                }
            }
            var new_key = {
                key: token.key,
                frequency: token.frequency,
                documents: [message]
            }
            that.keywords.push(new_key);
        }
    }
}