import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
// import { config } from "dotenv";
import loginModel from "./models/loginModel.js";
import signupModel from "./models/signupModel.js";
dotenv.config();
// config();

const app = express();
app.use(cors());

app.use(express.json());
// app.use(bodyParser.json());
// app.get('/', (req,res)=>{
//     res.send("hello");
// })

app.post('/', async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  const user = await loginModel.findOne({ email });
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
	  const isPasswordValid = await user.comparePassword(password);
  
	  if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid password' });
	  }

	  return res.status(200).json({ message: 'Login successful' });
	} catch (error) {
	  console.error('Error during login:', error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  });


  app.post('/api/signup', async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  const existingUser = await signupModel.findOne({ email });
	  if (existingUser) {
		return res.status(409).json({ message: 'User already exists' });
	  }
  
	  const newUser = new signupModel({ email, password });
	  await newUser.save();
  
	  return res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
	  console.error('Error during registration:', error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  });





const port = process.env.PORT || 2020;

const uri = process.env.MONGO_DB;
// console.log("MongoDB URI:", uri);

try {
	mongoose.set('strictQuery', true);
	mongoose.connect(uri);
	console.log("DB Connected");
	app.listen(port, function(){
		// console.log("Server running on http://localhost:"+port);
		console.log(`Server running on http://localhost:${port}`);
	});
}
catch(error){
	console.log(error);
}