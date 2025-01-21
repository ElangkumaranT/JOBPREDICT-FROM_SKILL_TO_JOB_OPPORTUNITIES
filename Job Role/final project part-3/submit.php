<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the form
$jobTitle = $_POST['jobTitle'];
$jobType = $_POST['jobType'];
$companyName = $_POST['companyName'];
$companyUrl = $_POST['companyUrl'];
$jobLocation = $_POST['jobLocation'];
$applyLink = $_POST['applyLink'];
$salary = $_POST['salary'];
$experience = $_POST['experience'];
$skills = $_POST['skills'];
$jobDescription = $_POST['jobDescription'];
$currentDate = date("Y-m-d"); // Get the current date

// Debugging check for jobType
if (empty($jobType)) {
    die("Job Type is empty. Please ensure the form is submitting the correct data.");
}

// Prepare SQL query
$sql = "INSERT INTO jobs (job_title, job_type, company_name, company_url, job_location, apply_link, salary, experience, skills, job_description, date_posted)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare and bind
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}
$stmt->bind_param("ssssssdisss", $jobTitle, $jobType, $companyName, $companyUrl, $jobLocation, $applyLink, $salary, $experience, $skills, $jobDescription, $currentDate);

// Execute the query
if ($stmt->execute()) {
    $message = "Job posted successfully!";
    $messageType = "success";
} else {
    $message = "Error: " . $stmt->error;
    $messageType = "error";
}

// Close connection
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Submission Status</title>
    <style>
        /* Notification Styles */
        .notification {
            max-width: 500px;
            margin: 20px auto;
            padding: 15px;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
        }
        .notification.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .notification.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        

    </style>
</head>
<body>



    <div class="notification <?php echo $messageType; ?>">
        <?php echo htmlspecialchars($message); ?>
    </div>


    
</body>
</html>
