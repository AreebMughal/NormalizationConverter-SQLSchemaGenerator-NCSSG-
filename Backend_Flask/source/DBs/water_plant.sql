-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2021 at 09:34 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `water_plant`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `cert_pic` varchar(200) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`cert_pic`, `name`) VALUES
('uploads/pictures/Screenshot (75).png', 'werwerf34');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_name`) VALUES
('SATH GROUP OF COMPANY'),
('something'),
('wqe');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user_name` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user_name`, `password`, `type`, `name`) VALUES
('admin', 'admin', 'admin', 'Alexender');

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`name`, `description`, `company_name`, `picture`) VALUES
('iosdujoi', 'iouiyuiseh rier jeori g', 'SATH GROUP OF COMPANY', 'uploads/pictures/deep-poetry-about-light-in-urdu-1200x675.jpg8295.jpg'),
('painch', ' ejkrf hcjshfukefbukfy nbcasil m,anfil afuiah kasn', 'wqe', 'uploads/pictures/43d8ffcd6502649c92ba1968a079358fc892619a43ea312956848f410a81b9c0.jpg'),
('pipes', 'xcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvx .j sfnsdjk sdjfn sdfmsdncjk sdncsdf mcnv i njkfn inmdfu amlfiu ', 'something', 'uploads/pictures/__49813008738____49813008738__Core.ResponseModels.Photo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`name`, `description`) VALUES
('hell', ' kjash fkansui fekdsc;fq we fwekldfhaei fsdlif eklfnm;ioejf ksenf;iue fk '),
('helo', 'dsjhfsdk lhfsdjkhf lkasdhfjklsdh fjklahsdg yerkjfvhui sajkf hsdi;fj osdi;  '),
('jkklj', 'jk'),
('Product 89', ' xsdfjmkhuihk ');

-- --------------------------------------------------------

--
-- Table structure for table `product_material`
--

CREATE TABLE `product_material` (
  `name` varchar(50) NOT NULL,
  `mat_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_material`
--

INSERT INTO `product_material` (`name`, `mat_name`) VALUES
('hell', 'painch'),
('helo', 'painch'),
('helo', 'pipes'),
('jkklj', 'pipes'),
('Product 89', 'painch');

-- --------------------------------------------------------

--
-- Table structure for table `product_pic`
--

CREATE TABLE `product_pic` (
  `name` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_pic`
--

INSERT INTO `product_pic` (`name`, `picture`, `id`) VALUES
('hell', 'uploads/pictures/RE2Gsjc_1920x1080.jpg', 7),
('hell', 'uploads/pictures/RE2Gsjm_1920x1080.jpg', 8),
('helo', 'uploads/pictures/15d3649f-eea5-4728-9104-a5557ede0795_9_1024x768 - Copy.jpg', 3),
('helo', 'uploads/pictures/__49813549406____49813549406__Core.ResponseModels.Photo.jpg', 5),
('jkklj', 'uploads/pictures/ReichenbachFalls_ROW8386664054_1366x768.jpg', 9),
('Product 89', 'uploads/pictures/C360_2019-03-23-21-43-08-780.jpg', 341525),
('Product 89', 'uploads/pictures/IMG_20181219_131645.jpg', 697085),
('Product 89', 'uploads/pictures/IMG_20190212_114018.jpg', 138405);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`name`, `description`, `video`, `status`) VALUES
('Project 2', ' kldsjf klsj klsjdfkl sjfl8932 23948 389jkasd vl843 ', 'uploads/videos/VID_20190723_091909.mp46128.mp4', 'Success'),
('Projects 1', 'jhasjkd hakseufh askfhalekfh afkasdj fguilaerd fb,arjkhadfjkhguejkrthj,kdbfgauiera,ukh,k', 'uploads/videos/VID_20190705_103803.mp4', 'On Hold');

-- --------------------------------------------------------

--
-- Table structure for table `project_pic`
--

CREATE TABLE `project_pic` (
  `name` varchar(100) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_pic`
--

INSERT INTO `project_pic` (`name`, `picture`, `id`) VALUES
('Project 2', 'uploads/pictures/IMG_20190103_123305.jpg', 485897),
('Project 2', 'uploads/pictures/IMG_20190103_123327.jpg', 575475),
('Projects 1', 'uploads/pictures/68926907_2348598871896318_8999466707290423296_n.jpg', 743801),
('Projects 1', 'uploads/pictures/C360_2019-01-14-20-55-47-107.jpg2854.jpg', 197852),
('Projects 1', 'uploads/pictures/RE2Gsjc_1920x1080.jpg', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_name`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user_name`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `product_material`
--
ALTER TABLE `product_material`
  ADD PRIMARY KEY (`name`,`mat_name`),
  ADD KEY `mat_name` (`mat_name`);

--
-- Indexes for table `product_pic`
--
ALTER TABLE `product_pic`
  ADD PRIMARY KEY (`name`,`picture`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `project_pic`
--
ALTER TABLE `project_pic`
  ADD PRIMARY KEY (`name`,`picture`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_material`
--
ALTER TABLE `product_material`
  ADD CONSTRAINT `product_material_ibfk_1` FOREIGN KEY (`name`) REFERENCES `product` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_material_ibfk_2` FOREIGN KEY (`mat_name`) REFERENCES `material` (`name`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product_pic`
--
ALTER TABLE `product_pic`
  ADD CONSTRAINT `product_pic_ibfk_1` FOREIGN KEY (`name`) REFERENCES `product` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_pic`
--
ALTER TABLE `project_pic`
  ADD CONSTRAINT `project_pic_ibfk_1` FOREIGN KEY (`name`) REFERENCES `project` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
