<?php
session_start();
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $user_type = $_SESSION['user_type'];

    if ($user_type == 'employer') {
        $company_name = $_POST['company_name'];
        $company_description = $_POST['company_description'];

        $stmt = $conn->prepare("UPDATE users SET company_name = ?, company_description = ? WHERE id = ?");
        $stmt->bind_param("ssi", $company_name, $company_description, $user_id);
        
    } else if ($user_type == 'candidate') {
        // Check if file was uploaded
        if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
            $resume_temp_path = $_FILES['resume']['tmp_name'];
            $resume_name = $_FILES['resume']['name'];
            $resume_path = 'uploads/' . $resume_name; // Directory where file will be stored
            move_uploaded_file($resume_temp_path, $resume_path); // Move uploaded file to desired directory

            $stmt = $conn->prepare("UPDATE users SET resume_path = ? WHERE id = ?");
            $stmt->bind_param("si", $resume_path, $user_id);
        }
    }

    if ($stmt->execute()) {
        header('Location: dashboard.html');
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
