-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: pc-market
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (16,'Laptop',0,'2024-04-13 08:39:27','2024-04-18 00:10:16'),(25,'Bàn phím',0,'2024-04-18 00:13:20','2024-04-18 00:13:20'),(26,'Chuột',0,'2024-04-18 00:17:08','2024-04-18 00:17:08'),(30,'Điện máy - Điện gia dụng',0,'2024-04-18 23:46:24','2024-04-18 23:46:24'),(31,'Phụ kiện',0,'2024-04-18 23:46:37','2024-04-18 23:46:37'),(32,'Màn hình máy tính',0,'2024-04-18 23:46:59','2024-04-18 23:46:59');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2024_03_16_131706_create_table_category_table',2),(6,'2024_03_17_152612_create_table_product_table',3),(7,'2024_03_19_132327_create_table_orders_table',4),(8,'2024_03_30_153815_create_orders_detail_table',5),(9,'2024_04_17_130839_add_role_columns_to_users',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderdetail_product_id_foreign` (`product_id`),
  KEY `orderdetail_order_id_foreign` (`order_id`),
  CONSTRAINT `orderdetail_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderdetail_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (7,48,9,4,590000.00,NULL,NULL),(8,45,9,4,52000000.00,NULL,NULL),(9,44,10,1,67070000.00,NULL,NULL),(10,44,11,1,67070000.00,NULL,NULL),(11,48,12,2,590000.00,NULL,NULL),(12,68,13,2,2900000.00,NULL,NULL),(13,58,13,2,890000.00,NULL,NULL);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(20,2) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `addr` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (9,210360000.00,'Nguyễn Văn Nghĩa','0372337713','Ấp Hòa Đông B, HH, TB, TN','Không có ghi chú gì cả',9,'2024-04-21 00:35:26','2024-04-21 00:35:26'),(10,67070000.00,'abc','013264885','SOME WHERE','test',9,'2024-04-21 00:40:47','2024-04-21 00:40:47'),(11,67070000.00,'11','11111','11111','1111',9,'2024-04-21 00:45:15','2024-04-21 00:45:15'),(12,1180000.00,'dev nguyễn','1234567891','abc','xyz',8,'2024-04-23 08:35:43','2024-04-23 08:35:43'),(13,7580000.00,'Văn Nghĩa','037232337713','Ấp Hòa Đông B, HH, TB, TN','Không có gì đáng lưu ý cho đơn hàng này!',9,'2024-04-27 09:10:14','2024-04-27 09:10:14');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` text DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (40,'MacBook Pro M2 Max 2023 16 icnh',65000000.00,'/storage/products-photo/8/A0Q7fd2IdhPe21JzXrEU.jpg',16,'Đây là mô tả sản phẩm cho laptop ncncncncnc ámclasjnfvoihjfnvaspa','2024-04-18 06:25:11','2024-04-19 00:08:44'),(41,'MacBook Pro M2 Max 2023',45000000.00,'/storage/products-photo/8/GmRhpns8ZZiUn7DoyUtk.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:25:49','2024-04-18 06:25:49'),(42,'MacBook Pro M3 Pro 2023',89000000.00,'/storage/products-photo/8/icge4vVvcVh0LxcU2Ugk.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:26:15','2024-04-18 06:26:15'),(43,'Macbook Air M2 2022',96000000.00,'/storage/products-photo/8/idFdUn3ihnCwkDDD42fL.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:26:37','2024-04-18 06:26:37'),(44,'Laptop MacBook Air',67070000.00,'/storage/products-photo/8/ulHjpLkeXzgYRA230aGE.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:26:58','2024-04-18 06:26:58'),(45,'MacBook Air M1 2020',52000000.00,'/storage/products-photo/8/2OhxIlCx0qfCzNb1wdwW.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:27:23','2024-04-18 06:27:23'),(46,'Macbook Air M2 2023',52000000.00,'/storage/products-photo/8/RiZvtj0SoOCmLUmfTgJa.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:28:09','2024-04-18 06:28:09'),(47,'Macbook Pro M2 Pro',99000000.00,'/storage/products-photo/8/jpqzUHHwxygtVboq8wPw.jpg',16,'Đây là mô tả sản phẩm cho laptop','2024-04-18 06:28:37','2024-04-18 06:28:37'),(48,'Chuột gaming không dây Asus ROG Spatha X',590000.00,'/storage/products-photo/8/p8P54nxyUYsLL6tIPHYv.jpg',26,'Đây là mô tả cho con chuột này nha','2024-04-19 00:17:16','2024-04-19 00:17:16'),(49,'Chuột gaming không dây MSI Clutch GM41 Lightweight',850000.00,'/storage/products-photo/8/43Xbb9lZ9ZGaG2sul1XV.jpg',26,'Đây là mô tả cho chuột','2024-04-23 22:03:15','2024-04-23 22:03:15'),(50,'Chuột không dây Akko Smart 1 Sailor Jupite',259000.00,'/storage/products-photo/8/KE9AKXQsjWywRmt5FIxd.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:07:16','2024-04-23 22:07:16'),(51,'Chuột không dây bluetooth công thái học Logitech Lift Vertical',2950000.00,'/storage/products-photo/8/hRBrjxDTBqDywt0AXhhg.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:09:56','2024-04-23 22:09:56'),(52,'Chuột không dây bluetooth Logitech MX Master 3S',1990000.00,'/storage/products-photo/8/mNFqBZYka4wCgTKCrnbm.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:10:22','2024-04-23 22:10:22'),(53,'Chuột gaming không dây Logitech G903 Hero',780000.00,'/storage/products-photo/8/NFLS41Qhj0uQ16zonROP.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:10:53','2024-04-23 22:10:53'),(54,'Chuột không dây bluetooth XIAOMI MI DUAL MODESILENT',455000.00,'/storage/products-photo/8/ko90xFoobyx7APlVGuYQ.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:11:21','2024-04-23 22:11:21'),(55,'Chuột máy tính không dây XIAOMI Lite',530000.00,'/storage/products-photo/8/KJOyxurf29Kr9O6jGspV.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:11:57','2024-04-23 22:14:28'),(56,'Chuột gaming Razer Basilisk V3 (RZ01-04000100-R3M1)',1590000.00,'/storage/products-photo/8/jrNb2e6pfXO8VAfqKZ6X.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:12:27','2024-04-23 22:12:27'),(57,'Chuột gaming Razer Deathadder V2 Mini',990000.00,'/storage/products-photo/8/DEXLHBcQcJ3qQdG34pM5.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:12:55','2024-04-23 22:12:55'),(58,'huột gaming không dây HYPERX PULSEFIRE HASTE II WIRELESS',890000.00,'/storage/products-photo/8/H9oowETO32cRZx41rhjl.jpg',26,'Chuột là một thiết bị ngoại vi thông dụng trong máy tính và các thiết bị điện tử khác, được thiết kế để điều khiển và tương tác với giao diện người dùng trên màn hình.','2024-04-23 22:13:21','2024-04-23 22:13:21'),(59,'Màn hình LCD Viewsonic 24inch VG2455',1890000.00,'/storage/products-photo/8/kEFTLuNd3RgZngewCdyN.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:15:51','2024-04-23 22:15:51'),(60,'Màn hình LCD MSI 27inch Optix G27C7',2795000.00,'/storage/products-photo/8/cHMv5W9Rpc7rFTrR0YxJ.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:16:17','2024-04-23 22:16:17'),(61,'Màn hình LCD HP 27inch Z27k G3 1B9T0AA',2890000.00,'/storage/products-photo/8/waDFkX64PRyqHZdKKAFA.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:16:40','2024-04-23 22:16:40'),(62,'Màn hình LCD Samsung 24 LF24T350FHEXXV',2559000.00,'/storage/products-photo/8/rdUxXBdS5uNoCONhnrCM.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:17:11','2024-04-23 22:17:11'),(63,'Màn hình LCD LG 29inch 29WQ600-W.ATV',7890000.00,'/storage/products-photo/8/u5qwtnQEOg22ZnxTsRmT.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:17:49','2024-04-23 22:17:49'),(64,'Màn hình LCD LG 44.5inch 45GR95QE-B.ATV',19500000.00,'/storage/products-photo/8/Xicw0c42JBOSTtYavAmE.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:18:15','2024-04-23 22:18:15'),(65,'Màn hình LCD BenQ 24 inch Zowie XL2411P',2400000.00,'/storage/products-photo/8/f5QDka4xepQQrmfdo4fl.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:18:38','2024-04-23 22:18:38'),(66,'Màn hình LCD ACER 28inch CBL282K',8790000.00,'/storage/products-photo/8/Hqw4NCNTA8VPKvuebAL9.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:19:20','2024-04-23 22:19:20'),(67,'Màn hình LCD ACER EK251Q E',2650000.00,'/storage/products-photo/8/QWFneCS2nTmR0vxNAAMU.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:19:40','2024-04-23 22:19:40'),(68,'Màn hình LCD ACER 23.8 inch K243Y E (UM.QX3SV.E01)',2900000.00,'/storage/products-photo/8/0FwxKFx2DvHx8YuFtUYg.jpg',32,'Màn hình là thiết bị hiển thị thông tin và hình ảnh từ máy tính, điện thoại di động, máy tính bảng và nhiều thiết bị điện tử khác.','2024-04-23 22:20:15','2024-04-23 22:20:15');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'Dev Nguyễn','dev@gmail.com',NULL,'$2y$10$mXQX12iprO5dUhWs4ywmvO6CW3uqi6DxaOFgBURAmDNqF9c9DnPCi',NULL,'2024-04-17 22:49:13','2024-04-17 22:49:13','ADMIN'),(9,'Johnny Đặng','john@gmail.com',NULL,'$2y$10$4fg.mvvOn/uPeManPIXoYu.Rkxxcp.kk2DF4XoGRAMyGfxmUNtYl.',NULL,'2024-04-18 00:28:13','2024-04-18 00:28:13','CUSTOMER');
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

-- Dump completed on 2024-05-14 14:13:12
