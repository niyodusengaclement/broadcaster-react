import moment from 'moment';
import upload from '../../modals/v2/upload';
import userModal from '../../modals/v2/userModal';
import notification from '../../modals/notification';
import validation from '../../helpers/validation';
import db from '../../modals/v2/db';

class Report {
  async newRecord(req, res) {
    const { error } = validation.reportValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    if (!req.files) {
      const values = [req.body.title, req.body.type, moment().format('MMMM Do YYYY, h:mm:ss a'), req.user.id, req.body.comment, req.body.location, 'pending', '', '', req.body.tag];
      const report = await userModal.createReport(values);
      return res.status(201).json({
        status: 201,
        message: 'Created red-flag record',
        data: report,
      });
    }
    return upload.saveData(req, res);
  }

  async singleReport(req, res) {
    const reportId = parseInt(req.params.redFlagId, 10);
    const { error } = validation.redflagIdValidation(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    const report = await userModal.findReport(reportId);
    if (report) {
      return res.status(200).json({
        status: 200,
        data: report,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Record not found',
    });
  }

  async allReports(req, res) {
    const text = 'SELECT * FROM reports';
    const { rows } = await db.query(text);
    if (rows) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No data found',
    });
  }

  async editComment(req, res) {
    const { error } = validation.reportValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    const report = [
      req.body.title,
      req.body.type,
      req.body.comment,
      req.body.location,
      req.body.tag,
      req.myReport.id,
    ];
    const text = 'UPDATE reports SET title=$1, type=$2, comment=$3, location=$4, tag=$5 WHERE id=$6 returning *';
    const { rows } = await db.query(text, report);
    return res.status(200).json({
      status: 200,
      message: 'Updated red-flag record’s comment',
      data: rows[0],
    });
  }

  async changeLocation(req, res) {
    const { error } = validation.locationValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    const values = [
      req.body.location,
      req.myReport.id,
    ];
    const text = 'UPDATE reports SET location=$1 WHERE id=$2 returning *';
    const { rows } = await db.query(text, values);
    return res.status(200).json({
      status: 200,
      message: 'Updated red-flag record’s location',
      data: rows[0],
    });
  }

  async changeStatus(req, res) {
    if (!req.myReport) {
      return res.status(404).json({
        status: 404,
        error: 'Record not found',
      });
    }
    if (!req.body.status || req.body.status.length < 4) {
      return res.status(400).json({
        status: 400,
        error: 'Status is required and atleast with 4 characters long',
      });
    }
    const report = req.myReport;
    const { createdby } = req.myReport;
    const values = [report.id, req.body.status];
    const updateReport = await db.query('UPDATE reports SET status=$2 WHERE id=$1 returning *', values);
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1 ', [createdby]);
    const message = `Your red-flag has been reviewed by Authoroties in duty and status has changed to ${req.body.status}.
    The Broadcaster (c)2019`;
    notification.SendNotification(rows[0], message);
    return res.status(200).json({
      status: 200,
      message: 'Updated red-flag record’s status',
      data: updateReport.rows[0],
    });
  }

  async deleteRecord(req, res) {
    const report = req.myReport;
    const { rows } = await db.query('DELETE FROM reports WHERE id=$1 returning *', [report.id]);
    return res.status(200).json({
      status: 200,
      data: {
        id: rows[0].id,
        message: 'Red-flag record has been deleted',
      },
    });
  }
}
export default new Report();
