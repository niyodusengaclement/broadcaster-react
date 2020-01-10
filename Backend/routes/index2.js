import express from 'express';
import auth from '../middleware/v2/auth';
import users from '../controllers/v2/users';
import report from '../controllers/v2/report';

const dbRoutes = express.Router();

dbRoutes.post('/auth/signup', users.signup);
dbRoutes.post('/auth/signin', users.signin);
dbRoutes.get('/auth/users', auth.userAuthentication, users.getUsers);
dbRoutes.post('/auth/forget', users.forgetPassword);
dbRoutes.patch('/auth/reset/:email/:token', auth.verifyLink, users.resetPassword);

dbRoutes.post('/red-flags', auth.userAuthentication, report.newRecord);
dbRoutes.get('/red-flags/:redFlagId', auth.userAuthentication, report.singleReport);
dbRoutes.get('/red-flags', auth.userAuthentication, report.allReports);
dbRoutes.patch('/red-flags/:red_Flag_Id/comment', auth.userAuthentication, auth.validateRedflag, auth.grantAccess, report.editComment);
dbRoutes.patch('/red-flags/:red_Flag_Id/location', auth.userAuthentication, auth.validateRedflag, auth.grantAccess, report.changeLocation);
dbRoutes.patch('/red-flags/:red_Flag_Id/status', auth.userAuthentication, auth.validateRedflag, auth.isAdmin, report.changeStatus);
dbRoutes.delete('/red-flags/:red_Flag_Id', auth.userAuthentication, auth.validateRedflag, auth.grantAccess, report.deleteRecord);
export default dbRoutes;
