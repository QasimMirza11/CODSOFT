<?php
// Include database configuration
require 'config.php';

// Get the search query from the URL parameters
$search = $_GET['search'] ?? '';

// Prepare the search query for SQL LIKE
$search = "%{$search}%";

// Prepare and execute the SQL statement
$stmt = $conn->prepare("SELECT * FROM jobs WHERE job_title LIKE ? OR job_description LIKE ? OR location LIKE ?");
$stmt->bind_param("sss", $search, $search, $search);
$stmt->execute();
$result = $stmt->get_result();

// Initialize an empty array to store job data
$jobs = array();
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

// Close the statement and database connection
$stmt->close();
$conn->close();

// Return jobs data as JSON
echo json_encode($jobs);
?>
