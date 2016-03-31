'use strict';
$(document).ready(function(){

    function CreateNav () {
        this.date = new Date();
    }

    CreateNav.prototype.prevButton = function() {

        return '<button class="prevButton"><</button>';

    };

    CreateNav.prototype.nextButton = function() {

        return '<button class="nextButton">></button>';

    };

    CreateNav.prototype.selectMonth = function() {

        var monthList = [
                            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 
                            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                        ];

        var selectHtml = '<select size=1>';

        var curentMonth = this.date.getMonth();

        for ( var i = 0; i < 12; i++ ) {

            if ( i == curentMonth ) { 
                selectHtml += '<option selected="' + monthList[i] + '">' + monthList[i] + '</option>';
                continue;
            };

            selectHtml += '<option value="' + monthList[i] + '">' + monthList[i] + '</option>';

        };

        selectHtml += '</select>';


        return selectHtml;

    };

    CreateNav.prototype.monthNav = function() {

        var nav = this.prevButton() + this.selectMonth() + this.nextButton();

        return nav;

    };

    function Calendar (year, month, id, size) {

            var self = this;
            this.year =             year;
            this.month =            month;
            this.size =             size  || 1;
            this.id =               id;
        

        this.getCalendarHTML = function () {
            // size кол-во генерируемых месяцев, возможно когда нибудь заработает генерация больше 3х месяцев
            var month =         self.month - 2; //****magic**** month получаем в человеческой форме, -1 делаем его нечеловеческим, -1 начинаем с предыдущего месяца

            var calendar =  [];
            var date =      new Date(year, month);
            
            console.log(date.getMonth());
            for (var i = 0; i < self.size; i++) {
                date.setMonth(month+i);
                calendar.push( this.createMonth( date ) );
                
            };
            
            return calendar;

        };
        

        function taskManager() {
            
            var workItem,
                actObj,
                options,
                form,
                onFocusInput,
                parentClass,
                taskArray,
                actDate = new Date();

            var options =   {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              weekday: 'long',
                            };

            workItem    =   $(self.id);
            parentClass = self.id.slice(1);
            
            form        =   '<div><input class="' + parentClass + '-new-task form-control" type="text"><br>' + 
                            '<button class="add btn btn-default">Добавить</button></div>';


            workItem.append(form);
            workItem.append('<ul class="' + parentClass + 'tasks"></ul>');

            if (localStorage[parentClass]) {

                try {
                    taskArray = JSON.parse(localStorage[parentClass]);
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
                
            
            });

            workItem.on("click", "td", function(){
                var actObj = $(this);

                if ( actObj.text() ) {
                    var month = actObj.parents("table").attr("class"),
                        year = self.year,
                        day = actObj.text();
                    actDate = new Date(year, month - 1, day);
                    $(onFocusInput).val(actDate.toLocaleString("ru", options));
                }
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

                return 'localStorage' in window && window['localStorage'] !== null;
                                
            };

            function saveTask(arr) {
                
                if ( !supportsStorage() ) {
                return false;
                }
                if (!arr.length) {
                    return localStorage.removeItem(parentClass);
                }
                
                localStorage[parentClass] = JSON.stringify(arr);

            };

            function clickAddButton(){
                
                var task = $(self.id + "-new-task").val();
                if ( !task ){
                    return taskArray;
                }
         
                var valueArr = {
                                date: actDate,
                                value: task,
                                attribute: "new"
                            };
                $(self.id + "-new-task").val(null);
                taskArray.push(valueArr);
                showTask(valueArr.value, valueArr.attribute, valueArr.date);

                return taskArray;
            };


            function showTask(value, attr, date){
         
                  var a = "<li class=\"" + attr + "\"><span>" + date.toLocaleString("ru", options) + "</span>" + value + "<br>" + 
                  "<div class=\"btn-group\"><button class=\"completed btn btn-default btn-xs\">" + 
                  "<span class=\"glyphicon glyphicon-ok\"></span> Выполнено</button>" + 
                  "<button class=\"del btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-remove\">" + 
                  "</span> Удалить</button></div></li>";
                
                return $(self.id + "tasks").append(a);
         
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

  /*  Calendar.prototype = {
                            constructor: Calendar(),
                            currentDate: new Date,
                            month: currentDate.getMonth(),
                            year: currentDate.getMonth()
                        };*/

    Calendar.prototype = Object.create(CreateNav.prototype);
    Calendar.prototype.constructor = Calendar;
    Calendar.prototype.currentDate = new Date;
    Calendar.prototype.month = function(){
        return this.currentDate.getMonth()
    };

    Calendar.prototype.set = function(year, month, id, size) {

            this.year =             year;
            this.month =            month;
            //this.size =           size;  до лучших времен
            this.id =               id;

    };

    Calendar.prototype.show = function () {

            var obj = this.getCalendarHTML();
            
            for (var key in obj) {
                var month = obj[key];
                $(this.id).append(obj[key]);
            };

    };

    Calendar.prototype.createMonth = function (date) {

                var DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
                var transmittedData = date,
                    year = date.getFullYear(),
                    month = date.getMonth(),
                    table;

                console.log(month);
                table = "<table class='" + (month+1) + "'><caption>" + this.monthNav() + "</caption><tr>";
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

                    if ( ((this.currentDate.getMonth()) == month) && ((this.currentDate.getFullYear() == year) && (transmittedData.getDate() == this.currentDate.getDate()) )) {
                        table += "<td class='current-date'>" + transmittedData.getDate() + "</td>";
                        
                    }else{
                        table += "<td>" + transmittedData.getDate() + "</td>";
                    }

                    transmittedData.setDate( transmittedData.getDate() + 1 );
                }

                transmittedData.setDate( transmittedData.getDate() - 1 );
                if ( getDay(transmittedData) != 6 ) {
                    for (var i = 6; i > getDay(transmittedData); i--) {
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

    };

    

    var calendar = new Calendar(2016, 12, ".js-calendar");
    calendar.show();

    /*calendar.set(2016, 3, ".js-calendar2");
    calendar.show();
*/
});