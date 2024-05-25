<?php
session_start();
require 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

// Get the job ID from the POST request
$data = json_decode(file_get_contents('php://input'), true);
$job_id = $data['job_id'];

// Get the user ID from the session
$user_id = $_SESSION['user_id'];

// Insert the application into the database
$stmt = $conn->prepare("INSERT INTO applications (user_id, job_id) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $job_id);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Application submitted successfully']);
} else {
    echo json_encode(['error' => 'Failed to submit application']);
}

$stmt->close();
$conn->close();
?>
