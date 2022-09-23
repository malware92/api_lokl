export class HttpResponse {
    status: boolean;
    message: string;
    data: object;
  
    constructor() {
      this.status = false;
      this.message = "";
      this.data = {};
    }
  
    findOne(dataFinded: object) {
      this.status = true;
      this.message = `Registro encontrado`;
      this.data = dataFinded;
    }
  
    findAll(allRecords: any) {
      this.status = true;
      this.message = `Todos los registros encontrados`;
      this.data = allRecords;
    }
  
    accessDenied() {
      this.message = `Acceso denegado`;
      this.data = { status: 401 };
    }
  
    emptyRecords() {
      this.status = true;
      this.message = "No records found";
      this.data = [];
    }
  
    error(message: any) {
      this.message = message;
      this.data = {};
    }
  
    success(message: string, data: object) {
      this.status = true;
      this.message = message;
      this.data = { data };
    }
  
    personalized(status: any, message: any, dat: any) {
      this.status = status;
      this.message = message;
    }
  }
  