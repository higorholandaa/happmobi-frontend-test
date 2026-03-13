# HappiMobi — Frontend Test

Aplicação mobile-first para visualização e filtragem de veículos disponíveis para locação. Desenvolvida como teste técnico frontend, com foco em organização de código, componentização e boas práticas Angular.

> **Nota de versão:** o projeto foi desenvolvido e testado com **Angular 21**, porém todas as funcionalidades e APIs utilizadas são compatíveis com **Angular 18+**. Não há uso de recursos exclusivos do Angular 19/20/21. O código roda normalmente em qualquer versão a partir da 18.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Design System](#design-system)
- [Serviços](#serviços)
- [Testes](#testes)
- [Como executar](#como-executar)
- [Credenciais de acesso](#credenciais-de-acesso)
- [Comandos disponíveis](#comandos-disponíveis)

---

## Funcionalidades

- **Login** com validação de formulário reativo (e-mail + senha) e autenticação simulada via `sessionStorage`
- **Home** com listagem de veículos em carrossel horizontal e campo de busca em tempo real
- **Busca** por nome do veículo (case-insensitive)
- **Filtros** por tipo de veículo, motorização e número de assentos
- **Guard de rota** que redireciona para `/login` se o usuário não estiver autenticado
- **Bottom navigation** com destaque do item ativo
- **Avatar do usuário** exibido no cabeçalho após login
- Navegação com **lazy loading** em todos os componentes de página

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Angular](https://angular.dev) | 21 (compatível com 18+) | Framework principal — componentes standalone |
| [Angular Material](https://material.angular.io) | 21 | Inputs, botões, ícones SVG |
| [Bootstrap](https://getbootstrap.com) | 5 | Grid e utilitários de layout |
| [RxJS](https://rxjs.dev) | 7.8 | Observables para dados assíncronos |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Tipagem estática |
| [SCSS](https://sass-lang.com) | — | Estilização com design system via CSS Custom Properties |
| [Vitest](https://vitest.dev) | 3 | Testes unitários |

---

## Arquitetura

O projeto segue a arquitetura **Feature-based** com componentes **standalone** (sem NgModules). Cada funcionalidade vive dentro da sua própria pasta em `features/`, com seus componentes, páginas e serviços isolados.

### Padrões utilizados

| Padrão | Onde aparece |
|---|---|
| Standalone components | Todos os componentes (`standalone: true`) |
| Lazy loading | Rotas com `loadComponent()` |
| Functional guard | `auth.guard.ts` usando `CanActivateFn` |
| Injeção de dependência com `inject()` | Todos os componentes e guards |
| Formulários reativos | `LoginComponent` com `FormBuilder` + `Validators` |
| `sessionStorage` para sessão | `AuthService` — sem dependência de backend |
| Mock data com `of()` | `CarsService` — dados prontos como Observable |

### Compatibilidade com Angular 18

Todos os recursos utilizados existem desde o Angular 17/18:

- `standalone: true` → disponível desde Angular 15
- `inject()` → disponível desde Angular 14
- `loadComponent()` → disponível desde Angular 15
- `CanActivateFn` → disponível desde Angular 15
- `@if` / `@for` no template → disponível desde Angular 17
- `provideRouter`, `provideAnimationsAsync` → disponível desde Angular 16/17

---

## Estrutura de pastas

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   │   └── assets.constants.ts     # Caminhos das imagens centralizados
│   │   ├── guards/
│   │   │   └── auth.guard.ts           # Guard funcional de autenticação
│   │   ├── icons/
│   │   │   ├── icon-registry.service.ts # Registra ícones SVG no Material
│   │   │   └── icons.constants.ts       # Nomes dos ícones centralizados
│   │   └── models/
│   │       ├── car.model.ts             # Interface Car + CarFilters
│   │       └── user.model.ts            # Interface User
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/login/             # Tela de login (form reativo)
│   │   │   └── services/
│   │   │       └── auth.service.ts      # Login, logout, sessão
│   │   └── cars/
│   │       ├── components/
│   │       │   ├── car-card/            # Card individual de veículo
│   │       │   └── filters/             # Painel de filtros com checkboxes
│   │       ├── pages/home/              # Tela principal com listagem e busca
│   │       └── services/
│   │           └── cars.service.ts      # Listagem, busca e filtro de carros
│   ├── shared/
│   │   └── components/
│   │       └── bottom-nav/              # Barra de navegação inferior
│   ├── app.config.ts                    # Providers globais (router, animations)
│   ├── app.routes.ts                    # Definição das rotas com lazy loading
│   ├── app.ts                           # Componente raiz (apenas router-outlet)
│   └── app.html
├── styles.scss                          # Estilos globais + design system (:root)
└── index.html
```

---

## Design System

As cores, fontes e raios de borda estão centralizados como **CSS Custom Properties** no `:root` de `src/styles.scss`. Alterar a identidade visual é feito em um único lugar:

```scss
:root {
  /* Cores principais */
  --cor-primaria:       #C61D35;  /* vermelho — botões e destaques */
  --cor-escura:         #1D2B3A;  /* azul escuro — fundos e botões secundários */
  --cor-texto:          #1a2332;  /* texto principal */
  --cor-gradiente-fim:  #2a3547;  /* final do gradiente do header */
  --cor-branca:         #ffffff;

  /* Tipografia */
  --fonte-principal: 'Poppins', sans-serif;
  --fonte-titulos:   'Montserrat', sans-serif;

  /* Raios de borda */
  --raio-input:         2rem;
  --raio-card:          0.5rem;
  --raio-botao-filtro:  1.75rem;
}
```

Todos os arquivos SCSS de componentes referenciam essas variáveis via `var(--token)`, sem nenhum valor de cor ou fonte hardcoded.

---

## Serviços

### `AuthService`

Gerencia autenticação simulada sem backend. Os dados do usuário autenticado ficam no `sessionStorage`.

| Método | Descrição |
|---|---|
| `login(email, senha)` | Valida credenciais e salva sessão. Retorna `true/false` |
| `logout()` | Remove a sessão |
| `isAuthenticated()` | Verifica se há sessão ativa |
| `getCurrentUser()` | Retorna o objeto `User` da sessão |

### `CarsService`

Gerencia o catálogo de veículos com dados mockados. Todos os métodos retornam `Observable<Car[]>` usando `of()` do RxJS — prontos para substituição por chamadas HTTP reais.

| Método | Descrição |
|---|---|
| `getCars()` | Retorna todos os veículos |
| `searchCars(term)` | Filtra por nome (case-insensitive) |
| `filterCars(filters)` | Filtra por tipo, motorização e assentos |

---

## Testes

Os testes utilizam **Vitest** integrado ao Angular CLI via `@angular/build:unit-test`. Há 4 suites de teste cobrindo os principais fluxos:

| Arquivo | O que testa |
|---|---|
| `app.spec.ts` | Criação do componente raiz |
| `auth.service.spec.ts` | Login válido/inválido, logout, sessão |
| `cars.service.spec.ts` | Listagem, busca e filtros de veículos |
| `car-card.component.spec.ts` | Renderização do card de veículo |

---

## Como executar

**1. Instalar dependências**

```bash
npm install
```

**2. Iniciar o servidor de desenvolvimento**

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Credenciais de acesso

A autenticação é simulada — não há backend. Use as credenciais abaixo:

| Campo | Valor |
|---|---|
| E-mail | `marcos@happimobi.com` |
| Senha | `123456` |

> Qualquer outro e-mail retornará erro de credenciais inválidas.

---

## Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm test` | Executa os testes unitários com Vitest |
| `npm run watch` | Build em modo watch (desenvolvimento) |
