<?php
/* Database connection settings */
$host = 'localhost';
$user = 'root';
$pass = 'sunny78669';
$db = 'accounts';
$mysqli = new mysqli($host,$user,$pass,$db) or die($mysqli->error);
