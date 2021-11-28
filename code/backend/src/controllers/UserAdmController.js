const connection = require ('../database/connection');
const crypto = require ('crypto');

module.exports = {
    async index (request, response) {
        const users_adm = await connection('users-adm').select('*');
     
        return response.json(users_adm);
     },
     
    async create(request, response){
        const { name, email, telefone } = request.body;

        const cpf = crypto.randomBytes(4).toString('HEX');
        const senha = crypto.randomBytes(4).toString('HEX');
    

    await connection ('users-adm').insert({
        name,
        cpf,
        email,
        telefone,
        senha
    })

    return response.json({cpf, senha});
    }
};