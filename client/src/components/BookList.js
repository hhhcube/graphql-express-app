import React, { Component } from 'react';
import {getBooksQuery} from '../queries/queries';
import {graphql} from 'react-apollo';

import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        };
    }
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return(<div>Loading books...</div>)
        }else{
            return data.books.map(book => {
                return(
                    <li key={book.id} onClick={(e) => {this.setState({selected:book.id})}}>
                        {book.name}
                    </li>
                );
            })
        }
    }
    render() {
    //   console.log(this.props);
    return(
      <div>
        <ul id="book-list">
            {this.displayBooks()}
        </ul>
                    {/* bookid passed down as a prop (can be called anything) */}
        <BookDetails bookid={this.state.selected}/>
      </div>
    );
  }
}
                // bind this query to this component
export default graphql(getBooksQuery)(BookList);
