import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Note {
  id?: string;
  title: string;
  content: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = 'http://noteappbackend/api/note';

  constructor(private http: HttpClient) { }

  getAll(userId: string){
    return this.http.get<[Note]>(this.url + '/getAll?uid='+userId);
  }

  get(id: string){
    return this.http.get<[Note]>(this.url + '/getNote?id=' + id);
  }

  create(note: Note){
    return this.http.post(this.url + '/store', note);
  }

  update(note: Note, id: string){
    return this.http.put(this.url + '/update?id=' + id, note);
  }

  delete(id: string){
    return this.http.delete(this.url + '/delete?id=' + id);
  }
}
