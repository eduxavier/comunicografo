/// <reference path="core.messagesOrganizedView.js" />
/// <reference path="core.messagesView.js" />
/// <reference path="messagesNestedView.js" />
/// <reference path="core.distance.js" />
/// <reference path="categorizar.js" />
/// <reference path="gabarito.js" />
/// <reference path="readers/facebook.js" />
/// <reference path="readers/pma_xml.js" />


var core =
{
    messages: [],
    algoritimo: 1,
    read: function ()
    {
        that = this;
        this.log("calculando distância entre as mensagens");
        var offset = parseInt(document.form_configuracao.offset.value);
        var similaridade = parseInt(helper.get_checked_radio("similaridade"));

        var distance_messages = this.get_messagas();
        var knn_messages      = this.get_messagas();

        //run_distance(distance_messages);
        run_knn(knn_messages);

        function run_distance(messages)
        {
            distance.offset         = offset;
            distance.level          = parseFloat(document.form_configuracao.distance_min.value);
            distance.knn_divisor    = helper.get_checked_radio("knn_divisor");
            distance.log            = core.log;
            
            distance.check(messages);

            that.log("peparando renderição do resultado");
            that.messages = messages;
            that.show(messagesSequencialView);
            that.log("processo finalizado com sucesso");
            that.show(messagesOrganizedView);
            gabarito.analse(messages);
        }

        function run_knn(messages)
        {
            categorizar.messages_raw = messages;
            categorizar.offset = offset;
            categorizar.similarity_measure = similaridade;
            categorizar.run();
            that.messages = categorizar.messages_correlated;
            that.show(messagesNestedView);            
            that.show(messagesSequencialView);
           // gabarito.analse(categorizar.messages_correlated);
        }
    },
    get_messagas: function ()
    {
        this.log("tokenizando o texto inteiro");

        var session_reader = choose_session_chat();
        session_reader.log = this.log;

        tokenize.reader = session_reader;
        tokenize.useLogin = parseInt(helper.get_checked_radio("distance_login"));

        return tokenize.execute();

        function choose_session_chat() {
            var session_chat_id = parseInt(helper.get_checked_radio("chat_session_type"));
            var session_reader = {};

            switch (session_chat_id) {
                case 1:
                    session_reader = facebook;
                    session_reader.text = document.getElementById("mensagem").value;
                    
                    break;
                case 2:
                    session_reader = facebook;
                    session_reader.text = document.getElementById("mensagem_2").value;
                    break;
                case 3:
                    session_reader = facebook;
                    session_reader.text = document.getElementById("mensagem_3").value;
                    break;
                case 4:
                    session_reader = pma_xml;
                    session_reader.text = "";
                    break;
                default:
                    alert("precisa definir o leitor da mensagem");
                    return;
            }

            return session_reader;
        }

        
    },
    organize: function()
    {
        this.log("organizando mensagens na tela.");
        this.show(messagesOrganizedView);
        this.log("fim do processo de organização de mensagens na tela.");
    },
    show: function (view)
    {
        this.log("processando " + this.messages.length + " mensagens.");
        view.messages = this.messages;
        view.log      = this.log;
        view.show();
    },
    log: function(message)
    {
        console.log(message);
    }
}


var Graphics =
{
    messages:[],
    draw  : function (canvas_id) 
    {
        var rooms_range = 1000;

        var distance = {
            min: 0,
            max: 0
        };

        var documents = {
            min: 0,
            max: 0
        };

        var areas_range = documents.max - documents.min;

        distance.min = this.messages.slice(0).sort(function (a, b) { a.distance > b.distance })[0];
        distance.max = this.messages.slice(0).sort(function (a, b) { a.distance < b.distance })[0];

        documents.min = 1;
        documents.max = this.messages.length;


        var canvas = document.getElementById(canvas_id);
        var ctx = canvas.getContext("2d");
        var width = 400;
        var height = 400;
        ctx.clearRect(0, 0, width, height);

        for (var i in this.messages) {
            ctx.save();
            ctx.fillStyle = 'green';

            //switch (this.nodes[i].type) {
            //    case 'apartment':
            //        ctx.fillStyle = 'red';
            //        break;
            //    case 'house':
            //        ctx.fillStyle = 'green';
            //        break;
            //    case 'flat':
            //        ctx.fillStyle = 'blue';
            //        break;
            //    default:
            //        ctx.fillStyle = '#666666';
            //}

            var padding = 40;
            var x_shift_pct = (width - padding) / width;
            var y_shift_pct = (height - padding) / height;

            var x = (this.messages[i].distance - distance.min) * (width / rooms_range) * x_shift_pct + (padding / 2);
            var y = (this.messages[i].id - documents.min) * (height / areas_range) * y_shift_pct + (padding / 2);

            y = Math.abs(y - height);

            ctx.translate(x, y);
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();


            /* 
             * Is this an unknown node? If so, draw the radius of influence
             */

            //if (!this.nodes[i].type)
            //{
            //    switch (this.nodes[i].guess.type) {
            //        case 'apartment':
            //            ctx.strokeStyle = 'red';
            //            break;
            //        case 'house':
            //            ctx.strokeStyle = 'green';
            //            break;
            //        case 'flat':
            //            ctx.strokeStyle = 'blue';
            //            break;
            //        default:
            //            ctx.strokeStyle = '#666666';
            //    }

            //    var radius = this.messages[i].distance * width;
            //    radius *= x_shift_pct;
            //    ctx.beginPath();
            //    ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            //    ctx.stroke();
            //    ctx.closePath();
            //}
            ctx.restore();
        }
    }
}
