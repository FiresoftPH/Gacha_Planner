-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: gacha_planner
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banner_data`
--

DROP TABLE IF EXISTS `banner_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner_data` (
  `version` varchar(255) NOT NULL,
  `featured_5_star` varchar(255) NOT NULL,
  `featured_4_star_1` varchar(255) DEFAULT NULL,
  `featured_4_star_2` varchar(255) DEFAULT NULL,
  `featured_4_star_3` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `version_half` int DEFAULT NULL,
  PRIMARY KEY (`version`,`featured_5_star`),
  KEY `featured_5_star` (`featured_5_star`),
  KEY `featured_4_star_1` (`featured_4_star_1`),
  KEY `featured_4_star_3` (`featured_4_star_3`),
  KEY `featured_4_star_2` (`featured_4_star_2`),
  CONSTRAINT `banner_data_ibfk_1` FOREIGN KEY (`featured_5_star`) REFERENCES `character_data` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `banner_data_ibfk_2` FOREIGN KEY (`featured_4_star_1`) REFERENCES `character_data` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `banner_data_ibfk_4` FOREIGN KEY (`featured_4_star_2`) REFERENCES `character_data` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `banner_data_ibfk_5` FOREIGN KEY (`featured_4_star_3`) REFERENCES `character_data` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner_data`
--

