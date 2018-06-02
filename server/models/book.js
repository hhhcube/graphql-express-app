const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});
// use this model to interact with our collection in mongoDB
module.exports = mongoose.model('Book', bookSchema, true);
