function showDetails(jobId) {
    const job = {
        1: {
            job_title: "Frontend Developer",
            company_name: "Tech Solutions",
            salary: "80,000",
            experience: "2-3 years",
            skills: "HTML, CSS, JavaScript, React",
            job_description: "Developing frontend features using React.",
            apply_link: "https://apply-techsolutions.com"
        }
    }[jobId];

    document.getElementById('modalJobTitle').textContent = job.job_title;
    document.getElementById('modalCompanyName').textContent = job.company_name;
    document.getElementById('modalSalary').textContent = job.salary;
    document.getElementById('modalExperience').textContent = job.experience;
    document.getElementById('modalSkills').textContent = job.skills;
    document.getElementById('modalDescription').textContent = job.job_description;
    document.getElementById('applyLink').href = job.apply_link;
    document.getElementById('jobModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('jobModal').style.display = 'none';
}

// .check-btn {
//     background-color:white;
   
//     padding: 10px 2px;
//     border: none;
//     border-radius: 20px;
//     cursor: pointer;
//     border: 2px solid black;
//     width: 20%;
//     margin-left: 220%;
   
// }