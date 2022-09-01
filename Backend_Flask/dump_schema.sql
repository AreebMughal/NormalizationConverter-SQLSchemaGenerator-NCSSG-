-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_al84`;

-- 
-- Table structure for table `abalone` 
-- 

CREATE TABLE `NCSSG_dumped_db_al84`.`abalone` ( 
	`Shell_weight` int(11) NOT NULL, 
 	`Shucked_Weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Sex` int(11) NOT NULL, 
 	`Length` int(11) NOT NULL, 
 	`Diameter` int(11) NOT NULL, 
 	`Height` int(11) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Rings` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `abalone` 
-- 
ALTER TABLE `NCSSG_dumped_db_al84`.`abalone`
	ADD PRIMARY KEY (`Shell_weight`,`Shucked_Weight`,`Whole_Weight`);
COMMIT;
