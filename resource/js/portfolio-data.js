// Projects data array
const projectsData = [
    {
        id: "project1",
        title: "Pharmacy Management System",
        description: "A secure full-stack application developed to manage pharmacy inventory, sales, and reporting. The system features a Laravel backend with secure RESTful APIs, JWT authentication, and role-based access control (RBAC) middleware, integrated with a modern React frontend styled with Tailwind CSS. Admins can securely manage medicines, categories, orders, and users, while customers can browse products, place orders, and manage accounts. Includes real-time inventory alerts, sales analytics, and bulk product management features.",
        technologies: ["React", "Tailwind CSS", "Laravel", "MySQL", "JWT Auth", "REST APIs"],
        images: [
            "resource/projects/1_vc_home_1.png",
            "resource/projects/2_vc_home_2.png",
            "resource/projects/3_vc_products.png",
            "resource/projects/4_vc_add_wishlist.png",
            "resource/projects/5_vc_wishlist_remove.png",
            "resource/projects/6_vc_product_cart.png",
            "resource/projects/7_vc_shopping_cart.png",
            "resource/projects/8_vc_check_out.png",
            "resource/projects/9_vc_check_out_online_payment.png",
            "resource/projects/10_vc_order_confirm_1.png",
            "resource/projects/11_vc_order_confirm_2.png",
            "resource/projects/12_vc_user_dashboard.png",
            "resource/projects/13_vc_user_home_2.png",
            "resource/projects/14_vc_user_order.png",
            "resource/projects/15_vc_user_order_history.png",
            "resource/projects/16_vc_user_profile_1.png",
            "resource/projects/17_vc_user_profile_2.png",
            "resource/projects/18_vc_user_profile_3.png",
            "resource/projects/19_vc_admin_dashboard.png",
            "resource/projects/20_vc_admin_products.png",
            "resource/projects/21_vc_admin_expire.png",
            "resource/projects/22_vc_admin_order_history.png",
            "resource/projects/23_vc_admin_reorder.png",
            "resource/projects/24_vc_admin_promotion.png",
            "resource/projects/25_vc_admin_health.png",
            "resource/projects/26_vc_admin_profile_detail.png",
            "resource/projects/27_vc_admin_profile_edit.png",
            "resource/projects/vc_login.png"
        ],
        codeLink: "https://github.com/KhantKyawLin/VitalCare",
        demoLink: "https://pharmacy-demo.example.com"
    },
    {
        id: "project2",
        title: "Food Fusion Website",
        description: "'Food Lover' FoodFusion Website is an online platform developed to promote home cooking and connect food enthusiasts through an accessible and user-friendly website. It includes a variety of features such as recipe collections, a community cookbook, and helpful cooking resources. The website is built using PHP, MySQL, and JavaScript, ensuring strong security, mobile compatibility, and ease of use. Registered users can log in and share their culinary experiences, contributing to an engaging and supportive cooking community.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP"],
        images: [
            "resource/projects/food_fusion_home.jpg",
            "resource/projects/food_fusion_recipe.jpg",
            "resource/projects/food_fusion_community.jpg",
            "resource/projects/food_fusion_culinary.jpg",
            "resource/projects/food_fusion_about.jpg",
            "resource/projects/food_fusion_user.jpg",
            "resource/projects/food_fusion_admin.jpg",
            "resource/projects/food_fusion_delete_user.jpg",
            "resource/projects/food_fusion_delete_admin.jpg"

        ],
        codeLink: "https://github.com/khantkyawlin/food-fusion",
        demoLink: "https://food-fusion.example.com"
    },
    {
        id: "project4",
        title: "Fully Responsive Developer Portfolio",
        description: "This responsive portfolio website is built on a strong foundation of Bootstrap and modern JavaScript, ensuring a seamless and intuitive experience for every visitor. It serves as a comprehensive digital showcase, effectively highlighting my diverse range of projects, a detailed overview of my technical skills, a collection of my professional certificates, and a chronological timeline of my work experience. A convenient dark/light theme toggle is included to provide a personalized and comfortable viewing experience. Ultimately, the design is meticulously optimized for both performance and accessibility, guaranteeing fast loading times and an inclusive browsing experience for all users.",
        technologies: ["HTML", "CSS", "Java-Script", "BootStrap"],
        images: [
            "resource/projects/portfolio_about.png",
            "resource/projects/portfolio_home.png",
            "resource/projects/portfolio_skills.png",
            "resource/projects/portfolio_projects.png",
            "resource/projects/portfolio_certificate.png",
            "resource/projects/portfolio_experience.png",
            "resource/projects/portfolio_contact.png",
            "resource/projects/portfolio_home_n.png",
            "resource/projects/portfolio_about_n.png",
            "resource/projects/portfolio_skills_n.png",
            "resource/projects/portfolio_projects_n.png",
            "resource/projects/portfolio_certificate_n.png",
            "resource/projects/portfolio_experience_n.png",
            "resource/projects/portfolio_contact_n.png"
        ],
        codeLink: "https://github.com/khantkyawlin/portfolio",
        demoLink: "https://khantkyawlin.com"
    },
    {
        id: "project3",
        title: "Desk_stand E-commerce Static Website",
        description: "A fully responsive and visually engaging static e-commerce website built entirely with pure HTML and CSS—no JavaScript, no frameworks. This project showcases a clean and structured layout for a fictional laptop standing desk brand, designed to demonstrate front-end development fundamentals. It contains multiple pages, Home, Products, Product Detail, Health, Cart, Contact, Login, and Register pages.",
        technologies: ["HTML", "CSS"],
        images: [

            "resource/projects/desk_stand_home_1.png",
            "resource/projects/desk_stand_home_2.png",
            "resource/projects/desk_stand_home_3.png",
            "resource/projects/desk_stand_home_4.png",
            "resource/projects/desk_stand_home_5.png",
            "resource/projects/desk_stand_products.png",
            "resource/projects/desk_stand_product_detail.png",
            "resource/projects/desk_stand_health.png",
            "resource/projects/desk_stand_cart.png",
            "resource/projects/desk_stand_contact.png",
            "resource/projects/desk_stand_login.png",
            "resource/projects/desk_stand_register.png",

        ],
        codeLink: "https://github.com/KhantKyawLin/Standing_Desk_Shopping_Website",
        demoLink: "https://food-fusion.example.com"
    },

    {
        id: "project5",
        title: "V-Fit Fitness Tracker App",
        description: "V-Fit Fitness tracker application is a C# program which can support 6 activities for clubmembers to lose weight by burning calories. In this program, users (Admins and Clubmembers) can register, set goals, choose activities, record their fitness activities, calculate their total calories burned for each activity they do, and check everyday progress information.",
        technologies: ["C#"],
        images: [
            "resource/projects/V_Fit_1.png",
            "resource/projects/V_Fit_2.png",
            "resource/projects/V_Fit_3.png",
            "resource/projects/V_Fit_4.png",
            "resource/projects/V_Fit_5.png",
            "resource/projects/V_Fit_6.png",
            "resource/projects/V_Fit_7.png",
            "resource/projects/V_Fit_8.png",
            "resource/projects/V_Fit_9.png",
            "resource/projects/V_Fit_10.png",
            "resource/projects/V_Fit_11.png",
            "resource/projects/V_Fit_12.png",
            "resource/projects/V_Fit_13.png",
            "resource/projects/V_Fit_14.png"
        ],
        codeLink: "https://github.com/KhantKyawLin/V-Fit_Fitness",
        demoLink: "https://fitness-demo.example.com"
    }, {
        id: "project6",
        title: "Fitness Tracker App (Kotlin)",
        description: "This project involves the development of a comprehensive Android fitness application utilizing a modern technology stack for a robust and scalable solution. The frontend is built with Kotlin, while a PHP backend and MySQL database form the core of the system. This architecture ensures efficient and secure management of all user data. The app is designed to help users effectively track and log a wide range of activities, including running, cycling, and weightlifting, by recording key metrics like distance, speed, and reps.",
        technologies: ["PHP", "MySQL", "Kotlin"],
        images: [
            "resource/projects/kotlin_fitness_1.png",
            "resource/projects/kotlin_fitness_2.png",
            "resource/projects/kotlin_fitness_3.png",
            "resource/projects/kotlin_fitness_4.png",
            "resource/projects/kotlin_fitness_5.png",
            "resource/projects/kotlin_fitness_6.png",
            "resource/projects/kotlin_fitness_7.png",
            "resource/projects/kotlin_fitness_8.png",
            "resource/projects/kotlin_fitness_9.png"
        ],
        codeLink: "https://github.com/KhantKyawLin/Kotlin_Fitness_App",
        demoLink: "https://fitness-demo.example.com"
    }
];

