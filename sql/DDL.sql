SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;



--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
CREATE TABLE `Equipment` (
  `equipment_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `manufacturer` varchar(20) NOT NULL,
  `classification` varchar(20) NOT NULL,
  `manufacturer_year` int(11) NOT NULL,
  `quantity_owned` int(11) NOT NULL,
  `quantity_rented` int(11) NOT NULL,
  `store_id` int(11),
  PRIMARY KEY (`equipment_id`),
  FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Equipment` (`type`, `manufacturer`, `classification`, `manufacturer_year`, `quantity_owned`, `quantity_rented`, `store_id`) 
VALUES
('ski pair', 'Northstar', 'Novice', '2017', 112, 57, 3),
('ski boots pair', 'Progear', 'Novice', '2016', 112, 54, 3),
('helmet', 'Bell', 'All', '2022', 120, 34, 3);


--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `store_id` int(11),
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Employees` (`first_name`, `last_name`, `email`, `phone_number`, `username`, `store_id`) 
VALUES
('Carlos', 'Cruz', 'ccruz@alpineco.com', '7720491293', 'ccruz01', '3'),
('Sarah', 'Wilson', 'swilson@alpineco.com', '7720482057', 'swilson01', '3'),
('Stepahnie', 'Martinez', 'smartinez@alpineco.com', '7720183029', 'smartinez01', '3');

--
-- Table structure for table `Stores`
--

DROP TABLE IF EXISTS `Stores`;
CREATE TABLE `Stores` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_address` varchar(20) NOT NULL,
  `store_city` varchar(20) NOT NULL,
  `store_state` varchar(20) NOT NULL,
  `store_zip` int(11) NOT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Stores` (`store_address`, `store_city`, `store_state`, `store_zip`) 
VALUES
('9901 Rapid Dr', 'Aspen', 'CO', '33456'),
('4401 West Street', 'Boulder', 'CO', '33186'),
('7240 Boulder Way', 'Denver', 'CO', '33012');

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `customer_address` varchar(30) NOT NULL,
  `customer_city` varchar(20) NOT NULL,
  `customer_state` varchar(20) NOT NULL,
  `customer_zip` varchar(5) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Customers` (`first_name`, `last_name`, `email`, `phone_number`, `customer_address`, `customer_city`, `customer_state`, `customer_zip`) 
VALUES
('William', 'Sanders', 'wsanders@mail.com', '0123456789','123 Main St', 'Dallas', 'TX', '23456'),
('Jessica', 'Knorr', 'jknorr@@mail.com', '2345678901', '33 Boulevard Dr', 'Baltimore', 'MD', '12124'),
('Samuel', 'Smith', 'ssmith@mail.com', '3456789012', '77 East Sreet', 'Richmond', 'VA', '85629'),
('Stafani', 'Mahoney', 'smahoney0@gmpg.org', '412-856-1011', '5962 Eastwood Hill', 'Pittsburgh', 'PA', '15220'),
('Alejandra', 'Weagener', 'aweagener1@bloglovin.com', '617-941-6275', '62 Pepper Wood Park', 'Boston', 'MA', '02208'),
('Hube', 'Elijah', 'helijah2@yellowbook.com', '515-654-0550', '2 Valley Edge Center', 'Des Moines', 'IA', '50335'),
('Darice', 'Hassey', 'dhassey3@51.la', '775-644-1846', '7972 Moulton Terrace', 'Reno', 'NV', '89505'),
('Pansie', 'Peskett', 'ppeskett4@ihg.com', '720-121-2896', '3 Melby Crossing', 'Littleton', 'CO', '80127'),
('Diannne', 'Chapple', 'dchapple5@ihg.com', '918-260-2277', '0383 Derek Alley', 'Tulsa', 'OK', '74156'),
('Salomon', 'Andrioni', 'sandrioni6@4shared.com', '718-549-9704', '618 Daystar Parkway', 'Brooklyn', 'NY', '11236'),
('Claybourne', 'Korneichik', 'ckorneichik7@twitpic.com', '651-775-5219', '3 Park Meadow Court', 'Minneapolis', 'MN', '55412'),
('Waylan', 'Carl', 'wcarl8@dropbox.com', '757-509-3868', '9986 7th Hill', 'Suffolk', 'VA', '23436'),
('Phip', 'Pendreigh', 'ppendreigh9@amazon.com', '602-140-4961', '26960 Scoville Circle', 'Glendale', 'AZ', '85311'),
('Dione', 'Wemyss', 'dwemyssa@nifty.com', '919-578-4677', '2155 Springview Alley', 'Raleigh', 'NC', '27635'),
('Roley', 'Fishpool', 'rfishpoolb@tinyurl.com', '813-766-7118', '2 Graedel Hill', 'Zephyrhills', 'FL', '33543'),
('Gizela', 'Kopec', 'gkopecc@typepad.com', '260-467-1473', '2 Dunning Parkway', 'Fort Wayne', 'IN', '46867'),
('Porter', 'Rassell', 'prasselld@hao123.com', '773-142-3810', '28 Gina Alley', 'Chicago', 'IL', '60657'),
('Madonna', 'Inkin', 'minkine@youtube.com', '847-801-2966', '880 Debra Lane', 'Schaumburg', 'IL', '60193'),
('Tomasina', 'Pedracci', 'tpedraccif@fda.gov', '601-636-8601', '4 Superior Court', 'Jackson', 'MS', '39282'),
('Hillyer', 'Silversmidt', 'hsilversmidtg@newyorker.com', '812-238-0998', '3003 Marquette Trail', 'Evansville', 'IN', '47732'),
('Tristam', 'Gorton', 'tgortonh@weibo.com', '713-740-4985', '9303 Vernon Plaza', 'Houston', 'TX', '77240'),
('Anthe', 'Davidovitz', 'adavidovitzi@chronoengine.com', '323-166-0638', '20 Stone Corner Point', 'Los Angeles', 'CA', '90045'),
('Igor', 'Aloshkin', 'ialoshkinj@patch.com', '510-154-1640', '00 Haas Alley', 'Oakland', 'CA', '94660'),
('Staford', 'Tailby', 'stailbyk@friendfeed.com', '315-107-2588', '7556 Colorado Park', 'Syracuse', 'NY', '13205'),
('Dorey', 'Morpeth', 'dmorpethl@whitehouse.gov', '303-469-2330', '9218 Westend Way', 'Boulder', 'CO', '80328'),
('Stephi', 'Noddle', 'snoddlem@omniture.com', '704-353-6425', '847 Knutson Point', 'Charlotte', 'NC', '28230'),
('Salomi', 'MacConnel', 'smacconneln@redcross.org', '610-723-2180', '1 Melody Center', 'Philadelphia', 'PA', '19104'),
('Lorrin', 'Robben', 'lrobbeno@51.la', '571-595-7792', '6 Sommers Street', 'Arlington', 'VA', '22217'),
('Gustaf', 'McOnie', 'gmconiep@mysql.com', '201-848-4042', '5358 Old Gate Trail', 'Paterson', 'NJ', '07522'),
('Nanette', 'Chung', 'nchungq@tamu.edu', '469-624-0091', '896 Oak Crossing', 'Dallas', 'TX', '75342'),
('Ainsley', 'Fairpo', 'afairpor@tinypic.com', '301-767-7172', '142 Bayside Avenue', 'Hyattsville', 'MD', '20784'),
('Valli', 'Daltry', 'vdaltrys@whitehouse.gov', '480-370-9903', '4235 Ronald Regan Road', 'Phoenix', 'AZ', '85040'),
('Gusta', 'Flipek', 'gflipekt@wsj.com', '570-862-2557', '4 Northland Court', 'Wilkes Barre', 'PA', '18706'),
('Jorie', 'Beel', 'jbeelu@canalblog.com', '352-791-1551', '7 Center Point', 'Gainesville', 'FL', '32627'),
('Reggie', 'McColl', 'rmccollv@blog.com', '612-352-3776', '122 Fuller Crossing', 'Saint Paul', 'MN', '55103'),
('Davita', 'Andriesse', 'dandriessew@51.la', '502-957-0531', '04716 Dwight Hill', 'Louisville', 'KY', '40233'),
('Bambie', 'Riggert', 'briggertx@cocolog-nifty.com', '315-838-2362', '9 Michigan Circle', 'Utica', 'NY', '13505'),
('Rona', 'Wibberley', 'rwibberleyy@constantcontact.com', '843-747-2510', '36 School Drive', 'Charleston', 'SC', '29403'),
('Chad', 'Moohan', 'cmoohanz@netscape.com', '419-264-8127', '37667 Maple Park', 'Toledo', 'OH', '43615'),
('Kelsey', 'Moffatt', 'kmoffatt10@qq.com', '212-283-0644', '1 Sundown Way', 'New York City', 'NY', '10125'),
('Jackie', 'Leare', 'jleare11@delicious.com', '859-288-4825', '010 Cody Plaza', 'Lexington', 'KY', '40576'),
('Bing', 'Cory', 'bcory12@huffingtonpost.com', '916-976-6225', '411 Muir Road', 'Sacramento', 'CA', '94257'),
('Marita', 'Haythorne', 'mhaythorne13@zdnet.com', '404-700-4733', '265 Macpherson Alley', 'Atlanta', 'GA', '30356'),
('Darwin', 'Preuvost', 'dpreuvost14@go.com', '214-804-7116', '999 Weeping Birch Alley', 'Dallas', 'TX', '75210'),
('Aubrey', 'Gorry', 'agorry15@addtoany.com', '915-239-6209', '5199 Vera Trail', 'El Paso', 'TX', '79968'),
('Codi', 'Stather', 'cstather16@over-blog.com', '806-904-9453', '57 Gale Park', 'Amarillo', 'TX', '79159'),
('Hilario', 'Cogar', 'hcogar17@slideshare.net', '216-129-4363', '90118 Harper Place', 'Cleveland', 'OH', '44185'),
('Fonzie', 'Manion', 'fmanion18@free.fr', '240-220-9571', '12 Fieldstone Junction', 'Bowie', 'MD', '20719'),
('Margette', 'Scutter', 'mscutter19@discuz.net', '212-601-6465', '2 Bunker Hill Crossing', 'New York City', 'NY', '10125'),
('Giovanni', 'Izacenko', 'gizacenko1a@dion.ne.jp', '804-484-7306', '42 Warner Parkway', 'Richmond', 'VA', '23237'),
('Maximo', 'Le-Good', 'mlegood1b@miibeian.gov.cn', '413-707-5597', '63 Haas Hill', 'Springfield', 'MA', '01114'),
('Ellen', 'Mussolini', 'emussolini1c@un.org', '714-363-2861', '0 Lukken Crossing', 'Orange', 'CA', '92867'),
('Verne', 'Langhor', 'vlanghor1d@yahoo.com', '682-247-6191', '264 Buell Drive', 'Denton', 'TX', '76205'),
('Lonni', 'Cadney', 'lcadney1e@creativecommons.org', '918-823-6763', '939 Canary Junction', 'Tulsa', 'OK', '74133'),
('Buffy', 'Kett', 'bkett1f@yandex.ru', '816-761-9043', '32676 Dawn Parkway', 'Shawnee Mission', 'KS', '66210'),
('Melessa', 'Vicar', 'mvicar1g@blogtalkradio.com', '617-174-8746', '4 Twin Pines Terrace', 'Boston', 'MA', '02216'),
('Frederik', 'Killingbeck', 'fkillingbeck1h@plala.or.jp', '954-991-5843', '9 Packers Way', 'Fort Lauderdale', 'FL', '33330'),
('Olenolin', 'Vedikhov', 'ovedikhov1i@skyrock.com', '513-864-8044', '6 Graceland Avenue', 'Cincinnati', 'OH', '45254'),
('Baxie', 'Doward', 'bdoward1j@1688.com', '713-258-3350', '1996 Reinke Plaza', 'Houston', 'TX', '77266'),
('Johnny', 'Pagett', 'jpagett1k@walmart.com', '617-565-9021', '400 Del Mar Road', 'Boston', 'MA', '02203'),
('Muffin', 'Blackley', 'mblackley1l@latimes.com', '707-963-0237', '29438 Stuart Point', 'Petaluma', 'CA', '94975'),
('Yovonnda', 'Oventon', 'yoventon1m@cpanel.net', '904-850-4517', '8 Carpenter Terrace', 'Jacksonville', 'FL', '32225'),
('Radcliffe', 'Irdale', 'rirdale1n@nationalgeographic.com', '912-887-4729', '834 Pennsylvania Road', 'Savannah', 'GA', '31405'),
('Napoleon', 'Naden', 'nnaden1o@aboutads.info', '913-277-4196', '53 Schlimgen Road', 'Shawnee Mission', 'KS', '66205'),
('Bekki', 'Bohje', 'bbohje1p@acquirethisname.com', '513-420-1300', '15025 Dottie Road', 'Cincinnati', 'OH', '45264'),
('Lanny', 'Morrowe', 'lmorrowe1q@yolasite.com', '619-284-2960', '03986 Arizona Plaza', 'San Diego', 'CA', '92191'),
('Megen', 'Sappson', 'msappson1r@networksolutions.com', '937-938-3680', '41 Mandrake Plaza', 'Dayton', 'OH', '45414'),
('Marti', 'Oakwood', 'moakwood1s@answers.com', '212-768-2204', '385 Sage Street', 'Jamaica', 'NY', '11431'),
('Clay', 'Blune', 'cblune1t@ycombinator.com', '315-536-9935', '29 Mcbride Pass', 'Syracuse', 'NY', '13217'),
('Kingsly', 'McGilvra', 'kmcgilvra1u@time.com', '818-384-9542', '328 Hansons Place', 'Pasadena', 'CA', '91109'),
('Leanora', 'Smeeth', 'lsmeeth1v@dagondesign.com', '719-881-9807', '34662 Troy Pass', 'Colorado Springs', 'CO', '80995'),
('Cristi', 'Ferry', 'cferry1w@com.com', '718-731-3418', '1 Morningstar Street', 'Staten Island', 'NY', '10305'),
('Kikelia', 'Pringour', 'kpringour1x@plala.or.jp', '336-217-8027', '82250 Crest Line Park', 'Winston Salem', 'NC', '27105'),
('Kattie', 'McKellen', 'kmckellen1y@seattletimes.com', '913-761-7632', '92216 Texas Alley', 'Shawnee Mission', 'KS', '66276'),
('Sasha', 'Vyel', 'svyel1z@jiathis.com', '936-377-6027', '58 Wayridge Avenue', 'Houston', 'TX', '77090'),
('Gerianna', 'Ledram', 'gledram20@de.vu', '907-290-0932', '12 Green Ridge Road', 'Anchorage', 'AK', '99512'),
('Robinet', 'Kitchinham', 'rkitchinham21@51.la', '303-837-3262', '15640 Park Meadow Crossing', 'Denver', 'CO', '80299'),
('Pam', 'Bowton', 'pbowton22@washingtonpost.com', '513-196-5621', '3 Jackson Park', 'Cincinnati', 'OH', '45228'),
('Marney', 'Greensted', 'mgreensted23@symantec.com', '417-456-6966', '248 Quincy Avenue', 'Springfield', 'MO', '65805'),
('Karna', 'MacQuarrie', 'kmacquarrie24@slate.com', '903-835-4037', '9388 Nova Center', 'Texarkana', 'TX', '75507'),
('Harrie', 'Drohan', 'hdrohan25@reverbnation.com', '239-122-8185', '34 Mandrake Terrace', 'Fort Myers', 'FL', '33906'),
('Filip', 'Mazzei', 'fmazzei26@github.io', '626-626-4635', '73354 Doe Crossing Plaza', 'Pasadena', 'CA', '91125'),
('Hort', 'Faircley', 'hfaircley27@go.com', '415-776-6968', '9264 Norway Maple Lane', 'Oakland', 'CA', '94616'),
('Shelli', 'Keaton', 'skeaton28@illinois.edu', '915-478-6052', '01279 Fallview Court', 'El Paso', 'TX', '88530'),
('Roxanne', 'Mealand', 'rmealand29@illinois.edu', '417-983-7405', '51408 Division Terrace', 'Springfield', 'MO', '65898'),
('Wyatan', 'Shinefield', 'wshinefield2a@acquirethisname.com', '830-844-7788', '109 Thompson Parkway', 'San Antonio', 'TX', '78230'),
('Francene', 'Matysik', 'fmatysik2b@phoca.cz', '915-532-1555', '95 Raven Plaza', 'El Paso', 'TX', '79994'),
('Desi', 'Spurriar', 'dspurriar2c@ihg.com', '914-557-2755', '83 Washington Point', 'White Plains', 'NY', '10606'),
('Laurene', 'Crosfield', 'lcrosfield2d@huffingtonpost.com', '812-316-3444', '7 Village Parkway', 'Evansville', 'IN', '47737'),
('Estrellita', 'Bellinger', 'ebellinger2e@usda.gov', '202-916-7287', '3 Moland Park', 'Washington', 'DC', '20380'),
('Shelbi', 'Jiracek', 'sjiracek2f@theatlantic.com', '303-894-3466', '8 Northland Court', 'Denver', 'CO', '80204'),
('Selena', 'Padson', 'spadson2g@naver.com', '423-655-8398', '32 Bunting Plaza', 'Johnson City', 'TN', '37605'),
('Annamarie', 'Pringer', 'apringer2h@cbc.ca', '318-657-2205', '252 Badeau Way', 'Shreveport', 'LA', '71151'),
('Calypso', 'Shearsby', 'cshearsby2i@oaic.gov.au', '970-401-1847', '886 Texas Way', 'Fort Collins', 'CO', '80525'),
('Danya', 'Barbier', 'dbarbier2j@cnbc.com', '530-588-8822', '7 Tennyson Place', 'South Lake Tahoe', 'CA', '96154'),
('Esme', 'Sisneros', 'esisneros2k@tinyurl.com', '405-821-5434', '860 Arapahoe Court', 'Oklahoma City', 'OK', '73114'),
('Arabella', 'Stonier', 'astonier2l@nhs.uk', '813-612-7177', '36 Onsgard Crossing', 'Tampa', 'FL', '33605'),
('Sig', 'Ledner', 'sledner2m@vinaora.com', '559-829-2224', '03233 Gulseth Terrace', 'Fresno', 'CA', '93750'),
('Cory', 'Coultass', 'ccoultass2n@people.com.cn', '404-703-8670', '0619 Melvin Plaza', 'Atlanta', 'GA', '31165'),
('Cletis', 'Itzkov', 'citzkov2o@nyu.edu', '909-160-4076', '6 Golf Course Trail', 'San Bernardino', 'CA', '92424'),
('Ralina', 'Sexty', 'rsexty2p@reference.com', '213-371-6417', '8 Longview Avenue', 'Van Nuys', 'CA', '91499'),
('Nerissa', 'Gabotti', 'ngabotti2q@earthlink.net', '713-213-8302', '36629 Crescent Oaks Place', 'Houston', 'TX', '77201'),
('Julian', 'Bridden', 'jbridden2r@smh.com.au', '225-282-8546', '841 Holy Cross Center', 'Baton Rouge', 'LA', '70826');

--
-- Table structure for table `Rentals`
--

DROP TABLE IF EXISTS `Rentals`;
CREATE TABLE `Rentals` (
  `rental_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `store_id` int(11),
  `rental_date` datetime NOT NULL,
  `return_date` datetime NOT NULL,
  PRIMARY KEY (`rental_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE,
  FOREIGN KEY (`equipment_id`) REFERENCES `Equipment` (`equipment_id`)ON DELETE CASCADE,
  FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Rentals` (`employee_id`, `customer_id`, `equipment_id`, `store_id`, `rental_date`, `return_date`) 
VALUES
(1,1,1,3,'2022-04-28','2022-05-30'),
(1,1,2,3,'2022-04-28','2022-05-30'),
(2,1,3,3,'2022-04-28','2022-05-30');


SET FOREIGN_KEY_CHECKS=1;
COMMIT;