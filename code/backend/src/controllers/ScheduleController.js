const connection = require ('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('schedule').count();
            
        const schedule = await connection('schedule')
        .join('users', 'users.cpf', '=', 'schedule.users_cpf')
        // limita 5 agendamentos por página
        .limit(5)
        .offset((page -1) * 5)
        // traz somente o que está no agendamento (para não sobrepor CPF de users_cpf)
        .select(['schedule.*']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(schedule);
    },

    async create (request, response){
        const { title, date } = request.body;
        const users_cpf = request.headers.authorization;

        const [id] = await connection ('schedule').insert({
            title,
            date,
            users_cpf,
        });
        return response.json({ id });
    },

    async delete(request,response){
        const { id } = request.params;
        const users_cpf = request.headers.authorization;

        const schedule = await connection('schedule')
        .where('id', id)
        .select('users_cpf')
        .first();

        if (schedule.users_cpf != users_cpf) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        await connection('schedule').where('id', id).delete();

        return response.status(204).send();
    }
};