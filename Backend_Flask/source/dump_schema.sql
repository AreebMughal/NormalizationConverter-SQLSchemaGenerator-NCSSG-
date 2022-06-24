-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 


-- 
-- Table structure for table `Organization` 
-- 

CREATE TABLE `Organization` ( 
	`pnum` int(11) NOT NULL, 
	`ssn` int(11) NOT NULL, 
	`name` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_ssn` 
-- 

CREATE TABLE `Org_ssn` ( 
	`ssn` int(11) NOT NULL, 
	`id` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_pnum` 
-- 

CREATE TABLE `Org_pnum` ( 
	`pnum` int(11) NOT NULL, 
	`ploc` int(11) NOT NULL, 
	`pname` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_email` 
-- 

CREATE TABLE `Org_email` ( 
	`pnum` int(11) NOT NULL, 
	`ssn` int(11) NOT NULL, 
	`email` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_address` 
-- 

CREATE TABLE `Org_address` ( 
	`ssn` int(11) NOT NULL, 
	`address` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_id` 
-- 

CREATE TABLE `Org_id` ( 
	`id` int(11) NOT NULL, 
	`dnum` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `Org_dnum` 
-- 

CREATE TABLE `Org_dnum` ( 
	`dnum` int(11) NOT NULL, 
	`dloc` int(11) NOT NULL, 
	`dname` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `Organization` 
-- 
ALTER TABLE `Organization`
	ADD PRIMARY KEY (`pnum`,`ssn`)

-- 
-- Indexes for table `Org_ssn` 
-- 
ALTER TABLE `Org_ssn`
	ADD PRIMARY KEY (`ssn`)

-- 
-- Indexes for table `Org_pnum` 
-- 
ALTER TABLE `Org_pnum`
	ADD PRIMARY KEY (`pnum`)

-- 
-- Indexes for table `Org_email` 
-- 
ALTER TABLE `Org_email`
	ADD PRIMARY KEY (`pnum`,`ssn`,`email`)

-- 
-- Indexes for table `Org_address` 
-- 
ALTER TABLE `Org_address`
	ADD PRIMARY KEY (`ssn`,`address`)

-- 
-- Indexes for table `Org_id` 
-- 
ALTER TABLE `Org_id`
	ADD PRIMARY KEY (`id`)

-- 
-- Indexes for table `Org_dnum` 
-- 
ALTER TABLE `Org_dnum`
	ADD PRIMARY KEY (`dnum`)
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `Org_ssn` 
-- 
ALTER TABLE `Org_ssn`
	ADD CONSTRAINT `Org_ssn_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `Organization` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `Org_pnum` 
-- 
ALTER TABLE `Org_pnum`
	ADD CONSTRAINT `Org_pnum_ibfk_1` FOREIGN KEY (`pnum`) REFERENCES `Organization` (`pnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `Org_email` 
-- 
ALTER TABLE `Org_email`
	ADD CONSTRAINT `Org_email_ibfk_1` FOREIGN KEY (`ssn`, `pnum`) REFERENCES `Organization` (`ssn`, `pnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `Org_address` 
-- 
ALTER TABLE `Org_address`
	ADD CONSTRAINT `Org_address_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `Organization` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `Org_id` 
-- 
ALTER TABLE `Org_id`
	ADD CONSTRAINT `Org_id_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Org_ssn` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `Org_dnum` 
-- 
ALTER TABLE `Org_dnum`
	ADD CONSTRAINT `Org_dnum_ibfk_1` FOREIGN KEY (`dnum`) REFERENCES `Org_id` (`dnum`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
