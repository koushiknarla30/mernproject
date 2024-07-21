import mongoose from "mongoose";

var loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

});

const loginModel = mongoose.model('Login', loginSchema);

export default loginModel
