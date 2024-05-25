<?php
session_start();
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $job_title = $_POST['job_title'];
    $job_description = $_POST['job_description'];
    $location = $_POST['location'];
    $salary = $_POST['salary'];
    $employer_id = $_SESSION['user_id']; // Using the logged-in employer's ID

    $stmt = $conn->prepare("INSERT INTO jobs (job_title, job_description, location, salary, employer_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssdi", $job_title, $job_description, $location, $salary, $employer_id);

    if ($stmt->execute()) {
        header('Location: dashboard.html');
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
