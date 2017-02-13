module.exports = app => {
    /**Middleare de configuração do json a ser exibido como resposta tela */
    app.set("json spaces", 4);

    /**Middleare de configuração da porta que o node será iniciado*/    
    app.set("port", 8080);
}