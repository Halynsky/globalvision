<?php

if(isset($_POST) && !empty($_POST)) {
	$admin_email = 'caiterchrome@gmail.com';
	$admin_name = 'Contact Form';
	$reply = 'caiterchrome@gmail.com';
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

            $headers = 'From: "' . $admin_name . '" <' . $reply . '>' . "\r\n" .
                'Reply-To: '.$admin_email . "\r\n" .
                'Cc: amartyniuk@codevision.com.ua' . "\r\n" .
                'Bcc: noliynyk@codevision.com.ua' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();


            mail($admin_email, $admin_name, $content, $headers);



            header('Content-type: application/json');
            http_response_code(200);
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