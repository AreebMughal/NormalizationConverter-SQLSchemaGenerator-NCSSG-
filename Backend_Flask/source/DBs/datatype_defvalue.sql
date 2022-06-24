-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2022 at 10:17 AM
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
-- Database: `pp`
--

-- --------------------------------------------------------

--
-- Table structure for table `datatype_defvalue`
--

CREATE TABLE `datatype_defvalue` (
  `col_int` int(11) NOT NULL,
  `col_tinyInt` tinyint(4) NOT NULL,
  `col_smallInt` smallint(6) NOT NULL,
  `col_medInt` mediumint(9) NOT NULL,
  `col_Bigint` bigint(20) NOT NULL,
  `col_dec` decimal(10,0) NOT NULL,
  `col_float` float NOT NULL,
  `col_double` double NOT NULL,
  `col_real` double NOT NULL,
  `col_bit` bit(1) NOT NULL,
  `col_boolean` tinyint(1) NOT NULL,
  `col_serial` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `datatype_defvalue`
--
ALTER TABLE `datatype_defvalue`
  ADD UNIQUE KEY `col_serial` (`col_serial`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `datatype_defvalue`
--
ALTER TABLE `datatype_defvalue`
  MODIFY `col_serial` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
