-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 04. 15:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szakdolgozat_raw`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cities`
--

CREATE TABLE `cities` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `postcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `counties`
--

CREATE TABLE `counties` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rentings`
--

CREATE TABLE `rentings` (
  `id` char(36) NOT NULL,
  `rents_id` char(36) NOT NULL,
  `renter` char(36) NOT NULL,
  `owner` char(36) NOT NULL,
  `price` int(11) NOT NULL,
  `rented_from` date NOT NULL,
  `rented_until` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rents`
--

CREATE TABLE `rents` (
  `id` char(36) NOT NULL,
  `rent_type` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `highlighted` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'HUF',
  `county` char(36) NOT NULL,
  `city` char(36) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT '0',
  `default_image` char(36) NOT NULL,
  `available_from` datetime DEFAULT current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rent_images`
--

CREATE TABLE `rent_images` (
  `id` char(36) NOT NULL,
  `rent_id` char(36) NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rent_type`
--

CREATE TABLE `rent_type` (
  `id` char(36) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
--

CREATE TABLE `reviews` (
  `id` char(36) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `renter_comment` text DEFAULT NULL,
  `owner_comment` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `role` char(10) NOT NULL DEFAULT 'USER',
  `joined_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `utilities`
--

CREATE TABLE `utilities` (
  `id` char(36) NOT NULL,
  `rent_id` char(36) NOT NULL,
  `utility_option_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `utility_options`
--

CREATE TABLE `utility_options` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `counties`
--
ALTER TABLE `counties`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rentings`
--
ALTER TABLE `rentings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_owner_id` (`owner`),
  ADD KEY `fk_renter_id` (`renter`);

--
-- A tábla indexei `rents`
--
ALTER TABLE `rents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rent_type` (`rent_type`),
  ADD KEY `fk_county` (`county`),
  ADD KEY `fk_city` (`city`),
  ADD KEY `fk_default_image` (`default_image`);

--
-- A tábla indexei `rent_images`
--
ALTER TABLE `rent_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rent_images_rent` (`rent_id`);

--
-- A tábla indexei `rent_type`
--
ALTER TABLE `rent_type`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `utilities`
--
ALTER TABLE `utilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_utility_rent` (`rent_id`),
  ADD KEY `fk_utility_option` (`utility_option_id`);

--
-- A tábla indexei `utility_options`
--
ALTER TABLE `utility_options`
  ADD PRIMARY KEY (`id`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `rentings`
--
ALTER TABLE `rentings`
  ADD CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_renter_id` FOREIGN KEY (`renter`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_rents_id` FOREIGN KEY (`id`) REFERENCES `rents` (`id`);

--
-- Megkötések a táblához `rents`
--
ALTER TABLE `rents`
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`city`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `fk_county` FOREIGN KEY (`county`) REFERENCES `counties` (`id`),
  ADD CONSTRAINT `fk_default_image` FOREIGN KEY (`default_image`) REFERENCES `rent_images` (`id`),
  ADD CONSTRAINT `fk_rent_type` FOREIGN KEY (`rent_type`) REFERENCES `rent_type` (`id`);

--
-- Megkötések a táblához `rent_images`
--
ALTER TABLE `rent_images`
  ADD CONSTRAINT `fk_rent_images_rent` FOREIGN KEY (`rent_id`) REFERENCES `rents` (`id`);

--
-- Megkötések a táblához `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_renting_id` FOREIGN KEY (`id`) REFERENCES `rentings` (`id`);

--
-- Megkötések a táblához `utilities`
--
ALTER TABLE `utilities`
  ADD CONSTRAINT `fk_utility_option` FOREIGN KEY (`utility_option_id`) REFERENCES `utility_options` (`id`),
  ADD CONSTRAINT `fk_utility_rent` FOREIGN KEY (`rent_id`) REFERENCES `rents` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
