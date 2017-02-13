/**
 * Modulo que faz o controle das Tasks
 */

module.exports = app => {
    
    return  {

        findAll : (params, callback) =>{
            return callback ([
                {"title" : "Fazer compras"},
                {"title" : "Concertar PC"}
            ])
        }
    
    }
}