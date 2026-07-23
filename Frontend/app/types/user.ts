export enum ReceitaCategoria {
  PROJETO = "PROJETO",
  RECORRENTE = "RECORRENTE",
  CONSULTORIA = "CONSULTORIA",
}

export enum ReceitaStatus {
  RECEBIDO = "RECEBIDO",
  AGUARDANDO = "AGUARDANDO",
  ATRASADO = "ATRASADO",
}
export enum DespesaCategoria {
  MARKETING = "MARKETING",
  IMPOSTO = "IMPOSTO",
  EDUCACAO = "EDUCACAO",
  ALIMENTACAO = "ALIMENTACAO",
  EQUIPAMENTO = "EQUIPAMENTO",
  ESCRITORIO = "ESCRITORIO",
  SOFTWARE = "SOFTWARE",
  LAZER = "LAZER",
}
export enum DespesaPagamento {
  BOLETO = "BOLETO",
  PIX = "PIX",
  CARTAO = "CARTAO",
  DINHEIRO = "DINHEIRO",
}
export type Despesa = {
  id: number;
  categoria: DespesaCategoria;
  despesaPagamento: DespesaPagamento;
  dataCriacao: string; // LocalDate -> ISO (yyyy-MM-dd)
  descricao: string;
  valor: number;
  userId?: number;
};
export type Receita = {
  id: number;
  descricao: string;
  valor: number;
  dataCriacao: string;
  categoria: ReceitaCategoria;
  clienteNome: string;
  receitaStatus: ReceitaStatus;
};

export type user = {
  id: number;
  nome: string;
  email: string;
  password: string;
  cargo: string;
  receitas: Receita[];
  despesas: Despesa[];
  projetos: string[];
};
