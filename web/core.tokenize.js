String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };

var tokenize =
{
    useLogin:1,
 	reader: {},
 	stopWords: {
 					basic:/[\.|\"|\!|\?]/
 	},
    text:"",
 	execute: function ()
	{				
 	    var messages = this.reader.execute();

 	    var Stem = function (lng) {
 	        var testStemmer = new Snowball(lng);
 	        return function (word) {
 	            testStemmer.setCurrent(word);
 	            testStemmer.stem();
 	            return testStemmer.getCurrent();
 	        }
 	    };

		for (var i = 0; i < messages.length; i++) 
		{
		    var texto_total =  messages[i].texto;

		    switch (tokenize.useLogin) {
		        case 1:
		            texto_total =  messages[i].autor[0] + " " + messages[i].texto;
		            break;
		        case 2:
		            texto_total = messages[i].texto;
		            break;
		    }

		    var words = texto_total.split(' ');

		        messages[i].bag = [];

			for (var j = 0; j < words.length; j++) {

				//if (words[j].match(this.stopWords))
				 //   continue;

			    var word = words[j]
                            .toLowerCase()
                            .replace(/[(\!|\.|\,|\:|\%)|(0-9)]*/g, '');

			    word = word.replace(/[(\ã|\á|\â)]/g, 'a')
                            .replace(/(\é|\è|\ê)/, 'e')
                            .replace('í', 'i')
                            .replace(/(\ó|\õ|\ô)/, 'o')
                            .replace('ú', 'u')
                            .replace('ç', 'c')
                            .trim();
			    if (word == "" || word.length <= 2)
			        continue;

			    word = new Stem('portuguese')(word)

                if (!check_existance(messages[i], word))
                    messages[i].bag.push({ key: word, frequency: 1});
			};
		}
		function check_existance(message, word)
		{
		    if (message.bag === undefined)
		    {
		        message.bag = [];               
		        return false;
		    }

		    if (message.bag.length == 0)
		        return false;

		    for (var k = 0; k < message.bag.length; k++) {
		        if (message.bag[k] == word)
                {
		            message.bag[k].frequency++;
		            return true;
		        }       
		    }
            
		    return false;		        
		}
		return messages;		
	}
}