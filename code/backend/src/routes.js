const express = require('express');

const UserController = require('./controllers/UserController');
const UserAdmController = require('./controllers/UserAdmController');
const ScheduleController = require('./controllers/ScheduleController');
const ScheduleAdmController = require('./controllers/ScheduleAdmController');
const ProfileAdmController = require('./controllers/ProfileAdmController');
const ProfileClientController = require('./controllers/ProfileClientController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/users-adm', UserAdmController.index);
routes.post('/users-adm', UserAdmController.create);

routes.get('/profile-adm', ProfileAdmController.index);
/* routes.post('/profile-adm', ProfileAdmController.create); */

routes.get('/profile-client', ProfileClientController.index);
/* routes.post('/profile-client', ProfileClientController.create); */

routes.get('/schedule',ScheduleController.index);
routes.post('/schedule', ScheduleController.create);
routes.delete('/schedule/:id', ScheduleController.delete);

/* routes.get('/schedule-adm',ScheduleAdmController.index); */

module.exports = routes;