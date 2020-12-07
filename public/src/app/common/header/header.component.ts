import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data.service';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    public auth: AuthService,
    public dataService: DataService,
    private apiService: ApiService,
    public router: Router,
    public authService: AuthService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.dataService.getProfileObs().subscribe(profile => this.isLoggedIn = profile);
  }

  logout() {
    this.auth.logout();
    this.dataService.setProfileObs(false);
  }

  openSurvey() {
    // window.location.href = '/#/survey';
    window.location.reload();
  }

  exportSurvey() {
    this.apiService.get('result/' + this.authService.getUserId())
      .subscribe(
        response => {
          console.log(response);
          // this.toastr.success(response.message || 'Survey fetch Successful');
          this.preparePDF(response.data);
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

  preparePDF(data) {
    const doc = new jsPDF.jsPDF();
    let col = ['Survey ID', 'Name', 'Email', 'Phone', 'Question Type', 'Question Title', 'Answer'];
    let rows = [];

    data.forEach((element, index) => {
      const choices = element.choices;
      choices.forEach((choice, i) => {
        let currentRow = [];
        currentRow.push(index + 1);
        if (i === 0) {
          currentRow.push(element.name);
          currentRow.push(element.email);
          currentRow.push(element.phone);
        } else {
          currentRow.push('');
          currentRow.push('');
          currentRow.push('');
        }
        currentRow.push(choice.questiontype);
        currentRow.push(choice.questiontitle);
        currentRow.push(choice.answerText);

        rows.push(currentRow);
      });

    });

    doc.autoTable(col, rows);
    doc.save('survey.pdf');
  }
}
