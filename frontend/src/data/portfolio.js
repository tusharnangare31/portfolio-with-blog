export const personalInfo = {
  name: "Tushar Nangare",
  role: "Aspiring DevOps Engineer",
  tagline:
    "I don't just deploy code — I build resilient, automated infrastructure.",
  about:
    "Final-year Information Technology student with hands-on experience in Linux, Shell Scripting, Git, GitHub, Docker, and AWS. Passionate about DevOps, cloud infrastructure, automation, and containerized application deployment. Experienced in deploying applications on AWS using Docker and currently expanding expertise in Kubernetes and CI/CD practices through practical projects and continuous learning.",
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
  "Programming & Scripting": ["Python", "Bash", "Shell Scripting", "Java"],
  "Cloud & AWS": [
    "AWS EC2",
    "Auto Scaling",
    "Load Balancer",
    "ECS",
    "ECR",
    "IAM",
    "AWS WAF",
  ],
  "Containers & DevOps": [
    "Docker",
    "Kubernetes",
    "Jenkins",
    "CI/CD",
    "Git",
    "GitHub",
  ],
  "Databases": [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
  ],
  "OS & Concepts": [
    "Linux (Ubuntu)",
    "Networking Fundamentals",
    "Cloud Computing",
    "Containerization",
  ],
};

