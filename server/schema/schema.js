// GraphQL Tutorial #35 - Making a Single Query
/** note: For production run in express server */
/** will describe the on this kind of graph
 * the object types the relations between those object types
 * it describes how we can reach into the graph to interact
 * eg. query/retrieve, mutate the data
 */
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
// 1. describe the object types we want on our graph
// es6 destructuring grabbing 'GraphQlObjectType...' variable from graphql
const {GraphQLObjectType, 
        GraphQLString, GraphQLSchema, 
        GraphQLID, GraphQLInt,
        GraphQLList, GraphQLNonNull} = graphql;
// -------------------------------------------
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: { // nested and related data -> parent = 
            // 2. define relationships
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent, "parent");
                // Look in the authors array and find a author whos parent (which is the book we queried)
                // whos id (the book that was queried) mathces the authorId. - parent is the books aray.
                // return _.find(authors, {id: parent.authorId}); // parent.authorId == books.authorId
                return Author.findById(parent.authorId);
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // have to rap the fields property inside of a function
    // If not fields wont be defined if called before assignment
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        // relation type
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){      // is authorId == parnet.id
                //return _.filter(books, {authorId: parent.id});
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    })
});

// 3. define root queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            // define which args should come with query 'book'
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db/other source
                //console.log(typeof(args.id));
                // npm install lodash
               // return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
               // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){      // is authorId == parent.id
           //     return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){      // is authorId == parent.id
             //   return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                // create loacal variable called <author>
                let author = new Author({ // set it to a new local instance of the <Author> dataType
                    name: args.name,
                    age: args.age
                });
                // now save it to our Mongoose dataBase
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({ // set it to a new local instance of the <Author> dataType
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});
// create a model and schema for each dataType we will be
// storing in our database 
module.exports = new GraphQLSchema({
    query: RootQuery, // were saying a user can query using these root queries right here
    mutation: Mutation // and it can perform mutations using this mutation thing right here
   
});