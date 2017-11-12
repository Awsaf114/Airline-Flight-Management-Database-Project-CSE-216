<?php
  if (isset($_POST['submit'])) {
    # code...
    $name = $_POST['name'])      ||
    $email_address = $_POST['email'])     ||
    $phone = $_POST['phone'])     ||
    $msg = $_POST['message'])   ||

    $to = 'awsafalam@gmail.com'

    $email_subject = "Website Contact Form:  $name";
    $email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$msg";
    $headers = "From: ".$email_address;
    // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
    // $headers .= "Reply-To: $email_address";

    if(mail($to,$email_subject,$email_body,$headers)){
        echo "Successful";
    }
    else{
      echo "Error";
    }


  }


 ?>
