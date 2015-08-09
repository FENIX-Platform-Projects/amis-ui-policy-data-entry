define(function () {

    var config = {

        paths: {

            'AP_DATAENTRY_THEME' : './ap_dataEntry_theme',
            'sweetAlert':'//fenixrepo.fao.org/cdn/js/sweet-alert/0.5.0/sweet-alert.min',

            'ap-dataEntry/start': './start',
            'ap-dataEntry/dataEntryVariables': './dataEntryVariables',

            'ap-dataEntry': '..',
            'submodules': '../..',
            'js': './',
            'config': '../config',
            'nls': '../nls',
            'html': '../html',
            'ap-dataEntry/json': '../json',
            'ap-dataEntry/schemaUtils': './schemaUtils',
            'ap-dataEntry/customSelector': './customSelector',
            'pnotify': '//fenixrepo.fao.org/cdn/js/pnotify/2.0.1/pnotify.core',
            'jqwidgets': '//fenixrepo.fao.org/cdn/js/jqwidgets/3.1/jqx-light',
            'jqueryui': '//fenixrepo.fao.org/cdn/js/jquery-ui/1.9.2/jquery-ui.custom.min',
            'nprogress': '//fenixrepo.fao.org/cdn/js/nprogress/0.1.6/nprogress',
            'isotope': "//fenixrepo.fao.org/cdn/js/isotope/2.1.0/dist/isotope.pkgd.min",
            'packery': '//fenixrepo.fao.org/cdn/js/packery/dist/packery.pkgd.min',
            'jstree': '//fenixrepo.fao.org/cdn/js/jstree/3.0.8/dist/jstree.min',
            'text':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/text/2.0.12/text",
            'i18n':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/i18n/2.0.4/i18n",
            'domready':  "//fenixrepo.fao.org/cdn/js/requirejs/plugins/domready/2.0.1/domReady",
            'jquery':    "//fenixrepo.fao.org/cdn/js/jquery/2.1.1/jquery.min",
            'bootstrap': "//fenixrepo.fao.org/cdn/js/bootstrap/3.3.4/js/bootstrap.min",
            'amplify':   "//fenixrepo.fao.org/cdn/js/amplify/1.1.2/amplify.min",
            'handlebars':"//fenixrepo.fao.org/cdn/js/handlebars/2.0.0/handlebars",
            'underscore':"//fenixrepo.fao.org/cdn/js/underscore/1.8.0/underscore.min",
            'jsoneditor':"//fenixrepo.fao.org/cdn/js/json-editor/0.7.21/jsoneditor.min",
            'moment': "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales",
            'bootstrap-datetimepicker': "//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/a549aa8780dbda16f6cff545aeabc3d71073911e/src/js/bootstrap-datetimepicker"
        },

        shim: {
            bootstrap: {
                deps: ['jquery']
            },
            underscore: {
                exports: '_'
            },
            "jquery.i18n.properties": {
                deps: ['jquery']
            },
            jqwidget: {
                export: "$",
                deps: ['jquery']
            },
            jQAllRangeSliders: {
                deps: ['jquery', 'jqueryui', 'jqueryuicustom']
            },
            pnotify: {
                deps: ['bootstrap']
            },
            'jsoneditor': {
                deps: ['jquery', 'bootstrap'],
                exports: 'JSONEditor'
            },
            'bootstrap-datetimepicker': {
                deps: ['jquery', 'bootstrap', 'moment']
            }
        }
    };

    return config;
});