const connection = require ('../database/connection');

module.exports = {
    // lista o agendamento
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
        // inclui o número de agendamento no header, através da variável X-Total-Count)
        response.header('X-Total-Count', count['count(*)']);

        return response.json(schedule);
    },
    // cria o agendamento
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
    // deleta o agendamento
    async delete(request,response){
        const { id } = request.params;
        const users_cpf = request.headers.authorization;

        const schedule = await connection('schedule')
        .where('id', id)
        .select('users_cpf')
        .first();
        // não deixa deletar o agendamento se não for usuário permitido
        if (schedule.users_cpf != users_cpf) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        await connection('schedule').where('id', id).delete();

        return response.status(204).send();
    }
};