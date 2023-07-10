import { useEffect, useState } from 'react';
import './App.css';
import ProjectForm from './ProjectForm';
import ProjectPage from './ProjectPage';
import Sidebar from './Sidebar';
import TaskForm from './TaskForm';

function App() {

  const projectsObject = [
    {
      projectName: 'Studying',
      description: 'Write words here',
      tasks: [
        {
          taskName: 'Finish my maths homework',
          checked: false
        },
        {
          taskName: 'do something else',
          checked: false
        }
      ]
    }
  ];

  const initialProjects = localStorage.getItem('projects')
  ? JSON.parse(localStorage.getItem('projects'))
  : projectsObject;

  const initialCurrentProject = localStorage.getItem('currentProject')
  ? JSON.parse(localStorage.getItem('currentProject'))
  : projectsObject[0];

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [task, setTask] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const [text, setText] = useState(false);
  const [currentProject, setCurrentProject] = useState(initialCurrentProject);

  const openProjectForm = () => {
    setShowProjectForm(true);
  }

  const closeProjectForm = () => {
    setShowProjectForm(false);
  }

  const addProject = () => {
    let newProject = {
      projectName: title,
      description: description,
      tasks: []
    }
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
    setCurrentProject(newProject);
    setShowButtons(true);
    setText(false);
  }

  const navigateProject = (event) => {
    let project = projects.find(project => project.projectName === event.target.innerText);
    setCurrentProject(project);
    setShowButtons(true);
    setText(false);
  }

  const populateTasks = () => {
    setShowTaskForm(false);
    let newTask = {
      taskName: task,
      checked: false
    }
    setCurrentProject({
      ...currentProject,
      tasks: [...currentProject.tasks, newTask]
    });
    let newProjects = projects.map(project => {
      if (project.projectName === currentProject.projectName) {
        project.tasks.push(newTask);
      }
      return project;
    });
    setTask('');
    setProjects(newProjects);
  }

  const deleteTask = (index) => {
    const newProjects = projects.map(project => {
      if (project.projectName === currentProject.projectName) {
        project.tasks.splice(index, 1);
        setCurrentProject(project);
      }
      return project;
    });
    setProjects(newProjects);
  }

  const deleteProject = () => {
    let newProjects = projects.filter(project => project.projectName !== currentProject.projectName);
    setProjects(newProjects);
    setCurrentProject({
      projectName: '',
      description: '',
      tasks: []
    });
    setShowButtons(false);
    setText(true);
  }

  const toggleCheckbox = (index) => {
    const newProjects = projects.map(project => {
      if (project.projectName === currentProject.projectName) {
        project.tasks[index].checked = !project.tasks[index].checked;
        let newProject = project
        setCurrentProject(newProject)
      }
      return project;
    });
    setProjects(newProjects);
  }

  useEffect(() => {
    projects && localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    currentProject && localStorage.setItem('currentProject', JSON.stringify(currentProject));
  }, [currentProject]);

  useEffect(() => {
    if (projects.length === 0) {
      setText(true);
      setShowButtons(false);
    }
  }, [projects]);

  return (
    <div>
      <Sidebar projects={projects} showProjectForm={showProjectForm} openProjectForm={openProjectForm} navigateProject={navigateProject} showTaskForm={showTaskForm} />
      <ProjectPage showProjectForm={showProjectForm} currentProject={currentProject} setShowTaskForm={setShowTaskForm} showTaskForm={showTaskForm} deleteTask={deleteTask} deleteProject={deleteProject} showButtons={showButtons} toggleCheckbox={toggleCheckbox} text={text} />
      {showProjectForm && <ProjectForm closeProjectForm={closeProjectForm} setTitle={setTitle} setDescription={setDescription} addProject={addProject} />}
      {showTaskForm && <TaskForm populateTasks={populateTasks} setTask={setTask} setShowTaskForm={setShowTaskForm} />}
    </div>
  );
}




export default App;

