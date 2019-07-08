import {Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Permission } from '../permission.model';


@Component({
  selector: 'app-permission-view-dailog',
  templateUrl: './permission-view-dailog.component.html',
  styleUrls: ['./permission-view-dailog.component.scss']
})
export class PermissionViewDailogComponent implements OnInit {

  listItem : Permission[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Permission) {
    console.log(data);
    this.listItem =data.children;
  }


  ngOnInit() {
  }

}
