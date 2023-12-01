// pages/projects.js
import {useState,useEffect} from 'react';
import Projects from '../components/Projects';
import { useEmailContext } from '../context/EmailContext';

const ProjectsPage = () => {
  // Dummy data, replace this with your actual project data
  const [userProjects, setUserProjects] = useState([]);
  const { globalEmail } = useEmailContext();
  console.log(globalEmail);
  useEffect(() => {
    // Fetch user projects when the component mounts
    fetchUserProjects();
  }, []);

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
  return (<>
   {/* Navbar */}
   <nav className=" p-4 text-black flex justify-between items-center w-[95%] mx-auto mb-8">
        {/* Left side with logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-[#7e22ce]">LAMA</span>
        </div>

        {/* Right side with icons */}
        <div className="flex items-center">
          <span className="mr-4">
            <i className="fas fa-cog"></i>
          </span>
          <span>
            <i className="fas fa-bell"></i>
          </span>
        </div>
      </nav>
  <Projects projects={userProjects} />
  </>);
};

export default ProjectsPage;
