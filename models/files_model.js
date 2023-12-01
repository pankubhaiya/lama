// models/file.model.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Reference to the Project model
    required: true,
  }
},
{
  timestamps: {
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt'  // Custom name for the updatedAt field
  }
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
