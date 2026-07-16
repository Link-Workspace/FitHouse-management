import {
  ArrowRight,
  Bot,
  CircleDollarSign,
  DoorOpen,
  Gift,
  MessageCircleMore,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import { accessSeries, checkIns, expenseSeries, revenueSeries, weekFrequency } from '../data'
import type { PageKey } from '../types'
import { Avatar, MetricCard, SectionHeader, StatusBadge } from '../components/Common'
import { BarChart, DonutChart, LineChart } from '../components/Charts'

interface OverviewPageProps {
  onNavigate: (page: PageKey) => void
  visibleSections?: Record<string, boolean>
}

export function OverviewPage({ onNavigate, visibleSections = {} }: OverviewPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  return (
    <div className="page-stack">
      {show('hero') && <section className="hero-overview">
        <div className="hero-overview__copy">
          <span className="hero-overview__eyebrow"><Sparkles size={13} /> RESUMO INTELIGENTE DE HOJE</span>
          <h2>A academia está operando <strong>acima da média.</strong></h2>
          <p>O movimento está 12% maior que na última segunda-feira e a previsão é fechar o mês com R$ 86,4 mil em receita.</p>
          <div className="hero-overview__actions">
            <button className="button button--primary" onClick={() => onNavigate('access')}><DoorOpen size={17} /> Ver alunos na academia</button>
            <button className="button button--ghost" onClick={() => onNavigate('ai')}><Bot size={17} /> Abrir central da IA</button>
          </div>
        </div>
        <div className="hero-overview__live">
          <div className="hero-live__top"><span><i /> ONLINE</span><small>Atualizado agora</small></div>
          <strong>47</strong>
          <p>alunos treinando neste momento</p>
          <div className="hero-live__mini-chart">
            {accessSeries.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}
          </div>
          <div className="hero-live__foot"><span>Pico previsto</span><strong>18:40 • 63 alunos</strong></div>
        </div>
        <div className="hero-overview__orb hero-overview__orb--one" />
        <div className="hero-overview__orb hero-overview__orb--two" />
      </section>}

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Alunos ativos" value="438" change="6,8%" icon={<Users size={21} />} tone="red" helper="28 novos este mês" />
        <MetricCard label="Receita do mês" value="R$ 84,2 mil" change="9,4%" icon={<CircleDollarSign size={21} />} tone="green" helper="97% da meta" />
        <MetricCard label="Pagamentos em dia" value="91,6%" change="2,1%" icon={<UserCheck size={21} />} tone="bronze" helper="41 pendências" />
        <MetricCard label="Vendas da loja" value="R$ 18,7 mil" change="14,2%" icon={<ShoppingBag size={21} />} tone="blue" helper="312 itens vendidos" />
      </section>}

      {show('receita') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="FINANCEIRO" title="Receita e despesas" description="Evolução dos últimos oito meses, em milhares de reais." action={<button className="link-button" onClick={() => onNavigate('finance')}>Ver financeiro <ArrowRight size={14} /></button>} />
          <LineChart primary={revenueSeries} secondary={expenseSeries} labels={['DEZ', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL']} />
          <div className="chart-summary-row">
            <div><span>Receita projetada</span><strong>R$ 86.400</strong><em>+2,6% até o fim do mês</em></div>
            <div><span>Margem operacional</span><strong>34,7%</strong><em>Acima da meta de 32%</em></div>
            <div><span>Caixa disponível</span><strong>R$ 48.900</strong><em>1,9 mês de operação</em></div>
          </div>
        </article>

        <article className="panel">
          <SectionHeader eyebrow="PAGAMENTOS" title="Saúde da carteira" />
          <DonutChart value={92} label="em dia" helper="397 de 438 alunos estão com o plano regularizado." />
          <div className="payment-breakdown">
            <div><i className="dot dot--green" /><span>Em dia</span><strong>397</strong></div>
            <div><i className="dot dot--yellow" /><span>Pendentes</span><strong>24</strong></div>
            <div><i className="dot dot--red" /><span>Atrasados</span><strong>17</strong></div>
          </div>
          <button className="button button--soft button--full" onClick={() => onNavigate('finance')}>Analisar inadimplência</button>
        </article>
      </section>}

      {show('movimentacao') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="CATRACA" title="Últimos acessos" description="Movimentação mais recente na entrada principal." action={<button className="live-button" onClick={() => onNavigate('access')}><i /> Abrir painel ao vivo</button>} />
          <div className="compact-list">
            {checkIns.slice(0, 5).map((checkin, index) => (
              <button key={checkin.id} className="compact-person-row" onClick={() => onNavigate('access')}>
                <Avatar initials={checkin.initials} tone={index} />
                <div className="compact-person-row__copy"><strong>{checkin.name}</strong><span>{checkin.plan} • {checkin.visitsMonth} visitas no mês</span></div>
                <span className="compact-person-row__time">{checkin.time}</span>
                <StatusBadge status={checkin.status} />
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader eyebrow="FREQUÊNCIA" title="Movimento semanal" description="Entradas registradas por dia." />
          <BarChart values={weekFrequency} labels={['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']} />
          <div className="insight-strip"><TrendingUp size={17} /><div><strong>Quarta é o melhor dia.</strong><span>94% da capacidade média utilizada.</span></div></div>
        </article>
      </section>}

      {show('recomendacoes') && <section className="dashboard-grid dashboard-grid--three">
        <article className="panel recommendation-panel recommendation-panel--red">
          <div className="recommendation-panel__icon"><Bot size={20} /></div>
          <span>RECOMENDAÇÃO DA IA</span>
          <h3>Recupere até R$ 5.980 em mensalidades.</h3>
          <p>17 alunos estão com mais de 7 dias de atraso. A IA preparou uma régua amigável de negociação.</p>
          <button onClick={() => onNavigate('finance')}>Revisar recomendação <ArrowRight size={14} /></button>
        </article>
        <article className="panel recommendation-panel recommendation-panel--bronze">
          <div className="recommendation-panel__icon"><Gift size={20} /></div>
          <span>OPORTUNIDADE DE CAMPANHA</span>
          <h3>62 alunos reduziram a frequência.</h3>
          <p>Uma campanha com 7 dias grátis para convidados pode aumentar o retorno em até 18%.</p>
          <button onClick={() => onNavigate('campaigns')}>Criar campanha <ArrowRight size={14} /></button>
        </article>
        <article className="panel recommendation-panel recommendation-panel--green">
          <div className="recommendation-panel__icon"><MessageCircleMore size={20} /></div>
          <span>SATISFAÇÃO DOS ALUNOS</span>
          <h3>Nota geral subiu para 4,7.</h3>
          <p>O atendimento é o maior destaque. Lotação no horário de pico ainda exige atenção.</p>
          <button onClick={() => onNavigate('satisfaction')}>Ver feedbacks <ArrowRight size={14} /></button>
        </article>
      </section>}

      {show('acoes') && <section className="quick-actions-panel">
        <div><WalletCards size={21} /><span><strong>Registrar pagamento</strong><small>Atualizar situação de um aluno</small></span></div>
        <div><Users size={21} /><span><strong>Novo aluno</strong><small>Cadastrar matrícula e plano</small></span></div>
        <div><ShoppingBag size={21} /><span><strong>Nova venda</strong><small>Registrar item da loja</small></span></div>
        <div><Gift size={21} /><span><strong>Criar promoção</strong><small>Disparar no app e WhatsApp</small></span></div>
      </section>}
    </div>
  )
}
