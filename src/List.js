import React from 'react';

export default class List extends React.Component {

	handleClick = (e , todo) => {
		e.preventDefault();
		if(e.target.className === 'completed'){
			this.props.removeTodo(todo);
		}
		else{
			e.target.classList.add('completed');
			this.props.updateTodo(todo);
		}
	}

	render() {
		return (
			<div>
				<ul className="columns is-multiline has-text-left">
					{this.props.todos.map((todo)=>{
						if(todo.completed)
							return <div className="column is-half"><li className="is-size-5" id={todo.id} key={todo.id}><a className="completed" href="#" onClick={ (e) => this.handleClick(e,todo)}>{todo.text}</a></li></div>
						else
							return <div className="column is-half"><li className="is-size-5" id={todo.id} key={todo.id}><a href="#" onClick={ (e) => this.handleClick(e,todo)}>{todo.text}</a></li></div>
					})}
				</ul>
			</div>
		);
	}
}