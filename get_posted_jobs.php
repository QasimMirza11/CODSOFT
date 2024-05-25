<?php
// Include database configuration
require 'config.php';

// Initialize an empty array to store job data
$jobs = array();

// Prepare and execute SELECT query to fetch all jobs
$stmt = $conn->prepare("SELECT * FROM jobs");
$stmt->execute();
$result = $stmt->get_result();

// Fetch each row and add it to the $jobs array
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

// Close the statement and database connection
$stmt->close();
$conn->close();

// Return jobs data as JSON
echo json_encode($jobs);
?>
