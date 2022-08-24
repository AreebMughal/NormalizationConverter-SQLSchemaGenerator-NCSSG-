-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

<<<<<<< HEAD
CREATE DATABASE `NCSSG_dumped_db_jn85`;
=======
<<<<<<< HEAD
CREATE DATABASE `NCSSG_dumped_db_jn85`;
=======
CREATE DATABASE `NCSSG_dumped_db_as36`;
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b

-- 
-- Table structure for table `practice` 
-- 

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
CREATE TABLE `NCSSG_dumped_db_jn85`.`practice` ( 
	`pnum` int(11) NOT NULL, 
 	`ssn` int(11) NOT NULL, 
 	`name` int(11) NOT NULL 
<<<<<<< HEAD
=======
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_ssn` 
-- 

CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_ssn` ( 
=======
CREATE TABLE `NCSSG_dumped_db_as36`.`organization` ( 
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
	`ssn` int(11) NOT NULL, 
 	`pnum` int(11) NOT NULL 
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_ssn` 
-- 

<<<<<<< HEAD
CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_ssn` ( 
=======
<<<<<<< HEAD
CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_pnum` ( 
=======
CREATE TABLE `NCSSG_dumped_db_as36`.`org_ssn` ( 
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
	`ssn` int(11) NOT NULL, 
 	`id` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_pnum` 
-- 

<<<<<<< HEAD
CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_pnum` ( 
=======
CREATE TABLE `NCSSG_dumped_db_as36`.`org_pnum` ( 
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
	`pnum` int(11) NOT NULL, 
 	`ploc` int(11) NOT NULL, 
 	`pname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b

-- 
-- Table structure for table `pra_email` 
-- 

CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_email` ( 
	`pnum` int(11) NOT NULL, 
 	`ssn` int(11) NOT NULL, 
 	`email` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_address` 
-- 

CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_address` ( 
	`ssn` int(11) NOT NULL, 
 	`address` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_id` 
-- 

CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_id` ( 
	`id` int(11) NOT NULL, 
 	`dnum` decimal(30,20) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `pra_dnum` 
-- 

CREATE TABLE `NCSSG_dumped_db_jn85`.`pra_dnum` ( 
	`dnum` decimal(30,20) NOT NULL, 
 	`dloc` float(54,2) NOT NULL, 
 	`dname` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
<<<<<<< HEAD
=======
=======
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `practice` 
-- 
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`practice`
	ADD PRIMARY KEY (`pnum`,`ssn`);
=======
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`practice`
	ADD PRIMARY KEY (`pnum`,`ssn`);
=======
ALTER TABLE `NCSSG_dumped_db_as36`.`organization`
	ADD PRIMARY KEY (`ssn`,`pnum`);
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b

-- 
-- Indexes for table `pra_ssn` 
-- 
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_ssn`
	ADD PRIMARY KEY (`ssn`),
	ADD UNIQUE KEY `id` (`id`);
=======
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_ssn`
	ADD PRIMARY KEY (`ssn`),
	ADD UNIQUE KEY `id` (`id`);
=======
ALTER TABLE `NCSSG_dumped_db_as36`.`org_ssn`
	ADD PRIMARY KEY (`ssn`);
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b

-- 
-- Indexes for table `pra_pnum` 
-- 
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_pnum`
	ADD PRIMARY KEY (`pnum`);

-- 
-- Indexes for table `pra_email` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_email`
	ADD PRIMARY KEY (`pnum`,`ssn`,`email`);

-- 
-- Indexes for table `pra_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_address`
	ADD PRIMARY KEY (`ssn`,`address`);

-- 
-- Indexes for table `pra_id` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_id`
	ADD PRIMARY KEY (`id`),
	ADD UNIQUE KEY `dnum` (`dnum`);

-- 
-- Indexes for table `pra_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_dnum`
	ADD PRIMARY KEY (`dnum`);
=======
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_pnum`
	ADD PRIMARY KEY (`pnum`);

-- 
-- Indexes for table `pra_email` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_email`
	ADD PRIMARY KEY (`pnum`,`ssn`,`email`);

-- 
-- Indexes for table `pra_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_address`
	ADD PRIMARY KEY (`ssn`,`address`);

-- 
-- Indexes for table `pra_id` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_id`
	ADD PRIMARY KEY (`id`),
	ADD UNIQUE KEY `dnum` (`dnum`);

-- 
-- Indexes for table `pra_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_dnum`
	ADD PRIMARY KEY (`dnum`);
=======
ALTER TABLE `NCSSG_dumped_db_as36`.`org_pnum`
	ADD PRIMARY KEY (`pnum`);
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `practice` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`practice`
	ADD CONSTRAINT `practice_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `practice_ibfk_2` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_email` 
-- 
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_email`
	ADD CONSTRAINT `pra_email_ibfk_1` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `pra_email_ibfk_2` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_address`
	ADD CONSTRAINT `pra_address_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_id` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_id`
	ADD CONSTRAINT `pra_id_ibfk_1` 
	FOREIGN KEY (`id`) REFERENCES `pra_ssn` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_dnum`
	ADD CONSTRAINT `pra_dnum_ibfk_1` 
	FOREIGN KEY (`dnum`) REFERENCES `pra_id` (`dnum`) 
=======
<<<<<<< HEAD
ALTER TABLE `NCSSG_dumped_db_jn85`.`practice`
	ADD CONSTRAINT `practice_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `practice_ibfk_2` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_email` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_email`
	ADD CONSTRAINT `pra_email_ibfk_1` 
	FOREIGN KEY (`pnum`) REFERENCES `pra_pnum` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `pra_email_ibfk_2` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_address` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_address`
	ADD CONSTRAINT `pra_address_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `pra_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_id` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_id`
	ADD CONSTRAINT `pra_id_ibfk_1` 
	FOREIGN KEY (`id`) REFERENCES `pra_ssn` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `pra_dnum` 
-- 
ALTER TABLE `NCSSG_dumped_db_jn85`.`pra_dnum`
	ADD CONSTRAINT `pra_dnum_ibfk_1` 
	FOREIGN KEY (`dnum`) REFERENCES `pra_id` (`dnum`) 
=======
ALTER TABLE `NCSSG_dumped_db_as36`.`organization`
	ADD CONSTRAINT `organization_ibfk_1` 
	FOREIGN KEY (`ssn`) REFERENCES `org_ssn` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `organization_ibfk_2` 
	FOREIGN KEY (`pnum`) REFERENCES `org_pnum` (`pnum`) 
>>>>>>> 983bfe770aff4492217ee00d25256efe7160b47d
>>>>>>> a05eedfcda1c9118c43012cf0ddbefc96006cb0b
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
