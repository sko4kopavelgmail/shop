import { Server } from './Server';

export class FinalData {
  server: Server;
  transactionAmount: number;
  timeAmount: number;
  averageTime: number;

  static convetToObj(obj: any): FinalData {
    const finalData: FinalData = new FinalData();

    Object.assign(finalData, obj);

    if(obj.server != null) {
      const server: Server = Server.convertToObj(obj.server);
      finalData.server = server;
    }

    return finalData;
  }

}