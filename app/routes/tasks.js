module.exports = app => {

    /**Contem o objeto de Tasks, que está na pasta models */
    const Tasks = app.libs.db.models.Tasks;

    app.routes('/tasks')

    .get((req, res) => {
      Tasks.findAll({})
      .then(tasks => res.json({tasks : tasks}))
      //Error 412 usado para quando uma dos atributos passados no cabeçalho for considerado com falso
      //assim impedindo o recurso de ser executado
      .catch(err => res.status(412).json({msg: err.message}));
    })

    .post((req, res) => {
      Tasks.create(req.body)
      .then(value => res.json(value))
      //Error 412 usado para quando uma dos atributos passados no cabeçalho for considerado com falso
      //assim impedindo o recurso de ser executado
      .catch(err => res.status(412).json({msg: err.message}));
    });

    app.routes('/tasks/:id')

    .get((req, res) => {
      Tasks.findOne({where req.params})
      .then(value => {
        if (value) return res.json(value);

        //Caso não encontre valor, retorna 404 -> Registro não encontrado
        return res.sendStatus(404);
      })
      //Error 412 usado para quando uma dos atributos passados no cabeçalho for considerado com falso
      //assim impedindo o recurso de ser executado
      .catch(err => res.status(412).json({msg: err.message}))
    })

    .put((req, res) => {
      Tasks.update(req.body, {where: req.params})
      //Retorna 204 Significa que foi executada com sucesso porém não retornou conteudo com resposta
      .then(value => res.sendStatus(204))
      //Error 412 usado para quando uma dos atributos passados no cabeçalho for considerado com falso
      //assim impedindo o recurso de ser executado
      .catch(err => res.status(412).json({msg: err.message}))
    })

    .delete((req, res) => {
      Tasks.destroy({where: req.params})
      .then(value => res.sendStatus(204))
      //Error 412 usado para quando uma dos atributos passados no cabeçalho for considerado com falso
      //assim impedindo o recurso de ser executado
      .catch(err => res.status(412).json({msg: err.message}))
    });
}
