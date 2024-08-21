/* eslint-disable no-undef */
productionsDb = db.getSiblingDB('agile-live-gui');

productionsDb.createUser({
  user: 'api',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'agile-live-gui' }]
});
