/* eslint no-unused-vars: 0 */


'use strict';


/**
 * @namespace angular_module
 * @class angular_module.Module:app
 * @memberOf angular_module
 * @description This is an AngularJS module component, can be defined in JavaScript source file then should be setup as a value of attribute ng-app
 * @example
 * angular.module('app');
 * @example
 * <html ng-app="app"></html>
 */


var app = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'angular-md5', 'ncy-angular-breadcrumb']);
