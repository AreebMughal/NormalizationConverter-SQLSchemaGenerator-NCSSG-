-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_ab83`;

-- 
-- Table structure for table `abalone` 
-- 

CREATE TABLE `NCSSG_dumped_db_ab83`.`abalone` ( 
	`Shell_weight` int(11) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Length` int(11) NOT NULL, 
 	`Height` int(11) NOT NULL, 
 	`Shucked_Weight` text(23) NOT NULL, 
 	`Rings` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `aba_diameter` 
-- 

CREATE TABLE `NCSSG_dumped_db_ab83`.`aba_diameter` ( 
	`Diameter` int(11) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Sex` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `aba_shucked_weight` 
-- 

CREATE TABLE `NCSSG_dumped_db_ab83`.`aba_shucked_weight` ( 
	`Shucked_Weight` text(23) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Diameter` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `abalone` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`abalone`
	ADD PRIMARY KEY (`Shell_weight`,`Viscera_weight`,`Whole_Weight`),
	ADD UNIQUE KEY `Shucked_Weight` (`Shucked_Weight`);

-- 
-- Indexes for table `aba_diameter` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`aba_diameter`
	ADD PRIMARY KEY (`Diameter`,`Viscera_weight`,`Whole_Weight`);

-- 
-- Indexes for table `aba_shucked_weight` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`aba_shucked_weight`
	ADD PRIMARY KEY (`Shucked_Weight`,`Viscera_weight`,`Whole_Weight`),
	ADD UNIQUE KEY `Diameter` (`Diameter`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `abalone` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`abalone`
	ADD CONSTRAINT `abalone_ibfk_1` 
	FOREIGN KEY (`Viscera_weight`) REFERENCES `aba_diameter` (`Viscera_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `abalone_ibfk_2` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `aba_diameter` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `aba_diameter` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`aba_diameter`
	ADD CONSTRAINT `aba_diameter_ibfk_1` 
	FOREIGN KEY (`Viscera_weight`) REFERENCES `abalone` (`Viscera_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_diameter_ibfk_2` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `abalone` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_diameter_ibfk_3` 
	FOREIGN KEY (`Diameter`) REFERENCES `aba_shucked_weight` (`Diameter`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `aba_shucked_weight` 
-- 
ALTER TABLE `NCSSG_dumped_db_ab83`.`aba_shucked_weight`
	ADD CONSTRAINT `aba_shucked_weight_ibfk_1` 
	FOREIGN KEY (`Shucked_Weight`) REFERENCES `abalone` (`Shucked_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_shucked_weight_ibfk_2` 
	FOREIGN KEY (`Viscera_weight`) REFERENCES `abalone` (`Viscera_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_shucked_weight_ibfk_3` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `abalone` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
