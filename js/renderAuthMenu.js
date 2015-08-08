
define(['underscore'
], function (_) {

    return function(menuId) {
        //AUTH

        var auth = '';
        //var auth = new AuthManager({
        //    onLogin: function() {
        //        location.reload();
        //    },
        //    onLogout: function() {
        //        location.href = 'index.html';
        //    }
        //})
        //  menu = new Menu( auth.isLogged() ? menuConfAuth : menuConfPub );

        //$('footer').load('html/footer.html');

        return {
            auth: auth
            //menu: menu
        };
    };
});

//ORIGINAL
//define(['underscore',
//    'submodules/fenix-ui-common/js/AuthManager'
//], function (_,	AuthManager) {
//
//    return function(menuId) {
//           //AUTH
//
//        var auth = new AuthManager({
//                onLogin: function() {
//                    location.reload();
//                },
//                onLogout: function() {
//                    location.href = 'index.html';
//                }
//            })
//          //  menu = new Menu( auth.isLogged() ? menuConfAuth : menuConfPub );
//
//        //$('footer').load('html/footer.html');
//
//        return {
//            auth: auth
//            //menu: menu
//        };
//    };
//});