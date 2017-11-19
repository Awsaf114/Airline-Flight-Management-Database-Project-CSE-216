CREATE TABLE AIRCRAFT_INFO(
   AIRCRAFT_ID                  INTEGER  NOT NULL PRIMARY KEY 
  ,PRICE                        NUMERIC(11,7)
  ,START_OF_SERVICE             VARCHAR(20) 
  ,END_OF_SERVICE               VARCHAR(20) 
  ,TOTAL_FLIGHTS                INTEGER  NOT NULL
  ,Date_Completed               VARCHAR(20)
  ,Manufacturer                 VARCHAR(100)
  ,Model                        VARCHAR(120)
  ,Physical_Class_Engine_Type   VARCHAR(20)
  ,Engines                      INTEGER 
  ,Approach_Speed               VARCHAR(20)
  ,Wingspan_ft                  VARCHAR(20)
  ,Wingtip_Configuration        VARCHAR(30)
  ,Length_ft                    VARCHAR(20)
  ,Tail_Height_ft               VARCHAR(20)
  ,Wheelbase_ft                 VARCHAR(20)
  ,Cockpit_to_Main_Gear_CMG     VARCHAR(20)
  ,MGW_Outer_to_Outer           VARCHAR(30)
  ,MTOW                         VARCHAR(30)
  ,Max_Ramp_Max_Taxi            VARCHAR(20)
  ,Main_Gear_Configuration      VARCHAR(20)
  ,ICAOFAA_Code                 VARCHAR(20)
  ,ATCT_Weight_Class            VARCHAR(20)
);