# Steps
1) Download [PHPMailer](https://github.com/PHPMailer/PHPMailer) from here . Paste that folder to your project.
2) Remove semi-colon before **extension=php_openssl.dll** from **php.ini** file (usual location: C:\xampp\php)
3) Set **$mail->Username** as sender email in [mailer.php](https://github.com/Utshaw/sample_PHPMailer/blob/master/mailer.php). 
4) Set **$mail->Password** as sender email password in [mailer.php](https://github.com/Utshaw/sample_PHPMailer/blob/master/mailer.php). 

# Troubleshooting
1) Check if windows firewall or your antivirus software is blocking connection.
2) Allow less secure apps from [here](https://myaccount.google.com/u/2/lesssecureapps?pageId=none) if you sender email is of gmail type.
