//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify

let addEmployeeForm = document.getElementById('add-employee-form');
// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");
    let inputPhoneNumber = document.getElementById("input-phone-number");
    let inputUsername = document.getElementById("input-username");
    let inputStoreId = document.getElementById("input-store-id");



    // Get the values from the form fields

    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let usernameValue = inputUsername.value;
    let storeIdValue = inputStoreId.value;


    console.log(firstNameValue)
    console.log(lastNameValue)
    console.log(emailValue)
    console.log(phoneNumberValue)
    console.log(usernameValue)
    console.log(storeIdValue)


    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        username: usernameValue,
        store_id: storeIdValue,

    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee", true);
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
            inputUsername.value = '';
            inputStoreId.value = '';

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
    let currentTable = document.getElementById("employee-table");

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
    let employeeUsernameCell = document.createElement("TD");
    let employeeStoreIdCell = document.createElement("TD");


    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.employee_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;
    employeeUsernameCell.innerText = newRow.username;
    employeeStoreIdCell.innerText = newRow.store_id;


    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function () {
        editEmployee(newRow.employee_id);
    };

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteEmployee(newRow.employee_id);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(employeeUsernameCell);
    row.appendChild(employeeStoreIdCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.employee_id);
    console.log(row.getAttribute('data-value'))
    console.log(row)

    // Add the row to the table
    currentTable.appendChild(row);
    location.reload();
}
