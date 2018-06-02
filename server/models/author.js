const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});
// use this model to interact with our collection in mongoDB
module.exports = mongoose.model('Author', authorSchema);
