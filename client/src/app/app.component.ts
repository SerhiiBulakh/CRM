import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const potentialToken = localStorage.getItem('auth-token')

    if(potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
  }
}
