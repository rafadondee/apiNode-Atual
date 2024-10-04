
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/users', async (request, reply) => {
    const body = request.body;
    let error = {}
    if(!body.name){
     error.name='Erro no name!'

    }
    if(!body.password){
        error.password='Erro na password!'
   
       }

       if(!body.profile){
        error.profile='Erro no profile!'
       }

       if(body.name && body.password && body.profile){
        await databasePostgres.createName(body);
        return reply.status(201).send('deu boa');
       } else{
         return error = reply.status(400).send(error);

       }
   

})

// READE
server.get('/users', async () => {
    const users = await databasePostgres.listUsers();
    return users;
});

// UPDATE
server.put('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    const body = request.body;
    await databasePostgres.updateUser(userID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    await databasePostgres.deleteUser(userID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});
