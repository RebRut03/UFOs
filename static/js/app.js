// import data from data.js
const tableData = data;

// Reference the HTML table using d3 & tell JS to look for 
// <tbody> in HTML
var tbody = d3.select("tbody");

// Functions are named after what they do. We're building a table,
// so we'll name the function "buildTable." We'll also pass in 
// "data" as the argument. Remember that we used the variable
// "data" earlier to import our array of UFO sightings? 
function buildTable(data) {
   // Clearing existing data is important because we’ll be 
   // appending data from the array in the following code. 
   // Without clearing it, the users will end up with 
   // pre-filtered data. tbody.html("");—tells JavaScript to 
   // use an empty string when creating the table; 
   // in other words, create a blank canvas. 
   tbody.html("");

    // Add a forEach function that loops through our data array, 
    // and then adds rows of data to the table
    data.forEach((dataRow) => {
        // Find the <tbody> tag within the HTML and 
        // add a table row ("tr").
        let row = tbody.append("tr");
        // loop through each field in the dataRow argument 
        // & put each sighting on its own row
        // val reps each item in object, ex location, shape, duration
        Object.values(dataRow).forEach((val) => {
            // create a variable to append data to a table
            let cell = row.append("td");
            // extracting only the text of the value
            cell.text(val);
            }
        );
    });
}

// Add second function to our code that will focus on filtering the table we just built by date
// d3.select("#datetime"); we're telling D3 to look for where #datetime id is stored in the HTML tags
// .property("value"); grab that information and hold it in the "date" variable
function handleClick() {
    let date = d3.select("#datetime").property("value");
    // set a default filter and save it to a new variable. Our default filter will actually be 
    // the original table data because we want users to refine their search on their own terms.
    let filteredData = tableData;
    // pseudocode practice
    // if (a date is entered) {
    // Filter the default data to show only the date entered };
    if (date) {
        // Show only the rows where the date is equal to the date filter we created above
        // === test for strict equality, the date in the table has to match filter exactly
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);