import winston from 'winston';
import { headers } from 'next/headers';

const { combine, timestamp, json, colorize, printf } = winston.format;

const devFormat = printf(({ level, message, timestamp, requestId, ...metadata }) => {
  let msg = `${timestamp} [${level}]${requestId ? ` [${requestId}]` : ''}: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug', // Alterado para debug para garantir captura
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    process.env.NODE_ENV === 'development' 
      ? combine(colorize(), devFormat) 
      : json()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

logger.info("Logger inicializado", { env: process.env.NODE_ENV });

// Helper to get a logger with current request context
export async function getRequestLogger(context: Record<string, any> = {}) {
  let requestId = 'unknown';
  try {
    const headerList = await headers();
    requestId = headerList.get('x-request-id') || 'unknown';
  } catch (e) {
    // Headers not available (e.g. during build or outside request context)
  }
  
  return logger.child({ requestId, ...context });
}

// Helper to add context to logs
export const logContext = (context: Record<string, any>) => {
  return logger.child(context);
};
