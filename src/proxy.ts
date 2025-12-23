import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  // Executa o middleware do next-intl primeiro
  const response = intlMiddleware(request);
  
  // Adiciona o ID da requisição nos headers da resposta para depuração no cliente
  response.headers.set('x-request-id', requestId);
  
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files (_next/static, _next/image, etc.)
    // - Files with extensions (e.g. favicon.ico, logo.svg)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all locales
    '/',
    '/(pt|en)/:path*'
  ],
};
