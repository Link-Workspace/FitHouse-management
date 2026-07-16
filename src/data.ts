import type { Automation, Campaign, CheckIn, Employee, FeedbackItem, Member, Product, Sale } from './types'

export const members: Member[] = [
  { id: 1, name: 'Mariana Oliveira', initials: 'MO', email: 'mariana.oliveira@email.com', phone: '(49) 99912-4401', cpf: '***.218.***-09', birthDate: '12/04/1996', plan: 'Fit Premium', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '18/02/2025', lastVisit: 'Hoje, 17:46', visitsMonth: 18, averageVisits: 4.5, goal: 'Hipertrofia', trainer: 'Carlos Mendes', nextCharge: '18/08/2026', monthlyFee: 189.9 },
  { id: 2, name: 'Rafael Martins', initials: 'RM', email: 'rafael.martins@email.com', phone: '(49) 99831-1204', cpf: '***.840.***-31', birthDate: '23/11/1991', plan: 'Fit Black', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '03/08/2024', lastVisit: 'Hoje, 17:42', visitsMonth: 21, averageVisits: 5.2, goal: 'Condicionamento', trainer: 'Ana Paula', nextCharge: '03/08/2026', monthlyFee: 229.9 },
  { id: 3, name: 'Gabriel Souza', initials: 'GS', email: 'gabriel.souza@email.com', phone: '(49) 99121-8840', cpf: '***.431.***-44', birthDate: '09/07/2001', plan: 'Fit Essencial', status: 'Pendente', accessStatus: 'Atenção', joinedAt: '11/01/2026', lastVisit: 'Hoje, 17:35', visitsMonth: 8, averageVisits: 2.0, goal: 'Emagrecimento', trainer: 'Carlos Mendes', nextCharge: '10/07/2026', monthlyFee: 129.9 },
  { id: 4, name: 'Juliana Ribeiro', initials: 'JR', email: 'juliana.ribeiro@email.com', phone: '(49) 99744-3011', cpf: '***.561.***-78', birthDate: '30/01/1988', plan: 'Fit Premium', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '22/05/2025', lastVisit: 'Hoje, 17:29', visitsMonth: 15, averageVisits: 3.8, goal: 'Saúde e bem-estar', trainer: 'Ana Paula', nextCharge: '22/07/2026', monthlyFee: 189.9 },
  { id: 5, name: 'Felipe Costa', initials: 'FC', email: 'felipe.costa@email.com', phone: '(49) 99284-1120', cpf: '***.930.***-12', birthDate: '18/09/1993', plan: 'Fit Black', status: 'Atrasado', accessStatus: 'Bloqueado', joinedAt: '04/10/2024', lastVisit: 'Há 9 dias', visitsMonth: 2, averageVisits: 0.5, goal: 'Ganho de força', trainer: 'Bruno Lima', nextCharge: '04/07/2026', monthlyFee: 229.9 },
  { id: 6, name: 'Beatriz Lima', initials: 'BL', email: 'beatriz.lima@email.com', phone: '(49) 99971-2284', cpf: '***.118.***-56', birthDate: '27/06/1998', plan: 'Fit Premium', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '16/03/2025', lastVisit: 'Hoje, 16:58', visitsMonth: 12, averageVisits: 3.0, goal: 'Hipertrofia', trainer: 'Carlos Mendes', nextCharge: '16/08/2026', monthlyFee: 189.9 },
  { id: 7, name: 'João Pedro Alves', initials: 'JA', email: 'joao.alves@email.com', phone: '(49) 99152-9022', cpf: '***.702.***-90', birthDate: '02/02/2000', plan: 'Fit Essencial', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '10/12/2025', lastVisit: 'Ontem, 19:10', visitsMonth: 11, averageVisits: 2.8, goal: 'Condicionamento', trainer: 'Bruno Lima', nextCharge: '10/08/2026', monthlyFee: 129.9 },
  { id: 8, name: 'Camila Rocha', initials: 'CR', email: 'camila.rocha@email.com', phone: '(49) 99640-5561', cpf: '***.340.***-14', birthDate: '15/08/1995', plan: 'Fit Premium', status: 'Congelado', accessStatus: 'Bloqueado', joinedAt: '08/04/2025', lastVisit: 'Há 22 dias', visitsMonth: 0, averageVisits: 0, goal: 'Emagrecimento', trainer: 'Ana Paula', nextCharge: 'Plano congelado', monthlyFee: 189.9 },
  { id: 9, name: 'Lucas Fernandes', initials: 'LF', email: 'lucas.fernandes@email.com', phone: '(49) 99377-1132', cpf: '***.222.***-81', birthDate: '01/12/1986', plan: 'Fit Black', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '20/06/2024', lastVisit: 'Hoje, 15:42', visitsMonth: 19, averageVisits: 4.8, goal: 'Performance', trainer: 'Bruno Lima', nextCharge: '20/07/2026', monthlyFee: 229.9 },
  { id: 10, name: 'Sofia Nunes', initials: 'SN', email: 'sofia.nunes@email.com', phone: '(49) 99821-6604', cpf: '***.881.***-30', birthDate: '06/03/2002', plan: 'Fit Essencial', status: 'Pendente', accessStatus: 'Atenção', joinedAt: '02/02/2026', lastVisit: 'Há 4 dias', visitsMonth: 5, averageVisits: 1.2, goal: 'Saúde e bem-estar', trainer: 'Ana Paula', nextCharge: '02/07/2026', monthlyFee: 129.9 },
  { id: 11, name: 'André Machado', initials: 'AM', email: 'andre.machado@email.com', phone: '(49) 99566-3090', cpf: '***.090.***-27', birthDate: '22/10/1989', plan: 'Fit Premium', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '15/09/2025', lastVisit: 'Hoje, 14:30', visitsMonth: 14, averageVisits: 3.5, goal: 'Ganho de força', trainer: 'Carlos Mendes', nextCharge: '15/08/2026', monthlyFee: 189.9 },
  { id: 12, name: 'Larissa Gomes', initials: 'LG', email: 'larissa.gomes@email.com', phone: '(49) 99902-7419', cpf: '***.737.***-62', birthDate: '19/05/1997', plan: 'Fit Black', status: 'Em dia', accessStatus: 'Liberado', joinedAt: '05/01/2025', lastVisit: 'Hoje, 13:18', visitsMonth: 17, averageVisits: 4.2, goal: 'Hipertrofia', trainer: 'Ana Paula', nextCharge: '05/08/2026', monthlyFee: 229.9 },
]

