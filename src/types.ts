export type PageKey =
  | 'overview'
  | 'access'
  | 'receptionist'
  | 'finance'
  | 'students'
  | 'sales'
  | 'campaigns'
  | 'employees'
  | 'satisfaction'
  | 'ai'
  | 'settings'

export type ViewConfig = Partial<Record<PageKey, Record<string, boolean>>>

export type UserRole = 'Diretor' | 'Gerente' | 'Recepção'

export type MemberStatus = 'Em dia' | 'Pendente' | 'Atrasado' | 'Congelado'
export type AccessStatus = 'Liberado' | 'Atenção' | 'Bloqueado'

export interface Member {
  id: number
  name: string
  initials: string
  email: string
  phone: string
  cpf: string
  birthDate: string
  plan: string
  status: MemberStatus
  accessStatus: AccessStatus
  joinedAt: string
  lastVisit: string
  visitsMonth: number
  averageVisits: number
  goal: string
  trainer: string
  nextCharge: string
  monthlyFee: number
}

export interface CheckIn {
  id: number
  memberId: number
  name: string
  initials: string
  time: string
  gate: string
  status: AccessStatus
  plan: string
  visitsMonth: number
  message: string
  recommendation?: string
}

export interface Sale {
  id: number
  member: string
  product: string
  category: string
  date: string
  quantity: number
  total: number
  payment: string
  status: 'Concluída' | 'Pendente' | 'Cancelada'
}

export interface Product {
  id: number
  name: string
  category: string
  stock: number
  minStock: number
  price: number
  sold: number
  revenue: number
}

export interface Employee {
  id: number
  name: string
  initials: string
  role: string
  department: string
  shift: string
  status: 'Ativo' | 'Férias' | 'Folga'
  salary: number
  performance: number
  since: string
  phone: string
}

export interface Campaign {
  id: number
  type: 'Promoção' | 'Sorteio'
  title: string
  description: string
  startDate: string
  endDate: string
  audience: string
  status: 'Ativa' | 'Agendada' | 'Finalizada' | 'Rascunho'
  channels: string[]
  reached: number
  conversions: number
  code?: string
  prize?: string
}

export interface FeedbackItem {
  id: number
  name: string
  initials: string
  channel: 'App' | 'WhatsApp' | 'Saída da academia'
  rating: number
  date: string
  text: string
  sentiment: 'Positivo' | 'Neutro' | 'Negativo'
  topic: string
}

export interface Automation {
  id: string
  title: string
  description: string
  category: string
  enabled: boolean
  mode: 'Autônoma' | 'Aprovação manual'
  executions: number
  impact: string
}
