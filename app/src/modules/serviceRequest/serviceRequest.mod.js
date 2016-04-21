(function (ng) {
    var mod = ng.module('serviceRequestModule', ['ngCrud']);

    mod.constant('serviceRequestContext', 'serviceRequests');



    mod.constant('serviceRequestModel', {
        fields: [{
                name: 'name',
                displayName: 'Name',
                type: 'String',
                required: true
            }, {
                name: 'price',
                displayName: 'Price',
                type: 'Integer',
                required: true
            }, {
                name: 'recommendedTime',
                displayName: 'Recommended Time',
                type: 'String',
                required: true
            }, {
                name: 'creationDate',
                displayName: 'Creation Date',
                type: 'Date',
                required: true
            }, {
                name: 'priceRequestLimit',
                displayName: 'Price Request Limit',
                type: 'Date',
                required: true
            },{
                name: 'dueDate',
                displayName: 'Due Date',
                type: 'Date',
                required: true
            }, {
                name: 'category',
                displayName: 'Category',
                type: 'Reference',
                url: 'categoryContext',
                options: [],
                required: true
            }, {
                name: 'status',
                displayName: 'Status',
                type: 'Reference',
                url: 'statusContext',
                options: [],
                required: true
            }, {
                name: 'score',
                displayName: 'Score',
                type: 'Integer'
            },{
                name: 'description',
                displayName: 'Description Service',
                type: 'String',
                required: true
            }],
        childs: [{
                name: 'expectedskills',
                displayName: 'Expectedskills',
                //template: '', //override generic template
                ctrl: 'ServicesRequestsexpectedskillsCtrl',
                owned: false
            }]});
})(window.angular);
