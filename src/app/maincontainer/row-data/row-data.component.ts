import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-row-data',
  templateUrl: './row-data.component.html',
  styleUrls: ['./row-data.component.css']
})
export class RowDataComponent {

  constructor(private dialogRef:MatDialogRef<RowDataComponent>,@Inject(MAT_DIALOG_DATA) private data) { }


}
