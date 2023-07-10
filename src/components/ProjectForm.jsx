const ProjectForm = ({addProject, closeProjectForm, setTitle,setDescription}) => {

    return (
        <div className="project-form-container">
            <div className="close-form" onClick={closeProjectForm}>&#10006;</div>
            <div className="inputs">
                <label>PROJECT NAME</label>
                <input maxLength='20' minLength='1' placeholder="20 Characters Allowed" onChange={(event) => setTitle(event.target.value)} type="text"/>
                <label>DESCRIPTION</label>
                <input minLength='1' maxLength='125' placeholder='125 Characters Allowed' onChange={(event) => setDescription(event.target.value)} type="text"/>
                <button className="submit" type="submit" onClick={addProject}>Add</button>
            </div>
        </div>
    )
}

export default ProjectForm