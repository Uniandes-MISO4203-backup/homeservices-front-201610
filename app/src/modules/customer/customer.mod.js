(function (ng) {
    var mod = ng.module('customerModule', ['ngCrud']);

    mod.constant('customerContext', 'customers');

    mod.constant('customerModel', {
        fields: [{
                name: 'name',
                displayName: 'Name',
                type: 'String',
                required: true
            }, {
                name: 'lastName',
                displayName: 'Last Name',
                type: 'String',
                required: true
            }, {
                name: 'document',
                displayName: 'Document',
                type: 'String',
                required: true
            }],
        childs: [{
                name: 'serviceRequests',
                displayName: 'Service Requests',
                //template: '', //override generic template
                ctrl: 'CustomerserviceRequestsCtrl',
                owned: false
            }]});
})(window.angular);
