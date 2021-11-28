const connection = require ('../database/connection');
const crypto = require ('crypto');

module.exports = {
    async index (request, response) {
        const users = await connection('users').select('*');
     
        return response.json(users);
     },
     
    async create(request, response){
        const { name, email, telefone, endereco, UF } = request.body;

    const cpf = crypto.randomBytes(4).toString('HEX');
    const senha = crypto.randomBytes(4).toString('HEX');

    await connection ('users').insert({
        name,
        cpf,
        email,
        telefone,
        endereco,
        UF,
        senha
    })

    return response.json({cpf, senha});
    }
};