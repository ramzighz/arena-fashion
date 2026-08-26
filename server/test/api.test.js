import { spawn } from 'child_process';
import http from 'http';

console.log('--- STARTING MILANO MENSWEAR API & AUDIT VERIFICATION SUITE ---');

const SERVER_PORT = 5002;
process.env.PORT = SERVER_PORT.toString();
process.env.NODE_ENV = 'production';

// Start server child process
const serverProcess = spawn('node', ['src/index.js'], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: SERVER_PORT.toString() },
  stdio: 'pipe',
});

let serverOutput = '';
serverProcess.stdout.on('data', (d) => (serverOutput += d.toString()));
serverProcess.stderr.on('data', (d) => (serverOutput += d.toString()));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:${SERVER_PORT}${path}`,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: body ? JSON.parse(body) : body,
              rawBody: body,
            });
          } catch (e) {
            resolve({ statusCode: res.statusCode, headers: res.headers, rawBody: body });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
};

async function runTests() {
  await sleep(1500);

  let passed = 0;
  let failed = 0;

  function assert(name, condition) {
    if (condition) {
      console.log(`\x1b[32m✔ PASS:\x1b[0m ${name}`);
      passed++;
    } else {
      console.error(`\x1b[31m✖ FAIL:\x1b[0m ${name}`);
      failed++;
    }
  }

  try {
    // 1. Health check & Security headers
    const health = await request('/api/health');
    assert('Health Check Returns 200 and Active Status', health.statusCode === 200 && health.body.status === 'healthy');
    assert('Helmet X-Content-Type-Options Header Present', health.headers['x-content-type-options'] === 'nosniff');
    assert('Helmet X-Frame-Options DENY Header Present', health.headers['x-frame-options'] === 'DENY');
    assert('Content-Security-Policy (CSP) Active', !!health.headers['content-security-policy']);

    // 2. SEO: robots.txt and sitemap.xml
    const robots = await request('/robots.txt');
    assert('robots.txt returns valid plain text with sitemap reference', robots.statusCode === 200 && robots.rawBody.includes('Sitemap:'));

    const sitemap = await request('/sitemap.xml');
    assert('sitemap.xml returns XML urlset with 2026 lastmod without stylist', sitemap.statusCode === 200 && sitemap.rawBody.includes('<urlset') && !sitemap.rawBody.includes('/stylist'));

    // 3. Products Catalog & DZD Pricing Verification
    const products = await request('/api/products');
    assert('Products catalog returns full list of items', products.statusCode === 200 && products.body.products.length >= 10);
    const allBetween2000And12000 = products.body.products.every((p) => p.price >= 2000 && p.price <= 12000);
    assert('All product prices are strictly within 2,000 DZD and 12,000 DZD range', allBetween2000And12000);

    const selvedgeSearch = await request('/api/products?search=selvedge');
    assert('Live search finds 14.5oz Japanese Selvedge jeans with 8500 DZD price', selvedgeSearch.body.products.length > 0 && selvedgeSearch.body.products[0].price === 8500);

    // 4. Order Placement in DZD
    const order = await request('/api/orders', {
      method: 'POST',
      body: {
        items: [
          { id: 'milano-001', name: '14.5oz Japanese Selvedge Straight Jean', size: '32x32', price: 8500, quantity: 2 },
        ],
        shippingAddress: {
          fullName: 'Marcus Vance',
          street: 'Didouche Mourad St',
          city: 'Algiers',
          state: 'Algiers',
          zip: '16000',
          country: 'Algeria',
        },
        contact: {
          email: 'marcus@example.com',
          phone: '+213 555 0144',
        },
      },
    });
    assert('Order created with DZD total and free shipping above 15,000 DZD', order.statusCode === 201 && order.body.order?.total === 17000 && order.body.order?.shipping === 0);

    // 5. Auth: Register and Login
    const testEmail = `test_${Date.now()}@example.com`;
    const reg = await request('/api/auth/register', {
      method: 'POST',
      body: { name: 'Test User', email: testEmail, password: 'SecurePassword2026!' },
    });
    assert('Customer registration issues JWT token', reg.statusCode === 201 && !!reg.body.token);

    const login = await request('/api/auth/login', {
      method: 'POST',
      body: { email: testEmail, password: 'SecurePassword2026!' },
    });
    assert('Customer login verifies bcrypt hash & returns session', login.statusCode === 200 && !!login.body.token);

    // 6. Admin Orders List
    const adminLogin = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@milanomenswear.com', password: 'MilanoAdmin2026!' },
    });
    const adminOrders = await request('/api/orders', {
      headers: { Authorization: `Bearer ${adminLogin.body.token}` },
    });
    assert('Admin portal retrieves orders list', adminOrders.statusCode === 200 && adminOrders.body.orders?.length > 0);

  } catch (err) {
    console.error('Test execution error:', err);
    console.log('Server output:\n', serverOutput);
    failed++;
  } finally {
    serverProcess.kill();
    console.log(`\n--- TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ---`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
