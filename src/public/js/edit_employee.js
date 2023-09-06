//Citations: https://stackoverflow.com/questions/3989324/javascript-set-dropdown-selected-item-based-on-option-text
//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
function editEmployee(employeeID) {
    fillEditForm(employeeID)
    document.getElementById('add-employee-form').style.display = "none";
    document.getElementById('edit-employee-form').style.display = "block";


    let editEmployeeForm = document.getElementById('edit-employee-form');
    // Modify the objects we need
    editEmployeeForm.addEventListener("submit", function (e) {


        // Prevent the form from submitting
        e.preventDefault();
        // Get form fields we need to get data from

        let editFirstName = document.getElementById("edit-fname");
        let editLastName = document.getElementById("edit-lname");
        let editEmail = document.getElementById("edit-email");
        let editPhoneNumber = document.getElementById("edit-phone-number");
        let editUsername = document.getElementById("edit-username");
        let editStoreId = document.getElementById("edit-store-id");


        // Get the values from the form fields

        let firstNameValue = editFirstName.value;
        let lastNameValue = editLastName.value;
        let emailValue = editEmail.value;
        let phoneNumberValue = editPhoneNumber.value;
        let usernameValue = editUsername.value;
        let storeIdValue = editStoreId.value;

        // Put our data we want to send in a javascript object
        let data = {
            employee_id: employeeID,
            first_name: firstNameValue,
            last_name: lastNameValue,
            email: emailValue,
            phone_number: phoneNumberValue,
            username: usernameValue,
            store_id: storeIdValue,

        }

        console.log(data)

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-employee", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, employeeID);

                // Clear the input fields for another transaction
                editFirstName.value = '';
                editLastName.value = '';
                editEmail.value = '';
                editPhoneNumber.value = '';
                editUsername.value = '';
                editStoreId.value = '';
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
function fillEditForm(employeeID) {
    const attributes = [];
    let table = document.getElementById("employee-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employeeID) {
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
            document.getElementById("edit-username").value = attributes[4];
            let textToFind =  attributes[5];
            let storeselection = document.getElementById("edit-store-id");
            for (let k = 0; k < storeselection.options.length; k++) {
                if (storeselection.options[k].text === textToFind) {
                    storeselection.selectedIndex = k;
                    break
                }}
            break;
        }
    }
}

function updateRow(data, employeeID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == employeeID) {
            selection = table.rows[i]
            selection.cells[1].innerHTML = parsedData[0].first_name;
            selection.cells[2].innerHTML = parsedData[0].last_name;
            selection.cells[3].innerHTML = parsedData[0].email;
            selection.cells[4].innerHTML = parsedData[0].phone_number;
            selection.cells[5].innerHTML = parsedData[0].username;
            selection.cells[6].innerHTML = parsedData[0].store_id;
            selection.cells[7].innerHTML = parsedData[0].store_name;


            break;
        }
    }
    location.reload()
};
