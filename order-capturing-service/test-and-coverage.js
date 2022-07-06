const http = require('http');
const childProcess = require('child_process');

async function waitForService(url) {
  const sleep = (ms) => new Promise((resolve, _) => setTimeout(resolve, ms));
  while(1) {
    console.log('[x] waiting for service', url);
    try {
      await new Promise((resolve, reject) => {
        http.get(url, (res) => {
          if (res.statusCode === 200) {
            resolve(1);
          } else {
            reject(1);
          }
        }).on('error', () => {
          reject(1);
        })
      });

      break;
    } catch(_) {
      await sleep(2000);
    }
  }
}

async function run() {
  const coverage = childProcess.exec('npm run coverage');
  coverage.stdout.pipe(process.stdout);
  coverage.stderr.pipe(process.stderr);

  await waitForService('http://localhost:3000/ping');
  childProcess.execSync('npm run test');
  http.get('http://localhost:3000/sigterm', { method: 'POST'}).on('error', console.log);
}

run();