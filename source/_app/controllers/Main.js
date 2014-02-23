'use strict';

angular.module('app')
  .controller('MainCtrl', function ($rootScope, $scope, $q, Companies) {
    Companies.then(function (data) {
      console.log('MainCtrl got the json from factory', data);
      $scope.companies = data;
    });

    // not ze angular way?
    $scope.toggleMenu = function() {
      var menu = angular.element(document.querySelector('.menu')),
          main = angular.element(document.querySelector('.main')),
          menuToggleBtnIcon = angular.element(document.querySelector('.menu-toggle i'));

      if (menu.hasClass('menu-minimized')) {
        menu.removeClass('menu-minimized');
        main.removeClass('menu-minimized');
        menuToggleBtnIcon
          .removeClass(menuToggleBtnIcon.attr('data-class-maximize'))
          .addClass(menuToggleBtnIcon.attr('data-class-minimize')); // .data isnt working ffszdskjfkls
      } else {
        menu.addClass('menu-minimized')
        main.addClass('menu-minimized')
        menuToggleBtnIcon
          .removeClass(menuToggleBtnIcon.attr('data-class-minimize'))
          .addClass(menuToggleBtnIcon.attr('data-class-maximize')); // .data isnt working ffszdskjfkls
      }
    }

    // Globals
    //-------------------------------
    $rootScope.colors = {
      mainAccent: '#5DA3DF'
    }
  });