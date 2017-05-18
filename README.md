
# dashboard-js
Script for creating tables and dashboards.
Using session storage for saving data.

<h3>Options:<h3>
	<table>
		<tr>
			<td>selector</td>
			<td>string</td>
			<td>//Using for session storage name, needed if you using more then 1 dashboard/table on you site<br>
				//Default "one_";<br>
				//NOTE: if dont add this option then latest init would rewrite all previos data in session storage</td>
		</tr>
		<tr>

			<td>search   </td>
			<td>true/false </td>
			<td>//search block def: 'false'</td>
		</tr>
		<tr><td>searchAppend</td> -
			<td>Jquery element</td>
			<td>//parent block to append search *</td></tr>
		<tr>
			<td>searchClass</td>  -
			<td>string</td>
			<td>//class for search block<br>
				//def: ''</td></tr>
		<tr>
			<td>checkbox</td> -
			<td>true/false</td>
			<td>//enable select rows and adding checkboxes to them def:false</td></tr>
		<tr>
			<td>pagination</td> -
			<td>true/false</td>
			<td>//enable pagination def:false</td></tr>
		<tr>
			<td>paginationAppend</td> -
			<td>Jquery element</td>
			<td>//parent block to append pagination*</td></tr>
		<tr>
			<td>paginationClass</td>  -
			<td>string</td>
			<td>//class for search block def:'';</td></tr>
		<tr>
			<td>itemsPerPage</td> -
			<td>number</td>
			<td>//number of rows at 1page def:10;</td></tr>
		<tr>
			<td>showPagItems</td> -
			<td>number</td>
			<td>//number of page buttons in pagination before use input to put page def:5</td></tr>
		<tr>
			<td>options</td> -
			<td>true/false</td>
			<td>//add button with list of column that u can add or remove dynamicly def:false</td></tr>
		<tr>
			<td>optionsAppend</td> -
			<td>Jquery element</td>
			<td>//parent block to append options button*</td></tr>
		<tr>
			<td>optionsClass</td> -
			<td>string</td>
			<td>//class for options block</td></tr>
		<tr>
			<td>calculate</td> -
			<td>true/false</td>
			<td>//if u need to calculate of some columns value (avaible only for with "checkbox" option)</td>
				</tr>
		<tr>
			<td>calcData</td> -
			<td>Objec with this params:</td></tr>
		<tr>
			<td>container</td> -
			<td>Jqery elemnt</td>
			<td>//block where append summ</td></tr>
		<tr>
			<td>columnName</td> -
			<td>string</td>
			<td>//name of JSON column amount of what needed to calculate</td></tr>
	</table>
