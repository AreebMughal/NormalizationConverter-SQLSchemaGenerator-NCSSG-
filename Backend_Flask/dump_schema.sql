-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_tk84`;

-- 
-- Table structure for table `organization` 
-- 

CREATE TABLE `NCSSG_dumped_db_tk84`.`organization` ( 
	`ssn` year NOT NULL, 
 	`empName` int(11) NOT NULL, 
 	`phone` int(11) NOT NULL, 
 	`dnum` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `org_address` 
-- 

CREATE TABLE `NCSSG_dumped_db_tk84`.`org_address` ( 
	`ssn` year NOT NULL, 
 	`address` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `org_pnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_tk84`.`org_pnum` ( 
	`pnum` int(11) NOT NULL, 
 	`pname` int(11) NOT NULL, 
 	`ploc` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `org_dnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_tk84`.`org_dnum` ( 
	`dnum` int(11) NOT NULL, 
 	`dname` int(11) NOT NULL, 
 	`dcat` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `organization` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`organization`
	ADD PRIMARY KEY (`ssn`),
	ADD UNIQUE KEY `dnum` (`dnum`);

-- 
-- Indexes for table `org_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`org_address`
	ADD PRIMARY KEY (`ssn`,`address`);

-- 
-- Indexes for table `org_pnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`org_pnum`
	ADD PRIMARY KEY (`pnum`);

-- 
-- Indexes for table `org_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`org_dnum`
	ADD PRIMARY KEY (`dnum`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `org_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`org_address`
	ADD CONSTRAINT `org_address_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `organization` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `org_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_tk84`.`org_dnum`
	ADD CONSTRAINT `org_dnum_ibfk_1` 
	FOREIGN KEY (`dnum`) REFERENCES `organization` (`dnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
