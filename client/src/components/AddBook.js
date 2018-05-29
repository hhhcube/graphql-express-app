import React, { Component } from 'react';
import {getAuthorsQuery} from '../queries/queries';
import {graphql} from 'react-apollo';



class AddBook extends Component {
    displayAuthors(){
        var data = this.props.data;
        if(data.loading){
            return(<option>Loading Authors...</option>)
        }else{
            return data.authors.map(author =>{
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    render() {
    //   console.log(this.props);
    return(
     <form id='add-book'>
        <div className='field'>
            <label>Book name</label>
            <input type="text"/>
        </div>
        
        <div className="field">
            <label>Genre</label>
            <input type="text"/>
        </div>

        <div className="field">
            <label>Author</label>
            <select>
                <option>Select author</option>
                {this.displayAuthors()}
            </select>
        </div>

        <button></button>

     </form>
    );
  }
}
                // bind this query to this component
export default graphql(getAuthorsQuery)(AddBook);
