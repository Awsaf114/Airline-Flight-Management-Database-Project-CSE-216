<?php 

	
	function SourceOnly($source)
	{
		$conn=oci_connect("BUETAIRLINES" , "113114","localhost/xe");
		if (!$conn) {
		  $e = oci_error();
		  trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
		}
	

	    // $strings = "SELECT 'RX'||ROUTE_ID , A.NAME || ' ' || A.CITY || ' , ' || A.COUNTRY \"Source\", 
	    // D.NAME||' ' || D.CITY|| ' , ' || D.COUNTRY \"Destination\", F.ARRIVAL_DATE_TIME , 
	    // F.DEPARTURE_DATE_TIME 
	    // FROM FLIGHT F, AIRPORT A , AIRPORT D
	    // WHERE ROUTE_ID = ANY 
	    // (SELECT ROUTE_ID  FROM ROUTE  WHERE SOURCE = ANY 
	    // (SELECT AIRPORT_ID FROM AIRPORT WHERE ( NAME =" . "'". $source . "'"." OR CITY = ". "'".$source. "'"." OR COUNTRY = ". "'".$source. "'"."))) AND 
	    // (A.NAME = ". "'".$source. "'"." OR A.CITY =". "'".$source. "'"." OR A.COUNTRY =". "'".$source. "'".")
	    // AND ROWNUM <= 10";

		$strings = "SELECT 'RX'||F.ROUTE_ID , A.NAME || ' ' || A.CITY || ' , ' || A.COUNTRY \"Source\", 
	    D.NAME||' ' || D.CITY|| ' , ' || D.COUNTRY \"Destination\", F.ARRIVAL_DATE_TIME ,
	    F.DEPARTURE_DATE_TIME
	    FROM ROUTE R FULL JOIN FLIGHT F
	    ON (R.ROUTE_ID = F.ROUTE_ID)
	    FULL JOIN AIRPORT A
	    ON(A.AIRPORT_ID = R.SOURCE)
	    FULL JOIN AIRPORT D
	    ON (D.AIRPORT_ID = R.DESTINATION)
	    WHERE ( F.FLIGHT_ID IS NOT NULL AND (A.NAME = ". "'".$source. "'"." OR 
	    A.CITY =". "'".$source. "'"." OR A.COUNTRY =". "'".$source. "'".") AND ROWNUM <= 20 )";




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
	                        </div>
	                        <div class=\"panel-body\">
	                            <table width=\"100%\" class=\"table table-striped highlight centered table-bordered table-hover\" id=\"dataTables-example\">
	                                <thead>
	                                    <tr>
	                                      <th>Flight</th>
	                                      <th>Source</th>
	                                      <th>Destination</th>
	                                      <th>Arrival</th>
	                                      <th>Departure</th>
	                                    </tr>
	                                </thead>
	                                <tbody>\n";

	  // $posts = array();
	  
	  while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
	   // $tmp = array();
	           
	   
	      echo "<tr>\n";
	      foreach ($row as $item) {
	          echo "<th>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</th>\n";
	         // $tmp["Flight"] = $item;
	         // $tmp["Source"] = $item;
	         // $tmp["Destination"] = $item;
	         // $tmp["Arrival"] = $item;
	         //  $tmp["Departure"] = $item;  
	     
	      }
	      echo "</tr>\n";
	     // array_push($posts, $tmp);
	  
	  }
	  
	     // $posts->close();

	  // echo json_encode($posts);

	  echo "</table>\n";

	  oci_free_statement($stid);

	  
	  oci_close($conn);
	}

	function ShowTable($strings)
	{
		$conn=oci_connect("BUETAIRLINES" , "113114","localhost/xe");
	    if (!$conn) {
	      $e = oci_error();
	      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	  	}


    
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
                        </div>
                        <div class=\"panel-body\">
                            <table width=\"100%\" class=\"table table-striped highlight centered table-bordered table-hover\" id=\"dataTables-example\">
                                <thead>
                                    <tr>
                                      <th>Flight</th>
                                      <th>Source</th>
                                      <th>Destination</th>
                                      <th>Arrival</th>
                                      <th>Departure</th>
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
	
		
	}

	

 ?>