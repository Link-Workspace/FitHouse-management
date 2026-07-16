import { useState, useRef, useEffect } from 'react'
import {
  ArrowRight,
  ConciergeBell,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Mic,
  PauseCircle,
  PlayCircle,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { Avatar, Modal, SectionHeader, Toggle } from '../components/Common'

const VOICES = [
  { id: 'ana', label: 'Ana', desc: 'Feminina · Calorosa e profissional' },
  { id: 'lucas', label: 'Lucas', desc: 'Masculina · Clara e objetiva' },
  { id: 'sofia', label: 'Sofia', desc: 'Feminina · Jovem e dinâmica' },
  { id: 'marco', label: 'Marco', desc: 'Masculina · Grave e serena' },
]

const BASE_PROMPT = `Você é a recepcionista virtual da Fit House. Seu papel é atender alunos que tiveram impedimento na catraca ou que desejam informações sobre planos, horários e serviços da academia.

Diretrizes:
• Seja sempre cordial, prestativa e objetiva.
• Verifique o status do aluno antes de sugerir qualquer ação.
• Se houver pendência financeira, ofereça opções de regularização com empatia.
• Para dúvidas sobre planos, apresente os benefícios sem pressionar.
• Em caso de impedimento técnico, instrua o aluno a buscar atendimento presencial.
• Nunca compartilhe dados financeiros detalhados sem verificar a identidade.
• Encerre as conversas de forma gentil e personalizada.`

const AUDIO_EXAMPLES = [
  {
    id: 'pagamento',
    file: '/Pagamento pendente.mp3',
    title: 'Pagamento pendente',
    subtitle: 'Aluno impedido na catraca por mensalidade em atraso',
    context: 'A IA identifica a pendência financeira, informa o aluno com empatia e oferece link direto para regularização imediata.',
  },
  {
    id: 'duvidas',
    file: '/Marcos com duvidas.mp3',
    title: 'Aluno com dúvidas',
    subtitle: 'Marcos questiona planos, horários e serviços disponíveis',
    context: 'A IA responde perguntas sobre grade de aulas coletivas, benefícios de planos e orienta sobre o melhor caminho para o aluno.',
  },
  {
    id: 'desconto',
    file: '/Desconto em suplementos.mp3',
    title: 'Desconto em suplementos',
    subtitle: 'Aluno pergunta sobre promoções exclusivas para membros',
    context: 'A IA informa sobre descontos disponíveis para membros ativos e direciona para o balcão de nutrição da academia.',
  },
]

function formatAudioTime(s: number) {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const MOCK_TRANSCRIPTS = [
  { id: 1, time: '17:43', name: 'Carlos Mendes', plan: 'Plano Mensal', summary: 'Aluno com pagamento atrasado. IA informou pendência e ofereceu link de pagamento.', status: 'Resolvido' as const, turns: 4 },
  { id: 2, time: '16:28', name: 'Fernanda Lima', plan: 'Plano Trimestral', summary: 'Dúvida sobre horários de aulas coletivas. IA forneceu grade atualizada.', status: 'Resolvido' as const, turns: 3 },
  { id: 3, time: '14:55', name: 'Diego Alves', plan: 'Plano Anual', summary: 'Impedimento técnico na catraca. IA redirecionou para atendimento presencial.', status: 'Escalado' as const, turns: 5 },
  { id: 4, time: '11:20', name: 'Priscila Costa', plan: 'Day Pass', summary: 'Interesse em upgrade de plano. IA apresentou benefícios do Plano Mensal.', status: 'Em andamento' as const, turns: 7 },
  { id: 5, time: '09:04', name: 'André Souza', plan: 'Plano Semestral', summary: 'Acesso negado por vencimento de plano. IA orientou sobre renovação.', status: 'Resolvido' as const, turns: 4 },
]

interface ReceptionistPageProps {
  onToast: (message: string) => void
}

export function ReceptionistPage({ onToast }: ReceptionistPageProps) {
  const [receptionistEnabled, setReceptionistEnabled] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState('ana')
  const [promptOpen, setPromptOpen] = useState(false)
  const [behaviorText, setBehaviorText] = useState('')
  const [transcriptSelected, setTranscriptSelected] = useState<typeof MOCK_TRANSCRIPTS[0] | null>(null)

  // Audio examples state
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)

  useEffect(() => {
    return () => { audioRef.current?.pause() }
  }, [])

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    setIsPlaying(false)
    setAudioCurrentTime(0)
    setAudioDuration(0)
  }

  function playExample(id: string, file: string) {
    stopAudio()
    setSelectedExample(id)
    const audio = new Audio(file)
    audioRef.current = audio
    audio.addEventListener('loadedmetadata', () => setAudioDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setAudioCurrentTime(audio.currentTime))
    audio.addEventListener('ended', () => { setIsPlaying(false); setAudioCurrentTime(0) })
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  function togglePlay() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  function handleExampleClick(id: string, file: string) {
    if (selectedExample === id) {
      togglePlay()
    } else {
      playExample(id, file)
    }
  }

  return (
    <div className="page-stack">
      <section className={`receptionist-hero ${receptionistEnabled ? '' : 'is-offline'}`}>
        <div className="receptionist-hero__icon"><ConciergeBell size={28} /></div>
        <div className="receptionist-hero__copy">
          <span>{receptionistEnabled ? 'RECEPCIONISTA ATIVA' : 'RECEPCIONISTA DESATIVADA'}</span>
          <h2>Recepcionista IA Fit House</h2>
          <p>A IA atende alunos com impedimento na catraca e responde dúvidas sobre planos, horários e serviços — com voz natural e em tempo real.</p>
          <div className="receptionist-hero__meta">
            <div><strong>47</strong><span>conversas hoje</span></div>
            <div><strong>94%</strong><span>resolvidas pela IA</span></div>
            <div><strong>38s</strong><span>tempo médio</span></div>
          </div>
        </div>
        <div className="receptionist-hero__control">
          <span>STATUS DA RECEPCIONISTA</span>
          <Toggle checked={receptionistEnabled} onChange={(v) => { setReceptionistEnabled(v); onToast(v ? 'Recepcionista IA ativada.' : 'Recepcionista IA desativada.') }} />
          <strong>{receptionistEnabled ? 'Ativa e operando' : 'Desativada'}</strong>
          <small>{receptionistEnabled ? 'Respondendo acessos em tempo real' : 'Nenhuma conversa será iniciada'}</small>
        </div>
        <div className="receptionist-pulse receptionist-pulse--one" />
        <div className="receptionist-pulse receptionist-pulse--two" />
      </section>

      <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="VOZ DA RECEPCIONISTA" title="Personalidade sonora" description="Escolha como a IA vai se expressar com os alunos." />
          <div className="voice-options">
            {VOICES.map((voice) => (
              <button key={voice.id} className={`voice-option ${selectedVoice === voice.id ? 'is-active' : ''}`} onClick={() => { setSelectedVoice(voice.id); onToast(`Voz "${voice.label}" selecionada.`) }}>
                <span className="voice-option__icon"><Volume2 size={17} /></span>
                <span className="voice-option__info"><strong>{voice.label}</strong><small>{voice.desc}</small></span>
                {selectedVoice === voice.id && <CheckCircle2 size={16} className="voice-option__check" />}
              </button>
            ))}
          </div>
          <button className="button button--ghost button--full" style={{ marginTop: '10px' }} onClick={() => onToast('Prévia de voz reproduzida.')}><Mic size={15} /> Ouvir prévia da voz selecionada</button>
        </article>

        <article className="panel">
          <SectionHeader eyebrow="COMPORTAMENTO" title="Sugerir um comportamento" description="Descreva como você quer que a recepcionista aja em determinadas situações." />
          <textarea
            className="behavior-textarea"
            placeholder='Ex: "Quando o aluno mencionar cancelamento, ofereça uma pausa no plano antes de aceitar."'
            value={behaviorText}
            onChange={(e) => setBehaviorText(e.target.value)}
            rows={5}
          />
          <div className="behavior-actions">
            <button className="button button--ghost" onClick={() => setPromptOpen(true)}><MessageSquare size={15} /> Ver prompt base</button>
            <button className="button button--primary" disabled={!behaviorText.trim()} onClick={() => { onToast('Comportamento enviado para revisão da IA.'); setBehaviorText('') }}><Lightbulb size={15} /> Enviar sugestão</button>
          </div>
        </article>
      </section>

      <article className="panel">
        <SectionHeader eyebrow="EXEMPLOS DE CONVERSA" title="Ouça a IA em ação" description="Selecione um contexto para ouvir como a recepcionista IA interage com os alunos em situações reais." />
        <div className="audio-examples">
          {AUDIO_EXAMPLES.map((ex) => {
            const isSelected = selectedExample === ex.id
            const progress = isSelected && audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0
            return (
              <button
                key={ex.id}
                className={`audio-example-card ${isSelected ? 'is-active' : ''}`}
                onClick={() => handleExampleClick(ex.id, ex.file)}
              >
                <div className="audio-example-card__icon">
                  {isSelected && isPlaying ? <PauseCircle size={22} /> : <PlayCircle size={22} />}
                </div>
                <div className="audio-example-card__body">
                  <strong>{ex.title}</strong>
                  <small>{ex.subtitle}</small>
                  {isSelected && <p className="audio-example-card__context">{ex.context}</p>}
                  {isSelected && (
                    <div className="audio-progress">
                      <div className="audio-progress__bar">
                        <div className="audio-progress__fill" style={{ width: `${progress}%` }} />
                      </div>
                      <span>{formatAudioTime(audioCurrentTime)} / {audioDuration > 0 ? formatAudioTime(audioDuration) : '--:--'}</span>
                    </div>
                  )}
                </div>
                {isSelected && isPlaying && (
                  <div className="audio-waves">
                    <span /><span /><span /><span />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </article>

      <article className="panel">
        <SectionHeader eyebrow="CONVERSAS RECENTES" title="Transcrições de hoje" description="Histórico das interações que a recepcionista IA conduziu." action={<span className="live-button"><i /> Ao vivo</span>} />
        <div className="transcript-list">
          {MOCK_TRANSCRIPTS.map((t, index) => (
            <button key={t.id} className="transcript-row" onClick={() => setTranscriptSelected(t)}>
              <div className="transcript-row__time"><strong>{t.time}</strong><span>HOJE</span></div>
              <Avatar initials={t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)} tone={index} />
              <div className="transcript-row__identity"><strong>{t.name}</strong><span>{t.plan} · {t.turns} turnos</span></div>
              <div className="transcript-row__summary"><span>{t.summary}</span></div>
              <span className={`transcript-badge transcript-badge--${t.status === 'Resolvido' ? 'green' : t.status === 'Escalado' ? 'red' : 'bronze'}`}>{t.status}</span>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </article>

      {promptOpen && (
        <Modal title="Prompt base da Recepcionista" subtitle="Instruções que guiam o comportamento da IA" onClose={() => setPromptOpen(false)} width="640px">
          <pre className="prompt-display">{BASE_PROMPT}</pre>
          <div className="modal-actions">
            <button className="button button--ghost" onClick={() => setPromptOpen(false)}>Fechar</button>
            <button className="button button--primary" onClick={() => { onToast('Solicitação de edição enviada para revisão.'); setPromptOpen(false) }}><Sparkles size={15} /> Solicitar edição</button>
          </div>
        </Modal>
      )}

      {transcriptSelected && (
        <Modal title={transcriptSelected.name} subtitle={`Transcrição de ${transcriptSelected.time} · ${transcriptSelected.plan}`} onClose={() => setTranscriptSelected(null)} width="640px">
          <div className="detail-section"><span>RESUMO DA IA</span><p style={{ marginTop: '6px' }}>{transcriptSelected.summary}</p></div>
          <div className="detail-metrics" style={{ marginTop: '14px' }}>
            <div><span>Horário</span><strong>{transcriptSelected.time}</strong></div>
            <div><span>Turnos</span><strong>{transcriptSelected.turns}</strong></div>
            <div><span>Status</span><strong>{transcriptSelected.status}</strong></div>
          </div>
          <div className="modal-actions">
            <button className="button button--ghost" onClick={() => setTranscriptSelected(null)}>Fechar</button>
            <button className="button button--primary" onClick={() => onToast('Transcrição completa exportada.')}><MessageSquare size={15} /> Exportar transcrição</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
