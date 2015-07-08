define(['underscore',
    'submodules/fenix-ui-common/js/AuthManager',
    'fx-menu/start',
    'config/fenix-ui-menu'
], function (_,	AuthManager, Menu, menuConf) {

    return function(menuId) {
        //AUTH & TOP MENU
        menuConf.active = menuId;

        var menuConfAuth = _.extend({}, menuConf, {
                hiddens: ['login']
            }),
            menuConfPub = _.extend({}, menuConf, {
                hiddens: ['view','compile','editor','logout']
            });

        var auth = new AuthManager({
                onLogin: function() {
                    location.reload();
                },
                onLogout: function() {
                    location.href = 'index.html';
                }
            }),
            menu = new Menu( auth.isLogged() ? menuConfAuth : menuConfPub );


        $('footer').load('html/footer.html');

        return {
            auth: auth,
            menu: menu
        };
    };
});