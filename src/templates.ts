import { CVData } from './types';

export const TEMPLATES: Record<string, { name: string; icon: string; data: CVData }> = {
  developer: {
    name: "Madiha Aamir",
    icon: "Code",
    data: {
      personal: {
        fullName: "Madiha Aamir",
        title: "Software Engineer & IT Project Coordinator",
        email: "madihaaamir2004@gmail.com",
        phone: "+92 335 4348189",
        website: "https://www.rehmanpublicschool.com",
        github: "github.com",
        linkedin: "linkedin.com/in/madihaaamir",
        location: "Karachi, Pakistan",
        summary: "Adaptive, detail-oriented Computer Science undergraduate (8th Semester) with specialized experience in IT Project Management (PMO) and full-stack MERN development. Proven capability in coordinating IT projects, tracking critical milestones, and developing robust modern web solutions. Skilled in database design, backend services, and building highly responsive client interfaces."
      },
      experience: [
        {
          id: "madiha-exp-1",
          role: "PMO Intern",
          company: "UBL – IT Project Management Office",
          location: "Karachi, Pakistan",
          startDate: "Aug 2025",
          endDate: "Oct 2025",
          current: false,
          bullets: [
            "Assisted in active coordination and tracking of major IT projects, consolidating daily sprint logs, and translating complex metrics into actionable status reports for senior directors.",
            "Gained comprehensive, hands-on exposure to standard industry project planning frameworks, risk analysis, task scheduling, and cross-departmental resource orchestration."
          ]
        }
      ],
      education: [
        {
          id: "madiha-edu-1",
          degree: "Bachelor of Computer Science (BSCS)",
          institution: "Bahria University Karachi Campus",
          location: "Karachi, Pakistan",
          startDate: "Spring 2023",
          endDate: "Present",
          details: "Currently in 8th Semester. Completed rigorous coursework including: Data Structures & Algorithms, Database Management Systems, Software Project Management, Software Requirement Engineering, and Web Development."
        }
      ],
      projects: [
        {
          id: "madiha-proj-rehman",
          title: "Rehman Public School Web Portal",
          role: "Lead Full-Stack Web Developer",
          description: "Designed, engineered, and successfully deployed a responsive live web application for Rehman Public School featuring an eye-safe, professional dark theme. Integrates curriculum updates, parent-teacher inquiry portals, and interactive administration dashboards, streamlining community coordination.",
          technologies: ["React.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
          link: "https://www.rehmanpublicschool.com"
        },
        {
          id: "madiha-proj-1",
          title: "E-Commerce Jewelry Store",
          role: "Developer",
          description: "An advanced, secure MERN Stack online retail portal integrated with bulletproof JWT session authentication, intuitive shopping carts, and simulated checkout flow systems.",
          technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"]
        },
        {
          id: "madiha-proj-2",
          title: "Match-Making Application",
          role: "Database & Backend Developer",
          description: "A highly robust relational database application connecting users based on lifestyle filters and secure data matchmaking structures using optimized SQL query modules.",
          technologies: ["Java", "SQL", "JDBC", "Database Design", "MS Access"]
        },
        {
          id: "madiha-proj-3",
          title: "Mini Compiler for Procedural Language",
          role: "Compiler Developer",
          description: "Built a fully functional procedural compiler engine in Python to systematically tokenize, parse, and analyze syntactic compliance for a custom subset of C language.",
          technologies: ["Python", "Lexical Analysis", "Compiler Design", "Regex"]
        },
        {
          id: "madiha-proj-4",
          title: "Theatre Management System",
          role: "Lead Software Architect",
          description: "An object-oriented seat booking and show scheduler suite enhancing real-time ticketry management, seat map arrays, and theater operational flows.",
          technologies: ["Java", "OOP", "Swing UI", "SQL"]
        },
        {
          id: "madiha-proj-5",
          title: "Sports Club Management System",
          role: "Java Developer",
          description: "A clean Java-based application organizing player rosters, tournament charts, team statistics, and game event scheduling lists.",
          technologies: ["Java OOP", "Relational Database", "Data Modeling"]
        }
      ],
      skills: [
        {
          id: "madiha-skills-1",
          categoryName: "Programming & Web Stack",
          skills: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS", "MERN Stack", "NestJS", "React.js", "Node.js", "Express.js"]
        },
        {
          id: "madiha-skills-2",
          categoryName: "Databases & Tools",
          skills: ["PostgreSQL", "SQL", "MongoDB", "MS Access", "Git", "GitHub", "VS Code", "REST APIs"]
        },
        {
          id: "madiha-skills-3",
          categoryName: "Project Management & Power Skills",
          skills: ["Project Planning", "Risk Management", "Scheduling", "Milestone Tracking", "Reporting", "Teamwork", "Problem-Solving", "Adaptability"]
        }
      ],
      certifications: [
        "Certificate of Participation in Query Quest",
        "PMO Internship Certificate – UBL"
      ]
    }
  }
};

