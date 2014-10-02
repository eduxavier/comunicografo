var distance =
{
    offset: 3,
    level: 0.0,
    knn_divisor: 1,
    log: function (message)
    {
        if (this.log !== undefined)
            this.log(message);
    },
	check: function (messages)
	{
	    this.log("Checando as relações entre as mensagens ");
	    this.log("Configurações usadas ")
	    this.log("------------------------------")
	    this.log("distance.offset " + this.offset);
	    this.log("distance.level " + this.level);
	    this.log("distance.knn_divisor " + this.knn_divisor);
	    this.log("------------------------------")


		if (messages === undefined || messages.length == 0)
			return;

		var total = messages.length - 1;
		var relationship_level = 0.0;

		actual_message_loop:
		for (var i = total; i >= 0 ; i--) {
			var message = messages[i];
			var offset_achieved = 0;
			var rated = [];

			console.log("Analisando mensagem " + message.id);
			
			for (var j = i - 1; j >= 0; j--, offset_achieved++)
			{
				var previeus_message = messages[j]

				if (previeus_message === undefined) {
					console.log("mensagem não definida");
					break;
				}
				relationship_level = 0;
				console.log("Mensagem anterior " + previeus_message.id);

				if (this.offset != 0 && this.offset == offset_achieved)
					break;

				//avoid messages which already has a parent
				if (previeus_message.parent !== undefined)
					return;

				//so for parentless messages, try the relationship
				if (accepted_distance(message.bag, previeus_message.bag))
					rated.push({ id: previeus_message.id, rate: relationship_level });

				console.log("relationship_level+ " + relationship_level);
			}

			//elege a melhor relação entre mensagens
			if (rated.length > 0)
			{
				rated = rated.sort(function (a, b) {
					if (a.rate > b.rate)
						return -1

					return 1;
				});

				var rated_message = {};
				var j = 0;
				//look for the best rated object to set its parent 
				for (j = i - 1; j >= 0; j--)
				{
					rated_message = messages[j];
					if (rated_message.id == rated[0].id)
					{
					    rated_message.rate = rated[0].rate;
						rated_message.children.push(message);
						break;
					}
				}
				message.parent	 = rated_message;				
				//now set the parent with the child
				message.children.push(messages[j]);
			}
		}


		function accepted_distance(itemset_a, itemset_b) {
			relationship_level = calculate_distance(itemset_a, itemset_b);

			console.log(relationship_level);

			if (relationship_level >= distance.level)
				return true;

			return false;
		}

		function calculate_distance(itemset_a, itemset_b) {
			var intersections = 0;

			for (var i = itemset_a.length - 1; i >= 0; i--) {
				for (var j = itemset_b.length - 1; j >= 0; j--) {
					if (itemset_a[i].key == itemset_b[j].key) {
						intersections++;
						continue;
					}
				}
			}

			var total_itemset = 0;

			switch (distance.knn_divisor) {
			    case 2:
			        total_itemset = itemset_b.length;
			        break;
			    case 3:
			        total_itemset = Math.max(itemset_a.length, itemset_b.length);
			        break;
			    case 4:
			        total_itemset = Math.min(itemset_a.length, itemset_b.length);
			        break;
			    default:
			        total_itemset = itemset_a.length;
			        break;
			}
			

			//return (intersections / total_itemset).toFixed(4);
			return intersections;
		}
	}
}