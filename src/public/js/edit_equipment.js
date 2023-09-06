//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
function editEquipment(equipmentID) {

    fillEditForm(equipmentID)
    document.getElementById('add-equipment-form').style.display = "none";
    document.getElementById('edit-equipment-form').style.display = "block";




    let editEquipmentForm = document.getElementById('edit-equipment-form');
    // Modify the objects we need
    editEquipmentForm.addEventListener("submit", function (e) {

        // Prevent the form from submitting
        e.preventDefault();
        // Get form fields we need to get data from

        let editType = document.getElementById("edit-type");
        let editManufacturer = document.getElementById("edit-manufacturer");
        let editClassification = document.getElementById("edit-classification");
        let editManufacturerYear = document.getElementById("edit-manufacturer-year");
        let editQuantityOwned = document.getElementById("edit-quantity-owned");
        let editQuantityRented = document.getElementById("edit-quantity-rented");
        let editStoreId = document.getElementById("edit-store-id");


        // Get the values from the form fields

        let typeValue = editType.value;
        let manufacturerValue = editManufacturer.value;
        let classificationValue = editClassification.value;
        let manufacturerYearValue = editManufacturerYear.value;
        let quantityOwnedValue = editQuantityOwned.value;
        let quantityRentedValue = editQuantityRented.value;
        let storeIdValue = editStoreId.value;

        console.log(typeValue)
        console.log(manufacturerValue)
        console.log(classificationValue)
        console.log(manufacturerYearValue)
        console.log(quantityOwnedValue)
        console.log(quantityRentedValue)
        console.log(storeIdValue)


        // Put our data we want to send in a javascript object
        let data = {
            equipment_id: equipmentID,
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
        xhttp.open("PUT", "/edit-equipment", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, equipmentID);

                // Clear the input fields for another transaction
                editType.value = '';
                editManufacturer.value = '';
                editClassification.value = '';
                editManufacturerYear.value = '';
                editQuantityOwned.value = '';
                editQuantityRented.value = '';
                editStoreId.value = '';
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
function fillEditForm(equipmentID) {
    const attributes = [];
    let table = document.getElementById("equipment-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == equipmentID) {
            selection = table.rows[i]
            let counter = 0
            for (let j = 1, col; col = selection.cells[j]; j++) {
                attributes[counter] = selection.cells[j].innerHTML;
                counter++;
            }
            document.getElementById("edit-type").value = attributes[0];
            document.getElementById("edit-manufacturer").value = attributes[1];
            document.getElementById("edit-classification").value = attributes[2];
            document.getElementById("edit-manufacturer-year").value = attributes[3];
            document.getElementById("edit-quantity-owned").value = attributes[4];
            document.getElementById("edit-quantity-rented").value = attributes[5];
            let textToFind =  attributes[6];
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

function updateRow(data, equipmentID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("equipment-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == equipmentID) {
            selection = table.rows[i]
            selection.cells[1].innerHTML = parsedData[0].type;
            selection.cells[2].innerHTML = parsedData[0].manufacturer;
            selection.cells[3].innerHTML = parsedData[0].classification;
            selection.cells[4].innerHTML = parsedData[0].manufacturer_year;
            selection.cells[5].innerHTML = parsedData[0].quantity_owned;
            selection.cells[6].innerHTML = parsedData[0].quantity_rented;
            selection.cells[7].innerHTML = parsedData[0].store_id;
            break;

        }
    }
    location.reload()
};
