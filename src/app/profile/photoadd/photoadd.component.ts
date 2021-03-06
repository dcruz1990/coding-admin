import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { FileUploadModule } from "ng2-file-upload";

import { FileUploader } from "ng2-file-upload";

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { UserService } from '../../services/user.service'
import { AuthService } from '../../services/auth.service'
import { Photo } from 'src/app/models/Photo';

const URL = 'http://localhost:5050/api/photo/6';


@Component({
  selector: 'app-photoadd',
  templateUrl: './photoadd.component.html',
  styleUrls: ['./photoadd.component.scss']
})


export class PhotoaddComponent implements OnInit {
  userdata: any
  photos: any

  public uploader: FileUploader = new FileUploader({ url: URL, method: 'POST' });

  hasBaseDropZoneOver: boolean;

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.user.getUser(this.user.getCurrentUserId()).subscribe((result) => {
      this.userdata = result
      this.photos = this.userdata.photos

    })

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        URL +
        'photo/' +
        this.user.getCurrentUserId(),
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingAll = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }




}
