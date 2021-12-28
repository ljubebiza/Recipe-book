//  Get  url of recipes from storage
var recipes = [];
chrome.storage.local.get({ list: [] }, (result) => {
  recipes = result.list;
});

// Listen for action to create table with storage content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === "get storage") {
    // Set starting value of i from which it wil start to print a table
    var i = setIterator(recipes);

    //Loop trough objects to extract propertes
    for (i; i < recipes.length; i++) {
      var table = document.getElementById("tableb");
      //  Add row to the table
      var row = table.insertRow(1);
      //Insert columns into row
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      // Populate first cell with picture
      cell1.innerHTML = "<img src='transparent3.png'>";
      // Create anchor tag and button to populate table cells
      var a_tag = document.createElement("a");
      var button = document.createElement("button");
      // Assign atribute to HTML element from object poperties
      a_tag.setAttribute("href", recipes[i].url);
      // Asign value to anchor tag
      a_tag.innerText = recipes[i].titles;
      // Assign value to button
      button.innerText = "X";
      // Assign atribute to button in this case id
      button.setAttribute("id", i);
      //Populate second cell and third one
      cell2.appendChild(a_tag);
      cell3.appendChild(button);
    }
  }

  document.getElementById("tableb").addEventListener("click", removeRow, false);
});
// Get the element from HTML to apply changes

//  Function which takes integer to delete row under this number
function deleteRow(row) {
  document.getElementById("tableb").deleteRow(row);
}
// Function that takes event and checks if event is from desired button
//if yes, go to parent element (tr/row) and remove it
function removeRow(eve) {
  if (
    eve.target.id &&
    eve.target.id != "title" &&
    eve.target.id != "next_to_title"
  ) {
    deleteRow(eve.target.parentNode.parentNode.rowIndex);
    let deleteItem = eve.target.id;
    item = Number(deleteItem);
    recipes.splice(item, 1);
    chrome.storage.local.set({ list: recipes });
  }
}
// count number of rows helper function
function rowCount() {
  var rowTotal = 0;
  var table = document.getElementById("tableb");
  var rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rowTotal++;
  }
  return rowTotal;
}

// Set value of iterator  for loop
function setIterator(array) {
  var i = 0;
  var rows = rowCount();
  if (rows < 6) {
    i = 0;
  } else if (rows - 5 < array.length) {
    i = array.length - 1;
  } else {
    i = array.length;
  }
  return i;
}
