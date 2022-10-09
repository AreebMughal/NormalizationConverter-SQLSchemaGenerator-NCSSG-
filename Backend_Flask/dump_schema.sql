-- NC-SSG SQL dump 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; 
START TRANSACTION; 
SET time_zone = "+00:00"; 

CREATE DATABASE `NCSSG_dumped_db_tw83`;

-- 
-- Table structure for table `abalone` 
-- 

CREATE TABLE `NCSSG_dumped_db_tw83`.`abalone` ( 
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
-- Table structure for table `aba_height` 
-- 

CREATE TABLE `NCSSG_dumped_db_tw83`.`aba_height` ( 
	`Height` int(11) NOT NULL, 
 	`Rings` int(11) NOT NULL, 
 	`Shucked_Weight` int(11) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `aba_shell_weight` 
-- 

CREATE TABLE `NCSSG_dumped_db_tw83`.`aba_shell_weight` ( 
	`Shell_weight` int(11) NOT NULL, 
 	`Viscera_weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Shucked_Weight` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 
-- Table structure for table `aba_diameter` 
-- 

CREATE TABLE `NCSSG_dumped_db_tw83`.`aba_diameter` ( 
	`Diameter` int(11) NOT NULL, 
 	`Rings` int(11) NOT NULL, 
 	`Shucked_Weight` int(11) NOT NULL, 
 	`Whole_Weight` int(11) NOT NULL, 
 	`Shell_weight` int(11) NOT NULL 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 
-- Indexes for dumped tables 
-- 


-- 
-- Indexes for table `abalone` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`abalone`
	ADD PRIMARY KEY (`Shell_weight`,`Shucked_Weight`,`Whole_Weight`),
	ADD UNIQUE KEY `Diameter` (`Diameter`),
	ADD UNIQUE KEY `Height` (`Height`),
	ADD UNIQUE KEY `Viscera_weight` (`Viscera_weight`),
	ADD UNIQUE KEY `Rings` (`Rings`);

-- 
-- Indexes for table `aba_height` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_height`
	ADD PRIMARY KEY (`Height`,`Rings`,`Shucked_Weight`,`Viscera_weight`),
	ADD UNIQUE KEY `Whole_Weight` (`Whole_Weight`);

-- 
-- Indexes for table `aba_shell_weight` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_shell_weight`
	ADD PRIMARY KEY (`Shell_weight`,`Viscera_weight`,`Whole_Weight`),
	ADD UNIQUE KEY `Shucked_Weight` (`Shucked_Weight`);

-- 
-- Indexes for table `aba_diameter` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_diameter`
	ADD PRIMARY KEY (`Diameter`,`Rings`,`Shucked_Weight`,`Whole_Weight`),
	ADD UNIQUE KEY `Shell_weight` (`Shell_weight`);
-- 
-- Constraints for dumped tables 
-- 


-- 
-- Constraint for table `abalone` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`abalone`
	ADD CONSTRAINT `abalone_ibfk_1` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `aba_height` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `abalone_ibfk_2` 
	FOREIGN KEY (`Shucked_Weight`) REFERENCES `aba_shell_weight` (`Shucked_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `abalone_ibfk_3` 
	FOREIGN KEY (`Shell_weight`) REFERENCES `aba_diameter` (`Shell_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `aba_height` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_height`
	ADD CONSTRAINT `aba_height_ibfk_1` 
	FOREIGN KEY (`Height`) REFERENCES `abalone` (`Height`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_height_ibfk_2` 
	FOREIGN KEY (`Rings`) REFERENCES `abalone` (`Rings`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_height_ibfk_3` 
	FOREIGN KEY (`Shucked_Weight`) REFERENCES `abalone` (`Shucked_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_height_ibfk_4` 
	FOREIGN KEY (`Viscera_weight`) REFERENCES `abalone` (`Viscera_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `aba_shell_weight` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_shell_weight`
	ADD CONSTRAINT `aba_shell_weight_ibfk_1` 
	FOREIGN KEY (`Shell_weight`) REFERENCES `abalone` (`Shell_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_shell_weight_ibfk_2` 
	FOREIGN KEY (`Viscera_weight`) REFERENCES `abalone` (`Viscera_weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_shell_weight_ibfk_3` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `abalone` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraint for table `aba_diameter` 
-- 
ALTER TABLE `NCSSG_dumped_db_tw83`.`aba_diameter`
	ADD CONSTRAINT `aba_diameter_ibfk_1` 
	FOREIGN KEY (`Diameter`) REFERENCES `abalone` (`Diameter`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_diameter_ibfk_2` 
	FOREIGN KEY (`Rings`) REFERENCES `abalone` (`Rings`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_diameter_ibfk_3` 
	FOREIGN KEY (`Shucked_Weight`) REFERENCES `abalone` (`Shucked_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `aba_diameter_ibfk_4` 
	FOREIGN KEY (`Whole_Weight`) REFERENCES `abalone` (`Whole_Weight`) 
	ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
