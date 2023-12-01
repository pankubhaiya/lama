// CreateProjectModal.js
import React from 'react';

const CreateProjectModal = ({
  isCreateProjectModalOpen,
  closeCreateProjectModal,
  projectName,
  isProjectNameValid,
  setProjectName,
  setProjectNameValid,
  handleCreateProject,
}) => {
  return (
    <>
      {isCreateProjectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white border-gray-300 shadow-md p-8 rounded-lg w-[70%]">
            <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
            <label htmlFor="projectName" className="block mb-2">
              Enter Project Name
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Type here"
              className={`border p-2 mb-4 w-full ${!isProjectNameValid ? 'border-red-500' : ''}`}
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setProjectNameValid(true);
              }}
            />
            {!isProjectNameValid && (
              <p className="text-red-500 mb-4">Project name cannot be empty</p>
            )}
            <div className="flex justify-end">
              <button onClick={closeCreateProjectModal} className="mr-4 text-red-600">
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="bg-[#7e22ce] text-white py-2 px-4 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProjectModal;
