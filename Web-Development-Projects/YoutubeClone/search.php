<?php
include 'includes/nav.php';
include("backend/config.php");
include("backend/reactions.php");
include("backend/videos.php");

// Retrieve the search query from the form submission
$query = $_GET['query'] ?? '';
$query = strtolower(trim($query));

// Fetch all videos
$videos = Videos::getVideos($con);

// Filter videos based on the search query
$filteredVideos = array_filter($videos, function($video) use ($query) {
    return strpos(strtolower($video['title']), $query) !== false ||
           strpos(strtolower($video['description']), $query) !== false;
});
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Videos</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        body {
        background-color: rgb(31, 31, 31);
        color: white;
        font-family: Arial, sans-serif;
        }
        .search-bar {
            margin: 20px 0;
            text-align: center;
        }
        .search-bar input[type="text"] {
            width: 300px;
            padding: 10px;
            border-radius: 5px;
            border: none;
        }
        .search-bar button {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            background-color: #007BFF;
            color: white;
            cursor: pointer;
        }
        .search-bar button:hover {
            background-color: #0056b3;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
        }

    </style>
</head>
<body>
    <div class="search-bar">
        <form method="GET" action="search.php">
            <input type="text" name="query" placeholder="Search for videos..." value="<?= htmlspecialchars($query) ?>">
            <button type="submit">Search</button>
        </form>
    </div>

    <?php if (!empty($filteredVideos)): ?>
        <h2>Search Results:</h2>
        <ul>
            <?php foreach ($filteredVideos as $video): ?>
                <li>
                    <a href="play.php?id=<?= $video['id'] ?>"><?= htmlspecialchars($video['title']) ?></a><br>
                    <small><?= htmlspecialchars($video['description']) ?></small>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>No videos found for: <?= htmlspecialchars($query) ?></p>
    <?php endif; ?>
</body>
</html>
