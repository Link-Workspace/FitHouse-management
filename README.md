# Fit House — Sistema de Gestão

Sistema administrativo para computador, criado em React + TypeScript + Vite e seguindo a mesma identidade visual do aplicativo Fit House.

## Executar no VS Code

1. Extraia completamente o arquivo ZIP.
2. Abra a pasta `fit-house-gestao` no VS Code.
3. Confirme que está usando o Node.js 20 LTS ou superior:

```powershell
node -v
npm -v
```

4. Instale as dependências:

```powershell
npm install --no-audit --no-fund
```

5. Inicie o sistema:

```powershell
npm run dev
```

6. Abra o endereço mostrado no terminal, normalmente:

```text
http://localhost:5173
```

## Login de demonstração

- E-mail: `admin@fithouse.com`
- Senha: `123456`
- Perfis disponíveis: Diretor, Gerente e Recepção

O perfil **Diretor** exibe as recomendações estratégicas de remuneração e investimento na equipe.

## Funcionalidades incluídas

- Login de funcionários com perfis de acesso.
- Dashboard geral com alunos, financeiro, loja, catraca e recomendações da IA.
- Painel destacado e em tempo real da catraca e dos alunos treinando.
- Controle financeiro completo, inadimplência e recomendações.
- Cadastro, pesquisa, filtros e perfil detalhado dos alunos.
- Gestão da loja de suplementos, vendas, produtos e estoque.
- Criação de promoções e sorteios para app e WhatsApp.
- Gestão de funcionários, escala, desempenho e sugestões para o diretor.
- Painel de satisfação por app, WhatsApp e saída da academia.
- Central de controle das automações de IA.
- Configurações, integrações, idioma, privacidade e notificações.

Todos os dados e integrações são demonstrativos e funcionam em **hardcoded**, com interações locais para permitir a apresentação do sistema sem backend.

## Build de produção

```powershell
npm run build
npm run preview
```
