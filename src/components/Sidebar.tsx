import {
  Bot,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ConciergeBell,
  DoorOpen,
  Gift,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  UserRoundCog,
} from 'lucide-react'
import type { PageKey, UserRole } from '../types'

const items: Array<{ key: PageKey; label: string; icon: typeof LayoutDashboard; badge?: string; featured?: boolean }> = [
  { key: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { key: 'access', label: 'Catraca', icon: DoorOpen, badge: 'LIGADO', featured: true },
  { key: 'receptionist', label: 'Recepcionista', icon: ConciergeBell },
  { key: 'finance', label: 'Financeiro', icon: CircleDollarSign },
  { key: 'students', label: 'Alunos', icon: Users },
  { key: 'sales', label: 'Loja & vendas', icon: ShoppingBag },
  { key: 'campaigns', label: 'Promoções & sorteios', icon: Gift },
  { key: 'employees', label: 'Funcionários', icon: UserRoundCog },
  { key: 'satisfaction', label: 'Satisfação', icon: HeartHandshake },
  { key: 'ai', label: 'Central da IA', icon: Bot, badge: '9' },
  { key: 'settings', label: 'Configurações', icon: Settings },
]

interface SidebarProps {
  page: PageKey
  onNavigate: (page: PageKey) => void
  collapsed: boolean
  onToggle: () => void
  role: UserRole
  onLogout: () => void
}

export function Sidebar({ page, onNavigate, collapsed, onToggle, role, onLogout }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar__brand">
        <img src={`${import.meta.env.BASE_URL}fit-house-logo.png`} alt="Fit House" />
        {!collapsed && (
          <div>
            <strong>FIT HOUSE</strong>
            <span>SISTEMA DE GESTÃO</span>
          </div>
        )}
      </div>

      <button className="sidebar__toggle" onClick={onToggle} aria-label="Alternar menu">
        {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </button>

      <nav className="sidebar__nav">
        
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.key}
              className={`sidebar__item ${page === item.key ? 'is-active' : ''} ${item.featured ? 'is-featured' : ''}`}
              onClick={() => onNavigate(item.key)}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar__item-icon"><Icon size={18} /></span>
              {!collapsed && <span className="sidebar__item-label">{item.label}</span>}
              {!collapsed && item.badge && <span className={`sidebar__badge ${item.featured ? 'sidebar__badge--live' : ''}`}>{item.badge}</span>}
              {collapsed && item.badge && index === 1 && <span className="sidebar__live-dot" />}
            </button>
          )
        })}
      </nav>

      <div className="sidebar__bottom">
        {!collapsed && (
          <div className="sidebar__ai-card">
            <div className="sidebar__ai-icon"><ChartNoAxesCombined size={18} /></div>
            <div>
              <strong>IA monitorando</strong>
              <span>9 automações ativas</span>
            </div>
            <i />
          </div>
        )}
        <div className="sidebar__profile">
          <div className="avatar avatar--small">LW</div>
          {!collapsed && (
            <div>
              <strong>Lucas Wolff</strong>
              <span>{role}</span>
            </div>
          )}
          <button onClick={onLogout} aria-label="Sair"><LogOut size={16} /></button>
        </div>
      </div>
    </aside>
  )
}