// Data for all certificates
const allCertificatesData = [
    {
        "category": "web",
        "title": "Vue & Firebase Combo",
        "issuer": "Udemy | Instructor: Pro DOT | Issued: Mar 15, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Vue & Firebase Combo course. This certificate validates proficiency in building real-time web applications with Vue.js and Firebase, covering database management, authentication, and hosting.",
        "imgSrc": "resource/image/vue_firebase_combo.jpg",
        "pdfLink": "https://creativecodermm.com/certificates/iguxb198Khant/729"
    },
    {
        "category": "web",
        "title": "JavaScript DOM Basic",
        "issuer": "Cisco Networking Academy | OpenEDG JavaScript Institute | Issued: Mar 10, 2026",
        "description": "Khant Kyaw Lin has successfully completed the JavaScript DOM Basic course. The graduate understands how to manipulate the Document Object Model (DOM) using JavaScript to create interactive and dynamic web content, including event handling and form validation.",
        "imgSrc": "resource/image/javascript_dom_basic.jpg",
        "pdfLink": "https://creativecodermm.com/certificates/iguxb198Khant/683"
    },
    {
        "category": "web",
        "title": "Programming Basic with JavaScript",
        "issuer": "Cisco Networking Academy | OpenEDG JavaScript Institute | Issued: Mar 05, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Programming Basic with JavaScript course. The certificate confirms a foundational understanding of programming logic, data structures, and JavaScript syntax essential for web development.",
        "imgSrc": "resource/image/programming_basic_with_java_script.jpg",
        "pdfLink": "https://creativecodermm.com/certificates/iguxb198Khant/682"
    },
    {
        "category": "professional",
        "title": "Git & GitHub Intermediate",
        "issuer": "Cisco Networking Academy | Issued: Mar 18, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Git & GitHub Intermediate course. The graduate is proficient in advanced version control concepts, branching strategies, merging, and collaboration workflows using GitHub for professional teams.",
        "imgSrc": "resource/image/git_git_hub_intermediate.jpg",
        "pdfLink": "https://creativecodermm.com/certificates/iguxb198Khant/709"
    },
    {
        "category": "professional",
        "title": "Git & GitHub Basic",
        "issuer": "Cisco Networking Academy | Issued: Mar 12, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Git & GitHub Basic course. The graduate understands the fundamentals of version control, committing changes, and working with local and remote repositories on GitHub.",
        "imgSrc": "resource/image/git_git_hub_basic.jpg",
        "pdfLink": "https://creativecodermm.com/certificates/iguxb198Khant/711"
    },
    {
        "category": "n&c",
        "title": "Networking Essentials",
        "issuer": "Cisco Networking Academy | Issued: Mar 20, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Networking Essentials course. The graduate is able to describe the components, operations, and security of networking infrastructures, and possesses the skills to configure and troubleshoot basic network issues.",
        "imgSrc": "resource/image/networking_essentials.jpg",
        "pdfLink": "#"
    },
    {
        "category": "n&c",
        "title": "Network Technician Career Path",
        "issuer": "Cisco Networking Academy | Issued: Mar 22, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Network Technician Career Path. This comprehensive path validates the skills needed for a network technician role, including network configuration, cybersecurity basics, and hardware troubleshooting.",
        "imgSrc": "resource/image/network_technician_carrer_path.jpg",
        "pdfLink": "#"
    },
    {
        "category": "computer",
        "title": "Introduction to Linux (LFS101)",
        "issuer": "Linux Foundation | Cisco Networking Academy | Issued: Feb 28, 2026",
        "description": "Khant Kyaw Lin has successfully completed the Introduction to Linux (LFS101) course. The graduate is proficient in basic Linux administration, command-line operations, and system management across various distributions.",
        "imgSrc": "resource/image/introduction_to_linux_(LFS101).jpg",
        "pdfLink": "#"
    },
    {
        "category": "web",
        "title": "HTML Essentials",
        "issuer": "Cisco Networking Academy | Issued: Aug 04, 2025",
        "description": "Khant Kyaw Lin can create structured HTML documents, format text and multimedia, and build accessible web pages using semantic HTML and web accessibility principles. The graduate can use hyperlinks for navigation, develop web forms with basic input fields, and understand HTML's relationship with CSS and JavaScript. The course was provided in collaboration with JS Institute.",
        "imgSrc": "resource/image/html_essentials.jpg",
        "pdfLink": "https://www.credly.com/badges/c71feb54-0dde-4c5b-8236-67868c9d4f16/public_url"
    },
    {
        "category": "web",
        "title": "CSS Essentials",
        "issuer": "Cisco Networking Academy | Issued: Aug 11, 2025",
        "description": "Khant Kyaw Lin is proficient in applying CSS syntax to style web pages and using the CSS box model for layout and design. The graduate can also implement responsive web design, enhance user experience with CSS transitions and animations, and optimize CSS performance. This course, provided in collaboration with JS Institute, also covered ensuring web content accessibility and applying CSS frameworks like Bootstrap.",
        "imgSrc": "resource/image/css_essentials.jpg",
        "pdfLink": "https://www.credly.com/badges/8436bac8-31e0-4047-8378-67255ca3f793/public_url"
    },
    {
        "category": "web",
        "title": "JavaScript Essentials 1",
        "issuer": "Cisco Networking Academy | OpenEDG JavaScript Institute | Issued: Sep 03, 2025",
        "description": "Khant Kyaw Lin has successfully completed the JavaScript Essentials 1 course. The graduate is able to understand core JavaScript syntax, including variables, operators, and flow control. The certificate confirms a foundational understanding of data types, algorithmic thinking, and basic program development. The graduate is also able to interpret and handle fundamental program execution errors, demonstrating a key skill in software development.",
        "imgSrc": "resource/image/javascript_essentials_1.jpg",
        "pdfLink": "https://www.credly.com/badges/49d068d6-967e-41a0-8b25-b55e941bb8b9/public_url"
    },
    {
        "category": "web",
        "title": "JavaScript Essentials 2",
        "issuer": "Cisco Networking Academy | OpenEDG JavaScript Institute | Issued: Sep 08, 2025",
        "description": "Khant Kyaw Lin has successfully completed the JavaScript Essentials 2 course. The graduate has studied advanced JavaScript concepts, including object construction, prototypes, and class properties. The certificate validates a strong understanding of complex data management, such as array manipulation and JSON conversion. The graduate is also proficient in asynchronous programming techniques, advanced functions, and using regular expressions, demonstrating a solid foundation in object-oriented principles and algorithmic problem-solving in JavaScript.",
        "imgSrc": "resource/image/javascript_essentials_2.jpg",
        "pdfLink": "https://www.credly.com/badges/2e635f31-0b95-4894-96a6-c68aca436160/public_url"
    },
    {
        "category": "web",
        "title": "JavaScript and PHP Programming Complete Course",
        "issuer": "Udemy | Instructor: PROPER DOT INSTITUTE | Issued: Sep 10, 2025",
        "description": "Khant Kyaw Lin has successfully completed the JavaScript and PHP Programming Complete Course. This certificate validates a comprehensive understanding of both JavaScript and PHP, including the fundamental concepts and their practical application in web development. The course provides a strong foundation for building dynamic, full-stack web applications.",
        "imgSrc": "resource/image/javascript&php.jpg",
        "pdfLink": "https://www.udemy.com/certificate/UC-94bcb88b-0739-4b8b-b091-35cb5cdd1c92/"
    },
    {
        "category": "web",
        "title": "Professional Web Design Course",
        "issuer": "Code Lab | Issued: Jul 27, 2025",
        "description": "Khant Kyaw Lin successfully completed the 'Professional Web Design Course' which covered topics such as Web Standard, HTML, Mobile Web, CSS, Color Theory, Design Pattern, and Responsive Web Page.",
        "imgSrc": "resource/image/web_desigh(code-lab).jpg",
        "pdfLink": "resource/certificates/code_lab_web_design.pdf"
    },
    {
        "category": "web",
        "title": "PHP Internship Course",
        "issuer": "SOFT GUIDE COMPUTER TRAINING CENTRE | Issued: Jul 26, 2025",
        "description": "Khant Kyaw Lin satisfactorily completed a PHP Internship Course. The course covered HTML5, CSS3, JavaScript, JQuery, Bootstrap5, MySQL, Pure PHP, Laravel, RESTful API, Git and GitHub, and an E-learning Project with Pure PHP Pharmacy Management System.",
        "imgSrc": "resource/image/internship_certificate(Soft-Guide).jpg",
        "pdfLink": "resource/certificates/soft_guide_intern.pdf"
    },
    {
        "category": "ai",
        "title": "Gemini Certified Educator",
        "issuer": "Google for Education | Issued: Sep 17, 2025",
        "description": "This qualification certifies that Khant Kyaw Lin has demonstrated the knowledge, skills, and competencies required to effectively use Google AI tools, such as Gemini, in an educational or professional context.",
        "imgSrc": "resource/image/gemini_certified_educator.jpg",
        "pdfLink": "https://edu.google.accredible.com/9bfae485-1fb1-4a77-8a3b-13663ab56159?key=69da77363eb4a3172ab73f263d81834e29673287647bdbaf827e476091ee203d#acc.Iv6SbpCQ"
    },
    {
        "category": "ai",
        "title": "AI Fundamentals",
        "issuer": "IBM SkillsBuild | Issued: Aug 07, 2025",
        "description": "Khant Kyaw Lin has satisfied the requirements for the 'Artificial Intelligence Fundamentals' course from IBM SkillsBuild. The student is able to understand fundamental AI concepts, recognize ethical implications, and set up a machine learning project in IBM Watson Studio. The course was provided by Cisco Networking Academy in collaboration with IBM.",
        "imgSrc": "resource/image/ai_fundamentals_with_ibm.jpg",
        "pdfLink": "https://www.credly.com/badges/be64d6cb-3e2a-40fe-8095-80eb346febc5/public_url"
    },
    {
        "category": "ai",
        "title": "AI Fundamentals",
        "issuer": "IBM SkillsBuild | Issued: Aug 07, 2025",
        "description": "Khant Kyaw Lin has satisfied the requirements for the 'Artificial Intelligence Fundamentals' course from IBM SkillsBuild. The student is able to understand fundamental AI concepts, recognize ethical implications, and set up a machine learning project in IBM Watson Studio. The course was provided by Cisco Networking Academy in collaboration with IBM.",
        "imgSrc": "resource/image/ai_fundamentalS(IBM).jpg",
        "pdfLink": "https://www.credly.com/badges/89e8f3f9-6adb-492d-9873-55ad8eb981c7/public_url"
    },
    {
        "category": "ai",
        "title": "Introduction to Modern AI",
        "issuer": "Cisco Networking Academy | Issued: Jul 31, 2025",
        "description": "Khant Kyaw Lin has completed the 'Introduction to Modern AI' course. The student can explain basic concepts in AI and Machine Learning, use machine translation, and explain the fundamentals of large language models (LLMs). The student can also demonstrate use cases for LLM-enabled chatbots, facilitate collaboration between chatbots, and use LLMs with tools like web search.",
        "imgSrc": "resource/image/introduction_to_modern_ai.png",
        "pdfLink": "https://www.credly.com/badges/a7d9c179-cb73-46d4-800c-16801b89100e/public_url"
    },
    {
        "category": "ai",
        "title": "Introduction to AI : Learn Basics of Artificial Intelligence",
        "issuer": "Udemy | Instructor: Prince Patni | Issued: Sep 12, 2025",
        "description": "Khant Kyaw Lin has successfully completed this introductory course on Artificial Intelligence. The certificate confirms a foundational understanding of core AI concepts, providing the basic knowledge necessary for further study in the field.",
        "imgSrc": "resource/image/introduction_to_ai.jpg",
        "pdfLink": "https://www.udemy.com/certificate/UC-a98f4f3b-37b8-4786-b5fb-1f8d24854375/"
    },
    {
        "category": "n&c",
        "title": "Introduction to Cybersecurity",
        "issuer": "Cisco Networking Academy | Issued: Sep 13, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Introduction to Cybersecurity course. The graduate is able to explain basic online safety, identify common cyber threats and vulnerabilities, and understand how to protect both individuals and organizations from cyber attacks.",
        "imgSrc": "resource/image/introduction_to_cybersecurity.jpg",
        "pdfLink": "https://www.credly.com/badges/09273bf3-3274-42d1-a93d-588045cfc57e/public_url"
    },
    {
        "category": "cybersecurity",
        "title": "Cyber Threat Management",
        "issuer": "Cisco Networking Academy | Issued: Sep 18, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Cyber Threat Management course. The graduate is proficient in assessing network and systems vulnerabilities, creating vulnerability assessment plans, and developing risk management strategies to protect IT systems from threats.",
        "imgSrc": "resource/image/cyber_threat_management.jpg",
        "pdfLink": "https://www.credly.com/badges/15b9123a-84c4-420c-9f3b-e455d87888fc/public_url"
    },
    {
        "category": "n&c",
        "title": "Endpoint Security",
        "issuer": "Cisco Networking Academy | Issued: Sep 18, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Endpoint Security course. The graduate is able to document and recommend threat mitigation measures for common network threats, analyze malware files, and evaluate the security of endpoints within an organization.",
        "imgSrc": "resource/image/endpoint_security.jpg",
        "pdfLink": "https://www.credly.com/badges/e727d409-ee07-4809-b716-f74608a4fa76/public_url"
    },
    {
        "category": "n&c",
        "title": "Network Defense",
        "issuer": "Cisco Networking Academy | Issued: Sep 18, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Network Defense course. The graduate is skilled in documenting network security posture, configuring security measures on network devices and endpoints, and implementing identity lifecycle management. The course also covered firewall configuration and cloud security measures.",
        "imgSrc": "resource/image/network_defense.jpg",
        "pdfLink": "https://www.credly.com/badges/51ad0e91-aa79-42b3-9937-a8419bee3e94/public_url"
    },
    {
        "category": "n&c",
        "title": "Junior Cybersecurity Analyst Career Path",
        "issuer": "Cisco Networking Academy | Issued: Sep 18, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Junior Cybersecurity Analyst Career Path. The graduate is proficient in recommending cybersecurity controls, mitigating network and systems threats, and evaluating organizational security. This comprehensive certificate validates the skills needed to effectively serve as a network security employee.",
        "imgSrc": "resource/image/junior_cybersecurity_analyst.jpg",
        "pdfLink": "https://www.credly.com/badges/15b9123a-84c4-420c-9f3b-e455d87888fc/public_url"
    },
    {
        "category": "computer",
        "title": "NCC Education Level 4 Diploma in Computing",
        "issuer": "NCC Education | Issued: Jan 17, 2025",
        "description": "Khant Kyaw Lin has successfully achieved average Distinction mark of 79% in the NCC Education Level 4 Diploma in Computing. The qualification was awarded by NCC Education and delivered by KMD College, Myanmar.",
        "imgSrc": "resource/image/NCC_L4_Diploma.jpg",
        "pdfLink": "resource/certificates/ncc_L4_diploma.pdf"
    },
    {
        "category": "computer",
        "title": "Computer Hardware Basics",
        "issuer": "Cisco Networking Academy | Issued: Aug 03, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Computer Hardware Basics course. The student is proficient in installing components to build, repair, or upgrade personal computers. They can also describe common device hardware, preventive maintenance, and explain the features of laptops and mobile devices. The course also covered general and fire safety standards.",
        "imgSrc": "resource/image/computer_hardware_basic.jpg",
        "pdfLink": "https://www.credly.com/badges/93093b5a-9d36-4a71-be1a-e87e2ebc5b01/public_url"
    },
    {
        "category": "computer",
        "title": "Operating Systems Basics",
        "issuer": "Cisco Networking Academy | Issued: Aug 13, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Operating Systems Basics course. The student is proficient in explaining the architecture of Windows, using Windows administrative tools, and using the Linux shell to manipulate text files. The student can also implement basic Linux security and explain how to configure network connectivity on mobile devices.",
        "imgSrc": "resource/image/operating_system_basic.jpg",
        "pdfLink": "https://www.credly.com/badges/80e4b8f5-9f43-4381-9d51-7f97c06a57c9/public_url"
    },
    {
        "category": "computer",
        "title": "Introduction to Internet of Things",
        "issuer": "Cisco Networking Academy | Issued: Sep 15, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Introduction to Internet of Things (IoT) course. The graduate is able to explain how IoT and digital transformation impact businesses, the importance of software and data, and the role of automation, AI, and enhanced security in a digitized world.",
        "imgSrc": "resource/image/introduction_to_iot.jpg",
        "pdfLink": "https://www.credly.com/badges/8abf5922-86ea-4206-b80b-26c0eb5af3d5/public_url"
    },
    {
        "category": "professional",
        "title": "English for IT 1",
        "issuer": "Cisco Networking Academy | OpenEDG | Issued: Aug 22, 2025",
        "description": "Khant Kyaw Lin has successfully completed the English for IT 1 course. The graduate is proficient in using various tenses and grammatical structures, including the passive voice and future perfect tenses, and understands relative pronouns, modal verbs, and dependent prepositions. The graduate can also apply idiomatic phrases and vocabulary in IT scenarios and comprehend concepts related to information security policies and supplier evaluation. This course strengthens language skills for professional communication in the IT sector.",
        "imgSrc": "resource/image/english_for_IT.jpg",
        "pdfLink": "https://www.credly.com/badges/ec1f8874-3b52-4779-a42b-84001c4e8f0b/public_url"
    },
    {
        "category": "professional",
        "title": "English for IT 2",
        "issuer": "Cisco Networking Academy | OpenEDG | Issued: Aug 30, 2025",
        "description": "Khant Kyaw Lin successfully completed the English for IT 2 course. The graduate is proficient in advanced English grammar (e.g., subjunctive mood, modal verbs), professional communication (e.g., formal emails, team feedback), and specialized IT vocabulary (e.g., cloud computing, software issues). The certificate validates a CEFR B2 level of English proficiency, specifically for professional use in the IT sector.",
        "imgSrc": "resource/image/english_for_IT_2.jpg",
        "pdfLink": "https://www.credly.com/badges/3ec285d9-002c-4ef7-82aa-0177678d205c/public_url"
    },
    {
        "category": "professional",
        "title": "Docker Deep Dive: Build, Ship, and Run Containers",
        "issuer": "Udemy | Instructors: Anton Voroniuk, Oleksii Osy | Issued: Sep 9, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Docker Deep Dive course. This certificate confirms a solid understanding of fundamental Docker concepts, including building, shipping, and running containers. The course provides the skills necessary for leveraging Docker to create portable and efficient application environments.",
        "imgSrc": "resource/image/docker_deep_dive.jpg",
        "pdfLink": "https://www.udemy.com/certificate/UC-253dcc92-cfb6-4f76-a763-8907d4253b06/"
    },
    {
        "category": "professional",
        "title": "IT Customer Support Basics",
        "issuer": "Cisco Networking Academy | Issued: Jul 25, 2025",
        "description": "Khant Kyaw Lin has completed the IT Customer Support Basics course. The student can learn the basic functions of a help desk and practice creating records that summarize customer issues. They also understand how to troubleshoot issues, support user devices remotely, and assist with common issues in apps like email and collaboration tools.",
        "imgSrc": "resource/image/it_customer_support_basic.jpg",
        "pdfLink": "https://www.credly.com/badges/fb256c76-88c9-46e7-a439-cc1df4671b3e/public_url"
    },
    {
        "category": "professional",
        "title": "Creating Compelling Reports",
        "issuer": "Cisco Networking Academy | Issued: Jul 26, 2025",
        "description": "Khant Kyaw Lin has successfully completed the Creating Compelling Reports course. The student is proficient in explaining the business value of compelling reports and implementing appropriate design choices for purpose and audience. They can also apply contextual understanding to report design, select authoring decisions, and determine appropriate responses for individual reporting scenarios.",
        "imgSrc": "resource/image/creating_compelling_report.jpg",
        "pdfLink": "https://www.credly.com/badges/382e24dd-a1d8-46ff-a11c-86ec05e221a2/public_url"
    },
    {
        "category": "professional",
        "title": "Digital Awareness",
        "issuer": "Cisco Networking Academy | OpenEDG | Issued: Aug 19, 2025",
        "description": "Khant Kyaw Lin has completed the Digital Awareness course. The graduate is able to explain digital technologies as tools for daily life, identify the basic functions of common digital devices, and navigate digital content responsibly. The graduate also understands the evolution of digital technologies and the importance of ethical usage, and can manage their online presence. This course provides a strong foundation in essential digital literacy.",
        "imgSrc": "resource/image/digital_awareness.jpg",
        "pdfLink": "https://www.credly.com/badges/34fb22bd-9b9e-4f30-a73e-0c05d95f4963/public_url"
    },
    {
        "category": "professional",
        "title": "How to Create Your Perfect LinkedIn Outreach Campaign",
        "issuer": "Udemy | Instructors: Anton Voroniuk, Cole Scott | Issued: Sep 11, 2025",
        "description": "Khant Kyaw Lin has successfully completed a course on creating and executing professional LinkedIn outreach campaigns. This certificate validates the skills needed to build a compelling online presence and effectively engage with professional networks.",
        "imgSrc": "resource/image/linkedin_outreach.jpg",
        "pdfLink": "https://www.udemy.com/certificate/UC-a61ec3e5-2f51-4323-8b54-eda5918702e6/"
    }
];
