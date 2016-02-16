/*global require*/
// relative or absolute path of Components' main.js
require([
    'submodules/fenix-ui-common/js/Compiler',
    'submodules/fenix-ui-menu/js/paths'
], function (Compiler, menuConfig) {

    menuConfig.baseUrl = 'submodules/fenix-ui-menu/js';

    Compiler.resolve([menuConfig], {
        placeholders: {
            FENIX_CDN: "//fenixrepo.fao.org/cdn"
        },
        config: {
            i18n: {
                locale: 'en'
            },
            paths: {
                text:      "{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text",
                i18n:      "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                domready:  "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                jquery:    "{FENIX_CDN}/js/jquery/2.1.1/jquery.min",
                bootstrap: "{FENIX_CDN}/js/bootstrap/3.3.2/js/bootstrap.min",
                amplify:   "{FENIX_CDN}/js/amplify/1.1.2/amplify.min",
                handlebars:"{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                underscore:"{FENIX_CDN}/js/underscore/1.8.0/underscore.min",
                //jsoneditor:"{FENIX_CDN}/js/json-editor/0.7.17/jsoneditor.min",
                jsoneditor:"{FENIX_CDN}/js/json-editor/0.7.23/jsoneditor.min",

                'fx-common': 'submodules/fenix-ui-common'
            },
            shim: {
                bootstrap:['jquery'],
                underscore: {
                    exports: '_'
                },
                handlebars: {
                    exports: 'Handlebars'
                },
                amplify: {
                    deps: ['jquery'],
                    exports: 'amplify'
                },
                jsoneditor: {
                    deps: ['jquery', 'bootstrap'],
                    exports: 'JSONEditor'
                }
            }
        }
    });

    // Bootstrap the application
    require([
        'jquery','underscore','bootstrap','handlebars',

        'js/renderAuthMenu',
        'js/renderForm',
        'js/storeForm',

        'config/services',
        'i18n!nls/questions',

        'domready!'
    ], function ($, _, bootstrap, Handlebars,

                 renderAuthMenu,
                 renderForm,
                 storeForm,

                 Config,
                 Quests
    ) {
        var authMenu =  renderAuthMenu('compile'),

        //TO REMOVE START
        //user = authMenu.auth.getCurrentUser();
        //user = {name: "" }
        user =  {
            "name" : "Guest",
            "password" : "guest"
        };
        //END TO REMOVE

        formStore = new storeForm({
            prefix: user.name || 'unlogged',
            storeExpires: 100000,
            autosaveLoader: '#sectionstorage-loader'
        });
        id = "cat1";
        require(['json/'+ id ], function(schema) {
            console.log("id= "+id)
            console.log("Schema start")
            console.log(schema)
            renderForm('#'+ id, {
                schema: schema,
                iconlib: 'fontawesome4',
                values: formStore.getSections(id),
                onChange: function(data) {
                    console.log(data)
                    formStore.addSection(id, data);
                    //$pill.addClass('saved');
                }
            });

            // Disable part of the form
            editor.getEditor('summary').disable();

        }, function (err) {
            $('#'+id).html( tmplFormError({id: id }) );
        });
    });
});
