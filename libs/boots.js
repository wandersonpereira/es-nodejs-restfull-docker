module.exports = app => {
    
    /**Incia a aplicação na porta informada no middlewares */
    app.listen(app.get("port"), () => {
        console.log(`NTask API - porta ${app.get("port")} - 3117 `)
    });
}