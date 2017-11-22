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
            $content .= "MEssage: " . $message . " \n";

            // $headers = 'From: "' . $admin_name . '" <' . $reply . '>' . "\r\n" .
            //     'Reply-To: '.$admin_email . "\r\n" .
            //     'Cc: amartyniuk@codevision.com.ua' . "\r\n" .
            //     'Bcc: noliynyk@codevision.com.ua' . "\r\n" .
            //     'X-Mailer: PHP/' . phpversion();


            // mail($admin_email, $admin_name, $content, $headers);
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
    $mail->Body    = $content;

    $mail->send();
    header('Content-type: application/json');
    http_response_code(200);
} catch (Exception $e) {
    header('Content-type: application/json');
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
