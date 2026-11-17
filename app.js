/* Portfolio hub — project catalogue with filtering and search. */
(() => {
  'use strict';

  const ICONS = {
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7L11.4 6.4"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.2-1.2"/></svg>',
    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="8" r="2.4"/><path d="M6 8.4v7.2M8.4 6H14a4 4 0 0 1 4 4v1.6"/></svg>',
    hook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5"/><path d="M6.5 10.5h11v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7Z"/><path d="M9.5 14.2h5M9.5 16.8h3"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-8Z"/><path d="M4 9h13a2 2 0 0 1 2 2v2h-4.5a2 2 0 0 1 0-4H20"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5c3.3 0 6 2.6 6 5.9v4.1l1.6 2.4H4.4L6 14.5v-4.1c0-3.3 2.7-5.9 6-5.9Z"/><path d="M9.8 19.2a2.4 2.4 0 0 0 4.4 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3.5 20 7v5.2c0 4.4-3.2 7.4-8 8.3-4.8-.9-8-3.9-8-8.3V7l8-3.5Z"/><path d="m8.5 12 2.4 2.4 4.6-4.8" stroke-linecap="round"/></svg>',
    badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16.4c.6-1.5 1.8-2.2 3.2-2.2s2.6.7 3.2 2.2M14.5 10h4M14.5 13h2.5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M13.2 3.5 5.8 13.4h5.1l-1.1 7.1 8.4-10.2h-5.2l.2-6.8Z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 6.7 9.2 4.4 4.4 0 0 0 7 18Z"/><path d="M12 11v6m0 0-2-2m2 2 2-2"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 2.5L19 8"/><circle cx="19" cy="8" r="1.6"/></svg>',
  };

  const PROJECTS = [
    {
      name: 'Escrow Engine',
      sub: 'p2p-escrow-engine',
      icon: 'shield',
      accent: '#f59e0b',
      category: 'web',
      desc: 'A neutral P2P escrow state machine for South African marketplaces: seven states, locked terminal states, exact-cents gateway matching and an append-only audit trail.',
      tags: ['TypeScript', 'PayFast ITN', 'state machine', 'Redis'],
      live: 'https://sklevel8-p2p-escrow.netlify.app',
      repo: 'https://github.com/sklevel8/p2p-escrow-engine',
    },
    {
      name: 'Base62',
      sub: 'high-performance-url-shortener',
      icon: 'link',
      accent: '#6366f1',
      category: 'web',
      desc: 'Deterministic short codes, sub-10 ms cached redirects and privacy-safe click telemetry. Codes are reversible Base62 encodings, so there are no collisions to retry.',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      live: 'https://sklevel8-url-shortener.netlify.app',
      repo: 'https://github.com/sklevel8/high-performance-url-shortener',
    },
    {
      name: 'HookScope',
      sub: 'hookscope',
      icon: 'hook',
      accent: '#22d3ee',
      category: 'web',
      desc: 'An ephemeral webhook inspector: create a bin, point a provider at it, and watch headers, query strings and raw payloads stream in over SSE before they expire.',
      tags: ['Node.js', 'SSE', 'Redis', 'ephemeral'],
      live: 'https://sklevel8-hookscope.netlify.app',
      repo: 'https://github.com/sklevel8/hookscope',
    },
    {
      name: 'Spendline',
      sub: 'spendline',
      icon: 'wallet',
      accent: '#34d399',
      category: 'web',
      desc: 'A local-first subscription and expense dashboard. IndexedDB persistence, offline support and analytics that never send a single transaction to a server.',
      tags: ['React', 'Vite', 'Dexie', 'PWA'],
      live: 'https://sklevel8-spendline.netlify.app',
      repo: 'https://github.com/sklevel8/spendline',
    },
    {
      name: 'smart-git studio',
      sub: 'smart-git-cli',
      icon: 'git',
      accent: '#a78bfa',
      category: 'web',
      desc: 'A local dashboard for Conventional Commits and pull-request summaries: stage files, read the diff, and let Gemini draft the message without ever sending lockfiles.',
      tags: ['Node.js', 'Gemini', 'git CLI', 'SSE'],
      live: 'https://sklevel8-smart-git.netlify.app',
      repo: 'https://github.com/sklevel8/smart-git-cli',
    },
    {
      name: 'Watchdog',
      sub: 'job-price-watchdog',
      icon: 'bell',
      accent: '#38bdf8',
      category: 'data',
      desc: 'A serverless ETL watchdog that polls job boards and store catalogues, deduplicates against persisted state and pushes only genuinely new matches to Telegram.',
      tags: ['Python', 'serverless', 'ETL', 'Telegram'],
      live: 'https://sklevel8-job-price-watchdog.netlify.app',
      repo: 'https://github.com/sklevel8/job-price-watchdog',
    },
    {
      name: 'Outage Watchdog',
      sub: 'utility-outage-watchdog',
      icon: 'bolt',
      accent: '#a855f7',
      category: 'data',
      desc: 'Load-shedding and municipal outage alerts for South Africa. Subscribers pick a zone once; the bot diffs the plan and messages only on change, inside a daily credit budget.',
      tags: ['Node.js', 'Telegram', 'scheduler', 'fixtures'],
      live: 'https://sklevel8-utility-watchdog.netlify.app',
      repo: 'https://github.com/sklevel8/utility-outage-watchdog',
    },
    {
      name: 'MarketLens',
      sub: 'predictive-retail-economic-dashboard',
      icon: 'chart',
      accent: '#f43f5e',
      category: 'data',
      desc: 'Daily JSE closes beside CPI, the repo rate, fuel and the rand, with a transparent OLS baseline forecast and an upload path for your own CSV.',
      tags: ['Python', 'FastAPI', 'pandas', 'forecasting'],
      live: 'https://sklevel8-retail-dashboard.netlify.app',
      repo: 'https://github.com/sklevel8/predictive-retail-economic-dashboard',
    },
    {
      name: 'SA ID Validator',
      sub: 'sa-id-validator',
      icon: 'badge',
      accent: '#10b981',
      category: 'web',
      desc: 'Validate 13-digit South African identity numbers entirely in the browser: Luhn checksum, date-of-birth resolution, gender, citizenship and a digit-by-digit walkthrough.',
      tags: ['vanilla JS', 'Luhn', 'privacy', 'CSV export'],
      live: 'https://sklevel8-sa-id-validator.netlify.app',
      repo: 'https://github.com/sklevel8/sa-id-validator',
    },
    {
      name: 'Cloud Console',
      sub: 'cloud-infrastructure-cicd',
      icon: 'cloud',
      accent: '#f97316',
      category: 'infra',
      desc: 'A production-shaped AWS platform: containerised Node API on ECS Fargate behind an ALB, Terraform-managed networking, rolling deploys and rollback workflows.',
      tags: ['AWS ECS', 'Terraform', 'GitHub Actions', 'Prometheus'],
      live: 'https://sklevel8-cloud-infra.netlify.app',
      repo: 'https://github.com/sklevel8/cloud-infrastructure-cicd',
    },
  ];

  const STACK = [
    { group: 'Frontend', items: ['Vanilla JS', 'React', 'Vite', 'CSS design system'] },
    { group: 'Backend', items: ['Node.js', 'Express', 'TypeScript', 'Python'] },
    { group: 'Data', items: ['PostgreSQL', 'Redis', 'pandas', 'FastAPI'] },
    { group: 'Platform', items: ['AWS ECS', 'Terraform', 'GitHub Actions', 'Netlify'] },
  ];

  const $ = (s) => document.querySelector(s);
  const grid = $('#projectGrid');
  const noResults = $('#noResults');
  const search = $('#searchInput');

  let filter = 'all';
  let query = '';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function matches(project) {
    if (filter !== 'all' && project.category !== filter) return false;
    if (!query) return true;
    const haystack = `${project.name} ${project.sub} ${project.desc} ${project.tags.join(' ')}`.toLowerCase();
    return haystack.includes(query);
  }

  function render() {
    const visible = PROJECTS.filter(matches);
    grid.innerHTML = visible.map((project, index) => `
      <article class="project" style="--project-accent:${project.accent}; animation-delay:${Math.min(index * 25, 250)}ms">
        <div class="project__head">
          <span class="project__icon" aria-hidden="true">${ICONS[project.icon] || ICONS.link}</span>
          <span class="badge">${project.tags[0]}</span>
        </div>
        <div>
          <h3 class="project__title">${escapeHtml(project.name)}</h3>
          <p class="project__sub">${escapeHtml(project.sub)}</p>
        </div>
        <p class="project__desc">${escapeHtml(project.desc)}</p>
        <div class="project__tags">${project.tags.slice(1).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <div class="project__links">
          <a class="is-live" href="${project.live}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" stroke-linecap="round"/></svg>
            Live demo
          </a>
          <a href="${project.repo}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.3 1.08 2.86.82.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
            Source
          </a>
        </div>
      </article>
    `).join('');

    noResults.classList.toggle('hidden', visible.length > 0);
  }

  function renderStack() {
    $('#stackGrid').innerHTML = STACK.map((group) => `
      <div class="stack-item">
        <h3>${escapeHtml(group.group)}</h3>
        <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    `).join('');
  }

  document.querySelectorAll('[data-filter]').forEach((tab) => {
    tab.addEventListener('click', () => {
      filter = tab.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      render();
    });
  });

  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    render();
  });

  $('#year').textContent = String(new Date().getFullYear());

  // Keep the nav in sync while scrolling the long page.
  const sections = ['work', 'about', 'stack'].map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((section) => observer.observe(section));

  renderStack();
  render();
})();
