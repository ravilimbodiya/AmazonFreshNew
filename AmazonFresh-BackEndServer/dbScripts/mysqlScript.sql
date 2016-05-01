CREATE DATABASE `amazonfresh` /*!40100 DEFAULT CHARACTER SET latin1 */;


************************PRODUCTS*************************

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `farmer_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ratings` int(11) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `product_type` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);


CREATE TABLE `customers` (
  `cust_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `cc_no` varchar(45) DEFAULT NULL,
  `cc_name` varchar(255) DEFAULT NULL,
  `cc_expiry` varchar(255) DEFAULT NULL,
  `cvv` int(11) DEFAULT NULL,
  `hash` longblob,
  `salt` varchar(1000) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cust_id`)
);


CREATE TABLE `farmers` (
  `far_id` int(11) NOT NULL AUTO_INCREMENT,
  `farmer_id` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `cc_no` varchar(45) DEFAULT NULL,
  `cc_name` varchar(255) DEFAULT NULL,
  `cc_expiry` varchar(255) DEFAULT NULL,
  `cvv` int(11) DEFAULT NULL,
  `approved` int(11) DEFAULT '0',
  `hash` longblob,
  `salt` varchar(1000) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`far_id`)
);


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