use admin;

db.createUser({
  user: 'admin',
  pwd: 'eyevinn',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' }
  ]
});