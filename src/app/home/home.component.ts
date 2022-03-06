import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { NoteService } from './../services/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  AddNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(3)]),
    desc: new FormControl(null, [Validators.required, Validators.minLength(20)]),
  });
  EditNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(3)]),
    desc: new FormControl(null, [Validators.required, Validators.minLength(20)]),
  });
  allNotes: any[] = [];
  notFound: string = " ";
  deleted: string = "";
  error_edit: string = ""
  idNote: string = "";
  constructor(private _NoteService: NoteService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.getAllUserNotes();
  }

  addNote(): any {
    let data = {
      title: this.AddNoteForm.value.title,
      desc: this.AddNoteForm.value.desc,
      userID: this._AuthService.decodeToken.getValue()._id,
      token: <string>localStorage.getItem('Token_user')
    }
    console.log(data)
    this._NoteService.addNote(data).subscribe((response) => {
      if (response.message == 'success') {
        $(".add").html('waitting');
        this.AddNoteForm.reset();
        $('#modal1').modal('hide');
        $('.success_message').animate({ 'opacity': 1.0 }, 1000);
        $('.success_message').animate({ 'opacity': 0 }, 2000);
        this.getAllUserNotes();
        $(".add").html('Add');

      }
    })
  }

  getAllUserNotes() {
    this._NoteService.getAllUserNotes().subscribe((response) => {
      if (response.message == 'success') {
        this.allNotes = response.Notes;
        console.log(this.allNotes)
      }
      else {
        this.notFound = response.message;
      }
    })
  }

  delete(id: string) {
    //$('#delete').modal('show');
    this.idNote = id;
  }


  sureDelete() {

    let obj = {
      noteID: this.idNote,
      token: localStorage.getItem('Token_user')
    }
    $(".delete").html('waitting');
    $('#delete').modal('hide');
    return this._NoteService.deleteNote(obj).subscribe((response) => {
      console.log(response);
      if (response.message == "deleted") {
        this.getAllUserNotes();
        $(".delete").html('Delete');
      }
      else {
        this.deleted = response.message;
      }
    });
  }

  edit(id: string) {
    this.idNote = id;
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i]._id == id) {
        // $('#title').val(this.allNotes[i].title);
        // $('#desc').val(this.allNotes[i].desc);
        this.EditNoteForm.controls['title'].setValue(this.allNotes[i].title);
        this.EditNoteForm.controls['desc'].setValue(this.allNotes[i].desc);
        break;
      }
    }
  }

  editNote() {
    let obj = {

      title: this.EditNoteForm.value.title,
      desc: this.EditNoteForm.value.desc,
      token: localStorage.getItem('Token_user'),
      NoteID: this.idNote
    }
    this._NoteService.editNote(obj).subscribe((response) => {
      if (response.message == 'updated') {
        $(".edit").html('waitting');
        this.AddNoteForm.reset();
        $('#modal2').modal('hide');
        this.getAllUserNotes();
        $(".edit").html('Edit');
      }
      else {
        this.error_edit = response.message;
      }
    })
  }
}
