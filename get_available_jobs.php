<?php
require 'config.php';

$stmt = $conn->prepare("SELECT id, job_title, job_description, location, salary FROM jobs");
$stmt->execute();
$result = $stmt->get_result();

$jobs = array();
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);

$stmt->close();
$conn->close();
?>
