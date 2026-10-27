import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { college, courses, faculty, notices } from "./data.js";

const departments = [
  {
    id: 1,
    name: "Computer Science Engineering",
    shortName: "CSE",
    icon: "💻",
    description: "Programming, software development, algorithms and computer systems.",
    overview: "Explore programming, software engineering, computer systems, databases and modern computing technologies.",
    subjects: ["Programming and Data Structures", "Database Management Systems", "Operating Systems", "Computer Networks", "Software Engineering", "Artificial Intelligence"],
    facilities: ["Computer Programming Laboratories", "Software Development Projects", "Technical Workshops"],
    careers: ["Software Developer", "Web Developer", "Systems Engineer", "Data Analyst"],
  },
  {
    id: 2,
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AI & ML",
    icon: "🤖",
    description: "Intelligent systems, machine learning, data science and automation.",
    overview: "Learn how intelligent systems use data, algorithms and machine learning to solve practical problems.",
    subjects: ["Python Programming", "Machine Learning", "Deep Learning", "Data Science", "Natural Language Processing", "Computer Vision"],
    facilities: ["AI and ML Projects", "Data Analysis Practice", "Intelligent Systems Workshops"],
    careers: ["Machine Learning Engineer", "Data Analyst", "AI Developer", "Data Scientist"],
  },
  {
    id: 3,
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    icon: "📡",
    description: "Electronic circuits, communication systems and embedded technology.",
    overview: "Study electronic circuits, digital systems, communication networks and embedded technologies.",
    subjects: ["Electronic Devices and Circuits", "Digital Electronics", "Signals and Systems", "Communication Systems", "Microprocessors", "Embedded Systems"],
    facilities: ["Electronic Circuits Laboratory", "Communication Systems Laboratory", "Embedded Systems Practice"],
    careers: ["Electronics Engineer", "Communication Engineer", "Embedded Systems Engineer", "Telecommunications Engineer"],
  },
  {
    id: 4,
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    icon: "⚡",
    description: "Electrical systems, energy technology, machines and power engineering.",
    overview: "Explore electrical machines, power systems, control engineering and electrical energy technologies.",
    subjects: ["Electrical Circuit Analysis", "Electrical Machines", "Power Systems", "Control Systems", "Power Electronics", "Renewable Energy Systems"],
    facilities: ["Electrical Machines Laboratory", "Power Systems Practice", "Electrical Measurements Laboratory"],
    careers: ["Electrical Engineer", "Power Systems Engineer", "Control Engineer", "Energy Engineer"],
  },
  {
    id: 5,
    name: "Mechanical Engineering",
    shortName: "MECH",
    icon: "⚙️",
    description: "Engineering design, manufacturing, materials and mechanical systems.",
    overview: "Understand mechanical design, materials, manufacturing processes, thermal systems and automation.",
    subjects: ["Engineering Mechanics", "Thermodynamics", "Manufacturing Technology", "Machine Design", "Fluid Mechanics", "CAD and Automation"],
    facilities: ["Manufacturing Workshop", "Computer-Aided Design Practice", "Thermal Engineering Laboratory"],
    careers: ["Mechanical Design Engineer", "Production Engineer", "Quality Engineer", "Maintenance Engineer"],
  },
  {
    id: 6,
    name: "Master of Business Administration",
    shortName: "MBA",
    icon: "📊",
    description: "Management, finance, marketing and business strategy.",
    overview: "Develop business knowledge in management, finance, marketing, human resources and strategic decision-making.",
    subjects: ["Financial Management", "Marketing Management", "Human Resource Management", "Business Analytics", "Operations Management", "Strategic Management"],
    facilities: ["Business Case Studies", "Management Presentations", "Analytics and Research Projects"],
    careers: ["Financial Analyst", "Business Analyst", "Marketing Manager", "HR Executive"],
  },
];

const sampleStudents = [
  { id: "STU2026001", name: "Rahul Kumar", department: departments[0].name, semester: "IV", attendance: "85%" },
  { id: "STU2026002", name: "Priya Sharma", department: departments[1].name, semester: "IV", attendance: "92%" },
  { id: "STU2026003", name: "Arjun Reddy", department: departments[2].name, semester: "II", attendance: "78%" },
  { id: "STU2026004", name: "Sneha Rao", department: departments[4].name, semester: "VI", attendance: "88%" },
  { id: "STU2026005", name: "Kiran Kumar", department: departments[3].name, semester: "IV", attendance: "81%" },
];

const SectionLabel = ({ children }) => <span className="section-label">{children}</span>;
const DemoNote = ({ children }) => <p className="dashboard-demo-note">{children}</p>;
const PageTitle = ({ label, title, text }) => (
  <div className="section-heading">
    <SectionLabel>{label}</SectionLabel>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);
const StatsCard = ({ icon, label, value, note }) => {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-top">
        <span className="admin-stat-icon">{icon}</span>
        {note ? <span className="admin-stat-note">{note}</span> : null}
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
};
const DashboardHero = ({ portal, title, text }) => (
  <section className="dashboard-welcome">
    <div className="container">
      <SectionLabel>{portal}</SectionLabel>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  </section>
);
const Profile = ({ initials, name, id, detail }) => (
  <div className="student-profile">
    <div className="student-avatar">{initials}</div>
    <div>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>{detail}</p>
    </div>
  </div>
);

