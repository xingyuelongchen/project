const name = 'guangyizhouSocket';
let Service = require('node-windows').Service;
let EventLogger = require('node-windows').EventLogger;
let log = new EventLogger(name);
let svc = new Service({
    name,
    description: '启动广艺舟socket服务',
    script: require('path').join(__dirname, 'bin/config/dir.js'),
    wait: 2,
    grow: .5,
    maxRetries: 40
});

svc.on('install', function () {
    svc.start();
    log.info('install complete.');
});

svc.on('uninstall', function () {
    log.info('Uninstall complete.');
    log.warn('The service exists: ', svc.exists);
});

svc.on('alreadyinstalled', () => {
    log.error('This service is already installed.');
});

if (svc.exists) return svc.uninstall();

svc.install();  