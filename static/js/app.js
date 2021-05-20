// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. The updateFilters() function will replace 
// your handleClick() function and update the filters variable you created in Step 1 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // initializes array to store value and id
    let elementChanged = d3.select(this);
    
    // 4b. Save the value that was changed as a variable.
    let valueChanged = elementChanged.property("value");
    console.log(valueChanged)

    // 4c. Save the id of the filter that was changed as a variable.
    let filterIdChanged = elementChanged.attr("id");
    console.log(filterIdChanged);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if(valueChanged){
      filters[filterIdChanged] = valueChanged;
    }
    else {
      delete filters[filterIdChanged];
    }
     
    // 6. Call function to apply all filters and rebuild the table
    filterTable(updateFilters);
  
  }
  
  // 7. Use this function to filter the table when data is entered. The filterTable() function will filter the table data 
  // by the value that is entered for the "id" that has changed.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values; if use "foreach" works only with arrays
    // filter on ID for filtertable and if statements
    // data.forEach((filterTable) => {
      //let row = tbody.append("tr");
      //Object.values(filterTable).forEach(([id, value]) => {
        //let cell = row.append("td");
        //cell.text(value);
        //}
      //);
    //});

    for (const [key, value] of Object.entries(filters)) {
      console.log(key, value);
      if (key) {
        filteredData = filteredData.filter(row => row[key] === value);
      };
    };
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  };
  
  // 2. Attach an event to listen for changes to each filter
  // Event listener will detect which input elements have changed on the html page and when they've changed 
  //it will call the funciton updateFilters
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);

 