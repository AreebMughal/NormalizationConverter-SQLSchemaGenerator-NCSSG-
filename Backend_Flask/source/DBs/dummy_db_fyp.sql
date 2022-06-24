-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2022 at 07:11 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy_db_fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `practice`
--

CREATE TABLE `practice` (
  `pnum` int(11) NOT NULL DEFAULT current_timestamp(),
  `ssn` int(11) NOT NULL DEFAULT 0,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pra_email`
--

CREATE TABLE `pra_email` (
  `pnum` int(11) NOT NULL,
  `ssn` int(11) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pra_ssn`
--

CREATE TABLE `pra_ssn` (
  `ssn` int(11) NOT NULL,
  `cnic` varchar(200) DEFAULT NULL,
  `d_id` int(11) NOT NULL,
  `dnum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `practice`
--
ALTER TABLE `practice`
  ADD PRIMARY KEY (`pnum`,`ssn`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `pra_email`
--
ALTER TABLE `pra_email`
  ADD PRIMARY KEY (`pnum`,`ssn`,`email`);

--
-- Indexes for table `pra_ssn`
--
ALTER TABLE `pra_ssn`
  ADD PRIMARY KEY (`ssn`),
  ADD UNIQUE KEY `cnic` (`cnic`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pra_email`
--
ALTER TABLE `pra_email`
  ADD CONSTRAINT `pra_email_ibfk_1` FOREIGN KEY (`pnum`,`ssn`) REFERENCES `practice` (`pnum`, `ssn`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
