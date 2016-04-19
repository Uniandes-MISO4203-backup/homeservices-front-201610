(function (ng) {
    var mod = ng.module('newChatModule', ['ngCrud']);

    mod.constant('newChatContext', 'newchat');
    mod.constant('newChatModel', {
        fields: [{
                name: 'fecha',
                displayName: 'Fecha',
                type: 'date',
                required: true
            }
        ]});



})(window.angular);
