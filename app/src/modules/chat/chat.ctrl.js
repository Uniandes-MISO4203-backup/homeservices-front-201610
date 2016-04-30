(function (ng) {
    var mod = ng.module('chatModule');
    mod.controller('chatCtrl', ['Restangular', '$scope', '$stateParams', '$interval',
        function (Restangular, $scope, $stateParams, $interval) {
            var chat = Restangular.one('chat', $stateParams.chatName),
                chatMsg = Restangular.all('chatmsg');
            $scope.local = $stateParams.chatName;
            $scope.user = Restangular.all("users").customGET('me').$object;

            $scope.Timer = $interval(function () {
                if ($stateParams.chatName != null) {
                    chat.get().then(function (results) {
                        if (results.id != null) {
                            $scope.error = $stateParams.chatName;
                            $scope.chatId = results.id;
                            $scope.chatM = results.listChatMsg;
                        } else {
                            $scope.error = "No Creado";
                        }
                    });
                }
            }, 1000);






            $scope.send = function () {
                var newMessage = {
                    idChatName: $scope.chatId,
                    userName: $scope.user.userName,
                    userMsg: $scope.textbox
                };
                chatMsg.post(newMessage).then(function () {
                    chat.get().then(function (results) {
                        $scope.chatM = results.listChatMsg;
                    });
                });
            };

        }
    ]);
})(window.angular);
