// Simple admin authentication (for demo - use proper auth in production)
export interface Admin {
  username: string;
  role: 'super_admin' | 'admin' | 'editor';
}

// Demo admin credentials (in production, use proper auth system)
const ADMIN_USERS = [
  { username: 'admin', password: 'admin123', role: 'super_admin' as const },
  { username: 'editor', password: 'editor123', role: 'editor' as const },
];

export function validateAdmin(username: string, password: string): Admin | null {
  const user = ADMIN_USERS.find(
    u => u.username === username && u.password === password
  );
  
  if (user) {
    return { username: user.username, role: user.role };
  }
  
  return null;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin_token') !== null;
}

export function getAdminUser(): Admin | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('admin_user');
  return data ? JSON.parse(data) : null;
}

export function login(username: string, password: string): boolean {
  const user = validateAdmin(username, password);
  if (user) {
    localStorage.setItem('admin_token', 'demo_token_' + Date.now());
    localStorage.setItem('admin_user', JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
}
