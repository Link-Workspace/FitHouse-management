import { useMemo, useState } from 'react'
import {
  Bot,
  Download,
  HeartHandshake,
  MessageCircleMore,
  Search,
  Send,
  SmilePlus,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Users,
} from 'lucide-react'
import { feedbacks } from '../data'
import { Avatar, MetricCard, SectionHeader, StatusBadge, Toggle } from '../components/Common'

interface SatisfactionPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function SatisfactionPage({ onToast, visibleSections = {} }: SatisfactionPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [channel, setChannel] = useState('Todos os canais')
  const [search, setSearch] = useState('')
  const [exitSurvey, setExitSurvey] = useState(true)
  const [whatsappSurvey, setWhatsappSurvey] = useState(true)
  const [appSurvey, setAppSurvey] = useState(true)

  const visible = useMemo(() => feedbacks.filter((feedback) => {
    const q = search.toLowerCase()
    return (feedback.name.toLowerCase().includes(q) || feedback.text.toLowerCase().includes(q))
      && (channel === 'Todos os canais' || feedback.channel === channel)
  }), [search, channel])

  return (
    <div className="page-stack">
      <div className="page-actions-row page-actions-row--spread">
        <div className="student-summary-line"><strong>Voz do aluno</strong><span>Feedbacks reunidos de todos os canais</span></div>
        <button className="button button--ghost" onClick={() => onToast('Relatório de satisfação exportado.')}><Download size={16} /> Exportar relatório</button>
      </div>

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Nota geral" value="4,7 / 5" change="0,2" icon={<Star size={21} />} tone="bronze" helper="642 avaliações" />
        <MetricCard label="Satisfação positiva" value="89%" change="4,1%" icon={<ThumbsUp size={21} />} tone="green" helper="últimos 30 dias" />
        <MetricCard label="Respostas coletadas" value="327" change="18%" icon={<MessageCircleMore size={21} />} tone="red" helper="71% de taxa de resposta" />
        <MetricCard label="Pontos críticos" value="3" change="1 resolvido" icon={<ThumbsDown size={21} />} tone="blue" helper="lotação, bebedouro e espera" />
      </section>}

      {show('score') && <section className="satisfaction-hero">
        <div className="satisfaction-score"><div className="satisfaction-score__number">4,7</div><div className="satisfaction-score__stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill="currentColor" />)}</div><span>Excelente</span><p>Baseado em 642 respostas dos últimos 90 dias</p></div>
        <div className="rating-distribution"><div><span>5 estrelas</span><div><i style={{ width: '72%' }} /></div><strong>72%</strong></div><div><span>4 estrelas</span><div><i style={{ width: '17%' }} /></div><strong>17%</strong></div><div><span>3 estrelas</span><div><i style={{ width: '7%' }} /></div><strong>7%</strong></div><div><span>2 estrelas</span><div><i style={{ width: '3%' }} /></div><strong>3%</strong></div><div><span>1 estrela</span><div><i style={{ width: '1%' }} /></div><strong>1%</strong></div></div>
        <div className="channel-scores"><article><span className="channel-score__icon channel-score__icon--app"><SmilePlus size={19} /></span><div><strong>App Fit House</strong><span>4,8 • 218 respostas</span></div></article><article><span className="channel-score__icon channel-score__icon--whatsapp"><MessageCircleMore size={19} /></span><div><strong>WhatsApp</strong><span>4,6 • 184 respostas</span></div></article><article><span className="channel-score__icon channel-score__icon--exit"><HeartHandshake size={19} /></span><div><strong>Saída da academia</strong><span>4,7 • 240 respostas</span></div></article></div>
      </section>}

      {show('feedbacks') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="FEEDBACKS RECENTES" title="O que os alunos estão dizendo" description="Comentários organizados por canal, sentimento e tema." />
          <div className="advanced-toolbar"><label className="inline-search inline-search--wide"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar aluno ou comentário..." /></label><label className="select-control"><select value={channel} onChange={(event) => setChannel(event.target.value)}><option>Todos os canais</option><option>App</option><option>WhatsApp</option><option>Saída da academia</option></select></label></div>
          <div className="feedback-list">
            {visible.map((feedback, index) => (
              <article key={feedback.id} className="feedback-card">
                <Avatar initials={feedback.initials} tone={index} />
                <div className="feedback-card__content"><div className="feedback-card__head"><div><strong>{feedback.name}</strong><span>{feedback.channel} • {feedback.date}</span></div><div className="feedback-card__stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill={star <= feedback.rating ? 'currentColor' : 'none'} />)}</div></div><p>{feedback.text}</p><div className="feedback-card__tags"><StatusBadge status={feedback.sentiment} /><em>{feedback.topic}</em></div></div>
                <button onClick={() => onToast(`Resposta preparada para ${feedback.name}.`)}><MessageCircleMore size={16} /></button>
              </article>
            ))}
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel sentiment-card">
            <SectionHeader eyebrow="SENTIMENTO" title="Percepção geral" />
            <div className="sentiment-main"><span className="sentiment-main__emoji">😊</span><div><strong>89% positivo</strong><p>A percepção melhorou 4,1% em 30 dias.</p></div></div>
            <div className="sentiment-breakdown"><div><i className="dot dot--green" /><span>Positivo</span><strong>89%</strong></div><div><i className="dot dot--yellow" /><span>Neutro</span><strong>8%</strong></div><div><i className="dot dot--red" /><span>Negativo</span><strong>3%</strong></div></div>
          </article>
          <article className="panel topic-cloud-card">
            <SectionHeader eyebrow="TEMAS MAIS CITADOS" title="Assuntos em destaque" />
            <div className="topic-cloud"><span className="topic-xl">Atendimento</span><span className="topic-lg">Equipamentos</span><span className="topic-md">Limpeza</span><span className="topic-xl topic-warning">Lotação</span><span className="topic-sm">App</span><span className="topic-md">Professores</span><span className="topic-sm topic-warning">Bebedouro</span><span className="topic-lg">Ambiente</span></div>
          </article>
        </aside>
      </section>}

      {show('pesquisas') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel survey-control-card">
          <SectionHeader eyebrow="COLETA AUTOMÁTICA" title="Pesquisas de satisfação" description="Defina onde a IA deve perguntar e coletar opiniões dos alunos." />
          <div className="survey-toggle-list"><div><span className="survey-toggle__icon survey-toggle__icon--exit"><HeartHandshake size={18} /></span><div><strong>Pesquisa na saída da academia</strong><p>A IA envia uma pergunta poucos minutos após a passagem na catraca de saída.</p></div><Toggle checked={exitSurvey} onChange={setExitSurvey} /></div><div><span className="survey-toggle__icon survey-toggle__icon--whatsapp"><MessageCircleMore size={18} /></span><div><strong>Pesquisa pelo WhatsApp</strong><p>Conversa natural para entender satisfação e oportunidades de melhoria.</p></div><Toggle checked={whatsappSurvey} onChange={setWhatsappSurvey} /></div><div><span className="survey-toggle__icon survey-toggle__icon--app"><SmilePlus size={18} /></span><div><strong>Pesquisa dentro do app</strong><p>Exibida após treinos concluídos e interações importantes.</p></div><Toggle checked={appSurvey} onChange={setAppSurvey} /></div></div>
          <div className="survey-example"><span><Bot size={16} /> EXEMPLO DE PERGUNTA DA IA</span><p>“Oi, Mariana! Como foi seu treino hoje na Fit House? De 1 a 5, qual nota você daria para sua experiência? Tem algo que podemos melhorar?”</p><button onClick={() => onToast('Texto da pesquisa aberto para edição.')}>Editar pergunta</button></div>
        </article>

        <article className="panel">
          <SectionHeader eyebrow="ANÁLISE DA IA" title="Principais conclusões" description="Resumo gerado automaticamente a partir de todos os canais." />
          <div className="satisfaction-insights"><article className="satisfaction-insight satisfaction-insight--positive"><span><ThumbsUp size={17} /></span><div><strong>Atendimento é o maior diferencial</strong><p>37% dos elogios mencionam atenção da recepção e dos professores.</p></div></article><article className="satisfaction-insight satisfaction-insight--warning"><span><Users size={17} /></span><div><strong>Lotação entre 18h e 20h</strong><p>É o tema negativo mais recorrente nas últimas três semanas.</p></div></article><article className="satisfaction-insight satisfaction-insight--neutral"><span><Sparkles size={17} /></span><div><strong>O app está elevando a percepção</strong><p>Alunos que usam os vídeos de treino dão nota média 0,3 maior.</p></div></article></div>
          <button className="button button--primary button--full" onClick={() => onToast('Plano de melhoria gerado pela IA.')}><Sparkles size={16} /> Gerar plano de melhoria</button>
        </article>
      </section>}

      {show('banner') && <section className="feedback-action-banner"><div><span><Send size={18} /></span><div><strong>Quer ouvir um grupo específico de alunos?</strong><p>Crie uma pesquisa personalizada e envie pelo app ou WhatsApp.</p></div></div><button className="button button--soft" onClick={() => onToast('Construtor de pesquisa aberto.')}>Criar pesquisa</button></section>}
    </div>
  )
}
