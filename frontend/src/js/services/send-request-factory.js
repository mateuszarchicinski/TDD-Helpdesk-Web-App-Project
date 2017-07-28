/**
 * @class angular_module.Module:app.Factory:sendRequest
 * @description This is an AngularJS factory component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS factory component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').factory('sendRequest', [function () {
 *  // Here is place for factory logic
 * }]);
 */


app.factory('sendRequest', ['APP_CONFIG', '$q', 'md5', '$http', function (APP_CONFIG, $q, md5, $http) {
    var apiConfig = APP_CONFIG.apiConfig,
        baseUrl = apiConfig.baseUrl || '/';


    var configSendRequest = {
        requests: {
            register: {
                method: 'post',
                url: apiConfig.registerUrl || 'auth/register'
            },
            login: {
                method: 'post',
                url: apiConfig.loginUrl || 'auth/login'
            },
            facebook: {
                method: 'post',
                url: apiConfig.loginVia.facebookUrl || 'auth/facebook'
            },
            google: {
                method: 'post',
                url: apiConfig.loginVia.googleUrl || 'auth/google'
            },
            logout: {
                method: 'post',
                url: apiConfig.logoutUrl || 'auth/logout'
            },
            'user.read': {
                method: 'get',
                url: apiConfig.userUrl || 'auth/user',
                readBy: '_id'
            },
            'user.update': {
                method: 'put',
                url: apiConfig.userUrl || 'auth/user',
                updateBy: '_id'
            },
            'user.delete': {
                method: 'delete',
                url: apiConfig.userUrl || 'auth/user',
                deleteBy: '_id'
            },
            users: {
                method: 'get',
                url: apiConfig.usersUrl || 'auth/users'
            },
            'issue.read': {
                method: 'get',
                url: apiConfig.issueUrl || 'auth/issue',
                readBy: '_id'
            },
            'issue.create': {
                method: 'post',
                url: apiConfig.issueUrl || 'auth/issue'
            },
            'issue.delete': {
                method: 'delete',
                url: apiConfig.issueUrl || 'auth/issue',
                deleteBy: '_id'
            },
            issues: {
                method: 'get',
                url: apiConfig.issuesUrl || 'auth/issues',
                readBy: 'role'
            },
            'note.create': {
                method: 'post',
                url: apiConfig.noteUrl || 'auth/note'
            }
        }
    };


    /**
     * @function sendRequest
     * @memberOf angular_module.Module:app.Factory:sendRequest
     * @instance
     * @description This method is used for HTTP communication with application backend to create, read, update or delete any resource
     * @param {String} type Required param to pass name of request type
     * @param {Object} data Required param to pass data which will be send
     * @example
     * angular.module('app').controller('exampleCtrl', ['sendRequest', function (sendRequest){
     *  sendRequest('user.read');
     * }]);
     */


    function sendRequest(type, data) {
        return $q(function (resolve, reject) {
            var request = configSendRequest.requests[type],
                completedUrl;

            if (!request) {
                return reject(false);
            }

            completedUrl = baseUrl + request.url;

            if (!data) {
                data = null;
            }

            if (data !== null && typeof data === 'object' && data.password) {
                data.password = md5.createHash(data.password);

                if (data.confirmPassword) {
                    delete data.confirmPassword;
                }
            }

            if ((type.indexOf('.read') !== -1 || type.indexOf('.update') !== -1 || type.indexOf('.delete') !== -1 || type === 'issues') && data !== null && typeof data === 'object') {
                if (request.readBy) {
                    completedUrl += '/' + data[request.readBy];
                }

                if (request.deleteBy) {
                    completedUrl += '/' + data[request.deleteBy];
                }

                if (request.updateBy) {
                    completedUrl += '/' + data[request.updateBy];
                } else {
                    data = null;
                }
            }

            $http[request.method](completedUrl, data).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    }

    return sendRequest;
}]);
