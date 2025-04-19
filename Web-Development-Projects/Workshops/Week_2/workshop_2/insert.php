<?php
include 'connectie.php';

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Jeans', 'Monne', 'jeansmonne@gmail.com')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();