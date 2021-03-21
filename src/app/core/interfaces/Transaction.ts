import { Client } from "./Client";

export interface Transaction 
{
  id?: number;
  type?: string;
  montant?: string;
  date_depot?: Date;
  date_retrait?: string;
  code?: string;
  frais?: string;
  part_agence_depot?: number;
  part_agence_retrait?: number;
  part_etat?: number;
  part_systeme?: number;
  user_agence_depot?: any;
  user_agence_rerait?: any;
  client_depot?: Client;
  client_retrait?: Client;
  date?: Date
}
