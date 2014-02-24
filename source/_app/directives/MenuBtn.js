// NOTE: this should be a generic menu btn for different menus with different btn icons
'use strict';

angular.module('app.directives')
  .directive('menuBtn', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '_app/views/templates/menu-btn.ngt',
      link: function(scope, element, attr) {
        element.on('click', function() {
          // HMMMMMM......  not very flexible
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
        })
      }
    }
  })