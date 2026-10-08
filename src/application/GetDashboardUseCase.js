// Caso de uso: datos del Dashboard para un usuario ya autenticado.
export class GetDashboardUseCase {
  execute(claims) {
    return {
      welcome: `Hola, ${claims.username}`,
      role: claims.role,
      stats: [
        { label: 'Sesiones activas', value: 1 },
        { label: 'Intentos fallidos hoy', value: 0 },
        { label: 'Servicios protegidos', value: 3 },
      ],
      generatedAt: new Date().toISOString(),
    };
  }
}
