define(function () {

    var config = {

        paths: {

            'AP_DATAENTRY_THEME' : './ap_dataEntry_theme',
            //'sweetAlert': 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/0.5.0/sweet-alert.min',
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

            //'fx-editor/start': './start',
            //'fx-editor/templates': "../templates",

            //'fx-filter/filtercontroller': 'src/js/Fx-filter-controller',
            //'fx-filter/fluidgrid': 'src/js/Fx-fluid-grid',
            //'fx-filter/containerfactory': 'src/js/Fx-filter-containerFactory',
            //'fx-filter/componentfactory': 'src/js/Fx-filter-componentFactory',
            //'fx-filter/layoutfactory': 'src/js/Fx-filter-layoutFactory',
            //'fx-filter/filtermodule': 'src/js/Fx-filter-module',
            //'fx-filter/fluidGridBaseContainer': 'src/js/container_plugin/Fx-filter-fluidGridBaseContainer',
            //'fx-filter/fluidGridLayoutRender': 'src/js/layout_plugin/Fx-filter-fluidGridLayoutRender',
            ////'fx-filter/component1': '../../submodules/fenix-ui-filter/src/js/component_plugin/Fx-filter-component1',
            ////'fx-filter/component1': 'src/js/component_plugin/Fx-filter-component1',
            //'fx-filter/componentcreator': 'src/js/Fx-filter-component-creator',
            //'fx-filter/widgetcommons': 'src/js/Fx-widgets-commons',
            //'fx-filter/start': 'src/js/start',
            //'fx-filter/utils': 'src/js/Fx-filter-utils',
            //'fx-filter/config' : 'config',
//            'fx-filter/src': './src'

            //Third party libs
            //'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            //'pnotify': '{FENIX_CDN}/js/pnotify/2.0.1/pnotify.core',
            //'jqwidgets': '{FENIX_CDN}/js/jqwidgets/3.1/jqx-light',
            //'jqueryui': 'src/lib/jquery-ui.min',
            //'jqueryuicustom': '{FENIX_CDN}/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
            //'nprogress': '{FENIX_CDN}/js/nprogress/0.1.6/nprogress',
            //'underscore': '{FENIX_CDN}/js/underscore/1.7.0/underscore.min',
            //'bootstrap': '{FENIX_CDN}/js/bootstrap/3.2/js/bootstrap.min',
            //'isotope': "{FENIX_CDN}/js/isotope/2.1.0/dist/isotope.pkgd.min",
            //'packery': '{FENIX_CDN}/js/packery/dist/packery.pkgd.min',
            //'jstree': '{FENIX_CDN}/js/jstree/3.0.8/dist/jstree.min',
            //'amplify' : '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',

            'pnotify': '//fenixrepo.fao.org/cdn/js/pnotify/2.0.1/pnotify.core',
            'jqwidgets': '//fenixrepo.fao.org/cdn/js/jqwidgets/3.1/jqx-light',
            //'jqueryui': 'src/lib/jquery-ui.min',
            'jqueryui': '//fenixrepo.fao.org/cdn/js/jquery-ui/1.9.2/jquery-ui.custom.min',
            //'jqueryuicustom': '//fenixrepo.fao.org/cdn/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
            'nprogress': '//fenixrepo.fao.org/cdn/js/nprogress/0.1.6/nprogress',
            'isotope': "//fenixrepo.fao.org/cdn/js/isotope/2.1.0/dist/isotope.pkgd.min",
            'packery': '//fenixrepo.fao.org/cdn/js/packery/dist/packery.pkgd.min',
            'jstree': '//fenixrepo.fao.org/cdn/js/jstree/3.0.8/dist/jstree.min',


            //'pnotify': '//fenixapps.fao.org/repository/js/pnotify/2.0.1/pnotify.core',
            //'jqwidgets': '//fenixapps.fao.org/repository/js/jqwidgets/3.1/jqx-light',
            ////'jqueryui': 'src/lib/jquery-ui.min',
            //'jqueryui': '//fenixrepo.fao.org/cdn/js/jquery-ui/1.9.2/jquery-ui.custom.min',
            ////'jqueryuicustom': '//fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
            //'nprogress': '//fenixapps.fao.org/repository/js/nprogress/0.1.6/nprogress',
            //'isotope': "//fenixapps.fao.org/repository/js/isotope/2.1.0/dist/isotope.pkgd.min",
            //'packery': '//fenixapps.fao.org/repository/js/packery/dist/packery.pkgd.min',
            //'jstree': '//fenixapps.fao.org/repository/js/jstree/3.0.8/dist/jstree.min',

            'text':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/text/2.0.12/text",
            'i18n':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/i18n/2.0.4/i18n",
            'domready':  "//fenixrepo.fao.org/cdn/js/requirejs/plugins/domready/2.0.1/domReady",
            'jquery':    "//fenixrepo.fao.org/cdn/js/jquery/2.1.1/jquery.min",
            'bootstrap': "//fenixrepo.fao.org/cdn/js/bootstrap/3.3.4/js/bootstrap.min",
            //'bootstrap': "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
            'amplify':   "//fenixrepo.fao.org/cdn/js/amplify/1.1.2/amplify.min",
            'handlebars':"//fenixrepo.fao.org/cdn/js/handlebars/2.0.0/handlebars",
            'underscore':"//fenixrepo.fao.org/cdn/js/underscore/1.8.0/underscore.min",
            'jsoneditor':"//fenixrepo.fao.org/cdn/js/json-editor/0.7.21/jsoneditor.min",
            'moment': "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales",
            'bootstrap-datetimepicker': "//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/a549aa8780dbda16f6cff545aeabc3d71073911e/src/js/bootstrap-datetimepicker"
            //'bootstrap-datetimepicker': "//tarruda.github.com/bootstrap-datetimepicker/assets/js/bootstrap-datetimepicker.min",
            //'bootstrap-datetimepickerBR': "//tarruda.github.com/bootstrap-datetimepicker/assets/js/bootstrap-datetimepicker.pt-BR"
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