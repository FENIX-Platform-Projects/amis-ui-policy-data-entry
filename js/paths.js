define(function () {

    var config = {
       // "baseUrl": "",

        paths: {

            'ap-dataEntry/start': './start',

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

            'pnotify': '//fenixapps.fao.org/repository/js/pnotify/2.0.1/pnotify.core',
            'jqwidgets': '//fenixapps.fao.org/repository/js/jqwidgets/3.1/jqx-light',
            //'jqueryui': 'src/lib/jquery-ui.min',
            'jqueryuicustom': '//fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
            'nprogress': '//fenixapps.fao.org/repository/js/nprogress/0.1.6/nprogress',
            'isotope': "//fenixapps.fao.org/repository/js/isotope/2.1.0/dist/isotope.pkgd.min",
            'packery': '//fenixapps.fao.org/repository/js/packery/dist/packery.pkgd.min',
            'jstree': '//fenixapps.fao.org/repository/js/jstree/3.0.8/dist/jstree.min',

            'text':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/text/2.0.12/text",
            'i18n':      "//fenixrepo.fao.org/cdn/js/requirejs/plugins/i18n/2.0.4/i18n",
            'domready':  "//fenixrepo.fao.org/cdn/js/requirejs/plugins/domready/2.0.1/domReady",
            'jquery':    "//fenixrepo.fao.org/cdn/js/jquery/2.1.1/jquery.min",
            'bootstrap': "//fenixrepo.fao.org/cdn/js/bootstrap/3.3.2/js/bootstrap.min",
            'amplify':   "//fenixrepo.fao.org/cdn/js/amplify/1.1.2/amplify.min",
            'handlebars':"//fenixrepo.fao.org/cdn/js/handlebars/2.0.0/handlebars",
            'underscore':"//fenixrepo.fao.org/cdn/js/underscore/1.8.0/underscore.min",
            'jsoneditor':"//fenixrepo.fao.org/cdn/js/json-editor/0.7.17/jsoneditor.min"
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
            jsoneditor: {
                deps: ['jquery', 'bootstrap'],
                exports: 'JSONEditor'
            }
        }
    };

    return config;
});