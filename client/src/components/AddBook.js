import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
// local
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';



class AddBook extends Component {
    // setup state of component
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    displayAuthors(){
        // var data = this.props.data; // used when state is not managed
        var data = this.props.getAuthorsQuery;
        // console.log(this.props);
        if(data.loading){
            return(<option>Loading Authors...</option>)
        }else{
            return data.authors.map(author =>{
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    submitForm(e){
        // stop default behaviour of browser event
        e.preventDefault();
        // console.log(this.state)
        // call the mutation when we click the add button or we call the submit form function
        this.props.addBookMutation({
            variables: {
                // setting values to what ever state is at that time
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            // reloading queries so we can get database updates viewed in browser withour refresh
            refetchQueries: [{query: getBooksQuery}]
        }); // the name from the export at bottom
    }
    render() {
    //   console.log(this.props);
    return(
     <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
            <label>Book name</label>
            <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
            <label>Genre</label>
            <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
            <label>Author</label>
            <select onChange={(e) => this.setState({authorId: e.target.value})}>
                <option>Select author</option>
                {this.displayAuthors()}
            </select>
        </div>
        <button>+</button>
     </form>
    );
  }
}
                // bind this query to this component
// export default graphql(getAuthorsQuery)(AddBook);
// bind several different queries to one component
export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
