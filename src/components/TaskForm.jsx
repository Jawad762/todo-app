const TaskForm = ({populateTasks,setTask,setShowTaskForm}) => {
    return (
        <div className="task-form-container">
            <div className="close-form" onClick={() => setShowTaskForm(false)}>&#10006;</div>
            <div className="inputs">
                <label>TASK NAME</label>
                <input minLength='1' maxLength='80' placeholder="80 Characters Allowed" type="text" onChange={(event) => setTask(event.target.value)}/>
                <button onClick={populateTasks} className="submit" type="submit">Add</button>
            </div>
        </div>
    )
}

export default TaskForm