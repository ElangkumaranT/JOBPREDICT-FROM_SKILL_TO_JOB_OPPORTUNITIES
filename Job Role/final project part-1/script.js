
let currentStep = 1;

document.getElementById("nextStep").addEventListener("click", function (event) {
    event.preventDefault();

    if (currentStep === 1) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const department = document.getElementById("department").value.trim();
        const skills = document.getElementById("skills").value
            .split(',')
            .map(skill => skill.trim().toLowerCase());

        if (!name || !email || !department || skills.length === 0) {
            alert("Please fill in all fields for Step 1.");
            return;
        }

        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("department", department);
        sessionStorage.setItem("skills", JSON.stringify(skills));

        document.getElementById("step1Form").style.display = "none";
        document.getElementById("step2Form").style.display = "block";
        currentStep = 2;
    }
});


document.getElementById("addProject").addEventListener("click", function () {
    const projectSection = document.getElementById("projectSection");
    const projectCount = projectSection.children.length + 1;

    const newProject = document.createElement("div");
    newProject.classList.add("project");

   /* newProject.innerHTML = `
        <label for="projectTitle">Project ${projectCount} Title:</label>
        <input type="text" class="projectTitle" placeholder="Enter project title (optional)">

        <label for="projectTech">Using Technology:</label>
        <input type="text" class="projectTech" placeholder="Enter technology used (e.g., React, Node.js)">

        <label for="projectDesc">Brief Explanation:</label>
        <textarea class="projectDesc" placeholder="Brief explanation of the project (optional)"></textarea>
    `;*/

    projectSection.appendChild(newProject);
});

document.getElementById("predictJob").addEventListener("click", function (event) {
    event.preventDefault();

    if (currentStep === 2) {
        const projectTech = document.getElementById("projectTech").value.trim().toLowerCase();

        const name = sessionStorage.getItem("name");
        const email = sessionStorage.getItem("email");
        const department = sessionStorage.getItem("department");
        const skills = JSON.parse(sessionStorage.getItem("skills"));

        if (!name || !email || !department || skills.length === 0) {
            alert("Something went wrong with Step 1 details. Please restart.");
            return;
        }

        const { skillBasedRoles, projectBasedRoles } = generateJobRoles(department, skills, projectTech ? [projectTech] : []);

        displayResults(skillBasedRoles, projectBasedRoles);
    }
});

