-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_up36`;

-- 
-- Table structure for table `dataset` 
-- 

CREATE TABLE `NCSSG_dumped_db_up36`.`dataset` ( 
	`ssn` int(11) NOT NULL, 
 	`pnum` int(11) NOT NULL, 
 	`Name` int(11) NOT NULL, 
 	`Email1` int(11) NOT NULL, 
 	`Email2` int(11) NOT NULL, 
 	`Address1` int(11) NOT NULL, 
 	`Address2` int(11) NOT NULL, 
 	`DId` int(11) NOT NULL, 
 	`ploc` int(11) NOT NULL, 
 	`pname` int(11) NOT NULL, 
 	`dnum` int(11) NOT NULL, 
 	`dname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `dat_name` 
-- 

CREATE TABLE `NCSSG_dumped_db_up36`.`dat_name` ( 
	`Name` int(11) NOT NULL, 
 	`ssn` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `dataset` 
-- 
ALTER TABLE `NCSSG_dumped_db_up36`.`dataset`
	ADD PRIMARY KEY (`ssn`),
	ADD UNIQUE KEY `Name` (`Name`);

-- 
-- Indexes for table `dat_name` 
-- 
ALTER TABLE `NCSSG_dumped_db_up36`.`dat_name`
	ADD PRIMARY KEY (`Name`),
	ADD UNIQUE KEY `ssn` (`ssn`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `dataset` 
-- 
ALTER TABLE `NCSSG_dumped_db_up36`.`dataset`
	ADD CONSTRAINT `dataset_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `dat_name` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `dat_name` 
-- 
ALTER TABLE `NCSSG_dumped_db_up36`.`dat_name`
	ADD CONSTRAINT `dat_name_ibfk_1` 
	FOREIGN KEY (`Name`) REFERENCES `dataset` (`Name`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
