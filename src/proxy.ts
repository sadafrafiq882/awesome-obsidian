import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const response = NextResponse.next();
  
  // Adiciona o ID da requisição nos headers da resposta para depuração no cliente
  response.headers.set('x-request-id', requestId);
  
  // Também podemos passar para os headers da requisição para que o servidor possa ler
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
