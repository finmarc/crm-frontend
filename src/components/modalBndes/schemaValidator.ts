import * as Yup from 'yup';

export const schema = Yup.object().shape({
  situacaoProposta: Yup.string()
    .required('Situação obrigatório'),
  motivoSituacaoProposta: Yup.string()
    .test('situacao-motivo', "Motivo obrigatório", function (value) {
      return !['RECUSADA', 'EXPIRADA'].includes(this.parent.situacaoProposta) || !!value
    }),
  tipoApoio: Yup.string()
    .test('situacao-apoio', "Tipo apoio obrigatório", function (value) {
      return ![
        'CONTRATADA_COM_LINHAS_PROPRIAS',
        'CONTRATADA_COM_BNDES_MICROCREDITO',
        'CONTRATADA_COM_FIDC_BNDES'
      ].includes(this.parent.situacaoProposta) || !!value
    }),
  taxaJuros: Yup.number()
    .test('situacao-juros', "Taxa de juros obrigatório", function (value) {
      return !([
        'CONTRATADA_COM_LINHAS_PROPRIAS',
        'CONTRATADA_COM_BNDES_MICROCREDITO',
        'CONTRATADA_COM_FIDC_BNDES'
      ].includes(this.parent.situacaoProposta) &&
        this.parent.tipoApoio !== 'R') || !!value
    }),
  valorContratado: Yup.number().test('situacao-valor', "Valor obrigatório", function (value) {
    return !([
      'CONTRATADA_COM_LINHAS_PROPRIAS',
      'CONTRATADA_COM_BNDES_MICROCREDITO',
      'CONTRATADA_COM_FIDC_BNDES'
    ].includes(this.parent.situacaoProposta)) || !!value
  }),
  prazoOperacao: Yup.number().test('situacao-operacao', "Prazo operação obrigatório", function (value) {
    return !([
      'CONTRATADA_COM_LINHAS_PROPRIAS',
      'CONTRATADA_COM_BNDES_MICROCREDITO',
      'CONTRATADA_COM_FIDC_BNDES'
    ].includes(this.parent.situacaoProposta) &&
      this.parent.tipoApoio !== 'R') || !!value
  }),
});
