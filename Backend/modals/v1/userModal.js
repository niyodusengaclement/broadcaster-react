import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../../asset/users';
import reportData from '../../asset/report';

class UserModal {
  constructor() {
    this.user = users;
    this.report = reportData;
    this.options = { expiresIn: '365d', issuer: 'www.jwt.io' };
  }

  findUser(email) {
    return this.user.find((data) => data.email === email);
  }

  addUser(data) {
    return this.user.push(data);
  }

  findReport(id) {
    return this.report.find((data) => data.id === id);
  }

  findUserById(id) {
    return this.user.find((data) => data.id === id);
  }

  allUsers() {
    return this.user;
  }

  generateToken(info) {
    try {
      this.payload = {
        email: info.email,
        username: info.username,
        id: info.id,
        isAdmin: info.isAdmin,
      };
      const secret = process.env.JWT_TOKEN;
      const token = jwt.sign(this.payload, secret, this.options);
      return token;
    } catch (err) {
      return err;
    }
  }

  async hashPassword(password) {
    try {
      this.salt = await bcrypt.genSalt(10);
      this.passHash = await bcrypt.hash(password, this.salt);
      return this.passHash;
    } catch (err) {
      return err;
    }
  }

  generateResetToken(info, secret) {
    try {
      const payload = {
        email: info.email,
        username: info.username,
        id: info.id,
        isAdmin: info.isAdmin,
      };
      const token = jwt.sign(payload, secret, this.options);
      return token;
    } catch (err) {
      return err;
    }
  }
}
export default new UserModal();
