// NOTE: this should be a generic menu btn for different menus with different btn icons
'use strict';

angular.module('app.directives')
  .directive('menuBtn', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '_app/views/templates/menu-btn.ngt',
      link: function(scope, element, attr) {
        // HMMMMMM......  not very flexible
        var menu = angular.element(document.querySelector('.menu')),
            main = angular.element(document.querySelector('.main')),
            menuToggleBtnIcon = angular.element(document.querySelector('.menu-btn i'));

        function closeMenu() {
          menu.removeClass('menu-maximized');
          main.removeClass('menu-maximized');
          // menuToggleBtnIcon
          //   .removeClass(menuToggleBtnIcon.attr('data-class-maximized'))
          //   .addClass(menuToggleBtnIcon.attr('data-class-minimized')); // .data isnt working ffszdskjfkls
        }

        function openMenu() {
          menu.addClass('menu-maximized')
          main.addClass('menu-maximized')
          // menuToggleBtnIcon
          //   .removeClass(menuToggleBtnIcon.attr('data-class-minimized'))
          //   .addClass(menuToggleBtnIcon.attr('data-class-maximized')); // .data isnt working ffszdskjfkls
        }

        function menuIsOpen() {
          return menu.hasClass('menu-maximized');
        }

        // function toggleMenu() {
        //   if (menuIsOpen()) {
        //     closeMenu();
        //   } else {
        //     openMenu();
        //   }
        // }

        // element.on('mouseenter', function() {
        //   toggleMenu();
        // });

        element.on('click', function() {
          if (!menuIsOpen()) openMenu();
        })

        main.on('mouseover', function(e) {
          if (menuIsOpen()) closeMenu();
        });
      }
    }
  })