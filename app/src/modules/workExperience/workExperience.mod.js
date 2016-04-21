(function (ng) {
    var mod = ng.module('workExperienceModule', ['ngCrud']);

    mod.constant('workExperienceContext', 'workExperiences');

    mod.constant('workExperienceModel', {
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
            }, {
                name: 'hours',
                displayName: 'Hours',
                type: 'Integer',
                required: true
            }]});
})(window.angular);
