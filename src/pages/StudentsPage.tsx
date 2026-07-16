import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Download,
  Dumbbell,
  Filter,
  Mail,
  MessageCircleMore,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
import { members } from '../data'
import type { Member } from '../types'
import { Avatar, MetricCard, Modal, SectionHeader, StatusBadge } from '../components/Common'

interface StudentsPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function StudentsPage({ onToast, visibleSections = {} }: StudentsPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [plan, setPlan] = useState('Todos os planos')
  const [selected, setSelected] = useState<Member | null>(null)
  const [showNewStudent, setShowNewStudent] = useState(false)

  const filtered = useMemo(() => members.filter((member) => {
    const query = search.toLowerCase()
    return (member.name.toLowerCase().includes(query) || member.email.toLowerCase().includes(query) || member.phone.includes(search))
      && (status === 'Todos' || member.status === status)
      && (plan === 'Todos os planos' || member.plan === plan)
  }), [search, status, plan])

  return (
    <div className="page-stack">
      <div className="page-actions-row page-actions-row--spread">
        <div className="student-summary-line"><strong>438 alunos ativos</strong><span>28 novas matrículas em julho</span></div>
        <div className="page-actions-row__group">
          <button className="button button--ghost" onClick={() => onToast('Lista de alunos exportada para demonstração.')}><Download size={16} /> Exportar</button>
          <button className="button button--primary" onClick={() => setShowNewStudent(true)}><UserPlus size={16} /> Novo aluno</button>
        </div>
      </div>

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Alunos ativos" value="438" change="6,8%" icon={<Users size={21} />} tone="red" helper="410 no mês anterior" />
        <MetricCard label="Novas matrículas" value="28" change="16,7%" icon={<UserPlus size={21} />} tone="green" helper="meta mensal: 32" />
        <MetricCard label="Planos renovados" value="94,2%" change="1,8%" icon={<UserCheck size={21} />} tone="bronze" helper="melhor taxa em 6 meses" />
        <MetricCard label="Frequência média" value="3,7x" change="0,4x" icon={<Dumbbell size={21} />} tone="blue" helper="por semana" />
      </section>}

      {show('tabela') && <section className="panel">
        <SectionHeader eyebrow="BASE DE ALUNOS" title="Todos os alunos" description="Pesquise, filtre e consulte os dados completos de cada matrícula." />
        <div className="advanced-toolbar">
          <label className="inline-search inline-search--wide"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nome, e-mail ou telefone..." /></label>
          <label className="select-control"><Filter size={15} /><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Todos</option><option>Em dia</option><option>Pendente</option><option>Atrasado</option><option>Congelado</option></select></label>
          <label className="select-control"><select value={plan} onChange={(event) => setPlan(event.target.value)}><option>Todos os planos</option><option>Fit Essencial</option><option>Fit Premium</option><option>Fit Black</option></select></label>
        </div>
        <div className="data-table-wrap">
          <table className="data-table data-table--students">
            <thead><tr><th>Aluno</th><th>Contato</th><th>Plano</th><th>Pagamento</th><th>Frequência</th><th>Última visita</th><th>Objetivo</th><th /></tr></thead>
            <tbody>
              {filtered.map((member, index) => (
                <tr key={member.id} onClick={() => setSelected(member)}>
                  <td><div className="table-person"><Avatar initials={member.initials} tone={index} /><span><strong>{member.name}</strong><small>Matrícula #{String(2026000 + member.id)}</small></span></div></td>
                  <td><div className="table-contact"><span>{member.email}</span><small>{member.phone}</small></div></td>
                  <td><strong>{member.plan}</strong><small className="table-subtext">R$ {member.monthlyFee.toFixed(2).replace('.', ',')}/mês</small></td>
                  <td><StatusBadge status={member.status} /></td>
                  <td><div className="frequency-cell"><strong>{member.visitsMonth}x</strong><span><i style={{ width: `${Math.min(100, member.visitsMonth * 5)}%` }} /></span></div></td>
                  <td>{member.lastVisit}</td>
                  <td>{member.goal}</td>
                  <td><button className="table-action" onClick={(event) => { event.stopPropagation(); setSelected(member) }}><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Mostrando {filtered.length} de 438 alunos</span><div><button disabled>Anterior</button><button className="is-active">1</button><button>2</button><button>3</button><button>Próxima</button></div></div>
      </section>}

      {show('tabela') && <section className="dashboard-grid dashboard-grid--three">
        <article className="student-insight-card student-insight-card--red"><span><Sparkles size={17} /> RETENÇÃO</span><strong>34 alunos reduziram a frequência</strong><p>Envie um incentivo antes que o risco de cancelamento aumente.</p><button onClick={() => onToast('Segmento de baixa frequência criado.')}>Criar ação <ArrowRight size={14} /></button></article>
        <article className="student-insight-card student-insight-card--bronze"><span><CalendarDays size={17} /> RENOVAÇÕES</span><strong>21 planos vencem nos próximos 15 dias</strong><p>Antecipe o contato e ofereça renovação automática.</p><button onClick={() => onToast('Régua de renovação preparada.')}>Ver renovações <ArrowRight size={14} /></button></article>
        <article className="student-insight-card student-insight-card--green"><span><UserPlus size={17} /> INDICAÇÕES</span><strong>86 alunos são potenciais promotores</strong><p>Clientes com alta frequência e satisfação podem indicar amigos.</p><button onClick={() => onToast('Campanha de indicação criada.')}>Criar campanha <ArrowRight size={14} /></button></article>
      </section>}

      {selected && (
        <Modal title="Perfil do aluno" subtitle="Informações pessoais, plano e relacionamento" onClose={() => setSelected(null)} width="860px">
          <div className="student-profile-hero">
            <Avatar initials={selected.initials} tone={selected.id} large />
            <div className="student-profile-hero__identity"><span>ALUNO FIT HOUSE</span><h2>{selected.name}</h2><p>Matrícula #{String(2026000 + selected.id)} • desde {selected.joinedAt}</p></div>
            <div className="student-profile-hero__status"><StatusBadge status={selected.status} /><StatusBadge status={selected.accessStatus} /></div>
          </div>
          <div className="student-profile-grid">
            <section className="profile-block">
              <h3>Informações pessoais</h3>
              <div className="profile-info-list"><div><Mail size={15} /><span><small>E-mail</small><strong>{selected.email}</strong></span></div><div><Phone size={15} /><span><small>Telefone</small><strong>{selected.phone}</strong></span></div><div><CalendarDays size={15} /><span><small>Nascimento</small><strong>{selected.birthDate}</strong></span></div><div><Users size={15} /><span><small>CPF</small><strong>{selected.cpf}</strong></span></div></div>
            </section>
            <section className="profile-block">
              <h3>Plano e cobrança</h3>
              <div className="profile-plan-card"><span>{selected.plan}</span><strong>R$ {selected.monthlyFee.toFixed(2).replace('.', ',')}<small>/mês</small></strong><p>Próxima cobrança: {selected.nextCharge}</p></div>
              <button className="button button--soft button--full" onClick={() => onToast('Histórico financeiro aberto.')}>Ver histórico financeiro</button>
            </section>
          </div>
          <div className="student-profile-grid">
            <section className="profile-block">
              <h3>Treino e frequência</h3>
              <div className="detail-metrics detail-metrics--compact"><div><span>Visitas no mês</span><strong>{selected.visitsMonth}</strong></div><div><span>Média semanal</span><strong>{selected.averageVisits}x</strong></div><div><span>Objetivo</span><strong>{selected.goal}</strong></div><div><span>Professor</span><strong>{selected.trainer}</strong></div></div>
            </section>
            <section className="profile-block profile-block--ai">
              <span><Sparkles size={14} /> ANÁLISE DA IA</span>
              <h3>{selected.visitsMonth >= 15 ? 'Aluno altamente engajado' : selected.visitsMonth < 6 ? 'Risco de queda de frequência' : 'Frequência dentro do esperado'}</h3>
              <p>{selected.visitsMonth >= 15 ? 'Boa oportunidade para campanha de indicação e recompensa por fidelidade.' : selected.visitsMonth < 6 ? 'Recomenda-se uma abordagem personalizada pelo WhatsApp e uma meta simples para a próxima semana.' : 'Mantenha as notificações de treino e acompanhe a evolução nas próximas duas semanas.'}</p>
            </section>
          </div>
          <div className="modal-actions">
            <button className="button button--ghost" onClick={() => onToast(`Conversa no WhatsApp aberta para ${selected.name}.`)}><MessageCircleMore size={16} /> Conversar no WhatsApp</button>
            <button className="button button--primary" onClick={() => onToast('Dados do aluno atualizados com sucesso.')}><Sparkles size={16} /> Executar recomendação</button>
          </div>
        </Modal>
      )}

      {showNewStudent && (
        <Modal title="Cadastrar novo aluno" subtitle="Crie a matrícula e configure o plano inicial" onClose={() => setShowNewStudent(false)} width="720px">
          <form className="form-grid" onSubmit={(event) => { event.preventDefault(); setShowNewStudent(false); onToast('Novo aluno cadastrado com sucesso.') }}>
            <label className="form-field form-field--span-2"><span>Nome completo</span><input required placeholder="Nome do aluno" /></label>
            <label className="form-field"><span>E-mail</span><input required type="email" placeholder="aluno@email.com" /></label>
            <label className="form-field"><span>WhatsApp</span><input required placeholder="(49) 99999-9999" /></label>
            <label className="form-field"><span>CPF</span><input required placeholder="000.000.000-00" /></label>
            <label className="form-field"><span>Data de nascimento</span><input required type="date" /></label>
            <label className="form-field"><span>Plano</span><select><option>Fit Essencial</option><option>Fit Premium</option><option>Fit Black</option></select></label>
            <label className="form-field"><span>Objetivo</span><select><option>Hipertrofia</option><option>Emagrecimento</option><option>Condicionamento</option><option>Saúde e bem-estar</option></select></label>
            <label className="form-field form-field--span-2"><span>Observações</span><textarea placeholder="Informações importantes para a equipe..." /></label>
            <div className="modal-actions form-field--span-2"><button type="button" className="button button--ghost" onClick={() => setShowNewStudent(false)}>Cancelar</button><button className="button button--primary" type="submit"><Plus size={16} /> Criar matrícula</button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}
