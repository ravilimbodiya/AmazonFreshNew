************************PRODUCTS*************************

CREATE TABLE product
(
product_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
farmer_id varchar(9) NOT NULL,
name varchar(255),
price int NOT NULL,
description varchar(255),
reviews varchar(500),
ratings int
);

CREATE TABLE `amazonfresh`.`customers` (
  `cust_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `cc_no` INT NULL,
  `cc_name` VARCHAR(255) NULL,
  `cc_expiry` DATETIME NULL,
  `cvv` INT NULL,
  `hash` VARCHAR(1000) NOT NULL,
  `salt` LONGBLOB NOT NULL,
  PRIMARY KEY (`cust_id`));

  CREATE TABLE amazonfresh.trip
  (
      _id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      trip_id varchar(10),
      pickup_location_latitude double,
      pickup_location_longitude double,
      dropoff_location_latitude double,
      dropoff_location_longitude double,
  	  Date_Time datetime,
      cutomer_id varchar(9),
      driver_id varchar(9),
      truck_id varchar(9)
  );