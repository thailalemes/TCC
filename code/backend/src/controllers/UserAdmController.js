const connection = require ('../database/connection');
const crypto = require ('crypto');

module.exports = {
    // lista o usuário cadastrado
    async index (request, response) {
        const users_adm = await connection('users-adm').select('*');
     
        return response.json(users_adm);
     },
     // cadastra usuario
    async create(request, response){
        const { name, email, telefone, senha } = request.body;

        const cpf = crypto.randomBytes(4).toString('HEX');
    // insere os dados na tabela users-adm
    await connection ('users-adm').insert({
        name,
        cpf,
        email,
        telefone,
        senha
    })

    return response.json({cpf});
    }
};