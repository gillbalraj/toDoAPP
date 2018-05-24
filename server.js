var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'call to ask for tire-change & balancing',
	completed: false
}, {
	id: 2,
	description: 'book an appointment for tire change',
	completed: false
}, {
	id: 3,
	description: 'decide your dinner menu',
	completed: true
}];

app.get('/', function(req, res){
	res.send('To-DO API Root hits');
});

// get todos

app.get('/todos', function(req, res){
	res.json(todos);
})

//get todos by id

app.get('/todos/:id', function(req, res){

	var todoId = parseInt(req.params.id,10);
	var matchedTodo;

	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo = todo;
			}
		}) ;

		if(matchedTodo){
			res.json(matchedTodo);
		}else{
			res.status(404).send();
		}
});

app.listen(PORT, function(){
	console.log('express is running at port: '+ PORT)
})