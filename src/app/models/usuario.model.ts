
export class Usuario {
 // _id: string;

    constructor(
        public nombre: string,
        public noEmpleado: number,
        public usuario: string,
        public password: string,
        public img?: string,
        public role?: string,
        public _id?: string
    ) { }
}
