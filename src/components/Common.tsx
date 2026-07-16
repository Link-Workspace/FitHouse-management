import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowDownRight, ArrowUpRight, CheckCircle2, X } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  icon: ReactNode
  tone?: 'red' | 'bronze' | 'green' | 'blue' | 'neutral'
  helper?: string
}

export function MetricCard({ label, value, change, positive = true, icon, tone = 'neutral', helper }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className={`metric-card__icon metric-card__icon--${tone}`}>{icon}</div>
      <div className="metric-card__copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <div className="metric-card__foot">
          {change && <em className={positive ? 'is-positive' : 'is-negative'}>{positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}</em>}
          {helper && <small>{helper}</small>}
        </div>
      </div>
    </article>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase()
  let tone = 'neutral'
  if (['em dia', 'liberado', 'concluída', 'ativa', 'ativo', 'positivo'].includes(normalized)) tone = 'success'
  if (['pendente', 'atenção', 'agendada', 'folga', 'neutro'].includes(normalized)) tone = 'warning'
  if (['atrasado', 'bloqueado', 'cancelada', 'negativo'].includes(normalized)) tone = 'danger'
  if (['congelado', 'finalizada', 'férias', 'rascunho'].includes(normalized)) tone = 'muted'
  return <span className={`status-badge status-badge--${tone}`}><i />{status}</span>
}

export function Avatar({ initials, tone = 0, large = false }: { initials: string; tone?: number; large?: boolean }) {
  return <span className={`avatar avatar--tone-${tone % 6} ${large ? 'avatar--large' : ''}`}>{initials}</span>
}

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </div>
  )
}

export function Modal({ title, subtitle, children, onClose, width = '640px' }: { title: string; subtitle?: string; children: ReactNode; onClose: () => void; width?: string }) {
  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal" style={{ maxWidth: width }} onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal__header">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Fechar"><X size={19} /></button>
        </header>
        <div className="modal__body">{children}</div>
      </section>
    </div>,
    document.body
  )
}

export function Toast({ message }: { message: string }) {
  return <div className="toast"><CheckCircle2 size={18} /><span>{message}</span></div>
}

export function Toggle({ checked, onChange, disabled = false }: { checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) {
  return (
    <button className={`toggle ${checked ? 'is-on' : ''}`} onClick={() => !disabled && onChange(!checked)} disabled={disabled} aria-pressed={checked}>
      <span />
    </button>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><strong>{title}</strong><p>{description}</p></div>
}
