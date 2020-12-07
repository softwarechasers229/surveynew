import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent implements OnInit {
  allSurvey: any = [];
  constructor(
    private apiService: ApiService,
    public router: Router,
    public authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllSurvey();
  }


  getAllSurvey() {
    this.apiService.get('survey/user/' + this.authService.getUserId())
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success(response.message || 'Survey fetch Successful');
          this.allSurvey = response.data;
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/survey-edit/' + id]);
  }

  delete(id: number) {
    this.apiService.delete('survey', id)
      .subscribe(
        (data: any) => {
          this.toastr.success('Survey Deleted');
          this.getAllSurvey();
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
