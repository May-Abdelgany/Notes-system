import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  $bath_url: string = "https://route-egypt-api.herokuapp.com/";
  constructor(private _HttpClient: HttpClient,private _AuthService:AuthService) { }

  addNote(noteData: any): Observable<any> {
    return this._HttpClient.post(`${this.$bath_url}addNote`, noteData);
  }
  getAllUserNotes():Observable<any> {
    let obj={
      Token:<string>localStorage.getItem('Token_user'),
      userID:this._AuthService.decodeToken.getValue()._id
    }
    return this._HttpClient.get(`${this.$bath_url}getUserNotes`,{headers:obj});
  }
  deleteNote(obj:any):Observable<any> {

    return this._HttpClient.delete(`${this.$bath_url}deleteNote`,{body:obj});
  }
  editNote(obj:any):Observable<any> {

    return this._HttpClient.put(`${this.$bath_url}updateNote`,obj);
  }
}
