const fs = require("fs");
const path = require("path");

const root = __dirname;
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));

const courses = [
  ["frontend-development", "Frontend Development", "Programming", "Muzna Amir", 6],
  ["backend-development", "Backend Development", "Programming", "Usman Haider", 6],
  ["full-stack-development", "Full Stack Development", "Programming", "Bilal Ahmed", 6],
  ["ui-ux-design", "UI/UX Design", "Design", "Sara Malik", 6],
  ["python-programming", "Python Programming", "Programming", "Usman Raza", 6],
  ["ai-machine-learning", "AI & Machine Learning", "Data Science", "Dr. Mahnoor Sheikh", 6],
  ["digital-marketing", "Digital Marketing", "Marketing", "Zainab Noor", 6],
  ["mobile-app-development", "Mobile App Development", "App Development", "Danish Iqbal", 6],
];

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function wrap(title, body) {
  const base = read("main.html");
  return base
    .replace("<title>Home | LearnX</title>", `<title>${title} | LearnX</title>`)
    .replace(/<main>[\s\S]*?<\/main>/, `<main>${body}</main>`);
}

const learningOptions = courses
  .map(([slug, title]) => `<option value="${slug}">${title}</option>`)
  .join("");

write(
  "learning.html",
  wrap(
    "Learning Player",
    `<section class="page-hero"><div><span class="eyebrow">Learning Mode</span><h1>Course Learning Player</h1><p>Watch lessons, mark modules complete, take a quiz, and update dashboard progress without backend.</p></div></section><section class="learn-page"><aside class="learn-sidebar"><label>Select Course</label><select id="learnCourse">${learningOptions}</select><div id="lessonList" class="lesson-list"></div></aside><div class="learn-main"><div class="video-box"><span>Video Lesson Preview</span><strong id="lessonTitle">Select a lesson</strong><p>Frontend-only video placeholder for LMS presentation.</p></div><div class="learn-actions"><button class="btn" id="completeLesson">Mark Lesson Complete</button><a class="btn ghost" href="dashboard.html">Back to Dashboard</a></div><div class="quiz-box"><h3>Quick Quiz</h3><p>What should you build after learning a new concept?</p><button class="quiz-option">A real project</button><button class="quiz-option">Only notes</button><p id="quizResult"></p></div></div></section>`
  )
);

write(
  "certificate.html",
  wrap(
    "Certificate Generator",
    `<section class="page-hero"><div><span class="eyebrow">Certificate</span><h1>Certificate Generator</h1><p>Generate a frontend certificate preview using student and course data saved in the browser.</p></div></section><section class="section"><form class="form-card certificate-form" id="certificateForm"><input id="certName" placeholder="Student name" required><select id="certCourse">${learningOptions}</select><button class="btn" type="submit">Generate Certificate</button></form><div class="print-certificate" id="printCertificate"><span>Certificate of Completion</span><h2>LearnX Academy</h2><p>This certifies that</p><strong id="certStudent">Student Name</strong><p>has successfully completed</p><h3 id="certCourseName">Course Name</h3><small>Issued by LearnX Frontend LMS</small></div><div class="center-cta"><button class="btn ghost" id="printCert">Print / Save PDF</button></div></section>`
  )
);

write(
  "saved-courses.html",
  wrap(
    "Saved Courses",
    `<section class="page-hero"><div><span class="eyebrow">Wishlist</span><h1>Saved Courses</h1><p>Courses saved by the student are stored in localStorage and shown here.</p></div></section><section class="section"><div class="courses-grid" id="savedCoursesGrid"></div></section>`
  )
);

write(
  "compare.html",
  wrap(
    "Compare Courses",
    `<section class="page-hero"><div><span class="eyebrow">Compare</span><h1>Compare Courses</h1><p>Select up to three courses and compare level, category, instructor, and modules.</p></div></section><section class="section"><div class="compare-picker" id="comparePicker"></div><div class="compare-table-wrap"><table class="compare-table" id="compareTable"></table></div></section>`
  )
);

