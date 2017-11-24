<?php


// $app->post('/uploadquestion', function() use ($app)  {
    
	
// 	$username=$app->request->post('source');
// 	$question=$app->request->post('destination');
// 	$category=$app->request->post('Departure');
// 	$notifications=$app->request->post('Arrival');
	
  
//   $conn=oci_connect("BUETAIRLINES" , "113114","localhost/xe");
//     if (!$conn) {
//       $e = oci_error();
//       trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
//   }

//   $strings = "SELECT * FROM PASSENGER";

//   $stid = oci_parse($conn, $strings);
//   if (!$stid) {
//       $e = oci_error($conn);
//       trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
//   }

//   // Perform the logic of the query
//   $r = oci_execute($stid);
//   if (!$r) {
//       $e = oci_error($stid);
//       trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
//   }



//   echoRespnse(201,$strings);  
// });

  $conn=oci_connect("BUETAIRLINES" , "113114","localhost/xe");
    if (!$conn) {
      $e = oci_error();
      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
  }

  // $strings = "SELECT * FROM ROUTE WHERE ROUTE_ID <=50";

  $strings = "SELECT NAME  FROM AIRPORT  WHERE AIRPORT_ID = ANY (SELECT SOURCE FROM ROUTE ) ";


  $stid = oci_parse($conn, $strings);
  if (!$stid) {
      $e = oci_error($conn);
      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
  }

  // Perform the logic of the query
  $r = oci_execute($stid);
  if (!$r) {
      $e = oci_error($stid);
      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
  }

  // Fetch the results of the query
  echo "<div class=\"row\">
                <div class=\"col-lg-12\">
                    <div class=\"panel panel-default\">
                        <div class=\"panel-heading\">
                            DataTables Advanced Tables
                        </div>
                        <div class=\"panel-body\">
                            <table width=\"100%\" class=\"table table-striped table-bordered table-hover\" id=\"dataTables-example\">
                                <thead>
                                    <tr>
                                        <th>Source</th>
                                        <th>Destination</th>
                                        <th>Last name</th>
                                    </tr>
                                </thead>
                                <tbody>\n";


  while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
      echo "<tr>\n";
      foreach ($row as $item) {
          echo "<th>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</th>\n";
      }
      echo "</tr>\n";
  }
  echo "</table>\n";

  oci_free_statement($stid);

  
  oci_close($conn);

  // $r->bind_result($id,$SRC,$DST);
  
  // $posts = array();
  

  // while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
  // $tmp = array();
 
  //     foreach ($row as $item) {
  //        $tmp["id"] = $item;
  //        $tmp["SRC"] = $item;
  //        $tmp["DST"] = $item;
  //        echo($item);

  //      //     print "<th>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") 


  //     }

           
  //  array_push($posts, $tmp);

  // }
 
  // oci_free_statement($stid);
  // oci_close($conn);

        
  // echoRespnse(201,$posts);  
	
  // echo($posts);
	




?>