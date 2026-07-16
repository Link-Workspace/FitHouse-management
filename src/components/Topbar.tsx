import { useEffect, useRef, useState } from 'react'
import { Bell, Command, LayoutList, Search } from 'lucide-react'
import type { PageKey, ViewConfig } from '../types'
import { PAGE_SECTIONS } from '../viewConfig'
import { Toggle } from './Common'

const pageMeta: Record<PageKey, { title: string; subtitle: string }> = {
  overview: { title: 'Visão geral', subtitle: 'Acompanhe a operação completa da Fit House.' },
  access: { title: 'Catraca & presença', subtitle: 'Alunos que entraram, frequência e ações recomendadas em tempo real.' },
  finance: { title: 'Financeiro', subtitle: 'Receitas, despesas, pagamentos e oportunidades financeiras.' },
  students: { title: 'Controle de alunos', subtitle: 'Cadastros, planos, frequência e histórico de relacionamento.' },
  sales: { title: 'Loja & vendas', subtitle: 'Desempenho da loja de suplementos, produtos e estoque.' },
  campaigns: { title: 'Promoções & sorteios', subtitle: 'Crie campanhas e distribua pelo app e WhatsApp.' },
  employees: { title: 'Funcionários', subtitle: 'Equipe, desempenho, remuneração e recomendações de gestão.' },
  satisfaction: { title: 'Satisfação dos alunos', subtitle: 'Feedbacks do app, WhatsApp e pesquisas na saída.' },
  ai: { title: 'Central da IA', subtitle: 'Controle todas as automações inteligentes da academia.' },
  settings: { title: 'Configurações', subtitle: 'Preferências, integrações, segurança e dados da academia.' },
}

interface TopbarProps {
  page: PageKey
  onMobileMenu: () => void
  onSearch: (value: string) => void
  onOpenNotifications: () => void
  viewConfig: ViewConfig
  onViewConfigChange: (page: PageKey, key: string, value: boolean) => void
}

export function Topbar({ page, onMobileMenu, onSearch, onOpenNotifications, viewConfig, onViewConfigChange }: TopbarProps) {
  const [viewOpen, setViewOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const sections = PAGE_SECTIONS[page] ?? []
  const pageSections = viewConfig[page] ?? {}
  const hiddenCount = sections.filter((s) => pageSections[s.key] === false).length

  useEffect(() => {
    setViewOpen(false)
  }, [page])

  useEffect(() => {
    if (!viewOpen) return
    function handler(event: MouseEvent) {
      if (!dropRef.current?.contains(event.target as Node)) setViewOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [viewOpen])

  return (
    <header className="topbar">
      <div className="topbar__left" />
      <label className="global-search">
        <Search size={17} />
        <input placeholder="Buscar aluno, venda ou ação..." onChange={(event) => onSearch(event.target.value)} />
        <span><Command size={11} /> K</span>
      </label>
      <div className="topbar__actions">
        {sections.length > 0 && (
          <div className="view-config-wrap" ref={dropRef}>
            <button
              className={`topbar__view-btn ${viewOpen ? 'is-active' : ''}`}
              onClick={() => setViewOpen((v) => !v)}
              title="Configurar visualização"
              aria-label="Configurar visualização"
            >
              <LayoutList size={17} />
              {hiddenCount > 0 && <span className="view-config-badge">{hiddenCount}</span>}
            </button>
            {viewOpen && (
              <div className="view-config-dropdown">
                <div className="view-config-dropdown__header">
                  <strong>Visualização</strong>
                  <span>Escolha o que aparece nesta aba</span>
                </div>
                <div className="view-config-dropdown__list">
                  {sections.map((section) => (
                    <label key={section.key} className="view-config-item">
                      <span>{section.label}</span>
                      <Toggle
                        checked={pageSections[section.key] !== false}
                        onChange={(value) => onViewConfigChange(page, section.key, value)}
                      />
                    </label>
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <button
                    className="view-config-dropdown__reset"
                    onClick={() => sections.forEach((s) => onViewConfigChange(page, s.key, true))}
                  >
                    Restaurar padrão
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        <button className="topbar__notification" onClick={onOpenNotifications} aria-label="Notificações">
          <Bell size={19} />
          <span>5</span>
        </button>
        <div className="topbar__date">
          <strong>13 JUL</strong>
          <span>SEGUNDA-FEIRA</span>
        </div>
      </div>
    </header>
  )
}

