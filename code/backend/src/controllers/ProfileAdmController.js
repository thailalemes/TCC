const connection = require ('../database/connection');

module.exports = {
    // lista os usuario
    async index (request, response) {
        const users_cpf = request.headers.authorization;

        const schedule = await connection('schedule')
        .where('users_cpf', users_cpf)
        .select('*');
        
        return response.json(schedule);
     },
}