import mongoose from "mongoose";


var signupSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

const signupModel = mongoose.model('Signup', signupSchema);

export default signupModel
