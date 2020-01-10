import jwt from 'jsonwebtoken';
import userModal from '../../modals/v2/userModal';
import validation from '../../helpers/validation';

class Authentication {
  validateRedflag(req, res, next) {
    const { error } = validation.idValidation(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    return next();
  }

  userAuthentication(req, res, next) {
    const check = req.header('x-auth');
    if (!check) {
      return res.status(401).json({
        status: 401,
        error: 'No token provided! Provide token and try again',
      });
    }
    try {
      const secret = process.env.JWT_TOKEN;
      const options = { expiresIn: '365d', issuer: 'www.jwt.io' };
      const decoded = jwt.verify(check, secret, options);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid token provided, check your token please',
      });
    }
  }

  async isAdmin(req, res, next) {
    const reportId = parseInt(req.params.red_Flag_Id, 10);
    const report = await userModal.findReport(reportId);
    if (req.user.isAdmin !== true) {
      return res.status(403).json({
        status: 403,
        error: 'Access forbidden! This action performed by Admin only',
      });
    }
    req.myReport = report;
    return next();
  }

  async grantAccess(req, res, next) {
    const reportId = parseInt(req.params.red_Flag_Id, 10);
    const report = await userModal.findReport(reportId);
    if (!report) {
      return res.status(404).json({
        status: 404,
        error: 'Record not found',
      });
    }
    if (req.user.id !== report.createdby) {
      return res.status(403).json({
        status: 403,
        error: 'Access forbidden! This is not your record',
      });
    }
    if (report.status === 'pending') {
      return res.status(403).json({
        status: 403,
        error: 'Access forbidden! Status is not yet changed, wait until they give you response',
      });
    }
    req.myReport = report;
    return next();
  }

  async verifyLink(req, res, next) {
    const { email, token } = req.params;
    if (!email || !token) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid reset password link or link has expired',
      });
    }
    try {
      const user = await userModal.findUser(email);
      const secret = user.password;
      const options = { expiresIn: '365d', issuer: 'www.jwt.io' };
      const decoded = jwt.verify(token, secret, options);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid reset password link or link has expired',
      });
    }
  }
}
export default new Authentication();
