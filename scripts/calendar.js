$(document).ready(function(){

	/*createCalendar(2016, 1, "prev");
	createCalendar(2016, 2);
	createCalendar(2016, 3, "next");*/

	/*$(".js-calendar").append();*/



	showCalendar(createCalendar(2016, 4));

	function showCalendar (obj) {

		for (key in obj) {
			var monnth = obj[key];
			$(".js-calendar").append(obj[key]);
		}

	}

	function createCalendar (year, month, size) {
		size = size || 3;
		month = month - 2;
		var calendar = [];
		var date = new Date(year, month)
		

		for (var i = 0; i < size; i++) {
			
			calendar.push(createMonth (year, date.getMonth(date.setMonth(month+i)), i));
			
		}
		
		return calendar;
	}
	
	function createMonth (year, month, classCSS) {

		const DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
		var currentDate,
			transmittedData,
			table;

		currentDate = new Date;
		
		transmittedData = new Date(year,month);

		if ( !table ) {
			table = "<table class='" + classCSS + "'><tr>";
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
			
			if ( ((currentDate.getMonth()) == month) && ((currentDate.getFullYear() == year) && (transmittedData.getDate() == currentDate.getDate()) )) {
				table += "<td class='current-date'>" + transmittedData.getDate() + "</td>";
				
			}else{
				table += "<td>" + transmittedData.getDate() + "</td>";
			}

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

		return table;

	}
});