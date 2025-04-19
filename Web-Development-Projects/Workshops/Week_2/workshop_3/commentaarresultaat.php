<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    $naam = $email = $commentaar = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = test_input($_POST["naam"]);
        $email = test_input($_POST["email"]);
        $commentaar = test_input($_POST["commentaar"]);

        if (empty($name) || empty($email)) {
            echo "Naam en email zijn verplicht";
        }
        elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Ongeldig email formaat";
            echo $emailErr;
        } 
        elseif (empty($commentaar)) {
            echo "U heeft geen commentaar opgegeven";
        } else {
            echo "Naam: " . $name;
            echo "<br>";
            echo "Email: " . $email;
            echo "<br>";
            echo "Commentaar: " . $commentaar;
        }
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    ?>
</body>

</html>