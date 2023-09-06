//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteStore(storeID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: storeID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-store", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(storeID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(storeID) {
    let table = document.getElementById("store-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == storeID) {
            table.deleteRow(i);
            break;
        }
    }
}
