import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  notes: any [] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private noteService: NoteService,
    ) {
  }
    ngOnInit() {
      this.getNotes()
  }

  async onLogout(){
    await this.authService.logout();
    this.router.navigate(['/cover'])
  }

  getNotes(){
    this.noteService.getNote().subscribe(data =>{
      // this.notes = [];
      // data.forEach((element: any) => {
      //   // console.log(element.payload.doc.id);
      //   // console.log(element.payload.doc.data);
      //   this.notes.push({
      //     id: element.payload.doc.id,
      //     ...element.payload.doc.data()
      //   })
      // });

      this.notes = data.map((element: any) => ({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      );
        console.log(this.notes);
      // console.log(data);
    });
  }

  deleteNotes(id: string) {
    this.noteService.deleteNote(id).then(() =>{
      console.log('Tu nota ha sido eliminada');
    }).catch(error => {
      console.log(error);
    });
  }
}
