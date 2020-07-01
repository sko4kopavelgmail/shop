import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server } from '../Server';
import { DialogData } from '../DialogData';

@Component({
  selector: 'app-server-settings-dialog',
  templateUrl: './server-settings-dialog.component.html',
  styleUrls: ['./server-settings-dialog.component.css']
})
export class ServerSettingsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServerSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
  }

}
