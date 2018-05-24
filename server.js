var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.send('ToDO API Root');
});

app.listen(port, function(){
	console.log('express is running at port: '+ port)
})