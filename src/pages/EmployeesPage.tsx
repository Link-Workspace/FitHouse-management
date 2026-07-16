import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Award,
  BellRing,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  LockKeyhole,
  Mail,
  MessageCircleMore,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  UserRoundCog,
  Users,
} from 'lucide-react'
import { employees } from '../data'
import type { Employee, UserRole } from '../types'
import { Avatar, MetricCard, Modal, SectionHeader, StatusBadge } from '../components/Common'

interface EmployeesPageProps {
  onToast: (message: string) => void
  role: UserRole
  visibleSections?: Record<string, boolean>
}

export function EmployeesPage({ onToast, role, visibleSections = {} }: EmployeesPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('Todos os setores')
  const [selected, setSelected] = useState<Employee | null>(null)
  const [showNew, setShowNew] = useState(false)

  const filtered = useMemo(() => employees.filter((employee) => {
    const q = search.toLowerCase()
    return (employee.name.toLowerCase().includes(q) || employee.role.toLowerCase().includes(q))
      && (department === 'Todos os setores' || employee.department === department)
  }), [search, department])

  const totalPayroll = employees.reduce((sum, employee) => sum + employee.salary, 0)

  return (
    <div className="page-stack">
      <div className="page-actions-row page-actions-row--spread">
        <div className="student-summary-line"><strong>Equipe Fit House</strong><span>{employees.length} funcionários cadastrados</span></div>
        <button className="button button--primary" onClick={() => setShowNew(true)}><Plus size={16} /> Novo funcionário</button>
      </div>

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Funcionários ativos" value="7" change="1 novo" icon={<Users size={21} />} tone="red" helper="8 no total" />
        <MetricCard label="Folha mensal" value={`R$ ${totalPayroll.toLocaleString('pt-BR')}`} change="4,6%" icon={<CircleDollarSign size={21} />} tone="green" helper="43,7% das despesas" />
        <MetricCard label="Desempenho médio" value="92,3%" change="2,7%" icon={<Award size={21} />} tone="bronze" helper="meta interna: 88%" />
        <MetricCard label="Horas cobertas" value="98,4%" change="1,2%" icon={<Clock3 size={21} />} tone="blue" helper="escala desta semana" />
      </section>}

      {show('recomendacao') && role === 'Diretor' ? (
        <section className="owner-recommendation">
          <div className="owner-recommendation__icon"><Sparkles size={22} /></div>
          <div className="owner-recommendation__copy"><span>RECOMENDAÇÃO EXCLUSIVA PARA O DIRETOR</span><h2>O resultado permite avaliar uma melhoria para a equipe.</h2><p>A margem dos últimos três meses ficou 4,2 pontos acima da meta. A IA sugere reservar até <strong>R$ 2.800/mês</strong> para reajustes por desempenho ou investir em melhorias para o ambiente de trabalho.</p></div>
          <div className="owner-recommendation__options"><button onClick={() => onToast('Simulação de reajuste salarial aberta.')}><TrendingUp size={17} /><span><strong>Simular reajustes</strong><small>Distribuição por mérito e impacto</small></span><ArrowRight size={15} /></button><button onClick={() => onToast('Plano de melhorias para a academia aberto.')}><BriefcaseBusiness size={17} /><span><strong>Planejar melhorias</strong><small>Benefícios, equipamentos e capacitação</small></span><ArrowRight size={15} /></button></div>
        </section>
      ) : show('recomendacao') ? (
        <section className="restricted-banner"><LockKeyhole size={20} /><div><strong>Recomendações estratégicas protegidas</strong><span>Somente o perfil Diretor visualiza sugestões de remuneração e investimento na equipe.</span></div></section>
      ) : null}

      {show('equipe') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="EQUIPE" title="Funcionários atuais" description="Consulte informações, escala, desempenho e situação de cada profissional." />
          <div className="advanced-toolbar"><label className="inline-search inline-search--wide"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar funcionário ou cargo..." /></label><label className="select-control"><select value={department} onChange={(event) => setDepartment(event.target.value)}><option>Todos os setores</option><option>Gestão</option><option>Treinamento</option><option>Atendimento</option><option>Loja</option><option>Operação</option></select></label></div>
          <div className="employee-grid">
            {filtered.map((employee, index) => (
              <button className="employee-card" key={employee.id} onClick={() => setSelected(employee)}>
                <div className="employee-card__top"><Avatar initials={employee.initials} tone={index} /><StatusBadge status={employee.status} /></div>
                <strong>{employee.name}</strong><span>{employee.role}</span>
                <div className="employee-card__meta"><div><BriefcaseBusiness size={14} /><span>{employee.department}</span></div><div><Clock3 size={14} /><span>{employee.shift}</span></div></div>
                <div className="employee-card__performance"><span>Desempenho</span><strong>{employee.performance}%</strong><div className="progress-track"><i style={{ width: `${employee.performance}%` }} /></div></div>
                <div className="employee-card__foot"><span>Desde {employee.since}</span><ArrowRight size={15} /></div>
              </button>
            ))}
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel">
            <SectionHeader eyebrow="ESCALA DE HOJE" title="Cobertura por turno" />
            <div className="shift-list"><div><span>06h–10h</span><strong>3 funcionários</strong><em className="is-good">Completo</em></div><div><span>10h–14h</span><strong>5 funcionários</strong><em className="is-good">Completo</em></div><div><span>14h–18h</span><strong>6 funcionários</strong><em className="is-good">Completo</em></div><div><span>18h–22h</span><strong>4 funcionários</strong><em className="is-warning">Atenção</em></div></div>
            <div className="shift-alert"><BellRing size={16} /><span><strong>Horário de pico com equipe reduzida.</strong><small>Considere antecipar Bruno em 30 minutos.</small></span></div>
          </article>
          <article className="panel team-highlight-card"><span><Award size={18} /> DESTAQUE DO MÊS</span><Avatar initials="DR" tone={4} large /><h3>Diego Rocha</h3><p>Consultor de vendas</p><strong>117% da meta</strong><small>R$ 7.840 em vendas influenciadas</small><button className="button button--soft button--full" onClick={() => onToast('Reconhecimento registrado para Diego.')}>Registrar reconhecimento</button></article>
        </aside>
      </section>}

      {show('desempenho') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="DESEMPENHO" title="Indicadores por área" description="Média consolidada do mês atual." />
          <div className="department-performance"><div><span>Gestão</span><div className="progress-track"><i style={{ width: '96%' }} /></div><strong>96%</strong></div><div><span>Treinamento</span><div className="progress-track"><i style={{ width: '91%' }} /></div><strong>91%</strong></div><div><span>Atendimento</span><div className="progress-track"><i style={{ width: '91%' }} /></div><strong>91%</strong></div><div><span>Loja</span><div className="progress-track"><i style={{ width: '97%' }} /></div><strong>97%</strong></div><div><span>Operação</span><div className="progress-track"><i style={{ width: '90%' }} /></div><strong>90%</strong></div></div>
        </article>
        <article className="panel">
          <SectionHeader eyebrow="GESTÃO INTELIGENTE" title="Sugestões para a equipe" description="Ações para manter desempenho e satisfação interna." />
          <div className="employee-recommendations"><article><span><Bot size={17} /></span><div><strong>Capacitação em retenção para a recepção</strong><p>Pode reduzir pedidos de cancelamento em até 9%.</p><button onClick={() => onToast('Treinamento adicionado ao plano da equipe.')}>Adicionar ao plano</button></div></article><article><span><Bot size={17} /></span><div><strong>Reforço no turno das 18h</strong><p>É o período com maior lotação e menor cobertura relativa.</p><button onClick={() => onToast('Nova sugestão de escala criada.')}>Ajustar escala</button></div></article><article><span><Bot size={17} /></span><div><strong>Reconhecimento trimestral</strong><p>5 profissionais superaram suas metas por três meses consecutivos.</p><button onClick={() => onToast('Programa de reconhecimento preparado.')}>Ver elegíveis</button></div></article></div>
        </article>
      </section>}

      {selected && (
        <Modal title="Perfil do funcionário" subtitle="Dados profissionais, escala e desempenho" onClose={() => setSelected(null)} width="780px">
          <div className="student-profile-hero"><Avatar initials={selected.initials} tone={selected.id} large /><div className="student-profile-hero__identity"><span>{selected.department.toUpperCase()}</span><h2>{selected.name}</h2><p>{selected.role} • desde {selected.since}</p></div><StatusBadge status={selected.status} /></div>
          <div className="detail-metrics"><div><span>Desempenho</span><strong>{selected.performance}%</strong></div><div><span>Turno</span><strong>{selected.shift}</strong></div><div><span>Salário atual</span><strong>{role === 'Diretor' ? `R$ ${selected.salary.toLocaleString('pt-BR')}` : 'Restrito'}</strong></div><div><span>Setor</span><strong>{selected.department}</strong></div></div>
          <div className="student-profile-grid"><section className="profile-block"><h3>Contato e dados</h3><div className="profile-info-list"><div><MessageCircleMore size={15} /><span><small>Telefone</small><strong>{selected.phone}</strong></span></div><div><Mail size={15} /><span><small>E-mail corporativo</small><strong>{selected.name.toLowerCase().replace(' ', '.')}@fithouse.com</strong></span></div><div><CalendarDays size={15} /><span><small>Admissão</small><strong>{selected.since}</strong></span></div><div><UserRoundCog size={15} /><span><small>Vínculo</small><strong>CLT • Integral</strong></span></div></div></section><section className="profile-block profile-block--ai"><span><Sparkles size={14} /> ANÁLISE DA IA</span><h3>{selected.performance >= 95 ? 'Desempenho excepcional' : 'Bom desempenho consistente'}</h3><p>{selected.performance >= 95 ? 'Profissional elegível para reconhecimento e possível revisão de remuneração na próxima janela.' : 'Mantenha o plano atual e acompanhe a evolução dos indicadores do próximo mês.'}</p></section></div>
          <div className="modal-actions"><button className="button button--ghost" onClick={() => onToast('Mensagem interna preparada.')}>Enviar mensagem</button><button className="button button--primary" onClick={() => onToast('Perfil atualizado com sucesso.')}>Editar informações</button></div>
        </Modal>
      )}

      {showNew && <Modal title="Novo funcionário" subtitle="Cadastre um novo integrante da equipe Fit House" onClose={() => setShowNew(false)} width="720px"><form className="form-grid" onSubmit={(event) => { event.preventDefault(); setShowNew(false); onToast('Funcionário cadastrado com sucesso.') }}><label className="form-field form-field--span-2"><span>Nome completo</span><input required /></label><label className="form-field"><span>Cargo</span><input required /></label><label className="form-field"><span>Setor</span><select><option>Treinamento</option><option>Atendimento</option><option>Loja</option><option>Gestão</option><option>Operação</option></select></label><label className="form-field"><span>Telefone</span><input required /></label><label className="form-field"><span>Turno</span><input placeholder="08:00–18:00" required /></label><label className="form-field"><span>Salário</span><input type="number" required /></label><label className="form-field"><span>Data de admissão</span><input type="date" required /></label><div className="modal-actions form-field--span-2"><button type="button" className="button button--ghost" onClick={() => setShowNew(false)}>Cancelar</button><button className="button button--primary" type="submit"><Plus size={16} /> Cadastrar funcionário</button></div></form></Modal>}
    </div>
  )
}
