# dashboard-js
Script for creating tables and dashboards.
Using session storage for saving data. 

Options:

selector - string
//Using for session storage name, needed if you using more then 1 dashboard/table on you site
//Default "one_";
//NOTE: if dont add this option then latest init would rewrite all previos data in session storage

search   - true/false  //search block def: 'false'
searchAppend - Jquery element  //parent block to append search*
searchClass  - string  //class for search block def: ''
checkbox - true/false   //enable select rows and adding checkboxes to them  def:false
pagination - true/false  //enable pagination def:false
paginationAppend - Jquery element  //parent block to append pagination*  
paginationClass  - string  //class for search block  def:'';
itemsPerPage - number //number of rows at 1page def:10;
showPagItems - number //number of page buttons in pagination before use input to put page def:5
options - true/false //add button with list of column that u can add or remove dynamicly def:false
optionsAppend - Jquery element  //parent block to append options button*
optionsClass - string  //class for options block
calculate - true/false //if u need to calculate of some columns value (avaible only for with "checkbox" option)
calcData - Objec with this params:
      container - Jqery elemnt //block where append summ
      columnName - string //name of JSON column amount of what needed to calculate

 
