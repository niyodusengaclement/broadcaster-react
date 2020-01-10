import _ from 'lodash';
import moment from 'moment';
import cloudinary from 'cloudinary';
import userModal from './userModal';

cloudinary.config({
  cloud_name: 'broadcaster',
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


let videoUrl;
let imgUrl;
class UploadFile {
  uploadVideos(req) {
    this.allVideos = req.files.videos;
    if (!this.allVideos) return;
    cloudinary.v2.uploader.upload(this.allVideos.tempFilePath, { resource_type: 'video' }, (error, result) => {
      videoUrl = result.url;
      console.log('url >>', videoUrl);
      console.log('Video error occured >>', error);
      return videoUrl;
    });
  }

  uploadPhotos(req) {
    this.allPhotos = req.files.images;
    if (!this.allPhotos) return;
    cloudinary.v2.uploader.upload(this.allPhotos.tempFilePath, (error, result) => {
      imgUrl = result.url;
      console.log('im url<<', result.url);
      console.log('Image error >>', error);
      return imgUrl;
    });
  }

  saveData(req, res) {
    this.uploadVideos(req);
    this.uploadPhotos(req);
    setTimeout(async () => {
      const uploadValues = [req.body.title, req.body.type, moment().format('MMMM Do YYYY, h:mm:ss a'), req.user.id, req.body.comment, req.body.location, 'pending', imgUrl, videoUrl, req.body.tag];
      const report = await userModal.createReport(uploadValues);
      return res.status(201).json({
        status: 201,
        message: 'Created red-flag record',
        data: report,
      });
    }, 5000);
  }
}
export default new UploadFile();
