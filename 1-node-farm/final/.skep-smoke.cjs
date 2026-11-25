const { spawn } = require('child_process');
const http = require('http');
const dir = __dirname;
const app = spawn(process.execPath, ['index.js'], { cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] });
let out = ''; app.stdout.on('data', d => out += d); app.stderr.on('data', d => out += d);
const get = (p) => new Promise((res, rej) => {
  const r = http.get({ host: '127.0.0.1', port: 8000, path: p, timeout: 4000 }, x => {
    let b = ''; x.on('data', c => b += c); x.on('end', () => res({ status: x.statusCode, body: b, headers: x.headers }));
  }); r.on('timeout', () => { r.destroy(new Error('timeout ' + p)); }); r.on('error', rej);
});
const fails = [];
const check = (name, ok, extra) => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : ' :: ' + (extra || ''))); if (!ok) fails.push(name); };
(async () => {
  const wait = Date.now() + 15000;
  while (Date.now() < wait) { try { await get('/api'); break; } catch (e) { await new Promise(r => setTimeout(r, 300)); } }
  try {
    const api = await get('/api');
    let json = null, parsed = false; try { json = JSON.parse(api.body); parsed = true; } catch (e) {}
    check('GET /api 200', api.status === 200, 'status=' + api.status);
    check('GET /api valid JSON', parsed && Array.isArray(json), 'not an array');
    check('GET /api 5 products', Array.isArray(json) && json.length === 5, 'len=' + (json && json.length));
    const ov = await get('/overview');
    check('GET /overview 200', ov.status === 200, 'status=' + ov.status);
    check('GET /overview renders cards', ov.body.includes('{%PRODUCT_CARDS%}') === false && ov.body.includes('<figure'), 'placeholder left in output');
    const pr = await get('/product?id=0');
    check('GET /product?id=0 200', pr.status === 200, 'status=' + pr.status);
    check('GET /product?id=0 has name', pr.body.includes((json && json[0] && json[0].productName) || 'XX'), 'product name missing');
    const nf = await get('/does-not-exist');
    check('GET /does-not-exist 404', nf.status === 404, 'status=' + nf.status);
    const rt = await get('/');
    check('GET / returns overview', rt.status === 200 && rt.body.includes('<figure'), 'status=' + rt.status);
  } catch (e) { check('http suite', false, e.message); }
  app.kill('SIGKILL');
  console.log('--- app output ---\n' + out.trim());
  console.log(fails.length ? 'RESULT FAIL (' + fails.length + ')' : 'RESULT PASS');
  process.exit(fails.length ? 1 : 0);
})();
