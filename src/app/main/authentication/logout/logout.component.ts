import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
    ) { }

  ngOnInit() {
    this._authenticationService.logout();
    // location.reload(true);
    this._router.navigate(['/login']);
  }

}
