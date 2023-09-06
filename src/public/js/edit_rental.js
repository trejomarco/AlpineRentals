//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
function editRental(rentalID) {

    fillEditForm(rentalID)
    document.getElementById('add-rental-form').style.display = "none";
    document.getElementById('edit-rental-form').style.display = "block";




    let editRentalForm = document.getElementById('edit-rental-form');
    // Modify the objects we need
        console.log("whoopie")
    editRentalForm.addEventListener("submit", function (e) {
        // Prevent the form from submitting
        e.preventDefault();
        // Get form fields we need to get data from
        console.log("poopie")
        let editEmployeeId = document.getElementById("edit-employee-id");
        let editCustomerId = document.getElementById("edit-customer-id");
        let editEquipmentId = document.getElementById("edit-equipment-id");
        let editStoreId = document.getElementById("edit-store-id");
        let editRentalDate = document.getElementById("edit-rental-date");
        let editReturnDate = document.getElementById("edit-return-date");



        // Get the values from the form fields

        let employeeIdValue = editEmployeeId.value;
        let customerIdValue = editCustomerId.value;
        let equipmentIdValue = editEquipmentId.value;
        let storeIdValue = editStoreId.value;
        let rentalDateValue = editRentalDate.value;
        let returnDateValue = editReturnDate.value;
        console.log(rentalID)
        console.log(employeeIdValue)
        console.log(customerIdValue)
        console.log(equipmentIdValue)
        console.log(storeIdValue)
        console.log(rentalDateValue)
        console.log(returnDateValue)



        // Put our data we want to send in a javascript object
        let data = {
            rental_id: rentalID,
            employee_id: employeeIdValue,
            customer_id: customerIdValue,
            equipment_id: equipmentIdValue,
            store_id: storeIdValue,
            rental_date: rentalDateValue,
            return_date: returnDateValue,



        }

        console.log(data)

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-rental", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, rentalID);

                // Clear the input fields for another transaction
                editEmployeeId.value = '';
                editCustomerId.value = '';
                editEquipmentId.value = '';
                editStoreId.value = '';
                editRentalDate.value = '';
                editReturnDate.value = '';

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));


    })
}
function cancelEdit() {
        location.reload()



}
function fillEditForm(rentalID) {
    const attributes = [];
    let table = document.getElementById("rental-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == rentalID) {
            selection = table.rows[i]
            let counter = 0
            for (let j = 1, col; col = selection.cells[j]; j++) {
                attributes[counter] = selection.cells[j].innerHTML;
                counter++;
            }
            document.getElementById("edit-employee-id").value = attributes[0];
            document.getElementById("edit-customer-id").value = attributes[1];
            document.getElementById("edit-equipment-id").value = attributes[2];
            document.getElementById("edit-store-id").value = attributes[3];
            document.getElementById("edit-rental-date").value = attributes[4];
            document.getElementById("edit-return-date").value = attributes[5];

            break;
        }
    }
}

function updateRow(data, rentalID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("rental-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == rentalID) {
            selection = table.rows[i]
            selection.cells[1].innerHTML = parsedData[0].employee_id;
            selection.cells[2].innerHTML = parsedData[0].customer_id;
            selection.cells[3].innerHTML = parsedData[0].equipment_id;
            selection.cells[4].innerHTML = parsedData[0].store_id;
            selection.cells[5].innerHTML = parsedData[0].rental_date;
            selection.cells[6].innerHTML = parsedData[0].return_date;
            break;
        }
    }
    location.reload()

};
