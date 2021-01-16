<?php
    session_start();
    
    require_once('validator.php');

    $val = new Validator;
   
    $mailToSend = "witkowski.bartlomiej1@gmail.com";

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $name = $_POST["name"];
            $email = $_POST["email"];
            $tel = $_POST["tel"];
            $message = $_POST["message"];
            $aspam = $_POST["honey"];

            $errors = [];
            $return = [];
    
            if (empty($aspam)) {
    
                if ($_SESSION['token'] === $_POST['token']) {     

                    if ((!$val->isValid($name, 'name')) || (strlen($name) > 15)) {
                        array_push($errors, "name");
                    }
                    if ((!filter_var($email, FILTER_VALIDATE_EMAIL)) || (strlen($email) > 25)) { 
                        array_push($errors, "email");
                    }
                    if ((!$val->isValid($tel, 'tel')) || (strlen($tel) > 8)) {
                        array_push($errors, "tel");
                    }
                    if ((!$val->isValid($message, 'msg')) || (strlen($message) > 250)) {
                        array_push($errors, "message");
                    }

                    if (count($errors) > 0) {
                        $return["errors"] = $errors;
                        } else {

                            $headers  = "MIME-Version: 1.0" . "\r\n";
                            $headers .= "Content-type: text/html; charset=UTF-8". "\r\n";
                            $headers .= "From: ".$email."\r\n";
                            $headers .= "Reply-to: ".$email;
                            $message  = "
                                        <html>
                                            <head>
                                                <meta charset=\"utf-8\">
                                            </head>
                                            <body>
                                                <div> Name: $name</div>       
                                                <div> Email: <a href=\"mailto:$email\">$email</a> </div>
                                                <div> Tel: $tel</div>
                                                <div> Message: </div>
                                                <div> $message </div>
                                            </body>
                                        </html>";

                            if (mail($mailToSend, "Customer on DESIGN-BW.no - " . date("d-m-Y"), $message, $headers)) {
                                $return["status"] = "ok";
                                $_SESSION["isSend"] = true;
                            } else {
                                $return["status"] = "error";
                            }
                        }
                    
                    } // end of token check
                
                }// end of honey pot

                header("Content-Type: application/json");
                echo json_encode($return);
        }