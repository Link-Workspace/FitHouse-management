import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BellRing,
  Bot,
  CalendarDays,
  CheckCircle2,
  Copy,
  Gift,
  Megaphone,
  MessageCircleMore,
  Plus,
  Send,
  Sparkles,
  TicketPercent,
  Trophy,
  Users,
} from 'lucide-react'
import { initialCampaigns } from '../data'
import type { Campaign } from '../types'
import { MetricCard, Modal, SectionHeader, StatusBadge, Toggle } from '../components/Common'

interface CampaignsPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function CampaignsPage({ onToast, visibleSections = {} }: CampaignsPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [tab, setTab] = useState<'Todos' | 'Promoção' | 'Sorteio'>('Todos')
  const [showCreate, setShowCreate] = useState(false)
  const [type, setType] = useState<'Promoção' | 'Sorteio'>('Promoção')
  const [appChannel, setAppChannel] = useState(true)
  const [whatsappChannel, setWhatsappChannel] = useState(true)

  const visible = useMemo(() => campaigns.filter((campaign) => tab === 'Todos' || campaign.type === tab), [campaigns, tab])

  function createCampaign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') || 'Nova campanha')
    const description = String(form.get('description') || '')
    const audience = String(form.get('audience') || 'Todos os alunos')
    const startDate = String(form.get('startDate') || '')
    const endDate = String(form.get('endDate') || '')
    const channels = [appChannel ? 'App' : '', whatsappChannel ? 'WhatsApp' : ''].filter(Boolean)
    const newCampaign: Campaign = {
      id: Date.now(),
      type,
      title,
      description,
      audience,
      startDate: startDate ? new Date(`${startDate}T12:00:00`).toLocaleDateString('pt-BR') : 'Hoje',
      endDate: endDate ? new Date(`${endDate}T12:00:00`).toLocaleDateString('pt-BR') : 'Sem data',
      channels,
      status: 'Agendada',
      reached: 0,
      conversions: 0,
      code: type === 'Promoção' ? String(form.get('code') || '') : undefined,
      prize: type === 'Sorteio' ? String(form.get('prize') || '') : undefined,
    }
    setCampaigns((current) => [newCampaign, ...current])
    setShowCreate(false)
    onToast('Campanha criada e agendada para o app e WhatsApp.')
  }

  return (
    <div className="page-stack">
      {show('hero') && <section className="campaign-hero">
        <div className="campaign-hero__copy"><span><Sparkles size={13} /> COMUNICAÇÃO INTEGRADA</span><h2>Crie uma vez. A Fit House entrega em todos os canais.</h2><p>Publique promoções e sorteios no app dos alunos e envie uma notificação personalizada pelo WhatsApp da academia.</p><button className="button button--primary" onClick={() => setShowCreate(true)}><Plus size={17} /> Criar nova campanha</button></div>
        <div className="campaign-hero__flow"><div><span className="flow-icon flow-icon--campaign"><Megaphone size={21} /></span><strong>Campanha</strong></div><i /><div><span className="flow-icon flow-icon--app"><BellRing size={21} /></span><strong>App</strong></div><i /><div><span className="flow-icon flow-icon--whatsapp"><MessageCircleMore size={21} /></span><strong>WhatsApp</strong></div></div>
      </section>}

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Campanhas ativas" value="2" change="1 nova" icon={<Megaphone size={21} />} tone="red" helper="1 promoção e 1 sorteio" />
        <MetricCard label="Alunos alcançados" value="652" change="18,4%" icon={<Users size={21} />} tone="green" helper="últimos 30 dias" />
        <MetricCard label="Conversões" value="139" change="21,3%" icon={<CheckCircle2 size={21} />} tone="bronze" helper="taxa média de 21,3%" />
        <MetricCard label="Receita influenciada" value="R$ 9.480" change="24,8%" icon={<TicketPercent size={21} />} tone="blue" helper="estimativa da IA" />
      </section>}

      {show('campanhas') && <section className="panel">
        <SectionHeader eyebrow="CAMPANHAS" title="Promoções e sorteios" description="Acompanhe o status, os canais e o desempenho de cada comunicação." action={<div className="segmented-control">{(['Todos', 'Promoção', 'Sorteio'] as const).map((option) => <button key={option} className={tab === option ? 'is-active' : ''} onClick={() => setTab(option)}>{option === 'Todos' ? 'Todas' : `${option}s`}</button>)}</div>} />
        <div className="campaign-grid">
          {visible.map((campaign) => (
            <article className="campaign-card" key={campaign.id}>
              <div className="campaign-card__top"><span className={`campaign-card__type campaign-card__type--${campaign.type === 'Promoção' ? 'promo' : 'draw'}`}>{campaign.type === 'Promoção' ? <TicketPercent size={16} /> : <Trophy size={16} />}{campaign.type}</span><StatusBadge status={campaign.status} /></div>
              <h3>{campaign.title}</h3><p>{campaign.description}</p>
              <div className="campaign-card__details"><div><CalendarDays size={14} /><span><small>Período</small><strong>{campaign.startDate} — {campaign.endDate}</strong></span></div><div><Users size={14} /><span><small>Público</small><strong>{campaign.audience}</strong></span></div></div>
              {(campaign.code || campaign.prize) && <div className="campaign-card__highlight"><span>{campaign.code ? 'CÓDIGO DA PROMOÇÃO' : 'PRÊMIO DO SORTEIO'}</span><strong>{campaign.code || campaign.prize}</strong>{campaign.code && <button onClick={() => onToast('Código copiado.')}><Copy size={13} /></button>}</div>}
              <div className="campaign-card__channels"><span>Canais</span>{campaign.channels.map((channel) => <em key={channel}>{channel === 'App' ? <BellRing size={13} /> : <MessageCircleMore size={13} />}{channel}</em>)}</div>
              <div className="campaign-card__performance"><div><span>Alcançados</span><strong>{campaign.reached}</strong></div><div><span>Conversões</span><strong>{campaign.conversions}</strong></div><div><span>Taxa</span><strong>{campaign.reached ? `${Math.round((campaign.conversions / campaign.reached) * 100)}%` : '—'}</strong></div></div>
              <div className="campaign-card__actions"><button className="button button--ghost" onClick={() => onToast(`Prévia de “${campaign.title}” aberta.`)}>Ver detalhes</button><button className="button button--soft" onClick={() => onToast(campaign.status === 'Agendada' ? 'Campanha disparada para os canais selecionados.' : 'Relatório da campanha aberto.')}><Send size={15} />{campaign.status === 'Agendada' ? 'Disparar agora' : 'Ver relatório'}</button></div>
            </article>
          ))}
        </div>
      </section>}

      {show('segmentos') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="PÚBLICOS INTELIGENTES" title="Segmentos sugeridos pela IA" description="Grupos com maior chance de responder a uma campanha agora." />
          <div className="audience-list">
            <article><span className="audience-list__icon"><Users size={18} /></span><div><strong>Baixa frequência recente</strong><p>62 alunos com queda superior a 35% nas últimas três semanas.</p><em>Potencial: 18 retornos</em></div><button onClick={() => { setType('Promoção'); setShowCreate(true) }}><ArrowRight size={15} /></button></article>
            <article><span className="audience-list__icon"><Gift size={18} /></span><div><strong>Alta fidelidade</strong><p>86 alunos com plano em dia e frequência acima de 4x por semana.</p><em>Ideal para indicação</em></div><button onClick={() => { setType('Sorteio'); setShowCreate(true) }}><ArrowRight size={15} /></button></article>
            <article><span className="audience-list__icon"><ShoppingBagIcon /></span><div><strong>Compradores de suplementos</strong><p>104 alunos compraram na loja nos últimos 45 dias.</p><em>Conversão prevista: 27%</em></div><button onClick={() => { setType('Promoção'); setShowCreate(true) }}><ArrowRight size={15} /></button></article>
          </div>
        </article>
        <article className="panel campaign-ai-panel">
          <div className="campaign-ai-panel__head"><span><Bot size={20} /></span><div><small>ASSISTENTE DE CAMPANHAS</small><strong>A IA prepara tudo para você.</strong></div></div>
          <p>Descreva o objetivo e a IA sugere público, benefício, texto, horário e canais.</p>
          <div className="campaign-prompt"><textarea placeholder="Ex.: Quero trazer de volta alunos que reduziram a frequência..." defaultValue="Crie uma campanha para aumentar a frequência de alunos que treinam menos de duas vezes por semana." /><button onClick={() => onToast('A IA gerou uma campanha pronta para revisão.')}><Sparkles size={16} /> Gerar campanha</button></div>
          <div className="campaign-ai-panel__stats"><div><strong>38</strong><span>campanhas criadas</span></div><div><strong>+18%</strong><span>conversão média</span></div><div><strong>11 min</strong><span>economizados por criação</span></div></div>
        </article>
      </section>}

      {showCreate && (
        <Modal title="Criar campanha" subtitle="A campanha será exibida no app e poderá ser enviada pelo WhatsApp" onClose={() => setShowCreate(false)} width="820px">
          <form className="campaign-form" onSubmit={createCampaign}>
            <div className="campaign-type-selector"><button type="button" className={type === 'Promoção' ? 'is-active' : ''} onClick={() => setType('Promoção')}><TicketPercent size={19} /><span><strong>Promoção</strong><small>Desconto, benefício ou oferta</small></span></button><button type="button" className={type === 'Sorteio' ? 'is-active' : ''} onClick={() => setType('Sorteio')}><Trophy size={19} /><span><strong>Sorteio</strong><small>Prêmio com regras de participação</small></span></button></div>
            <div className="form-grid">
              <label className="form-field form-field--span-2"><span>Título</span><input name="title" required placeholder={type === 'Promoção' ? 'Ex.: Semana da Creatina' : 'Ex.: Desafio Fit House'} /></label>
              <label className="form-field form-field--span-2"><span>Descrição</span><textarea name="description" required placeholder="Explique a campanha de forma clara e atrativa..." /></label>
              {type === 'Promoção' ? <label className="form-field"><span>Código promocional</span><input name="code" placeholder="FIT15" /></label> : <label className="form-field"><span>Prêmio</span><input name="prize" required placeholder="Ex.: 3 meses de plano Fit Black" /></label>}
              <label className="form-field"><span>Público</span><select name="audience"><option>Todos os alunos ativos</option><option>Baixa frequência</option><option>Alta frequência</option><option>Planos Fit Premium e Black</option><option>Compradores da loja</option></select></label>
              <label className="form-field"><span>Data de início</span><input name="startDate" type="date" required /></label><label className="form-field"><span>Data de término</span><input name="endDate" type="date" required /></label>
            </div>
            <div className="channel-selector"><span>CANAIS DE DISTRIBUIÇÃO</span><div><label><span className="channel-selector__icon channel-selector__icon--app"><BellRing size={17} /></span><span><strong>App Fit House</strong><small>Banner, notificação e área de promoções</small></span><Toggle checked={appChannel} onChange={setAppChannel} /></label><label><span className="channel-selector__icon channel-selector__icon--whatsapp"><MessageCircleMore size={17} /></span><span><strong>WhatsApp da academia</strong><small>Mensagem personalizada para cada aluno</small></span><Toggle checked={whatsappChannel} onChange={setWhatsappChannel} /></label></div></div>
            <div className="ai-suggestion-box"><Bot size={18} /><div><strong>A IA escolherá o melhor horário de envio.</strong><p>Ela também limitará a frequência de mensagens para evitar comunicações excessivas.</p></div></div>
            <div className="modal-actions"><button type="button" className="button button--ghost" onClick={() => setShowCreate(false)}>Salvar rascunho</button><button className="button button--primary" type="submit"><CalendarDays size={16} /> Criar e agendar</button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

function ShoppingBagIcon() {
  return <Gift size={18} />
}
