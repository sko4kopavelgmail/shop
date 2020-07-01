export class Server {
    name: string;
    port: number;
    enabled: boolean;

    static convertToObj(obj: any): Server {
      const server: Server = new Server();
      Object.assign(server, obj);
      return server;
    }

  }