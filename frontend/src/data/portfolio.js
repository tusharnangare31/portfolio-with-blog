export const personalInfo = {
  name: "Tushar Nangare",
  role: "Python Full Stack Developer",
  tagline:
    "Building and shipping full-stack applications end to end — from React/Next.js to cloud-native deployments.",
  about:
    "Information Technology graduate (2026) building and shipping full-stack applications end to end — React/React Native and Next.js front-ends with Supabase/PostgreSQL back-ends, containerized and deployed through automated CI/CD pipelines. Solid base in Data Structures, Algorithms, and OOP from consistent LeetCode practice, plus cloud infrastructure and DevOps experience taking applications reliably into production.",
  email: "tusharnangare311003@gmail.com",
  phone: "+91-7499404445",
  x: "https://x.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://youtube.com/",
  github: "https://github.com/tusharnangare31",
  linkedin: "https://www.linkedin.com/in/tushar-nangare/",
  codeforces: "",
  leetcode: "https://leetcode.com/u/tusharnangare/",
};

export const skills = {
  "Programming & Scripting": [
    "Python",
    "TypeScript",
    "Shell Scripting",
    "Bash",
  ],
  "Front-End Development": [
    "React",
    "React Native",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
  ],
  "Back-End & Databases": [
    "Supabase",
    "PostgreSQL",
    "Python Full Stack",
    "REST APIs",
    "MySQL",
  ],
  "Application Deployment & CI/CD": [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub Actions (CI/CD)",
  ],
  "Cloud & Infrastructure": [
    "AWS EC2",
    "AWS ECS",
    "AWS ECR",
    "ALB",
    "AWS WAF",
    "Route 53",
    "IAM",
    "Terraform",
    "Ansible",
  ],
  "CS Fundamentals & OS": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (OOP)",
    "Ubuntu",
    "RedHat Linux",
  ],
};

