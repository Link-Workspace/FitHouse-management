import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  DoorOpen,
  Gift,
  MessageCircleMore,
  Search,
  Sparkles,
  TicketPercent,
  Users,
} from 'lucide-react'
import { checkIns, members } from '../data'
import { Avatar, MetricCard, Modal, SectionHeader, StatusBadge } from '../components/Common'
import type { CheckIn, Member } from '../types'


interface AccessPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function AccessPage({ onToast, visibleSections = {} }: AccessPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [filter, setFilter] = useState<'Todos' | 'Liberado' | 'Atenção' | 'Bloqueado'>('Todos')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<CheckIn | null>(null)

  const visible = useMemo(() => checkIns.filter((item) => {
    const matchesFilter = filter === 'Todos' || item.status === filter
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.plan.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  }), [filter, search])

  const selectedMember: Member | undefined = selected ? members.find((member) => member.id === selected.memberId) : undefined

  return (
    <div className="page-stack">
      <>
      {show('hero') && <section className="access-live-hero">
        <div className="access-live-hero__copy">
          <span><i /> MONITORAMENTO EM TEMPO REAL</span>
          <h2>47 alunos estão treinando agora.</h2>
          <p>A IA acompanha cada acesso, verifica o plano, interpreta a frequência e sugere ações para melhorar retenção e relacionamento.</p>
          <div className="access-live-hero__meta">
            <div><strong>63</strong><span>pico previsto às 18:40</span></div>
            <div><strong>08 min</strong><span>tempo médio desde a entrada</span></div>
            <div><strong>94%</strong><span>acessos sem intervenção</span></div>
          </div>
        </div>
        <div className="access-live-hero__visual">
          <div className="gate-visual">
            <div className="gate-visual__scanner"><DoorOpen size={31} /><i /></div>
            <span>CATRACA</span>
            <strong>ONLINE</strong>
          </div>
          <div className="access-pulse access-pulse--one" />
          <div className="access-pulse access-pulse--two" />
        </div>
      </section>}

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Treinando agora" value="47" change="12%" icon={<Users size={21} />} tone="red" helper="comparado à última segunda" />
        <MetricCard label="Entradas hoje" value="286" change="8,1%" icon={<DoorOpen size={21} />} tone="green" helper="até 17:50" />
        <MetricCard label="Alertas de acesso" value="3" change="2 a menos" icon={<AlertTriangle size={21} />} tone="bronze" helper="2 financeiros e 1 plano" />
        <MetricCard label="Frequência média" value="3,7x" change="0,4x" icon={<Activity size={21} />} tone="blue" helper="por aluno na semana" />
      </section>}

      {show('fluxo') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader
            eyebrow="FLUXO DE ENTRADA"
            title="Quem acabou de passar na catraca"
            description="Atualização automática conforme os acessos são reconhecidos."
            action={<span className="live-button"><i /> Sincronizado</span>}
          />
          <div className="table-toolbar">
            <label className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar aluno ou plano" /></label>
            <div className="segmented-control">
              {(['Todos', 'Liberado', 'Atenção', 'Bloqueado'] as const).map((option) => <button key={option} className={filter === option ? 'is-active' : ''} onClick={() => setFilter(option)}>{option}</button>)}
            </div>
          </div>
          <div className="access-stream">
            {visible.map((checkin, index) => (
              <button className={`access-row ${checkin.status !== 'Liberado' ? 'access-row--attention' : ''}`} key={checkin.id} onClick={() => setSelected(checkin)}>
                <div className="access-row__time"><strong>{checkin.time}</strong><span>HOJE</span></div>
                <Avatar initials={checkin.initials} tone={index} />
                <div className="access-row__identity"><strong>{checkin.name}</strong><span>{checkin.plan} • {checkin.visitsMonth} visitas no mês</span></div>
                <div className="access-row__message"><span>{checkin.message}</span>{checkin.recommendation && <em><Sparkles size={12} /> {checkin.recommendation}</em>}</div>
                <StatusBadge status={checkin.status} />
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel occupancy-card">
            <SectionHeader eyebrow="OCUPAÇÃO" title="Capacidade atual" />
            <div className="occupancy-ring" style={{ background: 'conic-gradient(#e12b2f 0 67%, #2a2522 67% 100%)' }}>
              <div><strong>67%</strong><span>47 de 70</span></div>
            </div>
            <div className="occupancy-status"><i /><span><strong>Movimento confortável</strong><small>Boa disponibilidade de equipamentos.</small></span></div>
            <div className="occupancy-times">
              <div><Clock3 size={15} /><span><strong>18h–20h</strong><small>Horário mais cheio</small></span></div>
              <div><CalendarDays size={15} /><span><strong>Quarta-feira</strong><small>Dia mais movimentado</small></span></div>
            </div>
          </article>

          <article className="panel ai-action-card">
            <div className="ai-action-card__icon"><Sparkles size={19} /></div>
            <span>OPORTUNIDADE DETECTADA</span>
            <h3>11 alunos com baixa frequência entraram nos últimos 7 dias.</h3>
            <p>Crie um incentivo automático para aumentar a recorrência deles ainda nesta semana.</p>
            <button className="button button--primary button--full" onClick={() => onToast('Campanha de frequência preparada para revisão.')}><TicketPercent size={16} /> Preparar incentivo</button>
          </article>
        </aside>
      </section>}

      {show('atencao') && <section className="panel">
        <SectionHeader eyebrow="AÇÕES RECOMENDADAS" title="Alunos que merecem atenção agora" description="Sugestões baseadas em frequência, pagamentos e relacionamento." />
        <div className="attention-grid">
          <article className="attention-card attention-card--warning">
            <div className="attention-card__top"><AlertTriangle size={18} /><span>FREQUÊNCIA EM QUEDA</span></div>
            <strong>Felipe Costa</strong><p>Somente 2 visitas no mês e último treino há 9 dias.</p>
            <div><button onClick={() => onToast('Cupom de retorno enviado para Felipe.')}><Gift size={14} /> Enviar presente</button><button onClick={() => onToast('Mensagem preparada no WhatsApp.')}><MessageCircleMore size={14} /> WhatsApp</button></div>
          </article>
          <article className="attention-card attention-card--danger">
            <div className="attention-card__top"><AlertTriangle size={18} /><span>PAGAMENTO ATRASADO</span></div>
            <strong>Gabriel Souza</strong><p>Pagamento pendente há 3 dias, mas manteve boa frequência.</p>
            <div><button onClick={() => onToast('Lembrete amigável enviado para Gabriel.')}><MessageCircleMore size={14} /> Lembrete gentil</button><button onClick={() => onToast('Negociação criada para aprovação.')}><TicketPercent size={14} /> Negociar</button></div>
          </article>
          <article className="attention-card attention-card--success">
            <div className="attention-card__top"><BadgeCheck size={18} /><span>ALTA FIDELIDADE</span></div>
            <strong>Rafael Martins</strong><p>21 visitas no mês e plano em dia há 23 meses.</p>
            <div><button onClick={() => onToast('Brinde registrado para Rafael retirar na recepção.')}><Gift size={14} /> Dar brinde</button><button onClick={() => onToast('Convite de indicação enviado.')}><Users size={14} /> Indicação</button></div>
          </article>
        </div>
      </section>}

      {selected && selectedMember && (
        <Modal title={selected.name} subtitle="Detalhes do acesso e relacionamento" onClose={() => setSelected(null)} width="760px">
          <div className="member-detail-head">
            <Avatar initials={selected.initials} large />
            <div><strong>{selectedMember.plan}</strong><span>Matrícula desde {selectedMember.joinedAt}</span></div>
            <StatusBadge status={selected.status} />
          </div>
          <div className="detail-metrics">
            <div><span>Horário da entrada</span><strong>{selected.time}</strong></div>
            <div><span>Visitas no mês</span><strong>{selected.visitsMonth}</strong></div>
            <div><span>Média semanal</span><strong>{selectedMember.averageVisits}x</strong></div>
            <div><span>Próxima cobrança</span><strong>{selectedMember.nextCharge}</strong></div>
          </div>
          <div className="detail-section"><span>LEITURA DA IA</span><h3>{selected.message}</h3><p>{selected.recommendation || 'Nenhuma ação recomendada neste momento.'}</p></div>
          <div className="modal-actions">
            <button className="button button--ghost" onClick={() => onToast('Perfil completo do aluno aberto.')}>Abrir perfil completo</button>
            <button className="button button--primary" onClick={() => onToast('Ação registrada com sucesso.')}><Sparkles size={16} /> Executar recomendação</button>
          </div>
        </Modal>
      )}
      </>
    </div>
  )
}
