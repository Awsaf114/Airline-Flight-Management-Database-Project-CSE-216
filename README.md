# Airline Flight Management 
####Database Project CSE-216

A certain Airline company has many flights which go in and out of the country. Each Airplanes are identified by :
1.	Plane id ( Primary Key )
2.	Capacity, 
3.	Number of flights taken,
4.	International / Domestic
5.	Route number.
6.	Cabin crew for that flight
7.	Employee id of cabin crew ( Foreign Key )
Suppose the airline company conducts a flight in  DHAKA-DUBAI route (There will be many routes off course). The flight number for that route is FA-216. So, we need to keep a record of each flight taken. This will include:
1.	Flight Number ( Primary Key)
2.	Departure time
3.	Arrival time.
4.	Route Number,
5.	Airport for departure
6.	Airport for arrival.
The airline company will have many employees, thus we will be needing an employee table, which will have the Employee id (Primary Key) , job title, salary etc. There will also have to be an account of expenses such as cost of fuel per flight, food, and other inflight expenses.
When a passenger a buys a ticket of any flight he will get the information of that particular flight such as:
1.	Date 
2.	Boarding Pass number ( Primary Key )
3.	Reporting time
4.	Boarding time
5.	Maximum weight he/she can carry  (There will be variation here. If it is a International flight the passenger will be allowed to carry bigger amount. In domestic flights he will be allowed to carry smaller amount of luggage).
6.	Payments
7.	Special Discount
On the other side, the flight company will have all the information regarding the passengers.
1.	Passengers name, age, address
2.	passengers Passport no
3.	passengers National id
4.	passengers Destinations
5.	 passengers Flight seat no.(which will be assign by company)
6.	 passengers Class (Business/Economic)
7.	Captains and crew members list
8.	Departure and arrival time and place.

So there will be 2 parts. One for the passengers and another for the company. At the end of a month the database will give a report that :
1. Total how many passengers for a particular route they have transported.
2. Total earnings 
3. Other details for a particular route flights.

