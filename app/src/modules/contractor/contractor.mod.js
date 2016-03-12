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
                displayName: 'City',
                type: 'String',
                required: true
            },{
                name: 'telefono',
                displayName: 'Phone',
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
            }, {
                name: 'educations',
                displayName: 'Educations',
                //template: '', //override generic template
                ctrl: 'ContractoreducationsCtrl',
                owned: true
            }]});
})(window.angular);
