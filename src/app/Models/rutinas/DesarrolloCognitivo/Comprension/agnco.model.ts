export class agnco{
    constructor(
        public imagen: string,
        public nombre: string,
        public boca: string,
        public ojos: string,
        public patas: string,
        public estado: string,
    ){}
  }
  
export class dgnco{
    constructor(
        public nombre: string, 
        public imagen: string, 
        public opcionA: string, 
        public opcionB: string, 
        public opcionC: string, 
        public respuesta: any
    ){}
}