write(
  "admin.html",
  wrap(
    "Admin Panel",
    `<section class="page-hero"><div><span class="eyebrow">Frontend Admin</span><h1>Admin Panel Demo</h1><p>Manage courses and enrollment requests using browser storage only.</p></div></section><section class="admin-page"><div class="admin-stats"><article><span>Total Courses</span><strong id="adminCourseCount">8</strong></article><article><span>Enrollments</span><strong id="adminEnrollCount">0</strong></article><article><span>Saved Courses</span><strong id="adminSavedCount">0</strong></article></div><div class="admin-grid"><section class="panel"><div class="panel-head"><h3>Enrollment Requests</h3></div><div id="adminEnrollments" class="admin-list"></div></section><section class="panel"><div class="panel-head"><h3>Add Demo Course</h3></div><form id="adminCourseForm" class="admin-form"><input id="adminCourseTitle" placeholder="Course title" required><input id="adminCourseCategory" placeholder="Category" required><button class="btn" type="submit">Add Course</button></form><div id="adminCourses" class="admin-list"></div></section></div></section>`
  )
);

htmlFiles.concat(["learning.html", "certificate.html", "saved-courses.html", "compare.html", "admin.html"]).forEach((file) => {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) return;
  let html = fs.readFileSync(fullPath, "utf8");
  html = html.replace("</head>", `<script>window.LEARNX_COURSES=${JSON.stringify(courses)};</script></head>`);
  if (!html.includes("advanced.js")) html = html.replace("</body>", `  <script src="advanced.js"></script>\n</body>`);
  html = html.replace('<a href="advisor.html">AI Advisor</a></div></div><a href="enroll.html"', '<a href="advisor.html">AI Advisor</a><a href="learning.html">Learning Player</a><a href="certificate.html">Certificate</a><a href="saved-courses.html">Saved Courses</a><a href="compare.html">Compare</a><a href="admin.html">Admin Panel</a></div></div><a href="enroll.html"');
  html = html.replace('<a href="advisor.html" class="mob-link">AI Advisor</a><a href="enroll.html"', '<a href="advisor.html" class="mob-link">AI Advisor</a><a href="learning.html" class="mob-link">Learning Player</a><a href="certificate.html" class="mob-link">Certificate</a><a href="saved-courses.html" class="mob-link">Saved Courses</a><a href="compare.html" class="mob-link">Compare</a><a href="admin.html" class="mob-link">Admin Panel</a><a href="enroll.html"');
  fs.writeFileSync(fullPath, html, "utf8");
});