export const checkIns: CheckIn[] = [
  { id: 1, memberId: 1, name: 'Mariana Oliveira', initials: 'MO', time: '17:46', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Premium', visitsMonth: 18, message: 'Acesso liberado. Treino B programado.', recommendation: 'Elegível para brinde por alta frequência.' },
  { id: 2, memberId: 2, name: 'Rafael Martins', initials: 'RM', time: '17:42', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Black', visitsMonth: 21, message: 'Acesso liberado. Avaliação vence em 8 dias.', recommendation: 'Oferecer avaliação física gratuita.' },
  { id: 3, memberId: 3, name: 'Gabriel Souza', initials: 'GS', time: '17:35', gate: 'Catraca principal', status: 'Atenção', plan: 'Fit Essencial', visitsMonth: 8, message: 'Pagamento pendente há 3 dias.', recommendation: 'Enviar lembrete amigável pelo WhatsApp.' },
  { id: 4, memberId: 4, name: 'Juliana Ribeiro', initials: 'JR', time: '17:29', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Premium', visitsMonth: 15, message: 'Acesso liberado. Frequência estável.', recommendation: 'Convidar para o sorteio do mês.' },
  { id: 5, memberId: 6, name: 'Beatriz Lima', initials: 'BL', time: '16:58', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Premium', visitsMonth: 12, message: 'Acesso liberado. Meta semanal em 75%.', recommendation: 'Enviar incentivo para completar 4 treinos.' },
  { id: 6, memberId: 9, name: 'Lucas Fernandes', initials: 'LF', time: '15:42', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Black', visitsMonth: 19, message: 'Acesso liberado. Cliente recorrente da loja.', recommendation: 'Cupom de 10% em creatina.' },
  { id: 7, memberId: 11, name: 'André Machado', initials: 'AM', time: '14:30', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Premium', visitsMonth: 14, message: 'Acesso liberado.', recommendation: 'Nenhuma ação necessária.' },
  { id: 8, memberId: 12, name: 'Larissa Gomes', initials: 'LG', time: '13:18', gate: 'Catraca principal', status: 'Liberado', plan: 'Fit Black', visitsMonth: 17, message: 'Acesso liberado. Treino A programado.', recommendation: 'Elegível para campanha de indicação.' },
]

export const sales: Sale[] = [
  { id: 1048, member: 'Lucas Fernandes', product: 'Creatina Monohidratada 300g', category: 'Creatina', date: '13/07/2026 16:04', quantity: 1, total: 119.9, payment: 'PIX', status: 'Concluída' },
  { id: 1047, member: 'Mariana Oliveira', product: 'Whey Protein Chocolate 900g', category: 'Proteína', date: '13/07/2026 14:22', quantity: 1, total: 149.9, payment: 'Cartão', status: 'Concluída' },
  { id: 1046, member: 'Rafael Martins', product: 'Pré-treino Fire 300g', category: 'Pré-treino', date: '13/07/2026 11:40', quantity: 1, total: 99.9, payment: 'Débito', status: 'Concluída' },
  { id: 1045, member: 'Larissa Gomes', product: 'Barra proteica', category: 'Snack', date: '12/07/2026 19:12', quantity: 4, total: 39.6, payment: 'PIX', status: 'Concluída' },
  { id: 1044, member: 'Juliana Ribeiro', product: 'Coqueteleira Fit House', category: 'Acessórios', date: '12/07/2026 18:02', quantity: 1, total: 34.9, payment: 'Cartão', status: 'Concluída' },
  { id: 1043, member: 'Sofia Nunes', product: 'Whey Protein Baunilha 900g', category: 'Proteína', date: '12/07/2026 16:17', quantity: 1, total: 149.9, payment: 'Cartão', status: 'Pendente' },
  { id: 1042, member: 'André Machado', product: 'Creatina Monohidratada 300g', category: 'Creatina', date: '11/07/2026 20:05', quantity: 2, total: 239.8, payment: 'PIX', status: 'Concluída' },
]

export const products: Product[] = [
  { id: 1, name: 'Creatina Monohidratada 300g', category: 'Creatina', stock: 18, minStock: 12, price: 119.9, sold: 74, revenue: 8872.6 },
  { id: 2, name: 'Whey Protein Chocolate 900g', category: 'Proteína', stock: 9, minStock: 10, price: 149.9, sold: 61, revenue: 9143.9 },
  { id: 3, name: 'Pré-treino Fire 300g', category: 'Pré-treino', stock: 23, minStock: 8, price: 99.9, sold: 38, revenue: 3796.2 },
  { id: 4, name: 'Barra proteica', category: 'Snack', stock: 84, minStock: 30, price: 9.9, sold: 126, revenue: 1247.4 },
  { id: 5, name: 'Coqueteleira Fit House', category: 'Acessórios', stock: 7, minStock: 10, price: 34.9, sold: 29, revenue: 1012.1 },
]

export const employees: Employee[] = [
  { id: 1, name: 'Patrícia Almeida', initials: 'PA', role: 'Gerente geral', department: 'Gestão', shift: '08:00–18:00', status: 'Ativo', salary: 5200, performance: 96, since: '02/2022', phone: '(49) 99910-1122' },
  { id: 2, name: 'Carlos Mendes', initials: 'CM', role: 'Personal trainer', department: 'Treinamento', shift: '06:00–15:00', status: 'Ativo', salary: 3400, performance: 94, since: '08/2023', phone: '(49) 99144-3011' },
  { id: 3, name: 'Ana Paula', initials: 'AP', role: 'Personal trainer', department: 'Treinamento', shift: '14:00–23:00', status: 'Ativo', salary: 3400, performance: 91, since: '01/2024', phone: '(49) 99660-9844' },
  { id: 4, name: 'Bruno Lima', initials: 'BL', role: 'Instrutor', department: 'Treinamento', shift: '10:00–19:00', status: 'Ativo', salary: 2850, performance: 88, since: '09/2024', phone: '(49) 99222-5401' },
  { id: 5, name: 'Fernanda Rosa', initials: 'FR', role: 'Recepcionista', department: 'Atendimento', shift: '06:00–14:00', status: 'Ativo', salary: 2250, performance: 93, since: '03/2025', phone: '(49) 99811-4300' },
  { id: 6, name: 'Mônica Silveira', initials: 'MS', role: 'Recepcionista', department: 'Atendimento', shift: '14:00–22:00', status: 'Folga', salary: 2250, performance: 89, since: '05/2025', phone: '(49) 99944-5510' },
  { id: 7, name: 'Diego Rocha', initials: 'DR', role: 'Consultor de vendas', department: 'Loja', shift: '11:00–20:00', status: 'Ativo', salary: 2600, performance: 97, since: '11/2024', phone: '(49) 99334-9090' },
  { id: 8, name: 'Sandra Moraes', initials: 'SM', role: 'Serviços gerais', department: 'Operação', shift: '07:00–16:00', status: 'Férias', salary: 2100, performance: 90, since: '06/2023', phone: '(49) 99555-1180' },
]

export const initialCampaigns: Campaign[] = [
  { id: 1, type: 'Promoção', title: 'Semana da Creatina', description: '15% de desconto em toda a linha de creatinas para alunos ativos.', startDate: '14/07/2026', endDate: '20/07/2026', audience: 'Todos os alunos ativos', status: 'Agendada', channels: ['App', 'WhatsApp'], reached: 0, conversions: 0, code: 'CREATINA15' },
  { id: 2, type: 'Sorteio', title: 'Projeto Verão Fit House', description: 'Sorteio de 3 meses de plano Fit Black para alunos com 12 ou mais visitas no mês.', startDate: '01/07/2026', endDate: '31/07/2026', audience: 'Alunos com alta frequência', status: 'Ativa', channels: ['App', 'WhatsApp'], reached: 186, conversions: 73, prize: '3 meses de Fit Black' },
  { id: 3, type: 'Promoção', title: 'Volte a treinar', description: 'Condição especial para alunos com baixa frequência nos últimos 30 dias.', startDate: '05/07/2026', endDate: '18/07/2026', audience: 'Baixa frequência', status: 'Ativa', channels: ['WhatsApp'], reached: 64, conversions: 19, code: 'VOLTAR10' },
  { id: 4, type: 'Promoção', title: 'Indique um amigo', description: 'Aluno e amigo ganham benefícios ao fechar um novo plano.', startDate: '10/06/2026', endDate: '30/06/2026', audience: 'Todos os alunos', status: 'Finalizada', channels: ['App', 'WhatsApp'], reached: 402, conversions: 47, code: 'AMIGOFIT' },
]

export const feedbacks: FeedbackItem[] = [
  { id: 1, name: 'Mariana Oliveira', initials: 'MO', channel: 'Saída da academia', rating: 5, date: 'Hoje, 17:51', text: 'Equipamentos ótimos e treino bem organizado. Poderiam colocar mais um bebedouro no segundo piso.', sentiment: 'Positivo', topic: 'Estrutura' },
  { id: 2, name: 'Rafael Martins', initials: 'RM', channel: 'WhatsApp', rating: 5, date: 'Hoje, 12:18', text: 'Atendimento excelente e ambiente sempre limpo.', sentiment: 'Positivo', topic: 'Atendimento' },
  { id: 3, name: 'Gabriel Souza', initials: 'GS', channel: 'App', rating: 3, date: 'Ontem, 21:05', text: 'O app é bom, mas gostaria de receber mais detalhes sobre a execução dos exercícios.', sentiment: 'Neutro', topic: 'App' },
  { id: 4, name: 'Camila Rocha', initials: 'CR', channel: 'WhatsApp', rating: 2, date: 'Ontem, 15:40', text: 'Tive dificuldade para congelar o plano e esperei bastante por retorno.', sentiment: 'Negativo', topic: 'Atendimento' },
  { id: 5, name: 'Lucas Fernandes', initials: 'LF', channel: 'Saída da academia', rating: 4, date: '12/07, 20:42', text: 'Muito bom. Só fica cheio demais entre 18h e 20h.', sentiment: 'Positivo', topic: 'Lotação' },
  { id: 6, name: 'Larissa Gomes', initials: 'LG', channel: 'App', rating: 5, date: '12/07, 09:10', text: 'Adorei os vídeos dos exercícios e as notificações de treino.', sentiment: 'Positivo', topic: 'App' },
]

export const initialAutomations: Automation[] = [
  { id: 'access', title: 'Análise inteligente da catraca', description: 'Analisa cada entrada, verifica o plano e sugere ações de retenção ou recompensa.', category: 'Catraca e frequência', enabled: true, mode: 'Autônoma', executions: 1248, impact: '+14% de frequência' },
  { id: 'payments', title: 'Cobrança e negociação automática', description: 'Envia lembretes, propõe novas datas e encaminha casos sensíveis para a equipe.', category: 'Financeiro', enabled: true, mode: 'Aprovação manual', executions: 186, impact: 'R$ 8,4 mil recuperados' },
  { id: 'winback', title: 'Recuperação de alunos inativos', description: 'Identifica queda de frequência e dispara mensagens personalizadas e benefícios.', category: 'Retenção', enabled: true, mode: 'Autônoma', executions: 94, impact: '23 alunos reativados' },
  { id: 'surveys', title: 'Pesquisa de satisfação na saída', description: 'Conversa com o aluno após a saída e organiza feedbacks por tema e sentimento.', category: 'Experiência', enabled: true, mode: 'Autônoma', executions: 327, impact: '71% de respostas' },
  { id: 'campaigns', title: 'Campanhas e promoções', description: 'Define o melhor público, horário e canal para promoções criadas pela equipe.', category: 'Marketing', enabled: true, mode: 'Aprovação manual', executions: 38, impact: '+18% em conversões' },
  { id: 'inventory', title: 'Previsão de estoque da loja', description: 'Prevê ruptura, sugere reposição e identifica produtos com baixa saída.', category: 'Loja', enabled: true, mode: 'Aprovação manual', executions: 21, impact: '2 rupturas evitadas' },
  { id: 'salary', title: 'Recomendação de remuneração', description: 'Cruza resultado financeiro, desempenho e mercado para recomendar ajustes salariais.', category: 'Funcionários', enabled: false, mode: 'Aprovação manual', executions: 4, impact: 'Disponível para o diretor' },
  { id: 'finance', title: 'Consultoria financeira diária', description: 'Monitora receita, despesas, inadimplência e oportunidades de melhoria.', category: 'Financeiro', enabled: true, mode: 'Autônoma', executions: 207, impact: '+6,2% de margem' },
  { id: 'whatsapp', title: 'Atendimento pelo WhatsApp', description: 'Responde dúvidas, consulta planos e encaminha solicitações complexas.', category: 'Atendimento', enabled: true, mode: 'Autônoma', executions: 2890, impact: '82% resolvido sem equipe' },
]

export const revenueSeries = [68, 72, 70, 76, 79, 83, 87, 84]
export const expenseSeries = [49, 51, 50, 52, 54, 55, 56, 55]
export const accessSeries = [22, 34, 41, 58, 73, 81, 67, 54, 42, 38, 33, 25]
export const weekFrequency = [72, 88, 91, 86, 94, 62, 49]
