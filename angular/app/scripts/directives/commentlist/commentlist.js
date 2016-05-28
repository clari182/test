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

app.controller('TimeController', ['$scope', function($scope){
  $scope.calculateTimeLapse = function(value) {
    var currentDate = new Date();
    var commentDate = new Date(value);  

    var diff = Math.round((currentDate - commentDate) / 1000);
    var returnstr = '';

    switch(true){
      case (diff < 59):
        returnstr = '1 minute ago';
        break;

      case (diff >= 59 && diff < 3540):
        diff = diff / 60;
        returnstr = diff + ' minutes ago';
        break;

      case (diff >= 3540 && diff < 86400):
        diff = diff / 3600;
        returnstr = diff + ' hours ago';
        break;

      case (diff == '31660026'):
        alert('HOLA');
        break;
      
    }
    if (diff / 1000 < 59) {
      
    } 

    return returnstr;

  }
}]);