$(document).ready(function(){


	var calendar = InsertCalendar;
	var i = {
				year: 	2016,
				month: 	3,
				id: 	".js-calendar"
			};

	calendar(i);



	function InsertCalendar (obj) {

		var currentDate = 	new Date;
		year = 				obj.year  || currentDate.getFullYear();
		month = 			obj.month || currentDate.getMonth();
		size = 				obj.size  || 3;
		id = 				obj.id;


		showCalendar(createCalendar(year, month, size), id);


		function showCalendar (obj,id) {

			for (key in obj) {
				var monnth = obj[key];
				$(id).append(obj[key]);
			}

		}

		function createCalendar (year, month, size) {
			
			month = month - 2;
			var calendar = [];
			var date = new Date(year, month)
			

			for (var i = 0; i < size; i++) {
				
				calendar.push(createMonth (year, date.getMonth(date.setMonth(month+i)), date.getMonth()+1));
				
			}
			
			return calendar;
		}
		
		function createMonth (year, month, classCSS) {

			const DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
			var transmittedData,
				table;

			
			
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

		return (function() {
			var workItem,
				actObj,
				options,
				form;

			var options = {
							  year: 'numeric',
							  month: 'long',
							  day: 'numeric',
							  weekday: 'long',
							};

			workItem = $(id);

			form = 	'<div><input class="js-new-task form-control" type="text">' + 
					'<button class="add btn btn-default">Добавить</button></div>';


			workItem.append(form)

			workItem.on("click", "td", function(){
				var actObj = $(this);
				
				if ( actObj.text() ) {
					month = actObj.parents("table").attr("class");
					year = year;
					day = actObj.text();
					actDate = new Date (year, month - 1, day);
					console.log(actDate.toLocaleString("ru", options))
				}
			})
		})()
	}
});