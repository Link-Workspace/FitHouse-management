import { useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Bot,
  CalendarRange,
  CheckCircle2,
  CircleDollarSign,
  Download,
  Landmark,
  MessageCircleMore,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { expenseSeries, members, revenueSeries } from '../data'
import { Avatar, MetricCard, SectionHeader, StatusBadge } from '../components/Common'
import { DonutChart, LineChart } from '../components/Charts'

interface FinancePageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function FinancePage({ onToast, visibleSections = {} }: FinancePageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [period, setPeriod] = useState('Julho de 2026')
  const overdue = members.filter((member) => member.status === 'Atrasado' || member.status === 'Pendente')

  return (
    <div className="page-stack">
      <div className="page-actions-row">
        <label className="select-control"><CalendarRange size={16} /><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Julho de 2026</option><option>Junho de 2026</option><option>Maio de 2026</option></select></label>
        <button className="button button--ghost" onClick={() => onToast('Relatório financeiro exportado para demonstração.')}><Download size={16} /> Exportar relatório</button>
      </div>

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Receita do mês" value="R$ 84.240" change="9,4%" icon={<CircleDollarSign size={21} />} tone="green" helper="R$ 2.160 abaixo da projeção" />
        <MetricCard label="Resultado líquido" value="R$ 29.220" change="15,8%" icon={<Wallet size={21} />} tone="red" helper="margem de 34,7%" />
        <MetricCard label="Mensalidades em dia" value="397" change="2,1%" icon={<Users size={21} />} tone="bronze" helper="91,6% da base ativa" />
        <MetricCard label="A receber" value="R$ 10.460" change="R$ 1.280" positive={false} icon={<ReceiptText size={21} />} tone="blue" helper="41 cobranças abertas" />
      </section>}

      {show('grafico') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="DESEMPENHO MENSAL" title="Receita x despesas" description="Valores em milhares de reais. O mês atual considera a projeção até o fechamento." action={<div className="segmented-control"><button className="is-active">8 meses</button><button>12 meses</button></div>} />
          <LineChart primary={revenueSeries} secondary={expenseSeries} labels={['DEZ', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL']} height={260} />
          <div className="finance-totals-grid">
            <div><span>Receita acumulada</span><strong>R$ 619,4 mil</strong><em className="positive-text"><TrendingUp size={13} /> +11,2% no período</em></div>
            <div><span>Despesas acumuladas</span><strong>R$ 422,8 mil</strong><em><TrendingDown size={13} /> 68,3% da receita</em></div>
            <div><span>Lucro acumulado</span><strong>R$ 196,6 mil</strong><em className="positive-text"><TrendingUp size={13} /> +18,4% no período</em></div>
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel">
            <SectionHeader eyebrow="CARTEIRA" title="Situação dos planos" />
            <DonutChart value={92} label="regular" helper="A meta mínima da Fit House é manter 90% dos planos regularizados." />
            <div className="payment-breakdown payment-breakdown--spaced">
              <div><i className="dot dot--green" /><span>Em dia</span><strong>397 • R$ 72,8 mil</strong></div>
              <div><i className="dot dot--yellow" /><span>Pendente</span><strong>24 • R$ 5,1 mil</strong></div>
              <div><i className="dot dot--red" /><span>Atrasado</span><strong>17 • R$ 5,3 mil</strong></div>
            </div>
          </article>
          <article className="panel cash-card">
            <div className="cash-card__icon"><Landmark size={20} /></div>
            <span>CAIXA DISPONÍVEL</span>
            <strong>R$ 48.900</strong>
            <p>Reserva equivalente a 1,9 mês de custos fixos.</p>
            <div className="progress-track"><span style={{ width: '63%' }} /></div>
            <small>Meta recomendada: 3 meses</small>
          </article>
        </aside>
      </section>}

      {show('origem') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="ORIGEM DA RECEITA" title="De onde vem o faturamento" description="Distribuição estimada para o mês atual." />
          <div className="revenue-source-list">
            <div><span className="revenue-source__icon revenue-source__icon--red"><Users size={18} /></span><div><strong>Mensalidades</strong><span>438 planos ativos</span><div className="progress-track"><i style={{ width: '72%' }} /></div></div><b>R$ 60.840</b><em>72,2%</em></div>
            <div><span className="revenue-source__icon revenue-source__icon--bronze"><Banknote size={18} /></span><div><strong>Loja de suplementos</strong><span>312 itens vendidos</span><div className="progress-track"><i style={{ width: '22%' }} /></div></div><b>R$ 18.700</b><em>22,2%</em></div>
            <div><span className="revenue-source__icon revenue-source__icon--green"><ReceiptText size={18} /></span><div><strong>Serviços e avaliações</strong><span>46 serviços realizados</span><div className="progress-track"><i style={{ width: '6%' }} /></div></div><b>R$ 4.700</b><em>5,6%</em></div>
          </div>
        </article>

        <article className="panel">
          <SectionHeader eyebrow="DESPESAS" title="Principais custos" description="R$ 55.020 em despesas previstas para julho." />
          <div className="expense-list">
            <div><span>Folha de pagamento</span><div className="progress-track"><i style={{ width: '78%' }} /></div><strong>R$ 24.050</strong><em>43,7%</em></div>
            <div><span>Aluguel e estrutura</span><div className="progress-track"><i style={{ width: '51%' }} /></div><strong>R$ 15.700</strong><em>28,5%</em></div>
            <div><span>Estoque da loja</span><div className="progress-track"><i style={{ width: '26%' }} /></div><strong>R$ 8.140</strong><em>14,8%</em></div>
            <div><span>Energia e utilidades</span><div className="progress-track"><i style={{ width: '17%' }} /></div><strong>R$ 4.980</strong><em>9,1%</em></div>
            <div><span>Marketing e outros</span><div className="progress-track"><i style={{ width: '9%' }} /></div><strong>R$ 2.150</strong><em>3,9%</em></div>
          </div>
        </article>
      </section>}

      {show('inadimplencia') && <section className="panel">
        <SectionHeader eyebrow="INADIMPLÊNCIA" title="Alunos que precisam de acompanhamento" description="A IA priorizou os casos pela chance de recuperação e histórico de relacionamento." action={<button className="button button--soft" onClick={() => onToast('Régua de cobrança iniciada para os alunos selecionados.')}><MessageCircleMore size={16} /> Iniciar régua inteligente</button>} />
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Aluno</th><th>Plano</th><th>Situação</th><th>Vencimento</th><th>Valor</th><th>Frequência</th><th>Recomendação</th><th /></tr></thead>
            <tbody>
              {overdue.map((member, index) => (
                <tr key={member.id}>
                  <td><div className="table-person"><Avatar initials={member.initials} tone={index} /><span><strong>{member.name}</strong><small>{member.phone}</small></span></div></td>
                  <td>{member.plan}</td>
                  <td><StatusBadge status={member.status} /></td>
                  <td>{member.nextCharge}</td>
                  <td><strong>R$ {member.monthlyFee.toFixed(2).replace('.', ',')}</strong></td>
                  <td>{member.visitsMonth} visitas</td>
                  <td><span className="ai-table-hint"><Bot size={13} /> {member.status === 'Atrasado' ? 'Oferecer parcelamento' : 'Lembrete amigável'}</span></td>
                  <td><button className="table-action" onClick={() => onToast(`Ação financeira aberta para ${member.name}.`)}><ArrowRight size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>}

      {show('recomendacoes') && <section className="recommendation-board">
        <SectionHeader eyebrow="CONSULTORIA FINANCEIRA DA IA" title="Recomendações para este mês" description="Sugestões geradas a partir dos resultados atuais e do comportamento dos alunos." />
        <div className="recommendation-board__grid">
          <article><span className="recommendation-number">01</span><div><strong>Recupere R$ 5.980 em mensalidades</strong><p>Uma campanha em duas etapas pode recuperar até 71% dos valores atrasados sem aumentar cancelamentos.</p><button onClick={() => onToast('Plano de recuperação aberto para revisão.')}>Ver plano de ação <ArrowRight size={14} /></button></div></article>
          <article><span className="recommendation-number">02</span><div><strong>Renegocie o contrato de energia</strong><p>O custo por aluno subiu 8% em três meses. Uma migração para o mercado livre pode economizar R$ 1.200/mês.</p><button onClick={() => onToast('Simulação de economia preparada.')}>Ver simulação <ArrowRight size={14} /></button></div></article>
          <article><span className="recommendation-number">03</span><div><strong>Reforce a reserva de emergência</strong><p>Transfira R$ 5 mil do próximo resultado para atingir 2,1 meses de custos fixos em caixa.</p><button onClick={() => onToast('Meta de reserva adicionada ao planejamento.')}>Adicionar meta <ArrowRight size={14} /></button></div></article>
        </div>
      </section>}

      {show('saude') && <section className="finance-health-strip">
        <CheckCircle2 size={21} /><div><strong>Saúde financeira: boa</strong><span>Receita crescente, margem saudável e inadimplência controlada.</span></div><em>82/100</em><button onClick={() => onToast('Diagnóstico financeiro completo aberto.')}>Ver diagnóstico <ArrowRight size={14} /></button>
      </section>}
    </div>
  )
}
