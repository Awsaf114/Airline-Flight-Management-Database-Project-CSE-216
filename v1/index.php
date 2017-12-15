<?php

include  'TableSearch.php';

  $table = $_GET["table"];
  

if ($table == "Employee") {
    $query = "SELECT * FROM EMPLOYEE ";

    // ShowTable($query);
    JSONsendFLight($query);
}
else if ($table == "Validate") {
    $query = "SELECT * FROM ADMIN ";

    // ShowTable($query);
    EmployeeValidate($query);
}


  
?>