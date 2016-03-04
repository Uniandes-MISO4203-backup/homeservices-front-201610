(function (ng) {
    var mod = ng.module('contractorModule', ['ngCrud']);

    mod.constant('contractorContext', 'contractors');

    mod.constant('mySkillsContext', 'myskills');

    mod.constant('contractorModel', {
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
            }, {
                name: 'picture',
                displayName: 'Picture',
                type: 'String',
                required: true
            }, {
                name: 'city',
                displayName: 'city',
            },{
                name: 'telefono',
                displayName: 'Telefono',
                type: 'String',
                required: true
            }],
        childs: [{
                name: 'skills',
                displayName: 'Skills',
                //template: '', //override generic template
                ctrl: 'ContractorsskillsCtrl',
                owned: false
            }, {
                name: 'workExperiences',
                displayName: 'Work Experiences',
                //template: '', //override generic template
                ctrl: 'ContractorworkExperiencesCtrl',
                owned: true
            }]});
})(window.angular);
