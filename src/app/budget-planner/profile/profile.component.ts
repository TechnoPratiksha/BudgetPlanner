import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SideNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm : any;

  constructor(private fb: FormBuilder, private snacBar: MatSnackBar){}
  ngOnInit(): void{
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', Validators.required],

    });
  }
  onSubmit(){
    if(this.profileForm.valid){
      console.log(this.profileForm.value);
    }else{
      this.openSnackBar("Please fill in all fields correctly!", 'close');
    }
  }
  openSnackBar(message: string, action: string){
    this.snacBar.open(message, action, {
      duration:3000
    });
  }
}
