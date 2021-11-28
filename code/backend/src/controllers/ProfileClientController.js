const connection = require ('../database/connection');

module.exports = {
    async index (request, response) {
        const users_cpf = await connection('profile-client')
        .where('users_cpf', users_cpf)
        .select('*');
     
        return response.json(profile-client);
     },
}