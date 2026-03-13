import { Injectable } from '@angular/core';
import { User } from '../../../core/models/user.model';

// Dados simulados do usuário (substituir por chamada de API em produção)
const MOCK_USER: User = {
  id: 1,
  name: 'Marcos Silva',
  email: 'marcos@happimobi.com',
  avatar: 'assets/images/ui/user.png',
};
const SENHA_VALIDA = '123456';
const CHAVE_SESSAO = 'happimobi_auth_user';

// Serviço responsável por login, logout e verificação de autenticação
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Valida as credenciais e salva o usuário na sessão
  login(email: string, senha: string): boolean {
    if (email === MOCK_USER.email && senha === SENHA_VALIDA) {
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(MOCK_USER));
      return true;
    }
    return false;
  }

  // Remove os dados da sessão ao sair
  logout(): void {
    sessionStorage.removeItem(CHAVE_SESSAO);
  }

  // Verifica se há um usuário autenticado na sessão
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(CHAVE_SESSAO);
  }

  // Retorna o usuário logado ou null se não houver sessão
  getCurrentUser(): User | null {
    const dados = sessionStorage.getItem(CHAVE_SESSAO);
    return dados ? (JSON.parse(dados) as User) : null;
  }
}

