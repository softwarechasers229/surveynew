import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  allSurvey: any = [];
  id = 0;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllSurvey();
  }


  getAllSurvey() {
    this.apiService.get('surveys')
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

  open(id: number) {
    this.router.navigate(['/survey-response/' + id]);
  }


}
