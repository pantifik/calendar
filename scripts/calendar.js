'use strict';
$(document).ready(function(){


    var calendar = new InsertCalendar(2016, 3, ".js-calendar");
    
    calendar.insert();



    function InsertCalendar (year, month, id, size) {

            var SELF = this;
            this.currentDate =      new Date;
            this.year =             year  || this.currentDate.getFullYear();
            this.month =            month || this.currentDate.getMonth();
            this.size =             size  || 3;
            this.id =               id;
        
        this.insert = function() {

            showCalendar(createCalendar(this.year, this.month, this.size), this.id);
            taskManager();

        };

        this.set = function(year, month, id, size) {

            this.year =             year;
            this.month =            month;
            //this.size =           size;  до лучших времен
            this.id =               id;

        };

        function showCalendar (obj,id) {

            for (var key in obj) {
                var month = obj[key];
                $(id).append(obj[key]);
            }

        };

        function createCalendar (year, month, size) {
            // size кол-во генерируемых месяцев, возможно когда нибудь заработает генерация больше 3х месяцев
            month =         month - 2; //****magic**** month получаем в человеческой форме, -1 делаем его нечеловеческим, -1 начинаем с предыдущего месяца
            var calendar =  [];
            var date =      new Date(year, month)
            

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
            //разобраться с классами при создании 2го экземпляра календаря class = this.id + "-className" || use id
            var workItem,
                actObj,
                options,
                form,
                onFocusInput,
                taskArray;

            var options =   {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              weekday: 'long',
                            };

            workItem    =   $(SELF.id);

            form        =   '<div><input class="first-day" type="text"><br><input class="js-new-task form-control" type="text"><br>' + 
                            '<input class="last-day" type="text"><button class="add btn btn-default">Добавить</button></div>';


            workItem.append(form);
            workItem.append('<ul class="tasks"></ul>');

            if (localStorage.taskArray) {
                
                try {
                    taskArray = JSON.parse(localStorage.taskArray);
                    for (var i = 0; taskArray.length > i; i++) {
                    showTask(taskArray[i].value, taskArray[i].attribute);
                    }
                }catch(e) {
                    
                    taskArray = [];
                }

            }else{

                taskArray = [];

            };

            workItem.on("focus", "input", function(){
                
                onFocusInput = this;
                workItem.on("click", "td", function(){
                    var actObj = $(this);


                    if ( actObj.text() ) {
                        var month = actObj.parents("table").attr("class"),
                            year = SELF.year,
                            day = actObj.text(),
                            actDate = new Date (year, month - 1, day);
                        console.log(actDate.toLocaleString("ru", options))
                        console.log(onFocusInput)
                        $(onFocusInput).val(actDate.toLocaleString("ru", options));
                    }
                });
            
            });

            workItem.on("click", "button", function(){
                
                if ( $(this).hasClass("add") ) {
                  return  saveTask(clickAddButton());
                }

                if ( $(this).hasClass("completed") ) {
                  return saveTask(clickCompletedButton(this));
                }

                if ( $(this).hasClass("del") ) {
                  return saveTask(clickDelButton(this));
                }

                console.log("fail")

            });

            function supportsStorage() {

                try {
                  return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                  return false;
                }
                
            };

            function saveTask(arr) {

                if ( !supportsStorage() ) {
                return false;
                }
                if (!arr.length) {
                    return delete localStorage.taskArray;
                }
                localStorage.taskArray = JSON.stringify(arr);

            };

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
                showTask(valueArr.value);

                return taskArray;
            };


            function showTask(value, attr){
         
                var a;
                if (attr) {
                  a = "<li class=\"" + attr + "\">" + value + "<br><div class=\"btn-group\"><button class=\"completed btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-ok\"></span> Выполнено</button><button class=\"del btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-remove\"></span> Удалить</button></div></li>";
                }else{
                    a = "<li>" + value + "<br><div class=\"btn-group\"><button class=\"completed btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-ok\"></span> Выполнено</button><button class=\"del btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-remove\"></span> Удалить</button></div></li>";
                }
                return $(".tasks").append(a);
         
            };

            function clickCompletedButton(param){

                $(param).parents("li").addClass("completed-task");
                var taskNumber = $(param).parents("li").index();
                taskArray[taskNumber].attribute = "completed-task";
                return taskArray;
         
            };
         
            function clickDelButton(param){
                
                taskArray.splice($(param).parents("li").index(), 1);
                $(param).parents("li").remove();
                return taskArray;
            
            };

        };
    };
});