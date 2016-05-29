'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentList
 * @description
 * # commentList
 */
var app = angular.module('commentList', ['comment'])
  .directive('commentList', function () {
    return {
      template: '<div class="commentList">' +
                  '<comment-model ng-repeat="comment in comments" author="{{comment.author}}">' +
                    '{{comment.msg}}' +
                    ' <div ng-controller="TimeController"> <div ng-model="timeLapse">{{calculateTimeLapse(comment.date)}} </div></div>' +
                  '</comment-model>' +
                  '<span ng-if="comments.length < 1">No comments yet</span>' +
                '</div>',
      restrict: 'E',
      scope: {
        comments: '='
      },
      link: function postLink(scope, element, attrs) {}
    };
  });

app.constant('ENUMS',
    {
        TimeText: { MINUTE: '1 minute', MINUTES: ' minutes', HOUR: ' hour', HOURS: ' hours', DAY: ' day', DAYS: ' days' },
        TimeStatus: {AGO: ' ago'},
        TimeValues: { MINUTES: 120, HOURS: 3540, DAYS: 86400 }
    });

app.controller('TimeController', ['$scope', 'ENUMS', function($scope, enums){
  $scope.calculateTimeLapse = function(value) {

    if (!value) return '';

    var currentDate = new Date();
    var commentDate = new Date(value);  

    var diff = Math.round((currentDate - commentDate) / 1000);
    var returnstr = '';

    switch(true){
      case (diff < enums.TimeValues.MINUTES):
        returnstr = enums.TimeText.MINUTE + enums.TimeStatus.AGO;
        break;

      case (diff >= enums.TimeValues.MINUTES && diff < enums.TimeValues.HOURS):
        diff = Math.floor(diff / 60);
        returnstr = diff + enums.TimeText.MINUTES + enums.TimeStatus.AGO;
        break;

      case (diff >= enums.TimeValues.HOURS && diff < enums.TimeValues.DAYS):
        diff = Math.floor(diff / 3600);
        returnstr = diff + (diff < 2 ? enums.TimeText.HOUR : enums.TimeText.HOURS) + enums.TimeStatus.AGO;
        break;

      case (diff >= enums.TimeValues.DAYS):
        diff = Math.floor(diff / enums.TimeValues.DAYS);
        returnstr = diff + (diff < 2 ? enums.TimeText.DAY : enums.TimeText.DAYS) + enums.TimeStatus.AGO;
        break;
      
    }

    return returnstr;

  }
}]);