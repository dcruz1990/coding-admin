import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { UserService } from '../services/user.service';
import { NbDialogService } from '@nebular/theme';
import { AlertService } from '../services/alert.service';
import { Language } from '../models/Language';
import resolvePropsSimple from '../helpers/resolveProps'
import { Skill } from '../models/Skill';
// import resolvePropsSimple from '../helpers/resolveProps'


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  langs: any
  educations: any
  awards: any
  skills: Skill[]
  projects: any
  workExperiences: any

  newlang = {
    name: '',
    userid: this.user.getCurrentUserId()
  }

  spinner = false

  constructor(private alert: AlertService, private resume: ResumeService, private user: UserService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.getData()
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
    this.resume.getSkills(this.user.getCurrentUserId()).subscribe((data) => {
      this.skills = data;
    })
    this.resume.getProjects(this.user.getCurrentUserId()).subscribe((data) => {
      this.projects = data;
    })
    this.resume.getAwards(this.user.getCurrentUserId()).subscribe((data) => {
      this.awards = data;
    })
    this.resume.getWe(this.user.getCurrentUserId()).subscribe((data) => {
      this.workExperiences = data;
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
          break

        case 'deleteskill':
          this.resume.deleteSkill(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your Skill was deleted')
          })
          this.skills = this.skills.filter((obj: any) => obj.id !== data.id)
          break

        case 'deleteproject':
          this.resume.deleteProject(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your Project was deleted')
          })
          this.projects = this.projects.filter((obj: any) => obj.id !== data.id)
          break

        case 'deleteaward':
          this.resume.deleteAward(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your Award was deleted')
          })
          this.awards = this.awards.filter((obj: any) => obj.id !== data.id)
          break

        case 'deletewe':
          this.resume.deleteWe(data.id).subscribe((result) => {
            this.alert.showToast('bottom-left', 'info', 'Delete Ok', 'Your WorkExperience was deleted')
          })
          this.workExperiences = this.workExperiences.filter((obj: any) => obj.id !== data.id)
          break


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

        case 'skill':
          this.resume.updateSkill(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Skills Updated')
            }
          )
          const skillPos = this.skills.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.skills[skillPos] = info.body
          break;

        case 'project':
          this.resume.updateProject(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Projects Updated')
            }
          )
          const projectPos = this.projects.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.projects[projectPos] = info.body
          break;

        case 'award':
          this.resume.updateAward(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Awards Updated')
            }
          )
          const awardPos = this.awards.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.awards[awardPos] = info.body
          break;

        case 'we':
          this.resume.updateWe(info.body.id, info.body).subscribe(
            result => {
              this.alert.showToast('top-right', 'success', 'Update', 'Work experiences updated')
            }
          )
          const wePos = this.workExperiences.map((item) => {
            return item.id
          }).indexOf(info.body.id)
          this.workExperiences[wePos] = info.body
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

  createDialogGeneric(dialog: TemplateRef<any>, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: this.skills
      }
    })
  }
}
