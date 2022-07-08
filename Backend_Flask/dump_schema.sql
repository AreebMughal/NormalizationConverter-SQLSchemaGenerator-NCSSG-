-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 


-- 
-- Table structure for table `Practice` 
-- 

CREATE TABLE `Practice` ( 
	`pnum` int(11) NOT NULL, 
	`ssn` int(11) NOT NULL, 
	`name` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_ssn` 
-- 

CREATE TABLE `Pra_ssn` ( 
	`ssn` int(11) NOT NULL, 
	`id` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_pnum` 
-- 

CREATE TABLE `Pra_pnum` ( 
	`pnum` int(11) NOT NULL, 
	`ploc` int(11) NOT NULL, 
	`pname` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_email` 
-- 

CREATE TABLE `Pra_email` ( 
	`pnum` int(11) NOT NULL, 
	`ssn` int(11) NOT NULL, 
	`email` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_address` 
-- 

CREATE TABLE `Pra_address` ( 
	`ssn` int(11) NOT NULL, 
	`address` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_id` 
-- 

CREATE TABLE `Pra_id` ( 
	`id` int(11) NOT NULL, 
	`dnum` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Pra_dnum` 
-- 

CREATE TABLE `Pra_dnum` ( 
	`dnum` int(11) NOT NULL, 
	`dloc` int(11) NOT NULL, 
	`dname` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `Practice` 
-- 
ALTER TABLE `Practice`
	ADD PRIMARY KEY (`pnum`,`ssn`)

-- 
-- Indexes for table `Pra_ssn` 
-- 
ALTER TABLE `Pra_ssn`
	ADD PRIMARY KEY (`ssn`)

-- 
-- Indexes for table `Pra_pnum` 
-- 
ALTER TABLE `Pra_pnum`
	ADD PRIMARY KEY (`pnum`)

-- 
-- Indexes for table `Pra_email` 
-- 
ALTER TABLE `Pra_email`
	ADD PRIMARY KEY (`pnum`,`ssn`,`email`)

-- 
-- Indexes for table `Pra_address` 
-- 
ALTER TABLE `Pra_address`
	ADD PRIMARY KEY (`ssn`,`address`)

-- 
-- Indexes for table `Pra_id` 
-- 
ALTER TABLE `Pra_id`
	ADD PRIMARY KEY (`id`)

-- 
-- Indexes for table `Pra_dnum` 
-- 
ALTER TABLE `Pra_dnum`
	ADD PRIMARY KEY (`dnum`)
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `Pra_ssn` 
-- 
ALTER TABLE `Pra_ssn`
	ADD CONSTRAINT `Pra_ssn_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `Practice` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `Pra_pnum` 
-- 
ALTER TABLE `Pra_pnum`
	ADD CONSTRAINT `Pra_pnum_ibfk_1` FOREIGN KEY (`pnum`) REFERENCES `Practice` (`pnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `Pra_email` 
-- 
ALTER TABLE `Pra_email`
	ADD CONSTRAINT `Pra_email_ibfk_1` FOREIGN KEY (`pnum`, `ssn`) REFERENCES `Practice` (`pnum`, `ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `Pra_address` 
-- 
ALTER TABLE `Pra_address`
	ADD CONSTRAINT `Pra_address_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `Practice` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `Pra_id` 
-- 
ALTER TABLE `Pra_id`
	ADD CONSTRAINT `Pra_id_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Pra_ssn` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `Pra_dnum` 
-- 
ALTER TABLE `Pra_dnum`
	ADD CONSTRAINT `Pra_dnum_ibfk_1` FOREIGN KEY (`dnum`) REFERENCES `Pra_id` (`dnum`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 
COMMIT;
