//ESQUENTA
type TUser = {
    name:string,
    age:number
}

const user: TUser[] = []

const nome = true


/* PRÁTICA GUIADA - Parte 1
Crie um sistema de cadastro de usuários que contenha:

1. Type Alias para uma pessoa (TPerson) com as propriedades id, name, email, password e role;
2. Type Aliases para 2 contas (AdminAccount, NormalAccount) com as propriedades nickname e permission;
3. Crie exemplos de usuários Admin e Normal;
*/


//1.1
type TPerson = {
    id: number | string,
    name: string,
    email: string,
    password: string,
    role: ROLE // antes era "Admin" | "Normal" ou string
}

// const usuario: TPerson = {
//     id: 1,
//     name: "Matheus",
//     email: "mateus@email.com",
//     password: "123456",
//     role: "Admin"
// }

// 1.2 Type Aliases para 2 contas (TAdminAccount, TNormalAccount) com as propriedades nickname e permission;

type TAdminAccount = {
    nickName: string,
    permission: true
}

type TNormalAccount = {
    nickName: string,
    permission: false
}


// 1.3 Crie exemplos de usuários Admin e Normal;
const teste = true

const userAdmin: TAdminAccount = {
    nickName: "Muri",
    permission: teste //true

}

const userNormal: TNormalAccount = {
    nickName: "Yuri",
    permission: false
}





/* PRÁTICA GUIADA - Parte 2
Vamos continuar nosso sistema de cadastro de usuários criando:
*/ 

// 1. Enum com valores ADMIN e NORMAL e atribua à propriedade role do Tperson;

enum ROLE { //  valores pré-definidos (dados que não mudam).
    ADMIN = "Admin",
    NORMAL = "Normal",
}

const usuario: TPerson = {
    id: 1,
    name: "Matheus",
    email: "mateus@email.com",
    password: "123456",
    role: ROLE.ADMIN // antes era "Admin"
}

// 2. Tipo Intersection unindo: pessoa(TPerson) + permissão (Role); 

// Tipos que já existem neste arquivo:
// - TPerson
// - TAdminAccount
// - TNormaAccount

type TPersonAdmin = TPerson & TAdminAccount

const usuarioAdmin: TPersonAdmin = {
    id: 100,
    name: "Vitor",
    email: "vitor@email.com",
    password: "4321",
    role: ROLE.ADMIN,
    nickName: "Vitão",
    permission: true
}

type TPersonNormal = TPerson & TNormalAccount

const usuarioNormal: TPersonNormal = {
    id: 100,
    name: "Vitor",
    email: "vitor@email.com",
    password: "4321",
    role: ROLE.NORMAL,
    nickName: "Vitão",
    permission: false
}

// 3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;

const arrayPersonRole: Array<TPersonAdmin | TPersonNormal> = [usuarioAdmin, usuarioNormal]

const arrayPersonRoles: (TPersonAdmin | TPersonNormal)[] = [usuarioAdmin, usuarioNormal]
console.log(arrayPersonRole)
