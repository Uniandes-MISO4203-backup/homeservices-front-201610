(function (ng) {
    var mod = ng.module('serviceRequestPricesModule', ['ngCrud']);

    mod.constant('serviceRequestContext', 'serviceRequests');
    mod.constant('serviceRequestPriceContext', 'pricelist');


    mod.constant('serviceRequestPriceModel', {
        fields: [{
                name: 'price',
                displayName: 'price',
                type: 'String',
                required: true
            }]});
})(window.angular);