export const projects = {
  "Cloud & DevOps": [
    {
      id: 1,
      title: "Cloud-Native App Deployment",
      date: "2026",
      description:
        "Deployed a Dockerized web application on AWS EC2 using Launch Templates and Auto Scaling Groups with Application Load Balancer and AWS WAF security.",
      longDescription:
        "Built a production-ready cloud deployment pipeline on AWS. Deployed a Dockerized web application on EC2 using Launch Templates and Auto Scaling Groups. Configured Application Load Balancer (ALB) for distributing traffic efficiently and implemented CPU-based Auto Scaling policies. Secured the application with AWS WAF to protect against common web exploits.",
      tech: [
        "AWS EC2",
        "Docker",
        "Auto Scaling",
        "ALB",
        "AWS WAF",
        "Launch Templates",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/cloud-native.png",
      problem:
        "Need for a scalable, secure cloud deployment pipeline that handles traffic spikes and protects against web threats.",
      approach:
        "Used AWS Auto Scaling with CPU-based policies and ALB for traffic distribution. Secured with WAF rules.",
      features: [
        "Docker Containerization",
        "Auto Scaling Groups",
        "Application Load Balancer",
        "AWS WAF Security",
      ],
      learnings:
        "Gained deep understanding of AWS infrastructure, auto scaling policies, and cloud security best practices.",
      icon: "☁️",
    },
    {
      id: 2,
      title: "ECS Container Deployment",
      date: "2026",
      description:
        "Built Docker images and deployed applications using Amazon ECS with ECR for image management and IAM for secure access control.",
      longDescription:
        "Implemented a full container deployment workflow on AWS ECS. Built Docker images and pushed them to Amazon Elastic Container Registry (ECR). Configured IAM roles and policies for secure container deployment. Created an ECS cluster and deployed applications using ECS tasks and services for orchestrated container management.",
      tech: [
        "AWS ECS",
        "Docker",
        "ECR",
        "IAM",
        "AWS EC2",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/ecs-deployment.png",
      problem:
        "Managing containerized application deployments at scale with proper security and orchestration.",
      approach:
        "Used ECS for container orchestration with ECR for image management and IAM for role-based access control.",
      features: [
        "Docker Image Management",
        "ECR Registry",
        "IAM Security Policies",
        "ECS Task Orchestration",
      ],
      learnings:
        "Mastered AWS container services ecosystem and security-first deployment practices.",
      icon: "🐳",
    },
  ],
  "AI & Machine Learning": [
    {
      id: 3,
      title: "Brain Tumor Detection",
      date: "2026",
      description:
        "Built a brain tumor detection system using deep learning for MRI image classification with LLM-based medicine recommendations.",
      longDescription:
        "Developed a comprehensive brain tumor detection and medicine prediction system using Generative AI. Built a CNN-based deep learning model for MRI image classification to detect brain tumors. Integrated LLM-based medicine recommendations and medical insights for actionable results. Created a web interface using Django for real-time predictions and AI-generated responses.",
      tech: [
        "Python",
        "CNN",
        "LLM",
        "Django",
        "Deep Learning",
        "Generative AI",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/brain-tumor.png",
      problem:
        "Need for automated, accurate brain tumor detection from MRI scans with actionable medical insights.",
      approach:
        "Combined CNN for image classification with LLM for generating medicine recommendations and medical insights.",
      features: [
        "MRI Image Classification",
        "LLM Medicine Prediction",
        "Real-time Web Interface",
        "AI-Generated Insights",
      ],
      learnings:
        "Gained expertise in deep learning for medical imaging and integrating LLMs into practical applications.",
      icon: "🧠",
    },
  ],
  "Web Development": [
    {
      id: 4,
      title: "Poetry Blogging Platform",
      date: "2026",
      description:
        "A full-stack blogging platform allowing users to create, share, and manage poems with authentication and database integration.",
      longDescription:
        "Developed a poetry blogging platform using Django and PostgreSQL. Implemented user authentication, content management, and robust database integration. Users can create, edit, and share their poems with the community. Built with a clean, responsive interface focused on readability and user experience.",
      tech: [
        "Django",
        "PostgreSQL",
        "Python",
        "HTML/CSS",
        "Authentication",
      ],
      github: "https://github.com/tusharnangare31",
      live: "#",
      image: "/poetry-blog.png",
      problem:
        "Need for a dedicated platform for poets to share their work with proper content management.",
      approach:
        "Built a full-stack Django application with PostgreSQL backend and user authentication system.",
      features: [
        "User Authentication",
        "Content Management",
        "PostgreSQL Integration",
        "Responsive Design",
      ],
      learnings:
        "Strengthened full-stack development skills with Django and database design.",
      icon: "📝",
    },
  ],
};

export const education = [
  {
    college: "PES Modern College of Engineering, Pune",
    degree: "Bachelor of Engineering (Information Technology)",
    duration: "2022 - 2026",
    result: "CGPA: 8.33",
    details: "Focusing on DevOps, Cloud Computing, and Software Engineering.",
  },
  {
    college: "Rahuri Education Society",
    degree: "HSC (Class XII)",
    duration: "2020 - 2022",
    result: "",
    details: "Science stream with focus on Physics, Chemistry, and Mathematics.",
  },
  {
    college: "SPVM, Rahuri",
    degree: "SSC (Class X)",
    duration: "2019 - 2020",
    result: "",
    details: "General science and mathematics foundation.",
  },
];

export const miniProjects = [
  {
    title: "Cloud-Native Deployment",
    tech: "AWS, Docker",
    description:
      "Deployed Dockerized apps on AWS EC2 with Auto Scaling, ALB, and WAF security controls.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "ECS Container Deploy",
    tech: "AWS ECS, ECR",
    description:
      "Built Docker images, pushed to ECR, and orchestrated with ECS tasks and services.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "Brain Tumor Detector",
    tech: "Python, CNN, LLM",
    description:
      "Deep learning MRI classification with LLM-powered medicine prediction.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "Poetry Blog",
    tech: "Django, PostgreSQL",
    description:
      "Full-stack blogging platform with authentication and content management.",
    link: "https://github.com/tusharnangare31",
    active: true,
  },
  {
    title: "Shell Script Utils",
    tech: "Bash, Linux",
    description:
      "Collection of automation scripts for server provisioning and maintenance.",
    link: "#",
    active: false,
  },
  {
    title: "Jenkins Pipeline",
    tech: "Jenkins, Docker",
    description:
      "CI/CD pipeline for automated build, test, and deployment workflows.",
    link: "#",
    active: false,
  },
  {
    title: "K8s Cluster Setup",
    tech: "Kubernetes",
    description:
      "Local Kubernetes cluster setup with pods, deployments, and services.",
    link: "#",
    active: false,
  },
  {
    title: "Portfolio V1",
    tech: "HTML, CSS",
    description:
      "My first portfolio website built with raw HTML and CSS.",
    link: "https://tusharnangare.netlify.app/",
    active: true,
  },
  {
    title: "MySQL Admin Tool",
    tech: "Python, MySQL",
    description:
      "Database administration utility for backup, restore, and monitoring.",
    link: "#",
    active: false,
  },
  {
    title: "Network Monitor",
    tech: "Python, Bash",
    description:
      "Automated network monitoring script with alerting capabilities.",
    link: "#",
    active: false,
  },
  {
    title: "Docker Compose Stack",
    tech: "Docker Compose",
    description:
      "Multi-service application stack with web server, database, and cache.",
    link: "#",
    active: false,
  },
  {
    title: "Git Hooks Toolkit",
    tech: "Bash, Git",
    description:
      "Custom Git hooks for code quality, linting, and commit message validation.",
    link: "#",
    active: false,
  },
];

export const achievements = [
  {
    name: "Infosys Springboard Virtual Internship 6.0",
    date: "2025",
    provider: "Infosys",
    details:
      "Selected for the AI/DS virtual internship. Worked on machine learning workflows involving data preprocessing, training, and deployment with cloud-based AI/DS projects.",
    link: "#",
  },
  {
    name: "Docker Training Course for the Absolute Beginner",
    date: "2025",
    provider: "KodeKloud",
    details:
      "Comprehensive Docker training covering containerization fundamentals, Dockerfile creation, Docker networking, and container orchestration basics.",
    link: "#",
  },
  {
    name: "Kubernetes for the Absolute Beginners",
    date: "2025",
    provider: "KodeKloud",
    details:
      "Kubernetes fundamentals including pods, deployments, services, and basic cluster management.",
    link: "#",
  },
  {
    name: "Python Essentials I & II",
    date: "2025",
    provider: "Cisco (Python Institute)",
    details:
      "Comprehensive Python programming certification covering core concepts, data structures, OOP, and advanced Python features.",
    link: "#",
  },
  {
    name: "AI/ML Virtual Internship",
    date: "2025",
    provider: "Google Developers",
    details:
      "Hands-on experience with machine learning models, training workflows, and AI application development.",
    link: "#",
  },
  {
    name: "Python Full Stack Development",
    date: "2025",
    provider: "AICTE Internship",
    details:
      "Full-stack development training with Python, Django, databases, and web application deployment.",
    link: "#",
  },
];
