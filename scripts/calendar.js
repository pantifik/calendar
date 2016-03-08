'use strict';
$(document).ready(function(){


	var calendar = new InsertCalendar(2016, 3, ".js-calendar");
	
	calendar.insert();
	calendar.set(2016, 9, ".js-calendar2");
	console.log(calendar);
	calendar.insert();



	function InsertCalendar (year, month, id, size) {

			var SELF = this;
			this.currentDate = 		new Date;
			this.year = 			year  || this.currentDate.getFullYear();
			this.month = 			month || this.currentDate.getMonth();
			this.size = 			size  || 3;
			this.id = 				id;
		
		this.insert = function() {

			showCalendar(createCalendar(this.year, this.month, this.size), this.id);
			taskManager();

		};

		this.set = function(year, month, id, size) {

			this.year = 			year;
			this.month = 			month;
			//this.size = 			size;  до лучших времен
			this.id = 				id;

		};

		function showCalendar (obj,id) {

			for (var key in obj) {
				var month = obj[key];
				$(id).append(obj[key]);
			}

		};

		function createCalendar (year, month, size) {
			// size кол-во генерируемых месяцев, возможно когда нибудь заработает генерация больше 3х месяцев
			month = 		month - 2; //****magic**** month получаем в человеческой форме, -1 делаем его нечеловеческим, -1 начинаем с предыдущего месяца
			var calendar = 	[];
			var date = 		new Date(year, month)
			

			for (var i = 0; i < size; i++) {
				
				calendar.push( createMonth( year, date.getMonth( date.setMonth(month+i) ) ) );
				
			};
			
			return calendar;
		};
		
		function createMonth (year, month) {

			var DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
			var transmittedData,
				table;

			
			transmittedData = new Date(year,month);

			table = "<table class='" + (month+1) + "'><tr>";
			for (var i = 0; i < 7; i++) {
				table += "<th>" + DAY[i] + "</th>";
			}

			
			//заполняем начало месяца пустыми <td>, если getDay != 0
			if ( getDay(transmittedData) != 0 ) {
				table += "</tr><tr>";
				for ( i = 0; i < getDay(transmittedData); i++) {
					table += "<td></td>";
				}
			}

			while (month == transmittedData.getMonth()) {
				
				if ( (getDay(transmittedData) == 0 ) ) {
					table += "</tr><tr>"
				}

				if ( ((SELF.currentDate.getMonth()) == month) && ((SELF.currentDate.getFullYear() == year) && (transmittedData.getDate() == SELF.currentDate.getDate()) )) {
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

		function taskManager() {
			var workItem,
				actObj,
				options,
				form,
				taskArray = [];

			var options = 	{
							  year: 'numeric',
							  month: 'long',
							  day: 'numeric',
							  weekday: 'long',
							};

			workItem 	= 	$(SELF.id);

			form 		= 	'<div><input class="js-new-task form-control" type="text">' + 
							'<button class="add btn btn-default">Добавить</button></div>';


			workItem.append(form);

			workItem.on("click", "td", function(){
				var actObj = $(this);
				
				if ( actObj.text() ) {
					var month = actObj.parents("table").attr("class"),
						year = SELF.year,
						day = actObj.text(),
						actDate = new Date (year, month - 1, day);
					console.log(actDate.toLocaleString("ru", options))
				}
			});

			workItem.on("click", "button", function(){
				clickAddButton();
			});

			 	function clickAddButton(){
 
			 		var task = $(".js-new-task").val();
			 		if ( !task ){
			 			return;
			 		}
			 
			 		var valueArr = {
			 						value: task,
			 					    attribute: "new"
			 					};
			 		$(".js-new-task").val(null);
			 		taskArray.push(valueArr);
			 		//showTask(valueArr.value);

			    	return console.log(taskArray);
				}

		};
	}
});