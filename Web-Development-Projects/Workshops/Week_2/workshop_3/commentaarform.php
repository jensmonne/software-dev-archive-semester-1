<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Commentaar toevoegen</h1>

    <form action="commentaarresultaat.php" method="POST">
        <div>
            naam: <input type="text" name="naam" value="">
        </div>
        <div>
            email: <input type="text" name="email" value="">
        </div>
        <div>
            <textarea name="commentaar" cols="30" rows="10"></textarea>
        </div>
        <input type="submit" value="Verzenden">
    </form>
</body>

</html>