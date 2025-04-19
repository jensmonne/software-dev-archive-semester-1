<link rel="stylesheet" href="assets/css/style.css">

<?php
include 'includes/nav.php';
include("backend/config.php");
include("backend/reactions.php");
include("backend/videos.php");

$id = $_GET['id'] ?? '';
$id = (int)$id;

$videos = Videos::getVideos($con);

$video = null;
foreach ($videos as $v) {
    if ($v['id'] === $id) {
        $video = $v;
        break;
    }
}

if ($video) {
    echo "<h1>" . htmlspecialchars($video['title']) . "</h1>";
    echo "<iframe width='560' height='315' src='" . htmlspecialchars($video['url']) . "' frameborder='0' allowfullscreen></iframe>";
    echo "<p>" . htmlspecialchars($video['description']) . "</p>";
} else {
    echo "Video not found.";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reactionResult = Reactions::setReaction($_POST, $id);
    if (isset($reactionResult['success'])) {
        echo "<p style='color: green;'>Comment added successfully!</p>";
        header("Location: " . $_SERVER['PHP_SELF'] . "?id=" . $id);
        exit();
    } elseif (isset($reactionResult['error'])) {
        foreach ($reactionResult['error'] as $error) {
            echo "<p style='color: red;'>" . htmlspecialchars($error) . "</p>";
        }
    }
}

?>

<h2>Add a Comment:</h2>
<form method="POST" action="play.php?id=<?= $id ?>">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <textarea id="message" name="message" rows="3" cols="28" placeholder="Write your reaction here..." required></textarea><br><br>

        <button type="submit">Send</button>
</form>

<h2>Comments:</h2>
<div id="commentsContainer">
<?php
$getReactions = Reactions::getReactions($id);

if (!empty($getReactions)) {
    foreach ($getReactions as $reaction) {
        echo "<div class='reaction'>";
        echo "<h4>" . htmlspecialchars($reaction['name']) . " (" . htmlspecialchars($reaction['email']) . ")</h4>";
        echo "<p>" . htmlspecialchars($reaction['message']) . "</p>";
        echo "</div>";
    }
} else {
    echo "<p>No comments yet. Be the first to comment!</p>";
}
?>
</div>