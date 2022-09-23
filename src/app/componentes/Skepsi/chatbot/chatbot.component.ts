import { Component, OnInit } from '@angular/core';
import { SkepsiService } from 'src/app/services/skepsi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  show = false;
  form = {
    comments: '',
    phone: ''
  }

  constructor(
    private skepsiService:SkepsiService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
      name: 'Mensaje de Chatbot',
      phoneNumber: this.form.phone,
      email: '-',
      comments: this.form.comments,
      sourceArea: 'Chatbot'
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
