// === SANITY CONFIG ===
const SANITY_PROJECT_ID = '9wvm16ml';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

function sanityQuery(query) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  return fetch(url).then((r) => r.json()).then((r) => r.result);
}

function sanityImageUrl(ref, width) {
  if (!ref) return '';
  const parts = ref.split('-');
  const id = parts[1];
  const dims = parts[2];
  const format = parts[3];
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dims}.${format}?w=${width || 800}&auto=format`;
}

// === RENDER FUNCTIONS ===

function renderHero(data) {
  if (!data) return;

  const section = document.querySelector('#hero');

  const tag = section.querySelector('.hero-tag');
  if (tag && data.tag) tag.textContent = data.tag;

  const h1 = section.querySelector('h1');
  if (h1 && data.firstName) h1.innerHTML = `${data.firstName}<br><em>${data.lastName || ''}</em>`;

  const subtitle = section.querySelector('.hero-subtitle');
  if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;

  if (data.ctas && data.ctas.length) {
    const ctaContainer = section.querySelector('.hero-cta');
    ctaContainer.innerHTML = data.ctas
      .map((cta) => `<a href="${cta.href || '#'}" class="btn btn-${cta.style || 'primary'}">${cta.text || ''}</a>`)
      .join('');
  }

  if (data.stats && data.stats.length) {
    const statsContainer = section.querySelector('.hero-stats');
    statsContainer.innerHTML = data.stats
      .map((s) => {
        const num = (s.number || '').replace(/(\+)$/, '<span>$1</span>');
        return `<div class="stat"><span class="stat-number">${num}</span><span class="stat-label">${s.label || ''}</span></div>`;
      })
      .join('');
  }

  if (data.photo && data.photo.asset && data.photo.asset._ref) {
    const photo = section.querySelector('.hero-photo');
    if (photo) photo.src = sanityImageUrl(data.photo.asset._ref, 800);
  }

  if (data.badgeText) {
    const textPath = section.querySelector('.rotating-text textPath');
    if (textPath) textPath.textContent = data.badgeText;
  }
}

function renderAbout(data) {
  if (!data) return;

  const section = document.querySelector('#about');

  const lead = section.querySelector('.about-text .lead');
  if (lead && data.lead) lead.textContent = data.lead;

  if (data.bodyParagraphs && data.bodyParagraphs.length) {
    const aboutText = section.querySelector('.about-text');
    // Remove existing body paragraphs (keep the lead)
    const existingPs = aboutText.querySelectorAll('p:not(.lead)');
    existingPs.forEach((p) => p.remove());
    // Add new ones
    data.bodyParagraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      aboutText.appendChild(p);
    });
  }

  if (data.education && data.education.length) {
    const eduGroup = section.querySelectorAll('.credential-group')[0];
    if (eduGroup) {
      const list = eduGroup.querySelector('.credential-list');
      list.innerHTML = data.education
        .map(
          (e) =>
            `<li><span class="cred-degree">${e.degree || ''}</span>${e.school ? `<span class="cred-school">${e.school}</span>` : ''}</li>`
        )
        .join('');
    }
  }

  if (data.certifications && data.certifications.length) {
    const certGroup = section.querySelectorAll('.credential-group')[1];
    if (certGroup) {
      const list = certGroup.querySelector('.credential-list');
      list.innerHTML = data.certifications
        .map((c) => `<li><span class="cred-degree">${c.title || ''}</span></li>`)
        .join('');
    }
  }
}

function renderResearch(data) {
  if (!data) return;

  const section = document.querySelector('#research');

  const intro = section.querySelector('.section-intro');
  if (intro && data.intro) intro.textContent = data.intro;

  if (data.areas && data.areas.length) {
    const grid = section.querySelector('.research-areas');
    grid.innerHTML = data.areas
      .map(
        (area) =>
          `<div class="research-card"><div class="research-icon">${area.icon || ''}</div><h3>${area.title || ''}</h3><p>${area.description || ''}</p></div>`
      )
      .join('');
  }
}

function renderPublications(data) {
  if (!data) return;

  const section = document.querySelector('#publications');

  const intro = section.querySelector('.section-intro');
  if (intro && data.intro) {
    const scholarLink = data.scholarUrl
      ? ` <a href="${data.scholarUrl}" target="_blank" rel="noopener">Full list on Google Scholar →</a>`
      : '';
    intro.innerHTML = data.intro + scholarLink;
  }

  if (data.items && data.items.length) {
    const list = section.querySelector('.pub-list');
    list.innerHTML = data.items
      .map(
        (pub) =>
          `<div class="pub-item"><span class="pub-year">${pub.year || ''}</span><div class="pub-details"><h4>${pub.title || ''}</h4><p class="pub-journal">${pub.journal || ''}</p></div></div>`
      )
      .join('');
  }

  if (data.scholarUrl) {
    const cta = section.querySelector('.pub-cta');
    if (cta) {
      cta.innerHTML = `<a href="${data.scholarUrl}" target="_blank" rel="noopener" class="btn btn-outline">${data.scholarButtonText || 'View All Publications on Google Scholar'}</a>`;
    }
  }
}

function renderCoaching(data) {
  if (!data) return;

  const section = document.querySelector('#coaching');

  if (data.cards && data.cards.length) {
    const grid = section.querySelector('.coaching-grid');
    grid.innerHTML = data.cards
      .map((card) => {
        const link = card.linkUrl
          ? `<a href="${card.linkUrl}" target="_blank" rel="noopener" class="link-arrow">${card.linkText || 'Learn more →'}</a>`
          : '';
        return `<div class="coaching-card"><h3>${card.title || ''}</h3><p>${card.description || ''}</p>${link}</div>`;
      })
      .join('');
  }
}

function renderSpeaking(data) {
  if (!data) return;

  const section = document.querySelector('#speaking');

  const intro = section.querySelector('.section-intro');
  if (intro && data.intro) intro.textContent = data.intro;

  if (data.events && data.events.length) {
    const list = section.querySelector('.speaking-list');
    list.innerHTML = data.events
      .map((evt) => {
        const link = evt.linkUrl
          ? `<a href="${evt.linkUrl}" target="_blank" rel="noopener" class="link-arrow">${evt.linkText || 'Learn more →'}</a>`
          : '';
        return `<div class="speaking-event"><div class="event-year">${evt.year || ''}</div><div class="event-details"><h3>${evt.title || ''}</h3><p>${evt.location || ''}</p><p>${evt.description || ''}</p>${link}</div></div>`;
      })
      .join('');
  }
}

function renderContact(data) {
  if (!data) return;

  const section = document.querySelector('#contact');

  const intro = section.querySelector('.section-intro');
  if (intro && data.intro) intro.textContent = data.intro;

  if (data.links && data.links.length) {
    const grid = section.querySelector('.contact-links');
    grid.innerHTML = data.links
      .map(
        (link) =>
          `<a href="${link.url || '#'}" target="_blank" rel="noopener" class="contact-card"><span class="contact-icon">${link.icon || ''}</span><span class="contact-label">${link.label || ''}</span><span class="contact-handle">${link.handle || ''}</span></a>`
      )
      .join('');
  }
}

// === LOAD CONTENT FROM SANITY ===
async function loadContent() {
  const query = `{
    "hero": *[_type == "hero"][0],
    "about": *[_type == "about"][0],
    "research": *[_type == "research"][0],
    "publications": *[_type == "publications"][0],
    "coaching": *[_type == "coaching"][0],
    "speaking": *[_type == "speaking"][0],
    "contact": *[_type == "contact"][0]
  }`;

  try {
    const data = await sanityQuery(query);
    renderHero(data.hero);
    renderAbout(data.about);
    renderResearch(data.research);
    renderPublications(data.publications);
    renderCoaching(data.coaching);
    renderSpeaking(data.speaking);
    renderContact(data.contact);
  } catch (err) {
    console.error('Failed to load content from Sanity:', err);
    // Fallback: hardcoded HTML stays visible
  }
}

loadContent();

// === NAVBAR & UI ===

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) => (l.style.color = ''));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#0a0a0a';
    }
  });
}, {threshold: 0.4});

sections.forEach((s) => observer.observe(s));
