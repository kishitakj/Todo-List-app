import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import about from './components/pages/about'
import axios from 'axios'


class App extends Component{

  state = {
    todos: [
      /*{
        id: uuid(),
        title: 'Take out the trash',
        completed: true
      },
      {
        id: uuid(),
        title: 'Dinner time',
        completed: true
      },
      {
        id:uuid(),
        title: 'Meeting with my boss',
        completed: false 
      }*/

   ] 

} 

componentDidMount(){

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res=> this.setState({ todos: res.data}));
}
// Toggle Complete 
markComplete = (id)=>{
this.setState({todos: this.state.todos.map(todo=>{

  if(todo.id === id){
    todo.completed = !todo.completed
  }
  return todo;
})});
}

delTodo = (id) =>{
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res=>this.setState({todos: [...this.state.todos.filter(todo => todo.id!== id)]}) );
  
}

addTodo = (title)=>{
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed:false
  }).then(res=> this.setState({todos: [...this.state.todos, res.data]}));
}



render() 
  { 

   //console.log(this.state.todos)
  return ( 
    <Router>
    <div className="App">
      <div className= "Container">
        <Header/>
         <Route exact path = '/' render = {props =>(

           <React.Fragment>
             <AddTodo addTodo = {this.addTodo } />  
      <Todos todos= {this.state.todos} markComplete = {this.markComplete} delTodo = {this.delTodo} />


           </React.Fragment>
         )}/>

         <Route path = "/about" component = {about} />

      
    </div>
    </div>
    </Router>
  ); 
 }
} 

export default App;
