import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Cpu,
  MessageCircleMore,
  PauseCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { initialAutomations } from '../data'
import type { Automation } from '../types'
import { MetricCard, SectionHeader, Toggle } from '../components/Common'

interface AIPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function AIPage({ onToast, visibleSections = {} }: AIPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations)
  const [filter, setFilter] = useState('Todas')
  const [masterEnabled, setMasterEnabled] = useState(true)

  const categories = ['Todas', ...Array.from(new Set(automations.map((item) => item.category)))]
  const visible = useMemo(() => automations.filter((automation) => filter === 'Todas' || automation.category === filter), [automations, filter])
  const active = automations.filter((automation) => automation.enabled).length

  function updateAutomation(id: string, patch: Partial<Automation>) {
    setAutomations((current) => current.map((automation) => automation.id === id ? { ...automation, ...patch } : automation))
  }

  function toggleMaster(value: boolean) {
    setMasterEnabled(value)
    setAutomations((current) => current.map((automation) => ({ ...automation, enabled: value ? automation.id !== 'salary' : false })))
    onToast(value ? 'Automações principais reativadas.' : 'Todas as automações foram pausadas.')
  }

  return (
    <div className="page-stack">
      {show('hero') && <section className={`ai-hero ${masterEnabled ? '' : 'is-paused'}`}>
        <div className="ai-hero__copy"><span><Sparkles size={13} /> INTELIGÊNCIA OPERACIONAL FIT HOUSE</span><h2>{masterEnabled ? 'A IA está cuidando da academia em tempo real.' : 'As automações estão pausadas.'}</h2><p>{masterEnabled ? 'Ela acompanha a catraca, pagamentos, alunos, vendas, satisfação e oportunidades de melhoria durante todo o dia.' : 'Nenhuma ação será executada até que o controle geral seja reativado.'}</p><div className="ai-hero__status"><i /><span>{masterEnabled ? 'Sistema operacional • última decisão há 18 segundos' : 'Sistema pausado pelo usuário'}</span></div></div>
        <div className="ai-hero__control"><span>CONTROLE GERAL</span><Toggle checked={masterEnabled} onChange={toggleMaster} /><strong>{masterEnabled ? 'Automações ativas' : 'Automações pausadas'}</strong><small>{masterEnabled ? `${active} de ${automations.length} fluxos em execução` : 'Nenhum fluxo em execução'}</small></div>
        <div className="ai-orbit ai-orbit--one" /><div className="ai-orbit ai-orbit--two" />
      </section>}

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Automações ativas" value={`${active}/${automations.length}`} change="2 este mês" icon={<Bot size={21} />} tone="red" helper="operando 24 horas" />
        <MetricCard label="Ações executadas" value="5.015" change="18,7%" icon={<Zap size={21} />} tone="green" helper="últimos 30 dias" />
        <MetricCard label="Horas economizadas" value="184h" change="22h" icon={<Clock3 size={21} />} tone="bronze" helper="equivale a 23 dias úteis" />
        <MetricCard label="Taxa de acerto" value="96,8%" change="1,2%" icon={<BrainCircuit size={21} />} tone="blue" helper="decisões confirmadas" />
      </section>}

      {show('automacoes') && <section className="panel">
        <SectionHeader eyebrow="AUTOMAÇÕES" title="Controle de ações autônomas" description="Ative, pause ou exija aprovação manual para cada lógica inteligente do sistema." action={<div className="ai-filter-row">{categories.slice(0, 6).map((category) => <button key={category} className={filter === category ? 'is-active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>} />
        <div className="automation-grid">
          {visible.map((automation) => (
            <article className={`automation-card ${automation.enabled ? 'is-enabled' : ''}`} key={automation.id}>
              <div className="automation-card__top"><span className="automation-card__icon"><Cpu size={19} /></span><Toggle checked={automation.enabled && masterEnabled} onChange={(checked) => { updateAutomation(automation.id, { enabled: checked }); onToast(`${automation.title} ${checked ? 'ativada' : 'pausada'}.`) }} disabled={!masterEnabled} /></div>
              <span className="automation-card__category">{automation.category}</span><h3>{automation.title}</h3><p>{automation.description}</p>
              <label className="automation-mode"><span>Modo de execução</span><select value={automation.mode} disabled={!automation.enabled || !masterEnabled} onChange={(event) => { updateAutomation(automation.id, { mode: event.target.value as Automation['mode'] }); onToast('Modo de execução atualizado.') }}><option>Autônoma</option><option>Aprovação manual</option></select></label>
              <div className="automation-card__stats"><div><strong>{automation.executions.toLocaleString('pt-BR')}</strong><span>execuções</span></div><div><strong>{automation.impact}</strong><span>impacto registrado</span></div></div>
              <div className={`automation-card__status ${automation.enabled && masterEnabled ? 'is-active' : ''}`}>{automation.enabled && masterEnabled ? <><PlayCircle size={14} /> Em execução</> : <><PauseCircle size={14} /> Pausada</>}</div>
            </article>
          ))}
        </div>
      </section>}

      {show('atividade') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="ATIVIDADE EM TEMPO REAL" title="Últimas decisões da IA" description="Registro resumido das ações executadas ou enviadas para aprovação." />
          <div className="ai-activity-list">
            <article><span className="ai-activity__icon ai-activity__icon--green"><CheckCircle2 size={16} /></span><div><strong>Benefício de fidelidade sugerido para Mariana Oliveira</strong><p>18 visitas no mês e plano em dia há 17 meses.</p><small>Catraca e frequência • há 18 segundos</small></div><em>Executada</em></article>
            <article><span className="ai-activity__icon ai-activity__icon--yellow"><AlertTriangle size={16} /></span><div><strong>Negociação preparada para Gabriel Souza</strong><p>Pagamento pendente há 3 dias com frequência preservada.</p><small>Financeiro • há 4 minutos</small></div><em className="is-waiting">Aguardando aprovação</em></article>
            <article><span className="ai-activity__icon ai-activity__icon--green"><MessageCircleMore size={16} /></span><div><strong>Pesquisa de satisfação enviada para 14 alunos</strong><p>Disparo após saída da academia com limite de frequência respeitado.</p><small>Experiência • há 12 minutos</small></div><em>Executada</em></article>
            <article><span className="ai-activity__icon ai-activity__icon--green"><CheckCircle2 size={16} /></span><div><strong>Reposição de Whey Chocolate recomendada</strong><p>Previsão de ruptura em 6 dias no ritmo atual.</p><small>Loja • há 21 minutos</small></div><em className="is-waiting">Aguardando aprovação</em></article>
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel ai-health-card">
            <SectionHeader eyebrow="SAÚDE DO SISTEMA" title="Tudo funcionando" />
            <div className="ai-health-score"><span><Activity size={23} /></span><div><strong>98,7%</strong><small>disponibilidade em 30 dias</small></div></div>
            <div className="ai-health-list"><div><i className="dot dot--green" /><span>Motor de IA</span><strong>Online</strong></div><div><i className="dot dot--green" /><span>WhatsApp</span><strong>Conectado</strong></div><div><i className="dot dot--green" /><span>Catraca</span><strong>Conectada</strong></div><div><i className="dot dot--green" /><span>App dos alunos</span><strong>Sincronizado</strong></div></div>
          </article>
          <article className="panel ai-safety-card"><ShieldCheck size={22} /><span>SEGURANÇA E CONTROLE</span><h3>Decisões sensíveis exigem aprovação.</h3><p>A IA nunca altera salários, exclui alunos ou movimenta valores sem confirmação de um responsável autorizado.</p><button className="button button--soft button--full" onClick={() => onToast('Políticas de aprovação abertas.')}>Revisar políticas</button></article>
        </aside>
      </section>}

      {show('chat') && <section className="ai-chat-panel">
        <div className="ai-chat-panel__intro"><span><Bot size={25} /></span><div><small>ASSISTENTE DE GESTÃO</small><h2>Converse com a inteligência da Fit House</h2><p>Pergunte sobre alunos, finanças, equipe, loja ou qualquer indicador do sistema.</p></div></div>
        <div className="ai-chat-box"><div className="ai-chat-suggestions"><button>Quais alunos estão em risco de cancelar?</button><button>Como posso aumentar a receita este mês?</button><button>Qual horário precisa de mais funcionários?</button></div><div className="ai-chat-input"><input placeholder="Faça uma pergunta sobre a academia..." /><button onClick={() => onToast('Pergunta enviada para a IA de demonstração.')}><Sparkles size={17} /> Perguntar</button></div></div>
      </section>}
    </div>
  )
}
