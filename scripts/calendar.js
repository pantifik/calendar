'use strict'
$(document).ready(function(){


	var calendar = InsertCalendar;
	var i = {
				year: 	2016,
				month: 	7,
				id: 	".js-calendar"
			};

	calendar(i);



	function InsertCalendar (obj) {

		var currentDate = 		new Date,
			year = 				obj.year  || currentDate.getFullYear(),
			month = 			obj.month || currentDate.getMonth(),
			size = 				obj.size  || 3,
			id = 				obj.id;


		showCalendar(createCalendar(year, month, size), id);


		function showCalendar (obj,id) {

			for (var key in obj) {
				var month = obj[key];
				$(id).append(obj[key]);
			}

		}

		function createCalendar (year, month, size) {
			
			month = month - 2;
			var calendar = [];
			var date = new Date(year, month)
			

			for (var i = 0; i < size; i++) {
				
				calendar.push(createMonth (year, date.getMonth(date.setMonth(month+i)), month+i));
				
			}
			
			return calendar;
		}
		
		function createMonth (year, month, classCSS) {

			var DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
			var transmittedData,
				table;

			
			transmittedData = new Date(year,month);

			table = "<table class='" + classCSS + "'><tr>";
			for (let i = 0; i < 7; i++) {
				table += "<th>" + DAY[i] + "</th>";
			}

			//table += "</tr><tr>";

			//заполняем начало месяца пустыми <td>, если getDay != 0
			if ( getDay(transmittedData) != 0 ) {
				table += "</tr><tr>";
				for (let i = 0; i < getDay(transmittedData); i++) {
					table += "<td></td>";
				}
			}

			while (month == transmittedData.getMonth()) {
				
				if ( (getDay(transmittedData) == 0 ) ) {
					table += "</tr><tr>"
				}

				if ( ((currentDate.getMonth()) == month) && ((currentDate.getFullYear() == year) && (transmittedData.getDate() == currentDate.getDate()) )) {
					table += "<td class='current-date'>" + transmittedData.getDate() + "</td>";
					
				}else{
					table += "<td>" + transmittedData.getDate() + "</td>";
				}

				transmittedData.setDate( transmittedData.getDate() + 1 );
			}

			transmittedData.setDate( transmittedData.getDate() - 1 );
			if ( getDay(transmittedData) != 6 ) {
				for (let i = 6; i > getDay(transmittedData); i--) {
					table += "<td></td>";
				}
			}

			table += "</table>"

			function getDay(date) {
				var day = date.getDay();
				if (day == 0) {
					day = 7;
				}
				return day - 1;
			}

			return table;

		}
	}
});