<?php
include 'includes/nav.php';
include("backend/config.php");
include("backend/reactions.php");
include("backend/videos.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postArray = [
        'title' => $_POST['title'] ?? '',
        'description' => $_POST['description'] ?? '',
        'url' => $_POST['url'] ?? ''
    ];

    $result = Videos::setVideo($postArray);

    if (isset($setReaction['error']) && !empty($setReaction['error'])) {
        echo "<ul class='error-messages'>";
        foreach ($setReaction['error'] as $error) {
            echo "<li>" . htmlspecialchars($error) . "</li>";
        }
        echo "</ul>";
    }

    if (isset($setReaction['succes'])) {
        header("Location: " . $_SERVER['PHP_SELF']);
        exit(); 
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post a Video</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="background-color: rgb(31, 31, 31); color: white;">
    <h1>Post a New Video</h1>

    <form action="" method="POST">
        <label for="title">Video Title:</label><br>
        <input type="text" id="title" name="title" required><br><br>

        <label for="description">Video Description:</label><br>
        <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>

        <label for="url">Video URL:</label><br>
        <label for="url">(make sure this is an embed url and not a sharing url)</label><br>
        <input type="url" id="url" name="url" required><br><br>

        <input type="submit" value="Post Video">
    </form>

    <?php
    if (isset($_GET['status'])) {
        $status = $_GET['status'];
        if ($status == 'success') {
            echo "<p>Video posted successfully!</p>";
        } elseif ($status == 'error') {
            echo "<p>There was an error posting the video. Please try again.</p>";
        }
    }
    ?>
</body>
</html>
