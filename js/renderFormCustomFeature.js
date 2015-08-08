define([
    'underscore','jsoneditor',
    'AP_DATAENTRY_THEME',
    'ap-dataEntry/customSelector'
], function (_, JSONEditor,
             AP_DATAENTRY_THEME,
             CustomSelector) {

    function renderFormCustomFeature(target, opts) {

        /* Apply AMIS POLICY DATA ENTRY theme for json-editor. */
        JSONEditor.defaults.themes.ap_dataEntry_theme = JSONEditor.AbstractTheme.extend(AP_DATAENTRY_THEME);

        var customSelector = new CustomSelector();
        /* Extend string editor. */
        JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend(customSelector.custom_string_editor);

        return self;
    };


    return function (target, schemaUrl, opts) {
        return new renderFormCustomFeature(target, schemaUrl, opts);
    }
});
