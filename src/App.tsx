import { useEffect, useState } from 'react'
import { AlertTriangle, BellRing, Bot, Gift, MessageCircleMore, WalletCards } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Modal, Toast } from './components/Common'
import { OverviewPage } from './pages/OverviewPage'
import { AccessPage } from './pages/AccessPage'
import { FinancePage } from './pages/FinancePage'
import { StudentsPage } from './pages/StudentsPage'
import { SalesPage } from './pages/SalesPage'
import { CampaignsPage } from './pages/CampaignsPage'
import { EmployeesPage } from './pages/EmployeesPage'
import { SatisfactionPage } from './pages/SatisfactionPage'
import { AIPage } from './pages/AIPage'
import { ReceptionistPage } from './pages/ReceptionistPage'
import { SettingsPage } from './pages/SettingsPage'
import { LoginPage } from './pages/LoginPage'
import type { PageKey, UserRole, ViewConfig } from './types'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState<UserRole>('Diretor')
  const [page, setPage] = useState<PageKey>('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [viewConfig, setViewConfig] = useState<ViewConfig>(() => {
    try {
      const stored = localStorage.getItem('fit-house-view-config')
      return stored ? (JSON.parse(stored) as ViewConfig) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    const stored = localStorage.getItem('fit-house-gestao-session')
    if (stored) {
      try {
        const session = JSON.parse(stored) as { loggedIn: boolean; role: UserRole }
        setLoggedIn(session.loggedIn)
        setRole(session.role)
      } catch {
        localStorage.removeItem('fit-house-gestao-session')
      }
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  function login(nextRole: UserRole) {
    setRole(nextRole)
    setLoggedIn(true)
    localStorage.setItem('fit-house-gestao-session', JSON.stringify({ loggedIn: true, role: nextRole }))
  }

  function logout() {
    setLoggedIn(false)
    setPage('overview')
    localStorage.removeItem('fit-house-gestao-session')
  }

  function navigate(nextPage: PageKey) {
    setPage(nextPage)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(value: string) {
    if (value.length > 2) setToast(`Busca rápida por “${value}” disponível na demonstração.`)
  }
  function handleViewConfigChange(targetPage: PageKey, key: string, value: boolean) {
    setViewConfig((prev) => {
      const next = { ...prev, [targetPage]: { ...(prev[targetPage] ?? {}), [key]: value } }
      localStorage.setItem('fit-house-view-config', JSON.stringify(next))
      return next
    })
  }
  if (!loggedIn) return <LoginPage onLogin={login} />

  const pageProps = { onToast: setToast }
  const vs = (p: PageKey) => viewConfig[p] ?? {}
  const content = {
    overview: <OverviewPage onNavigate={navigate} visibleSections={vs('overview')} />,
    access: <AccessPage {...pageProps} visibleSections={vs('access')} />,
    receptionist: <ReceptionistPage {...pageProps} />,
    finance: <FinancePage {...pageProps} visibleSections={vs('finance')} />,
    students: <StudentsPage {...pageProps} visibleSections={vs('students')} />,
    sales: <SalesPage {...pageProps} visibleSections={vs('sales')} />,
    campaigns: <CampaignsPage {...pageProps} visibleSections={vs('campaigns')} />,
    employees: <EmployeesPage {...pageProps} role={role} visibleSections={vs('employees')} />,
    satisfaction: <SatisfactionPage {...pageProps} visibleSections={vs('satisfaction')} />,
    ai: <AIPage {...pageProps} visibleSections={vs('ai')} />,
    settings: <SettingsPage {...pageProps} role={role} onLogout={logout} />,
  }[page]

  return (
    <div className="management-shell">
      <div className={`mobile-sidebar-backdrop ${mobileMenu ? 'is-open' : ''}`} onClick={() => setMobileMenu(false)} />
      <div className={`sidebar-mobile-wrap ${mobileMenu ? 'is-open' : ''}`}>
        <Sidebar page={page} onNavigate={navigate} collapsed={false} onToggle={() => setMobileMenu(false)} role={role} onLogout={logout} />
      </div>
      <div className="desktop-sidebar-wrap">
        <Sidebar page={page} onNavigate={navigate} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} role={role} onLogout={logout} />
      </div>
      <main className={`management-main ${sidebarCollapsed ? 'management-main--collapsed' : ''}`}>
        <Topbar page={page} onMobileMenu={() => setMobileMenu(true)} onSearch={handleSearch} onOpenNotifications={() => setNotificationsOpen(true)} viewConfig={viewConfig} onViewConfigChange={handleViewConfigChange} />
        <div className="management-content">{content}</div>
      </main>

      {notificationsOpen && (
        <Modal title="Notificações" subtitle="Alertas importantes da operação" onClose={() => setNotificationsOpen(false)} width="560px">
          <div className="notification-center-list">
            <button onClick={() => { setNotificationsOpen(false); navigate('access') }}><span className="notification-center__icon notification-center__icon--red"><AlertTriangle size={17} /></span><div><strong>3 acessos precisam de atenção</strong><p>Dois pagamentos pendentes e um plano bloqueado.</p><small>Agora</small></div></button>
            <button onClick={() => { setNotificationsOpen(false); navigate('finance') }}><span className="notification-center__icon notification-center__icon--green"><WalletCards size={17} /></span><div><strong>Receita atingiu 97% da meta</strong><p>Faltam R$ 2.160 para alcançar a projeção de julho.</p><small>Há 12 min</small></div></button>
            <button onClick={() => { setNotificationsOpen(false); navigate('ai') }}><span className="notification-center__icon notification-center__icon--bronze"><Bot size={17} /></span><div><strong>2 decisões aguardam aprovação</strong><p>Negociação financeira e reposição de estoque.</p><small>Há 21 min</small></div></button>
            <button onClick={() => { setNotificationsOpen(false); navigate('campaigns') }}><span className="notification-center__icon notification-center__icon--blue"><Gift size={17} /></span><div><strong>Campanha agendada para amanhã</strong><p>“Semana da Creatina” será enviada pelo app e WhatsApp.</p><small>Há 1 h</small></div></button>
            <button onClick={() => { setNotificationsOpen(false); navigate('satisfaction') }}><span className="notification-center__icon notification-center__icon--green"><MessageCircleMore size={17} /></span><div><strong>Nota de satisfação subiu para 4,7</strong><p>Atendimento continua sendo o principal elogio.</p><small>Hoje, 09:20</small></div></button>
          </div>
          <button className="button button--soft button--full" onClick={() => { setNotificationsOpen(false); setToast('Todas as notificações foram marcadas como lidas.') }}><BellRing size={16} /> Marcar todas como lidas</button>
        </Modal>
      )}
      {toast && <Toast message={toast} />}
    </div>
  )
}

export default App
