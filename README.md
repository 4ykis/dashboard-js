# dashboard-js
Script for creating tables and dashboards.
Using session storage for saving data. 

Options:

selector - string
//Using for session storage name, needed if you using more then 1 dashboard/table on you site
//Default "one_";
//NOTE: if dont add this option then latest init would rewrite all previos data in session storage

search   - true/false  //search block def: 'false'<br>
searchAppend - Jquery element  //parent block to append search*<br>
searchClass  - string  //class for search block def: ''<br>
checkbox - true/false   //enable select rows and adding checkboxes to them  def:false<br>
pagination - true/false  //enable pagination def:false<br>
paginationAppend - Jquery element  //parent block to append pagination*  <br>
paginationClass  - string  //class for search block  def:'';<br>
itemsPerPage - number //number of rows at 1page def:10;<br>
showPagItems - number //number of page buttons in pagination before use input to put page def:5<br>
options - true/false //add button with list of column that u can add or remove dynamicly def:false<br>
optionsAppend - Jquery element  //parent block to append options button*<br>
optionsClass - string  //class for options block<br>
calculate - true/false //if u need to calculate of some columns value (avaible only for with "checkbox" option)<br>
calcData - Objec with this params:<br>
      container - Jqery elemnt //block where append summ <br>
      columnName - string //name of JSON column amount of what needed to calculate <br>

 