write(
  "advanced.js",
  `(function(){const LX_COURSES=(window.LEARNX_COURSES||[]).map(([slug,title,category,instructor,lessons])=>({slug,title,category,instructor,lessons}));const lxGet=(k,d)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d));const lxSet=(k,v)=>localStorage.setItem(k,JSON.stringify(v));function lxInit(){if(!localStorage.getItem('lxUser'))lxSet('lxUser',{name:'LearnX Student',email:'student@learnx.pk'});if(!localStorage.getItem('lxProgress'))lxSet('lxProgress',{'frontend-development':72,'python-programming':48,'ui-ux-design':35});if(!localStorage.getItem('lxEnrollments'))lxSet('lxEnrollments',[]);if(!localStorage.getItem('lxSaved'))lxSet('lxSaved',[]);if(!localStorage.getItem('lxAdminCourses'))lxSet('lxAdminCourses',[])}lxInit();document.body.insertAdjacentHTML('afterbegin','<button class="theme-toggle" id="themeToggle">Theme</button>');const savedTheme=localStorage.getItem('lxTheme');if(savedTheme==='dark')document.body.classList.add('dark-mode');document.getElementById('themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');localStorage.setItem('lxTheme',document.body.classList.contains('dark-mode')?'dark':'light')});document.querySelectorAll('.course-card').forEach(card=>{const title=card.querySelector('h3')?.textContent||'';const course=LX_COURSES.find(c=>c.title===title);if(!course)return;const btn=document.createElement('button');btn.className='save-course-btn';btn.textContent=lxGet('lxSaved',[]).includes(course.slug)?'Saved':'Save';btn.addEventListener('click',()=>{const saved=lxGet('lxSaved',[]);const next=saved.includes(course.slug)?saved.filter(x=>x!==course.slug):saved.concat(course.slug);lxSet('lxSaved',next);btn.textContent=next.includes(course.slug)?'Saved':'Save'});card.querySelector('.card-body')?.appendChild(btn)});const signup=document.querySelector('form.auth');if(location.pathname.includes('signup')&&signup){signup.addEventListener('submit',e=>{e.preventDefault();const inputs=signup.querySelectorAll('input');lxSet('lxUser',{name:inputs[0].value||'LearnX Student',email:inputs[1].value||'student@learnx.pk'});alert('Account created in browser storage.');location.href='dashboard.html'})}if(location.pathname.includes('login')&&signup){signup.addEventListener('submit',e=>{e.preventDefault();alert('Login successful.');location.href='dashboard.html'})}const enroll=document.getElementById('enrollForm');if(enroll){enroll.addEventListener('submit',()=>{setTimeout(()=>{const course=document.getElementById('courseSelect')?.value||'frontend-development';const list=lxGet('lxEnrollments',[]);list.push({course,date:new Date().toLocaleDateString(),status:'Pending'});lxSet('lxEnrollments',list)},0)})}function renderDashboard(){if(!document.querySelector('.dashboard-page'))return;const user=lxGet('lxUser',{name:'LearnX Student'});document.querySelector('.student-profile h3').textContent=user.name;const progress=lxGet('lxProgress',{});const vals=Object.values(progress);const overall=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;const stat=document.querySelector('.dashboard-stats article:nth-child(2) strong');if(stat)stat.textContent=overall+'%';document.querySelectorAll('.course-progress').forEach(row=>{const name=row.querySelector('strong')?.textContent;const course=LX_COURSES.find(c=>c.title===name);const pct=course?progress[course.slug]||0:0;const num=row.querySelector('span');const bar=row.querySelector('.progress span');if(num)num.textContent=pct+'%';if(bar)bar.style.width=pct+'%'})}renderDashboard();function renderLearning(){const select=document.getElementById('learnCourse');const list=document.getElementById('lessonList');if(!select||!list)return;const title=document.getElementById('lessonTitle');function paint(){const c=LX_COURSES.find(x=>x.slug===select.value)||LX_COURSES[0];const progress=lxGet('lxProgress',{});const done=Math.round((progress[c.slug]||0)/100*c.lessons);list.innerHTML=Array.from({length:c.lessons},(_,i)=>'<button class=\"lesson-btn '+(i<done?'done':'')+'\" data-title=\"Module '+(i+1)+'\">Module '+(i+1)+(i<done?' - Done':'')+'</button>').join('');title.textContent=c.title+' - Module '+Math.min(done+1,c.lessons);list.querySelectorAll('button').forEach(b=>b.onclick=()=>title.textContent=c.title+' - '+b.dataset.title)}select.onchange=paint;document.getElementById('completeLesson')?.addEventListener('click',()=>{const c=LX_COURSES.find(x=>x.slug===select.value);const p=lxGet('lxProgress',{});p[c.slug]=Math.min(100,(p[c.slug]||0)+Math.ceil(100/c.lessons));lxSet('lxProgress',p);paint()});document.querySelectorAll('.quiz-option').forEach((b,i)=>b.onclick=()=>document.getElementById('quizResult').textContent=i===0?'Correct. Projects build real skill.':'Try again. Practical projects matter most.');paint()}renderLearning();function renderCertificate(){const form=document.getElementById('certificateForm');if(!form)return;const user=lxGet('lxUser',{name:'LearnX Student'});document.getElementById('certName').value=user.name;form.addEventListener('submit',e=>{e.preventDefault();const c=LX_COURSES.find(x=>x.slug===document.getElementById('certCourse').value);document.getElementById('certStudent').textContent=document.getElementById('certName').value;document.getElementById('certCourseName').textContent=c.title});document.getElementById('printCert')?.addEventListener('click',()=>window.print())}renderCertificate();function renderSaved(){const grid=document.getElementById('savedCoursesGrid');if(!grid)return;const saved=lxGet('lxSaved',[]);grid.innerHTML=saved.length?saved.map(slug=>{const c=LX_COURSES.find(x=>x.slug===slug);return '<article class=\"course-card\"><div class=\"card-body\"><h3>'+c.title+'</h3><p>'+c.category+' course by '+c.instructor+'</p><a class=\"btn ghost\" href=\"course-'+c.slug+'.html\">Open Course</a></div></article>'}).join(''):'<p>No saved courses yet. Open Courses page and press Save.</p>'}renderSaved();function renderCompare(){const picker=document.getElementById('comparePicker'),table=document.getElementById('compareTable');if(!picker||!table)return;picker.innerHTML=LX_COURSES.map(c=>'<label><input type=\"checkbox\" value=\"'+c.slug+'\"> '+c.title+'</label>').join('');function paint(){const picked=[...picker.querySelectorAll('input:checked')].slice(0,3).map(i=>LX_COURSES.find(c=>c.slug===i.value));table.innerHTML=picked.length?'<tr><th>Feature</th>'+picked.map(c=>'<th>'+c.title+'</th>').join('')+'</tr><tr><td>Category</td>'+picked.map(c=>'<td>'+c.category+'</td>').join('')+'</tr><tr><td>Instructor</td>'+picked.map(c=>'<td>'+c.instructor+'</td>').join('')+'</tr><tr><td>Modules</td>'+picked.map(c=>'<td>'+c.lessons+'</td>').join('')+'</tr>':'<tr><td>Select courses to compare.</td></tr>'}picker.addEventListener('change',paint);paint()}renderCompare();function renderAdmin(){if(!document.getElementById('adminCourseCount'))return;const enrolls=lxGet('lxEnrollments',[]),saved=lxGet('lxSaved',[]),extra=lxGet('lxAdminCourses',[]);document.getElementById('adminCourseCount').textContent=LX_COURSES.length+extra.length;document.getElementById('adminEnrollCount').textContent=enrolls.length;document.getElementById('adminSavedCount').textContent=saved.length;document.getElementById('adminEnrollments').innerHTML=enrolls.length?enrolls.map(e=>'<div><strong>'+e.course+'</strong><span>'+e.date+' - '+e.status+'</span></div>').join(''):'<p>No enrollment requests yet.</p>';document.getElementById('adminCourses').innerHTML=extra.map(c=>'<div><strong>'+c.title+'</strong><span>'+c.category+'</span></div>').join('');document.getElementById('adminCourseForm')?.addEventListener('submit',e=>{e.preventDefault();extra.push({title:document.getElementById('adminCourseTitle').value,category:document.getElementById('adminCourseCategory').value});lxSet('lxAdminCourses',extra);location.reload()})}renderAdmin();})();`
);

