var manhattan = {
    by_message: function (message_a, message_b) {

        console.log("Correlacionando por Coseno " + message_a.id + " e " + message_b.id);
       
        var distance = Math.abs(message_a.weight - message_b.weight);

        console.log("distancia " + distance);

        return distance;
    },

}