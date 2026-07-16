import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import type { UserRole } from '../types'

interface LoginPageProps {
  onLogin: (role: UserRole) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('admin@fithouse.com')
  const [password, setPassword] = useState('123456')
  const [role, setRole] = useState<UserRole>('Diretor')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Informe o e-mail e a senha para entrar.')
      return
    }
    onLogin(role)
  }

  return (
    <main className="management-login">
      <section className="management-login__visual">
        <div className="management-login__brand"><img src={`${import.meta.env.BASE_URL}fit-house-logo.png`} alt="Fit House" /><div><strong>FIT HOUSE</strong><span>GESTÃO INTELIGENTE</span></div></div>
        <div className="management-login__copy"><span><Sparkles size={13} /> OPERAÇÃO EM UM ÚNICO LUGAR</span><h1>Uma academia mais inteligente, organizada e próxima dos alunos.</h1><p>Controle catraca, finanças, alunos, vendas, equipe, satisfação e automações com uma visão completa da Fit House.</p></div>
        <div className="management-login__stats"><div><strong>438</strong><span>alunos ativos</span></div><div><strong>47</strong><span>treinando agora</span></div><div><strong>9</strong><span>automações de IA</span></div></div>
        <div className="management-login__testimonial"><ShieldCheck size={18} /><div><strong>Ambiente de demonstração</strong><span>Todos os dados e ações estão configurados em hardcoded para testes no computador.</span></div></div>
        <div className="login-orb login-orb--one" /><div className="login-orb login-orb--two" />
      </section>

      <section className="management-login__form-area">
        <form className="management-login__form" onSubmit={submit}>
          <div className="login-form__header"><span>ÁREA DO FUNCIONÁRIO</span><h2>Bem-vindo de volta</h2><p>Entre com suas credenciais para acessar o sistema de gestão.</p></div>
          <label><span>E-mail corporativo</span><div className="login-input"><Mail size={17} /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="nome@fithouse.com" /></div></label>
          <label><span>Senha</span><div className="login-input"><LockKeyhole size={17} /><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Sua senha" /><button type="button" onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
         
          <div className="login-form__utility"><label><input type="checkbox" defaultChecked /> Manter conectado</label><button type="button">Esqueci minha senha</button></div>
          {error && <div className="login-error">{error}</div>}
          <button className="button button--primary login-submit" type="submit">Entrar no sistema</button>
          <div className="login-demo-note"><strong>Acesso demonstrativo:</strong><span>admin@fithouse.com • senha 123456</span></div>
        </form>
        <p className="login-footer">© 2026 Fit House Academia • Gestão segura e inteligente</p>
      </section>
    </main>
  )
}
