(function (ng) {
    var mod = ng.module('skillModule', ['ngCrud']);

    mod.constant('skillContext', 'skills');

    mod.constant('skillModel', {
        fields: [{
                name: 'name',
                displayName: 'Name',
                type: 'String',
                required: true
            }, {
                name: 'description',
                displayName: 'Description',
                type: 'String',
                required: true
            }]});
})(window.angular);
