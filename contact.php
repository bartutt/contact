<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact form validation</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <form id = "contactForm" action = "send.php" method = "post">
      <input id="name" name = "name" pattern=".{3,}"  type = "text"  placeholder = "Navn" required>
      <input id = "email" name = "email" type = "email" placeholder = "e-post" required>
      <input  id = "tel" name = "tel" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{2}" type = "text"  placeholder = "tlf nummer" required>
      <textarea id = "message" name = "message" rows = "8" placeholder = "Beskjed" required></textarea>
      <button type="submit" class="submit-btn" class = "button">send</button>
      <div id ="msg"></div>
    </form>
    <script src = "js/validation.js"></script>
  </body>
</html>