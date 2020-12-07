import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentuser: any = [];
  constructor(
    private apiService: ApiService,
    public router: Router,
    public authService: AuthService,
    private toastr: ToastrService) { }

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phone: new FormControl(),
    about: new FormControl('')
  });


  get f() {
    return this.form.controls;
  }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.apiService.get('user/' + this.authService.getUserId())
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success(response.message || 'user details fetch Successful');
          this.currentuser = response.data;
          this.form.patchValue(response.data);
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

  updateUser(): void {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
    }

    const data = this.form.value;
    this.apiService.put('user', this.authService.getUserId(), data)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success(response.message || 'User profil detail update Successful');
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

}
