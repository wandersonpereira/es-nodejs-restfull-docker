module.exports = app => {
  const Users = app.libs.models.Users;

  app.get('/users/:id', (req, res) => {
    Users.findById(req.params.id, {attributes: ["id", "nome", "email"]})
    .then(value => res.json(value))
    .catch(err => res.status(412).json({msg: err.message}));
  });

  app.delete('/users/:id', (req, res) => {
    Users.destroy({where: {id : req.params.id}})
    .then(value => res.sendStatus(204))
    .catch(err => res.status(412).json({msg: err.message}));
  });

  app.post('/users', (req, res) => {
    Users.create(req.body)
    .then(value => res.json(value))
    .catch(err => res.status(412).json({msg: err.message}));
  });

}
