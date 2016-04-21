(function (ng) {
    var mod = ng.module('educationModule', ['ngCrud']);

    mod.constant('educationContext', 'education');

    mod.constant('educationModel', {
        fields: [{
                name: 'name',
                displayName: 'Name',
                type: 'String',
                required: true
            }, {
                name: 'institute',
                displayName: 'Institute',
                type: 'String',
                required: true
            }, {
                name: 'year',
                displayName: 'Year',
                type: 'String',
                required: true
            }]});
})(window.angular);


