(function () {
  const form = document.getElementById("advisorForm");
  const input = document.getElementById("advisorInput");
  const box = document.getElementById("chatMessages");

  if (!form || !input || !box) return;

  const memory = {
    goals: [],
    lastCourse: null,
    messages: 0
  };

  const courses = [
    {
      slug: "frontend-development",
      title: "Frontend Development",
      instructor: "Muzna Amir",
      level: "Beginner to Advanced",
      duration: "3 Months",
      price: "Rs. 18,000",
      outcome: "portfolio websites, landing pages, responsive UI, and React basics",
      keywords: ["frontend", "html", "css", "javascript", "js", "react", "website", "web design", "responsive", "ui coding", "web"],
      outline: ["HTML5 structure", "CSS Flexbox and Grid", "JavaScript DOM", "Responsive design", "React basics", "Portfolio deployment"]
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      instructor: "Usman Haider",
      level: "Intermediate to Advanced",
      duration: "3 Months",
      price: "Rs. 22,000",
      outcome: "APIs, databases, authentication, and secure server-side systems",
      keywords: ["backend", "node", "nodejs", "express", "api", "server", "database", "mongodb", "auth", "authentication"],
      outline: ["Node.js fundamentals", "Express APIs", "MongoDB CRUD", "Authentication", "Security basics", "Backend project"]
    },
    {
      slug: "full-stack-development",
      title: "Full Stack Development",
      instructor: "Bilal Ahmed",
      level: "Beginner to Advanced",
      duration: "6 Months",
      price: "Rs. 36,000",
      outcome: "complete web apps with frontend, backend, database, auth, and deployment",
      keywords: ["full stack", "fullstack", "mern", "complete developer", "frontend and backend", "web app", "complete website"],
      outline: ["Frontend foundations", "React", "Node APIs", "Database design", "Authentication", "Full stack final product"]
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      instructor: "Sara Malik",
      level: "Beginner to Intermediate",
      duration: "2 Months",
      price: "Rs. 16,000",
      outcome: "Figma workflows, user research, design systems, prototypes, and portfolio case studies",
      keywords: ["ui", "ux", "uiux", "figma", "design", "wireframe", "prototype", "user research", "app design", "visual", "no coding"],
      outline: ["Design principles", "User research", "Wireframes", "Figma components", "Prototypes", "Portfolio case study"]
    },
    {
      slug: "python-programming",
      title: "Python Programming",
      instructor: "Usman Raza",
      level: "Beginner to Intermediate",
      duration: "3 Months",
      price: "Rs. 17,000",
      outcome: "coding logic, automation scripts, APIs, and beginner software projects",
      keywords: ["python", "programming", "coding", "logic", "automation", "script", "beginner coding", "basic coding"],
      outline: ["Python syntax", "Loops and functions", "Files", "OOP", "APIs and automation", "Mini projects"]
    },
    {
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      instructor: "Dr. Mahnoor Sheikh",
      level: "Intermediate to Advanced",
      duration: "4 Months",
      price: "Rs. 32,000",
      outcome: "data analysis, ML models, model evaluation, and practical AI projects",
      keywords: ["ai", "artificial intelligence", "machine learning", "ml", "data", "data science", "pandas", "numpy", "model", "neural"],
      outline: ["Python for data science", "Pandas and NumPy", "Visualization", "Supervised learning", "Model evaluation", "AI project"]
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      instructor: "Zainab Noor",
      level: "Beginner to Advanced",
      duration: "2 Months",
      price: "Rs. 15,000",
      outcome: "SEO, paid ads, content strategy, analytics, and campaign planning",
      keywords: ["marketing", "digital marketing", "seo", "ads", "google ads", "meta ads", "facebook ads", "social media", "campaign", "content"],
      outline: ["Marketing funnels", "SEO", "Content planning", "Social campaigns", "Paid ads", "Analytics report"]
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      instructor: "Danish Iqbal",
      level: "Beginner to Advanced",
      duration: "4 Months",
      price: "Rs. 28,000",
      outcome: "mobile app screens, navigation, APIs, local storage, and app-style final projects",
      keywords: ["mobile", "app", "android", "ios", "react native", "flutter", "mobile app", "app development"],
      outline: ["Mobile UI", "React Native components", "Navigation", "API integration", "Local storage", "Final app project"]
    }
  ];

  const escapeHtml = (text) => text.replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[char]));

  function addMessage(type, html) {
    const message = document.createElement("div");
    message.className = type;
    message.innerHTML = html;
    box.appendChild(message);
    box.scrollTop = box.scrollHeight;
    return message;
  }

  function addTyping() {
    return addMessage("bot", `<span class="typing"><i></i><i></i><i></i></span>`);
  }

  function findCourse(text) {
    const scores = courses.map((course) => {
      let score = 0;
      if (text.includes(course.title.toLowerCase())) score += 8;
      course.keywords.forEach((keyword) => {
        if (text.includes(keyword)) score += keyword.includes(" ") ? 4 : 2;
      });
      return { course, score };
    });
    scores.sort((a, b) => b.score - a.score);
    return scores[0].score > 0 ? scores[0].course : null;
  }

  function remember(text, course) {
    memory.messages += 1;
    if (course) memory.lastCourse = course;
    ["job", "freelance", "ai", "design", "coding", "marketing", "mobile", "beginner", "certificate"].forEach((goal) => {
      if (text.includes(goal) && !memory.goals.includes(goal)) memory.goals.push(goal);
    });
  }

  function courseCard(course) {
    return `
      <div class="advisor-recommendation">
        <div>
          <strong>${course.title}</strong>
          <p>${course.outcome}</p>
          <div class="premium-course-row">
            <span>${course.level}</span>
            <span>${course.duration}</span>
            <span>${course.price}</span>
          </div>
        </div>
        <a href="course-${course.slug}.html">Open</a>
      </div>
    `;
  }

  function roadmap(course) {
    return `
      <strong>Recommended roadmap for ${course.title}</strong><br>
      1. Start with fundamentals and daily 45 minute practice.<br>
      2. Complete weekly assignments and save every project for your portfolio.<br>
      3. Ask for mentor review after each milestone.<br>
      4. Finish the capstone and unlock the certificate.<br>
      ${courseCard(course)}
    `;
  }

  function answer(raw) {
    const text = raw.toLowerCase().trim();
    const course = findCourse(text);
    remember(text, course);

    if (/^(hi|hello|hey|salam|assalam|aoa)\b/.test(text)) {
      return `Hi, I am your LearnX AI Advisor. Tell me your goal and I will recommend a course, roadmap, duration, fee, and next step. You can ask: "best course for freelancing", "AI roadmap", or "I am a beginner".`;
    }

    if (text.includes("thank")) {
      return `You are welcome. I will remember your current goal in this chat. Ask me for a roadmap, fee comparison, or enrollment suggestion when you are ready.`;
    }

    if (text.includes("roadmap") || text.includes("plan") || text.includes("90 day") || text.includes("career path")) {
      return roadmap(course || memory.lastCourse || courses[0]);
    }

    if (text.includes("fee") || text.includes("price") || text.includes("cost")) {
      if (course) return `${course.title} fee is <strong>${course.price}</strong>. Duration is ${course.duration}.${courseCard(course)}`;
      return `Here is the fee range:<br>${courses.map((item) => `- ${item.title}: ${item.price}`).join("<br>")}`;
    }

    if (text.includes("duration") || text.includes("time") || text.includes("month")) {
      if (course) return `${course.title} duration is <strong>${course.duration}</strong>. Level: ${course.level}.${courseCard(course)}`;
      return `Course durations:<br>${courses.map((item) => `- ${item.title}: ${item.duration}`).join("<br>")}`;
    }

    if (text.includes("outline") || text.includes("syllabus") || text.includes("module") || text.includes("learn")) {
      const picked = course || memory.lastCourse;
      if (picked) return `<strong>${picked.title} curriculum</strong><br>${picked.outline.map((item, index) => `${index + 1}. ${item}`).join("<br>")}${courseCard(picked)}`;
      return `Tell me a course name first, for example "Python syllabus" or "Frontend modules", and I will show the curriculum.`;
    }

    if (text.includes("certificate")) {
      return `Yes, LearnX includes a completion certificate after lessons, quizzes, and final project submission. You can preview the certificate flow here: <a href="certificate.html">Certificate Center</a>.`;
    }

    if (text.includes("enroll") || text.includes("admission") || text.includes("register")) {
      return `Admissions are open. My suggestion is to confirm your course fit first, then submit the enrollment form: <a href="enroll.html">Enroll Now</a>.`;
    }

    if (text.includes("freelance") || text.includes("earning") || text.includes("job")) {
      return `For earning and freelancing, I would shortlist these three paths:<br>${courseCard(courses[0])}${courseCard(courses[3])}${courseCard(courses[6])}`;
    }

    if (text.includes("beginner") || text.includes("start") || text.includes("new")) {
      return `For a beginner, I recommend choosing by personality:<br>
      Coding: ${courses[0].title}<br>
      Logic and AI foundation: ${courses[4].title}<br>
      Visual work: ${courses[3].title}<br>
      Business and freelancing: ${courses[6].title}<br>
      ${courseCard(course || courses[0])}`;
    }

    if (course) {
      return `Based on your message, this is the strongest match:${courseCard(course)}Ask me for a roadmap if you want a week-by-week plan.`;
    }

    return `I can guide you better with one detail: do you want coding, design, AI/data, marketing, mobile apps, freelancing, or a job-ready path?`;
  }

  const firstBot = box.querySelector(".bot");
  if (firstBot) {
    firstBot.innerHTML = `Hi, I am your LearnX AI Advisor. Share your goal and I will suggest a course, roadmap, fee, duration, and next action.`;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const message = input.value.trim();
      if (!message) return;

      addMessage("user", escapeHtml(message));
      input.value = "";

      const typing = addTyping();
      const delay = Math.min(1100, 420 + message.length * 14);
      setTimeout(() => {
        typing.innerHTML = answer(message);
        box.scrollTop = box.scrollHeight;
      }, delay);
    },
    true
  );
})();
