import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Note, NoteService } from '../note.service';
import { NoteViewPage } from '../note-view/note-view.page';
import { AlertController, ModalController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes;

  userId: string;
  username: string;
  constructor(public router: Router,
    public authService: AuthService, private alertCtrl: AlertController,
    public noteService: NoteService, private modalCtrl: ModalController) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    var decoded = helper.decodeToken(localStorage.getItem('token'));
    this.userId = decoded.id;
    this.username = decoded.firstname;
    this.refresh();
    console.log(this.notes);
    
  }

  refresh(){
    this.noteService.getAll(this.userId).subscribe(response => {
      if (response) {
        this.notes = response;
      }
          
      
    })
  }

  addNote() {
    this.modalCtrl.create({
      component: NoteViewPage,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.9
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      }).then(({ data, role }) => {
        if (role === 'saved succesfuly') {
          this.refresh();
        }
      })
  }


  // opening the selected note from the list in model to view and update.
  openNote(note: Note) {
    this.modalCtrl.create({
      component: NoteViewPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.9
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({ data, role }) => {
      if (role === 'updated succesfuly') {
        this.refresh();
      }
    })
  }

  deleteNote(id: string) {
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.noteService.delete(id).subscribe(() => {
              this.notes = this.notes.filter(note => note.id !== id);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    }).then(alertmodel => alertmodel.present());
  }

  logout() {
    this.authService.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
