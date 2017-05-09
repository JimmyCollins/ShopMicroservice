CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `shop`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `orderdetailsID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orderID` int(10) unsigned NOT NULL,
  `productID` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`orderdetailsID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customerID` int(10) unsigned NOT NULL,
  `saledate` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL,
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5,'09/05/2017','INITIAL');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `price` decimal(8,2) NOT NULL DEFAULT '999999.99',
  `image` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(10000) NOT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Porsche 911 GT3 RS',500,175900.00,'porsche-911-gt3.jpg','The GT3 RS\' 4.0-liter 500 hp power plant goes an almost unbelievable 0-60 mph in 3.2 seconds. Porsche is so coveted in the supercar category that its 2015 model year Porsche 918 Spyder is also on our list. But for those seeking a true racer that can also take you on smooth weekend rides, consider this lightning-fast 2016 911 GT3 RS.'),(2,'Aston Martin DB11',300,214820.00,'aston-martin-db11.jpg','Under the clamshell hood of the lightweight Aston Martin DB11, the car is equipped with a whopping 600 hp turbocharged 5.2-liter V12.'),(3,'Bugatti Chiron',10,950000.00,'2017-bugatti-chiron.jpg','Officially a 2017 Model, the Bugatti Chiron is as exotic as cars get. Only a handful were made, each carrying a 1500-horsepower, 16-cylinder engine with four turbochargers. The top speed is a claimed 261 mph, comfortably surpassing its predecessor the Bugatti Veyron causing its price to dip.'),(4,'McLaren P1',50,800000.00,'2015-mclaren-p1-coupe-fq.jpg','The P1 is the halo car for the McLaren family, with only 375 made and sold. It utilizes the ultimate combination of cutting-edge hybrid technology and high-speed performance, making it as green as it is fast.'),(5,'McLaren 650S',5,269200.00,'mclaren-650s.jpg','This 2015 model McLaren 650S may be less than $300k, but the 641 hp, 3.9-liter, 32-valve V8 revs from 0-60 mph in just 2.8 seconds.'),(6,'Porsche 918 Spyder',5,847975.00,'2015-porsche-918.jpg','This car drives like a regular plug-in hybrid as it silently cruises along on just its electric motors. However, mash the gas pedal and the twin-turbo V8 comes to life with a snarl, rocketing you to extra-legal speeds in the blink of an eye. It\'s as stealthy as it is sleek, reaching speeds up to 93 mph on electric power alone when E-Drive mode is engaged.'),(7,'Ferrari LaFerrari',2,999999.00,'2014-ferrari-laferrari.jpg','This is Ferrari\'s answer to the Porsche and McLaren hybrid supercars, but with a V12. It\'s astonishingly quick and handles like a go-kart on steroids.'),(8,'Hennessey Venom GT',5,800000.00,'hennessey-venom.jpg','The Hennessey Venom GT holds the Guinness World Record for 0-300 kph (186 mph) at 13.63 seconds and can hit a top speed of 278 mph.'),(9,'Koenigsegg Regera',10,750000.00,'2015-koenigsegg-regera.jpg','The spaceship-like Regera is as beautiful as it is fast, plus this rare ride (only 80 were made) has special touches like the LED daytime running lights that are arranged in a constellation pattern around the headlamps.'),(10,'Aston Martin One-77',25,950000.00,'aston-martin-one-77.jpg','Aston Martin\'s limited-production flagship vehicle is aptly named the One-77, as only 77 of the cars were made. It\'s as fast as it is beautiful with neck-snapping power that allows it to go from 0-60 in 3.5 seconds.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `address` varchar(60) DEFAULT NULL,
  `usertype` int(11) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joe','joe','cork',2),(2,'mary','mary','dublin',2),(3,'joey','joey','london',2),(4,'fred','fred','dublin',2),(5,'jim','jim','cork',1),(6,'tim','tim','cobh',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-09 10:51:25
