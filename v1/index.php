<?php

include  'FlightSearch.php';

  $source=$_GET["source"];
  $destination=$_GET["destination"];
  $Departure=$_GET["Departure"];
  $Arrival=$_GET["Arrival"];


if ($destination == null && $Departure == null && $Arrival == null && $source !=null) {
    
    $query = "SELECT 'RX'||F.ROUTE_ID , A.NAME || ' ' || A.CITY || ' , ' || A.COUNTRY \"Source\", 
    D.NAME||' ' || D.CITY|| ' , ' || D.COUNTRY \"Destination\", F.ARRIVAL_DATE_TIME ,
    F.DEPARTURE_DATE_TIME
    FROM ROUTE R FULL JOIN FLIGHT F
    ON (R.ROUTE_ID = F.ROUTE_ID)
    FULL JOIN AIRPORT A
    ON(A.AIRPORT_ID = R.SOURCE)
    FULL JOIN AIRPORT D
    ON (D.AIRPORT_ID = R.DESTINATION)
    WHERE ( F.FLIGHT_ID IS NOT NULL AND (A.NAME = ". "'".$source. "'"." OR 
    A.CITY =". "'".$source. "'"." OR A.COUNTRY =". "'".$source. "'".")
    AND ROWNUM <= 20 )";


    ShowTable($query);

}
else if ($destination != null && $Departure == null && $Arrival == null && $source == null) 
{
    $query = "SELECT 'RX'||F.ROUTE_ID , A.NAME || ' ' || A.CITY || ' , ' || A.COUNTRY \"Source\", 
    D.NAME||' ' || D.CITY|| ' , ' || D.COUNTRY \"Destination\", F.ARRIVAL_DATE_TIME ,
    F.DEPARTURE_DATE_TIME
    FROM ROUTE R FULL JOIN FLIGHT F
    ON (R.ROUTE_ID = F.ROUTE_ID)
    FULL JOIN AIRPORT A
    ON(A.AIRPORT_ID = R.SOURCE)
    FULL JOIN AIRPORT D
    ON (D.AIRPORT_ID = R.DESTINATION)
    WHERE ( F.FLIGHT_ID IS NOT NULL AND (D.NAME = ". "'".$destination. "'"." OR 
    D.CITY =". "'".$destination. "'"." OR D.COUNTRY =". "'".$destination. "'".")
    AND ROWNUM <= 20 )";


    ShowTable($query);

}
else if ($destination != null && $Departure == null && $Arrival == null && $source != null) 
{
    $query = "SELECT 'RX'||F.ROUTE_ID , A.NAME || ' ' || A.CITY || ' , ' || A.COUNTRY \"Source\", 
    D.NAME||' ' || D.CITY|| ' , ' || D.COUNTRY \"Destination\", F.ARRIVAL_DATE_TIME ,
    F.DEPARTURE_DATE_TIME
    FROM ROUTE R FULL JOIN FLIGHT F
    ON (R.ROUTE_ID = F.ROUTE_ID)
    FULL JOIN AIRPORT A
    ON(A.AIRPORT_ID = R.SOURCE)
    FULL JOIN AIRPORT D
    ON (D.AIRPORT_ID = R.DESTINATION)
    WHERE ( F.FLIGHT_ID IS NOT NULL AND (D.NAME = ". "'".$destination. "'"." OR 
    D.CITY =". "'".$destination. "'"." OR D.COUNTRY =". "'".$destination. "'".")
    AND (A.NAME = ". "'".$source. "'"." OR 
    A.CITY =". "'".$source. "'"." OR A.COUNTRY =". "'".$source. "'".")
    AND ROWNUM <= 20 )";


    ShowTable($query);

}
else{
  echo "s";
}
  



  
?>