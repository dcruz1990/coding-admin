import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { UserService } from '../services/user.service';
import { NbDialogService } from '@nebular/theme';
import { AlertService } from '../services/alert.service';
import { Language } from '../models/Language';
import resolvePropsSimple from '../helpers/resolveProps'
// import resolvePropsSimple from '../helpers/resolveProps'


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  langs: any
  educations: any
  awards: []
  skills: []
  projects: []
  workExperiences: []

  newlang = {
    name: '',
    userid: this.user.getCurrentUserId()
  }

  spinner = false

  constructor(private alert: AlertService, private resume: ResumeService, private user: UserService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.getData()
  }

  updateItem(itemid: any, itemdata: any, type: any) {
    console.log(itemdata)
    console.log(itemid)
    console.log(type)
    switch (type) {
      case 'education':
        this.resume.updateEducation(itemid, itemdata).subscribe(
          result => {
            this.alert.showToast('top-right', 'success', 'Update', 'Language Updated')
          }
        )
        break;

      default:
        break;
    }

  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] }
    }).filter((field: any) => field.key !== 'id' && field.key !== 'userId' && field.key !== 'dateCreated' && field.key !== 'dateModified')
  }

  getData() {
    this.resume.getLanguages(this.user.getCurrentUserId()).subscribe((data) => {
      this.langs = data;
    })
    this.resume.getEducation(this.user.getCurrentUserId()).subscribe((data) => {
      this.educations = data;
    })

  }

  openDeleteDialog(dialog: TemplateRef<any>, data: any, kind: any) {

    this.dialogService.open(dialog, {
      context: {
        object: data,
        type: kind
      }
    }).onClose.subscribe((result) => {
      console.log(result)
      switch (result) {
        case 'deletelanguage':
          this.resume.deleteLanguage(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your language was deleted')
          })
          this.langs = this.langs.filter((obj: any) => obj.id !== data.id)
          break;

        case 'deleteeducation':
          this.resume.deleteEducation(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your Education was deleted')
          })
          this.educations = this.educations.filter((obj: any) => obj.id !== data.id)


        default:
          break;
      }
    })
  }

  openEditDialog(dialog: TemplateRef<any>, data: any, kind: any) {
    const props = resolvePropsSimple(data)
    this.dialogService.open(dialog, {
      context: {
        object: data,
        type: kind,
        props: this.generateArray(data)
      }
    }).onClose.subscribe((info) => {
      console.log(info)
      switch (info.type) {
        case 'education':
          this.resume.updateEducation(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Education Updated')
            }
          )
          const Educpos = this.educations.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.educations[Educpos] = info.body
          break;

        case 'language':
          this.resume.updateLanguage(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Language Updated')
            }
          )
          const Langpos = this.langs.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.langs[Langpos] = info.body
          break;

        default:
          break;
      }
    })
  }

  openAddDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: this.newlang
    }).onClose.subscribe(result => {
      console.log(result)
      if (this.newlang.name !== '') {
        this.resume.addLanguage(this.newlang).subscribe(
          (done) => {
            this.alert.showToast('top-right', 'success', 'Success', 'Language: ' + this.newlang.name + ' Added!')
            this.langs.push(done)
            this.newlang = {
              name: '',
              userid: this.user.getCurrentUserId()
            }
          }
        )
      }
    })
  }
}
