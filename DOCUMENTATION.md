# Documentação do Projeto - Sistema de Aluguel de Carros

## 📋 Visão Geral

Este é um sistema frontend de gestão de reservas de veículos desenvolvido em Angular 18, seguindo o design fornecido no Figma com tema dark e design responsivo.

## 🎯 Funcionalidades Implementadas

### 1. Autenticação
- ✅ Tela de login com validação de formulários
- ✅ Sistema de autenticação JWT
- ✅ Proteção de rotas com guards
- ✅ Armazenamento seguro de token e dados do usuário
- ✅ Função de logout

### 2. Gestão de Veículos
- ✅ Listagem de veículos com cards responsivos
- ✅ Filtros múltiplos:
  - Busca por texto (nome, marca, modelo, placa)
  - Filtro por marca
  - Filtro por categoria
  - Filtro por ano
- ✅ Função "Limpar Filtros"
- ✅ Indicadores visuais de status (Disponível/Reservado)
- ✅ Reserva de veículos disponíveis
- ✅ Liberação de veículos reservados

## 🎨 Design e Tema

O projeto segue fielmente o design do Figma fornecido:

### Cores Principais
- **Background Principal**: #1a1d29
- **Cards/Surfaces**: #252836
- **Texto Principal**: #ffffff
- **Texto Secundário**: #8b8d97
- **Borders**: #3a3d4e
- **Primário (Gradiente Azul/Roxo)**: #667eea → #764ba2
- **Alerta (Gradiente Vermelho)**: #eb4d4b → #d63031
- **Sucesso**: #00b894

### Layout Responsivo
- **Mobile** (< 768px): 1 coluna
- **Tablet** (768px - 1024px): 2 colunas
- **Desktop** (> 1024px): 3-4 colunas

## 🏗️ Arquitetura

### Componentes
```
src/app/components/
├── login/                    # Tela de autenticação
└── vehicle-list/            # Listagem e filtros de veículos
```

### Serviços
```
src/app/services/
├── auth.service.ts          # Autenticação e gerenciamento de token
├── vehicle.service.ts       # Operações com veículos (API real)
└── mock-data.service.ts     # Dados mockados para demonstração
```

### Guards
```
src/app/guards/
└── auth.guard.ts            # Proteção de rotas autenticadas
```

### Models
```
src/app/models/
├── user.model.ts            # Interfaces de usuário e login
└── vehicle.model.ts         # Interfaces de veículos e filtros
```

## 🔄 Fluxo da Aplicação

1. **Acesso Inicial** → Redireciona para `/login`
2. **Login** → Validação de credenciais → Armazena token JWT
3. **Redirecionamento** → `/vehicles` (protegido por guard)
4. **Listagem** → Carrega veículos da API/Mock
5. **Filtros** → Aplicação em tempo real conforme usuário digita/seleciona
6. **Ações** → Reservar/Liberar veículos

## 🔌 Integração com Backend

### Modo Mock (Padrão)
Por padrão, a aplicação usa dados mockados para demonstração:
- Login aceita qualquer e-mail/senha válidos
- 8 veículos de exemplo são exibidos
- Funcionalidades de reserva/liberação funcionam localmente

### Modo API Real
Para conectar a uma API real:

1. Configure a URL da API em `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockData: false // Altere para false
};
```

2. Descomente o código da API real nos serviços:
   - `src/app/services/auth.service.ts` (linha ~48)
   - `src/app/components/vehicle-list/vehicle-list.component.ts` (linha ~94)

### Endpoints Esperados da API

```
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }

GET /api/vehicles
Headers: Authorization: Bearer {token}
Query Params: ?brand=...&category=...&year=...&search=...
Response: Vehicle[]

POST /api/vehicles/:id/reserve
Headers: Authorization: Bearer {token}
Response: Vehicle

POST /api/vehicles/:id/release
Headers: Authorization: Bearer {token}
Response: Vehicle
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm install
npm start
# ou
ng serve
```
Acesse: `http://localhost:4200`

### Build de Produção
```bash
npm run build
```
Arquivos gerados em `dist/car-rental-app`

## 🧪 Testando a Aplicação

### Com Mock Data (Padrão)
1. Acesse `http://localhost:4200`
2. Faça login com qualquer e-mail válido e senha com mínimo 6 caracteres
3. Explore a listagem e filtros de veículos
4. Teste reservar e liberar veículos

### Credenciais de Teste Sugeridas
- **E-mail**: teste@email.com
- **Senha**: senha123

## 📦 Dependências Principais

- **@angular/core**: ^18.2.0
- **@angular/material**: ^18.2.0
- **@angular/animations**: ^18.2.0
- **rxjs**: ~7.8.0
- **typescript**: ~5.5.0

## 🔐 Segurança

- ✅ Validação de formulários no frontend
- ✅ Token JWT armazenado em localStorage
- ✅ Headers de autenticação em todas as requisições protegidas
- ✅ Guards impedem acesso não autorizado
- ✅ Sanitização de inputs

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Implementar testes unitários (Jasmine/Karma)
- [ ] Adicionar testes E2E (Cypress/Playwright)
- [ ] Implementar PWA
- [ ] Adicionar i18n (internacionalização)
- [ ] Implementar lazy loading de rotas
- [ ] Adicionar paginação para grandes listas
- [ ] Implementar cache de dados
- [ ] Adicionar modo offline
- [ ] Documentação Swagger para API

## 👥 Contribuindo

Este projeto foi desenvolvido para o processo seletivo da Happmobi.

## 📄 Licença

Desenvolvido para fins de avaliação técnica.
