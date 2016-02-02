(function (ng) {
    var mod = ng.module('categoryModule', ['ngCrud']);

    mod.constant('categoryContext', 'categorys');

    mod.constant('categoryModel', {
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
