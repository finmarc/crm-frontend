export interface Leads {
  id?: number;
  user_id?: number;
  product_id?: number;
  idProposta?: number;
  cnpj?: string;
  cpf?: any;
  nome?: string;
  mei?: boolean;
  cpfEmpresarioIndividual?: any;
  dataNascimento?: any;
  tempoConstituicao?: number;
  cnaePrincipal?: string;
  cnaesSecundarios?: string;
  cep?: string;
  valorFaturamento?: string;
  valorFinanciamento?: string;
  finalidade?: string;
  contatoNome?: string;
  contatoEmail?: string;
  contatoTelefone?: string;
  descricao?: string;
  is_active?: boolean;
  created_at?: any;
  updated_at?: any;
  bndes_reports?: BndesReport[];
}

export interface BndesReport {
  id?: number;
  lead_id?: any;
  idProposta?: number;
  idProposal?: number;
  situacaoProposta?: string;
  dataSituacaoProposta?: string;
  motivoSituacaoProposta?: string;
  tipoApoio?: string;
  taxaJuros?: string;
  taxaDesconto?: string;
  valorContratado?: string;
  prazoOperacao?: number;
  prazoAntecipacao?: number;
  opcaoGarantia?: string;
  dataContratacao?: string;
  description?: any;
  status?: boolean;
  user_id?: any;
  updated_by?: any;
  created_at?: string;
  updated_at?: string;
}
