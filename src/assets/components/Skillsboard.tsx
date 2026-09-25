const groups = [
  { number: "01", title: "Agriculture", copy: "College-level knowledge and hands-on skills for productive, responsible farming.", items: ["Crop Production NC III", "Genetics", "Plant Science", "Machinery Operation", "Livestock Care", "Pest Control", "Technical Support & Farmer Extension", "Agricultural Trainings, Seminars & Demonstrations"] },
  { number: "02", title: "Teaching", copy: "Practical tools for thoughtful, student-centered instruction.", items: ["Lesson Planning", "Classroom Management", "Student Assessment"] },
  { number: "03", title: "Digital", copy: "Everyday technology for clear and engaging learning materials.", items: ["Microsoft Office", "Presentations", "Canva"] },
  { number: "04", title: "Communication", copy: "Connecting with students and communities across languages.", items: ["English", "Bisaya", "Tagalog", "Leadership"] },
];
export default function SkillsBoard() { return <div className="skills-grid">{groups.map((group) => <article className="skill-group" key={group.title}><div className="skill-number">{group.number}</div><h3>{group.title}</h3><p>{group.copy}</p><ul>{group.items.map((item) => <li key={item}>{item}<span>↗</span></li>)}</ul></article>)}</div>; }
