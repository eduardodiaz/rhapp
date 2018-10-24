
export class Usuario {

    constructor(
        public nombre: string,
        public noEmpleado: number,
        public usuario: string,
        public password: string,
        public img?: string,
        public role?: string,
        public id?: string
    ) { }
}
