import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

var todoItems = [];
todoItems.push({ index: 1, value: "Learn React", done: false });
todoItems.push({ index: 2, value: "Grocery shopping", done: true });
todoItems.push({ index: 3, value: "Buy Boba Tea", done: true });

class ToDoList extends Component {
    render() {
        var items = this.props.items.map((item, index) => {
            return (
                <ToDoSingleItem key={index}
                    item={item}
                    index={index}
                    deleteItem={this.props.deleteItem}
                    markDone={this.props.markDone}
                />
            );
        });
        return (
            <ul
                className="list-group">
                {items}
            </ul>
        );
    }
}

class ToDoSingleItem extends Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }

    onClickClose() {
        var i = parseInt(this.props.index);
        this.props.deleteItem(i);
    }

    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markDone(index);
    }

    render() {
        var toDoClass = this.props.item.done ? "done" : "undone";
        return (
            <li className="list-group-item">
                <div className={toDoClass} >
                    <span className="glyphicon glyphicon-ok" onClick={this.onClickDone}> </span>
                    {this.props.item.value}
                    <button
                        type="button"
                        className="close"
                        onClick={this.onClickClose}
                    > <i className="glyphicon glyphicon-trash"></i>
                    </button>
                </div>
            </li>
        );
    }
}

class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.todoItemValue.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        var newItem = this.refs.todoItemValue.value;

        if (newItem) {
            this.props.addItem({ newItem });
            this.refs.form.reset();
        }
    }
    render() {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input className="form-control"
                    type="text" ref="todoItemValue" placeholder="Enter To Do..."
                />
                <button type="submit"
                    className="btn btn-default"> <i className="glyphicon glyphicon-plus"></i>
                </button>
            </form>
        );
    }
}

class ToDoHeader extends Component {
    render() {
        return (
            <div className="headerInfo">
                <h1 >
                    To Do List
                </h1>
                <table>
                    <tbody>
                        <tr className="row">
                            <th className="col-md-4"> Total </th>
                            <th className="col-md-4"> Remaining </th>
                            <th className="col-md-4"> Completed</th>
                        </tr>
                        <tr className="row">
                            <td className="col-md-4"> {todoItems.length} </td>
                            <td className="col-md-4"> {todoItems.filter((a) => { return a.done === false }).length} </td>
                            <td className="col-md-4"> {todoItems.filter((a) => { return a.done === true }).length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.markDone = this.markDone.bind(this);
        this.state = { todoItems: todoItems };
    }
    addItem(todoItem) {
        todoItems.unshift({
            index: todoItems.length + 1,
            value: todoItem.newItem,
            done: false
        });
        this.setState({ todoItems: todoItems });
    }
    deleteItem(itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({ todoItems: todoItems });
    }
    markDone(itemIndex) {
        if (todoItems.length > 0) {
            var todo = todoItems[itemIndex];
            todoItems.splice(itemIndex, 1);
            todo.done = !todo.done;
            todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
            this.setState({ todoItems: todoItems });
        }
    }
    render() {
        return (
            <div id="main">
                <ToDoHeader />
                <ToDoForm addItem={this.addItem} />
                <ToDoList items={this.props.initItems} deleteItem={this.deleteItem} markDone={this.markDone} />
            </div>
        );
    }
}



ReactDOM.render(<TodoApp initItems={todoItems} />, document.getElementById('app'));


