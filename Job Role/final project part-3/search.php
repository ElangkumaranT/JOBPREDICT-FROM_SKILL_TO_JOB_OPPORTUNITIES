<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Filter and search logic
$jobType = $_GET['jobType'] ?? 'All';
$jobLocation = $_GET['jobLocation'] ?? 'All';
$searchQuery = $_GET['searchQuery'] ?? '';

$sql = "SELECT * FROM jobs WHERE 1=1";

if ($jobType !== 'All') {
    $sql .= " AND job_type = '" . $conn->real_escape_string($jobType) . "'";
}

if ($jobLocation !== 'All') {
    $sql .= " AND job_location = '" . $conn->real_escape_string($jobLocation) . "'";
}

if (!empty($searchQuery)) {
    $sql .= " AND job_title LIKE '%" . $conn->real_escape_string($searchQuery) . "%'";
}

$result = $conn->query($sql);
$jobs = $result->fetch_all(MYSQLI_ASSOC);

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Listings</title>
    <style>
        /* General Styles */
        .back-button1 {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #007bff;
      color: #fff;
      padding: 10px 15px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .back-button1:hover {
      background-color: #0056b3;
    }
       
    </style>
      <link rel="stylesheet" href="search.css?v=<?php echo time(); ?>">
</head>
<body>


<button class="back-button1" onclick="history.back()">Back</button>
    <div class="header">
        <h1>Open Job Listing</h1>
    </div>

    <div class="filter-bar">
        <form method="GET" action="">
            <select name="jobType">
                <option value="All" <?= $jobType == 'All' ? 'selected' : '' ?>>All Job Types</option>
                <option value="Full-time" <?= $jobType == 'Full-time' ? 'selected' : '' ?>>Full-time</option>
                <option value="Part-time" <?= $jobType == 'Part-time' ? 'selected' : '' ?>>Part-time</option>
                <option value="Contract" <?= $jobType == 'Contract' ? 'selected' : '' ?>>Contract</option>
            </select>
            <select name="jobLocation">
                <option value="All" <?= $jobLocation == 'All' ? 'selected' : '' ?>>All Locations</option>
                <option value="Remote" <?= $jobLocation == 'Remote' ? 'selected' : '' ?>>Remote</option>
                <option value="Onsite" <?= $jobLocation == 'Onsite' ? 'selected' : '' ?>>Onsite</option>
                <option value="Hybrid" <?= $jobLocation == 'Hybrid' ? 'selected' : '' ?>>Hybrid</option>
            </select>
            <input type="text" name="searchQuery" placeholder="Search job title" value="<?= htmlspecialchars($searchQuery) ?>">
            <button type="submit">Search</button>
        </form>
    </div>

    <div class="job-list">
    <?php if (empty($jobs)): ?>
        <div class="no-jobs">
            <p>No jobs found. Please adjust your filters or try again later.</p>
        </div>
    <?php else: ?>
        <?php foreach ($jobs as $job): ?>
            <div class="job-card">
                <div class="job-left">
                    <h2><?= htmlspecialchars($job['job_title']) ?></h2>
                    <a href="<?= htmlspecialchars($job['company_url']) ?>" class="company-btn" target="_blank"><?= htmlspecialchars($job['company_name']) ?></a>
                </div>
                <div class="skills">
                    <?php foreach (explode(',', $job['skills']) as $skill): ?>
                        <span class="skill-tag"><?= htmlspecialchars($skill) ?></span>
                    <?php endforeach; ?>
                </div>
                <div class="job-right">
                    <p><?= htmlspecialchars($job['date_posted']) ?> | <?= htmlspecialchars($job['job_type']) ?> | <?= htmlspecialchars($job['job_location']) ?></p>
                    <button class="check-btn" onclick="openPopup(<?= htmlspecialchars(json_encode($job)) ?>)">Check</button>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>


    <div class="job-popup" id="jobPopup">
        <button class="close-btn" onclick="closePopup()">X</button>
        <div id="popupContent"></div>
    </div>

    <script>
        function openPopup(job) {
            const popup = document.getElementById('jobPopup');
            const content = document.getElementById('popupContent');

            content.innerHTML = `
                <h2>${job.job_title} @ ${job.company_name}</h2>
                <p><strong>Posted on:</strong> ${job.date_posted}</p>
                <p><strong>Job Type:</strong> ${job.job_type}</p>
                <p><strong>Location:</strong> ${job.job_location}</p>
                <p><strong>Company URL:</strong> <a href="${job.company_url}" target="_blank">${job.company_name}</a></p>

                <p><strong>Description:</strong> ${job.job_description}</p>
                <p><strong>Skills:</strong> ${job.skills.split(',').map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</p>
                <a href="${job.apply_link}" class="apply-btn">Apply</a>
            `;

            popup.style.display = 'block';
        }

        function closePopup() {
            const popup = document.getElementById('jobPopup');
            popup.style.display = 'none';
        }
    </script>
</body>
</html>
