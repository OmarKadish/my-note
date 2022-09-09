import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Note, NoteService } from '../note.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.page.html',
  styleUrls: ['./note-view.page.scss'],
})
export class NoteViewPage implements OnInit {
  note;
  isUpdate = false;
  @Input() id: string;
  userId: string;
  message: string;
  constructor(public noteService: NoteService,
    private modalCtrl: ModalController,) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    var decoded = helper.decodeToken(localStorage.getItem('token'));
    this.userId = decoded.id;
    if (this.id) {
      this.noteService.get(this.id).subscribe(response => {
        this.isUpdate = true;
        this.note = response;
      })
    }
  }


  addNote(form: NgForm) {
    if (form.value.title) {
      const noteToSave = form.value;
      noteToSave.user_id = this.userId;
      this.noteService.create(noteToSave).subscribe(response => {
        this.modalCtrl.dismiss(response, 'saved succesfuly');
      });
    }
    this.message = "The note title cann't be empty."
  }

  updateNote(form: NgForm) {
    if (form.value.title) {
      const noteToSave = form.value;
      this.noteService.update(noteToSave, this.note.id).subscribe(response => {
        this.modalCtrl.dismiss(response, 'updated succesfuly');
      });
    }
    this.message = "The note title cann't be empty."
  }


}
