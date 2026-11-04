import { createApp } from './app';
import { connectDatabase } from './database/connection';
import { config } from './config';

async function bootstrap() {
  await connectDatabase();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`[BricksBazar Server] API running on http://localhost:${config.port} in ${config.env} mode`);
  });
}

bootstrap().catch((err) => {
  console.error('[BricksBazar Server] Fatal startup failure:', err);
  process.exit(1);
});

