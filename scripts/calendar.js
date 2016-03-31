'use strict';
$(document).ready(function(){

        function Month(){

    };

    Month.prototype.date = new Date();

    Month.prototype.createHeader = function() {

        var DAY = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
        var header;


        header = '<table class="header-month"><tr>';

        for (var i = 0; i < 7; i++) {
            header += "<th>" + DAY[i] + "</th>";
        };
        header += '</tr></table>';
        console.log(header)
        return header;

    };

    Month.prototype.createMonth = function(date) {
        var self = this;
        date = date || (function(){
                           var resetDate = new Date();           
                           resetDate.setDate(1);
                           return resetDate;
                        })();

        var year = date.getFullYear(),
            month = date.getMonth(),
            transmittedData = date,
            table;



        table = '<table class="body-month" style="min-width: 150px;">'
        //заполняем начало месяца пустыми <td>, если getDay != 0
        if ( getDay(transmittedData) != 0 ) {
            table += "<tr>";
            for ( i = 0; i < getDay(transmittedData); i++) {
                table += "<td></td>";
            }
        };
        
        while (month == transmittedData.getMonth()) {
            
            if ( (getDay(transmittedData) == 0 ) ) {
                table += "</tr><tr>"
            }

            if ( ((this.date.getMonth()) == month) && ((this.date.getFullYear() == year) && (transmittedData.getDate() == this.date.getDate()) )) {
                table += "<td class='current-date'>" + transmittedData.getDate() + "</td>";
                
            }else{
                table += "<td>" + transmittedData.getDate() + "</td>";
            }

            transmittedData.setDate( transmittedData.getDate() + 1 );
        };

        transmittedData.setDate( transmittedData.getDate() - 1 );
        if ( getDay(transmittedData) != 6 ) {
            for (var i = 6; i > getDay(transmittedData); i--) {
                table += "<td></td>";
            }
        };

        table += "</table>";

        function getDay(date) {
            var day = date.getDay();
            if (day == 0) {
                day = 7;
            }
            return day - 1;
        };

        return table;
    
    };

    function Calendar () {
        this.date = new Date();

    };

    Calendar.prototype = Object.create(Month.prototype);
    Calendar.prototype.constructor = Calendar;

    Calendar.prototype.monthNav = function() {

        var self = this;

        var prevButton = '<button class="prev-button"><</button>',

            nextButton = '<button class="next-button">></button>',

            selectMonth = function() {

                var MONTH = [
                                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 
                                    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                                ];

                var selectHtml = '<select size=1>';

                var curentMonth = self.date.getMonth();

                for ( var i = 0; i < 12; i++ ) {

                    if ( i == curentMonth ) { 
                        selectHtml += '<option selected="' + MONTH[i] + '">' + MONTH[i] + '</option>';
                        continue;
                    };

                    selectHtml += '<option value="' + MONTH[i] + '">' + MONTH[i] + '</option>';

                };

                selectHtml += '</select>';


                return selectHtml;
            };

        var nav = prevButton + selectMonth() + nextButton;

        return nav;

    };

    Calendar.prototype.insertNav = function() {

        $('.header-month').prepend('<caption style="min-width: 150px;">' + this.monthNav() + '</caption>');
       
    };

    Calendar.prototype.addListener = function(selector) {
        
        var self = this;
        $(selector).on('click', 'button', function() {
            
            var attr = $(this).attr('class');
            
            if (attr == 'prev-button') {
                return console.log('prev');
            };

            if (attr == 'next-button') {
                return console.log('next');
            };

            return false;

        });

    };

    var month = new Calendar();
    var testDate = new Date(2016,1)
    $('.js-calendar').append(month.createHeader());
    $('.js-calendar').append(month.createMonth());
    month.insertNav();
    month.addListener('table');
});