import _ from 'lodash';
import moment from 'moment';
import reportData from '../../asset/report';

let imgName = [];
let vdName = [];

class UploadFile {
  uploadVideos(req) {
    this.allVideos = req.files.videos;
    if (!this.allVideos) return;
    if (this.allVideos.length <= 1 || this.allVideos.length === undefined) {
      vdName = this.allVideos.name;
      this.allVideos.mv(`./server/uploads/${this.allVideos.name}`);
      return;
    }
    _.forEach(_.keysIn(this.allVideos), (key) => {
      const video = this.allVideos[key];
      vdName.push(video.name);
      video.mv(`./server/uploads/${video.name}`);
    });
  }

  uploadPhotos(req) {
    this.allPhotos = req.files.images;
    if (!this.allPhotos) return;
    if (this.allPhotos.length <= 1 || this.allPhotos.length === undefined) {
      imgName = this.allPhotos.name;
      this.allPhotos.mv(`./server/uploads/${this.allPhotos.name}`);
      return;
    }
    _.forEach(_.keysIn(this.allPhotos), (key) => {
      const image = this.allPhotos[key];
      imgName.push(image.name);
      image.mv(`./server/uploads/${image.name}`);
    });
  }

  saveData(req, res) {
    this.reportId = reportData.length + 1;
    reportData.push({
      id: this.reportId,
      title: req.body.title,
      type: req.body.type,
      createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
      createdBy: req.user.id,
      comment: req.body.comment,
      location: req.body.location,
      status: 'pending',
      images: imgName,
      videos: vdName,
      tag: req.body.tag,
    });
    res.status(201).json({
      status: 201,
      data: {
        id: this.reportId,
        message: 'Created red-flag record',
      },
    });
    imgName = [];
    vdName = [];
  }
}
export default new UploadFile();
