const moongoose = require('mongoose');
const schema = moongoose.Schema;
const ObjectId = moongoose.ObjectId;

const user = new schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
});

const todo = new schema({
    title: String,
    description: String,
    userId: ObjectId,
    done: Boolean,
});

const User = moongoose.model('Users', user);
const Todo = moongoose.model('Todos', todo);

module.exports = {
    UserModel: User,
    TodoModel: Todo,
};