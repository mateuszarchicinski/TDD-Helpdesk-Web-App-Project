//NODE MODULES
const express = require('express');


// LOCAL MODULES
const Route = require('../models/route');
const RoutesArray = require('../models/routesArray');


// Helpers - Function: routesInjector( { appObj: APP OBJECT, routeObj/routesArr: Object {method: 'get,post,put...', url: '/', controller: require('../controllers/mainController')} ||&& Array [{}, {}] } )
module.exports = (appObj, routeObj, routesArr, ...args) => {
    if (arguments.length === 0) {
        return false;
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        args = arguments[0];

        if (!args.appObj instanceof express || (!args.routeObj instanceof Route && !args.routesArr instanceof RoutesArray)) {
            return false;
        }

        appObj = args.appObj;
        routeObj = args.routeObj;
        routesArr = args.routesArr;
    } else {
        if (!appObj instanceof express || (!routeObj instanceof Route && !routeObj instanceof RoutesArray && !routesArr instanceof RoutesArray && !routesArr instanceof Route)) {
            return false;
        }
        console.log(typeof routesArr);
        console.log(typeof routeObj);
        
        routeObj = typeof routesArr === 'object' ? routesArr : routeObj;
        routesArr = typeof routeObj === 'array' ? routeObj : routesArr;
    }

    routesArr = routesArr || [];
    if (!routeObj instanceof Route) {
        routesArr.unshift(routeObj);
    }

    routesArr.forEach((elem) => {
        appObj[elem.method](elem.url, elem.controller);
    });

    return true;

};
