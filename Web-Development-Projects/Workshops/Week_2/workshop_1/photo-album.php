<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP photoalbum</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	    <?php

	    $albumTitle = "Photo Album";
	    $albumDescription = "A collection of things";
	    $imageDirectory = "assets/images/";

		echo '<h1>'. $albumTitle . '</h1>';
		echo "<h2>$albumDescription</h2>";

		$files = scandir($imageDirectory);
		$files = array_diff($files, array('.', '..'));

		$descriptionFile = "descriptions.json";
	    $readDescriptions = [];
	    $writeDescriptions = [];
	    if (file_exists($descriptionFile)) {
	        $fileContent = file_get_contents($descriptionFile);
	        $readDescriptions = json_decode($fileContent, true);
    	}

		echo '<div class="photo-album">';
		foreach ($files as $imageFile) {
	        echo $imageFile . "<br>";

			echo "<div class='photo-thumbnail'>";
			echo '<img src="' . $imageDirectory . $imageFile . '" />';
				
	        if (is_array($readDescriptions)) {
	            if (in_array($imageFile, array_keys($readDescriptions))) {
	                echo '<p>' . $readDescriptions[$imageFile] . '</p>';
	                $writeDescriptions[$imageFile] = $readDescriptions[$imageFile];
	            } else {
	                $writeDescriptions[$imageFile] = '';
	            }
	        }
			echo "</div>";
	    }
		echo "</div>";

		$jsonstring = json_encode($writeDescriptions, JSON_PRETTY_PRINT); //
	    $tempFile = fopen($descriptionFile, "w") or die("Unable to open file!");
	    fwrite($tempFile, $jsonstring);
    	fclose($tempFile);

	    ?>
</body>
</html>