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
        //JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend(customSelector.custom_string_editor);

        // Specify upload handler
        JSONEditor.defaults.options.upload = function(type, file, cbs) {
            if (type === 'root.upload_fail') cbs.failure('Upload failed');
            else {
                var tick = 0;
                var tickFunction = function() {
                    tick += 1;
                    console.log('progress: ' + tick);
                    if (tick < 100) {
                        cbs.updateProgress(tick);
                        window.setTimeout(tickFunction, 50)
                    } else if (tick == 100) {
                        cbs.updateProgress();
                        window.setTimeout(tickFunction, 500)
                    } else {
                        //cbs.success('http://www.example.com/images/' + file.name);
                        cbs.success('http://www.example.com/images/' + file.name);
                        ///home/barbara/Documenti

                        var f = file;

                        if (f) {
                            var r = new FileReader();
                            r.onload = function(e) {
                                var contents = e.target.result;
                                alert( "Got the file.n"
                                    +"name: " + f.name + "n"
                                    +"type: " + f.type + "n"
                                    +"size: " + f.size + " bytesn"
                                    + "starts with: " + contents.substr(1, contents.indexOf("n"))
                                );
                            }
                            r.readAsText(f);
                        } else {
                            alert("Failed to load file");
                        }
                    }
                };
                window.setTimeout(tickFunction)
            }
        };

        return self;
    };


    return function (target, schemaUrl, opts) {
        return new renderFormCustomFeature(target, schemaUrl, opts);
    }
});
