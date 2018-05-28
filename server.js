var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;


// an array to keep the data
var todos = [];
var todoNextId = 1;
app.use(bodyParser.json());

//GET todo/:id
app.get('/', function(req, res){
	res.send('To-DO API Root hits');
});

// get todos

app.get('/todos', function(req, res){
	res.json(todos);
});

//get todos by id

app.get('/todos/:id', function(req, res){

	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
		if(matchedTodo){
			res.json(matchedTodo);
		}else{
			res.status(404).send();
		}
});

//POST/todos
app.post('/todos', function(req, res){
	//using pick to only pick required data
	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0 ){
		return res.status(404).send();
	} 

	//trim extra spaces
	body.description = body.description.trim();
	//add an id field
	body.id = todoNextId++;
	//push body into array "todos"
	todos.push(body);

	res.json(body);
});
//delete unwanted resourcce
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});	
	if(!matchedTodo){
		res.status(404).send();
	}else{
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
})
//PUT /todos/:id
app.put('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if(!matchedTodo){
		return res.status(404).send();
	}
	//validations
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')){
			//bad
			return res.status(400).send();
	} else{
		//never provided the attributed, no problem
	}

	//validate the description
	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description;
	} else if(body.hasOwnProperty('description')){
			//bad
			return res.status(400).send();
	}
	//update data
	 _.extend(matchedTodo, validAttributes);
	 res.json(matchedTodo);
});

app.listen(PORT, function(){
	console.log('express is running at port: '+ PORT)
})