-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_as36`;

-- 
-- Table structure for table `organization` 
-- 

CREATE TABLE `NCSSG_dumped_db_as36`.`organization` ( 
	`ssn` int(11) NOT NULL, 
 	`pnum` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `org_ssn` 
-- 

CREATE TABLE `NCSSG_dumped_db_as36`.`org_ssn` ( 
	`ssn` int(11) NOT NULL, 
 	`email` int(11) NOT NULL, 
 	`ename` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `org_pnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_as36`.`org_pnum` ( 
	`pnum` int(11) NOT NULL, 
 	`ploc` int(11) NOT NULL, 
 	`pname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `organization` 
-- 
ALTER TABLE `NCSSG_dumped_db_as36`.`organization`
	ADD PRIMARY KEY (`ssn`,`pnum`);

-- 
-- Indexes for table `org_ssn` 
-- 
ALTER TABLE `NCSSG_dumped_db_as36`.`org_ssn`
	ADD PRIMARY KEY (`ssn`);

-- 
-- Indexes for table `org_pnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_as36`.`org_pnum`
	ADD PRIMARY KEY (`pnum`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `organization` 
-- 
ALTER TABLE `NCSSG_dumped_db_as36`.`organization`
	ADD CONSTRAINT `organization_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `org_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `organization_ibfk_2` 
	FOREIGN KEY (`pnum`) REFERENCES `org_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
