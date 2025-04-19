<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Bingo</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <h1>Color Bingo Card</h1>

    <p>Click the button to print all bingo cards.</p>

    <button class="print-button" onclick="window.print();">Print all cards</button>

    <div class="bingo-container">
        <?php
        $colors = [
            "red", "yellow", "blue", "green", "orange", "purple", 
            "black", "white", "gray", "brown", "pink", "indigo", 
            "turquoise", "beige"
        ];

        for ($i = 0; $i < 24; $i++) {
            shuffle($colors);
            $boardColors = array_slice($colors, 0, 9);

            echo "<div class='bingo-card'>";
            echo "<h3>Card " . ($i + 1) . "</h3>";
            echo "<div class='bingo-grid'>";
            foreach ($boardColors as $color) {
                echo "<div class='bingo-cell' style='background-color: $color;'>$color</div>";
            }
            echo "</div></div>";
        }
        ?>
    </div>
</body>

</html>