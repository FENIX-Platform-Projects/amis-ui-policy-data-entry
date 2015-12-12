define([
    'jquery',
    'bootstrap-datetimepicker'
], function ($) {

    var o = {};

    function CustomSelector(options) {
        $.extend(true, o, options);
    }

    CustomSelector.prototype.custom_string_editor = {

        build: function() {
            var self = this, i;
            if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
            if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

            this.format = this.schema.format;
            if(!this.format && this.schema.media && this.schema.media.type) {
                this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,'');
            }
            if(!this.format && this.options.default_format) {
                this.format = this.options.default_format;
            }
            if(this.options.format) {
                this.format = this.options.format;
            }

            // Specific format
            if(this.format) {
                // Text Area
                if(this.format === 'textarea') {
                    this.input_type = 'textarea';
                    this.input = this.theme.getTextareaInput();
                }
                // Range Input
                else if(this.format === 'range') {
                    this.input_type = 'range';
                    var min = this.schema.minimum || 0;
                    var max = this.schema.maximum || Math.max(100,min+1);
                    var step = 1;
                    if(this.schema.multipleOf) {
                        if(min%this.schema.multipleOf) min = Math.ceil(min/this.schema.multipleOf)*this.schema.multipleOf;
                        if(max%this.schema.multipleOf) max = Math.floor(max/this.schema.multipleOf)*this.schema.multipleOf;
                        step = this.schema.multipleOf;
                    }

                    this.input = this.theme.getRangeInput(min,max,step);
                }
                else if(this.format === 'date') {
                    this.input = this.theme.getDateInput();
                }
                // Source Code
                else if([
                        'actionscript',
                        'batchfile',
                        'bbcode',
                        'c',
                        'c++',
                        'cpp',
                        'coffee',
                        'csharp',
                        'css',
                        'dart',
                        'django',
                        'ejs',
                        'erlang',
                        'golang',
                        'handlebars',
                        'haskell',
                        'haxe',
                        'html',
                        'ini',
                        'jade',
                        'java',
                        'javascript',
                        'json',
                        'less',
                        'lisp',
                        'lua',
                        'makefile',
                        'markdown',
                        'matlab',
                        'mysql',
                        'objectivec',
                        'pascal',
                        'perl',
                        'pgsql',
                        'php',
                        'python',
                        'r',
                        'ruby',
                        'sass',
                        'scala',
                        'scss',
                        'smarty',
                        'sql',
                        'stylus',
                        'svg',
                        'twig',
                        'vbscript',
                        'xml',
                        'yaml'
                    ].indexOf(this.format) >= 0
                ) {
                    this.input_type = this.format;
                    this.source_code = true;

                    this.input = this.theme.getTextareaInput();
                }
                // HTML5 Input type
                else {
                    this.input_type = this.format;
                    this.input = this.theme.getFormInputField(this.input_type);
                }
            }
            // Normal text input
            else {
                this.input_type = 'text';
                this.input = this.theme.getFormInputField(this.input_type);
            }

            // minLength, maxLength, and pattern
            if(typeof this.schema.maxLength !== "undefined") this.input.setAttribute('maxlength',this.schema.maxLength);
            if(typeof this.schema.pattern !== "undefined") this.input.setAttribute('pattern',this.schema.pattern);
            else if(typeof this.schema.minLength !== "undefined") this.input.setAttribute('pattern','.{'+this.schema.minLength+',}');

            if(this.options.compact) {
                this.container.className += ' compact';
            }
            else {
                if(this.options.input_width) this.input.style.width = this.options.input_width;
            }

            if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
                this.always_disabled = true;
                this.input.disabled = true;
            }

            this.input
                .addEventListener('change',function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Don't allow changing if this field is a template
                    if(self.schema.template) {
                        this.value = self.value;
                        return;
                    }

                    var val = this.value;

                    // sanitize value
                    var sanitized = self.sanitize(val);
                    if(val !== sanitized) {
                        this.value = sanitized;
                    }

                    self.is_dirty = true;

                    self.refreshValue();
                    self.onChange(true);
                });

            if(this.options.input_height) this.input.style.height = this.options.input_height;
            if(this.options.expand_height) {
                this.adjust_height = function(el) {
                    if(!el) return;
                    var i, ch=el.offsetHeight;
                    // Input too short
                    if(el.offsetHeight < el.scrollHeight) {
                        i=0;
                        while(el.offsetHeight < el.scrollHeight+3) {
                            if(i>100) break;
                            i++;
                            ch++;
                            el.style.height = ch+'px';
                        }
                    }
                    else {
                        i=0;
                        while(el.offsetHeight >= el.scrollHeight+3) {
                            if(i>100) break;
                            i++;
                            ch--;
                            el.style.height = ch+'px';
                        }
                        el.style.height = (ch+1)+'px';
                    }
                };

                this.input.addEventListener('keyup',function(e) {
                    self.adjust_height(this);
                });
                this.input.addEventListener('change',function(e) {
                    self.adjust_height(this);
                });
                this.adjust_height();
            }

            if(this.format) this.input.setAttribute('data-schemaformat',this.format);

            this.control = this.theme.getFormControl(this.label, this.input, this.description);
            this.container.appendChild(this.control);

            if(this.format === 'date') {
                //format: "L"
                //$(".input-group").datetimepicker({format: "D-MM-YYYY", disabledTimeIntervals: [[moment({ h: 0 }), moment({ h: 23 })]]});
                $(this.input).datetimepicker({format: "D-MM-YYYY", disabledTimeIntervals: [[moment({ h: 0 }), moment({ h: 23 })]]});
                //$(this.input).on('dp.change', function(e) {
                //    self.onChange(true);
                //})
            }

            // Any special formatting that needs to happen after the input is added to the dom
            window.requestAnimationFrame(function() {
                // Skip in case the input is only a temporary editor,
                // otherwise, in the case of an ace_editor creation,
                // it will generate an error trying to append it to the missing parentNode
                if(self.input.parentNode) self.afterInputReady();
                if(self.adjust_height) self.adjust_height(self.input);
            });

            // Compile and store the template
            if(this.schema.template) {
                this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine);
                this.refreshValue();
            }
            else {
                this.refreshValue();
            }
        },

        refreshValue: function() {
            //alert("refreshValue 1")
        },

        setValue: function (value, initial, from_template) {
            var self = this;

            if (this.template && !from_template)
                return;

            if (value === null) {
                value = '';
            } else if (typeof value === "object") {
                value = JSON.stringify(value);
            } else if (typeof value !== "string") {
                value = "" + value;
            }

            /* Convert milliseconds to valid date. */
            if (this.format == 'date') {
                //value = 1437394497986;
                var d;
                try {
                    d = new Date(parseFloat(value));
                    value = d.toISOString().substring(0, 10);
                } catch (e) {

                }
            }

            if (value === this.serialized)
                return;

            /* Sanitize value before setting it */
            var sanitized = this.sanitize(value);

            if(typeof this.input!= "undefined"){
                if (this.input.value === sanitized)
                    return;

                if (this.format == 'date') {
                    $(this.input).data("DateTimePicker").date(d);
                }
                else{
                    this.input.value = sanitized;
                }
            }

            /* If using SCEditor, update the WYSIWYG */
            if (this.sceditor_instance) {
                this.sceditor_instance.val(sanitized);
            } else if (this.epiceditor) {
                this.epiceditor.importFile(null, sanitized);
            } else if (this.ace_editor) {
                this.ace_editor.setValue(sanitized);
            }


            var changed = from_template || this.getValue() !== value;

            this.refreshValue();

            if (initial) {
                this.is_dirty = false;
            } else if (this.jsoneditor.options.show_errors === "change") {
                this.is_dirty = true;
            }

            if (this.adjust_height)
                this.adjust_height(this.input);

            /* Bubble this setValue to parents if the value changed */
            this.onChange(changed);

        }
    };

    return CustomSelector;
});