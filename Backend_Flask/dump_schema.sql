-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 


-- 
-- Table structure for table `dfg` 
-- 

CREATE TABLE `dfg` ( 
	`ssn` int(11) NOT NULL, 
	`ename` int(11) NOT NULL, 
	`dname` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `_address` 
-- 

CREATE TABLE `_address` ( 
	`ssn` int(11) NOT NULL, 
	`address` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `_dname` 
-- 

CREATE TABLE `_dname` ( 
	`dname` int(11) NOT NULL, 
	`dloc` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `_address` 
-- 

CREATE TABLE `_address` ( 
	`address` int(11) NOT NULL, 
	`did` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `dfg` 
-- 
ALTER TABLE `dfg`
	ADD PRIMARY KEY (`ssn`)

-- 
-- Indexes for table `_address` 
-- 
ALTER TABLE `_address`
	ADD PRIMARY KEY (`ssn`,`address`)

-- 
-- Indexes for table `_dname` 
-- 
ALTER TABLE `_dname`
	ADD PRIMARY KEY (`dname`)

-- 
-- Indexes for table `_address` 
-- 
ALTER TABLE `_address`
	ADD PRIMARY KEY (`address`)
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `_address` 
-- 
ALTER TABLE `_address`
	ADD CONSTRAINT `_address_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `dfg` (`ssn`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `_dname` 
-- 
ALTER TABLE `_dname`
	ADD CONSTRAINT `_dname_ibfk_1` FOREIGN KEY (`dname`) REFERENCES `dfg` (`dname`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 

-- 
-- Constraint for table `_address` 
-- 
ALTER TABLE `_address`
	ADD CONSTRAINT `_address_ibfk_1` FOREIGN KEY (`address`) REFERENCES `_address` (`address`) 
	ON DELETE CASCADE ON UPDATE CASCADE; 
COMMIT;
