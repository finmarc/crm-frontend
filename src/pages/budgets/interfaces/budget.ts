export type Generic = {
  id: string;
  name: string;
};

export interface TypeDocument {
  id: number;
  name: string;
}

export interface Document {
  id: string;
  filename: string;
  path: string;
  type_document: TypeDocument;
}

export interface Type {
  documentType: {
    id: number,
    name: string,
  }
}
export interface Client extends Generic {}
export interface Partner extends Generic {}
export interface Product extends Generic {
  types?: Type[]
}
export interface Status extends Generic {}
export interface Types extends Generic {}
export interface Documents {
  document: Document;
}

export default interface Budget {
  id: string;
  code: number;
  expiresIn: Date;
  type: Types;
  client: Client;
  partner: Partner;
  product: Product;
  status: Status;
  user: any
  documents: Documents[];
  observation: string;
}

export interface BudgetEdit {
  id: string;
  type_id: string;
  client_id: string;
  partner_id: string;
  product_id: string;
  status_id: string;
  observation: string;
}
