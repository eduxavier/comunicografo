/// <reference path="weightners/TFIDF.js" />
/// <reference path="algorithms/knn.js" />
/*
    Este modulo considera que todas as mensagem já estão disponíveis.
    Assim, ele simula o recebimento de mensagens numa sessão de bate papo online 
    Cada mensagem da coleção, é entendida como uma nova mensagem digitada.
    Assim ele:
        1 - recebe a mensagem
        2 - atualiza o modelo
        3 - calcula a frequência de termos
        4 - recalcula todas as correlações em virtude da nova mensagem e mudança no modelo
        5 - reconstrói a lista de mensagens relacionadas
*/
var categorizar =
{
    correlator:    {},        //responsável em coordenar o relacionamento entre as mensagens
    messages_raw:  [],        //mensagens já relacionadas
    weightner: {},            //responsável em criar uma métrica para a mensagem
    messages_correlated: [],  //contém a lista de mensagens já relacionadas
    offset: -1,
    similarity_measure: 1,
    run: function ()
    {
        var that = this;
        setup();
        /*
            A cada mensage, deve se:
               1 - Calcular seu peso
               2 - checar correlacionamentos com mensagens anteriores
            Considerações
               1 - O modelo que define o peso da mensagem é atualizado
                   a cada mensagem nova, por isso, é necessário refazer
                   todas as relações a cada nova mensagem
        */
        var categorized_messages = [];
        for (var i = 0; i < this.messages_raw.length; i++)
        {            
            //responsável em criar o peso do novo documento
            this.weightner.add(this.messages_raw[i]);

            categorized_messages.push(this.messages_raw[i]);
        }
        
        //responsável em definir o modo como as mensagens serão relacionadas
        this.correlator.offset = this.offset;
        this.correlator.similarity_measure = this.similarity_measure;
        this.correlator.run(categorized_messages);

        this.messages_correlated = this.correlator.messages;

        function setup()
        {            
            that.weightner = TFIDF;
            that.correlator = knn;
        }
    }
}