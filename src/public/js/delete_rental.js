//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteRental(rentalID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: rentalID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-rental", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(rentalID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(rentalID) {
    let table = document.getElementById("rental-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == rentalID) {
            table.deleteRow(i);
            break;
        }
    }
}
