import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { DataService } from 'src/app/common/services/data.service';
const Months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Sepetember',
  'October',
  'November',
  'December'
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router, public dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.dataService.setProfileObs(true);
    }
  }

  getMonthYear(): string {
    // Return today's date and time
var currentTime = new Date();

// returns the month (from 0 to 11)
var month = currentTime.getMonth();

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();

// returns the year (four digits)
var year = currentTime.getFullYear();

return year + ' ' + Months[month];
  }

}
