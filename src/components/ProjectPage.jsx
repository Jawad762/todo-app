const ProjectPage = ({showProjectForm,currentProject,setShowTaskForm,showTaskForm,deleteTask,deleteProject,showButtons,toggleCheckbox,text}) => {
    if (!currentProject) {
        return null; 
      }
    return (
        <div className={showProjectForm || showTaskForm ? "project-page blur" : 'project-page'}>
            {text && (<h1 className="nothing-to-see">Nothing to see here!</h1>)}
            <div className="upper">
                <div className="left-side">
                    <h1 className="proj-page-name">{currentProject.projectName}</h1>
                    <p className="description">{currentProject.description}</p>
                </div>
                    {showButtons && (
                        <div className="right-side">
                            <div onClick={() => setShowTaskForm(true)} className="addTask"><span>+  </span>Tasks</div>
                            <div onClick={deleteProject} className="delete-project"><span className="project-x">&#10006;</span> Project</div>
                         </div>
                    )}
            </div>
            <div className="lower">
                <div className="tasks">
                    {currentProject.tasks.length > 0 && currentProject.tasks.map(task => {
                        return (
                            <div className="task">
                                <div className="task-left-side">
                                <div onClick={() => toggleCheckbox(currentProject.tasks.indexOf(task))} className={task.checked === true ? "active-checkbox" : 'disabled-checkbox'}>{task.checked === true ? "✓" : ''}</div>
                                <div className={task.checked === true ? 'line-through': ''}>{task.taskName}</div> 
                                </div>
                                <span onClick={() => deleteTask(currentProject.tasks.indexOf(task))} className="task-x">&#10006;</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage