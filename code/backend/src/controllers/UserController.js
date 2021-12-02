const connection = require ('../database/connection');
const crypto = require ('crypto');

module.exports = {
    // lista o usuario cadastrado
    async index (request, response) {
        const users = await connection('users').select('*');
     
        return response.json(users);
     },
    // cadastra usuario
    async create(request, response){
        const { name, email, telefone, endereco, UF, senha } = request.body;

        const cpf = crypto.randomBytes(4).toString('HEX');
    // insere os dados na tabela users
    await connection ('users').insert({
        name,
        cpf,
        email,
        telefone,
        endereco,
        UF,
        senha
    })

    return response.json({cpf, endereco});
    }
};