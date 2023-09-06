--Create new table entries

--Create a customer
INSERT INTO `Customers` (`first_name`,`last_name`, `email`, `phone_number`, `customer_address`, `customer_city`, `customer_state`, `customer_zip`) VALUES (:first_name_Input, :last_name_Input, :email_Input, :phone_number_Input, :customer_address_Input, :customer_city_Input, :customer_state_Imput, :customer_zip_Input)

--Create equipment
INSERT INTO `Equipment` (`type`, `manufacturer`, `classification`, `manufacturer_year`, `quantity_owned`, `quantity_rented`, `store_id`) VALUES (:type_Input, :manufacturer_Input, :classification_Input, :manufacturer_year_Input, :quantity_owned_Input, :quantity_rented_Input, :store_id_Input)

--Create an employee
INSERT INTO `Employees` (`first_name`, `last_name`, `email`, `phone_number`, `username`, `store_id`) VALUES (:first_name_Input, :last_name_Input, :email_Input, :phone_number_Input, :username_Input, :store_id_Input)

--Create a store
INSERT INTO `Stores` (`store_address`, `store_city`, `store_state`, `store_zip`) VALUES (:store_address_Input, :store_city_Input, :store_state_Input, :store_zip_Input)

--Create a rental
INSERT INTO `Rentals` (`employee_id`, `customer_id`, `equipment_id`, `store_id`, `rental_date`, `return_date`) VALUES (:employee_id_Input, :customer_id_Input, :equipment_id_Input, :store_id_Input, :rental_date_Input, :return_date_Input)

--Select all customers
SELECT customer_id, first_name, last_name, email, phone_number, customer_address, customer_city, customer_state, customer_zip FROM Customers

--Select all equipment
SELECT equipment_id, type, manufacturer, classification, manufacturer_year, quantity_owned, quantity_rented, store_id AS 'Store No.', Stores.store_city AS 'Location' FROM Equipment
INNER JOIN Stores on Stores.store_id = Equipment.store_id

--Select all employees
SELECT employee_id, first_name, last_name, email, phone_number, username, store_id FROM Employees

--Select all stores
SELECT store_id, store_address, store_city, store_state, store_zip = :_Input FROM Stores

--Select all rentals
SELECT rental_id, Employees.username AS 'Rental Employee', customer_id AS 'Customer Number', Customers.first_name AS 'First Name', Customers.last_name AS 'Last Name', Customers.email AS 'Email', Equipment.type AS 'Type', Equipment.manufacturer AS 'MFG', Equipment.manufacturer_year AS 'Year', Stores.store_city AS 'Location', rental_date AS 'Pick Up On', return_date AS 'Rental Due By'FROM Rentals
INNER JOIN Employees ON Employees.employee_id = Rentals.employee_id
INNER JOIN Customers ON Customers.customer_id = Rentals.customer_id
INNER JOIN Equipment ON Equipment.equipment_id = Rentals.equipment_id
INNER JOIN Stores ON Stores.store_id = Rentals.rental_id
GROUP BY 'Customer Number' ORDER BY return_date DESC

--Select customer by ID
SELECT customer_id, first_name, last_name, email, phone_number, customer_address, customer_city, customer_state, customer_zip FROM Customers
WHERE customer_id = :customer_ID_selected

--Select equipment by ID
SELECT equipment_id, type, manufacturer, classification, manufacturer_year, quantity_owned, quantity_rented, store_id AS 'Store No.', Stores.store_city AS 'Location' FROM Equipment
INNER JOIN Stores on Stores.store_id = Equipment.store_id
WHERE equipment_id = :equipment_ID_selected

--Select employees by ID
SELECT employee_id, first_name, last_name, email, phone_number, username, store_id FROM Employees
WHERE employee_id = :employee_ID_selected

--Select stores by ID
SELECT store_id, store_address, store_city, store_state, store_zip = :_Input FROM Stores
WHERE store_id = :store_ID_selected

--Select rentals by ID
SELECT rental_id, Employees.username AS 'Rental Employee', customer_id AS 'Customer Number', Customers.first_name AS 'First Name', Customers.last_name AS 'Last Name', Customers.email AS 'Email', Equipment.type AS 'Type', Equipment.manufacturer AS 'MFG', Equipment.manufacturer_year AS 'Year', Stores.store_city AS 'Location', rental_date AS 'Pick Up On', return_date AS 'Rental Due By'FROM Rentals
INNER JOIN Employees ON Employees.employee_id = Rentals.employee_id
INNER JOIN Customers ON Customers.customer_id = Rentals.customer_id
INNER JOIN Equipment ON Equipment.equipment_id = Rentals.equipment_id
INNER JOIN Stores ON Stores.store_id = Rentals.rental_id
WHERE customer_id = :customer_ID_selected
GROUP BY 'Customer Number' ORDER BY return_date DESC

--Update a customer
UPDATE Customers SET first_name = :first_name_Input, last_name = :last_name_Input, email = :email_Input, phone_number = :phone_number_Input, customer_address = :customer_address_Input, customer_city = :customer_city_Input, customer_state = :customer_state_Input, customer_zip = :customer_zip_Input WHERE customer_id= :customer_ID_from_the_update_form


--Update equipment
UPDATE Equipment SET type = :type_Input, manufacturer = :manufacturer_Input, classification = :classification_Input, manufacturer_year = :manufacturer_year_Input, quantity_owned = :quantity_owned_Input, quantity_rented = :quantity_rented_Input, store_id = :store_id_Input WHERE equipment_id= :equipment_ID_from_the_update_form

--Update an employee
UPDATE Employees SET first_name = :first_name_Input, last_name = :last_name_Input, email = :email_Input, phone_number = :phone_number_Input, username = :username_Input, store_id = :store_id_Input WHERE employee_id= :employee_ID_from_the_update_form

--Update a store
UPDATE Stores SET store_address = :store_address_Input, store_city = :store_city_Input, store_state = :store_state_Input, store_zip = :store_zip_Input WHERE store_id= :store_ID_from_the_update_form

--Update a rental
UPDATE Rentals SET employee_id = :employee_id_Input, customer_id = :customer_id_Input, equipment_id = :equipment_id_Input, store_id = :store_id_Input, rental_date = :rental_date_Input, return_date = :return_date_Input WHERE rental_id= :rental_ID_from_the_update_form

--Delete a customer
DELETE FROM Customers WHERE customer_id= :customer_ID_selected_from_browse_customers_page

--Delete equipment
DELETE FROM Equipment WHERE equipment_id= :equipment_ID_selected_from_browse_equipment_page

--Delete an employee
DELETE FROM Employees WHERE employee_id= :employee_ID_selected_from_browse_employees_page

--Delete a store
DELETE FROM Stores WHERE store_id= :store_ID_selected_from_browse_stores_page

--Delete a rental
DELETE FROM Rentals WHERE rental_id= :rental_ID_selected_from_browse_rentals_page