export const projects = {
  "Full Stack & Mobile": [
    {
      id: 1,
      title: "StayDirect — Hostel & PG Discovery Platform",
      date: "2026",
      description:
        "Mobile platform connecting students with hostel and PG owners through searchable, filterable listings and Supabase workflows.",
      longDescription:
        "Developed a cross-platform mobile platform connecting students with hostel and PG owners through searchable and filterable listings. Implemented role-based authentication for students and hostel owners, with dedicated dashboards and profile management. Designed hostel listing, room details, amenities, pricing, availability, and enquiry workflows using Supabase backend services and PostgreSQL.",
      tech: [
        "React Native",
        "Supabase",
        "PostgreSQL",
        "TypeScript",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/TrustTrade.png",
      problem:
        "Students need a reliable, seamless mobile experience to discover verified hostels and PGs with transparent pricing and direct owner enquiries.",
      approach:
        "Built a cross-platform mobile app using React Native, backed by Supabase for real-time data streaming, authentication, and PostgreSQL storage.",
      features: [
        "Searchable & Filterable Hostel/PG Listings",
        "Role-based Student & Owner Authentication",
        "Dedicated Dashboards & Profile Management",
        "Room Details, Amenities, Pricing & Enquiry Workflows",
      ],
      learnings:
        "Mastered mobile state management with React Native and TypeScript, real-time database architecture with Supabase, and PostgreSQL relations.",
      icon: "📱",
    },
    {
      id: 2,
      title: "Solar Business Website",
      date: "2026",
      description:
        "Responsive business website for showcasing solar products and clean energy services with a modern, conversion-focused UI.",
      longDescription:
        "Developed a responsive business website for showcasing solar products and services with a modern, conversion-focused UI. Built reusable components for hero sections, product/service cards, business information, and contact sections, optimized across devices with Next.js and Tailwind CSS.",
      tech: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/CliQ.png",
      problem:
        "Solar and clean energy businesses require an engaging, high-speed website that effectively converts visitor traffic into qualified customer inquiries.",
      approach:
        "Leveraged Next.js for server-rendered speed and SEO, along with Tailwind CSS for a custom, modern, device-responsive design system.",
      features: [
        "Modern, High-Conversion User Interface",
        "Modular Hero & Product/Service Showcase Cards",
        "Lead Inquiries & Interactive Contact Workflows",
        "Mobile-First Responsive Layout & SEO Optimization",
      ],
      learnings:
        "Deepened understanding of Next.js performance optimizations, component reusability, and conversion-driven front-end design.",
      icon: "☀️",
    },
  ],
  "Cloud & DevOps": [
    {
      id: 3,
      title: "DevBoard — Full Stack Progress Tracker",
      date: "2026",
      description:
        "Full-stack progress-tracking app with kanban-board workflows, Docker containerization, and automated CI/CD deployment pipelines.",
      longDescription:
        "Built a full-stack progress-tracking application with kanban-board style workflow features, covering both front-end and back-end services. Containerized the front-end and back-end services with Dockerfiles and automated the complete development and deployment pipeline using GitHub Actions, Terraform, and Ansible.",
      tech: [
        "Docker",
        "GitHub Actions",
        "Terraform",
        "Kubernetes",
        "Ansible",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/Analytica.png",
      problem:
        "Teams need an integrated progress tracking workflow with predictable, reproducible, and automated infrastructure deployments.",
      approach:
        "Developed a multi-tier containerized stack orchestrated with Docker and Kubernetes, backed by automated GitHub Actions CI/CD and Terraform IaC.",
      features: [
        "Kanban-Style Task & Progress Management",
        "Multi-Container Docker Architecture",
        "Automated GitHub Actions CI/CD Pipeline",
        "Infrastructure as Code with Terraform & Ansible",
      ],
      learnings:
        "Gained deep hands-on expertise in end-to-end DevOps workflows, container orchestration, and declarative infrastructure automation.",
      icon: "📋",
    },
    {
      id: 4,
      title: "Cloud-Native Application Deployment",
      date: "2026",
      description:
        "Deployed a Dockerized web application on AWS EC2 using Launch Templates, Auto Scaling Groups, ALB, and AWS WAF.",
      longDescription:
        "Deployed a Dockerized web application on AWS EC2 using Launch Templates and Auto Scaling Groups, backed by an Application Load Balancer (ALB) for traffic distribution and CPU-based scaling, secured with AWS WAF.",
      tech: [
        "AWS EC2",
        "Docker",
        "Auto Scaling",
        "ALB",
        "AWS WAF",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/RiskLens.png",
      problem:
        "Handling dynamic web traffic surges with high availability, self-healing server infrastructure, and web exploit protection.",
      approach:
        "Architected scalable AWS infrastructure with Auto Scaling Groups, Launch Templates, ALB health checks, and AWS WAF rule sets.",
      features: [
        "Dockerized Web App on AWS EC2",
        "CPU-Based Auto Scaling & Launch Templates",
        "Application Load Balancer Traffic Routing",
        "AWS WAF Threat & Exploit Mitigation",
      ],
      learnings:
        "Mastered AWS cloud architecture, auto scaling elasticity, traffic management, and cloud security defense in depth.",
      icon: "☁️",
    },
  ],
};

export const education = [
  {
    college: "PES Modern College of Engineering, Pune",
    degree: "BE – Information Technology",
    duration: "2022 – 2026",
    result: "Graduate (2026)",
    details:
      "Information Technology degree focusing on full-stack application development, Data Structures, OOP, and Cloud/DevOps. Coordinated with the student community to organize college-fest events and presented final-year project to the department faculty and 120 students.",
  },
  {
    college: "Rahuri Education Society",
    degree: "Higher Secondary Certificate (HSC)",
    duration: "2020 – 2022",
    result: "Science Stream",
    details: "Science stream with coursework in Physics, Chemistry, and Mathematics.",
  },
  {
    college: "SPVM, Rahuri",
    degree: "Secondary School Certificate (SSC)",
    duration: "2019 – 2020",
    result: "Class X",
    details: "Foundational coursework in science, mathematics, and computing fundamentals.",
  },
];

export const miniProjects = [
  {
    title: "StayDirect Mobile App",
    tech: "React Native, Supabase",
    description:
      "Searchable hostel & PG discovery platform with role-based auth and owner dashboards.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "Solar Business Platform",
    tech: "Next.js, Tailwind CSS",
    description:
      "High-performance website with responsive product cards, service showcases, and lead workflows.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "DevBoard Progress Tracker",
    tech: "Docker, K8s, Terraform",
    description:
      "Full-stack kanban tracker containerized with Docker and deployed via GitHub Actions CI/CD.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "Cloud-Native App Deployment",
    tech: "AWS EC2, ALB, WAF",
    description:
      "Dockerized deployment with Launch Templates, Auto Scaling, ALB traffic balancing, and WAF.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "CI/CD Deployment Pipeline",
    tech: "GitHub Actions, AWS",
    description:
      "Automated build, test, container packaging, and AWS Route 53 DNS deployment workflows.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "LeetCode DSA Solutions",
    tech: "Python, DSA, OOP",
    description:
      "Curated repository of optimized data structures, algorithms, and OOP problem solutions.",
    link: "https://leetcode.com/u/tusharnangare/",
    active: true,
  },
  {
    title: "Ansible & Terraform IaC",
    tech: "Terraform, Ansible",
    description:
      "Infrastructure-as-code configuration scripts for automated server provisioning on AWS.",
    link: "#",
    active: false,
  },
  {
    title: "PostgreSQL Database Schema",
    tech: "PostgreSQL, SQL",
    description:
      "Optimized relational schemas, indexing, and role-based access control policies.",
    link: "#",
    active: false,
  },
  {
    title: "Shell Script Automation",
    tech: "Bash, Linux",
    description:
      "Automation scripts for environment setup, container health checks, and server maintenance.",
    link: "#",
    active: false,
  },
  {
    title: "AWS ECS Container Cluster",
    tech: "AWS ECS, ECR, IAM",
    description:
      "Container orchestration with ECR image registry and IAM role-based access controls.",
    link: "#",
    active: false,
  },
];

export const achievements = [
  {
    name: "Brandspark Technology Internship",
    date: "April 2026",
    provider: "Brandspark Technology",
    details:
      "Built Docker containers and automated complete application workflows using GitHub Actions CI/CD, deploying to AWS and managing DNS with Route 53.",
    link: "#",
  },
  {
    name: "Infosys Springboard Virtual Internship 6.0 (AI/DS)",
    date: "August 2025",
    provider: "Infosys Springboard",
    details:
      "Selected for the competitive AI/DS virtual internship program. Worked on machine learning workflows covering data preprocessing, model training, and deployment on cloud-based AI/DS projects.",
    link: "#",
  },
  {
    name: "Python Full Stack Development",
    date: "2025",
    provider: "AICTE Internship",
    details:
      "Comprehensive full-stack development program covering Python, database architecture, backend APIs, and web application deployment.",
    link: "#",
  },
  {
    name: "Python Essentials I & II",
    date: "2025",
    provider: "Cisco (Python Institute)",
    details:
      "In-depth Python programming certification validating core proficiency, Data Structures, OOP principles, and scripting capabilities.",
    link: "#",
  },
  {
    name: "Docker Training for Beginners",
    date: "2025",
    provider: "KodeKloud",
    details:
      "Hands-on Docker training covering containerization fundamentals, Dockerfiles, multi-stage builds, and container networking.",
    link: "#",
  },
  {
    name: "Kubernetes for the Absolute Beginners",
    date: "2025",
    provider: "KodeKloud",
    details:
      "Kubernetes fundamentals including Pods, Deployments, Services, ConfigMaps, and cluster orchestration concepts.",
    link: "#",
  },
  {
    name: "AI/ML Virtual Internship",
    date: "2025",
    provider: "Google Developers",
    details:
      "Machine learning models, dataset preprocessing, training pipelines, and intelligent application development.",
    link: "#",
  },
  {
    name: "Data Science Fundamentals",
    date: "2025",
    provider: "Scaler Topics",
    details:
      "Exploratory data analysis, statistical methods, Python data tooling, and algorithm design fundamentals.",
    link: "#",
  },
];
