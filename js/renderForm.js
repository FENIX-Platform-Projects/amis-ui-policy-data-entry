/*

 USAGE:
 renderForm('#form-contact', 'json/schema.contact.json');

 //new dom element
 var form$ = $('<form>').prependTo('body');
 renderForm(form$, 'json/schema.contact.json');

 */
define([
    'require','jquery','underscore','handlebars','jsoneditor',
    'AP_DATAENTRY_THEME',
    'text!fx-common/html/jsonForm.html',
    'ap-dataEntry/customSelector'
], function (require, $, _, Handlebars, JSONEditor,
             AP_DATAENTRY_THEME,
             formWrapper, CustomSelector) {

    var tmplFormWrapper = Handlebars.compile(formWrapper);

    function renderForm(target, opts) {

        /* Apply AMIS POLICY DATA ENTRY theme for json-editor. */
        //JSONEditor.defaults.themes.ap_dataEntry_theme = JSONEditor.AbstractTheme.extend(AP_DATAENTRY_THEME);

        //var customSelector = new CustomSelector();
        ///* Extend string editor. */
        //JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend(customSelector.custom_string_editor);

        //JSONEditor.defaults.custom_validators.push(function(schema, value, path) {
        //    //alert("Validators")
        //    var errors = [];
        //    //console.log("Validators start");
        //    //console.log(schema)//All the schema file
        //    //console.log(value)
        //    //console.log(path)//root
        //    //console.log("Validators end");
        //    if(schema.format==="date") {
        //        if((value==null)&&(typeof value!= "undefined")) {
        //            // Errors must be an object with `path`, `property`, and `message`
        //            errors.push({
        //                path: path,
        //                property: 'format',
        //                message: 'Dates cannot be null'
        //            });
        //        }
        //        //if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
        //        //    // Errors must be an object with `path`, `property`, and `message`
        //        //    errors.push({
        //        //        path: path,
        //        //        property: 'format',
        //        //        message: 'Dates must be in the format "YYYY-MM-DD"'
        //        //    });
        //        //}
        //    }
        //    return errors;
        //});

        opts = opts || {};

        var self = this;

        self.target = (target instanceof jQuery) ? target : $(target);

        self.opts = _.defaults(opts, {
            template: 'handlebars',
            //theme: 'bootstrap3',
            theme: 'ap_dataEntry_theme',

            //TODO languages using module nls/jsoneditor_errors.js

            ajax: true,
            editable: false,
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            disable_array_reorder: true,

            values: {},
            schema: _.isString(opts.schema) ? {$ref: require.toUrl(opts.schema)} : opts.schema,
            disabled: [],

            tmpl: {
                idform: self.target.attr('id'),
                submit: 'Save',
                reset: 'Cancel'
            },
            //ballbacks
            //onChange: alert("ON CHANGE"),
            onSubmit: $.noop
        });
        //If opts.editable is FALSE
        if(!_.isUndefined(opts.editable))
            self.opts = _.extend(self.opts, {
                editable:              opts.editable,
                //disable_collapse:     !opts.editable,
                disable_collapse:      opts.editable,
                disable_edit_json:    !opts.editable,
                disable_properties:   !opts.editable,
                disable_array_reorder:!opts.editable
            });

        self.target.html( tmplFormWrapper(self.opts.tmpl) );
        if(self.editor)
            self.editor.destroy();

        self.editor = new JSONEditor(self.target.find('.form-wrapper-content')[0], self.opts);

        self.editor.watch('root.source',function() {
            // Do something

            var source = self.editor.getEditor('root.source');
            var value = source.getValue();
            if((value!=null)&&(typeof value !="undefined")){
                if(value=="Other"){
                    self.editor.getEditor('root.link').enable();
                }
                else{
                    self.editor.getEditor('root.link').disable();
                }
            }
        });

        if(self.opts.disabled.length>0)
            _.each(self.opts.disabled, function(key) {
                self.editor.getEditor('root.'+key).disable();
            });

        //self.editor.on('change', _.after(2, function(e) {
        //    self.opts.onChange.call(self, self.editor.getValue() );
        //}) );

        //self.editor.on('change',function() {
        //    var json = self.editor.getValue();
        //    alert(JSON.stringify(json,null,2));
        //    console.log(JSON.stringify(json,null,2));
        //    var validation_errors = self.editor.validate();
        //    // Show validation errors if there are any
        //    if(validation_errors.length) {
        //        alert("1..... ")
        //        var value = JSON.stringify(validation_errors,null,2);
        //        console.log(value)
        //    }
        //    else {
        //        alert("2..... ")
        //        var value = 'valid';
        //        console.log(value)
        //    }
        //});

        if(!_.isEmpty(self.opts.values))
            self.editor.setValue(self.opts.values);


        self.target.find('.form-wrapper-submit').on('click', function(e) {
            e.preventDefault();
            self.opts.onChange.call(self, self.editor.getValue() );
            self.opts.onSubmit.call(self, self.editor.getValue() );
        });

        //self.editor.on('change',function() {
        //    var errors = self.editor.validate();
        //    if(errors.length) {
        //        // errors is an array of objects, each with a `path`, `property`, and `message` parameter
        //        // `property` is the schema keyword that triggered the validation error (e.g. "minLength")
        //        // `path` is a dot separated path into the JSON object (e.g. "root.path.to.field")
        //        alert("Errors")
        //        console.log(errors);
        //    }
        //    else {
        //        alert("It's valid")
        //        // It's valid!
        //    }
        //});

        return self;
    };


    return function (target, schemaUrl, opts) {
        return new renderForm(target, schemaUrl, opts);
    }
});
