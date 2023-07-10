const Sidebar = ({projects,openProjectForm, showProjectForm,navigateProject, showTaskForm}) => {
    return (
        <div className={showProjectForm || showTaskForm ? "sidebar blur" : 'sidebar' }>
            <h1 className="my-projects">My Projects</h1>
            <div className="projects">
                {projects.map(project => {
                    return (
                        <h3 key={project.projectName} className="dropdown-item project" onClick={navigateProject}>{project.projectName}</h3>
                    )
                })}
                <div onClick={openProjectForm} className="addProject"><span>+  </span>Project</div>
            </div>
        </div>
    )
}

export default Sidebar