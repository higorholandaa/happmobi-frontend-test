import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return null for getCurrentUser when not logged in', () => {
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should login successfully with valid credentials', () => {
    const result = service.login('marcos@happimobi.com', '123456');
    expect(result).toBe(true);
  });

  it('should return false for invalid credentials', () => {
    const result = service.login('wrong@email.com', 'wrongpass');
    expect(result).toBe(false);
  });

  it('should set authenticated after a successful login', () => {
    service.login('marcos@happimobi.com', '123456');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return the current user after login', () => {
    service.login('marcos@happimobi.com', '123456');
    const user = service.getCurrentUser();
    expect(user).not.toBeNull();
    expect(user!.name).toBe('Marcos Silva');
    expect(user!.email).toBe('marcos@happimobi.com');
  });

  it('should clear session on logout', () => {
    service.login('marcos@happimobi.com', '123456');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });
});
