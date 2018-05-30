var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<meta charset="UTF-8"><h1>Node.js</h1><h2>这是h2</h2>');
    res.end('<p>Hello World</p>');
}).listen(3000);
console.log('Http server is listening at port 3000');