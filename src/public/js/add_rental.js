//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify

let addRentalForm = document.getElementById('add-rental-form');
// Modify the objects we need
addRentalForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputEmployeeId = document.getElementById("input-employee-id");
    let inputCustomerId = document.getElementById("input-customer-id");
    let inputEquipmentId = document.getElementById("input-equipment-id");
    let inputStoreId = document.getElementById("input-store-id");
    let inputRentalDate = document.getElementById("input-rental-date");
    let inputReturnDate = document.getElementById("input-return-date");



    // Get the values from the form fields

    let employeeIdValue = inputEmployeeId.value;
    let customerIdValue = inputCustomerId.value;
    let equipmentIdValue = inputEquipmentId.value;
    let storeIdValue = inputStoreId.value;
    let rentalDateValue = inputRentalDate.value;
    let returnDateValue = inputReturnDate.value;


    console.log(employeeIdValue)
    console.log(customerIdValue)
    console.log(equipmentIdValue)
    console.log(storeIdValue)
    console.log(rentalDateValue)
    console.log(returnDateValue)


    // Put our data we want to send in a javascript object
    let data = {
        employee_id: employeeIdValue,
        customer_id: customerIdValue,
        equipment_id: equipmentIdValue,
        store_id: storeIdValue,
        rental_date: rentalDateValue,
        return_date: returnDateValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rental", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeId.value = '';
            inputCustomerId.value = '';
            inputEquipmentId.value = '';
            inputStoreId.value = '';
            inputRentalDate.value = '';
            inputReturnDate.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("rental-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeIdCell = document.createElement("TD");
    let customerIdCell = document.createElement("TD");
    let equipmentIdCell = document.createElement("TD");
    let storeIdCell = document.createElement("TD");
    let rentalDateCell = document.createElement("TD");
    let returnDateCell = document.createElement("TD");


    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.rental_id;
    employeeIdCell.innerText = newRow.rental_id;
    customerIdCell.innerText = newRow.customer_id;
    equipmentIdCell.innerText = newRow.equipment_id;
    storeIdCell.innerText = newRow.store_id;
    rentalDateCell.innerText = newRow.rental_date;
    returnDateCell.innerText = newRow.return_date;


    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function () {
        editRental(newRow.rental_id);
    };

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteRental(newRow.rental_id);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(employeeIdCell);
    row.appendChild(customerIdCell);
    row.appendChild(equipmentIdCell);
    row.appendChild(storeIdCell);
    row.appendChild(rentalDateCell);
    row.appendChild(returnDateCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.rental_id);
    console.log(row.getAttribute('data-value'))
    console.log(row)

    // Add the row to the table
    currentTable.appendChild(row);
    location.reload()
}
