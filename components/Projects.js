// Projects.js
import {useState,useEffect} from 'react';
import CreateProjectModal from './CreateProjectModal';
import { useEmailContext } from '../context/EmailContext';
import { useRouter } from 'next/router';

const Projects = ({ projects }) => {
    const [userProjects, setUserProjects] = useState(projects);
    const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isProjectNameValid, setProjectNameValid] = useState(true);
    const { globalEmail } = useEmailContext();
    const router = useRouter();
  
    const closeCreateProjectModal = () => {
      setCreateProjectModalOpen(false);
      setProjectName('');
      setProjectNameValid(true);
    };

    useEffect(() => {
      fetchUserProjects();
    }, [isCreateProjectModalOpen]);
  
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`/api/projects/get_projects?userEmail=${globalEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUserProjects(data.projects);
        } else {
          console.error('Error fetching user projects:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    const handleCreateProject = async () => {
      if (projectName.trim() === '') {
        setProjectNameValid(false);
      } else {
        setProjectNameValid(true);
       
        try {
          const response = await fetch('/api/projects/create_project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectName, email: globalEmail }),
          });
          console.log(response)
  
          if (response.ok) {
            const result = await response.json();
            console.log(result)
            console.log(result);
            alert(result.message)
            router.push('/projects');
          } else {
            const error = await response.json();
            alert(response.message)
            setCreateProjectModalOpen(false)
            console.log(error);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      // Close the modal
      closeCreateProjectModal();
    };

    const handleProjectClick = (projectId) => {
      console.log("Hello")
      router.push(`/dashboard?projectId=${projectId}`)
    }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex justify-between w-4/5 mb-4">
        <h1 className="text-5xl font-bold text-[#7e22ce]">Projects</h1>
        <button  onClick={() => setCreateProjectModalOpen(true)} className="bg-black text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-800 hover:text-gray-200">
            <span className="mr-2">Create New Project</span>
            <i className="fas fa-plus"></i>
          </button>
      </div>
      {isCreateProjectModalOpen && <div className="fixed inset-0 bg-gray-100 opacity-80"></div>}
      <CreateProjectModal
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        closeCreateProjectModal={closeCreateProjectModal}
        projectName={projectName}
        isProjectNameValid={isProjectNameValid}
        setProjectName={setProjectName}
        setProjectNameValid={setProjectNameValid}
        handleCreateProject={handleCreateProject}
      />
      <div className="grid grid-cols-3 gap-x-32 gap-y-16 mt-10 ">
        {userProjects.map((project, index) => (
          <div
            key={index}
            className="py-2 px-4 rounded-lg flex items-center justify-between border border-gray-300 shadow-md space-x-12"
          >
            {/* Logo */}
            <div
              className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 ${
                index % 3 === 0 ? 'bg-[#7e22ce]' : index % 3 === 1 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              
            >
              <span className="text-4xl font-bold text-white">
                {project.projectName
                  .split(' ')
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join('')}
              </span>
            </div>
            {/* Project Name */}
            <div>
            <h2 className="text-xl font-bold text-[#7e22ce]" onClick={() => handleProjectClick(project._id)}>{project.projectName}</h2>
            <p>4 episodes</p>
            <p>Last edited {new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
            
            {/* Additional project details or actions can be added here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