export function Home() {
  const features = [
    ["🎓", "Academic Learning", "Build subject knowledge and practical understanding."],
    ["💡", "Innovation & Projects", "Encourage creative thinking and problem-solving."],
    ["🚀", "Career Development", "Prepare for professional opportunities through learning and projects."],
  ];
  const facilities = [
    ["🔬", "Laboratories", "Build practical skills through laboratory-based learning."],
    ["📚", "Library & Learning", "Support independent study, reading and research."],
    ["🧑‍💻", "Technology", "Explore computing and emerging technologies."],
    ["🤝", "Student Activities", "Build teamwork, communication and leadership."],
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">LEARN • INNOVATE • LEAD</span>
          <h1>Building Engineers for a Better Tomorrow</h1>
          <p>Discover quality education, practical learning, innovation and opportunities to prepare for your future.</p>
          <div className="hero-actions">
            <Link to="/admissions" className="btn btn-primary">Apply for Admission →</Link>
            <Link to="/courses" className="btn btn-outline">Explore Courses</Link>
          </div>
          <div className="hero-note"><span className="live-dot" />Your journey towards engineering excellence starts here.</div>
        </div>
      </section>

      <section className="stats container">
        <div className="stat"><strong>{courses.length}+</strong><span>Listed Programmes</span></div>
        <div className="stat"><strong>{faculty.length}+</strong><span>Featured Faculty</span></div>
        <div className="stat"><strong>01</strong><span>Goal: Your Success</span></div>
      </section>

      <section className="section container">
        <PageTitle label="ABOUT OUR COLLEGE" title="Where Knowledge Meets Opportunity" text={`Welcome to ${college.name}, located in ${college.location}. Explore academic programmes and develop technical knowledge, creativity and professional skills.`} />
        <div className="feature-grid">
          {features.map(([icon, title, description]) => (
            <article className="feature-card" key={title}>
              <span className="feature-icon">{icon}</span><h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-top">
            <div><SectionLabel>ACADEMIC PROGRAMMES</SectionLabel><h2>Explore Our Courses</h2><p>Find a programme that matches your interests.</p></div>
            <Link to="/courses" className="text-link">View All Courses →</Link>
          </div>
          <div className="course-grid">
            {courses.slice(0, 3).map((course, index) => (
              <article className="course-card" key={course.id}>
                <div className={`course-art course-art-${index + 1}`}><span>{["💻", "🤖", "⚡"][index]}</span><small>ACADEMIC PROGRAMME</small></div>
                <div className="course-content"><span className="course-tag">Academic Programme</span><h3>{course.name}</h3><p>Duration: {course.duration}</p><Link to="/admissions" className="text-link">Enquire Now →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <PageTitle label="CAMPUS EXPERIENCE" title="Learn Beyond the Classroom" text="A well-rounded college experience combines academic learning, collaboration, hands-on practice and student activities." />
        <div className="facility-grid">
          {facilities.map(([icon, title, description]) => (
            <article className="facility-card" key={title}><span>{icon}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="career-section">
        <div className="container career-inner">
          <div><SectionLabel>YOUR FUTURE STARTS HERE</SectionLabel><h2>Turn Your Ambition Into Action</h2><p>Explore programmes, learn about admissions and take the next step towards your academic goals.</p></div>
          <Link to="/admissions" className="btn btn-white">Start Your Enquiry →</Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-top"><div><SectionLabel>LATEST UPDATES</SectionLabel><h2>Notices & Events</h2><p>Check the latest announcements displayed on our website.</p></div><Link to="/notices" className="text-link">All Notices →</Link></div>
        <div className="notice-grid">
          {notices.slice(0, 3).map((notice) => (
            <article className="notice-card" key={notice.id}><span className="notice-icon">📢</span><div><h3>{notice.title}</h3><p>{notice.description}</p></div></article>
          ))}
        </div>
      </section>
    </>
  );
}

export function About() {
  const values = [["01", "Integrity", "Acting honestly and responsibly."], ["02", "Innovation", "Exploring ideas and better solutions."], ["03", "Excellence", "Striving for continuous improvement."], ["04", "Collaboration", "Learning and achieving together."]];
  return (
    <main>
      <section className="about-hero"><div className="container"><SectionLabel>ABOUT OUR COLLEGE</SectionLabel><h1>Education for a Better Tomorrow</h1><p>Welcome to {college.name}. Our goal is to encourage learning, practical knowledge, innovation and responsible leadership.</p></div></section>
      <section className="container about-section">
        <div className="about-intro"><div><SectionLabel>WHO WE ARE</SectionLabel><h2>Learning Beyond the Classroom</h2></div><p>Located in {college.location}, {college.name} aims to create a learning environment where students can build technical knowledge, develop critical thinking and prepare for professional opportunities. Our educational approach combines academic study, practical activities, teamwork and continuous learning.</p></div>
        <div className="about-grid">
          <article className="about-card"><span className="about-symbol">🔭</span><h3>Our Vision</h3><p>To inspire capable, creative and responsible professionals who contribute positively to society through knowledge and innovation.</p></article>
          <article className="about-card"><span className="about-symbol">🎯</span><h3>Our Mission</h3><p>To promote quality learning, practical skills, ethical conduct, research, collaboration and lifelong development.</p></article>
          <article className="about-card"><span className="about-symbol">🧠</span><h3>Our Approach</h3><p>To connect classroom learning with problem-solving, projects, teamwork and an understanding of real-world challenges.</p></article>
        </div>
        <section className="about-values"><SectionLabel>WHAT WE VALUE</SectionLabel><h2>Principles That Guide Us</h2><div className="value-list">{values.map(([number, title, description]) => <div key={number}><span>{number}</span><p><strong>{title}</strong> — {description}</p></div>)}</div></section>
      </section>
      <section className="about-cta"><div className="container"><h2>Discover Your Next Opportunity</h2><p>Explore our academic programmes and learn more about opportunities available to students.</p><Link to="/courses" className="btn btn-white">Explore Our Courses →</Link></div></section>
    </main>
  );
}

export function Courses() {
  return <main className="container page-content"><SectionLabel>ACADEMICS</SectionLabel><h1>Our Courses</h1><p>Explore the programmes currently listed on this website.</p><div className="course-grid">{courses.map((course) => <article className="course-card" key={course.id}><div className="course-content"><span className="course-tag">Academic Programme</span><h3>{course.name}</h3><p>Duration: {course.duration}</p><Link to="/admissions" className="text-link">Enquire Now →</Link></div></article>)}</div></main>;
}

export function Faculty() {
  return <main className="container page-content"><SectionLabel>OUR TEAM</SectionLabel><h1>Our Faculty</h1><p>Meet the faculty profiles currently displayed on this website.</p><div className="feature-grid">{faculty.map((person) => <article className="feature-card" key={person.id}><span className="feature-icon">👩‍🏫</span><h3>{person.name}</h3><p>{person.department}</p></article>)}</div></main>;
}

export function Notices() {
  return <main className="container page-content"><SectionLabel>CAMPUS INFORMATION</SectionLabel><h1>Notices & Events</h1><div className="notice-grid">{notices.map((notice) => <article className="notice-card" key={notice.id}><span className="notice-icon">📢</span><div><h3>{notice.title}</h3><p>{notice.description}</p></div></article>)}</div></main>;
}

export function Admissions() {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enquiry = {
      fullName: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      message: formData.get("message") || "",
    };

    setSubmitting(true);
    setFeedback("");
    try {
      const response = await fetch("http://localhost:5000/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed.");
      setFeedback(`Success! Application ID: ${result.applicationId}`);
      form.reset();
    } catch (error) {
      setFeedback(`Error: ${error.message}. Check whether the backend is running.`);
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="container page-content"><SectionLabel>JOIN OUR COLLEGE</SectionLabel><h1>Admission Enquiry</h1><p>Complete the form to submit your enquiry.</p><form className="admission-form" onSubmit={submit}>
    <label>Full Name<input type="text" name="name" placeholder="Enter your full name" required /></label>
    <label>Email Address<input type="email" name="email" placeholder="you@example.com" required /></label>
    <label>Phone Number<input type="tel" name="phone" placeholder="Enter your phone number" required /></label>
    <label>Select Course<select name="course" defaultValue="" required><option value="" disabled>Choose a programme</option>{courses.map((course) => <option key={course.id} value={course.name}>{course.name}</option>)}</select></label>
    <label>Message<textarea name="message" rows="4" placeholder="Enter your message" /></label>
    <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? "Submitting..." : "Submit Enquiry →"}</button>
    {feedback && <p className="form-note" role="status">{feedback}</p>}
  </form></main>;
}

export function Departments() {
  return <main className="departments-page"><section className="departments-hero"><div className="container"><SectionLabel>ACADEMIC EXCELLENCE</SectionLabel><h1>Explore Our Departments</h1><p>Discover academic disciplines, build professional skills and explore your areas of interest.</p></div></section><section className="container departments-content"><PageTitle label="OUR ACADEMIC AREAS" title="Find Your Field of Interest" text="Explore these sample department profiles and their areas of study."/><div className="departments-grid">{departments.map((department) => <article className="department-card" key={department.id}><div className="department-card-top"><span className="department-icon">{department.icon}</span><span className="department-code">{department.shortName}</span></div><h3>{department.name}</h3><p>{department.description}</p><Link to={`/departments/${department.id}`} className="text-link">View Department →</Link></article>)}</div></section></main>;
}

export function DepartmentDetails() {
  const { id } = useParams();
  const department = departments.find((item) => item.id === Number(id));
  if (!department) return <main className="container page-content"><h1>Department Not Found</h1><Link to="/departments" className="text-link">← Back to Departments</Link></main>;

  return <main><section className="departments-hero"><div className="container"><SectionLabel>DEPARTMENT OF {department.shortName}</SectionLabel><h1>{department.icon} {department.name}</h1><p>{department.overview}</p><Link to="/departments" className="btn btn-white">← All Departments</Link></div></section><section className="container department-detail-content">
    <div className="detail-section"><SectionLabel>PROGRAMME OVERVIEW</SectionLabel><h2>About This Department</h2><p>{department.overview}</p></div>
    <div className="detail-section"><SectionLabel>ACADEMIC LEARNING</SectionLabel><h2>Key Subjects</h2><div className="detail-list">{department.subjects.map((subject, index) => <div className="detail-item" key={subject}><span>{String(index + 1).padStart(2, "0")}</span><p>{subject}</p></div>)}</div></div>
    <div className="detail-section"><SectionLabel>PRACTICAL LEARNING</SectionLabel><h2>Facilities & Activities</h2><div className="detail-cards">{department.facilities.map((facility) => <article className="feature-card" key={facility}><span className="feature-icon">🔬</span><h3>{facility}</h3></article>)}</div></div>
    <div className="detail-section"><SectionLabel>CAREER PATHWAYS</SectionLabel><h2>Explore Career Opportunities</h2><div className="career-tags">{department.careers.map((career) => <span className="career-tag" key={career}>{career}</span>)}</div></div>
    <div className="department-enquiry"><div><h2>Interested in This Programme?</h2><p>Contact the admissions team through our enquiry form.</p></div><Link to="/admissions" className="btn btn-primary">Admission Enquiry →</Link></div>
  </section></main>;
}

export function StudentLogin() {
  const navigate = useNavigate();
  function handleLogin(event) { event.preventDefault(); navigate("/student-dashboard"); }
  return <main className="student-login-page"><section className="student-login-card"><div className="student-login-icon">🎓</div><SectionLabel>STUDENT PORTAL</SectionLabel><h1>Welcome Back!</h1><p className="login-description">Sign in to access your academic information.</p><form className="admission-form" onSubmit={handleLogin}><label>Student ID<input type="text" name="studentId" placeholder="Enter your student ID" required /></label><label>Password<input type="password" name="password" placeholder="Enter your password" required /></label><button type="submit" className="btn btn-primary login-button">Sign In →</button></form><p className="login-demo-note">Demo only: credentials are not verified. Do not enter a real password.</p><Link to="/" className="text-link">← Back to Home</Link></section></main>;
}

export function AdminLogin() {
  const navigate = useNavigate();
  function handleLogin(event) { event.preventDefault(); navigate("/admin-dashboard"); }
  return <main className="student-login-page"><section className="student-login-card"><div className="student-login-icon">🔐</div><SectionLabel>ADMINISTRATION PORTAL</SectionLabel><h1>Admin Login</h1><p className="login-description">Sign in to access the college administration dashboard.</p><form className="admission-form" onSubmit={handleLogin}><label>Admin Username<input type="text" name="username" placeholder="Enter admin username" required /></label><label>Password<input type="password" name="password" placeholder="Enter admin password" required /></label><button type="submit" className="btn btn-primary login-button">Admin Sign In →</button></form><p className="login-demo-note">Demo only: credentials are not verified and this page is not secure authentication.</p><Link to="/" className="text-link">← Back to Home</Link></section></main>;
}

export function StudentDashboard() {
  const stats = [["📅", "Attendance", "85%"], ["📊", "Current CGPA", "8.2"], ["📚", "Courses", "6"]];
  const results = [["Data Structures", "A"], ["Database Management Systems", "A+"], ["Computer Networks", "B+"]];
  const announcements = ["Check the department notice board for examination updates.", "Review your timetable before attending classes.", "Contact your faculty advisor with attendance queries."];
  return <main className="student-dashboard"><DashboardHero portal="STUDENT PORTAL" title="Welcome, Demo Student!" text="Here is an overview of your academic information."/><section className="container dashboard-content"><Profile initials="DS" name="Demo Student" id="STU2026001" detail="Computer Science Engineering · Semester 4"/><div className="dashboard-stats">{stats.map(([icon, title, value]) => <article className="dashboard-stat" key={title}><span className="dashboard-stat-icon">{icon}</span><p>{title}</p><h2>{value}</h2></article>)}</div><div className="dashboard-grid"><section className="dashboard-panel"><SectionLabel>ACADEMIC PERFORMANCE</SectionLabel><h2>Recent Results</h2>{results.map(([subject, grade]) => <div className="result-row" key={subject}><span>{subject}</span><strong>{grade}</strong></div>)}<DemoNote>These grades are sample data for demonstration only.</DemoNote></section><section className="dashboard-panel"><SectionLabel>CAMPUS UPDATES</SectionLabel><h2>Announcements</h2>{announcements.map((announcement, index) => <div className="announcement-row" key={announcement}><span>{String(index + 1).padStart(2, "0")}</span><p>{announcement}</p></div>)}</section></div><section className="dashboard-panel dashboard-links"><SectionLabel>QUICK ACCESS</SectionLabel><h2>Student Services</h2><div className="student-service-grid">{[["📚", "Courses", "Explore academic programmes", "/courses"], ["🏛️", "Departments", "Explore departments", "/departments"], ["📢", "Notices", "Read campus announcements", "/notices"]].map(([icon, title, text, url]) => <Link to={url} className="student-service" key={title}><span>{icon}</span><strong>{title}</strong><small>{text}</small></Link>)}</div><Link to="/" className="btn btn-primary dashboard-logout">Back to Home</Link></section></section></main>;
}

export function FacultyDashboard() {
  const classes = [["Data Structures", "II Year", "A", "09:00 AM"], ["Database Management Systems", "III Year", "B", "11:00 AM"], ["Programming Fundamentals", "I Year", "A", "02:00 PM"]];
  const tasks = ["Review student attendance records", "Prepare marks for internal assessment", "Check upcoming examination notices"];
  return <main><DashboardHero portal="FACULTY PORTAL" title="Welcome, Dr. Ananya Rao!" text="Manage your academic activities from one place."/><section className="container dashboard-content"><Profile initials="AR" name="Dr. Ananya Rao" id="FAC1001" detail="Computer Science Engineering"/><div className="dashboard-stats">{[["📚", "Scheduled Classes", classes.length], ["📝", "Academic Tasks", tasks.length], ["🏛️", "Department", "CSE"]].map(([icon, label, value]) => <article className="dashboard-stat" key={label}><span className="dashboard-stat-icon">{icon}</span><p>{label}</p><h2>{value}</h2></article>)}</div><section className="dashboard-panel faculty-classes"><SectionLabel>TEACHING SCHEDULE</SectionLabel><h2>My Classes</h2><div className="faculty-table-wrapper"><table className="faculty-table"><thead><tr>{["Subject", "Year", "Section", "Time"].map((item) => <th key={item}>{item}</th>)}</tr></thead><tbody>{classes.map(([subject, year, section, time]) => <tr key={subject}><td>{subject}</td><td>{year}</td><td>{section}</td><td>{time}</td></tr>)}</tbody></table></div><DemoNote>Demonstration timetable; replace it with your official class schedule.</DemoNote></section><div className="dashboard-grid faculty-bottom-grid"><section className="dashboard-panel"><SectionLabel>TO-DO LIST</SectionLabel><h2>Academic Tasks</h2>{tasks.map((task, index) => <div className="announcement-row" key={task}><span>{String(index + 1).padStart(2, "0")}</span><p>{task}</p></div>)}</section><section className="dashboard-panel"><SectionLabel>QUICK ACCESS</SectionLabel><h2>Faculty Services</h2>{[["📢", "College Notices", "View announcements", "/notices"], ["📚", "Academic Programmes", "Review listed courses", "/courses"], ["🏛️", "Departments", "Explore departments", "/departments"], ["✅", "Attendance Management", "Mark attendance (demo)", "/attendance-management"], ["📝", "Results & Marks", "Review sample marks", "/results-management"]].map(([icon, title, text, url]) => <Link to={url} className="faculty-service" key={title}><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></Link>)}</section></div></section></main>;
}

export function AdminDashboard() {
  const stats = [["🎓", "Students", "1,250", "Sample figure"], ["👩‍🏫", "Faculty", "85", "Sample figure"], ["📚", "Courses", courses.length, "Listed programmes"], ["📢", "Notices", notices.length, "Published examples"]];
  const tools = [["Admissions", "Review submitted admission enquiries.", "/admin-admissions", "Manage Admissions"], ["Academic Programmes", "Review the listed programmes.", "/academic-management", "Manage Courses & Faculty"], ["Student Records", "Search the sample student register.", "/student-records", "Open Student Records"], ["Notices", "Add or remove announcement examples.", "/notices-management", "Manage Notices"], ["Timetable", "Review class schedules and events.", "/timetable-calendar", "Open Timetable"], ["Attendance", "Mark attendance for a sample class.", "/attendance-management", "Manage Attendance"], ["Results", "Edit sample marks and grades.", "/results-management", "Manage Results"]];
  return <main><DashboardHero portal="ADMINISTRATION" title="Admin Dashboard" text="College administration overview and website information."/><section className="container admin-content"><div className="admin-heading"><div><SectionLabel>OVERVIEW</SectionLabel><h2>College at a Glance</h2><p>Example figures are shown for demonstration only.</p></div><span className="admin-demo-badge">DEMO MODE</span></div><div className="admin-stat-grid">{stats.map(([icon, label, value, note]) => <StatsCard key={label} icon={icon} label={label} value={value} note={note} />)}</div><section className="admin-section"><PageTitle label="ADMINISTRATION TOOLS" title="Quick Access" text="Open website management sections."/><div className="admin-tools-grid">{tools.map(([title, description, url, button]) => <article className="admin-tool-card" key={title}><h3>{title}</h3><p>{description}</p><Link to={url} className="text-link">{button} →</Link></article>)}</div></section><section className="admin-section"><SectionLabel>WEBSITE CONTENT</SectionLabel><h2>Recently Listed Notices</h2><div className="admin-notice-list">{notices.map((notice) => <div className="admin-notice-row" key={notice.id}><div className="admin-notice-icon">📢</div><div><h3>{notice.title}</h3><p>{notice.description}</p></div><span className="admin-status">Example</span></div>)}</div></section><div className="admin-disclaimer"><strong>Demonstration dashboard</strong><p>This dashboard includes sample content. Real authentication and backend access controls are not implemented yet.</p></div></section></main>;
}


export function AdminAdmissions() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadApplications() {
      try {
        const response = await fetch("http://localhost:5000/api/admissions");
        if (!response.ok) throw new Error("Could not load applications.");
        const data = await response.json();
        if (active) setApplications(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadApplications();
    return () => { active = false; };
  }, []);

  async function changeStatus(id, status) {
    setUpdatingId(id);
    setFeedback("");
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/admissions/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Status update failed.");
      setApplications((current) => current.map((item) => item.id === id ? { ...item, status: result.status } : item));
      setFeedback(`Application APP${String(id).padStart(4, "0")} updated to ${status}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  const count = (status) => applications.filter((item) => item.status === status).length;

  return <main className="container admin-content"><div className="admin-heading"><div><SectionLabel>ADMISSIONS MANAGEMENT</SectionLabel><h1>Admission Applications</h1><p>Review applications and update their status.</p></div><Link to="/admissions" className="btn btn-primary">New Enquiry →</Link></div>
    {loading && <p>Loading applications...</p>}
    {error && <p role="alert">Error: {error}</p>}
    {feedback && <p role="status">{feedback}</p>}
    {!loading && !error && <>
      <div className="admin-stat-grid"><StatsCard icon="📋" label="Total Applications" value={applications.length}/><StatsCard icon="⏳" label="Pending" value={count("Pending")}/><StatsCard icon="🔎" label="Under Review" value={count("Under Review")}/><StatsCard icon="✅" label="Approved" value={count("Approved")}/></div>
      <section className="admin-section"><div className="admin-heading"><div><SectionLabel>APPLICATION REGISTER</SectionLabel><h2>Submitted Enquiries</h2></div><span className="admin-demo-badge">DATABASE RECORDS</span></div><div className="admissions-table-wrapper"><table className="admissions-table"><thead><tr><th>ID</th><th>Applicant</th><th>Email</th><th>Phone</th><th>Course</th><th>Status</th></tr></thead><tbody>
        {applications.length > 0 ? applications.map((item) => <tr key={item.id}><td>APP{String(item.id).padStart(4, "0")}</td><td>{item.fullName}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.course}</td><td><select value={item.status} disabled={updatingId === item.id} className="status-select" aria-label={`Status for application ${item.id}`} onChange={(event) => changeStatus(item.id, event.target.value)}><option value="Pending">Pending</option><option value="Under Review">Under Review</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option></select></td></tr>) : <tr><td colSpan="6" className="records-empty">No applications found.</td></tr>}
      </tbody></table></div><DemoNote>Application data is loaded from the local SQLite database. Secure administrator authentication must be added before public deployment.</DemoNote></section>
    </>}
  </main>;
}

export function StudentRecords() {
  const [search, setSearch] = useState("");
  const matches = sampleStudents.filter((student) => [student.id, student.name, student.department].some((value) => value.toLowerCase().includes(search.toLowerCase())));
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>STUDENT MANAGEMENT</SectionLabel><h2>Student Records</h2><p>Search and review the sample student register.</p></div><span className="admin-demo-badge">DEMO DATA</span></div><div className="records-summary"><div><span>Total Sample Records</span><strong>{sampleStudents.length}</strong></div><div><span>Matching Records</span><strong>{matches.length}</strong></div></div><section className="records-panel"><label className="records-search-label" htmlFor="student-search">Search by student name, ID or department</label><input id="student-search" className="records-search" type="search" placeholder="Search students..." value={search} onChange={(event) => setSearch(event.target.value)}/><div className="records-table-wrapper"><table className="records-table"><thead><tr>{["Student ID", "Student Name", "Department", "Semester", "Attendance"].map((item) => <th key={item}>{item}</th>)}</tr></thead><tbody>{matches.length ? matches.map((student) => <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.department}</td><td>{student.semester}</td><td><span className="attendance-chip">{student.attendance}</span></td></tr>) : <tr><td colSpan="5" className="records-empty">No matching student records found.</td></tr>}</tbody></table></div><DemoNote>Fictional data only; student records are not connected to a college database.</DemoNote></section></main>;
}

export function AttendanceManagement() {
  const [department, setDepartment] = useState("All Departments");
  const [presentIds, setPresentIds] = useState(sampleStudents.map((student) => student.id));
  const students = sampleStudents.filter((student) => department === "All Departments" || student.department === department);
  const present = students.filter((student) => presentIds.includes(student.id)).length;
  const absent = students.length - present;
  const percent = students.length ? Math.round((present / students.length) * 100) : 0;
  function toggleAttendance(id) { setPresentIds((current) => current.includes(id) ? current.filter((studentId) => studentId !== id) : [...current, id]); }
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>FACULTY PORTAL</SectionLabel><h1>Attendance Management</h1><p>Mark students present or absent for a demonstration class.</p></div><span className="admin-demo-badge">DEMO MODE</span></div><section className="records-panel"><label className="records-search-label" htmlFor="attendance-department">Select Department</label><select id="attendance-department" className="records-search" value={department} onChange={(event) => setDepartment(event.target.value)}><option>All Departments</option>{departments.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select><div className="records-summary"><div><span>Present</span><strong>{present}</strong></div><div><span>Absent</span><strong>{absent}</strong></div></div><h3>Attendance: {percent}% present</h3><div className="records-table-wrapper"><table className="records-table"><thead><tr><th>Student ID</th><th>Name</th><th>Department</th><th>Attendance</th></tr></thead><tbody>{students.map((student) => { const isPresent = presentIds.includes(student.id); return <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.department}</td><td><label><input type="checkbox" checked={isPresent} onChange={() => toggleAttendance(student.id)}/> {isPresent ? "Present" : "Absent"}</label></td></tr>; })}</tbody></table></div><DemoNote>Attendance changes are temporary and are not saved to the database.</DemoNote></section></main>;
}

export function ResultsManagement() {
  const subjects = ["Data Structures", "Machine Learning", "Electronic Circuits", "Thermodynamics", "Electrical Machines"];
  const initialRecords = sampleStudents.map((student, index) => ({ ...student, subject: subjects[index], internal: [21, 23, 18, 20, 22][index], external: [62, 65, 48, 52, 55][index] }));
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState(false);
  const filtered = records.filter((student) => [student.id, student.name, student.department, student.subject].some((value) => value.toLowerCase().includes(search.toLowerCase())));
  const total = (student) => Number(student.internal || 0) + Number(student.external || 0);
  const grade = (marks) => marks >= 85 ? "A" : marks >= 70 ? "B" : marks >= 55 ? "C" : marks >= 40 ? "D" : "F";
  function updateMark(id, field, rawValue, maximum) { const value = rawValue === "" ? "" : Math.min(maximum, Math.max(0, Number(rawValue))); setRecords((current) => current.map((student) => student.id === id ? { ...student, [field]: value } : student)); setFeedback(false); }
  const passCount = filtered.filter((student) => total(student) >= 40).length;
  const average = filtered.length ? Math.round(filtered.reduce((sum, student) => sum + total(student), 0) / filtered.length) : 0;
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>ACADEMIC MANAGEMENT</SectionLabel><h1>Examination Results & Marks</h1><p>Edit sample marks to calculate totals and grades.</p></div><span className="admin-demo-badge">DEMO MODE</span></div><div className="records-summary"><div><span>Students Displayed</span><strong>{filtered.length}</strong></div><div><span>Students Passing</span><strong>{passCount}</strong></div><div><span>Average Marks</span><strong>{average}/100</strong></div></div><section className="records-panel"><label className="records-search-label" htmlFor="results-search">Search student, ID, department or subject</label><input id="results-search" className="records-search" type="search" value={search} placeholder="Type to search..." onChange={(event) => setSearch(event.target.value)}/><div className="records-table-wrapper"><table className="records-table"><thead><tr><th>Student ID</th><th>Student</th><th>Subject</th><th>Internal /25</th><th>External /75</th><th>Total /100</th><th>Grade</th></tr></thead><tbody>{filtered.length ? filtered.map((student) => <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.subject}</td><td><input className="marks-input" type="number" min="0" max="25" aria-label={`Internal marks for ${student.name}`} value={student.internal} onChange={(event) => updateMark(student.id, "internal", event.target.value, 25)}/></td><td><input className="marks-input" type="number" min="0" max="75" aria-label={`External marks for ${student.name}`} value={student.external} onChange={(event) => updateMark(student.id, "external", event.target.value, 75)}/></td><td>{total(student)}</td><td><span className="attendance-chip">{grade(total(student))}</span></td></tr>) : <tr><td colSpan="7" className="records-empty">No matching results found.</td></tr>}</tbody></table></div><button className="btn btn-primary" type="button" onClick={() => setFeedback(true)}>Save Marks (Demo)</button>{feedback && <p role="status" className="form-note">Marks are updated in this page only; they have not been saved to a database.</p>}<DemoNote>Sample data and illustrative grade rules. Changes are temporary.</DemoNote></section></main>;
}

export function TimetableCalendar() {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const schedule = [
    { id: 1, day: "Monday", time: "09:00 AM", subject: "Data Structures", department: departments[0].name, year: "II Year", room: "Lab 1" },
    { id: 2, day: "Monday", time: "11:00 AM", subject: "Machine Learning", department: departments[1].name, year: "III Year", room: "Room 201" },
    { id: 3, day: "Tuesday", time: "10:00 AM", subject: "Database Management Systems", department: departments[0].name, year: "II Year", room: "Room 102" },
    { id: 4, day: "Wednesday", time: "09:00 AM", subject: "Electronic Circuits", department: departments[2].name, year: "II Year", room: "Lab 2" },
    { id: 5, day: "Thursday", time: "02:00 PM", subject: "Thermodynamics", department: departments[4].name, year: "III Year", room: "Room 305" },
    { id: 6, day: "Friday", time: "11:00 AM", subject: "Electrical Machines", department: departments[3].name, year: "II Year", room: "Lab 3" },
  ];
  const events = [
    { id: 1, date: "05", month: "NOV", title: "Internal Examination", description: "Check the official examination timetable." },
    { id: 2, date: "12", month: "NOV", title: "Technical Workshop", description: "Details and registration to be announced." },
    { id: 3, date: "20", month: "NOV", title: "Project Review", description: "Confirm schedules with your department." },
  ];
  const filtered = schedule.filter((item) => (selectedDay === "All Days" || item.day === selectedDay) && (selectedDepartment === "All Departments" || item.department === selectedDepartment));
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>ACADEMIC PLANNER</SectionLabel><h1>Timetable & Academic Calendar</h1><p>View class schedules and important academic events.</p></div><span className="admin-demo-badge">DEMO DATA</span></div><section className="records-panel"><h2>Weekly Class Timetable</h2><div className="timetable-filters"><label>Select Day<select className="records-search" value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>{["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => <option key={day}>{day}</option>)}</select></label><label>Select Department<select className="records-search" value={selectedDepartment} onChange={(event) => setSelectedDepartment(event.target.value)}><option>All Departments</option>{departments.filter((item) => item.id !== 6).map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label></div><div className="records-table-wrapper"><table className="records-table"><thead><tr>{["Day", "Time", "Subject", "Department", "Year", "Room"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{filtered.length ? filtered.map((item) => <tr key={item.id}><td>{item.day}</td><td>{item.time}</td><td>{item.subject}</td><td>{item.department}</td><td>{item.year}</td><td>{item.room}</td></tr>) : <tr><td colSpan="6" className="records-empty">No classes match your selection.</td></tr>}</tbody></table></div></section><section className="timetable-events"><SectionLabel>IMPORTANT DATES</SectionLabel><h2>Academic Calendar & Events</h2><div className="timetable-event-grid">{events.map((event) => <article className="timetable-event-card" key={event.id}><div className="timetable-event-date"><strong>{event.date}</strong><span>{event.month}</span></div><div><h3>{event.title}</h3><p>{event.description}</p></div></article>)}</div></section><DemoNote>All timetable entries and event dates are illustrative sample data.</DemoNote></main>;
}

export function AcademicManagement() {
  const [activeTab, setActiveTab] = useState("courses");
  const [courseList, setCourseList] = useState(courses);
  const [facultyList, setFacultyList] = useState(faculty);
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("4 Years");
  const [facultyName, setFacultyName] = useState("");
  const [facultyDepartment, setFacultyDepartment] = useState("");
  function addCourse(event) { event.preventDefault(); if (!courseName.trim()) return; setCourseList((current) => [...current, { id: Date.now(), name: courseName.trim(), duration: courseDuration }]); setCourseName(""); setCourseDuration("4 Years"); }
  function addFaculty(event) { event.preventDefault(); if (!facultyName.trim() || !facultyDepartment.trim()) return; setFacultyList((current) => [...current, { id: Date.now(), name: facultyName.trim(), department: facultyDepartment.trim() }]); setFacultyName(""); setFacultyDepartment(""); }
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>COLLEGE ADMINISTRATION</SectionLabel><h1>Faculty & Course Management</h1><p>Add and remove items from these demonstration lists.</p></div><span className="admin-demo-badge">DEMO MODE</span></div><div className="management-tabs"><button type="button" className={`btn ${activeTab === "courses" ? "btn-primary" : ""}`} onClick={() => setActiveTab("courses")}>Manage Courses</button><button type="button" className={`btn ${activeTab === "faculty" ? "btn-primary" : ""}`} onClick={() => setActiveTab("faculty")}>Manage Faculty</button></div>
    {activeTab === "courses" && <section className="records-panel"><h2>Manage Academic Courses</h2><form className="management-form" onSubmit={addCourse}><label>Course Name<input className="records-search" value={courseName} onChange={(event) => setCourseName(event.target.value)} placeholder="Enter course name" required /></label><label>Course Duration<select className="records-search" value={courseDuration} onChange={(event) => setCourseDuration(event.target.value)}><option>4 Years</option><option>3 Years</option><option>2 Years</option><option>1 Year</option></select></label><button type="submit" className="btn btn-primary">+ Add Course</button></form><div className="management-list">{courseList.map((course) => <div className="management-row" key={course.id}><div><strong>{course.name}</strong><p>Duration: {course.duration}</p></div><button type="button" className="management-delete" onClick={() => setCourseList((current) => current.filter((item) => item.id !== course.id))}>Remove</button></div>)}</div></section>}
    {activeTab === "faculty" && <section className="records-panel"><h2>Manage Faculty Members</h2><form className="management-form" onSubmit={addFaculty}><label>Faculty Name<input className="records-search" value={facultyName} onChange={(event) => setFacultyName(event.target.value)} placeholder="Enter faculty name" required /></label><label>Department<input className="records-search" value={facultyDepartment} onChange={(event) => setFacultyDepartment(event.target.value)} placeholder="Enter department" required /></label><button type="submit" className="btn btn-primary">+ Add Faculty</button></form><div className="management-list">{facultyList.map((person) => <div className="management-row" key={person.id}><div><strong>{person.name}</strong><p>{person.department}</p></div><button type="button" className="management-delete" onClick={() => setFacultyList((current) => current.filter((item) => item.id !== person.id))}>Remove</button></div>)}</div></section>}
    <DemoNote>Demonstration only. Changes are temporary and are not saved to a database or reflected in other pages.</DemoNote></main>;
}

export function NoticesManagement() {
  const [noticeList, setNoticeList] = useState(notices);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function addNotice(event) { event.preventDefault(); if (!title.trim() || !description.trim()) return; setNoticeList((current) => [...current, { id: Date.now(), title: title.trim(), description: description.trim() }]); setTitle(""); setDescription(""); }
  function removeNotice(id) { setNoticeList((current) => current.filter((notice) => notice.id !== id)); }
  return <main className="container student-records-page"><div className="admin-heading"><div><SectionLabel>COLLEGE ADMINISTRATION</SectionLabel><h1>Notices Management</h1><p>Create and remove sample college announcements.</p></div><span className="admin-demo-badge">DEMO MODE</span></div><section className="records-panel"><h2>Add a New Notice</h2><form className="management-form" onSubmit={addNotice}><label>Notice Title<input className="records-search" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter notice title" required /></label><label>Notice Description<textarea className="records-search" rows="3" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter notice details" required /></label><button type="submit" className="btn btn-primary">+ Add Notice</button></form><h2>Published Notices ({noticeList.length})</h2><div className="management-list">{noticeList.length ? noticeList.map((notice) => <article className="management-row" key={notice.id}><div><strong>{notice.title}</strong><p>{notice.description}</p></div><button type="button" className="management-delete" onClick={() => removeNotice(notice.id)}>Remove</button></article>) : <p>No notices available. Add your first notice above.</p>}</div></section><DemoNote>Demonstration only. Changes are temporary and are not saved to the database or reflected on other pages.</DemoNote></main>;
}

export function NotFound() {
  return <main className="container page-content"><h1>Page Not Found</h1><p>The page you requested could not be found.</p><Link to="/" className="btn btn-primary">Return Home</Link></main>;
}

const navigation = [
  ["Home", "/", true],
  ["About Us", "/about"],
  ["Courses", "/courses"],
  ["Departments", "/departments"],
  ["Faculty", "/faculty"],
  ["Notices", "/notices"],
  ["Student Login", "/student-login"],
  ["Student Dashboard", "/student-dashboard"],
  ["Faculty Portal", "/faculty-dashboard"],
  ["Attendance", "/attendance-management"],
  ["Results & Marks", "/results-management"],
  ["Timetable", "/timetable-calendar"],
  ["Admin Dashboard", "/admin-dashboard"],
  ["Admin Login", "/admin-login"],
  ["Admission Management", "/admin-admissions"],
  ["Student Records", "/student-records"],
  ["Faculty & Course Management", "/academic-management"],
  ["Notices Management", "/notices-management"],
];

export default function App() {
  return (
    <>
      <header className="navbar">
        <Link to="/" className="brand">
          <span className="brand-mark">N</span>
          <span>
            <strong>{college.name}</strong>
            <small>{college.location}</small>
          </span>
        </Link>

        <nav>
          {navigation.map(([label, path, end]) => (
            <NavLink key={path} to={path} end={end}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/admissions" className="nav-admission">
            Admissions
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/admissions" element={<Admissions />} />

        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        <Route path="/attendance-management" element={<AttendanceManagement />} />
        <Route path="/results-management" element={<ResultsManagement />} />
        <Route path="/timetable-calendar" element={<TimetableCalendar />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-admissions" element={<AdminAdmissions />} />
        <Route path="/student-records" element={<StudentRecords />} />
        <Route path="/academic-management" element={<AcademicManagement />} />
        <Route path="/notices-management" element={<NoticesManagement />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              {college.name}
            </Link>
            <p>{college.tagline}</p>
            <p>{college.location}</p>
          </div>

          <div>
            <h3>Explore</h3>
            <Link to="/courses">Courses</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/notices">Notices &amp; Events</Link>
          </div>

          <div>
            <h3>Admissions</h3>
            <Link to="/admissions">Admission Enquiry</Link>
            <p>Contact the college for official admission details.</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {college.name}. Website demonstration.
        </div>
      </footer>
    </>
  );
}
