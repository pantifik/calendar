$(document).ready(function(){
	
	const DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
	var table;

	if (!table) {
		table = "<table>";
	}

	for (var i = 0; i < 7; i++) {

		if ( i == 0 ) {
			table += "<tr>";
		} else if ( i == 7 ) {
			table += "</tr>";
		}

		table += "<th>" + DAY[i] + "</th>";
	}

	function getMonth (firstDay) {

		table += "<tr>";

		// если firstDay != 0 добавляем пустые ячейки до firstDay
		if ( firstDay != 0 ) {
			
			i = firstDay;

			for ( i = 1; i < firstDay ; i++ ){
				table += "<td></td>";
			}

		}


		for ( i = 1; i <= 31; i++ ) {

			if ( (firstDay % 7) == 0 ) {
				table += "<td>" + i + "</td></tr><tr>";
			} else { table += "<td>" + i + "</td>" }

			firstDay++;
		}

		return table;

	}

	getMonth(5);

	$( ".js-calendar" ).append( table );

});