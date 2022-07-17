-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_oi83`;

-- 
-- Table structure for table `practice` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`practice` ( 
	`pnum` int(11) NOT NULL, 
 	`ssn` int(11) NOT NULL, 
 	`name` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_ssn` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_ssn` ( 
	`ssn` int(11) NOT NULL, 
 	`id` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_pnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_pnum` ( 
	`pnum` int(11) NOT NULL, 
 	`ploc` int(11) NOT NULL, 
 	`pname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_email` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_email` ( 
	`pnum` int(11) NOT NULL, 
 	`ssn` int(11) NOT NULL, 
 	`email` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_address` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_address` ( 
	`ssn` int(11) NOT NULL, 
 	`address` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_id` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_id` ( 
	`id` int(11) NOT NULL, 
 	`dnum` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_dnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_oi83`.`pra_dnum` ( 
	`dnum` int(11) NOT NULL, 
 	`dloc` int(11) NOT NULL, 
 	`dname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `practice` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`practice`
	ADD PRIMARY KEY (`pnum`,`ssn`);

-- 
-- Indexes for table `pra_ssn` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_ssn`
	ADD PRIMARY KEY (`ssn`),
	ADD UNIQUE KEY `id` (`id`);

-- 
-- Indexes for table `pra_pnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_pnum`
	ADD PRIMARY KEY (`pnum`);

-- 
-- Indexes for table `pra_email` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_email`
	ADD PRIMARY KEY (`pnum`,`ssn`,`email`);

-- 
-- Indexes for table `pra_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_address`
	ADD PRIMARY KEY (`ssn`,`address`);

-- 
-- Indexes for table `pra_id` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_id`
	ADD PRIMARY KEY (`id`),
	ADD UNIQUE KEY `dnum` (`dnum`);

-- 
-- Indexes for table `pra_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_oi83`.`pra_dnum`
	ADD PRIMARY KEY (`dnum`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `practice` 
-- 
ALTER TABLE`NCSSG_dumped_db_oi83`.`practice`
	ADD CONSTRAINT `practice_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `practice_ibfk_2` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_email` 
-- 
ALTER TABLE`NCSSG_dumped_db_oi83`.`pra_email`
	ADD CONSTRAINT `pra_email_ibfk_1` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `pra_email_ibfk_2` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_address` 
-- 
ALTER TABLE`NCSSG_dumped_db_oi83`.`pra_address`
	ADD CONSTRAINT `pra_address_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_id` 
-- 
ALTER TABLE`NCSSG_dumped_db_oi83`.`pra_id`
	ADD CONSTRAINT `pra_id_ibfk_1` 
	FOREIGN KEY (`id`) REFERENCES `pra_ssn` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_dnum` 
-- 
ALTER TABLE`NCSSG_dumped_db_oi83`.`pra_dnum`
	ADD CONSTRAINT `pra_dnum_ibfk_1` 
	FOREIGN KEY (`dnum`) REFERENCES `pra_id` (`dnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
