import { Agence } from "./Agence";
import { Role } from "./Role";

export class User{
    telephone?: string;
    password?: string;
    avatar?: string;
    roles?: Array<string>;
    agence?: Agence;
    is_actif?: boolean;
    email?: string;
    role_user?: Role;
}