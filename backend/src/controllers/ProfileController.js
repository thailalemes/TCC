const connection = require ('../database/connection');

module.exports = {
    async index (request, response) {
        const users_cpf = await connection('incidents')
        .where('users_cpf', users_cpf)
        .select('*');
     
        return response.json(incidents);
     },
}