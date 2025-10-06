// Inject header & footer (keeps HTML lean)
document.getElementById('header-container').innerHTML = `
  <header class="site-header">
    <div class="header-inner container">
      <a class="brand" href="./">WALABI</a>
      <nav class="nav">
        <a href="#themes-section">Themes</a>
        <a href="#services-section">Services</a>
        <a href="academy.html">Academy</a>
        <a class="btn btn-primary" href="https://outlook.office.com/book/WalabiIntake@wageningenur4.onmicrosoft.com/s/rhyxgdQc5UuhMlm9A3z4kg2" target="_blank">Book Consult</a>
      </nav>
    </div>
  </header>
`;

document.getElementById('footer-container').innerHTML = `
  <footer class="site-footer">
    <div class="footer-inner container">
      <p>© WALABI — Wageningen Lab for Agri-Food Business Informatics</p>
      <nav><a href="#themes-section">Themes</a> · <a href="#services-section">Services</a> · <a href="academy.html">Academy</a></nav>
    </div>
  </footer>
`;

// Language switch (simple show/hide)
window.switchLanguage = function(lang){
  const buttons = document.querySelectorAll('.language-switch button');
  buttons.forEach(b=>b.classList.remove('active'));
  document.querySelector(`.language-switch button[onclick="switchLanguage('${lang}')"]`).classList.add('active');

  const ids = [
    'about-title','about-text','academy-link-text',
    'booking-content','themes-title',
    'theme1-title','theme1-text',
    'theme2-title','theme2-text',
    'theme3-title','theme3-text',
    'theme4-title','theme4-text',
    'theme5-title','theme5-text',
    'services-title',
    'service1-title','service1-desc','service1-for','service1-for-text','service1-contact',
    'service2-title','service2-desc','service2-for','service2-for-text','service2-contact',
    'service3-title','service3-desc','service3-for','service3-for-text','service3-contact',
    'service4-title','service4-desc','service4-for','service4-for-text','service4-contact',
    'track-record-title','track-record-intro'
  ];
  ids.forEach(base=>{
    const en = document.getElementById(`${base}-en`);
    const nl = document.getElementById(`${base}-nl`);
    if(!en || !nl) return;
    if(lang==='en'){ en.classList.remove('hidden'); nl.classList.add('hidden'); }
    else { nl.classList.remove('hidden'); en.classList.add('hidden'); }
  });
};

// Services dots (just visual state for now)
(function initDots(){
  const grid = document.getElementById('services-grid');
  if(!grid) return;
  const cards = grid.querySelectorAll('.service-card');
  const dotsWrap = document.getElementById('services-dots');
  if(!dotsWrap) return;

  cards.forEach((_, i)=>{
    const d = document.createElement('span');
    d.className = 'dot' + (i===0 ? ' active':'');
    dotsWrap.appendChild(d);
  });

  let idx = 0;
  const dots = dotsWrap.querySelectorAll('.dot');
  const setActive = (i)=>{
    dots[idx].classList.remove('active');
    idx = i;
    dots[idx].classList.add('active');
    // Scroll into view (mobile)
    cards[idx].scrollIntoView({behavior:'smooth', block:'nearest', inline:'nearest'});
  };

  document.getElementById('services-prev-btn').onclick = ()=> setActive((idx - 1 + dots.length) % dots.length);
  document.getElementById('services-next-btn').onclick = ()=> setActive((idx + 1) % dots.length);
})();
