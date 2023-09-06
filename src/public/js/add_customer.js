//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify

let addCustomerForm = document.getElementById('add-customer-form');
// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");
    let inputPhoneNumber = document.getElementById("input-phone-number");
    let inputAddress = document.getElementById("input-customer-address");
    let inputCity = document.getElementById("input-customer-city");
    let inputState = document.getElementById("input-customer-state");
    let inputZip = document.getElementById("input-customer-zip");


    // Get the values from the form fields

    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;

    console.log(firstNameValue)
    console.log(lastNameValue)
    console.log(emailValue)
    console.log(phoneNumberValue)
    console.log(addressValue)
    console.log(cityValue)
    console.log(stateValue)
    console.log(zipValue)

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        customer_address: addressValue,
        customer_city: cityValue,
        customer_state: stateValue,
        customer_zip: zipValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputPhoneNumber.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
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
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let customerAddressCell = document.createElement("TD");
    let customerCityCell = document.createElement("TD");
    let customerStateCell = document.createElement("TD");
    let customerZipCell = document.createElement("TD");

    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customer_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;
    customerAddressCell.innerText = newRow.customer_address;
    customerCityCell.innerText = newRow.customer_city;
    customerStateCell.innerText = newRow.customer_state;
    customerZipCell.innerText = newRow.customer_zip;

    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function () {
        editCustomer(newRow.customer_id);
    };

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteCustomer(newRow.customer_id);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(customerAddressCell);
    row.appendChild(customerCityCell);
    row.appendChild(customerStateCell);
    row.appendChild(customerZipCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.customer_id);
    console.log(row.getAttribute('data-value'))
    console.log(row)

    // Add the row to the table
    currentTable.appendChild(row);
}
