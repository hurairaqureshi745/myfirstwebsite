(function () {
  const form = document.getElementById("advisorForm");
  const input = document.getElementById("advisorInput");
  const box = document.getElementById("chatMessages");

  if (!form || !input || !box) return;

  const courses = [
    {
      slug: "frontend-development",
      title: "Frontend Development",
      instructor: "Muzna Amir",
      level: "Beginner to Advanced",
      duration: "3 Months",
      price: "Rs. 18,000",
      keywords: ["frontend", "html", "css", "javascript", "js", "react", "website", "web design", "responsive", "ui coding"],
      outline: ["HTML5 structure", "CSS Flexbox and Grid", "JavaScript DOM", "Responsive design", "React basics", "Portfolio deployment"],
      bestFor: "students who want to build websites, landing pages, responsive layouts, and browser-based interfaces."
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      instructor: "Usman Haider",
      level: "Intermediate to Advanced",
      duration: "3 Months",
      price: "Rs. 22,000",
      keywords: ["backend", "node", "nodejs", "express", "api", "server", "database", "mongodb", "auth", "authentication"],
      outline: ["Node.js fundamentals", "Express APIs", "MongoDB CRUD", "Authentication", "Security basics", "Backend project"],
      bestFor: "students who already know basic coding and want to build APIs, servers, databases, and authentication systems."
    },
    {
      slug: "full-stack-development",
      title: "Full Stack Development",
      instructor: "Bilal Ahmed",
      level: "Beginner to Advanced",
      duration: "6 Months",
      price: "Rs. 36,000",
      keywords: ["full stack", "fullstack", "mern", "complete developer", "frontend and backend", "web app", "complete website"],
      outline: ["Frontend foundations", "React", "Node APIs", "Database design", "Authentication", "Full stack final product"],
      bestFor: "students who want a complete web development path from interface to backend logic."
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      instructor: "Sara Malik",
      level: "Beginner to Intermediate",
      duration: "2 Months",
      price: "Rs. 16,000",
      keywords: ["ui", "ux", "uiux", "figma", "design", "wireframe", "prototype", "user research", "app design", "visual"],
      outline: ["Design principles", "User research", "Wireframes", "Figma components", "Prototypes", "Portfolio case study"],
      bestFor: "students who like visuals, layouts, user experience, app screens, and Figma design work."
    },
    {
      slug: "python-programming",
      title: "Python Programming",
      instructor: "Usman Raza",
      level: "Beginner to Intermediate",
      duration: "3 Months",
      price: "Rs. 17,000",
      keywords: ["python", "programming", "coding", "logic", "automation", "script", "beginner coding", "basic coding"],
      outline: ["Python syntax", "Loops and functions", "Files", "OOP", "APIs and automation", "Mini projects"],
      bestFor: "absolute beginners who want to build programming logic, automation scripts, and a strong base for AI or backend."
    },
    {
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      instructor: "Dr. Mahnoor Sheikh",
      level: "Intermediate to Advanced",
      duration: "4 Months",
      price: "Rs. 32,000",
      keywords: ["ai", "artificial intelligence", "machine learning", "ml", "data", "data science", "pandas", "numpy", "model", "neural"],
      outline: ["Python for data science", "Pandas and NumPy", "Visualization", "Supervised learning", "Model evaluation", "AI project"],
      bestFor: "students who know Python basics and want to learn data analysis, ML models, and practical AI projects."
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      instructor: "Zainab Noor",
      level: "Beginner to Advanced",
      duration: "2 Months",
      price: "Rs. 15,000",
      keywords: ["marketing", "digital marketing", "seo", "ads", "google ads", "meta ads", "facebook ads", "social media", "campaign", "content"],
      outline: ["Marketing funnels", "SEO", "Content planning", "Social campaigns", "Paid ads", "Analytics report"],
      bestFor: "students who want freelancing, business growth, SEO, ads, content strategy, and campaign management."
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      instructor: "Danish Iqbal",
      level: "Beginner to Advanced",
      duration: "4 Months",
      price: "Rs. 28,000",
      keywords: ["mobile", "app", "android", "ios", "react native", "flutter", "mobile app", "app development"],
      outline: ["Mobile UI", "React Native components", "Navigation", "API integration", "Local storage", "Final app project"],
      bestFor: "students who want to build Android/iOS style apps, screens, navigation, and API-based mobile projects."
    }
  ];

  function clean(text) {
    return text.replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[char]));
  }

  function addMessage(type, html) {
    box.insertAdjacentHTML("beforeend", `<div class="${type}">${html}</div>`);
    box.scrollTop = box.scrollHeight;
  }

  function courseLink(course, label = "View course") {
    return `<a href="course-${course.slug}.html">${label}</a>`;
  }

  function findCourse(text) {
    const scores = courses.map((course) => {
      let score = 0;
      if (text.includes(course.title.toLowerCase())) score += 6;
      course.keywords.forEach((keyword) => {
        if (text.includes(keyword)) score += keyword.split(" ").length > 1 ? 3 : 2;
      });
      return { course, score };
    });
    scores.sort((a, b) => b.score - a.score);
    return scores[0].score > 0 ? scores[0].course : null;
  }

  function formatCourse(course) {
    return `<strong>${course.title}</strong> is best for ${course.bestFor}<br>
    Level: ${course.level}<br>
    Duration: ${course.duration}<br>
    Fee: ${course.price}<br>
    Instructor: ${course.instructor}<br>
    ${courseLink(course, "Open full course details")}`;
  }

  function recommend(text) {
    const course = findCourse(text);
    if (course) return `Based on your message, I recommend ${formatCourse(course)}`;

    if (text.includes("freelance") || text.includes("earning") || text.includes("job")) {
      return `For freelancing or earning, strong options are:<br>
      1. <strong>Frontend Development</strong> for websites and landing pages.<br>
      2. <strong>UI/UX Design</strong> for Figma and app screens.<br>
      3. <strong>Digital Marketing</strong> for SEO, ads, and campaigns.<br>
      Tell me if you like coding, design, or marketing and I will pick one path.`;
    }

    if (text.includes("beginner") || text.includes("start") || text.includes("new")) {
      return `If you are a beginner, start with one of these:<br>
      <strong>Frontend Development</strong> if you want websites.<br>
      <strong>Python Programming</strong> if you want coding logic.<br>
      <strong>UI/UX Design</strong> if you like visuals and Figma.<br>
      <strong>Digital Marketing</strong> if you want business/freelancing without heavy coding.`;
    }

    return `I can guide you properly, but I need one detail: do you like <strong>coding</strong>, <strong>design</strong>, <strong>AI/data</strong>, <strong>marketing</strong>, or <strong>mobile apps</strong>?`;
  }

  function answer(raw) {
    const text = raw.toLowerCase().trim();
    const course = findCourse(text);

    if (/^(hi|hello|hey|salam|assalam|aoa|assalam o alaikum)\b/.test(text)) {
      return `Hello! Welcome to LearnX. I am your course advisor. Tell me your interest, for example: "I like coding", "I want freelancing", "I like design", "AI course details", or "best course for beginner".`;
    }

    if (text.includes("thank")) {
      return `You are welcome. If you want, ask me about course fee, duration, instructor, syllabus, or which course suits your goal.`;
    }

    if (text.includes("all course") || text.includes("list") || text.includes("courses")) {
      return `LearnX offers 8 courses:<br>${courses.map((item) => `- ${item.title} (${item.duration}, ${item.price})`).join("<br>")}`;
    }

    if (text.includes("fee") || text.includes("price") || text.includes("cost")) {
      if (course) return `${course.title} fee is <strong>${course.price}</strong>. Duration is ${course.duration}. ${courseLink(course)}`;
      return `Course fees:<br>${courses.map((item) => `- ${item.title}: ${item.price}`).join("<br>")}`;
    }

    if (text.includes("duration") || text.includes("time") || text.includes("month")) {
      if (course) return `${course.title} duration is <strong>${course.duration}</strong>. Level: ${course.level}. ${courseLink(course)}`;
      return `Course durations:<br>${courses.map((item) => `- ${item.title}: ${item.duration}`).join("<br>")}`;
    }

    if (text.includes("instructor") || text.includes("teacher") || text.includes("trainer")) {
      if (course) return `${course.title} instructor is <strong>${course.instructor}</strong>. ${courseLink(course)}`;
      return `Instructor list:<br>${courses.map((item) => `- ${item.title}: ${item.instructor}`).join("<br>")}`;
    }

    if (text.includes("outline") || text.includes("syllabus") || text.includes("module") || text.includes("learn")) {
      if (course) return `${course.title} outline:<br>${course.outline.map((item) => `- ${item}`).join("<br>")}<br>${courseLink(course, "Open detailed page")}`;
      return `Ask like "Python syllabus", "UI/UX outline", or "Frontend modules" and I will show the full outline.`;
    }

    if (text.includes("certificate")) {
      return `Yes, every LearnX course includes a completion certificate. You can also preview a frontend certificate on the Certificate page: <a href="certificate.html">Certificate Generator</a>`;
    }

    if (text.includes("enroll") || text.includes("admission") || text.includes("register")) {
      return `Admissions are open. You can enroll from here: <a href="enroll.html">Enroll Now</a>. If you tell me your goal, I can suggest the best course before you enroll.`;
    }

    if (text.includes("best") || text.includes("recommend") || text.includes("suggest") || text.includes("confused") || text.includes("which")) {
      return recommend(text);
    }

    if (course) return formatCourse(course);

    return recommend(text);
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const message = input.value.trim();
      if (!message) return;

      addMessage("user", clean(message));
      input.value = "";

      setTimeout(() => {
        addMessage("bot", answer(message));
      }, 250);
    },
    true
  );
})();
