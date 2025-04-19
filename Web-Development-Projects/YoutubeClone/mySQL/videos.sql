-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2025 at 10:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youtube-clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `description`, `url`, `date_added`) VALUES
(1, 'Kuck FOO', 'epic battles', 'https://www.youtube.com/embed/8y9QnS_tMkY?si=0jpMvNKpqULHwTmD', '2025-01-16 10:03:57'),
(3, 'pixar dead', 'he is dead', 'https://www.youtube.com/embed/LV_9IFDRW3E?si=auYm_c0Zemi7oTny', '2025-01-16 10:33:15'),
(4, 'Fear Toad', 'Its to most anger toad ever', 'https://www.youtube.com/embed/2OaTwR8vXcc?si=ireNdtKD_GRNl5Cg', '2025-01-17 08:48:52'),
(5, 'Horizon zero dawn', 'The biology of horizon zero dawn', 'https://www.youtube.com/embed/Seu7V91vxAo?si=5S3_6JhHovEv-nfF', '2025-01-17 08:49:34'),
(6, 'why angry birds died', 'NOOOOOO not angry birds', 'https://www.youtube.com/embed/lvW13Ukc8FI?si=b63SCceMSez42gkk', '2025-01-17 08:52:01'),
(7, 'problems with unreal 5', 'very big problem', 'https://www.youtube.com/embed/10tODUZp-NM?si=n694ZJ8MWfAJH8l1', '2025-01-17 08:52:52'),
(8, 'how to tame your dragon cartoon', 'this is so fun', 'https://www.youtube.com/embed/4dDUWRWqcIo?si=ve_GxrYQFr5xxQ0j', '2025-01-17 08:53:40'),
(9, 'full minecraft cartoons', 'Cartoon minecraft', 'https://www.youtube.com/embed/nnrCzKFYnN4?si=jqetBdPtNkr449ka', '2025-01-17 08:54:14'),
(10, 'pokemon recap', 'cartoon recap of pokemon', 'https://www.youtube.com/embed/o-UwaetV5EM?si=Z_m0C57DVKuCe7Eg', '2025-01-17 08:54:56'),
(11, 'starwars recap cartoon', 'cartoon recap starwars', 'https://www.youtube.com/embed/FUp-sgicMgo?si=H-kTPkAWI_uOIEC5', '2025-01-17 08:55:34'),
(12, 'DVD player', '10 hours of DVD play', 'https://www.youtube.com/embed/5mGuCdlCcNM?si=oh3n6YiQq7N28On9', '2025-01-17 08:56:15'),
(13, 'The canadian attack', 'this is just not realy fuck canadians', 'https://www.youtube.com/embed/0230d9mp5WY?si=gpUekcQv69r-UtCh', '2025-01-17 08:57:11'),
(14, 'all skylanders game', 'just evey one of them', 'https://www.youtube.com/embed/VCxyGlR1qac?si=TG6_sEw-ic7Ku74j', '2025-01-17 08:58:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
