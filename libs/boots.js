module.exports = app => {
    
    /**Incia a aplicação na porta informada no middlewares e faz sincronia com o banco*/
    app.libs.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {
            console.log(`NTask API - porta ${app.get("port")} - 3117 `)
        });
    });
}