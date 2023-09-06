//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
function editCustomer(customerID) {

    fillEditForm(customerID)
    document.getElementById('add-customer-form').style.display = "none";
    document.getElementById('edit-customer-form').style.display = "block";




    let editCustomerForm = document.getElementById('edit-customer-form');
    // Modify the objects we need
    editCustomerForm.addEventListener("submit", function (e) {

        // Prevent the form from submitting
        e.preventDefault();
        // Get form fields we need to get data from

        let editFirstName = document.getElementById("edit-fname");
        let editLastName = document.getElementById("edit-lname");
        let editEmail = document.getElementById("edit-email");
        let editPhoneNumber = document.getElementById("edit-phone-number");
        let editAddress = document.getElementById("edit-customer-address");
        let editCity = document.getElementById("edit-customer-city");
        let editState = document.getElementById("edit-customer-state");
        let editZip = document.getElementById("edit-customer-zip");


        // Get the values from the form fields

        let firstNameValue = editFirstName.value;
        let lastNameValue = editLastName.value;
        let emailValue = editEmail.value;
        let phoneNumberValue = editPhoneNumber.value;
        let addressValue = editAddress.value;
        let cityValue = editCity.value;
        let stateValue = editState.value;
        let zipValue = editZip.value;

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
            customer_id: customerID,
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
        xhttp.open("PUT", "/edit-customer", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, customerID);

                // Clear the input fields for another transaction
                editFirstName.value = '';
                editLastName.value = '';
                editEmail.value = '';
                editPhoneNumber.value = '';
                editAddress.value = '';
                editCity.value = '';
                editState.value = '';
                editZip.value = '';
                cancelEdit();
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
function fillEditForm(customerID) {
    const attributes = [];
    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
            selection = table.rows[i]
            let counter = 0
            for (let j = 1, col; col = selection.cells[j]; j++) {
                attributes[counter] = selection.cells[j].innerHTML;
                counter++;
            }
            document.getElementById("edit-fname").value = attributes[0];
            document.getElementById("edit-lname").value = attributes[1];
            document.getElementById("edit-email").value = attributes[2];
            document.getElementById("edit-phone-number").value = attributes[3];
            document.getElementById("edit-customer-address").value = attributes[4];
            document.getElementById("edit-customer-city").value = attributes[5];
            document.getElementById("edit-customer-state").value = attributes[6];
            document.getElementById("edit-customer-zip").value = attributes[7];

            break;
        }
    }
}

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customerID) {
            selection = table.rows[i]
            selection.cells[1].innerHTML = parsedData[0].first_name;
            selection.cells[2].innerHTML = parsedData[0].last_name;
            selection.cells[3].innerHTML = parsedData[0].email;
            selection.cells[4].innerHTML = parsedData[0].phone_number;
            selection.cells[5].innerHTML = parsedData[0].customer_address;
            selection.cells[6].innerHTML = parsedData[0].customer_city;
            selection.cells[7].innerHTML = parsedData[0].customer_state;
            selection.cells[8].innerHTML = parsedData[0].customer_zip;
            break;
        }
    }
    location.reload()
};
