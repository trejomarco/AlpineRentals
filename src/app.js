//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js

/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

PORT = 6907;

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({
    extname: ".hbs",
    layoutsDir: 'views/layouts',
    defaultLayout: 'main.hbs',
}));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render('index')                                                   // an object where 'data' is equal to the 'rows' we
});

app.get('/rentals', function (req, res) {
    let query1 = "SELECT * FROM Rentals;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        console.log(error)
        res.render('rentals', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })
});

app.post('/add-rental', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(req.body)

    let insertRental = `INSERT INTO Rentals (employee_id, customer_id, equipment_id, store_id, rental_date, return_date) VALUES ('${data.employee_id}', '${data.customer_id}', '${data.equipment_id}', '${data.store_id}', '${data.rental_date}', '${data.return_date}')`;
    db.pool.query(insertRental, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            let selectRentals = `SELECT * FROM Rentals;`;
            db.pool.query(selectRentals, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-rental', function (req, res, next) {
    let data = req.body;
    let rentalID = parseInt(data.id);
    let deleteRental = `DELETE FROM Rentals WHERE rental_id = ?`;
    console.log(req.body)

    db.pool.query(deleteRental, [rentalID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);

        }
    });
});

app.put('/edit-rental', function (req, res, next) {
    let data = req.body;
    console.log(req.body)

    let rentalID = parseInt(data.rental_id);

    let editRental = `UPDATE Rentals SET employee_id = '${data.employee_id}', customer_id = '${data.customer_id}', equipment_id = '${data.equipment_id}', store_id = '${data.store_id}', rental_date = '${data.rental_date}', return_date = '${data.return_date}' WHERE rental_id = ?`
    let selectRental = `SELECT * FROM Rentals WHERE rental_id = ?`

    // Run the 1st query
    db.pool.query(editRental, [rentalID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectRental, [rentalID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/customers', function (req, res) {
    let selectCustomers = "SELECT * FROM Customers;";               // Define our query

    db.pool.query(selectCustomers, function (error, rows, fields) {    // Execute the query
        console.log(error)
        res.render('customers', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })
});

app.post('/add-customer', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(req.body)

    let insertCustomer = `INSERT INTO Customers (first_name, last_name, email, phone_number, customer_address, customer_city, customer_state, customer_zip) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.phone_number}', '${data.customer_address}', '${data.customer_city}', '${data.customer_state}', '${data.customer_zip}')`;
    db.pool.query(insertCustomer, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            let selectCustomers = `SELECT * FROM Customers;`;
            db.pool.query(selectCustomers, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customers WHERE customer_id = ?`;
    console.log(req.body)

    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);

        }
    });
});

app.put('/edit-customer', function (req, res, next) {
    let data = req.body;
    console.log(req.body)

    let customerID = parseInt(data.customer_id);

    let editCustomer = `UPDATE Customers SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', phone_number = '${data.phone_number}', customer_address = '${data.customer_address}', customer_city = '${data.customer_city}', customer_state = '${data.customer_state}', customer_zip = '${data.customer_zip}' WHERE customer_id = ?`
    let selectCustomer = `SELECT * FROM Customers WHERE customer_id = ?`

    // Run the 1st query
    db.pool.query(editCustomer, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectCustomer, [customerID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});
app.get('/employees', function (req, res) {
    let selectEmployees;
    if (req.query.lname === undefined)
    {
        selectEmployees = "SELECT * FROM Employees;";               // Define our query
    }
    else
    {
        selectEmployees = `SELECT * FROM Employees WHERE last_name LIKE "${req.query.lname}%";`
    }
    let selectStores = "SELECT * FROM Stores";

    db.pool.query(selectEmployees, function (error, rows, fields) {    // Execute the query
        console.log(error)
        let employees = rows;
        db.pool.query(selectStores, (error, rows, fields) => {
            let stores = rows;

            let storemap = {}
            stores.map(store => {
                let id = parseInt(store.store_id, 10);
                storemap[id] = store["store_city"];
        })

        employees = employees.map(employee => {
            return Object.assign(employee, {store_id: storemap[employee.store_id]})
        })
        //console.log(employees)
        //console.log(storemap)

            return res.render('employees', { data: employees, stores: stores });                  // Render the index.hbs file, and also send the renderer


        })

    })
});

app.post('/add-employee', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(req.body)

    let insertCustomer = `INSERT INTO Employees (first_name, last_name, email, phone_number, username, store_id) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.phone_number}', '${data.username}', '${data.store_id}')`;
    db.pool.query(insertCustomer, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            let selectCustomers = `SELECT * FROM Employees;`;
            db.pool.query(selectCustomers, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-employee', function (req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Employees WHERE employee_id = ?`;
    console.log(req.body)

    db.pool.query(deleteEmployee, [employeeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);

        }
    });
});

app.put('/edit-employee', function (req, res, next) {
    let data = req.body;
    console.log(req.body)

    let employeeID = parseInt(data.employee_id);
    let editEmployee = `UPDATE Employees SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', phone_number = '${data.phone_number}', username = '${data.username}', store_id = '${data.store_id}' WHERE employee_id = ?`;
    let selectEmployee = `SELECT * FROM Employees WHERE employee_id = ?`;
    let selectStores = "SELECT * FROM Stores";




    // Run the 1st query
    db.pool.query(editEmployee, [employeeID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectEmployee, [employeeID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});
app.get('/equipment', function (req, res) {
    let selectEquipment;
    if (req.query.name === undefined)
    {
        selectEquipment = "SELECT * FROM Equipment;";               // Define our query
    }
    else
    {
        selectEquipment = `SELECT * FROM Equipment WHERE name LIKE "${req.query.name}%";`
    }
    let selectStores = "SELECT * FROM Stores";

    db.pool.query(selectEquipment, function (error, rows, fields) {    // Execute the query
        console.log(error)
        let equipments = rows;


        db.pool.query(selectStores, (error, rows, fields) => {
            let stores = rows;
            let storemap = {}
            stores.map(store => {
                let id = parseInt(store.store_id, 10);
                storemap[id] = store["store_city"];
        })

        equipments = equipments.map(equipment => {
            return Object.assign(equipment, {store_id: storemap[equipment.store_id]})
        })
        //console.log(employees)
        //console.log(storemap)

            return res.render('equipment', { data: equipments, stores: stores });                  // Render the index.hbs file, and also send the renderer

        })
    })
});

app.post('/add-equipment', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(req.body)

    let insertEquipment = `INSERT INTO Equipment (type, manufacturer, classification, manufacturer_year, quantity_owned, quantity_rented, store_id) VALUES ('${data.type}', '${data.manufacturer}', '${data.classification}', '${data.manufacturer_year}', '${data.quantity_owned}', '${data.quantity_rented}', '${data.store_id}')`;
    db.pool.query(insertEquipment, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            let selectEquipment = `SELECT * FROM Equipment;`;
            db.pool.query(selectEquipment, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-equipment', function (req, res, next) {
    let data = req.body;
    let equipmentID = parseInt(data.id);
    let deleteEquipment = `DELETE FROM Equipment WHERE equipment_id = ?`;
    console.log(req.body)

    db.pool.query(deleteEquipment, [equipmentID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);

        }
    });
});

app.put('/edit-equipment', function (req, res, next) {
    let data = req.body;
    console.log(req.body)

    let equipmentID = parseInt(data.equipment_id);

    let editEquipment = `UPDATE Equipment SET type = '${data.type}', manufacturer = '${data.manufacturer}', classification = '${data.classification}', manufacturer_year = '${data.manufacturer_year}', quantity_owned = '${data.quantity_owned}', quantity_rented = '${data.quantity_rented}', store_id = '${data.store_id}' WHERE equipment_id = ?`
    let selectEquipment = `SELECT * FROM Equipment WHERE equipment_id = ?`

    // Run the 1st query
    db.pool.query(editEquipment, [equipmentID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectEquipment, [equipmentID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/stores', function (req, res) {
    let selectStores = "SELECT * FROM Stores;";               // Define our query

    db.pool.query(selectStores, function (error, rows, fields) {    // Execute the query
        console.log(error)
        res.render('stores', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })
});

app.post('/add-store', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(req.body)

    let insertStore = `INSERT INTO Stores (store_address, store_city, store_state, store_zip) VALUES ('${data.store_address}', '${data.store_city}', '${data.store_state}', '${data.store_zip}')`;
    db.pool.query(insertStore, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            let selectStores = `SELECT * FROM Stores;`;
            db.pool.query(selectStores, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-store', function (req, res, next) {
    let data = req.body;
    let storeID = parseInt(data.id);
    let deleteStore = `DELETE FROM Stores WHERE store_id = ?`;
    console.log(req.body)

    db.pool.query(deleteStore, [storeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);

        }
    });
});

app.put('/edit-store', function (req, res, next) {
    let data = req.body;
    console.log(req.body)

    let storeID = parseInt(data.store_id);

    let editStore = `UPDATE Stores SET store_address = '${data.store_address}', store_city = '${data.store_city}', store_state = '${data.store_state}', store_zip = '${data.store_zip}' WHERE store_id = ?`
    let selectStore = `SELECT * FROM Stores WHERE store_id = ?`

    // Run the 1st query
    db.pool.query(editStore, [storeID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectStore, [storeID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
