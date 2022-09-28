-- Progettazione Web 
DROP DATABASE if exists arkanoid; 
CREATE DATABASE arkanoid; 
USE arkanoid; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: arkanoid
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `ballskin`
--

DROP TABLE IF EXISTS `ballskin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ballskin` (
  `CodSkin` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`username`,`CodSkin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ballskin`
--

LOCK TABLES `ballskin` WRITE;
/*!40000 ALTER TABLE `ballskin` DISABLE KEYS */;
INSERT INTO `ballskin` VALUES (1,'admin'),(2,'admin'),(3,'admin'),(4,'admin'),(5,'admin'),(1,'franco'),(1,'gabriele'),(1,'gingi'),(1,'k'),(2,'k'),(4,'k'),(1,'luca'),(2,'luca'),(3,'luca'),(4,'luca'),(5,'luca'),(1,'oronzo'),(1,'piero'),(1,'ziopera'),(2,'ziopera'),(3,'ziopera'),(4,'ziopera'),(5,'ziopera');
/*!40000 ALTER TABLE `ballskin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livello`
--

DROP TABLE IF EXISTS `livello`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livello` (
  `idlivello` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idlivello`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livello`
--

LOCK TABLES `livello` WRITE;
/*!40000 ALTER TABLE `livello` DISABLE KEYS */;
INSERT INTO `livello` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9);
/*!40000 ALTER TABLE `livello` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerskin`
--

DROP TABLE IF EXISTS `playerskin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playerskin` (
  `codskin` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`codskin`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerskin`
--

LOCK TABLES `playerskin` WRITE;
/*!40000 ALTER TABLE `playerskin` DISABLE KEYS */;
INSERT INTO `playerskin` VALUES (1,'admin'),(1,'franco'),(1,'gabriele'),(1,'gingi'),(1,'k'),(1,'luca'),(1,'oronzo'),(1,'piero'),(1,'ziopera'),(2,'admin'),(2,'luca'),(2,'ziopera'),(3,'admin'),(3,'luca'),(3,'ziopera'),(4,'admin'),(4,'franco'),(4,'gingi'),(4,'k'),(4,'luca'),(4,'oronzo'),(4,'piero'),(4,'ziopera'),(5,'admin'),(5,'k'),(5,'luca'),(5,'ziopera');
/*!40000 ALTER TABLE `playerskin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sbloccato`
--

DROP TABLE IF EXISTS `sbloccato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sbloccato` (
  `username` varchar(50) NOT NULL,
  `livello` int(10) unsigned NOT NULL,
  `highscore` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`,`livello`),
  KEY `livello` (`livello`),
  CONSTRAINT `sbloccato_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sbloccato_ibfk_2` FOREIGN KEY (`livello`) REFERENCES `livello` (`idlivello`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sbloccato`
--

LOCK TABLES `sbloccato` WRITE;
/*!40000 ALTER TABLE `sbloccato` DISABLE KEYS */;
INSERT INTO `sbloccato` VALUES ('admin',1,6400),('admin',2,13900),('admin',3,11900),('admin',4,7500),('admin',5,11950),('admin',6,6250),('admin',7,9850),('admin',8,11300),('admin',9,13650),('francesco',1,NULL),('franco',1,8550),('franco',2,NULL),('gabriele',1,NULL),('Gianfranc',1,NULL),('gianfranco',1,NULL),('gingi',1,7500),('gingi',2,NULL),('giulio',1,NULL),('giulio',2,NULL),('k',1,8150),('k',2,12800),('k',3,9900),('k',4,NULL),('luca',1,8650),('luca',2,15950),('luca',3,9600),('luca',4,8150),('luca',5,10300),('luca',6,6000),('luca',7,8200),('luca',8,10300),('luca',9,16600),('nicco',1,NULL),('nicco',2,NULL),('nicco',3,NULL),('nicco',4,NULL),('nicco',5,NULL),('nicco',9,NULL),('oronzo',1,6600),('oronzo',2,NULL),('piero',1,7700),('piero',2,NULL),('ziopera',1,6900),('ziopera',2,12000),('ziopera',3,11350),('ziopera',4,6700),('ziopera',5,12950),('ziopera',6,4200),('ziopera',7,NULL);
/*!40000 ALTER TABLE `sbloccato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `hash_psw` varchar(256) NOT NULL,
  `playerskin` int(11) DEFAULT NULL,
  `ballskin` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin','$2y$10$lAaNwFgTppxNEIeb27Ww1O91W15jLbsiQm73y6p3k0i/HXb2424RW',2,2),('andrea','$2y$10$Ylm21LLj88WX9v4zKEwdH./cOs18X4NfsO3/IJ//FlxwLMUXj3NEa',4,1),('francesco','$2y$10$6PGwfabJTko.8G9qNdgcVeAhwyAk2O7cC.igzn4VWpm.b5CJpIqTy',4,1),('franco','$2y$10$OhAbBQmiS7CqKxkleOkBeObOimZPzATfEFP0Mofwre8XscmwEIPIq',1,1),('gabriele','$2y$10$2VzPfclLQf/h1KBlh9GKw.e9eLOBqA2JiIZE7v8.LwT8bW7S32dKW',1,1),('Gianfranc','$2y$10$fMtnO/Gh0D.Cvy0fmsrTXebGgnMXrnzmIKtzqQyyJej1rh4bBWE12',4,1),('gianfranco','$2y$10$Zzvc/Jqa3ATNTfDCeYvlv.kdBXCs9j.qE6IftncTE0b4QtDODRLEa',4,1),('gingi','$2y$10$udRszWdspBXIrwkckInPDe/iod6GIaJt8xdUBHwhYjDLtL9RRTUH6',1,1),('giulio','$2y$10$lF9Oj4BLFalvoJzrWQJyluGIPywMZAPNW5uBphWxMwECRZw3mCl8W',4,1),('k','$2y$10$buUUg7fcJx3Y.f6BHWMio.rn6pWWnHZj/FAIVDIFugEJuHsCBNmkS',1,1),('luca','$2y$10$fZw2FhPX17KdqRsucFot7ufe9oiUfcQBOUSmJFC.oru.CwEXOUENW',4,5),('nicco','$2y$10$gtHlfIlQU7sxR45IkkmvW.jpVXqtHdueh1gD9FDYTtodfOuAYIOpK',4,1),('oronzo','$2y$10$C8cKWzkFVcTKOrZSKbUrgu3RS57Xm2hZMMXZHK5r1dETz6iPTETMq',1,1),('paolo','$2y$10$.D/q79Rs21ORJiKbfcmefeEh8TXG4QSGvIJHeTdfHVPk38/dY2WbG',4,1),('piero','$2y$10$tSAgI0P7CZaAW6Fm.RhZUui./wi4lsahH.j.q16v/UZdYtJdWB7.6',1,1),('rita','$2y$10$XIe6CVp1rdIPtb0xOiKBo.cjYj6T.l.F/EjIvZ1e34N8z0o2r1j9u',4,1),('ziopera','$2y$10$JVtU5LGErKj2vlWUTEg2KurQWlfATGu1yUzj/kf.Tweylb6fRIfLK',4,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-02 19:30:21
