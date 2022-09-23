import { Component, Input, OnInit } from '@angular/core';
import { SkepsiService } from 'src/app/services/skepsi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorService } from 'src/app/services/Tutores/tutor.service';

@Component({
  selector: 'app-chatbot-tutor',
  templateUrl: './chatbot-tutor.component.html',
  styleUrls: ['./chatbot-tutor.component.css']
})
export class ChatbotTutorComponent implements OnInit {
  show = false;
  form = {
    comments: '',
    phone: ''
  }
  tutorName = '';
  tutorEmail = '';
  tutorPhone = '';

  constructor(
    private skepsiService:SkepsiService,
    private snackbar: MatSnackBar,
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.tutorService.getTutorData()
    .subscribe(
      (success)=>{
        this.tutorName = success.firstName +' '+success.lastName;
        this.tutorPhone = success.user.phoneNumber;
        this.tutorEmail = success.user.email;
      },(error)=>{
        console.log(error)
      }
    )
    this.form = {
      comments: '',
      phone: ''
    }
  }

  showChat(value:boolean){
    if(value == true){
      const chat = document.getElementById("myForm");
      chat!.style.display = 'block';
    }else{
      const chat = document.getElementById("myForm");
      chat!.style.display = 'none';
    }
  }

  sendData(){
    console.log(this.form)
    const data = {
      name: this.tutorName,
      phoneNumber: this.tutorPhone,
      email: this.tutorEmail,
      comments: this.form.comments,
      sourceArea: 'Entrenador'
    }
    this.skepsiService.addMessage(data)
    .subscribe(
      (success)=>{
        this.snackbar.open('Comentarios enviados correctamente.',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
