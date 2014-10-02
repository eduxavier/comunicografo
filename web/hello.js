/*
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/
console.log("carregando clusters de cores");
//var clusterfck = require("clusterfck");
//clusterfck

var colors = [
   [20, 20, 80],
   [22, 22, 90],
   [250, 255, 253],
   [0, 30, 70],
   [200, 0, 23],
   [100, 54, 100],
   [255, 13, 8]
];

console.log("executand kmeans");
var clusters = clusterfck.kmeans(colors, 3);
console.log("processo ok");
