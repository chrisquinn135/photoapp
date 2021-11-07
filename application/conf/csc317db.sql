-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `fk_authorid` int NOT NULL,
  `fk_postid` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_topoststable_idx` (`fk_postid`),
  KEY `key_tousertable` (`fk_authorid`),
  CONSTRAINT `key_topoststable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'hello',13,24,'2021-07-27 13:38:43'),(2,'hello',13,24,'2021-07-27 14:00:41'),(3,'hello',13,24,'2021-07-27 14:01:13'),(4,'by',13,24,'2021-07-27 14:01:18'),(5,'this is a cute cat',13,24,'2021-07-27 14:01:24'),(6,'hello',13,24,'2021-07-27 14:03:43'),(7,'wow',13,24,'2021-07-27 14:05:25'),(8,'hello',13,24,'2021-07-27 14:16:34'),(9,'test 1 comment\n',13,24,'2021-07-27 14:16:42'),(10,'test 2 comment\n',13,24,'2021-07-27 14:16:50'),(11,'test 3 comment\n',13,24,'2021-07-27 14:16:57'),(12,'wow',13,16,'2021-07-27 14:26:17'),(13,'this is so interesting',13,23,'2021-07-27 14:26:27'),(14,'test. 4',12,24,'2021-08-04 09:58:09'),(15,'yes',12,23,'2021-08-04 10:05:04'),(16,'hi',12,21,'2021-08-04 11:26:10'),(17,'good picture',14,28,'2021-08-04 13:05:18'),(18,'hello',14,26,'2021-08-04 13:05:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post to users_idx` (`fk_userid`),
  CONSTRAINT `post to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:01',1),(2,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:02',1),(3,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:05',5),(4,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:05',5),(5,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:06',5),(6,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:06',5),(7,'test title','this is the description wooooooo','images/test.png','images/thumbnails/test.png',0,'2021-07-13 10:36:07',5),(8,'test01','test001','public/images/upload/4f3b3341414780253cc77a426348a48499eb2017227d.jpeg','public/images/upload/thumbnail-4f3b3341414780253cc77a426348a48499eb2017227d.jpeg',0,'2021-07-19 13:42:17',12),(9,'ajaxPost','post','public/images/upload/4c459068bc48d48adbcb240bd4320010aebb24a20c35.jpeg','public/images/upload/thumbnail-4c459068bc48d48adbcb240bd4320010aebb24a20c35.jpeg',0,'2021-07-21 11:37:53',12),(10,'ddatest05','test005','public/images/upload/094c7f9fd420845a35579ce78c7325b01e0a32179407.jpeg','public/images/upload/thumbnail-094c7f9fd420845a35579ce78c7325b01e0a32179407.jpeg',0,'2021-07-21 11:39:12',12),(11,'ddatest05d','test005','public/images/upload/45bbac4dc7db01c173e27fe723a5eac838dc26ecc9e6.jpeg','public/images/upload/thumbnail-45bbac4dc7db01c173e27fe723a5eac838dc26ecc9e6.jpeg',0,'2021-07-21 11:40:40',12),(12,'ddatest05d','test005','public/images/upload/61bf16e2fb9ff67ef50e720fb600bb628a14f5776f64.jpeg','public/images/upload/thumbnail-61bf16e2fb9ff67ef50e720fb600bb628a14f5776f64.jpeg',0,'2021-07-21 11:45:41',12),(13,'ddatest05dd','test005d','public/images/upload/82a423edf29bb3775737ba022bc1ee771347ba185133.jpeg','public/images/upload/thumbnail-82a423edf29bb3775737ba022bc1ee771347ba185133.jpeg',0,'2021-07-21 11:49:19',12),(14,'ddatest05ddd','test005dd','public/images/upload/1fa64b2a0bbd269e3a6f25c60ce6c76057cb3adcc713.jpeg','public/images/upload/thumbnail-1fa64b2a0bbd269e3a6f25c60ce6c76057cb3adcc713.jpeg',0,'2021-07-21 11:52:25',12),(15,'test05','test005','public/images/upload/95092fb60aeaa26ee15bc2158416d8877891a07a7e47.png','public/images/upload/thumbnail-95092fb60aeaa26ee15bc2158416d8877891a07a7e47.png',0,'2021-07-21 14:37:53',12),(16,'test05','test005','public/images/upload/6f789bb116d2d30b84137d567ba452dc739b6d99b6a2.png','public/images/upload/thumbnail-6f789bb116d2d30b84137d567ba452dc739b6d99b6a2.png',0,'2021-07-21 14:39:59',12),(17,'test05','dafdasfdasfdsa','public/images/upload/721abc60b5b21890fa5cd59daaaf4989a64692030399.jpeg','public/images/upload/thumbnail-721abc60b5b21890fa5cd59daaaf4989a64692030399.jpeg',0,'2021-07-21 14:42:50',12),(18,'test05','dafdasfdasfdsa','public/images/upload/c55b441a295aae7e85e7742bf8889621b89af7ddcdce.jpeg','public/images/upload/thumbnail-c55b441a295aae7e85e7742bf8889621b89af7ddcdce.jpeg',0,'2021-07-21 14:44:24',12),(19,'dfa','dfsa','public/images/upload/570177337b6a8099a39f4499e3be746776caf8a5b78f.jpeg','public/images/upload/thumbnail-570177337b6a8099a39f4499e3be746776caf8a5b78f.jpeg',0,'2021-07-21 14:46:13',12),(20,'d','da','public/images/upload/0341187c5aef8a7a0d6e66e0ff7a998080c1175cd1f2.jpeg','public/images/upload/thumbnail-0341187c5aef8a7a0d6e66e0ff7a998080c1175cd1f2.jpeg',0,'2021-07-21 14:47:25',12),(21,'dasd','dsf','public/images/upload/8ffa7a5d3e98eae710ca99bfbaaca6bec26b5efb296c.jpeg','public/images/upload/thumbnail-8ffa7a5d3e98eae710ca99bfbaaca6bec26b5efb296c.jpeg',0,'2021-07-21 14:48:57',12),(22,'df','sf','public/images/upload/f8dcf166c5c27ea3ba403e5a849abf71082ad369cc6b.jpeg','public/images/upload/thumbnail-f8dcf166c5c27ea3ba403e5a849abf71082ad369cc6b.jpeg',0,'2021-07-21 14:49:32',12),(23,'d','d','public/images/upload/eb4fe787c8f451c47617b563462e09293195f27afcc3.jpeg','public/images/upload/thumbnail-eb4fe787c8f451c47617b563462e09293195f27afcc3.jpeg',0,'2021-07-24 09:47:26',12),(24,'Cat','This is a cat','public/images/upload/723da6798f3331f6c588207adb7f2937199465c425bb.jpeg','public/images/upload/thumbnail-723da6798f3331f6c588207adb7f2937199465c425bb.jpeg',0,'2021-07-26 14:21:08',13),(25,'Dog ','This is a doge','public/images/upload/ac062444da5c08da15fdb1eb27b7d1d9158cb9ddea32.webp','public/images/upload/thumbnail-ac062444da5c08da15fdb1eb27b7d1d9158cb9ddea32.webp',0,'2021-08-04 12:41:14',12),(26,'dog 2','this is another dog','public/images/upload/ddcb5771975c1d063b2eea009c2562f147d4ecfddaeb.jpeg','public/images/upload/thumbnail-ddcb5771975c1d063b2eea009c2562f147d4ecfddaeb.jpeg',0,'2021-08-04 12:41:40',12),(27,'Lake','this is a lake','public/images/upload/15a4c8c4f4a7fdab57e1fe424948bbd92d5c63a5a01d.webp','public/images/upload/thumbnail-15a4c8c4f4a7fdab57e1fe424948bbd92d5c63a5a01d.webp',0,'2021-08-04 12:41:57',12),(28,'Dog with dog','two dogs','public/images/upload/3986ccb872bed7d3d48da267559bcaa193d5ebf8165d.jpeg','public/images/upload/thumbnail-3986ccb872bed7d3d48da267559bcaa193d5ebf8165d.jpeg',0,'2021-08-04 13:04:52',14);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testUser1','testUser1@mail.com','asdfghjk',0,0,'2021-07-13 10:33:09'),(3,'testUser2','testUser2@mail.com','asdfghjk',0,0,'2021-07-13 10:33:19'),(4,'testUser3','testUser3@mail.com','asdfghjk',0,0,'2021-07-13 10:33:23'),(5,'testUser4','testUser4@mail.com','asdfghjk',0,0,'2021-07-13 10:33:29'),(8,'csu2@mail.sfsu.edu','christopher_su@yahoo.com','Fuckyouky12',0,0,'2021-07-14 14:09:14'),(9,'testuser9','testuser9@mail.com','Hello123!',0,0,'2021-07-14 14:15:54'),(10,'encUser','encUser@mail.com','$2b$15$v2Dm1CCPl3m7hTcs8hLS8ew53DixuwUTZDkXT9b90KCLVPIb1Pchu',0,0,'2021-07-14 15:45:00'),(11,'ddd','ddd@mail','$2b$15$T4AoGqjv6uBMNyHhNzlRL.cy1YAWAD/DOCdeYoi.PKJN5XqiQlNmG',0,0,'2021-07-14 15:47:10'),(12,'tester','tester@mail.com','$2b$15$JEKvtilcLRTyzG/qJU/gu.brNf7ZrC7m59ksTYELXOxhJb9zqKWMS',0,0,'2021-07-14 22:58:24'),(13,'christopher','christopher@mail','$2b$15$WHrXYnOADMGcvTU15sVgcOxtoyji1WIa.95KSbc5CCIarxiaBRZhm',0,0,'2021-07-26 13:29:41'),(14,'demoUser','demoUser@email.com','$2b$15$xS2ZjGjCqh9v2cbkpy85SejCK08vLzuYervhG8bePGZu.qkG2Sfrm',0,0,'2021-08-04 13:03:50');
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

-- Dump completed on 2021-08-04 15:19:07