fs.appendFileSync(
  path.join(root, "site.css"),
  `.theme-toggle{position:fixed;right:16px;bottom:16px;z-index:100;border:0;border-radius:999px;background:var(--navy);color:#fff;padding:.7rem 1rem;font-weight:800;box-shadow:var(--shadow);cursor:pointer}.dark-mode{--soft:#0f172a;--white:#111827;--ink:#e5e7eb;--muted:#cbd5e1;--line:#334155;background:#0f172a;color:#e5e7eb}.dark-mode .navbar,.dark-mode .page-hero,.dark-mode .section.alt,.dark-mode .course-hero,.dark-mode .blog-hero{background:#111827}.save-course-btn{border:1px solid #bfdbfe;border-radius:8px;background:#e8f0fe;color:var(--primary);font-weight:800;padding:.6rem .8rem;cursor:pointer}.learn-page{display:grid;grid-template-columns:300px 1fr;gap:1.5rem;padding:4rem 5vw}.learn-sidebar,.learn-main,.quiz-box,.print-certificate,.admin-stats article,.admin-list div{background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 26px rgba(15,23,42,.06)}.learn-sidebar{padding:1rem}.lesson-list{display:grid;gap:.6rem;margin-top:1rem}.lesson-btn{border:1px solid var(--line);border-radius:8px;background:#fff;text-align:left;padding:.75rem;font-weight:700}.lesson-btn.done{background:#dcfce7;color:#166534}.learn-main{padding:1.2rem}.video-box{min-height:280px;background:linear-gradient(135deg,#071b46,#1a73e8);border-radius:8px;color:#fff;display:grid;place-items:center;text-align:center;padding:2rem}.video-box strong{font-size:1.8rem}.learn-actions{display:flex;gap:1rem;flex-wrap:wrap;margin:1rem 0}.quiz-box{padding:1rem}.quiz-option{display:block;width:100%;margin:.5rem 0;border:1px solid var(--line);border-radius:8px;background:#fff;padding:.8rem;text-align:left;font-weight:700}.print-certificate{max-width:820px;margin:2rem auto;padding:3rem;text-align:center;background:linear-gradient(135deg,#fff,#e8f0fe);border:3px double #1a73e8}.print-certificate span{color:var(--primary);font-weight:800}.print-certificate strong{display:block;font-size:2.2rem;color:var(--navy)}.compare-picker{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-bottom:1.5rem}.compare-picker label{background:#fff;border:1px solid var(--line);border-radius:8px;padding:.8rem;font-weight:700}.compare-table-wrap{overflow:auto}.compare-table{width:100%;border-collapse:collapse;background:#fff}.compare-table th,.compare-table td{border:1px solid var(--line);padding:1rem;text-align:left}.admin-page{padding:4rem 5vw}.admin-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1rem}.admin-stats article{padding:1.2rem}.admin-stats strong{font-size:2rem;color:var(--navy);display:block}.admin-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.admin-form{display:grid;gap:.8rem}.admin-list{display:grid;gap:.6rem}.admin-list div{padding:.8rem}.admin-list strong,.admin-list span{display:block}@media(max-width:900px){.learn-page,.admin-grid{grid-template-columns:1fr}.compare-picker,.admin-stats{grid-template-columns:1fr 1fr}}@media(max-width:640px){.compare-picker,.admin-stats{grid-template-columns:1fr}}@media print{body>*:not(main){display:none!important}.print-certificate{box-shadow:none;margin:0;border-color:#000}}`,
  "utf8"
);

const sitePath = path.join(root, "site.js");
let siteJs = fs.readFileSync(sitePath, "utf8");
if (!siteJs.startsWith("(function(){")) {
  fs.writeFileSync(sitePath, `(function(){${siteJs}})();`, "utf8");
}

fs.readdirSync(root)
  .filter((file) => file.endsWith(".html"))
  .forEach((file) => {
    const fullPath = path.join(root, file);
    let html = fs.readFileSync(fullPath, "utf8");
    html = html.replace(/src="site\.js(?:\?v=\d+)?"/g, 'src="site.js?v=2"');
    html = html.replace(/src="advanced\.js(?:\?v=\d+)?"/g, 'src="advanced.js?v=2"');
    fs.writeFileSync(fullPath, html, "utf8");
  });

console.log("Advanced frontend upgrade applied.");

