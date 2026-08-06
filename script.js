"use strict";

/* ==========================================================================
   Amit Khatri Chhetri — Portfolio Scripts
   All interactivity: theme toggle, nav, reveal animations, typing effects,
   skill tabs, and the contact form.
   ========================================================================== */

/* ---------- Preloader ---------- */
  window.addEventListener('load', function(){
    var pl = document.getElementById('preloader');
    setTimeout(function(){ pl.classList.add('hide'); }, 350);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Theme toggle (persists via localStorage when available) ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var iconSun = document.getElementById('iconSun');
  var iconMoon = document.getElementById('iconMoon');

  function safeGet(key){ try{ return localStorage.getItem(key); }catch(e){ return null; } }
  function safeSet(key,val){ try{ localStorage.setItem(key,val); }catch(e){ /* sandboxed preview: ignore */ } }

  function applyTheme(mode){
    if(mode === 'dark'){
      root.classList.add('dark');
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
      themeBtn.setAttribute('aria-pressed','true');
    } else {
      root.classList.remove('dark');
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
      themeBtn.setAttribute('aria-pressed','false');
    }
  }

  var saved = safeGet('amit-portfolio-theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  themeBtn.addEventListener('click', function(){
    var next = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    safeSet('amit-portfolio-theme', next);
  });

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); });
  });

  /* ---------- Sticky nav background + scroll-top button ---------- */
  var nav = document.getElementById('siteNav');
  var scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function(){
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 12);
    scrollTopBtn.classList.toggle('show', y > 480);
  }, { passive:true });
  scrollTopBtn.addEventListener('click', function(){
    window.scrollTo({ top:0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });

  /* ---------- Active section highlighting ---------- */
  var sections = ['home','about','skills','projects','github','education','contact']
    .map(function(id){ return document.getElementById(id); }).filter(Boolean);
  var navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll('a'));

  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.id;
        navAnchors.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function(s){ navObserver.observe(s); });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function(el){ revealObserver.observe(el); });

  /* ---------- Skill tabs ---------- */
  var tabs = document.querySelectorAll('.skill-tab');
  var panels = document.querySelectorAll('.skill-panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected','true');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  /* ---------- Hero rotating role typewriter ---------- */
  var roles = ['BSc.CSIT Student', 'React Enthusiast', 'Problem Solver', 'Internship Seeker'];
  var roleEl = document.getElementById('typedRole');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    roleEl.textContent = roles[0];
  } else {
    (function typeLoop(){
      var ri = 0;
      function cycle(){
        var word = roles[ri % roles.length];
        var i = 0;
        var typing = setInterval(function(){
          roleEl.textContent = word.slice(0, i+1);
          i++;
          if(i === word.length){
            clearInterval(typing);
            setTimeout(erase, 1400);
          }
        }, 55);
        function erase(){
          var erasing = setInterval(function(){
            word = word.slice(0, -1);
            roleEl.textContent = word;
            if(word.length === 0){
              clearInterval(erasing);
              ri++;
              setTimeout(cycle, 300);
            }
          }, 30);
        }
      }
      cycle();
    })();
  }

  /* ---------- Terminal code typing animation ---------- */
  var codeLines = [
    { html: '<span class="tk-kw">const</span> <span class="tk-key">developer</span> <span class="tk-punc">=</span> <span class="tk-punc">{</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">name</span><span class="tk-punc">:</span> <span class="tk-str">"Amit Khatri Chhetri"</span><span class="tk-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">role</span><span class="tk-punc">:</span> <span class="tk-str">"Aspiring Web Developer"</span><span class="tk-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">education</span><span class="tk-punc">:</span> <span class="tk-str">"BSc.CSIT, 8th Semester"</span><span class="tk-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">stack</span><span class="tk-punc">:</span> <span class="tk-punc">[</span><span class="tk-str">"React"</span><span class="tk-punc">,</span> <span class="tk-str">"JavaScript"</span><span class="tk-punc">,</span> <span class="tk-str">"PHP"</span><span class="tk-punc">,</span> <span class="tk-str">"Python"</span><span class="tk-punc">],</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">lookingFor</span><span class="tk-punc">:</span> <span class="tk-str">"Web Development Internship"</span><span class="tk-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tk-key">availability</span><span class="tk-punc">:</span> <span class="tk-str">"Immediate"</span>' },
    { html: '<span class="tk-punc">};</span>' }
  ];
  var termEl = document.getElementById('typedCode');

  function renderStaticCode(){
    termEl.innerHTML = codeLines.map(function(l, i){
      return '<div><span class="ln">' + (i+1) + '</span>' + l.html + '</div>';
    }).join('');
  }

  if(reduceMotion){
    renderStaticCode();
  } else {
    var lineIdx = 0;
    function typeNextLine(){
      if(lineIdx >= codeLines.length) return;
      var div = document.createElement('div');
      div.innerHTML = '<span class="ln">' + (lineIdx+1) + '</span><span class="line-content"></span><span class="type-cursor"></span>';
      termEl.appendChild(div);
      var target = codeLines[lineIdx].html;
      var contentSpan = div.querySelector('.line-content');
      var cursor = div.querySelector('.type-cursor');
      // Type a plain-text approximation for smoothness, then swap in the styled HTML.
      var plain = target.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ');
      var i = 0;
      var t = setInterval(function(){
        contentSpan.textContent = plain.slice(0, i+1);
        i++;
        if(i === plain.length){
          clearInterval(t);
          div.innerHTML = '<span class="ln">' + (lineIdx+1) + '</span>' + target;
          lineIdx++;
          setTimeout(typeNextLine, 90);
        }
      }, 16);
    }
    var termObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          typeNextLine();
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    termObserver.observe(document.querySelector('.terminal'));
  }

  /* ---------- Contact form: opens mail client with prefilled content ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var subject = form.subject.value.trim() || 'Portfolio contact';
    var message = form.message.value.trim();

    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    var mailto = 'mailto:kcammit@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
    status.textContent = 'Opening your email client…';
  });
