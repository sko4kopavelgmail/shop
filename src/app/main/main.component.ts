import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../main-service/main.service';
import { Server } from '../Server';
import { LoadMethod } from '../loadMethod';
import { ServerCoef } from '../serverCoef';
import { OrderDto } from '../orderModels/orderDto';
import { PersonDto } from '../orderModels/personDto';
import { CustomerDto } from '../orderModels/customerDto';
import { ProductDto } from '../orderModels/productDto';
import { ServerSettingsDialogComponent } from '../server-settings-dialog/server-settings-dialog.component';
import { CommonResponse } from '../commonResponse';
import { FinalData } from '../finalData';
import { ResponseShowComponent } from '../response-show/response-show.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  servers: Server[];
  currentServer: Server;
  serversCoefs: ServerCoef[] = [];
  loadMethods: LoadMethod[];
  selectedLoadMethod: LoadMethod;
  transactionsAmount: number;
  logs: string = "";
  serversResult: FinalData[] = [];

  constructor(private mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mainService.getServers().subscribe(servers => {
      this.servers = servers;
      for (let i = 0; i < servers.length; i++) {
        this.serversCoefs.push(new ServerCoef(servers[i], 1));
      }
    });
    this.mainService.getLoadMethods().subscribe(loadMethods => this.loadMethods = loadMethods);
  }

  selectServer(server: Server) {
    this.currentServer = server;
    const dialogRef = this.dialog.open(ServerSettingsDialogComponent, {
      width: '340px',
      data: { currentServer: this.currentServer, active: this.currentServer.enabled }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.activateServer();
      } else if (result == "false") {
        this.disableServer();
      }
    });
  }

  disableServer() {
    let badge = this.getBadge();
    badge.setAttribute('style', 'background: red');
    badge.textContent = 'off';
    this.currentServer.enabled = false;
  }

  activateServer() {
    let badge = this.getBadge();
    badge.setAttribute('style', 'background: #3f51b5');
    badge.textContent = 'on';
    this.currentServer.enabled = true;
  }

  getBadge(): any {
    const myElement = document.getElementById(this.currentServer.port.toString());
    return myElement.getElementsByClassName('mat-badge-content')[0];
  }

  submitTransactions() {
    this.logs = "";
    let order = this.getOrder();
    this.serversResult = this.getNewServersResults();
    for (let i = 0; i < this.transactionsAmount; i++) {
      this.mainService.orderProduct(order).subscribe(response => {
        this.logs += response.processedBy + " [" + response.ms + "ms]\n";
        this.serversResult = this.processResponse(this.serversResult, response);
      });
    }
  }

  showResults(serverResults: FinalData[]) {
    const dialogRef = this.dialog.open(ResponseShowComponent, {
      width: '650px',
      data: { finalData: serverResults }
    });
  }

  getNewServersResults(): FinalData[] {
    let finalDataResult: FinalData[] = [];
    for(let i = 0; i < this.servers.length; i++) {
      let finalData = new FinalData();
      finalData.server = this.servers[i];
      finalData.timeAmount = 0;
      finalData.transactionAmount = 0;
      finalDataResult.push(finalData);
    }
    return finalDataResult;
  }

  processResponse(serverResults:FinalData[], response: CommonResponse): FinalData[] {
    for(let i = 0; i < this.servers.length; i++) {
      if(this.serversResult[i].server.name == response.processedBy) {
        this.serversResult[i].timeAmount += response.ms;
        this.serversResult[i].transactionAmount++;
        if (this.serversResult[i].transactionAmount) {
          this.serversResult[i].averageTime = this.serversResult[i].timeAmount / this.serversResult[i].transactionAmount;
        }
      }
    }
    console.log(this.serversResult);
    return serverResults;
  }

  getOrder(): OrderDto {
    let person: PersonDto = new PersonDto(1);
    let customer: CustomerDto = new CustomerDto(1, person);
    let product: ProductDto = new ProductDto(1);
    return new OrderDto(product, customer);
  }

}