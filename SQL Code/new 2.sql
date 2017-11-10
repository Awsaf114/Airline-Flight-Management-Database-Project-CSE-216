CREATE TABLE Airport
(
  Airport_Code INT NOT NULL,
  Name INT NOT NULL,
  City INT NOT NULL,
  Country INT NOT NULL,
  PRIMARY KEY (Airport_Code)
);

CREATE TABLE Route
(
  Route_id INT NOT NULL,
  Airport_Code_Src INT NOT NULL,
  Airport_Code_Desc INT NOT NULL,
  PRIMARY KEY (Route_id),
  FOREIGN KEY (Airport_Code_Src) REFERENCES Airport(Airport_Code),
  FOREIGN KEY (Airport_Code_Desc) REFERENCES Airport(Airport_Code)
);

CREATE TABLE Passenger
(
  Passenger_ID INT NOT NULL,
  First_Name INT NOT NULL,
  Last_Name INT NOT NULL,
  Phone_Number INT NOT NULL,
  Date_of_Birth INT NOT NULL,
  Gender INT NOT NULL,
  Passport_Number INT NOT NULL,
  Email_Address INT NOT NULL,
  Address INT NOT NULL,
  Nationality INT NOT NULL,
  PRIMARY KEY (Passenger_ID)
);

CREATE TABLE Aircraft
(
  Plane_ID INT NOT NULL,
  Max_Take-off_weight INT NOT NULL,
  Max_Landing_Weight INT NOT NULL,
  First_class_capacity INT NOT NULL,
  Business_class_capacity INT NOT NULL,
  Economy_class_capacity INT NOT NULL,
  Status INT NOT NULL,
  PRIMARY KEY (Plane_ID)
);

CREATE TABLE Aircraft_info
(
  Length INT NOT NULL,
  Height INT NOT NULL,
  Wingspan INT NOT NULL,
  Cabin_Width INT NOT NULL,
  Cruising_Speed INT NOT NULL,
  Range INT NOT NULL,
  Start_of_Service INT NOT NULL,
  End_of_service INT NOT NULL,
  Price INT NOT NULL,
  Plane_ID INT NOT NULL,
  FOREIGN KEY (Plane_ID) REFERENCES Aircraft(Plane_ID)
);

CREATE TABLE Parts
(
  Parts_ID INT NOT NULL,
  Description INT NOT NULL,
  Price INT NOT NULL,
  PRIMARY KEY (Parts_ID)
);

CREATE TABLE Employee
(
  Employee_ID INT NOT NULL,
  First_Name INT NOT NULL,
  Last_Name INT NOT NULL,
  Gender INT NOT NULL,
  Phone_Number INT NOT NULL,
  Address INT NOT NULL,
  Email_address INT NOT NULL,
  Hiredate INT NOT NULL,
  Nationality INT NOT NULL,
  Salary INT NOT NULL,
  Designation INT NOT NULL,
  PRIMARY KEY (Employee_ID)
);

CREATE TABLE Schedule
(
  Arrival_Time INT NOT NULL,
  Departure_Time INT NOT NULL,
  Flight_ID INT NOT NULL,
  Status_(_Delayed_|_OnTime_) INT NOT NULL,
  Type_(_International_|_Domestic) INT NOT NULL,
  Arrival_Date INT NOT NULL,
  Departure_Date INT NOT NULL,
  Route_id INT NOT NULL,
  Plane_ID INT NOT NULL,
  PRIMARY KEY (Flight_ID),
  FOREIGN KEY (Route_id) REFERENCES Route(Route_id),
  FOREIGN KEY (Plane_ID) REFERENCES Aircraft(Plane_ID)
);

CREATE TABLE Price
(
  Price_ID INT NOT NULL,
  Business INT NOT NULL,
  Economy INT NOT NULL,
  Coach INT NOT NULL,
  Flight_ID INT NOT NULL,
  PRIMARY KEY (Price_ID),
  FOREIGN KEY (Flight_ID) REFERENCES Schedule(Flight_ID)
);

CREATE TABLE Flight_History
(
  Passenger_ID INT NOT NULL,
  Flight_ID INT NOT NULL,
  PRIMARY KEY (Flight_ID),
  FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID),
  FOREIGN KEY (Flight_ID) REFERENCES Schedule(Flight_ID)
);

CREATE TABLE Fuel_Management
(
  Quantity INT NOT NULL,
  Plane_ID INT NOT NULL,
  Flight_ID INT NOT NULL,
  Employee_ID INT NOT NULL,
  FOREIGN KEY (Plane_ID) REFERENCES Aircraft(Plane_ID),
  FOREIGN KEY (Flight_ID) REFERENCES Schedule(Flight_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Maintenance
(
  Out_of_Service_Date INT NOT NULL,
  Complaint_ID INT NOT NULL,
  Completion_Date INT NOT NULL,
  Plane_ID INT NOT NULL,
  Parts_to_be_replaced INT NOT NULL,
  Employee_ID INT NOT NULL,
  PRIMARY KEY (Complaint_ID),
  FOREIGN KEY (Plane_ID) REFERENCES Aircraft(Plane_ID),
  FOREIGN KEY (Parts_to_be_replaced) REFERENCES Parts(Parts_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Flight_Crew
(
  Flight_ID INT NOT NULL,
  Employee_ID INT NOT NULL,
  FOREIGN KEY (Flight_ID) REFERENCES Schedule(Flight_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Booking
(
  Seat_Number INT NOT NULL,
  Booking_ID INT NOT NULL,
  Booking_Date INT NOT NULL,
  Payment_Status INT NOT NULL,
  Amount_Payable INT NOT NULL,
  Flight_ID INT NOT NULL,
  Passenger_ID INT NOT NULL,
  PRIMARY KEY (Booking_ID),
  FOREIGN KEY (Flight_ID) REFERENCES Schedule(Flight_ID),
  FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID)
);