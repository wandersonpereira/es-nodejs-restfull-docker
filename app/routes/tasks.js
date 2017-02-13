module.exports = app => {
    
    /**Contem o objeto de Tasks, que está na pasta models */
    const Tasks = app.app.models.tasks;
    
    app.get("/tasks", (req, res) => {
        Tasks.findAll({} , (tasks) => {
            res.json({tasks : tasks})
        });
    });

}