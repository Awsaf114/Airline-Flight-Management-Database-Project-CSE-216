-- BOOKING DEL

create or replace TRIGGER BOOKING_DLT
BEFORE DELETE
ON BOOKING
FOR EACH ROW
DECLARE
  V_ID NUMBER;
  PASS NUMBER;
  INDIV NUMBER;
  REFUND NUMBER;
  AMOUNT NUMBER;
  PAY_ID NUMBER;
  OLDPASS NUMBER;
  BOOKINGS NUMBER;
BEGIN

--    SYS.DBMS_OUTPUT.PUT_LINE('HIFDH');
  
  V_ID := :OLD.BOOKING_ID ;
  PAY_ID := :OLD.PAYMENT_ID;
  OLDPASS := :OLD.PASSENGER_ID;

  SELECT AMOUNT INTO INDIV FROM PAYMENT_ITEM WHERE PAYMENT_ID = PAY_ID AND BOOKING_ID = V_ID;
--    SELECT COUNT(PAYMENT_ID) INTO BOOKINGS FROM PAYMENT_ITEM GROUP BY PAYMENT_ID;    

  DELETE FROM PAYMENT_ITEM WHERE PAYMENT_ID = PAY_ID;
    
    SELECT PASSENGER_ID INTO PASS FROM PAYMENT WHERE PAYMENT_ID = PAY_ID;
    
    SELECT TOTAL_PAYABLE INTO AMOUNT FROM PAYMENT WHERE PAYMENT_ID = PAY_ID;
    REFUND := AMOUNT - INDIV;
    
    DELETE FROM BOARDING WHERE BOOKING_ID = V_ID;
----    DELETE FROM PAYMENT WHERE PAYMENT_ID = PAY_ID;
    UPDATE PAYMENT SET TOTAL_PAYABLE = AMOUNT WHERE PAYMENT_ID = PAY_ID;

    IF PASS != NULL THEN
      INSERT INTO REFUND VALUES (SEQ_REFUND.NEXTVAL ,OLDPASS,INDIV,SYSDATE);
    END IF;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE( 'No employee found.' );
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('More than one employee found.');
END ;


-- Fligth DELETE
create or replace TRIGGER FLIGHT_DELETE
BEFORE DELETE
ON FLIGHT
FOR EACH ROW
DECLARE
  V_ID NUMBER;
  PASS NUMBER;
  AMOUNT NUMBER;
BEGIN
  
  V_ID := :OLD.FLIGHT_ID ;


    DELETE FROM FLIGHT_CREW WHERE FLIGHT_ID = V_ID;
    DELETE FROM INFLIGHT_EXPENSE WHERE FLIGHT_ID = V_ID;
    
--    SELECT PASSENGER_ID INTO PASS FROM PAYMENT WHERE PAYMENT_ID = R.PAYMENT_ID;
--    SELECT TOTAL_PAYABLE INTO AMOUNT FROM PAYMENT WHERE PAYMENT_ID = R.PAYMENT_ID;
--    DELETE FROM BOARDING WHERE BOOKING_ID = R.BOOKING_ID;
    DELETE FROM BOOKING WHERE FLIGHT_ID = V_ID;
--    DELETE FROM PAYMENT WHERE PAYMENT_ID = R.PAYMENT_ID;
    
--    IF PASS != NULL THEN
--      INSERT INTO REFUND VALUES (SEQ_REFUND.NEXTVAL ,PASS,AMOUNT,SYSDATE);
--    END IF;
    
--  END LOOP;
--  COMMIT;
  
END ;

-- Route DELETE

create or replace TRIGGER ROUTE_DELETE
BEFORE DELETE
ON ROUTE
FOR EACH ROW
DECLARE
  
  R_ID NUMBER;
BEGIN
  
    R_ID := :OLD.ROUTE_ID ;

    DELETE FROM FLIGHT WHERE ROUTE_ID = R_ID;
    
    FOR R IN (SELECT PRICE_ID FROM PRICE WHERE ROUTE_ID=R_ID)
    LOOP
    
      DELETE FROM PRICE_ITEM WHERE PRICE_ID=R.PRICE_ID;
    
    END LOOP;
    
    DELETE FROM PRICE WHERE ROUTE_ID = R_ID;
    
    FOR R IN (SELECT DISCOUNT_ID FROM DISCOUNT WHERE ROUTE_ID=R_ID)
    LOOP 
       
       DELETE FROM DISCOUNT_ITEM WHERE DISCOUNT_ID=R.DISCOUNT_ID;
     
    END LOOP ;
    
    DELETE FROM DISCOUNT WHERE ROUTE_ID=R_ID;
    
  --COMMIT;
    
END ;


-- Employee DELETE
create or replace TRIGGER EMPLOYEE_DELETE
BEFORE DELETE
ON EMPLOYEE
FOR EACH ROW

DECLARE
  
  E_ID NUMBER;
 
BEGIN

    E_ID:= :OLD.EMPLOYEE_ID;
    
--    DELETE FROM ENGINEER WHERE EMPLOYEE_ID=E_ID;
--    DELETE FROM ADMIN WHERE EMPLOYEE_ID=E_ID;
    DELETE FROM FLIGHT_CREW WHERE EMPLOYEE_ID=E_ID;
    DELETE FROM MAINTENANCE WHERE EMPLOYEE_ID=E_ID;
    DELETE FROM FUEL WHERE EMPLOYEE_ID=E_ID;

END;