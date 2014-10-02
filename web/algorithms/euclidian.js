var euclidian = {
    by_message: function (message_a, message_b) {
        var value = Math.abs(message_a.weight - message_b.weight);
        var distance = Math.sqrt(value);

        console.log("Correlacionando " + message_a.id + " e " + message_b.id);
        console.log("distancia " + distance);

        return distance;
    },
    by_tokens: function (message_a, message_b) {
        var intersections = 0; //conta as interseções encontradas
        var sum = 0;           //soma os pesos dos termos da interseção

        var itemset_a = message_a.bag;
        var itemset_b = message_b.bag;

        for (var i = itemset_a.length - 1; i >= 0; i--) {
            for (var j = itemset_b.length - 1; j >= 0; j--) {
                if (itemset_a[i] == itemset_b[j]) {
                    sum = sum + Math.pow(Math.abs(itemset_b[i].weight - itemset_a[i].weight), 2);
                    intersections++;
                    continue;
                }
            }
        }
        if (intersections == 0)
            return 0;

        return Math.Sqrt(sum);
    }
}