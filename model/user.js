const Mongooes = require('mongoose');
const UserSchema = Mongoose.schema({
    name: { username: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },
    role: { type: String, required: true, default: 'user' }
});

const User = Mongoose.model('User', UserSchema);
module.exports = User;