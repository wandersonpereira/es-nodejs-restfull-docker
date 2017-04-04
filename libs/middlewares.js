module.exports = app => {
    /**Middleare de configuração do json a ser exibido como resposta tela */
    app.set("json spaces", 4);

    /**Middleare de configuração da porta que o node será iniciado*/
    app.set("port", 8080);

    /**Converte os atributos do boyd para json*/
    app.use(bodyParse.json());

    /**Função genérica do app.all() que executa a delete do body.id*/
    app.use((req, res) => {
      delete req.body.id;
      next();
    })
}
