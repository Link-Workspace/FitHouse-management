import type { PageKey } from './types'

export interface PageSection {
  key: string
  label: string
}

export const PAGE_SECTIONS: Record<PageKey, PageSection[]> = {
  overview: [
    { key: 'hero', label: 'Resumo inteligente' },
    { key: 'metrics', label: 'Métricas principais' },
    { key: 'receita', label: 'Receita e despesas' },
    { key: 'movimentacao', label: 'Movimentação' },
    { key: 'recomendacoes', label: 'Recomendações' },
    { key: 'acoes', label: 'Ações rápidas' },
  ],
  access: [
    { key: 'hero', label: 'Monitoramento ao vivo' },
    { key: 'metrics', label: 'Métricas de acesso' },
    { key: 'fluxo', label: 'Fluxo de entrada' },
    { key: 'atencao', label: 'Ações recomendadas' },
  ],
  receptionist: [],
  finance: [
    { key: 'metrics', label: 'Métricas financeiras' },
    { key: 'grafico', label: 'Receita x despesas' },
    { key: 'origem', label: 'Origem e custos' },
    { key: 'inadimplencia', label: 'Inadimplência' },
    { key: 'recomendacoes', label: 'Recomendações da IA' },
    { key: 'saude', label: 'Saúde financeira' },
  ],
  students: [
    { key: 'metrics', label: 'Métricas de alunos' },
    { key: 'tabela', label: 'Base de alunos' },
  ],
  sales: [
    { key: 'metrics', label: 'Métricas da loja' },
    { key: 'categorias', label: 'Desempenho por categoria' },
    { key: 'historico', label: 'Histórico de vendas' },
    { key: 'estoque', label: 'Estoque e recomendações' },
  ],
  campaigns: [
    { key: 'hero', label: 'Comunicação integrada' },
    { key: 'metrics', label: 'Métricas de campanhas' },
    { key: 'campanhas', label: 'Lista de campanhas' },
    { key: 'segmentos', label: 'Públicos e IA' },
  ],
  employees: [
    { key: 'metrics', label: 'Métricas da equipe' },
    { key: 'recomendacao', label: 'Recomendação de gestão' },
    { key: 'equipe', label: 'Equipe e escala' },
    { key: 'desempenho', label: 'Desempenho e sugestões' },
  ],
  satisfaction: [
    { key: 'metrics', label: 'Métricas de satisfação' },
    { key: 'score', label: 'Score geral' },
    { key: 'feedbacks', label: 'Feedbacks recentes' },
    { key: 'pesquisas', label: 'Pesquisas e análise' },
    { key: 'banner', label: 'Pesquisa personalizada' },
  ],
  ai: [
    { key: 'hero', label: 'Central da IA' },
    { key: 'metrics', label: 'Métricas' },
    { key: 'automacoes', label: 'Automações' },
    { key: 'atividade', label: 'Atividade e saúde' },
    { key: 'chat', label: 'Assistente de gestão' },
  ],
  settings: [],
}
