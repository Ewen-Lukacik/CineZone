SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`) VALUES
(4, 'Science-Fiction'),
(5, 'Thriller'),
(6, 'Comedy'),
(7, 'Animation'),
(8, 'Action'),
(9, 'Drama'),
(10, 'Fantasy');

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  `rating` float NOT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `movies` (`id`, `title`, `director`, `release_year`, `rating`, `category_id`) VALUES
(3, 'Interstellar', 'Christopher Nolan', 2014, 8.6, 4),
(4, 'Se7en', 'David Fincher', 1995, 8.6, 5),
(5, 'The Mask', 'Chuck Russell', 1994, 7, 6),
(6, 'Star Wars: Rogue One', 'Gareth Edwards', 2016, 9, 4),
(7, 'Solo: A Star Wars Story', 'Ron Howard', 2018, 6.9, 4),
(8, 'A New Hope', 'George Lucas', 1977, 8.6, 4),
(16, 'The Lion King', 'Roger Allers', 1994, 8.5, 7),
(17, 'Spider-Man', 'Sam Raimi', 2002, 7.4, 8),
(18, 'Titanic', 'James Cameron', 1997, 7.9, 9),
(19, 'Mad Max: Fury Road', 'George Miller', 2015, 8.1, 8),
(20, 'Wall-E', 'Andrew Stanton', 2008, 8.4, 4),
(21, 'The Martian', 'Ridley Scott', 2015, 8, 4),
(22, 'The Lord of the Rings: The Return of the King', 'Peter Jackson', 2003, 9, 10),
(23, 'Pinocchio', 'Robert Zemeckis', 2022, 6.2, 7),
(24, 'Kung Fu Panda', 'Mark Osborne', 2008, 7.6, 7);

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `categories` ADD PRIMARY KEY (`id`);
ALTER TABLE `movies` ADD PRIMARY KEY (`id`), ADD KEY `fk_movies_categories` (`category_id`);
ALTER TABLE `users` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `categories` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `movies` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
ALTER TABLE `users` MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `movies`
  ADD CONSTRAINT `fk_movies_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;