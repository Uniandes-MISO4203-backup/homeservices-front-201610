(function (ng) {
    var mod = ng.module('newChatModule');

    mod.controller('newChatCtrl', ['Restangular', '$scope', '$stateParams',
        function (Restangular, $scope, $stateParams) {
            var chat = Restangular.all('chat');
            var customer = $stateParams.customer;
            var contractor = $stateParams.contractor;


            // Send Messages
            $scope.send2 = function () {
                //
                var day = $scope.fecha.getDate().toString();
                if (day.length < 2) {
                    day = '0' + day;
                }
                var month = ($scope.fecha.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = '0' + month;
                }
                var year = $scope.fecha.getFullYear().toString();
                var fechaval = year + '-' + month + '-' + day;

                var newMessage = {
                    idCustomer: customer,
                    idContractor: contractor,
                    creationDate: fechaval
                };
                chat.post(newMessage);





            };



        }


    ]);




})(window.angular);
