$(document).ready(function(){

	createCalendar(2016, 3)
	
	function createCalendar (year, month) {

		const DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
		var currentDate,
			transmittedData,
			table;

		currentDate = new Date;
		month = month - 1;
		transmittedData = new Date(year,month);

		

		
		if ( !table ) {
			table = "<table><tr>";
			for (let i = 0; i < 7; i++) {
				table += "<th>" + DAY[i] + "</th>";
			}
			table += "</tr>";
		}

		//заполняем начало месяца пустыми <td>, если getDay != 0
		if ( getDay(transmittedData) != 0 ) {
			for (let i = 0; i < getDay(transmittedData); i++) {
				table += "<td></td>";
			}
		}

		while (month == transmittedData.getMonth()) {
			
			table += "<td>" + transmittedData.getDate() + "</td>";
			if (getDay(transmittedData) == 6 ) {
				table += "</tr><tr>"
			}
			transmittedData.setDate( transmittedData.getDate() + 1 );
		}

		transmittedData.setDate( transmittedData.getDate() - 1 );
		if ( getDay(transmittedData) != 6 ) {
			for (let i = 6; i > getDay(transmittedData); i--) {
				table += "<td></td>";
			}
		}



		function getDay(date) {
			var day = date.getDay();
			if (day == 0) {
				day = 7;
			}
			return day - 1;
		}

		$(".js-calendar").append(table);

		if ( ((currentDate.getMonth()) == month) && (currentDate.getFullYear() == year )) {
			var filtr = "td:contains(" + currentDate.getDate() + ")";
			console.log($(filtr));
		}
	}
});