/* ============================================================================
   app.js — the machinery. You should never need to open this file.

   It reads everything from content.js and draws the page.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------- helpers -- */
  const $  = (s, r) => (r || document).querySelector(s);
  const el = (id) => document.getElementById(id);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // "2025-06" -> 2025.416 ; "now" -> today
  function yf(v) {
    if (v === "now" || v === "present") {
      const d = new Date();
      return d.getFullYear() + d.getMonth() / 12;
    }
    const m = String(v).match(/^(\d{4})(?:-(\d{1,2}))?/);
    if (!m) return 0;
    return +m[1] + (m[2] ? (+m[2] - 1) / 12 : 0);
  }

  /* ============================================================ TIMING === */
  /* Draws the diagram at the top of the homepage from SITE.timeline.        */

  function timingSVG(tl) {
    const chans = tl.channels || [];
    if (!chans.length) return "";

    const W = 1000, GUT = 112, PAD_R = 26, TOP = 30, ROW = 62, AXIS = 34;
    const X0 = GUT + 6, X1 = W - PAD_R;
    const H = TOP + chans.length * ROW + AXIS;

    const y0 = tl.startYear, y1 = tl.endYear;
    const span = Math.max(y1 - y0, 0.5);
    const px = (y) => X0 + ((Math.min(Math.max(y, y0), y1) - y0) / span) * (X1 - X0);

    let grid = "", traces = "", labels = "", axis = "";

    // vertical year graticule
    for (let y = y0; y <= y1; y++) {
      const x = px(y);
      grid += `<line class="grid-line" x1="${x}" y1="${TOP - 8}" x2="${x}" y2="${TOP + chans.length * ROW}"/>`;
      axis += `<text class="axis-txt" x="${x}" y="${H - 12}" text-anchor="middle">${y}</text>`;
    }
    axis += `<line class="grid-line" x1="${X0}" y1="${TOP + chans.length * ROW}" x2="${X1}" y2="${TOP + chans.length * ROW}"/>`;

    chans.forEach((ch, i) => {
      const col = `var(--ch${(i % 6) + 1})`;
      const rowTop = TOP + i * ROW;
      const yHi = rowTop + 16, yLo = rowTop + 40;

      // channel name + swatch in the left gutter
      labels +=
        `<rect x="16" y="${rowTop + 25}" width="8" height="8" rx="1" fill="${col}"/>` +
        `<text class="chan-txt" x="32" y="${rowTop + 33}" fill="${col}">${esc(ch.name)}</text>`;

      const segs = (ch.segments || [])
        .map((s) => ({ a: px(yf(s.start)), b: px(yf(s.end)), label: s.label }))
        .filter((s) => s.b > s.a)
        .sort((s, t) => s.a - t.a);

      // merge overlapping segments so the waveform stays a clean square pulse
      const pulses = [];
      segs.forEach((s) => {
        const last = pulses[pulses.length - 1];
        if (last && s.a <= last.b + 0.5) last.b = Math.max(last.b, s.b);
        else pulses.push({ a: s.a, b: s.b });
      });

      let d = `M ${X0} ${yLo}`;
      pulses.forEach((s) => {
        d += ` L ${s.a} ${yLo} L ${s.a} ${yHi} L ${s.b} ${yHi} L ${s.b} ${yLo}`;
        traces += `<rect x="${s.a}" y="${yHi}" width="${s.b - s.a}" height="${yLo - yHi}" fill="${col}" opacity=".07"/>`;
      });
      d += ` L ${X1} ${yLo}`;
      traces += `<path class="trace" d="${d}" stroke="${col}"/>`;

      // captions, stacked upward whenever two would sit on top of each other
      const lanes = [[], []];
      segs.forEach((s) => {
        const wide = String(s.label).length * 5.7;
        let x = s.a + 6, anchor = "start";
        if (x + wide > X1) { x = s.b - 4; anchor = "end"; }
        const l = anchor === "start" ? x : x - wide;
        const r = l + wide;

        let lane = lanes.findIndex((used) => used.every((u) => r < u[0] - 8 || l > u[1] + 8));
        if (lane < 0) lane = 0;
        lanes[lane].push([l, r]);

        labels += `<text class="seg-txt" x="${x}" y="${yHi - 6 - lane * 12}" text-anchor="${anchor}" fill="${col}" opacity=".92">${esc(s.label)}</text>`;
      });
    });

    // "now" cursor
    const nowX = px(yf("now"));
    const cursor =
      `<line x1="${nowX}" y1="${TOP - 10}" x2="${nowX}" y2="${TOP + chans.length * ROW + 4}" stroke="#8FA3A8" stroke-width="1" stroke-dasharray="3 4" opacity=".65"/>` +
      `<text class="axis-txt" x="${nowX}" y="${TOP - 14}" text-anchor="middle" fill="#8FA3A8">NOW</text>`;

    const sweepDist = X1 - X0;

    return `
<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of education, research and projects from ${y0} to ${y1}" xmlns="http://www.w3.org/2000/svg">
  <style>
    #sweepRect { transform-box: fill-box; transform-origin: left center; animation: tdSweep 1.15s cubic-bezier(.35,0,.2,1) both; }
    #sweepBar  { animation: tdBar 1.3s cubic-bezier(.35,0,.2,1) both; }
    @keyframes tdSweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes tdBar { 0% { transform: translateX(0); opacity: .9; } 88% { opacity: .9; } 100% { transform: translateX(${sweepDist}px); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      #sweepRect { animation: none; transform: none; }
      #sweepBar  { display: none; }
    }
  </style>
  <defs><clipPath id="tdClip"><rect id="sweepRect" x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>
  ${grid}
  ${axis}
  ${labels}
  <g clip-path="url(#tdClip)">${traces}${cursor}</g>
  <line id="sweepBar" x1="${X0}" y1="${TOP - 10}" x2="${X0}" y2="${TOP + chans.length * ROW + 4}" stroke="#DDF3F6" stroke-width="1.5" opacity=".9"/>
</svg>`;
  }

  /* ============================================================== HOME === */

  function linkRow(links) {
    const out = [];
    if (links.email)    out.push(`<a class="btn btn-solid" href="mailto:${esc(links.email)}">Email me</a>`);
    if (links.resume)   out.push(`<a class="btn" href="${esc(links.resume)}" target="_blank" rel="noopener">Résumé (PDF)</a>`);
    if (links.github)   out.push(`<a class="btn" href="${esc(links.github)}" target="_blank" rel="noopener">GitHub</a>`);
    if (links.linkedin) out.push(`<a class="btn" href="${esc(links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    return out.join("");
  }

  /* =========================================================== PROJECT === */

  function block(b) {
    if (b.h)    return `<h2>${esc(b.h)}</h2>`;
    if (b.p)    return `<p>${esc(b.p)}</p>`;
    if (b.list) return `<ul>${b.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    if (b.img)  return `<figure><img src="${esc(b.img)}" alt="${esc(b.alt || b.caption || "")}" loading="lazy">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
    if (b.code) return `<pre><code>${esc(b.code)}</code></pre>`;
    if (b.note) return `<div class="p-note">${esc(b.note)}</div>`;
    return "";
  }

  function renderProject() {
    const S = SITE;
    el("mkInit").textContent = S.profile.initials;
    el("mkName").textContent = S.profile.name;
    if(el("mkRole")) el("mkRole").textContent = S.profile.role;

    const id = new URLSearchParams(location.search).get("id");
    const p  = S.projects.find((x) => x.id === id && x.published !== false && x.detail);

    if (!p) {
      el("pMain").innerHTML =
        `<div class="p-head"><h1>Project not found</h1>
         <p class="sub">There's nothing filed under “${esc(id || "")}”.</p>
         <a class="btn" href="projects.html">Back to all projects</a></div>`;
      return;
    }

    document.title = `${p.title} — ${S.profile.name}`;
    const md = $('meta[name="description"]');
    if (md) md.setAttribute("content", p.blurb);

    const specs = [
      ["Period", p.period],
      ["Status", p.status],
      ["Built with", (p.tags || []).slice(0, 3).join(", ")],
    ];

    el("pMain").innerHTML = `
      <div class="p-head">
        <div class="eyebrow">Project</div>
        <h1>${esc(p.title)}</h1>
        ${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ""}
        ${(p.links || []).filter(l => !l.hidden).length ? `<div class="proj-links" style="margin-bottom:1.4rem">${p.links.filter(l => !l.hidden).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        <dl class="p-spec">${specs.map((s) => `<div><dt>${esc(s[0])}</dt><dd>${esc(s[1])}</dd></div>`).join("")}</dl>
      </div>
      ${p.image ? `<figure style="margin:0 0 2rem"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" style="border:1px solid var(--rule);border-radius:3px"></figure>` : ""}
      <div class="p-body">
        <p style="font-size:1.06rem;color:var(--ink)">${esc(p.blurb)}</p>
        ${(p.blocks || []).map(block).join("")}
        <div class="tags" style="margin-top:2rem">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>`;

    const others = S.projects.filter((x) => x.id !== p.id && x.detail && x.published !== false).slice(0, 3);
    el("pMore").innerHTML = others.length
      ? `<div class="eyebrow" style="margin-bottom:1rem">Other projects</div>
         <div class="edu-grid">${others.map((o) => `<a class="card" href="project.html?id=${encodeURIComponent(o.id)}" style="text-decoration:none;color:inherit;display:block">
            <div class="eyebrow">${esc(o.period)}</div><h3>${esc(o.title)}</h3>
            <p class="deg">${esc(o.subtitle || "")}</p></a>`).join("")}</div>`
      : "";

    el("year").textContent = new Date().getFullYear();
    el("footName").textContent = S.profile.name;
    reveal();
  }


  function renderSite() {
    const S=SITE, P=S.profile, page=document.body.dataset.page;
    const put=(id,value)=>{if(el(id))el(id).textContent=value||''};
    put('mkInit',P.initials);put('mkName',P.name);put('footName',P.name);put('year',new Date().getFullYear());put('footNote',S.footer.note);
    put('contactCopy',P.contactText || "I'm looking for a computer engineering role in FPGA, embedded systems, firmware, or hardware-adjacent software. I'd like to hear what you're building.");
    el('actions2').innerHTML=linkRow(S.links);
    el('contactList').innerHTML='<div><span>Based in</span>'+esc(P.location)+'</div>'+(S.links.phone?'<div><span>Phone</span><a href="tel:'+esc(S.links.phone.replace(/[^\d+]/g,''))+'">'+esc(S.links.phone)+'</a></div>':'');
    document.querySelectorAll('#siteNav a').forEach(a=>{if(a.getAttribute('href')===page+'.html'){a.classList.add('on');a.setAttribute('aria-current','page')}});
    const menu=el('menuToggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);el('siteNav').classList.toggle('is-open',open)});
    el('siteNav').addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');el('siteNav').classList.remove('is-open')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');el('siteNav').classList.remove('is-open')}});
    if(page==='project'){renderProject();return}
    if(page==='index') {
      document.title=P.name+' — '+P.role;
      put('heroName',P.name);put('heroTag',P.tagline);put('heroSub',P.subline);put('heroEyebrow',P.role+' · '+P.location);
      put('led',P.statusText);el('led').dataset.status=P.status||'off';
      el('actions').innerHTML='<a class="btn btn-solid" href="projects.html">View projects →</a>'+(S.links.resume?'<a class="btn" href="'+esc(S.links.resume)+'">Résumé (PDF)</a>':'');
    }
    if(page==='index'||page==='projects') {
      const projects=S.projects.filter(p=>p.published!==false && (page!=='index'||p.featured));
      el('projList').innerHTML=(page==='index'?projects.slice(0,2):projects).map(p=>{
        const href=p.detail?'project.html?id='+encodeURIComponent(p.id):'';
        return '<article class="project-card">'+(p.image?'<div class="project-image"><img src="'+esc(p.image)+'" alt="'+esc(p.imageAlt||p.title)+'" loading="lazy" width="720" height="400"></div>':'')+'<div class="project-card-copy"><p class="eyebrow">'+esc(p.status)+' · '+esc(p.period)+'</p><h2>'+(href?'<a href="'+href+'">'+esc(p.title)+'</a>':esc(p.title))+'</h2><p>'+esc(p.summary||p.blurb)+'</p><div class="tags">'+(p.tags||[]).slice(0,4).map(t=>'<span>'+esc(t)+'</span>').join('')+'</div><div class="proj-links">'+(href?'<a href="'+href+'">Explore project →</a>':'')+(p.links||[]).filter(l=>!l.hidden).map(l=>'<a href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+' ↗</a>').join('')+'</div></div></article>';
      }).join('')||'<p>More projects coming soon.</p>';
    }
    if(page==='about') {
      el('aboutCopy').innerHTML=S.about.map(p=>'<p>'+esc(p)+'</p>').join('');
      el('facts').innerHTML=S.facts.map(f=>'<div><dt>'+esc(f.k)+'</dt><dd>'+esc(f.v)+'</dd></div>').join('');
      el('display').innerHTML=timingSVG(S.timeline);put('dispRange',S.timeline.startYear+' – '+S.timeline.endYear);
      el('legend').innerHTML=S.timeline.channels.map(c=>'<span>'+esc(c.name)+'</span>').join('');
      el('mobileTimeline').innerHTML=S.timeline.channels.map(c=>'<div><h3>'+esc(c.name)+'</h3>'+c.segments.map(s=>'<p><b>'+esc(s.label)+'</b><br><span>'+esc(s.start)+' → '+esc(s.end==='now'?'Present':s.end)+'</span></p>').join('')+'</div>').join('');
      el('expList').innerHTML=S.experience.map(x=>'<article class="xp"><div class="xp-when">'+esc(x.period)+'<br>'+esc(x.place)+'</div><div><h3>'+esc(x.role)+'</h3><p class="org">'+esc(x.org)+'</p><ul>'+x.points.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul></div></article>').join('');
      el('eduList').innerHTML=S.education.map(e=>'<div class="card"><p class="eyebrow">'+esc(e.period)+'</p><h3>'+esc(e.school)+'</h3><p>'+esc(e.degree)+'</p><p class="meta">'+esc(e.place)+'<br>'+esc(e.detail)+'</p></div>').join('');
      el('courseList').innerHTML=S.coursework.map(c=>'<span>'+esc(c)+'</span>').join('');
      el('skillList').innerHTML=S.skills.map(g=>'<div><h3>'+esc(g.group)+'</h3><div class="tags">'+g.items.map(i=>'<span>'+esc(i)+'</span>').join('')+'</div></div>').join('');
      el('awardList').innerHTML=S.awards.map(a=>'<div class="award"><span class="yr">'+esc(a.year)+'</span><div><b>'+esc(a.title)+'</b><i>'+esc(a.org)+'</i></div></div>').join('');
      el('nextList').innerHTML=S.next.map(n=>'<div class="card"><span class="when">'+esc(n.when)+'</span><h3>'+esc(n.title)+'</h3><p>'+esc(n.body)+'</p></div>').join('');
    }
  }
  /* ============================================================== misc === */

  function reveal() {
    const items = document.querySelectorAll(".sec");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach((n) => { n.classList.add("rise"); io.observe(n); });
  }

  /* ------------------------------------------------------------- start --- */
  function boot() {
    if (typeof SITE === "undefined") {
      document.body.innerHTML =
        '<pre style="padding:2rem;font-family:monospace">content.js did not load or has a syntax error.' +
        '\n\nOpen this page, press F12, click the Console tab — it will point at the line.</pre>';
      return;
    }
    try {
      renderSite();
    } catch (err) {
      console.error(err);
      document.body.insertAdjacentHTML("afterbegin",
        `<pre style="padding:1rem;background:#FFE9E9;font-family:monospace;white-space:pre-wrap">Something in content.js is malformed:\n${esc(err.message)}</pre>`);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ---------------------------------------------------------- theme toggle -- */
(function () {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  function apply(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    btn.textContent = dark ? "☀" : "☾";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  var saved; try { saved = localStorage.getItem("theme"); } catch(e) {}
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved === "dark" || (saved == null && prefersDark));

  btn.addEventListener("click", function () {
    var nowDark = document.documentElement.getAttribute("data-theme") !== "dark";
    try { localStorage.setItem("theme", nowDark ? "dark" : "light"); } catch(e) {}
    apply(nowDark);
  });
})();
