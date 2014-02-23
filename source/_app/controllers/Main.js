'use strict';

angular.module('app')
  .controller('MainCtrl', function ($rootScope, $scope, $q, Companies) {
    $rootScope.pageTitle = 'Summary'; // hmmm.....

    Companies.then(function (data) {
      console.log('MainCtrl got the json from factory', data);
      $scope.companies = data;
    });

    // not ze angular way?
    $scope.toggleMenu = function() {
      console.log('var');
      var menu = angular.element(document.querySelector('.menu')),
          main = angular.element(document.querySelector('.main')),
          menuToggleBtnIcon = angular.element(document.querySelector('.menu-btn i'));

      if (menu.hasClass('menu-maximized')) {
        menu.removeClass('menu-maximized');
        main.removeClass('menu-maximized');
        menuToggleBtnIcon
          .removeClass(menuToggleBtnIcon.attr('data-class-maximized'))
          .addClass(menuToggleBtnIcon.attr('data-class-minimized')); // .data isnt working ffszdskjfkls
      } else {
        menu.addClass('menu-maximized')
        main.addClass('menu-maximized')
        menuToggleBtnIcon
          .removeClass(menuToggleBtnIcon.attr('data-class-minimized'))
          .addClass(menuToggleBtnIcon.attr('data-class-maximized')); // .data isnt working ffszdskjfkls
      }
    }

    // Globals
    //-------------------------------
    $rootScope.colors = {
      mainAccent: '#5DA3DF'
    }
  });