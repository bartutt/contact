<?php
session_start();
$token = bin2hex(random_bytes(32));
if(empty($_SESSION['token']))
  $_SESSION['token'] = $token;
?>
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
      <input id="name" name = "name" pattern=".{3,}"  type = "text"  placeholder = "Navn"  data-text-error = "Write right name" required>
      <input id = "email" name = "email" type = "email" placeholder = "e-post" data-text-error = "Write right e-mail" required>
      <input  id = "tel" name = "tel" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{2}" type = "text"  placeholder = "tlf nummer" data-text-error = "Write right tel" required>
      <textarea id = "message" name = "message" pattern=".{3,}" placeholder = "Beskjed"  data-text-error = "Write right message" required></textarea>
      <span class = "honey"><input type="text" name="honey"></span>
      <input type="hidden" name="token" value="<?php echo $token; ?>">
      <button type="submit" class="submit-btn" class = "button">send</button>
    </form>
    <script src = "js/validation.js"></script>
  </body>
</html>