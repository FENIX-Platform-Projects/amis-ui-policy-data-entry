define(['jquery','underscore','handlebars','amplify',
], function ($, _, Handlebars, Amplify) {

    function storeForm(opts) {
        //TODO extend defaults..

        this.opts = _.defaults(opts, {
            prefix: '',
            autosave: true,
            autosaveInterval: 5000,
            autosaveLoader: null,
            storeExpires: 0
        });

        this.storeId = _.uniqueId('storeForm-'+this.opts.prefix);
        this.storeObj = amplify.store(this.storeId) || {};
        this.autosaveTimer = null;

        if(this.opts.autosaveLoader)
            $(this.opts.autosaveLoader).css({visibility: 'hidden'});

        if(this.opts.autosave)
            this.initAutoSave();
    };

    storeForm.prototype.addSection = function(id, data) {
        this.storeObj[ id ]= data;

        this.storeSections();

        return this;
    };

    storeForm.prototype.storeSections = function() {

        var self = this;

        if(_.isEmpty(this.storeObj))
            return this;

        if(this.opts.autosaveLoader)
            $(this.opts.autosaveLoader).css({visibility: 'visible'});

        amplify.store(this.storeId, this.storeObj, {
            expires: this.opts.storeExpires
        });

        setTimeout(function() {
            if(self.opts.autosaveLoader)
                $(self.opts.autosaveLoader).css({visibility: 'hidden'});
        }, 1000);

        return this;
    };

    storeForm.prototype.getSections = function(id) {
        return id ? this.storeObj[id] : this.storeObj;
    };

    storeForm.prototype.initAutoSave = function() {

        var self = this;

        this.autosaveTimer = setInterval(function() {

            self.storeSections();

        }, this.opts.autosaveInterval);

        return this;
    };

    return storeForm;
});