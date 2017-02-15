module.exports = app => {
    
    /**Contem o objeto de Tasks, que está na pasta models */
    const Tasks = app.libs.db.models.Tasks;
    
    app.get("/tasks", (req, res) => {
        Tasks.findAll({}).then(tasks => {
            res.json({tasks : tasks})
        });
    });

}