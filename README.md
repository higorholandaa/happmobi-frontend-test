# Teste Frontend - Happmobi

Teste técnico de frontend para a Happmobi desenvolvido com Angular 18.

## 📋 Descrição

Sistema de aluguel de carros (gestão de reservas de veículos) desenvolvido em Angular 18 com design responsivo baseado no Figma fornecido. O sistema possui autenticação JWT e permite visualizar, filtrar e reservar veículos.

## 🚀 Tecnologias Utilizadas

- **Angular 18**: Framework principal
- **TypeScript**: Linguagem de programação
- **Angular Material**: Biblioteca de componentes UI
- **SCSS**: Pré-processador CSS
- **RxJS**: Programação reativa
- **Standalone Components**: Arquitetura moderna do Angular

## 📱 Funcionalidades Implementadas

### Autenticação
- ✅ Tela de login com validação de formulário
- ✅ Proteção de rotas com guards
- ✅ Armazenamento de token JWT no localStorage
- ✅ Logout

### Veículos
- ✅ Listagem de veículos disponíveis
- ✅ Filtros por:
  - Busca por texto (nome, marca, modelo, placa)
  - Marca
  - Categoria
  - Ano
- ✅ Cards responsivos com informações do veículo
- ✅ Indicação visual de status (Disponível/Reservado)
- ✅ Reserva de veículo
- ✅ Liberação de reserva

## 🎨 Design

O design segue o protótipo fornecido no Figma com tema dark (escuro) e é totalmente responsivo:
- **Mobile First**: Otimizado para tela 428x926px (mobile)
- **Responsivo**: Adapta-se perfeitamente para tablet e desktop
- **Cores**: Tema escuro com gradientes azul/roxo e vermelho/rosa

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)

### Passos para executar localmente

1. Clone o repositório:
```bash
git clone https://github.com/higorholandaa/happmobi-frontend-test.git
cd happmobi-frontend-test
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```
ou
```bash
ng serve
```

4. Acesse a aplicação em: `http://localhost:4200`

## 🔑 Credenciais de Teste

**Nota**: A aplicação está configurada para conectar-se a uma API backend em `http://localhost:3000/api`. 

Para testar a interface sem o backend:
- As telas e componentes estão totalmente funcionais
- A validação de formulários está ativa
- Os filtros funcionam corretamente

Para testar com backend:
- Configure a API conforme documentação do backend
- Utilize as credenciais fornecidas pela API

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── login/              # Componente de login
│   │   └── vehicle-list/       # Componente de listagem de veículos
│   ├── guards/
│   │   └── auth.guard.ts       # Guard de autenticação
│   ├── models/
│   │   ├── user.model.ts       # Interfaces de usuário
│   │   └── vehicle.model.ts    # Interfaces de veículo
│   ├── services/
│   │   ├── auth.service.ts     # Serviço de autenticação
│   │   └── vehicle.service.ts  # Serviço de veículos
│   ├── app.component.*         # Componente raiz
│   ├── app.config.ts           # Configuração da aplicação
│   └── app.routes.ts           # Rotas da aplicação
├── styles.scss                 # Estilos globais
└── index.html                  # Arquivo HTML principal
```

## 🛠️ Scripts Disponíveis

- `npm start` ou `ng serve` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm test` - Executa os testes unitários

## 📱 Responsividade

A aplicação é totalmente responsiva e foi desenvolvida seguindo a abordagem mobile-first:

- **Mobile** (< 768px): Layout em coluna única
- **Tablet** (768px - 1024px): Layout em 2 colunas para cards
- **Desktop** (> 1024px): Layout em 3-4 colunas para cards

## 🔐 Segurança

- Autenticação via JWT
- Rotas protegidas com guards
- Validação de formulários no frontend
- Headers de autorização em todas as requisições à API

## 👥 Autor

Desenvolvido para processo seletivo da Happmobi

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.
