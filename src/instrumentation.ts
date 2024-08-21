export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { CronJob } = await import('cron');
    const { Log } = await import('./api/logger');
    const { runSyncInventory } = await import(
      './api/manager/job/syncInventory'
    );
    const { runSyncMonitoring } = await import(
      './api/manager/job/syncMonitoring'
    );

    Log().info('Starting cron job for inventory sync.');
    new CronJob(
      '*/5 * * * * *',
      () => {
        //Log().debug('Syncing inventory...');
        runSyncInventory();
      },
      null,
      true
    );

    Log().info('Starting cron job for runtime monitoring sync.');
    new CronJob(
      '*/5 * * * * *',
      () => {
        //Log().debug('Syncing runtime monitoring...');
        runSyncMonitoring();
      },
      null,
      true
    );
  }
}
