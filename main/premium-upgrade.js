(function () {
  const courses = [
    { slug: "frontend-development", title: "Frontend Development", category: "Programming", students: "8.2K", lessons: 48, rating: "4.9", level: "Beginner", progress: 72, price: "Rs. 18,000" },
    { slug: "backend-development", title: "Backend Development", category: "Programming", students: "5.7K", lessons: 42, rating: "4.8", level: "Intermediate", progress: 58, price: "Rs. 22,000" },
    { slug: "full-stack-development", title: "Full Stack Development", category: "Programming", students: "7.4K", lessons: 72, rating: "4.9", level: "Career Track", progress: 64, price: "Rs. 36,000" },
    { slug: "ui-ux-design", title: "UI/UX Design", category: "Design", students: "4.9K", lessons: 32, rating: "4.7", level: "Beginner", progress: 44, price: "Rs. 16,000" },
    { slug: "python-programming", title: "Python Programming", category: "Programming", students: "6.3K", lessons: 40, rating: "4.8", level: "Beginner", progress: 51, price: "Rs. 17,000" },
    { slug: "ai-machine-learning", title: "AI & Machine Learning", category: "Data Science", students: "3.8K", lessons: 54, rating: "4.9", level: "Advanced", progress: 38, price: "Rs. 32,000" },
    { slug: "digital-marketing", title: "Digital Marketing", category: "Marketing", students: "5.1K", lessons: 30, rating: "4.7", level: "Beginner", progress: 49, price: "Rs. 15,000" },
    { slug: "mobile-app-development", title: "Mobile App Development", category: "App Development", students: "3.9K", lessons: 52, rating: "4.8", level: "Career Track", progress: 41, price: "Rs. 28,000" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const path = location.pathname.toLowerCase();
  const isHome = /main\.html$/.test(path) || /\/main\/?$/.test(path) || path.endsWith("/");

  function courseByTitle(title) {
    return courses.find((course) => course.title.toLowerCase() === String(title || "").trim().toLowerCase());
  }

  function loadPerformanceBasics() {
    document.documentElement.style.colorScheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    $$("img").forEach((img) => {
      img.loading = "lazy";
      img.decoding = "async";
    });
    setTimeout(() => document.body.classList.add("page-loaded"), 60);
    const nav = $("#navbar");
    if (nav) {
      const syncNav = () => nav.classList.toggle("scrolled", window.scrollY > 10);
      syncNav();
      window.addEventListener("scroll", syncNav, { passive: true });
    }
    const theme = $("#themeToggle");
    if (theme) {
      theme.setAttribute("aria-label", "Toggle theme");
      theme.setAttribute("title", "Toggle theme");
    }
  }

  function enhanceLanding() {
    if (!isHome || $(".trusted-strip")) return;
    const hero = $(".hero");
    const heroContent = $(".hero-content");
    if (heroContent) {
      const title = $("h1", heroContent);
      const copy = $("p", heroContent);
      if (title) title.textContent = "Launch your career with mentor-led tech courses.";
      if (copy) copy.textContent = "LearnX combines live classes, project reviews, AI guidance, career roadmaps, certificates, and a polished student dashboard for job-ready learning.";
    }
    if (hero && !$(".hero-product-preview", hero)) {
      const stats = $(".stats", heroContent);
      if (stats && stats.parentElement !== hero) hero.appendChild(stats);
      hero.insertAdjacentHTML("beforeend", `
        <aside class="hero-product-preview" aria-label="Learning dashboard preview">
          <div class="preview-top">
            <div><strong>Career Track Progress</strong><span>Frontend Development</span></div>
            <strong>72%</strong>
          </div>
          <div class="preview-meter"><span></span></div>
          <div class="preview-list">
            <div class="preview-row"><div><strong>Mentor review</strong><span>Portfolio homepage</span></div><b>Today</b></div>
            <div class="preview-row"><div><strong>AI roadmap</strong><span>Next skill: React state</span></div><b>Ready</b></div>
            <div class="preview-row"><div><strong>Certificate</strong><span>Frontend Basics</span></div><b>Unlocked</b></div>
          </div>
        </aside>
      `);
    }

    const main = $("main");
    if (!main) return;
    $(".hero").insertAdjacentHTML("afterend", `
      <section class="premium-band trusted-strip" aria-label="Trusted by learners">
        <strong>Trusted by ambitious learners and training teams</strong>
        <div class="trusted-logo">TechHub PK</div>
        <div class="trusted-logo">Startup Lab</div>
        <div class="trusted-logo">Code Guild</div>
        <div class="trusted-logo">Design Circle</div>
        <div class="trusted-logo">Career Sprint</div>
      </section>
    `);
    main.insertAdjacentHTML("beforeend", `
      <section class="section premium-reveal">
        <div class="section-head">
          <span class="eyebrow">Learning outcomes</span>
          <h2>Built around measurable student momentum</h2>
          <p>Every course moves students from lessons to shipped work, mentor feedback, and a certificate-ready final project.</p>
        </div>
        <div class="premium-grid">
          <article class="premium-card outcome-card"><strong>92%</strong><h3>Project completion focus</h3><p>Students complete guided milestones, portfolio tasks, quizzes, and a capstone project.</p></article>
          <article class="premium-card outcome-card"><strong>24h</strong><h3>Advisor response path</h3><p>Course guidance, enrollment follow-up, and roadmap suggestions are shaped around clear next steps.</p></article>
          <article class="premium-card outcome-card"><strong>8</strong><h3>Career-ready tracks</h3><p>Development, design, AI, marketing, and app courses cover practical market skills.</p></article>
        </div>
      </section>
      <section class="section alt premium-reveal">
        <div class="platform-preview">
          <article class="premium-card platform-panel">
            <span class="eyebrow">Student workspace</span>
            <h2>One dashboard for courses, progress, mentor tasks, and certificates</h2>
            <p>Students can track active courses, learning streaks, assignments, upcoming classes, and certificate status without losing context.</p>
            <div class="roadmap-stack">
              <div class="roadmap-item"><b>Week 1</b><span>Foundations</span></div>
              <div class="roadmap-item"><b>Week 4</b><span>Portfolio sprint</span></div>
              <div class="roadmap-item"><b>Week 8</b><span>Mentor review</span></div>
            </div>
          </article>
          <div class="premium-grid" style="grid-template-columns:1fr;">
            <article class="premium-card"><h3>Instructor highlights</h3><p>Senior mentors, project reviews, weekly guidance, and practical feedback cycles.</p></article>
            <article class="premium-card"><h3>Career support</h3><p>Roadmaps, portfolio direction, freelancing readiness, and certificate presentation.</p></article>
            <article class="premium-card"><h3>Premium learning flow</h3><p>Searchable courses, saved courses, compare tools, learning player, and dashboard analytics.</p></article>
          </div>
        </div>
      </section>
      <section class="section premium-reveal">
        <div class="section-head">
          <span class="eyebrow">Plans</span>
          <h2>Flexible plans for serious learners</h2>
          <p>Start with recorded learning or move into mentor-led project review when you need stronger guidance.</p>
        </div>
        <div class="pricing-grid">
          <article><h3>Starter</h3><strong>Rs. 15,000+</strong><p>Recorded lessons, assignments, quizzes, and certificate preview.</p><a class="btn ghost" href="pricing.html">View pricing</a></article>
          <article class="featured"><h3>Mentor Pro</h3><strong>Rs. 22,000+</strong><p>Live classes, mentor reviews, projects, progress tracking, and certificate support.</p><a class="btn" href="enroll.html">Enroll now</a></article>
          <article><h3>Career Sprint</h3><strong>Rs. 36,000+</strong><p>1-on-1 guidance, portfolio review, career roadmap, and capstone feedback.</p><a class="btn ghost" href="advisor.html">Ask advisor</a></article>
        </div>
      </section>
      <section class="section alt premium-reveal">
        <div class="section-head">
          <span class="eyebrow">FAQ</span>
          <h2>Everything students ask before enrolling</h2>
        </div>
        <div class="faq-mini">
          <details open><summary>Which course is best for beginners?</summary><p>Frontend Development, Python Programming, UI/UX Design, and Digital Marketing are strong beginner paths depending on your interest.</p></details>
          <details><summary>Do students get certificates?</summary><p>Yes. Students receive a course completion certificate after lessons, quizzes, and final project submission.</p></details>
          <details><summary>Can I get course guidance before enrolling?</summary><p>Yes. The AI Advisor can recommend a course and roadmap based on your goals.</p></details>
        </div>
      </section>
    `);
  }

  function enhanceCourses() {
    const grid = $("#coursesGrid");
    const filterWrap = $(".filters");
    if (filterWrap && !$(".course-tabs")) {
      filterWrap.insertAdjacentHTML("beforebegin", `
        <div class="course-tabs" aria-label="Course categories">
          ${["all", "Programming", "Design", "Data Science", "Marketing", "App Development"].map((cat) => `<button class="category-tab${cat === "all" ? " active" : ""}" data-category="${cat}">${cat === "all" ? "All" : cat}</button>`).join("")}
        </div>
        <p class="result-note" id="courseResultNote">Showing all career tracks</p>
      `);
      $$(".category-tab").forEach((button) => {
        button.addEventListener("click", () => {
          $$(".category-tab").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          const select = $("#categoryFilter");
          if (select) {
            select.value = button.dataset.category;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
          const note = $("#courseResultNote");
          if (note) note.textContent = button.dataset.category === "all" ? "Showing all career tracks" : `Showing ${button.dataset.category} tracks`;
        });
      });
    }

    $$(".course-card").forEach((card) => {
      if (card.dataset.premiumEnhanced) return;
      const title = $("h3", card)?.textContent;
      const course = courseByTitle(title);
      if (!course) return;
      card.dataset.premiumEnhanced = "true";
      const body = $(".card-body", card);
      if (!body) return;
      body.insertAdjacentHTML("afterbegin", `<div class="premium-course-row"><span>${course.rating} rating</span><span>${course.students} students</span><span>${course.lessons} lessons</span></div>`);
      const cta = $(".btn", body);
      if (cta) {
        cta.insertAdjacentHTML("beforebegin", `<div class="course-progress-mini" aria-label="Course completion estimate"><span style="width:${course.progress}%"></span></div>`);
      }
      const saveButton = $(".save-course-btn", body);
      if (saveButton) {
        saveButton.setAttribute("aria-label", `Save ${course.title}`);
        saveButton.textContent = saveButton.textContent.toLowerCase().includes("saved") ? "Saved" : "Save course";
      }
    });
  }

  function enhanceAdvisorLayout() {
    const chatBox = $(".chat-box");
    if (!chatBox || $(".advisor-layout")) return;
    const section = chatBox.closest(".section");
    if (section) section.classList.add("advisor-section");
    chatBox.insertAdjacentHTML("afterbegin", `
      <div class="chat-header">
        <div class="advisor-topline"><div><strong>LearnX AI Advisor</strong><p>Personalized course matching and roadmap guidance</p></div><span class="ai-status">online</span></div>
      </div>
    `);
    chatBox.insertAdjacentHTML("beforebegin", `
      <div class="advisor-layout">
        <aside class="advisor-side">
          <span class="eyebrow">Smart guidance</span>
          <h3>Tell the advisor your goal</h3>
          <p>Choose a quick prompt or type your own question about fees, roadmap, skills, freelancing, AI, design, or coding.</p>
          <div class="advisor-chips">
            <button class="advisor-chip" data-prompt="I am a beginner and want a job-ready tech path">Beginner path</button>
            <button class="advisor-chip" data-prompt="I want freelancing skills with fast earning potential">Freelancing</button>
            <button class="advisor-chip" data-prompt="Create a 90 day roadmap for AI and Python">AI roadmap</button>
            <button class="advisor-chip" data-prompt="Which course is best for design and no coding">No-code design</button>
          </div>
          <div class="advisor-signal">
            <div>Matches goals to courses</div>
            <div>Builds learning roadmaps</div>
            <div>Suggests next actions</div>
          </div>
        </aside>
      </div>
    `);
    $(".advisor-layout").appendChild(chatBox);
    $$(".advisor-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const input = $("#advisorInput");
        const form = $("#advisorForm");
        if (!input || !form) return;
        input.value = chip.dataset.prompt;
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
    });
  }

  function enhanceDashboard() {
    const panels = $(".dashboard-panels");
    if (!panels || $(".analytics-card")) return;
    panels.insertAdjacentHTML("afterbegin", `
      <section class="panel analytics-card">
        <div class="panel-head"><h3>Progress Analytics</h3><a href="learning.html">Continue</a></div>
        <div class="analytics-row"><span>Lessons</span><div class="analytics-bar"><i style="width:78%"></i></div><strong>78%</strong></div>
        <div class="analytics-row"><span>Projects</span><div class="analytics-bar"><i style="width:61%"></i></div><strong>61%</strong></div>
        <div class="analytics-row"><span>Quizzes</span><div class="analytics-bar"><i style="width:86%"></i></div><strong>86%</strong></div>
      </section>
    `);
    panels.insertAdjacentHTML("beforeend", `
      <section class="panel">
        <div class="panel-head"><h3>Notifications</h3></div>
        <div class="notification-list">
          <div class="notification-item"><div><strong>Mentor feedback posted</strong><span>Portfolio homepage review is ready.</span></div><b>New</b></div>
          <div class="notification-item"><div><strong>Class reminder</strong><span>React components session starts tonight.</span></div><b>7 PM</b></div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><h3>Achievements</h3></div>
        <div class="achievement-list">
          <div class="achievement-pill">7 day learning streak</div>
          <div class="achievement-pill">First project submitted</div>
          <div class="achievement-pill">Quiz master badge</div>
        </div>
      </section>
    `);
  }

  function enhanceAuth() {
    const form = $(".form-card.auth");
    if (!form || $(".auth-shell")) return;
    const section = form.closest(".section");
    if (section) section.classList.add("auth-section");
    const isSignup = path.includes("signup");
    form.insertAdjacentHTML("afterbegin", `
      <div class="social-auth">
        <button type="button">Google</button>
        <button type="button">GitHub</button>
      </div>
    `);
    const password = $("input[type='password']", form);
    if (password) {
      password.insertAdjacentHTML("afterend", `<div class="password-meter"><span></span></div><p class="auth-hint">Use at least 8 characters with letters and numbers.</p>`);
      password.addEventListener("input", () => {
        const score = Math.min(100, password.value.length * 12 + (/\d/.test(password.value) ? 16 : 0) + (/[A-Z]/.test(password.value) ? 16 : 0));
        const bar = $(".password-meter span", form);
        if (bar) {
          bar.style.width = `${Math.max(score, 20)}%`;
          bar.style.background = score > 70 ? "var(--accent-2)" : score > 42 ? "#f59e0b" : "var(--accent-3)";
        }
      });
    }
    form.insertAdjacentHTML("beforeend", `
      ${isSignup ? `<div class="otp-row show"><input inputmode="numeric" maxlength="6" placeholder="OTP code"><button type="button">Verify</button></div>` : `<a class="forgot-link" href="#">Forgot password?</a>`}
    `);
    const shell = document.createElement("div");
    shell.className = "auth-shell";
    form.parentNode.insertBefore(shell, form);
    shell.insertAdjacentHTML("beforeend", `
      <aside class="auth-panel">
        <span class="eyebrow">Secure student access</span>
        <h2>${isSignup ? "Start your LearnX journey" : "Welcome back to LearnX"}</h2>
        <p>Manage courses, progress, mentor feedback, certificates, and saved tracks from one polished workspace.</p>
        <div class="auth-proof">
          <div><strong>Portfolio projects</strong><p>Build work you can show.</p></div>
          <div><strong>Mentor feedback</strong><p>Improve with practical review.</p></div>
          <div><strong>Certificate flow</strong><p>Track completion and preview certificates.</p></div>
        </div>
      </aside>
    `);
    shell.appendChild(form);
  }

  function enhanceCourseDetail() {
    const hero = $(".course-hero");
    const detail = $(".detail-layout");
    if (!hero || !detail || $(".course-intel")) return;
    const title = $("h1", hero)?.textContent || "LearnX Course";
    const course = courseByTitle(title) || courses[0];
    detail.insertAdjacentHTML("afterend", `
      <div class="course-intel">
        <div class="premium-grid">
          <article class="premium-card video-preview-card"><div><div class="play-button">PLAY</div><p style="color:rgba(255,255,255,.78);margin-top:1rem;">Preview the LMS lesson experience</p></div></article>
          <article class="premium-card"><h3>Learning outcomes</h3><div class="course-value-row"><span>${course.lessons} lessons</span><span>${course.students} students</span></div><p>Build weekly tasks, complete a capstone, receive mentor feedback, and prepare a portfolio-ready project.</p></article>
          <article class="premium-card"><h3>Student reviews</h3><div class="review-stars">*****</div><p>"The course felt practical, organized, and easy to follow. Project feedback helped me improve fast."</p></article>
        </div>
        <div class="faq-mini" style="margin-top:1.2rem;">
          <details open><summary>Does this course include a certificate?</summary><p>Yes. The certificate unlocks after lessons, quizzes, and final project completion.</p></details>
          <details><summary>Is mentor support included?</summary><p>Students receive project review guidance and practical feedback during the course.</p></details>
          <details><summary>Can I enroll from this page?</summary><p>Yes. Use the enroll button above to submit your course request.</p></details>
        </div>
      </div>
    `);
  }

  function enhancePricing() {
    const pricing = $(".pricing-grid");
    if (!pricing || pricing.dataset.premiumPricing) return;
    pricing.dataset.premiumPricing = "true";
    $$("article", pricing).forEach((card, index) => {
      const features = [
        ["Recorded library", "Assignments", "Certificate preview"],
        ["Live classes", "Mentor review", "Project tracking"],
        ["1-on-1 roadmap", "Portfolio review", "Career support"]
      ][index] || [];
      card.insertAdjacentHTML("beforeend", `<div class="premium-course-row">${features.map((item) => `<span>${item}</span>`).join("")}</div>`);
    });
  }

  function run() {
    loadPerformanceBasics();
    enhanceLanding();
    enhanceCourses();
    enhanceAdvisorLayout();
    enhanceDashboard();
    enhanceAuth();
    enhanceCourseDetail();
    enhancePricing();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
