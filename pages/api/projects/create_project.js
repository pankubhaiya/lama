// pages/api/projects.js
import connect from '../../../utils/db';
import Project from '../../../models/project_model';

export default async function handler(req, res) {
  await connect();

  if (req.method === 'POST') {
    const { projectName,email } = req.body;
    console.log(projectName,email)

    try {
      const newProject = new Project({ projectName,userEmail:email });
      await newProject.save();

      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      console.error('Error creating project:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