LOCK TABLES `banner_data` WRITE;
/*!40000 ALTER TABLE `banner_data` DISABLE KEYS */;
INSERT INTO `banner_data` VALUES ('1.0','Klee','Xingqiu','Noelle','Sucrose','2020-10-20','2020-11-10',2),('1.0','Venti','Barbara','Fischl','Xiangling','2020-09-28','2020-10-20',1),('1.1','Tartaglia','Diona','Beidou','Ningguang','2020-11-11','2020-12-01',1),('1.1','Zhongli','Xinyan','Razor','Chongyun','2020-12-01','2020-12-22',2),('1.2','Albedo','Fischl','Sucrose','Bennett','2020-12-23','2021-01-12',1),('1.2','Ganyu','Xiangling','Xingqiu','Noelle','2021-01-12','2021-02-02',2),('1.3','Hu Tao','Xingqiu','Xiangling','Chongyun','2021-03-02','2021-03-16',2),('1.3','Keqing','Ningguang','Bennett','Barbara','2021-02-17','2021-03-02',2),('1.3','Xiao','Diona','Beidou','Xinyan','2021-02-03','2021-02-17',1),('1.4','Tartaglia','Rosaria','Barbara','Fischl','2021-04-06','2021-04-27',2),('1.4','Venti','Sucrose','Razor','Noelle','2021-03-17','2021-04-06',1),('1.5','Eula','Xinyan','Xingqiu','Beidou','2021-05-18','2021-06-08',2),('1.5','Zhongli','Yanfei','Noelle','Diona','2021-04-28','2021-05-18',1),('1.6','Kaedehara Kazuha','Rosaria','Bennett','Razor','2021-06-29','2021-07-20',2),('1.6','Klee','Barbara','Sucrose','Fischl','2021-06-09','2021-06-29',1),('2.0','Kamisato Ayaka','Ningguang','Chongyun','Yanfei','2021-07-21','2021-08-10',1),('2.0','Yoimiya','Sayu','Diona','Xinyan','2021-08-10','2021-08-31',2),('2.1','Raiden Shogun','Kujou Sara','Xiangling','Sucrose','2021-09-01','2021-09-21',1),('2.1','Sangonomiya Kokomi','Rosaria','Beidou','Xingqiu','2021-09-21','2021-10-12',2),('2.2','Hu Tao','Thoma','Diona','Sayu','2021-11-02','2021-11-23',2),('2.2','Tartaglia','Ningguang','Chongyun','Yanfei','2021-10-13','2021-11-02',1),('2.3','Albedo','Bennett','Noelle','Rosaria','2021-11-24','2021-12-14',1),('2.3','Arataki Itto','Gorou','Barbara','Xiangling','2021-12-14','2021-01-04',2),('2.3','Eula','Bennett','Noelle','Rosaria','2021-11-24','2021-12-14',1),('2.4','Ganyu','Xingqiu','Beidou','Yanfei','2022-01-25','2022-02-15',2),('2.4','Shenhe','Yun Jin','Ningguang','Chongyun','2022-01-05','2022-01-25',1),('2.4','Xiao','Yun Jin','Ningguang','Chongyun','2022-01-05','2022-01-25',1),('2.4','Zhongli','Xingqiu','Beidou','Yanfei','2022-01-25','2022-02-15',2),('2.5','Raiden Shogun','Bennett','Xinyan','Kujou Sara','2022-03-08','2022-03-29',2),('2.5','Sangonomiya Kokomi','Bennett','Xinyan','Kujou Sara','2022-03-08','2022-03-29',2),('2.5','Yae Miko','Fischl','Diona','Thoma','2022-02-16','2022-03-08',1),('2.6','Kamisato Ayaka','Razor','Rosaria','Sayu','2022-04-19','2022-05-31',2),('2.6','Kamisato Ayato','Sucrose','Xiangling','Yun Jin','2022-03-30','2022-04-19',1),('2.6','Venti','Sucrose','Xiangling','Yun Jin','2022-03-20','2022-04-19',1),('2.7','Arataki Itto','Kuki Shinobu','Chongyun','Gorou','2022-06-21','2022-07-12',2),('2.7','Xiao','Barbara','Yanfei','Noelle','2022-05-31','2022-06-21',1),('2.7','Yelan','Barbara','Yanfei','Noelle','2022-05-31','2022-06-21',1),('2.8','Kaedehara Kazuha','Shikanoin Heizou','Ningguang','Thoma','2022-07-13','2022-08-02',1),('2.8','Klee','Shikanoin Heizou','Ningguang','Thoma','2022-07-13','2022-08-02',1),('2.8','Yoimiya','Bennett','Xinyan','Yun Jin','2022-08-02','2022-08-23',2),('3.0','Ganyu','Dori','Sucrose','Xingqiu','2022-09-09','2022-09-27',2),('3.0','Sangonomiya Kokomi','Dori','Sucrose','Xingqiu','2022-09-09','2022-09-27',2),('3.0','Tighnari','Collei','Diona','Fischl','2022-08-24','2022-09-09',1),('3.0','Zhongli','Collei','Diona','Fischl','2022-08-24','2022-09-09',1),('3.1','Albedo','Barbara','Beidou','Xiangling','2022-10-14','2022-11-01',2),('3.1','Cyno','Candace','Kuki Shinobu','Sayu','2022-09-28','2022-10-14',1),('3.1','Nilou','Barbara','Beidou','Xiangling','2022-10-14','2022-11-01',2),('3.1','Venti','Candace','Kuki Shinobu','Sayu','2022-09-28','2022-10-14',1),('3.2','Nahida','Razor','Noelle','Bennett','2022-11-02','2022-11-18',1),('3.2','Tartaglia','Layla','Thoma','Shikanoin Heizou','2022-11-18','2022-12-06',2),('3.2','Yae Miko','Layla','Thoma','Shikanoin Heizou','2022-11-18','2022-12-06',2),('3.2','Yoimiya','Razor','Noelle','Bennett','2022-11-02','2022-11-18',1),('3.3','Arataki Itto','Faruzan','Gorou','Yanfei','2022-12-07','2022-12-27',1),('3.3','Kamisato Ayato','Rosaria','Sayu','Kujou Sara','2022-12-27','2023-01-17',2),('3.3','Raiden Shogun','Rosaria','Sayu','Kujou Sara','2022-12-27','2023-01-17',2),('3.3','Wanderer','Faruzan','Gorou','Yanfei','2022-12-07','2022-12-27',1),('3.4','Alhaitham','Yaoyao','Yun Jin','Xinyan','2023-01-18','2023-02-07',1),('3.4','Hu Tao','Xingqiu','Ningguang','Beidou','2023-02-07','2023-02-28',2),('3.4','Xiao','Yaoyao','Yun Jin','Xinyan','2023-01-18','2023-02-07',1),('3.4','Yelan','Xingqiu','Ningguang','Beidou','2023-02-07','2023-02-28',2),('3.5','Cyno','Bennett','Barbara','Collei','2023-03-01','2023-03-21',1),('3.5','Dehya','Bennett','Barbara','Collei','2023-03-01','2023-03-21',1),('3.5','Kamisato Ayaka','Diona','Sucrose','Mika','2023-03-21','2023-04-11',2),('3.5','Shenhe','Diona','Sucrose','Mika','2023-03-21','2023-04-11',2),('3.6','Baizhu','Kaveh','Candace','Fischl','2023-05-02','2023-05-23',2),('3.6','Ganyu','Kaveh','Candace','Fischl','2023-05-02','2023-05-23',2),('3.6','Nahida','Kuki Shinobu','Dori','Layla','2023-04-12','2023-05-02',1),('3.6','Nilou','Kuki Shinobu','Dori','Layla','2023-04-12','2023-05-02',1),('3.7','Alhaitham','Shikanoin Heizou','Xiangling','Yaoyao','2023-06-13','2023-07-04',2),('3.7','Kaedehara Kazuha','Shikanoin Heizou','Xiangling','Yaoyao','2023-06-13','2023-07-04',2),('3.7','Yae Miko','Kirara','Yun Jin','Chongyun','2023-05-24','2023-06-13',1),('3.7','Yoimiya','Kirara','Yun Jin','Chongyun','2023-05-24','2023-06-13',1),('3.8','Eula','Mika','Razor','Thoma','2023-07-05','2023-07-25',1),('3.8','Klee','Mika','Razor','Thoma','2023-07-05','2023-07-25',1),('3.8','Sangonomiya Kokomi','Faruzan','Rosaria','Yanfei','2023-07-25','2023-08-15',2),('3.8','Wanderer','Faruzan','Rosaria','Yanfei','2023-07-25','2023-08-15',2),('4.0','Lyney','Lynette','Bennett','Barbara','2023-08-16','2023-09-05',1),('4.0','Tartaglia','Freminet','Sayu','Noelle','2023-09-05','2023-09-26',2),('4.0','Yelan','Lynette','Bennett','Barbara','2023-08-16','2023-09-05',1),('4.0','Zhongli','Freminet','Sayu','Noelle','2023-09-05','2023-09-26',2),('4.1','Hu Tao','Fischl','Xingqiu','Diona','2023-09-27','2023-10-17',1),('4.1','Neuvillete','Fischl','Xingqiu','Diona','2023-09-27','2023-10-17',1);
/*!40000 ALTER TABLE `banner_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_data`
--

DROP TABLE IF EXISTS `character_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_data` (
  `name` varchar(255) NOT NULL,
  `rarity` varchar(255) DEFAULT NULL,
  `element` varchar(255) DEFAULT NULL,
  `weapon` varchar(255) DEFAULT NULL,
  `permanent` tinyint(1) DEFAULT NULL,
  `rerun_history` blob,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_data`
--

LOCK TABLES `character_data` WRITE;
/*!40000 ALTER TABLE `character_data` DISABLE KEYS */;
INSERT INTO `character_data` VALUES ('Albedo','5 Stars','Geo','Sword',0,_binary '€•\0\0\0\0\0\0\0]”(KKKe.'),('Alhaitham','5 Stars','Dendro','Sword',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Aloy','5 Stars','Cryo','Bow',0,_binary '€]”.'),('Amber','4 Stars','Pyro','Bow',1,_binary '€]”.'),('Arataki Itto','5 Stars','Geo','Claymore',0,_binary '€•\0\0\0\0\0\0\0]”(K\rKKe.'),('Baizhu','5 Stars','Dendro','Catalyst',0,_binary '€•\0\0\0\0\0\0\0]”Ka.'),('Barbara','4 Stars','Hydro','Catalyst',1,_binary '€]”.'),('Beidou','4 Stars','Electro','Claymore',1,_binary '€]”.'),('Bennett','4 Stars','Pyro','Sword',1,_binary '€]”.'),('Candace','4 Stars','Hydro','Polearm',1,_binary '€]”.'),('Chongyun','4 Stars','Cryo','Claymore',1,_binary '€]”.'),('Collei','4 Stars','Dendro','Bow',1,_binary '€]”.'),('Cyno','5 Stars','Electro','Polearm',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Dehya','5 Stars','Pyro','Claymore',1,_binary '€•\0\0\0\0\0\0\0]”Ka.'),('Diluc','5 Stars','Pyro','Claymore',1,_binary '€]”.'),('Diona','4 Stars','Cryo','Bow',1,_binary '€]”.'),('Dori','4 Stars','Electro','Claymore',1,_binary '€]”.'),('Eula','5 Stars','Cryo','Claymore',0,_binary '€•\0\0\0\0\0\0\0]”(KKKe.'),('Faruzan','4 Stars','Anemo','Bow',1,_binary '€]”.'),('Fischl','4 Stars','Electro','Bow',1,_binary '€]”.'),('Freminet','4 Stars','Cryo','Bow',1,_binary '€]”.'),('Ganyu','5 Stars','Cryo','Bow',0,_binary '€•\r\0\0\0\0\0\0\0]”(K	KKKe.'),('Gorou','4 Stars','Geo','Bow',1,_binary '€]”.'),('Hu Tao','5 Stars','Pyro','Polearm',0,_binary '€•\r\0\0\0\0\0\0\0]”(KKKK\0e.'),('Jean','5 Stars','Anemo','Sword',1,_binary '€]”.'),('Kaedehara Kazuha','5 Stars','Anemo','Sword',0,_binary '€•\0\0\0\0\0\0\0]”(K	KKe.'),('Kaeya','4 Stars','Cryo','Sword',1,_binary '€]”.'),('Kamisato Ayaka','5 Stars','Cryo','Sword',0,_binary '€•\0\0\0\0\0\0\0]”(KKKe.'),('Kamisato Ayato','5 Stars','Hydro','Sword',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Kaveh','4 Stars','Dendro','Claymore',1,_binary '€]”.'),('Keqing','5 Stars','Electro','Sword',1,_binary '€•\0\0\0\0\0\0\0]”Ka.'),('Kirara','4 Stars','Dendro','Sword',1,_binary '€]”.'),('Klee','5 Stars','Pyro','Catalyst',0,_binary '€•\r\0\0\0\0\0\0\0]”(KK	KKe.'),('Kujou Sara','4 Stars','Electro','Bow',1,_binary '€]”.'),('Kuki Shinobu','4 Stars','Electro','Sword',1,_binary '€]”.'),('Layla','4 Stars','Cryo','Sword',1,_binary '€]”.'),('Lisa','4 Stars','Electro','Catalyst',1,_binary '€]”.'),('Lynette','4 Stars','Anemo','Sword',1,_binary '€]”.'),('Lyney','5 Stars','Pyro','Bow',0,_binary '€•\0\0\0\0\0\0\0]”K\0a.'),('Mika','4 Stars','Cryo','Polearm',1,_binary '€]”.'),('Mona','5 Stars','Hydro','Catalyst',1,_binary '€]”.'),('Nahida','5 Stars','Dendro','Catalyst',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Neuvillete','5 Stars','Hydro','Catalyst',0,_binary '€•\0\0\0\0\0\0\0]”K\0a.'),('Nilou','5 Stars','Hydro','Sword',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Ningguang','4 Stars','Geo','Catalyst',1,_binary '€]”.'),('Noelle','4 Stars','Geo','Claymore',1,_binary '€]”.'),('Qiqi','5 Stars','Cryo','Sword',1,_binary '€]”.'),('Raiden Shogun','5 Stars','Electro','Polearm',0,_binary '€•\0\0\0\0\0\0\0]”(KKKe.'),('Razor','4 Stars','Electro','Claymore',1,_binary '€]”.'),('Rosaria','4 Stars','Cryo','Polearm',1,_binary '€]”.'),('Sangonomiya Kokomi','5 Stars','Hydro','Catalyst',0,_binary '€•\r\0\0\0\0\0\0\0]”(KKKKe.'),('Sayu','4 Stars','Anemo','Claymore',1,_binary '€]”.'),('Shenhe','5 Stars','Cryo','Polearm',0,_binary '€•	\0\0\0\0\0\0\0]”(K\nKe.'),('Shikanoin Heizou','4 Stars','Anemo','Catalyst',1,_binary '€]”.'),('Sucrose','4 Stars','Anemo','Catalyst',1,_binary '€]”.'),('Tartaglia','5 Stars','Hydro','Bow',0,_binary '€•\0\0\0\0\0\0\0]”(KKK	KK\0e.'),('Thoma','4 Stars','Pyro','Polearm',1,_binary '€]”.'),('Tighnari','5 Stars','Dendro','Bow',1,_binary '€•\0\0\0\0\0\0\0]”K	a.'),('Venti','5 Stars','Anemo','Bow',0,_binary '€•\r\0\0\0\0\0\0\0]”(KK	KKe.'),('Wanderer','5 Stars','Anemo','Catalyst',0,_binary '€•	\0\0\0\0\0\0\0]”(KKe.'),('Xiangling','4 Stars','Pyro','Polearm',1,_binary '€]”.'),('Xiao','5 Stars','Anemo','Polearm',0,_binary '€•\r\0\0\0\0\0\0\0]”(KKKKe.'),('Xingqiu','4 Stars','Hydro','Sword',1,_binary '€]”.'),('Xinyan','4 Stars','Pyro','Claymore',1,_binary '€]”.'),('Yae Miko','5 Stars','Electro','Catalyst',0,_binary '€•\0\0\0\0\0\0\0]”(KKKe.'),('Yanfei','4 Stars','Pyro','Catalyst',1,_binary '€]”.'),('Yaoyao','4 Stars','Dendro','Polearm',1,_binary '€]”.'),('Yelan','5 Stars','Hydro','Bow',0,_binary '€•\0\0\0\0\0\0\0]”(KKK\0e.'),('Yoimiya','5 Stars','Pyro','Bow',0,_binary '€•\r\0\0\0\0\0\0\0]”(KKKKe.'),('Yun Jin','4 Stars','Geo','Polearm',1,_binary '€]”.'),('Zhongli','5 Stars','Geo','Polearm',0,_binary '€•\0\0\0\0\0\0\0]”(KKKK	K\0e.');
/*!40000 ALTER TABLE `character_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `saved_data_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `saved_data` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2023-10-14 17:38:46
