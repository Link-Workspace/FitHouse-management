import { useState } from 'react'
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  DoorOpen,
  Globe2,
  KeyRound,
  Languages,
  LockKeyhole,
  LogOut,
  MessageCircleMore,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  UserRoundCog,
} from 'lucide-react'
import type { UserRole } from '../types'
import { SectionHeader, Toggle } from '../components/Common'

interface SettingsPageProps {
  onToast: (message: string) => void
  role: UserRole
  onLogout: () => void
}

export function SettingsPage({ onToast, role, onLogout }: SettingsPageProps) {
  const [language, setLanguage] = useState('Português (Brasil)')
  const [theme, setTheme] = useState('Escuro')
  const [notifications, setNotifications] = useState({ financial: true, access: true, campaigns: true, employees: true, ai: true })
  const [privacy, setPrivacy] = useState({ audit: true, mask: true, session: true })

  return (
    <div className="page-stack">
      <section className="settings-layout">
        <aside className="settings-nav panel">
          <span>CONFIGURAÇÕES</span>
          <button className="is-active"><Building2 size={17} /> Academia</button>
          <button><UserRoundCog size={17} /> Conta e acesso</button>
          <button><Bell size={17} /> Notificações</button>
          <button><Smartphone size={17} /> Integrações</button>
          <button><Palette size={17} /> Aparência</button>
          <button><ShieldCheck size={17} /> Privacidade</button>
          <button><CircleHelp size={17} /> Ajuda e suporte</button>
        </aside>

        <div className="settings-content">
          <article className="panel settings-section">
            <SectionHeader eyebrow="DADOS DA EMPRESA" title="Informações da academia" description="Dados exibidos no app, documentos e comunicações com os alunos." />
            <div className="settings-brand-row"><img src={`${import.meta.env.BASE_URL}fit-house-logo.png`} alt="Fit House" /><div><strong>Logo da academia</strong><span>PNG ou JPG • recomendado 512 × 512 px</span><button onClick={() => onToast('Seletor de logo aberto.')}>Alterar imagem</button></div></div>
            <div className="form-grid">
              <label className="form-field"><span>Nome da academia</span><input defaultValue="Fit House Academia" /></label>
              <label className="form-field"><span>CNPJ</span><input defaultValue="12.345.678/0001-90" /></label>
              <label className="form-field form-field--span-2"><span>Endereço</span><input defaultValue="Av. Principal, 550 - Centro, Lages - SC" /></label>
              <label className="form-field"><span>Telefone</span><input defaultValue="(49) 3222-5500" /></label>
              <label className="form-field"><span>WhatsApp</span><input defaultValue="(49) 99999-5500" /></label>
              <label className="form-field"><span>E-mail</span><input defaultValue="contato@fithouse.com.br" /></label>
              <label className="form-field"><span>Horário de funcionamento</span><input defaultValue="Seg–Sex 06h–23h • Sáb 08h–18h" /></label>
            </div>
            <div className="settings-save-row"><button className="button button--primary" onClick={() => onToast('Informações da academia salvas.')}><Save size={16} /> Salvar alterações</button></div>
          </article>

          <article className="panel settings-section">
            <SectionHeader eyebrow="INTEGRAÇÕES" title="Serviços conectados" description="Status dos sistemas usados pela operação e pelas automações." />
            <div className="integration-list">
              <div><span className="integration-icon integration-icon--whatsapp"><MessageCircleMore size={19} /></span><div><strong>WhatsApp da academia</strong><p>Envio de notificações, pesquisas e atendimento dos alunos.</p><small>+55 49 99999-5500</small></div><em className="integration-status"><i /> Conectado</em><button onClick={() => onToast('Configurações do WhatsApp abertas.')}><ChevronRight size={17} /></button></div>
              <div><span className="integration-icon integration-icon--gate"><DoorOpen size={19} /></span><div><strong>Catraca de acesso</strong><p>Registro de entrada, saída e validação dos planos.</p><small>Catraca principal • ID FH-001</small></div><em className="integration-status"><i /> Online</em><button onClick={() => onToast('Configurações da catraca abertas.')}><ChevronRight size={17} /></button></div>
              <div><span className="integration-icon integration-icon--app"><Smartphone size={19} /></span><div><strong>Aplicativo Fit House</strong><p>Treinos, notificações, planos, promoções e feedbacks.</p><small>Versão 1.0.0 • Android e iOS</small></div><em className="integration-status"><i /> Sincronizado</em><button onClick={() => onToast('Configurações do aplicativo abertas.')}><ChevronRight size={17} /></button></div>
              <div><span className="integration-icon integration-icon--payment"><KeyRound size={19} /></span><div><strong>Gateway de pagamentos</strong><p>Mensalidades, compras da loja e conciliação financeira.</p><small>Ambiente de demonstração</small></div><em className="integration-status integration-status--warning"><i /> Configurar</em><button onClick={() => onToast('Assistente de integração de pagamentos aberto.')}><ChevronRight size={17} /></button></div>
            </div>
          </article>

          <article className="panel settings-section">
            <SectionHeader eyebrow="PREFERÊNCIAS" title="Idioma e aparência" description="Personalize como o sistema é exibido para você." />
            <div className="settings-preference-grid"><label><span className="settings-pref-icon"><Languages size={18} /></span><span><strong>Idioma</strong><small>Idioma principal da interface</small></span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option>Português (Brasil)</option><option>English</option><option>Español</option></select></label><label><span className="settings-pref-icon"><Palette size={18} /></span><span><strong>Aparência</strong><small>Tema visual do sistema</small></span><select value={theme} onChange={(event) => setTheme(event.target.value)}><option>Escuro</option><option>Automático</option><option>Claro</option></select></label><label><span className="settings-pref-icon"><Globe2 size={18} /></span><span><strong>Fuso horário</strong><small>Datas e horários da operação</small></span><select><option>Brasília (GMT-3)</option></select></label><label><span className="settings-pref-icon"><Building2 size={18} /></span><span><strong>Unidade padrão</strong><small>Unidade mostrada ao entrar</small></span><select><option>Fit House Centro</option></select></label></div>
          </article>

          <article className="panel settings-section">
            <SectionHeader eyebrow="NOTIFICAÇÕES" title="Alertas do sistema" description="Escolha quais eventos devem gerar notificações para seu perfil." />
            <div className="settings-toggle-list">
              <div><span><strong>Alertas financeiros</strong><small>Inadimplência, metas, caixa e recomendações.</small></span><Toggle checked={notifications.financial} onChange={(value) => setNotifications((current) => ({ ...current, financial: value }))} /></div>
              <div><span><strong>Alertas da catraca</strong><small>Acessos bloqueados, planos pendentes e anomalias.</small></span><Toggle checked={notifications.access} onChange={(value) => setNotifications((current) => ({ ...current, access: value }))} /></div>
              <div><span><strong>Campanhas e sorteios</strong><small>Disparos, resultados e necessidade de aprovação.</small></span><Toggle checked={notifications.campaigns} onChange={(value) => setNotifications((current) => ({ ...current, campaigns: value }))} /></div>
              <div><span><strong>Funcionários</strong><small>Escala, desempenho e sugestões para a equipe.</small></span><Toggle checked={notifications.employees} onChange={(value) => setNotifications((current) => ({ ...current, employees: value }))} /></div>
              <div><span><strong>Decisões da IA</strong><small>Ações importantes executadas ou aguardando aprovação.</small></span><Toggle checked={notifications.ai} onChange={(value) => setNotifications((current) => ({ ...current, ai: value }))} /></div>
            </div>
          </article>

          <article className="panel settings-section">
            <SectionHeader eyebrow="PRIVACIDADE E SEGURANÇA" title="Proteção das informações" description="Controles de sessão, auditoria e visualização de dados sensíveis." />
            <div className="security-summary"><span><LockKeyhole size={20} /></span><div><strong>Perfil atual: {role}</strong><p>Autenticação ativa e permissões aplicadas conforme o nível de acesso.</p></div><em><CheckCircle2 size={14} /> Protegido</em></div>
            <div className="settings-toggle-list">
              <div><span><strong>Registrar ações em auditoria</strong><small>Guarda histórico de alterações e decisões administrativas.</small></span><Toggle checked={privacy.audit} onChange={(value) => setPrivacy((current) => ({ ...current, audit: value }))} /></div>
              <div><span><strong>Mascarar dados pessoais</strong><small>Oculta CPF e informações sensíveis em listagens.</small></span><Toggle checked={privacy.mask} onChange={(value) => setPrivacy((current) => ({ ...current, mask: value }))} /></div>
              <div><span><strong>Encerrar sessão por inatividade</strong><small>Sai automaticamente após 30 minutos sem interação.</small></span><Toggle checked={privacy.session} onChange={(value) => setPrivacy((current) => ({ ...current, session: value }))} /></div>
            </div>
            <div className="privacy-links"><button onClick={() => onToast('Política de privacidade aberta.')}>Política de privacidade <ChevronRight size={15} /></button><button onClick={() => onToast('Termos de uso abertos.')}>Termos de uso <ChevronRight size={15} /></button><button onClick={() => onToast('Histórico de auditoria aberto.')}>Histórico de auditoria <ChevronRight size={15} /></button></div>
          </article>

          <article className="danger-zone"><div><LogOut size={19} /><span><strong>Sair da conta</strong><small>Encerre esta sessão com segurança.</small></span></div><button onClick={onLogout}>Sair agora</button></article>
          <p className="settings-version">Fit House Gestão • versão 1.0.0 • ambiente demonstrativo com dados hardcoded</p>
        </div>
      </section>
    </div>
  )
}
