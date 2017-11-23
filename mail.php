<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/Exception.php';
require 'vendor/PHPMailer.php';
require 'vendor/SMTP.php';


if(isset($_POST) && !empty($_POST)) {
    $errors = array();
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    if (!isset($name) || empty($name) || strlen($name) < 3) {
        $errors['name'] = 'Fullname is to short or undefined';
    }
    if (!isset($message) || empty($message) || strlen($message) < 3) {
        $errors['message'] = 'Message is to short or undefined';
    }
    if (!isset($email) || empty($email) || !validateEmail($email)) {
        $errors['email'] = 'Email is not valid';
    }

    if (count($errors) > 0) {
        header('Content-type: application/json');
        http_response_code(400);
        echo json_encode($errors);
    } else {
            $content = "Name: " . $name . " \n";
            $content .= "Email: " . $email . " \n";
            $content .= "Message: " . $message . " \n";

            try {
                $mail = new PHPMailer(true);
                $mail->SMTPDebug = 0;
                $mail->isSMTP();
                $mail->CharSet = 'UTF-8';
                $mail->Host = 'smtp.rambler.ru';
                $mail->SMTPAuth = true;
                $mail->Username = 'pupkin-vova@rambler.ua';
                $mail->Password = '102030Aa';
                $mail->SMTPSecure = 'ssl';
                $mail->Port = 465;
                $mail->setFrom('pupkin-vova@rambler.ua', 'GlobalVision');
                $mail->addAddress('noliynyk@codevision.com.ua');
                $mail->addReplyTo('pupkin-vova@rambler.ua', 'Information');
                $mail->isHTML(false);
                $mail->Subject = 'Contact Form';
                $mail->Body    = $content;

                $mail->send();
                http_response_code(200);
            } catch (Exception $e) {
                http_response_code(400);
                echo json_encode($mail->ErrorInfo);
            }
        }
} else {
    header('Content-type: application/json');
    http_response_code(400);
    echo json_encode("Bad request");
}
function validateEmail($email)
{
    return preg_match('/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i', $email);
}
