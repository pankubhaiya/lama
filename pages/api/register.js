// pages/api/register.js
import connect from '../../utils/db';
import User from '../../models/user_model';

export default async function handler(req, res) {
  await connect();

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Welcome Back',status:"exists" });
    }

    // Create a new user
    const newUser = new User({ email });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
