var consine = {
    by_message: function (message_a, message_b) {

        var divisor = message_a.weight * message_b.weight;
        var dividendo = Math.sqrt(Math.pow(message_a.weight, 2)) * Math.sqrt(Math.pow(message_b.weight, 2));

        var distance = divisor / dividendo;

        console.log("Correlacionando " + message_a.id + " e " + message_b.id);
        console.log("distancia " + distance);

        return distance;
    },

}