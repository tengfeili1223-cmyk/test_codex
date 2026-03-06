const stack = ['TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL', 'Redis', 'Docker'];

const projects = [
  {
    name: 'Core API',
    status: 'healthy',
    description: '统一认证与业务网关，支持 1200 req/s 峰值流量。',
    metric: 'Latency p95: 122ms'
  },
  {
    name: 'Event Worker',
    status: 'syncing',
    description: '处理异步任务队列，负责多区域数据同步。',
    metric: 'Jobs/min: 3,482'
  },
  {
    name: 'Design System',
    status: 'beta',
    description: '跨项目共享组件库，支持主题变量和 token。',
    metric: 'Coverage: 91%'
  },
  {
    name: 'Analytics',
    status: 'stable',
    description: '埋点分析与监控聚合，为产品迭代提供数据反馈。',
    metric: 'Error rate: 0.11%'
  }
];

const stackPills = document.getElementById('stackPills');
const projectCards = document.getElementById('projectCards');
const terminalOutput = document.getElementById('terminalOutput');
const cmdForm = document.getElementById('cmdForm');
const cmdInput = document.getElementById('cmdInput');
const themeToggle = document.getElementById('themeToggle');

stack.forEach((name) => {
  const el = document.createElement('span');
  el.className = 'pill';
  el.textContent = name;
  stackPills.appendChild(el);
});

projects.forEach((item) => {
  const el = document.createElement('article');
  el.className = 'card project';
  el.innerHTML = `
    <div class="title-row">
      <h3>${item.name}</h3>
      <span class="pill">${item.status}</span>
    </div>
    <p>${item.description}</p>
    <div class="metric">${item.metric}</div>
  `;
  projectCards.appendChild(el);
});

const runMockCommand = (command) => {
  const now = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  return [
    `[${now}] > ${command}`,
    '[INFO] Connecting pipeline...OK',
    '[INFO] Running static checks...PASS',
    '[INFO] Build artifact uploaded: /dist/release-2.3.1.tgz',
    '[DONE] Deployment completed in 12.8s'
  ].join('\n');
};

cmdForm.addEventListener('submit', (event) => {
  event.preventDefault();
  terminalOutput.textContent = runMockCommand(cmdInput.value.trim());
});

terminalOutput.textContent = runMockCommand(cmdInput.value.trim());

themeToggle.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  if (next === 'light') {
    delete document.body.dataset.theme;
  } else {
    document.body.dataset.theme = next;
  }
});
