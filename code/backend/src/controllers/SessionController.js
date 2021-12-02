const connection = require ('../database/connection');

module.exports = {
    // responsável por administrar o login
    async create(request, response){
        const { cpf } = request.body;

        const user = await connection('users')
        .where('cpf', cpf)
        .select ('name')
        .first();
        // traz o primeiro nome do usuario logado
        const user_adm = await connection('users-adm')
        .where('cpf', cpf)
        .select ('name')
        .first();
        // se não for usuário cadastrado apresenta erro
        if(!user || user_adm){
            return response.status(400).json({ error: 'No user found with this CPF'});
        }

        return response.json(user || user_adm);
    }
}