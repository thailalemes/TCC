const connection = require ('../database/connection');

module.exports = {
    async index (request, response) {
        const users = await connection('users').select('*');
     
        return response.json(users);
     },
     
    async create(request, response){
        const { name, cpf, email, telefone, endereco, bairro } = request.body;

    await connection ('users').insert({
       name,
       cpf,
       email,
       telefone,
       endereco,
       bairro
    })

    return response.json({cpf});
    }
};