export type Receita = {
  id: number;
  descricao: string;
  valor: number;
  dataCriacao: string; // ou Date, se você converter a data
  categoria: string;
  clienteNome: string;
  receitaStatus: string;
};

export type Despesa = {
  id: number;
  categoria: string;
  despesaPagamento: string;
  dataCriacao: string; // ou Date
  descricao: string;
  valor: number;
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