function generateJobRoles(department, skills, projectTechnologies) {
    const skillBasedRoles = [];
    const projectBasedRoles = [];
    const jobRolesMapping = {

        Civil: [
    { title: "Civil Engineer", skillsRequired: ["structural analysis", "construction management", "site engineering"], tech: "Structural Analysis, Construction Management", hobby: "Building structures, civil design" },
    { title: "Structural Engineer", skillsRequired: ["structural design", "reinforced concrete", "steel design"], tech: "Structural Design, Concrete, Steel", hobby: "Designing and analyzing building structures" },
    { title: "Construction Manager", skillsRequired: ["project management", "construction processes", "scheduling"], tech: "Project Management, Construction Processes", hobby: "Managing construction projects" },
    { title: "Geotechnical Engineer", skillsRequired: ["soil mechanics", "foundation design", "site investigation"], tech: "Soil Mechanics, Foundation Design", hobby: "Analyzing soil properties, designing foundations" },
    { title: "Environmental Engineer", skillsRequired: ["waste management", "environmental compliance", "sustainability"], tech: "Environmental Management, Sustainability", hobby: "Working on environmental protection" },
    { title: "Transportation Engineer", skillsRequired: ["traffic engineering", "road design", "transportation systems"], tech: "Traffic Engineering, Road Design", hobby: "Designing roads and transportation systems" },
    { title: "Surveyor", skillsRequired: ["surveying", "topography", "land measurement"], tech: "Surveying, Topography", hobby: "Measuring land, mapping areas" },
    { title: "Water Resources Engineer", skillsRequired: ["hydrology", "water treatment", "flood management"], tech: "Hydrology, Water Treatment", hobby: "Designing water management systems" },
    { title: "Urban Planning Engineer", skillsRequired: ["urban design", "land use planning", "zoning"], tech: "Urban Design, Land Use Planning", hobby: "Planning urban spaces, sustainable development" },
    { title: "Building Inspector", skillsRequired: ["building codes", "construction standards", "inspection techniques"], tech: "Building Codes, Standards", hobby: "Inspecting construction work for compliance" },
    { title: "Site Engineer", skillsRequired: ["construction site management", "scheduling", "quality control"], tech: "Site Management, Quality Control", hobby: "Managing construction sites, ensuring quality" },
    { title: "Project Manager", skillsRequired: ["project planning", "budgeting", "contract management"], tech: "Project Planning, Budgeting", hobby: "Managing and overseeing projects" },
    { title: "Quantity Surveyor", skillsRequired: ["cost estimation", "quantity takeoff", "contract management"], tech: "Cost Estimation, Quantity Surveying", hobby: "Estimating costs for construction projects" },
    { title: "Municipal Engineer", skillsRequired: ["municipal infrastructure", "water systems", "sewerage design"], tech: "Municipal Infrastructure, Water Systems", hobby: "Designing and maintaining city infrastructure" },
    { title: "Roadway Engineer", skillsRequired: ["road design", "pavement materials", "construction techniques"], tech: "Road Design, Pavement Materials", hobby: "Designing and constructing roadways" },
    { title: "Coastal Engineer", skillsRequired: ["coastal processes", "flooding", "beach erosion"], tech: "Coastal Design, Flood Management", hobby: "Protecting coastal areas from erosion" },
    { title: "Tunnel Engineer", skillsRequired: ["tunnel design", "geotechnical analysis", "construction management"], tech: "Tunnel Design, Geotechnical Analysis", hobby: "Designing tunnels for transport" },
    { title: "Pavement Engineer", skillsRequired: ["pavement design", "material testing", "road construction"], tech: "Pavement Design, Material Testing", hobby: "Designing and testing pavement materials" },
    { title: "Concrete Design Engineer", skillsRequired: ["concrete design", "material science", "structural integrity"], tech: "Concrete Design, Material Science", hobby: "Designing durable concrete structures" },
    { title: "Flood Risk Engineer", skillsRequired: ["flood modeling", "drainage systems", "hydraulic analysis"], tech: "Flood Modeling, Drainage Systems", hobby: "Designing systems to manage flood risk" },
    { title: "Infrastructure Engineer", skillsRequired: ["infrastructure design", "construction management", "public works"], tech: "Infrastructure Design, Public Works", hobby: "Designing and maintaining infrastructure" },
    { title: "Environmental Consultant", skillsRequired: ["environmental impact", "sustainability", "regulatory compliance"], tech: "Environmental Consulting, Sustainability", hobby: "Advising on environmental issues" },
    { title: "BIM Engineer", skillsRequired: ["building information modeling", "3D modeling", "construction design"], tech: "BIM, 3D Modeling", hobby: "Creating virtual models of buildings" },
    { title: "Foundation Engineer", skillsRequired: ["foundation design", "soil mechanics", "load-bearing structures"], tech: "Foundation Design, Soil Mechanics", hobby: "Designing strong foundations for buildings" },
    { title: "Structural Steel Designer", skillsRequired: ["steel design", "structural integrity", "material properties"], tech: "Steel Design, Structural Integrity", hobby: "Designing steel structures" },
    { title: "Dam Engineer", skillsRequired: ["dam design", "hydraulic engineering", "construction management"], tech: "Dam Design, Hydraulic Engineering", hobby: "Designing and building dams" },
    { title: "Highway Engineer", skillsRequired: ["highway design", "traffic flow", "road construction"], tech: "Highway Design, Traffic Flow", hobby: "Designing highways and roadways" },
    { title: "Land Development Engineer", skillsRequired: ["site planning", "zoning regulations", "urban infrastructure"], tech: "Land Development, Zoning", hobby: "Planning and developing land for use" },
    { title: "Sustainability Consultant", skillsRequired: ["sustainability analysis", "energy efficiency", "green building"], tech: "Sustainability, Energy Efficiency", hobby: "Advising on sustainable practices" },
    { title: "Drainage Engineer", skillsRequired: ["stormwater management", "drainage systems", "flood prevention"], tech: "Drainage Systems, Stormwater Management", hobby: "Designing drainage solutions for flood prevention" },
    { title: "Construction Safety Manager", skillsRequired: ["safety regulations", "construction practices", "risk management"], tech: "Safety Regulations, Risk Management", hobby: "Ensuring construction site safety" }
],

        CSE: [
            { title: "Software Engineer", skillsRequired: ["java", "c++", "python"], tech: "Java, C++, Python", hobby: "Coding, Problem solving" },
            { title: "Data Scientist", skillsRequired: ["python", "sql", "machine learning"], tech: "Python, SQL, Machine Learning", hobby: "Data analysis, building models" },
            { title: "Full Stack Developer", skillsRequired: ["html", "css", "javascript", "java", "node.js"], tech: "HTML, CSS, JavaScript, Java, Node.js", hobby: "Web development, coding challenges" },
            { title: "Cybersecurity Specialist", skillsRequired: ["network security", "firewalls", "ethical hacking"], tech: "Network Security, Ethical Hacking", hobby: "Security research, ethical hacking" },
            { title: "Cloud Architect", skillsRequired: ["aws", "azure", "cloud computing"], tech: "AWS, Azure, Cloud Computing", hobby: "Cloud infrastructure, automation" },
            { title: "Systems Analyst", skillsRequired: ["system design", "requirements analysis", "programming"], tech: "Systems Analysis, Requirements Gathering", hobby: "Problem-solving, system optimization" },
            { title: "AI/ML Engineer", skillsRequired: ["python", "tensorflow", "keras", "machine learning"], tech: "Machine Learning, Python, TensorFlow", hobby: "Building AI models, deep learning" },
            { title: "DevOps Engineer", skillsRequired: ["docker", "jenkins", "aws"], tech: "Docker, Jenkins, AWS", hobby: "Automation, cloud infrastructure" },
            { title: "Network Administrator", skillsRequired: ["networking", "security", "troubleshooting"], tech: "Networking, Security, Troubleshooting", hobby: "Networking setup, infrastructure management" },
            { title: "Database Administrator", skillsRequired: ["sql", "database design", "data management"], tech: "SQL, Database Design", hobby: "Database optimization, data security" },
            { title: "Blockchain Developer", skillsRequired: ["blockchain", "solidity", "ethereum"], tech: "Blockchain, Ethereum, Solidity", hobby: "Blockchain research, cryptocurrency" },
            { title: "IT Project Manager", skillsRequired: ["project management", "agile", "scrum"], tech: "Agile, Scrum", hobby: "Project planning, team management" },
            { title: "IT Security Analyst", skillsRequired: ["network security", "ethical hacking", "risk assessment"], tech: "Ethical Hacking, Risk Assessment", hobby: "Security research, vulnerability testing" },
            { title: "Software Development Manager", skillsRequired: ["leadership", "programming", "management"], tech: "Leadership, Management", hobby: "Team building, project management" },
            { title: "Cloud Solutions Engineer", skillsRequired: ["aws", "azure", "cloud infrastructure"], tech: "AWS, Azure", hobby: "Cloud design, scaling applications" },
            { title: "Game Developer", skillsRequired: ["c++", "unity", "game design"], tech: "C++, Unity, Game Design", hobby: "Game development, coding games" },
            { title: "Research Scientist (Computer Science)", skillsRequired: ["research", "programming", "data analysis"], tech: "Research, Data Analysis", hobby: "Exploring new technologies" },
            { title: "Embedded Systems Engineer", skillsRequired: ["embedded programming", "microcontrollers", "circuit design"], tech: "Embedded Systems, Microcontrollers", hobby: "Building embedded systems" },
            { title: "Blockchain Developer", skillsRequired: ["blockchain", "solidity", "ethereum"], tech: "Blockchain, Ethereum, Solidity", hobby: "Blockchain research" },
            { title: "Technical Support Engineer", skillsRequired: ["troubleshooting", "network support", "technical knowledge"], tech: "Technical Support, Networking", hobby: "Tech troubleshooting" },
            {
                title: "MERN Stack Developer",
                skillsRequired: ["mongodb", "express", "react", "node.js", "javascript"],
            },
            {
                title: "MEAN Stack Developer",
                skillsRequired: ["mongodb", "express", "angular", "node.js", "javascript"],
            },
            { title: "UI/UX Designer", skillsRequired: ["design", "photoshop", "wireframing"], tech: "Design, Photoshop, Wireframing", hobby: "Designing user interfaces" },
            { title: "Business Intelligence Analyst", skillsRequired: ["sql", "powerbi", "data visualization"], tech: "SQL, PowerBI", hobby: "Data analysis, reporting" },
            { title: "IT Consultant", skillsRequired: ["consulting", "networking", "cloud infrastructure"], tech: "Consulting, Cloud", hobby: "Advising businesses on tech strategies" },
            { title: "Software Architect", skillsRequired: ["design patterns", "architecture", "programming"], tech: "Software Design, Architecture", hobby: "Building scalable solutions" }        ],
       EEE: [
    { title: "Electrical Engineer", skillsRequired: ["circuit design", "electrical systems", "power systems"], tech: "Circuit Design, Power Systems, Electrical Engineering", hobby: "Building circuits, troubleshooting" },
    { title: "Power Systems Engineer", skillsRequired: ["power systems", "grid management", "supply chain management"], tech: "Power Systems, Grid Management", hobby: "Energy optimization, power grid research" },
    { title: "Control Systems Engineer", skillsRequired: ["control theory", "automation", "PLC"], tech: "Control Theory, PLC, Automation", hobby: "System optimization, automation projects" },
    { title: "Electronics Design Engineer", skillsRequired: ["analog circuits", "electronics design", "microcontrollers"], tech: "Analog Circuits, Microcontrollers", hobby: "Circuit designing, gadget building" },
    { title: "Telecommunications Engineer", skillsRequired: ["telecommunication systems", "signal processing", "network design"], tech: "Signal Processing, Network Design", hobby: "Communications, signal optimization" },
    { title: "Robotics Engineer", skillsRequired: ["robotics", "control systems", "mechatronics"], tech: "Robotics, Mechatronics", hobby: "Building robots, automation" },
    { title: "Embedded Systems Engineer", skillsRequired: ["embedded systems", "C programming", "microcontrollers"], tech: "Embedded Systems, C Programming", hobby: "Designing embedded devices" },
    { title: "Automation Engineer", skillsRequired: ["automation systems", "robotic programming", "PLC"], tech: "Automation, PLC Programming", hobby: "Automating systems, robotics" },
    { title: "VLSI Design Engineer", skillsRequired: ["VLSI", "circuit design", "semiconductor"], tech: "VLSI Design, Semiconductor", hobby: "Semiconductor design, building circuits" },
    { title: "Renewable Energy Engineer", skillsRequired: ["solar power", "wind energy", "energy storage systems"], tech: "Solar, Wind Energy, Energy Storage", hobby: "Renewable energy research, green technologies" },
    { title: "Electromagnetic Engineer", skillsRequired: ["electromagnetic fields", "signal processing", "wave propagation"], tech: "Electromagnetic Fields, Signal Processing", hobby: "Electromagnetic simulation, wave studies" },
    { title: "Electrical Project Manager", skillsRequired: ["project management", "scheduling", "budgeting"], tech: "Project Management, Scheduling", hobby: "Managing projects, organizing teams" },
    { title: "Instrumentation Engineer", skillsRequired: ["instrumentation", "measurement systems", "sensors"], tech: "Instrumentation, Sensors", hobby: "Measurement systems, sensor design" },
    { title: "HVAC Engineer", skillsRequired: ["HVAC", "thermal systems", "fluid dynamics"], tech: "HVAC, Thermal Systems", hobby: "Climate control systems, sustainability" },
    { title: "Electric Vehicle Engineer", skillsRequired: ["electric vehicles", "battery technology", "motor design"], tech: "Electric Vehicles, Battery Tech", hobby: "EV design, battery innovation" },
    { title: "Industrial Automation Engineer", skillsRequired: ["industrial automation", "robotics", "PLC"], tech: "Industrial Automation, Robotics", hobby: "Automation systems, industry 4.0" },
    { title: "Signal Processing Engineer", skillsRequired: ["signal processing", "audio systems", "filtering"], tech: "Signal Processing, Audio Systems", hobby: "Sound engineering, noise cancellation" },
    { title: "Electrical Design Engineer", skillsRequired: ["electrical circuit design", "load flow analysis", "power electronics"], tech: "Circuit Design, Power Electronics", hobby: "Power analysis, design optimization" },
    { title: "Energy Systems Engineer", skillsRequired: ["energy management", "power generation", "energy storage"], tech: "Energy Systems, Power Generation", hobby: "Energy system optimization" },
    { title: "Building Systems Engineer", skillsRequired: ["HVAC systems", "building automation", "electrical systems"], tech: "Building Systems, HVAC", hobby: "Designing smart buildings" },
    { title: "Microelectronics Engineer", skillsRequired: ["microelectronics", "semiconductor devices", "circuit analysis"], tech: "Microelectronics, Semiconductors", hobby: "Chip design, semiconductor research" },
    { title: "Electrical Test Engineer", skillsRequired: ["testing", "electrical systems", "quality assurance"], tech: "Testing, Electrical Systems", hobby: "Quality testing, system troubleshooting" },
    { title: "Lighting Design Engineer", skillsRequired: ["lighting systems", "energy efficiency", "design software"], tech: "Lighting Systems, Design Software", hobby: "Lighting design, energy-efficient solutions" },
    { title: "Substation Engineer", skillsRequired: ["substation design", "power distribution", "grid operations"], tech: "Substation Design, Power Distribution", hobby: "Substation optimization" }
],
 Agri: [
             { title: "Agricultural Engineer", skillsRequired: ["farm equipment", "irrigation", "agricultural systems"], tech: "Farm Equipment, Irrigation", hobby: "Designing agricultural machinery" },
    { title: "Farm Equipment Engineer", skillsRequired: ["mechanical design", "agriculture machinery", "hydraulics"], tech: "Agriculture Machinery, Hydraulics", hobby: "Building and testing farm equipment" },
    { title: "Irrigation Engineer", skillsRequired: ["irrigation systems", "water management", "agriculture"], tech: "Irrigation Systems, Water Management", hobby: "Designing water-efficient systems for farms" },
    { title: "Environmental Engineer (Agriculture)", skillsRequired: ["environmental management", "sustainability", "waste management"], tech: "Sustainability, Waste Management", hobby: "Improving environmental sustainability in agriculture" },
    { title: "Soil Scientist", skillsRequired: ["soil chemistry", "agricultural science", "soil management"], tech: "Soil Chemistry, Agriculture", hobby: "Studying soil properties and improving crop yield" },
    { title: "Precision Agriculture Specialist", skillsRequired: ["data analytics", "GPS technology", "farm management"], tech: "Data Analytics, GPS Technology", hobby: "Using technology to optimize farming practices" },
    { title: "Agricultural Operations Manager", skillsRequired: ["farm management", "logistics", "supply chain"], tech: "Farm Operations, Logistics", hobby: "Overseeing agricultural operations and productivity" },
    { title: "Agro-Processing Engineer", skillsRequired: ["food processing", "machinery", "supply chain management"], tech: "Food Processing, Agro-tech", hobby: "Designing systems for food production and processing" },
    { title: "Food Safety Engineer", skillsRequired: ["food safety regulations", "quality control", "food production"], tech: "Food Safety, Quality Control", hobby: "Ensuring safety standards in food production" },
    { title: "Agricultural Systems Engineer", skillsRequired: ["automation", "irrigation systems", "agriculture"], tech: "Automation, Irrigation Systems", hobby: "Optimizing agricultural processes using technology" },
    { title: "Horticultural Engineer", skillsRequired: ["horticulture", "plant science", "greenhouse systems"], tech: "Horticulture, Plant Science", hobby: "Designing efficient horticultural systems" },
    { title: "Crop Production Specialist", skillsRequired: ["crop management", "fertilizers", "agriculture science"], tech: "Crop Management, Fertilizers", hobby: "Maximizing crop yields through technology" },
    { title: "Rural Development Specialist", skillsRequired: ["rural planning", "socio-economic development", "agriculture"], tech: "Rural Development, Socio-Economic Planning", hobby: "Developing rural areas through agricultural projects" },
    { title: "Agricultural Technologist", skillsRequired: ["agriculture technology", "farming equipment", "system design"], tech: "Agriculture Technology, Farming Equipment", hobby: "Innovating agricultural technology" },
    { title: "Livestock Systems Engineer", skillsRequired: ["livestock management", "farm automation", "animal welfare"], tech: "Livestock Systems, Automation", hobby: "Improving livestock farming systems" },
    { title: "Water Management Engineer", skillsRequired: ["water systems", "irrigation", "water conservation"], tech: "Water Systems, Conservation", hobby: "Managing and conserving water for agricultural use" },
    { title: "Agricultural Machinery Engineer", skillsRequired: ["machinery design", "mechanical engineering", "agriculture"], tech: "Machinery Design, Mechanical Engineering", hobby: "Designing agricultural machinery" },
    { title: "Greenhouse Engineer", skillsRequired: ["greenhouse systems", "hydroponics", "agriculture"], tech: "Greenhouse Systems, Hydroponics", hobby: "Designing efficient and sustainable greenhouse systems" },
    { title: "Agricultural Consultant", skillsRequired: ["consulting", "agriculture practices", "sustainability"], tech: "Agricultural Consulting, Sustainability", hobby: "Advising farms on sustainable practices" },
    { title: "Plant Breeding Engineer", skillsRequired: ["genetics", "crop improvement", "plant breeding"], tech: "Plant Breeding, Genetics", hobby: "Developing improved plant varieties" },
    { title: "Waste Management Engineer (Agriculture)", skillsRequired: ["waste management", "sustainable practices", "agriculture"], tech: "Waste Management, Sustainability", hobby: "Reducing agricultural waste through technology" },
    { title: "Sustainable Agriculture Consultant", skillsRequired: ["sustainable farming", "organic farming", "resource management"], tech: "Sustainability, Organic Farming", hobby: "Promoting sustainable farming practices" },
    { title: "Climate Change Adaptation Specialist", skillsRequired: ["climate science", "agriculture", "environmental management"], tech: "Climate Science, Agriculture", hobby: "Adapting agricultural systems to climate change" },
    { title: "Farm Management Advisor", skillsRequired: ["farm management", "business analysis", "supply chain"], tech: "Farm Management, Business Planning", hobby: "Improving farm productivity and profitability" },
    { title: "Agricultural Irrigation Specialist", skillsRequired: ["irrigation systems", "water management", "agriculture"], tech: "Irrigation Systems, Water Management", hobby: "Optimizing irrigation techniques" },
    { title: "Renewable Energy Consultant (Agriculture)", skillsRequired: ["renewable energy", "sustainability", "agriculture"], tech: "Renewable Energy, Sustainability", hobby: "Integrating renewable energy in agricultural practices" },
    { title: "Crop Protection Engineer", skillsRequired: ["pest control", "agriculture technology", "crop management"], tech: "Pest Control, Crop Management", hobby: "Designing pest control systems for crops" },
    { title: "Agricultural Researcher", skillsRequired: ["research", "agriculture", "technology"], tech: "Research, Agriculture", hobby: "Conducting research to improve agricultural practices" },
    { title: "Bioenergy Engineer", skillsRequired: ["bioenergy", "renewable energy", "sustainable farming"], tech: "Bioenergy, Renewable Energy", hobby: "Developing bioenergy solutions for farms" },
    { title: "Agronomist", skillsRequired: ["crop management", "soil science", "agriculture"], tech: "Crop Management, Soil Science", hobby: "Studying crops and soil management" },
    { title: "Agriculture Policy Analyst", skillsRequired: ["policy analysis", "agriculture economics", "government regulations"], tech: "Policy Analysis, Agriculture Economics", hobby: "Researching and analyzing agricultural policies" }
        ],
AE: [
    { title: "Aerospace Engineer", skillsRequired: ["aerodynamics", "propulsion", "materials science"], tech: "Aerodynamics, Propulsion", hobby: "Designing aircraft and spacecraft" },
    { title: "Aircraft Design Engineer", skillsRequired: ["aerospace design", "CAD software", "materials science"], tech: "Aircraft Design, CAD Software", hobby: "Designing aircraft systems and structures" },
    { title: "Aerodynamics Specialist", skillsRequired: ["fluid dynamics", "aircraft performance", "simulation tools"], tech: "Fluid Dynamics, Simulation", hobby: "Studying the aerodynamics of aircraft" },
    { title: "Avionics Engineer", skillsRequired: ["electronics", "flight control systems", "navigation"], tech: "Avionics, Flight Systems", hobby: "Designing electronic systems for aircraft" },
    { title: "Spacecraft Engineer", skillsRequired: ["space systems", "propulsion systems", "orbital mechanics"], tech: "Space Systems, Orbital Mechanics", hobby: "Designing spacecraft for space exploration" },
    { title: "Propulsion Engineer", skillsRequired: ["propulsion systems", "thermodynamics", "rocket science"], tech: "Propulsion Systems, Thermodynamics", hobby: "Designing propulsion systems for aircraft and rockets" },
    { title: "Flight Test Engineer", skillsRequired: ["flight testing", "data analysis", "aircraft performance"], tech: "Flight Testing, Data Analysis", hobby: "Testing and analyzing flight performance" },
    { title: "Structural Engineer (Aerospace)", skillsRequired: ["structural design", "material science", "stress analysis"], tech: "Structural Design, Material Science", hobby: "Designing strong and lightweight structures" },
    { title: "Aircraft Systems Engineer", skillsRequired: ["systems engineering", "aircraft systems", "integration"], tech: "Systems Engineering, Aircraft Systems", hobby: "Integrating complex systems in aircraft" },
    { title: "Space Systems Engineer", skillsRequired: ["spacecraft systems", "orbital mechanics", "systems engineering"], tech: "Space Systems, Orbital Mechanics", hobby: "Designing and analyzing space mission systems" },
    { title: "Materials Engineer (Aerospace)", skillsRequired: ["material properties", "high-performance materials", "aerospace engineering"], tech: "Materials Science, Aerospace Engineering", hobby: "Developing advanced materials for aerospace" },
    { title: "Propulsion Systems Engineer", skillsRequired: ["engine design", "rocket propulsion", "thermodynamics"], tech: "Engine Design, Propulsion", hobby: "Designing efficient propulsion systems" },
    { title: "Flight Control Engineer", skillsRequired: ["flight dynamics", "control systems", "aerospace engineering"], tech: "Flight Control Systems, Dynamics", hobby: "Improving flight stability and control" },
    { title: "Aerospace Project Manager", skillsRequired: ["project management", "engineering", "budgeting"], tech: "Project Management, Aerospace Engineering", hobby: "Managing aerospace projects from concept to launch" },
    { title: "Systems Engineer (Aerospace)", skillsRequired: ["systems engineering", "aerospace systems", "integration"], tech: "Systems Engineering, Aerospace", hobby: "Designing and integrating aerospace systems" },
    { title: "Launch Vehicle Engineer", skillsRequired: ["launch vehicles", "spacecraft systems", "orbital mechanics"], tech: "Launch Vehicles, Orbital Mechanics", hobby: "Designing rockets and launch systems" },
    { title: "Satellite Engineer", skillsRequired: ["satellite systems", "communications", "orbital mechanics"], tech: "Satellite Systems, Communication Systems", hobby: "Designing satellites for communication and research" },
    { title: "Space Mission Planner", skillsRequired: ["mission planning", "orbital mechanics", "spacecraft systems"], tech: "Mission Planning, Orbital Mechanics", hobby: "Planning and executing space missions" },
    { title: "Aircraft Maintenance Engineer", skillsRequired: ["aircraft maintenance", "repair systems", "aviation standards"], tech: "Aircraft Maintenance, Repair Systems", hobby: "Maintaining and repairing aircraft" },
    { title: "Test Engineer (Aerospace)", skillsRequired: ["testing systems", "flight testing", "data analysis"], tech: "Testing, Data Analysis", hobby: "Performing tests on aerospace components and systems" },
    { title: "Space Robotics Engineer", skillsRequired: ["robotics", "space applications", "systems engineering"], tech: "Robotics, Space Systems", hobby: "Designing robots for space exploration" },
    { title: "Control Systems Engineer (Aerospace)", skillsRequired: ["control systems", "flight dynamics", "aerospace technology"], tech: "Control Systems, Aerospace Technology", hobby: "Designing control systems for aerospace applications" },
    { title: "Air Traffic Control Engineer", skillsRequired: ["air traffic systems", "communication systems", "aviation regulations"], tech: "Air Traffic Control, Communication Systems", hobby: "Managing air traffic flow using technology" }
],
Mech: [
    { title: "Mechanical Engineer", skillsRequired: ["thermal systems", "mechanical design", "material science"], tech: "Thermal Systems, Mechanical Design, Material Science", hobby: "Designing mechanical systems, CAD modeling" },
    { title: "Manufacturing Engineer", skillsRequired: ["manufacturing processes", "automation", "CNC programming"], tech: "Manufacturing Processes, CNC, Automation", hobby: "Optimizing manufacturing workflows" },
    { title: "Automotive Engineer", skillsRequired: ["automotive systems", "engine design", "vehicle dynamics"], tech: "Automotive Systems, Engine Design, Vehicle Dynamics", hobby: "Car design, vehicle testing" },
    { title: "HVAC Engineer", skillsRequired: ["HVAC systems", "fluid dynamics", "thermal management"], tech: "HVAC Systems, Fluid Dynamics", hobby: "Designing climate control systems" },
    { title: "Robotics Engineer", skillsRequired: ["robotics", "mechatronics", "automation"], tech: "Robotics, Mechatronics, Automation", hobby: "Building robots, robotic process automation" },
    { title: "Aerospace Engineer", skillsRequired: ["aerospace systems", "fluid dynamics", "materials science"], tech: "Aerospace Engineering, Fluid Dynamics, Materials Science", hobby: "Aircraft design, aerospace research" },
    { title: "Design Engineer", skillsRequired: ["CAD design", "solidworks", "prototyping"], tech: "CAD, SolidWorks, Prototyping", hobby: "Product design, prototype development" },
    { title: "Structural Engineer", skillsRequired: ["structural design", "finite element analysis", "materials science"], tech: "Structural Design, FEA, Materials Science", hobby: "Structural optimization, safety analysis" },
    { title: "Thermal Engineer", skillsRequired: ["heat transfer", "thermodynamics", "thermal systems"], tech: "Heat Transfer, Thermodynamics", hobby: "Designing cooling and heating systems" },
    { title: "Mechatronics Engineer", skillsRequired: ["mechatronics", "robotics", "control systems"], tech: "Mechatronics, Robotics, Control Systems", hobby: "Integrating mechanical and electrical systems" },
    { title: "Manufacturing Systems Engineer", skillsRequired: ["manufacturing systems", "robotics", "automation"], tech: "Manufacturing Systems, Automation, Robotics", hobby: "Improving manufacturing efficiency" },
    { title: "Materials Engineer", skillsRequired: ["materials selection", "materials testing", "failure analysis"], tech: "Materials Science, Failure Analysis", hobby: "Studying materials properties and behavior" },
    { title: "Maintenance Engineer", skillsRequired: ["preventive maintenance", "machine reliability", "troubleshooting"], tech: "Preventive Maintenance, Reliability", hobby: "Troubleshooting machines, improving reliability" },
    { title: "Product Development Engineer", skillsRequired: ["product design", "prototyping", "product testing"], tech: "Product Design, Prototyping, Testing", hobby: "Developing and testing new products" },
    { title: "Project Engineer", skillsRequired: ["project management", "engineering design", "scheduling"], tech: "Project Management, Scheduling", hobby: "Managing engineering projects" },
    { title: "Quality Control Engineer", skillsRequired: ["quality assurance", "materials testing", "process control"], tech: "Quality Control, Testing, Process Control", hobby: "Quality assurance, process optimization" },
    { title: "Industrial Engineer", skillsRequired: ["systems optimization", "production planning", "logistics"], tech: "Systems Optimization, Production Planning", hobby: "Streamlining industrial processes" },
    { title: "Plant Manager", skillsRequired: ["plant operations", "maintenance", "safety management"], tech: "Plant Operations, Safety Management", hobby: "Managing plant operations and safety" },
    { title: "Test Engineer", skillsRequired: ["test protocols", "data analysis", "testing"], tech: "Testing, Data Analysis", hobby: "Designing and running tests for systems" },
    { title: "Simulation Engineer", skillsRequired: ["simulation modeling", "CAE", "finite element analysis"], tech: "Simulation Modeling, CAE, FEA", hobby: "Simulating mechanical systems and processes" },
    { title: "Tooling Engineer", skillsRequired: ["tool design", "CNC machining", "manufacturing"], tech: "Tool Design, CNC Machining", hobby: "Tool design, improving manufacturing tools" },
    { title: "CNC Programmer", skillsRequired: ["CNC programming", "machine setup", "CAD/CAM"], tech: "CNC Programming, CAD/CAM", hobby: "Programming CNC machines" }
],
Chemical: [
    { title: "Chemical Engineer", skillsRequired: ["chemical processes", "thermodynamics", "fluid dynamics"], tech: "Chemical Processes, Thermodynamics", hobby: "Designing chemical processes for manufacturing" },
    { title: "Process Engineer", skillsRequired: ["process design", "chemical reactions", "optimization"], tech: "Process Design, Chemical Engineering", hobby: "Optimizing chemical production processes" },
    { title: "Petrochemical Engineer", skillsRequired: ["petroleum refining", "chemical engineering", "energy systems"], tech: "Petroleum Refining, Energy Systems", hobby: "Working with petrochemical production and refining" },
    { title: "Environmental Chemical Engineer", skillsRequired: ["environmental chemistry", "pollution control", "sustainability"], tech: "Environmental Chemistry, Sustainability", hobby: "Reducing environmental impacts of chemical processes" },
    { title: "Pharmaceutical Engineer", skillsRequired: ["drug formulation", "pharmaceutical chemistry", "manufacturing"], tech: "Pharmaceutical Chemistry, Manufacturing", hobby: "Developing processes for pharmaceutical products" },
    { title: "Biochemical Engineer", skillsRequired: ["biotechnology", "bioprocessing", "chemical engineering"], tech: "Biotechnology, Bioprocessing", hobby: "Designing processes for biological product development" },
    { title: "Process Control Engineer", skillsRequired: ["control systems", "process monitoring", "automation"], tech: "Control Systems, Process Automation", hobby: "Managing and controlling industrial chemical processes" },
    { title: "Materials Engineer (Chemical)", skillsRequired: ["materials science", "polymer chemistry", "chemical engineering"], tech: "Materials Science, Polymer Chemistry", hobby: "Developing advanced materials and polymers" },
    { title: "Food Process Engineer", skillsRequired: ["food chemistry", "food processing", "biochemical engineering"], tech: "Food Processing, Chemical Engineering", hobby: "Designing processes for food production" },
    { title: "Catalysis Engineer", skillsRequired: ["catalysis", "chemical reactions", "reaction engineering"], tech: "Catalysis, Chemical Engineering", hobby: "Designing catalytic systems for chemical reactions" },
    { title: "Energy Systems Engineer (Chemical)", skillsRequired: ["energy systems", "chemical engineering", "sustainability"], tech: "Energy Systems, Sustainability", hobby: "Developing sustainable energy solutions" },
    { title: "Corrosion Engineer", skillsRequired: ["materials degradation", "chemical processes", "corrosion prevention"], tech: "Corrosion, Materials Science", hobby: "Preventing corrosion in industrial systems" },
    { title: "Chemical Plant Manager", skillsRequired: ["plant operations", "chemical processes", "management"], tech: "Chemical Processes, Operations Management", hobby: "Managing chemical production plants" },
    { title: "Process Safety Engineer", skillsRequired: ["safety systems", "chemical processes", "risk analysis"], tech: "Process Safety, Risk Management", hobby: "Ensuring safety in chemical process environments" },
    { title: "Industrial Chemical Engineer", skillsRequired: ["industrial chemistry", "production systems", "chemical processing"], tech: "Industrial Chemistry, Chemical Processing", hobby: "Improving industrial chemical production" },
    { title: "Chemical Reactor Engineer", skillsRequired: ["chemical reactors", "reaction kinetics", "process optimization"], tech: "Chemical Reactors, Process Optimization", hobby: "Designing and optimizing chemical reactors" },
    { title: "Water Treatment Engineer", skillsRequired: ["water treatment", "chemical processes", "environmental engineering"], tech: "Water Treatment, Environmental Engineering", hobby: "Designing chemical processes for clean water treatment" },
    { title: "Renewable Energy Chemical Engineer", skillsRequired: ["renewable energy", "chemical processes", "sustainability"], tech: "Renewable Energy, Sustainability", hobby: "Developing renewable energy processes" },
    { title: "Chemical Lab Technician", skillsRequired: ["chemical analysis", "laboratory testing", "safety protocols"], tech: "Chemical Analysis, Laboratory Testing", hobby: "Conducting experiments and analyzing chemical substances" },
    { title: "Chemical Simulation Engineer", skillsRequired: ["simulation tools", "process modeling", "chemical reactions"], tech: "Simulation, Process Modeling", hobby: "Using software to simulate chemical processes" },
    { title: "Chemical Engineering Consultant", skillsRequired: ["consulting", "chemical processes", "industrial systems"], tech: "Consulting, Chemical Processes", hobby: "Advising industries on chemical engineering solutions" },
    { title: "Chemical Production Planner", skillsRequired: ["production planning", "chemical processes", "logistics"], tech: "Production Planning, Logistics", hobby: "Coordinating the production of chemicals" }
],
Robotic: [
    { title: "Robotics Engineer", skillsRequired: ["robot design", "control systems", "automation"], tech: "Robotic Systems, Automation", hobby: "Building and programming robots" },
    { title: "Automation Engineer", skillsRequired: ["robotics", "PLC programming", "control systems"], tech: "Robotics, PLC Programming", hobby: "Designing automated systems for manufacturing" },
    { title: "Robot Programmer", skillsRequired: ["robot programming", "motion control", "PLC"], tech: "Robot Programming, Motion Control", hobby: "Writing code for robots to perform tasks" },
    { title: "Robotics Researcher", skillsRequired: ["robotics research", "AI", "machine learning"], tech: "AI, Machine Learning, Robotics Research", hobby: "Exploring new robotic technologies and applications" },
    { title: "Control Systems Engineer (Robotics)", skillsRequired: ["control systems", "robotics", "feedback systems"], tech: "Control Systems, Robotics", hobby: "Designing control systems for robots" },
    { title: "Robot Vision Engineer", skillsRequired: ["computer vision", "robotics", "image processing"], tech: "Computer Vision, Robotics", hobby: "Developing vision systems for robots" },
    { title: "Robotics Software Engineer", skillsRequired: ["software development", "robotics frameworks", "AI"], tech: "Software Development, AI, Robotics", hobby: "Developing software for robotic applications" },
    { title: "Robot Design Engineer", skillsRequired: ["mechanical design", "robot dynamics", "CAD"], tech: "Mechanical Design, Robotics", hobby: "Designing the physical aspects of robots" },
    { title: "Mechatronics Engineer", skillsRequired: ["mechanical engineering", "electronics", "robotics"], tech: "Mechatronics, Robotics", hobby: "Integrating mechanical and electronic systems in robots" },
    { title: "Robot Integration Engineer", skillsRequired: ["robot integration", "system design", "automation"], tech: "Robot Integration, System Design", hobby: "Integrating robotic systems into industrial settings" },
    { title: "Human-Robot Interaction Specialist", skillsRequired: ["HRI", "robot design", "usability testing"], tech: "Human-Robot Interaction, Robotics", hobby: "Improving the interface between robots and humans" },
    { title: "Robot Maintenance Engineer", skillsRequired: ["robot maintenance", "troubleshooting", "robot systems"], tech: "Maintenance, Robotics", hobby: "Repairing and maintaining robotic systems" },
    { title: "Robotic Process Automation Engineer", skillsRequired: ["RPA tools", "automation", "software development"], tech: "RPA, Automation", hobby: "Automating business processes using robotic systems" },
    { title: "Robotics Systems Engineer", skillsRequired: ["systems engineering", "robot integration", "mechatronics"], tech: "Systems Engineering, Robotics", hobby: "Designing and integrating complex robotic systems" },
    { title: "Artificial Intelligence Engineer (Robotics)", skillsRequired: ["AI", "robot programming", "machine learning"], tech: "AI, Machine Learning, Robotics", hobby: "Developing intelligent robotic systems" },
    { title: "Robot Test Engineer", skillsRequired: ["testing", "robot systems", "automation"], tech: "Robot Testing, Automation", hobby: "Testing and evaluating robotic systems" },
    { title: "Robotic Welding Engineer", skillsRequired: ["robot welding", "automation", "manufacturing"], tech: "Welding Automation, Robotics", hobby: "Designing robots for welding applications" },
    { title: "Robotics Product Manager", skillsRequired: ["product management", "robotics", "team leadership"], tech: "Product Management, Robotics", hobby: "Managing robotic product development" },
    { title: "Robotic Arm Engineer", skillsRequired: ["robot arm design", "automation", "motion control"], tech: "Robotic Arms, Motion Control", hobby: "Designing robotic arms for various tasks" },
    { title: "Robotics Technician", skillsRequired: ["robot assembly", "maintenance", "electronics"], tech: "Robot Assembly, Maintenance", hobby: "Assembling and maintaining robotic systems" },
    { title: "Robotics Consultant", skillsRequired: ["consulting", "robotics systems", "automation"], tech: "Consulting, Robotics", hobby: "Advising businesses on robotic solutions" }
]












    };

    const rolesForDepartment = jobRolesMapping[department] || [];
    if (!rolesForDepartment.length) {
        alert("No job roles available for the selected department.");
        return { skillBasedRoles, projectBasedRoles };
    }

    rolesForDepartment.forEach(role => {
        const skillsMatch = role.skillsRequired.some(skill => skills.includes(skill));
        const projectMatch = role.skillsRequired.some(skill => projectTechnologies.includes(skill));

        if (skillsMatch) skillBasedRoles.push(role.title);
        if (projectMatch) projectBasedRoles.push(role.title);
    });

    return {skillBasedRoles: [...new Set(skillBasedRoles)], projectBasedRoles: [...new Set(projectBasedRoles)]};}

