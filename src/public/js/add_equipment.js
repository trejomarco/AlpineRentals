//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify

let addEquipmentForm = document.getElementById('add-equipment-form');
// Modify the objects we need
addEquipmentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputType = document.getElementById("input-type");
    let inputManufacturer = document.getElementById("input-manufacturer");
    let inputClassification = document.getElementById("input-classification");
    let inputManufacturerYear = document.getElementById("input-manufacturer-year");
    let inputQuantityOwned = document.getElementById("input-quantity-owned");
    let inputQuantityRented = document.getElementById("input-quantity-rented");
    let inputStoreId = document.getElementById("input-store-id");



    // Get the values from the form fields

    let typeValue = inputType.value;
    let manufacturerValue = inputManufacturer.value;
    let classificationValue = inputClassification.value;
    let manufacturerYearValue = inputManufacturerYear.value;
    let quantityOwnedValue = inputQuantityOwned.value;
    let quantityRentedValue = inputQuantityRented.value;
    let storeIdValue = inputStoreId.value;

    console.log(typeValue)
    console.log(manufacturerValue)
    console.log(classificationValue)
    console.log(manufacturerYearValue)
    console.log(quantityOwnedValue)
    console.log(quantityRentedValue)
    console.log(storeIdValue)


    // Put our data we want to send in a javascript object
    let data = {
        type: typeValue,
        manufacturer: manufacturerValue,
        classification: classificationValue,
        manufacturer_year: manufacturerYearValue,
        quantity_owned: quantityOwnedValue,
        quantity_rented: quantityRentedValue,
        store_id: storeIdValue,

    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-equipment", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputType.value = '';
            inputManufacturer.value = '';
            inputClassification.value = '';
            inputManufacturerYear.value = '';
            inputQuantityOwned.value = '';
            inputQuantityRented.value = '';
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
    let currentTable = document.getElementById("equipment-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let manufacturerCell = document.createElement("TD");
    let classificationCell = document.createElement("TD");
    let manufacturerYearCell = document.createElement("TD");
    let quantityOwnedCell = document.createElement("TD");
    let quantityRentedCell = document.createElement("TD");
    let equipmentStoreIdCell = document.createElement("TD");


    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.equipment_id;
    typeCell.innerText = newRow.type;
    manufacturerCell.innerText = newRow.manufacturer;
    classificationCell.innerText = newRow.classification;
    manufacturerYearCell.innerText = newRow.manufacturer_year;
    quantityOwnedCell.innerText = newRow.quantity_owned;
    quantityRentedCell.innerText = newRow.quantity_rented;
    equipmentStoreIdCell.innerText = newRow.store_id;


    editCell = document.createElement("button");
    editCell.innerHTML = "Edit";
    editCell.onclick = function () {
        editEquipment(newRow.equipment_id);
    };

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteEquipment(newRow.equipment_id);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(typeCell);
    row.appendChild(manufacturerCell);
    row.appendChild(classificationCell);
    row.appendChild(manufacturerYearCell);
    row.appendChild(quantityOwnedCell);
    row.appendChild(equipmentStoreIdCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.equipment_id);
    console.log(row.getAttribute('data-value'))
    console.log(row)

    // Add the row to the table
    currentTable.appendChild(row);
}
