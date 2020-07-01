import { Server } from "./Server";

export class ServerCoef {
    server: Server;
    coef: number;

    constructor(server: Server, coef?: number) {
      this.server = server;
      this.coef = coef;
    }

  }