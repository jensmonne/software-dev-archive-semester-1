<?php
    include 'includes/header.php';
    $title = "Contact Us";
    $description = "Get in touch with our team through the contact form or find our contact information here.";
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
            <h2>Contact Form</h2>
            <form action="process_contact.php" method="post">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name" required><br><br>

                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br><br>

                <label for="message">Message:</label><br>
                <textarea id="message" name="message" rows="5" required></textarea><br><br>

                <button type="submit">Send Message</button>
            </form>
        </section>
        <section>
            <h2>Our Location</h2>
            <p>123 Wall Street, Suite 7<br>
            HollowNest, ST 12345</p>
            <p>Email: contact@jeansco.com<br>
            Phone: (123) 456-7890</p>
        </section>
    </main>
    <footer>
        <p>&copy; <?php echo date("Y"); ?> Jeans & co. All rights reserved.</p>
    </footer>
</body>
</html>
