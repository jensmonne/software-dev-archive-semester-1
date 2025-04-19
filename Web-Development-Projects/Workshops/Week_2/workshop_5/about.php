<?php
    include 'includes/header.php';
    $title = "About Us";
    $description = "Learn more about our company and what we do.";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo $description; ?>">
    <title><?php echo $title; ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1><?php echo $title; ?></h1>
    </header>
    <main>
        <section>
            <h2>Our Mission</h2>
            <p>Our mission is to deliver high-quality products and services that bring value to our customers.</p>
        </section>
        <section>
            <h2>Who We Are</h2>
            <p>We are a team of passionate professionals dedicated to innovation and excellence.</p>
        </section>
        <section>
            <h2>Contact Information</h2>
            <p>For more information, please visit our <a href="contact.php">Contact Page</a>.</p>
        </section>
    </main>
    <footer>
        <p>&copy; <?php echo date("Y"); ?> Jeans & Co. All rights reserved.</p>
    </footer>
</body>
</html>