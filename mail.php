<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/Exception.php';
require 'vendor/PHPMailer.php';
require 'vendor/SMTP.php';

echo 'sending'

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.rambler.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'pupkin-vova@rambler.ua';                 // SMTP username
    $mail->Password = '102030Aa';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('norely@globalvision.com.ua', 'GlobalVision');
    $mail->addAddress('amartyniuk@codevision.com.ua', 'Joe User');     // Add a recipient
    $mail->addAddress('noliynyk@codevision.com.ua');               // Name is optional
    $mail->addReplyTo('noliynyk@codevision.com.ua', 'Information');

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Subject';
    $mail->Body    = 'qjqjqjq';

    $mail->send();
    echo 'Message has been sent';
    // header('Content-type: application/json');
    // http_response_code(200);
} catch (Exception $e) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}