import express from 'express';
import auth from '../middleware/v1/auth';
import report from '../controllers/v1/report';
import users from '../controllers/v1/users';

const routes = express.Router();

routes.post('/auth/signup', users.signup);
routes.post('/auth/signin', users.signin);
routes.get('/auth/users', auth.userAuthentication, auth.isAdmin, users.getUsers);
routes.post('/auth/forget', users.forgetPassword);
routes.patch('/auth/reset/:email/:token', auth.verifyLink, users.resetPassword);

routes.post('/red-flags', auth.userAuthentication, report.newRecord);
routes.get('/red-flags/:redFlagId', auth.userAuthentication, report.singleReport);
routes.get('/red-flags', auth.userAuthentication, report.allReports);
routes.patch('/red-flags/:red_Flag_Id/comment', auth.userAuthentication, auth.grantAccess, report.editComment);
routes.patch('/red-flags/:red_Flag_Id/location', auth.userAuthentication, auth.grantAccess, report.changeLocation);
routes.patch('/red-flags/:red_Flag_Id/status', auth.userAuthentication, auth.isAdmin, report.changeStatus);
routes.delete('/red-flags/:red_Flag_Id', auth.userAuthentication, auth.grantAccess, report.deleteRecord);

export default routes;
