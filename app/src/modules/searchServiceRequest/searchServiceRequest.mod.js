(function (ng) {
    var mod = ng.module('searchServiceRequestModule', ['ngCrud']);

    mod.constant('searchServiceRequestContext', 'searchSR');


    mod.constant('searchServiceRequestModel', {
        fields: [{
                name: 'description',
                displayName: 'Description',
                type: 'String',
                required: true
            }]});

})(window.angular);
