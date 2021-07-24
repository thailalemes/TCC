const connection = require ('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
            
        const incidents = await connection('incidents')
        .join('users', 'users.name', '=', 'incidents.user_cpf')
        .limit(5)
        .offset((page -1) * 5)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create (request, response){
        const { title, description, protocol, value } = request.body;
        const users_cpf = request.headers.authorization;

        await connection ('incidents').insert({
            title,
            description,
            protocol,
            value,
        });
        return response.json();
    },

    async delete(request,response){
        const { cpf } = request.params;
        const users_cpf = request.headers.authorization;

        const incident = await connection('incidents')
        .where('cpf', cpf)
        .select('users_cpf')
        .first();

        if (incident.user_cpf != user_cpf) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};