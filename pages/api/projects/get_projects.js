// pages/api/user-projects.js
import connect from '../../../utils/db';
import Project from '../../../models/project_model';

export default async function handler(req, res) {
  await connect();

  if (req.method === 'GET') {
    const { userEmail } = req.query;
    try {
      const projects = await Project.find({ userEmail });
      res.status(200).json({ projects });
    } catch (error) {
      console.error('Error fetching user projects:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
