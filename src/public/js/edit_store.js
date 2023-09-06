//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
function editStore(storeID) {

    fillEditForm(storeID)
    document.getElementById('add-store-form').style.display = "none";
    document.getElementById('edit-store-form').style.display = "block";




    let editStoreForm = document.getElementById('edit-store-form');
    // Modify the objects we need
    editStoreForm.addEventListener("submit", function (e) {

        // Prevent the form from submitting
        e.preventDefault();
        // Get form fields we need to get data from

        let editAddress = document.getElementById("edit-store-address");
        let editCity = document.getElementById("edit-store-city");
        let editState = document.getElementById("edit-store-state");
        let editZip = document.getElementById("edit-store-zip");


        // Get the values from the form fields

        let addressValue = editAddress.value;
        let cityValue = editCity.value;
        let stateValue = editState.value;
        let zipValue = editZip.value;

        console.log(addressValue)
        console.log(cityValue)
        console.log(stateValue)
        console.log(zipValue)

        // Put our data we want to send in a javascript object
        let data = {
            store_id: storeID,
            store_address: addressValue,
            store_city: cityValue,
            store_state: stateValue,
            store_zip: zipValue
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-store", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, storeID);

                // Clear the input fields for another transaction
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
function fillEditForm(storeID) {
    const attributes = [];
    let table = document.getElementById("store-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == storeID) {
            selection = table.rows[i]
            let counter = 0
            for (let j = 1, col; col = selection.cells[j]; j++) {
                attributes[counter] = selection.cells[j].innerHTML;
                counter++;
            }
            document.getElementById("edit-store-address").value = attributes[0];
            document.getElementById("edit-store-city").value = attributes[1];
            document.getElementById("edit-store-state").value = attributes[2];
            document.getElementById("edit-store-zip").value = attributes[3];

            break;
        }
    }
}

function updateRow(data, storeID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("store-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == storeID) {
            selection = table.rows[i]
            selection.cells[1].innerHTML = parsedData[0].store_address;
            selection.cells[2].innerHTML = parsedData[0].store_city;
            selection.cells[3].innerHTML = parsedData[0].store_state;
            selection.cells[4].innerHTML = parsedData[0].store_zip;
            break;
        }
    }
    location.reload()

};
