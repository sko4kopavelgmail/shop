import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinalData } from '../finalData';
import { MatTableDataSource } from '@angular/material/table';
import { FinalDataInterface } from '../final-data-interface';

@Component({
  selector: 'app-response-show',
  templateUrl: './response-show.component.html',
  styleUrls: ['./response-show.component.css']
})



export class ResponseShowComponent implements OnInit {

  displayedColumns: string[] = ['server', 'port', 'transactions', 'ms', 'av-time']
  data: FinalData[];

  constructor(
    public dialogRef: MatDialogRef<ResponseShowComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInterface: FinalDataInterface) { 
      this.data = this.convertToArray(dataInterface.finalData);
    }

  ngOnInit(): void {
  }

  convertToArray(dataObj: any[]):FinalData[] {
    const result: FinalData[] = [];
    for(let i = 0; i < dataObj.length; i++) {
      const newFinalData:FinalData = FinalData.convetToObj(dataObj[i]);
      console.log(newFinalData);
      result.push(newFinalData);
    }
    return result;
  } 

}