/*function displayResults(skillBasedRoles, projectBasedRoles) {
    const outputDiv = document.getElementById("output");
    outputDiv.style.display = "block";

    const skillList = document.getElementById("skillBasedList");
    const projectList = document.getElementById("projectBasedList");

    skillList.innerHTML = '';
    projectList.innerHTML = '';

    skillBasedRoles.forEach(role => {
        const listItem = document.createElement("li");
        listItem.textContent = role;
        skillList.appendChild(listItem);
    });

    projectBasedRoles.forEach(role => {
        const listItem = document.createElement("li");
        listItem.textContent = role;
        projectList.appendChild(listItem);
    });
}

document.getElementById("addProject").addEventListener("click", function () {
    const projectSection = document.getElementById("projectSection");
    const projectCount = projectSection.children.length + 1;

    const newProject = document.createElement("div");
    newProject.classList.add("project");

    newProject.innerHTML = `
        <label for="projectTitle">Project ${projectCount} Title:</label>
        <input type="text" class="projectTitle" placeholder="Enter project title (optional)">

        <label for="projectTech">Using Technology:</label>
        <input type="text" class="projectTech" placeholder="Enter technology used (e.g., React, Node.js)">

        <label for="projectDesc">Brief Explanation:</label>
        <textarea class="projectDesc" placeholder="Brief explanation of the project (optional)"></textarea>
    `;

    projectSection.appendChild(newProject);
});



function showForm() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('formPage').style.display = 'block';
}

function showLandingPage() {
    document.getElementById('formPage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'flex';
}