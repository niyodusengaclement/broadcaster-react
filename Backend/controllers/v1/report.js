import upload from '../../modals/v1/upload';
import userModal from '../../modals/v1/userModal';
import reportData from '../../asset/report';
import notification from '../../modals/notification';
import validation from '../../helpers/validation';

class Report {
  newRecord(req, res) {
    const { error } = validation.reportValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    if (!req.files) return upload.saveData(req, res);
    upload.uploadVideos(req);
    upload.uploadPhotos(req);
    return upload.saveData(req, res);
  }

  singleReport(req, res) {
    const reportId = parseInt(req.params.redFlagId, 10);
    const report = userModal.findReport(reportId);
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

  allReports(req, res) {
    if (reportData.length >= 1) {
      return res.status(200).json({
        status: 200,
        data: reportData,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No data found',
    });
  }

  editComment(req, res) {
    const { error } = validation.reportValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    const report = req.myReport;
    report.title = req.body.title;
    report.type = req.body.type;
    report.comment = req.body.comment;
    report.location = req.body.location;
    report.tag = req.body.tag;
    return res.status(200).json({
      status: 200,
      data: [{
        id: report.id,
        message: 'Updated red-flag record’s comment',
      },
      ],
    });
  }

  changeLocation(req, res) {
    const { error } = validation.locationValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    const report = req.myReport;
    report.location = req.body.location;
    return res.status(200).json({
      status: 200,
      data: [{
        id: report.id,
        message: 'Updated red-flag record’s location',
      },
      ],
    });
  }

  changeStatus(req, res) {
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
    const userId = report.createdBy;
    const user = userModal.findUserById(userId);
    report.status = req.body.status;
    const message = `Your red-flag has been reviewed by Authoroties in duty and status has changed to ${report.status}.
    The Broadcaster (c)2019`;
    notification.SendNotification(user, message);
    return res.status(200).json({
      status: 200,
      data: [{
        id: report.id,
        message: 'Updated red-flag record’s status',
      },
      ],
    });
  }

  deleteRecord(req, res) {
    const allReports = userModal.report;
    const report = req.myReport;
    const index = allReports.indexOf(report);
    allReports.splice(index, 1);
    return res.status(200).json({
      status: 200,
      data: [{
        id: report.id,
        message: 'Red-flag record has been deleted',
      },
      ],
    });
  }
}
export default new Report();
