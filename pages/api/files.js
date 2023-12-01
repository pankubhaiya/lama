// pages/api/files/[...nextauth].js
import connect from '../../utils/db';
import File from "../../models/files_model"

export default async function handler(req, res) {
  await connect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, description, projectId } = req.body;
        const newFile = new File({
          name,
          description,
          projectId,
        });
        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'GET':
      try {
        const { projectId, fileId } = req.query;
        if (fileId) {
          // Fetch a single file by fileId
          const file = await File.findById(fileId);
          if (!file) {
            return res.status(404).json({ message: 'File not found' });
          }
          return res.json({ file });
        }

        // Fetch all files by projectId
        const files = await File.find({ projectId });
        res.json({ files });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PATCH':
      try {
        const { fileId } = req.query;
        const { name, description } = req.body;
        const updatedFile = await File.findByIdAndUpdate(fileId, {...req.body }, { new: true });
        res.json(updatedFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { fileId } = req.query;
        console.log(fileId)
        await File.findByIdAndDelete(fileId);
        res.json({ message: 'File deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).end(); // Method Not Allowed
  }
}
