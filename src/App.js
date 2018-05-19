import React from 'react';
import List from './List.js';
import './App.css';
import { bake_cookie, read_cookie} from 'sfcookies';
export default class App extends React.Component {
	constructor(){
		super();
		this.state = {
			todos : [],
			text : '',
		}
		this.removeTodo = this.removeTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
	}

	componentDidMount() {
		this.setState({
			todos : read_cookie('todos'),
		})
	}

	handleChange = (e) => {
		this.setState({
			text : e.target.value,
		});
	}

	removeTodo(name) {
		 this.setState({
        todos: this.state.todos.filter(el => el !== name)
    }, ()=>bake_cookie('todos',this.state.todos))
	}

	updateTodo(name){
		let todosArr = this.state.todos;
		name.completed = true;
		for (let x = 0; x < todosArr.length; x++){
			if(todosArr[x] === name)
				todosArr[x] = name;
		}
		this.setState({todos:todosArr}, ()=>bake_cookie('todos',todosArr));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		document.getElementById('form').reset();

		if(this.state.text.length < 1)
			return;
	
		let newTodo = {
			id: Date.now(),
			text: this.state.text }

		this.setState({
			todos : this.state.todos.concat(newTodo),
			text : '',
		}, () => bake_cookie('todos', this.state.todos))

	}

	render(){
		return(
			<div className="columns is-multiline  has-text-centered">
				<div className="column has-text-centered is-offset-one-quarter is-half">
					<form id="form" className="has-text-centered" onSubmit={this.handleSubmit}>
						<input placeholder="What do you have pending?" className="input is-rounded" type="text" onChange={this.handleChange}/>
						<div className="column has-text-centered is-offset-one-quarter is-half">
						</div>
						<button className="is-success button">Add ToDo </button>
					</form>
				</div>			
			
				<div className="column content has-text-centered is-offset-one-quarter is-half">
					<List updateTodo={this.updateTodo} removeTodo={this.removeTodo} todos={this.state.todos} />
				</div>
			</div>
		)
	}
}
