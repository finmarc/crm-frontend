export type Generic = {
  id: string;
  name: string;
};

export interface Client extends Generic {}
export interface Partner extends Generic {}
export interface Product extends Generic {}
export interface Status extends Generic {}
export interface Types extends Generic {}

export default interface Budget {
  id: string;
  code: number;
  expiresIn: Date;
  type: Types;
  client: Client;
  partner: Partner;
  product: Product;
  status: Status;
  observation: string
}

export  interface BudgetEdit {
  id: string;
  type_id: string;
  client_id: string;
  partner_id: string;
  product_id: string;
  status_id: string;
  observation: string;
}