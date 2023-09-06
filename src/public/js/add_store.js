//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify

let addStoreForm = document.getElementById('add-store-form');
// Modify the objects we need
addStoreForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputAddress = document.getElementById("input-store-address");
    let inputCity = document.getElementById("input-store-city");
    let inputState = document.getElementById("input-store-state");
    let inputZip = document.getElementById("input-store-zip");


    // Get the values from the form fields

    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;

    console.log(addressValue)
    console.log(cityValue)
    console.log(stateValue)
    console.log(zipValue)

    // Put our data we want to send in a javascript object
    let data = {
        store_address: addressValue,
        store_city: cityValue,
        store_state: stateValue,
        store_zip: zipValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-store", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
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
    let currentTable = document.getElementById("store-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let storeAddressCell = document.createElement("TD");
    let storeCityCell = document.createElement("TD");
    let storeStateCell = document.createElement("TD");
    let storeZipCell = document.createElement("TD");

    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.store_id;
    storeAddressCell.innerText = newRow.store_address;
    storeCityCell.innerText = newRow.store_city;
    storeStateCell.innerText = newRow.store_state;
    storeZipCell.innerText = newRow.store_zip;

    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function () {
        editStore(newRow.store_id);
    };

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteStore(newRow.store_id);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(storeAddressCell);
    row.appendChild(storeCityCell);
    row.appendChild(storeStateCell);
    row.appendChild(storeZipCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.store_id);
    console.log(row.getAttribute('data-value'))
    console.log(row)

    // Add the row to the table
    currentTable.appendChild(row);
}
