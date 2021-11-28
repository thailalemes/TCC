const connection = require ('../database/connection');

module.exports = {
    async index(request, response){
        const { latitude, longitude } = request.all()
        
        const properties = Property.query()
        .nearBy(latitude, longitude, 10)
        .fetch()

        const [count] = await connection('schedule-adm').count();
            
        const scheduleAdm = await connection('schedule-adm')
        .join('users', 'users.name', '=', 'schedule.user_cpf')
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(scheduleAdm && properties);
    },

    async store ({ auth, request, response }) {
        const { id } = auth.user
        const data = request.only([
          'title',
          'address',
          'latitude',
          'longitude',
          'date'
        ])
      
        const property = await Property.create({ ...data, users_cpf: id })
      
        return property
      },

      async update ({ params, request, response }) {
        const property = await Property.findOrFail(params.id)
      
        const data = request.only([
            'title',
            'address',
            'latitude',
            'longitude',
            'date'
        ])
      
        property.merge(data)
      
        await property.save()
      
        return property
      }

};