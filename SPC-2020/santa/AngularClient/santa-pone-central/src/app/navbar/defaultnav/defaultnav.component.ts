import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../home/login/login.component';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-defaultnav',
  templateUrl: './defaultnav.component.html',
  styleUrls: ['./defaultnav.component.css']
})
export class DefaultnavComponent implements OnInit {

  constructor(public auth: AuthService ) { }

  public inProduction: boolean;
  ngOnInit() {
    this.inProduction = environment.production;
  }
}

