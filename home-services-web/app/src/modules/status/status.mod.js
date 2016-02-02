(function (ng) {
    var mod = ng.module('statusModule', ['ngCrud']);

    mod.constant('statusContext', 'statuss');

    mod.constant('statusModel', {
        fields: [{
                name: 'name',
                displayName: 'Name',
                type: 'String',
                required: true
            }]});
})(window.angular);
