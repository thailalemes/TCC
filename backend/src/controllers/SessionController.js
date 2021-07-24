const connection = require ('../database/connection');

module.exports = {
    async create(request, response){
        const { cpf } = request.body;

        const user = await connection('users')
        .where('cpf', cpf)
        .select ('name')
        .first();

        if(!user){
            return response.status(400).json({ error: 'No user found '});
        }

        return response.json(user);
    }
}