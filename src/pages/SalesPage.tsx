import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Box,
  CircleDollarSign,
  Download,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { products, sales } from '../data'
import { MetricCard, Modal, SectionHeader, StatusBadge } from '../components/Common'

interface SalesPageProps {
  onToast: (message: string) => void
  visibleSections?: Record<string, boolean>
}

export function SalesPage({ onToast, visibleSections = {} }: SalesPageProps) {
  const show = (key: string) => visibleSections[key] !== false
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas as categorias')
  const [showSale, setShowSale] = useState(false)

  const filtered = useMemo(() => sales.filter((sale) => {
    const q = search.toLowerCase()
    return (sale.member.toLowerCase().includes(q) || sale.product.toLowerCase().includes(q))
      && (category === 'Todas as categorias' || sale.category === category)
  }), [search, category])

  return (
    <div className="page-stack">
      <div className="page-actions-row page-actions-row--spread">
        <div className="student-summary-line"><strong>Loja Fit House</strong><span>Suplementos, snacks e acessórios</span></div>
        <div className="page-actions-row__group"><button className="button button--ghost" onClick={() => onToast('Relatório de vendas exportado.')}><Download size={16} /> Exportar</button><button className="button button--primary" onClick={() => setShowSale(true)}><Plus size={16} /> Nova venda</button></div>
      </div>

      {show('metrics') && <section className="metrics-grid metrics-grid--four">
        <MetricCard label="Vendas no mês" value="R$ 18.700" change="14,2%" icon={<CircleDollarSign size={21} />} tone="green" helper="meta: R$ 20 mil" />
        <MetricCard label="Pedidos concluídos" value="247" change="11,6%" icon={<ShoppingBag size={21} />} tone="red" helper="ticket médio de R$ 75,70" />
        <MetricCard label="Produto mais vendido" value="Creatina 300g" change="74 un." icon={<TrendingUp size={21} />} tone="bronze" helper="R$ 8,8 mil em receita" />
        <MetricCard label="Itens em atenção" value="2" change="estoque baixo" positive={false} icon={<AlertTriangle size={21} />} tone="blue" helper="whey e coqueteleira" />
      </section>}

      {show('categorias') && <section className="dashboard-grid dashboard-grid--wide-left">
        <article className="panel">
          <SectionHeader eyebrow="DESEMPENHO DA LOJA" title="Vendas por categoria" description="Participação no faturamento do mês atual." />
          <div className="category-bars">
            <div><span><strong>Proteínas</strong><small>Whey e blends</small></span><div><i style={{ width: '88%' }} /></div><b>R$ 7.920</b><em>42,4%</em></div>
            <div><span><strong>Creatinas</strong><small>Monohidratada e blends</small></span><div><i style={{ width: '77%' }} /></div><b>R$ 6.210</b><em>33,2%</em></div>
            <div><span><strong>Pré-treinos</strong><small>Energia e performance</small></span><div><i style={{ width: '37%' }} /></div><b>R$ 2.760</b><em>14,8%</em></div>
            <div><span><strong>Snacks</strong><small>Barras e bebidas</small></span><div><i style={{ width: '18%' }} /></div><b>R$ 1.120</b><em>6,0%</em></div>
            <div><span><strong>Acessórios</strong><small>Coqueteleiras e itens</small></span><div><i style={{ width: '11%' }} /></div><b>R$ 690</b><em>3,6%</em></div>
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel top-product-card">
            <span>PRODUTO CAMPEÃO</span>
            <div className="top-product-card__icon"><PackageCheck size={33} /></div>
            <h3>Creatina Monohidratada 300g</h3>
            <p>74 unidades vendidas no mês</p>
            <div><strong>R$ 8.872,60</strong><span>em faturamento</span></div>
            <button className="button button--soft button--full" onClick={() => onToast('Campanha para creatina preparada.')}>Criar promoção do produto</button>
          </article>
          <article className="panel recommendation-mini-card">
            <Bot size={20} /><div><span>RECOMENDAÇÃO</span><strong>Crie um combo de whey + coqueteleira.</strong><p>Potencial de elevar o ticket médio em R$ 22.</p></div>
          </article>
        </aside>
      </section>}

      {show('historico') && <section className="panel">
        <SectionHeader eyebrow="VENDAS RECENTES" title="Histórico de pedidos" description="Compras realizadas pelos alunos na loja da academia." />
        <div className="advanced-toolbar"><label className="inline-search inline-search--wide"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar aluno ou produto..." /></label><label className="select-control"><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Todas as categorias</option><option>Creatina</option><option>Proteína</option><option>Pré-treino</option><option>Snack</option><option>Acessórios</option></select></label></div>
        <div className="data-table-wrap">
          <table className="data-table"><thead><tr><th>Pedido</th><th>Aluno</th><th>Produto</th><th>Data</th><th>Qtd.</th><th>Pagamento</th><th>Total</th><th>Status</th></tr></thead><tbody>{filtered.map((sale) => <tr key={sale.id}><td><strong>#{sale.id}</strong></td><td>{sale.member}</td><td><div className="product-table-cell"><span className="product-mini-icon"><Box size={15} /></span><span><strong>{sale.product}</strong><small>{sale.category}</small></span></div></td><td>{sale.date}</td><td>{sale.quantity}</td><td>{sale.payment}</td><td><strong>R$ {sale.total.toFixed(2).replace('.', ',')}</strong></td><td><StatusBadge status={sale.status} /></td></tr>)}</tbody></table>
        </div>
      </section>}

      {show('estoque') && <section className="dashboard-grid dashboard-grid--equal">
        <article className="panel">
          <SectionHeader eyebrow="ESTOQUE" title="Produtos e reposição" description="Acompanhe disponibilidade e risco de ruptura." action={<button className="link-button" onClick={() => onToast('Tela de inventário aberta.')}>Ver inventário <ArrowRight size={14} /></button>} />
          <div className="inventory-list">{products.map((product) => { const low = product.stock <= product.minStock; return <div key={product.id}><span className={`inventory-icon ${low ? 'is-low' : ''}`}><Box size={17} /></span><div><strong>{product.name}</strong><small>{product.category} • mínimo {product.minStock} un.</small></div><div className="inventory-stock"><strong>{product.stock} un.</strong><span className="progress-track"><i style={{ width: `${Math.min(100, product.stock * 4)}%` }} /></span></div>{low ? <StatusBadge status="Atenção" /> : <StatusBadge status="Em dia" />}</div>})}</div>
        </article>
        <article className="panel">
          <SectionHeader eyebrow="RECOMENDAÇÕES DA IA" title="Como vender melhor" description="Ações sugeridas a partir das compras dos alunos." />
          <div className="sales-recommendation-list">
            <article><span><Sparkles size={16} /></span><div><strong>Repor 12 unidades de Whey Chocolate</strong><p>O estoque acaba em aproximadamente 6 dias no ritmo atual.</p><button onClick={() => onToast('Pedido de reposição preparado.')}>Preparar pedido</button></div></article>
            <article><span><Sparkles size={16} /></span><div><strong>Oferecer creatina a alunos Fit Black</strong><p>Esse público converte 2,4x mais em suplementos de performance.</p><button onClick={() => onToast('Público da campanha segmentado.')}>Criar campanha</button></div></article>
            <article><span><Sparkles size={16} /></span><div><strong>Liquidar coqueteleiras antigas</strong><p>7 unidades estão paradas há mais de 45 dias.</p><button onClick={() => onToast('Promoção de coqueteleiras criada.')}>Aplicar desconto</button></div></article>
          </div>
        </article>
      </section>}

      {showSale && <Modal title="Registrar nova venda" subtitle="Adicione uma compra realizada na loja Fit House" onClose={() => setShowSale(false)} width="700px"><form className="form-grid" onSubmit={(event) => { event.preventDefault(); setShowSale(false); onToast('Venda registrada com sucesso.') }}><label className="form-field form-field--span-2"><span>Aluno</span><select><option>Mariana Oliveira</option><option>Rafael Martins</option><option>Gabriel Souza</option><option>Juliana Ribeiro</option></select></label><label className="form-field form-field--span-2"><span>Produto</span><select>{products.map((product) => <option key={product.id}>{product.name}</option>)}</select></label><label className="form-field"><span>Quantidade</span><input type="number" min="1" defaultValue="1" /></label><label className="form-field"><span>Forma de pagamento</span><select><option>PIX</option><option>Cartão</option><option>Débito</option><option>Dinheiro</option></select></label><label className="form-field form-field--span-2"><span>Observação</span><textarea placeholder="Observações opcionais..." /></label><div className="modal-actions form-field--span-2"><button type="button" className="button button--ghost" onClick={() => setShowSale(false)}>Cancelar</button><button className="button button--primary" type="submit"><ShoppingBag size={16} /> Registrar venda</button></div></form></Modal>}
    </div>
  )
}
