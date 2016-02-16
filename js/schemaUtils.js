define([
    'jquery',
    'ap-dataEntry/dataEntryVariables'
], function ($, DataEntryVariables) {

    var optionsDefault = {
        dataEntryVariables : ''
    };

    function SchemaUtils(o) {
        if (this.options === undefined) {
            this.options = {};
        }

        $.extend(true, this.options, optionsDefault, o);
    }

    SchemaUtils.prototype.init = function () {
        this.options.dataEntryVariables = new DataEntryVariables();
    }

    SchemaUtils.prototype.settingProperties = function (schema, options) {
        if((options!=null)&&(typeof options!="undefined")&&(options.properties!=null)&&(typeof options.properties!="undefined")&&(options.fileName!=null)&&(typeof options.fileName!="undefined")){
            if(options.fileName =="searchEditPolicy"){
                //Case Edit Policy
                if((options.properties.summary!=null)&&(typeof options.properties.summary!="undefined")&&(options.properties.summary.properties!=null)&&(typeof options.properties.summary.properties!="undefined")){
                    //Summary
                    if((options.properties.summary.properties.country!=null)&&(typeof options.properties.summary.properties.country!="undefined")){
                        schema.properties.summary.properties.country.default = options.properties.summary.properties.country.value.default;
                    }
                    if((options.properties.summary.properties.subnational!=null)&&(typeof options.properties.summary.properties.subnational!="undefined")){
                        schema.properties.summary.properties.subnational.default = options.properties.summary.properties.subnational.value.default;
                    }
                    if((options.properties.summary.properties.commodityClass!=null)&&(typeof options.properties.summary.properties.commodityClass!="undefined")){
                        schema.properties.summary.properties.commodityClass.default = options.properties.summary.properties.commodityClass.value.default;
                    }
                    if((options.properties.summary.properties.commodityId!=null)&&(typeof options.properties.summary.properties.commodityId!="undefined")){
                        schema.properties.summary.properties.commodityId.default = options.properties.summary.properties.commodityId.value.default;
                    }
                    if((options.properties.summary.properties.policyDomain!=null)&&(typeof options.properties.summary.properties.policyDomain!="undefined")){
                        schema.properties.summary.properties.policyDomain.default = options.properties.summary.properties.policyDomain.value.default;
                    }
                    if((options.properties.summary.properties.policyType!=null)&&(typeof options.properties.summary.properties.policyType!="undefined")){
                        schema.properties.summary.properties.policyType.default = options.properties.summary.properties.policyType.value.default;
                    }
                    if((options.properties.summary.properties.policyMeasure!=null)&&(typeof options.properties.summary.properties.policyMeasure!="undefined")){
                        schema.properties.summary.properties.policyMeasure.default = options.properties.summary.properties.policyMeasure.value.default;
                    }
                    if((options.properties.summary.properties.policyCondition!=null)&&(typeof options.properties.summary.properties.policyCondition!="undefined")){
                        schema.properties.summary.properties.policyCondition.default = options.properties.summary.properties.policyCondition.value.default;
                    }
                }

                //Other fields
                this.otherFieldsSetting_edit(schema, options);
                this.listSetting_edit(schema, options);
            }
            else  if(options.fileName =="searchAddPolicy"){
                //Case Add Policy
                if((options.properties.summary!=null)&&(typeof options.properties.summary!="undefined")&&(options.properties.summary.properties!=null)&&(typeof options.properties.summary.properties!="undefined")){
                    //Summary
                    if((options.properties.summary.properties.country!=null)&&(typeof options.properties.summary.properties.country!="undefined")){
                        schema.properties.summary.properties.country.default = options.properties.summary.properties.country.value.default;
                    }
                    if((options.properties.summary.properties.subnational!=null)&&(typeof options.properties.summary.properties.subnational!="undefined")){
                        schema.properties.summary.properties.subnational.default = options.properties.summary.properties.subnational.value.default;
                    }
                    if((options.properties.summary.properties.commodityDomain!=null)&&(typeof options.properties.summary.properties.commodityDomain!="undefined")){
                        schema.properties.summary.properties.commodityDomain.default = options.properties.summary.properties.commodityDomain.value.default;
                    }
                    if((options.properties.summary.properties.commodityClass!=null)&&(typeof options.properties.summary.properties.commodityClass!="undefined")){
                        schema.properties.summary.properties.commodityClass.default = options.properties.summary.properties.commodityClass.value.default;
                    }
                    if((options.properties.summary.properties.commodityId!=null)&&(typeof options.properties.summary.properties.commodityId!="undefined")){
                        schema.properties.summary.properties.commodityId.default = options.properties.summary.properties.commodityId.value.default;
                    }
                    if((options.properties.summary.properties.hsCode!=null)&&(typeof options.properties.summary.properties.hsCode!="undefined")){
                        schema.properties.summary.properties.hsCode.default = options.properties.summary.properties.hsCode.value.default;
                    }
                    if((options.properties.summary.properties.hsVersion!=null)&&(typeof options.properties.summary.properties.hsVersion!="undefined")){
                        schema.properties.summary.properties.hsVersion.default = options.properties.summary.properties.hsVersion.value.default;
                    }
                    if((options.properties.summary.properties.hsSuffix!=null)&&(typeof options.properties.summary.properties.hsSuffix!="undefined")){
                        schema.properties.summary.properties.hsSuffix.default = options.properties.summary.properties.hsSuffix.value.default;
                    }
                    if((options.properties.summary.properties.shortDescription!=null)&&(typeof options.properties.summary.properties.shortDescription!="undefined")){
                        schema.properties.summary.properties.shortDescription.default = options.properties.summary.properties.shortDescription.value.default;
                    }
                    if((options.properties.summary.properties.longDescription!=null)&&(typeof options.properties.summary.properties.longDescription!="undefined")){
                        schema.properties.summary.properties.longDescription.default = options.properties.summary.properties.longDescription.value.default;
                    }
                    if((options.properties.summary.properties.policyDomain!=null)&&(typeof options.properties.summary.properties.policyDomain!="undefined")){
                        schema.properties.summary.properties.policyDomain.default = options.properties.summary.properties.policyDomain.value.default;
                    }
                    if((options.properties.summary.properties.policyType!=null)&&(typeof options.properties.summary.properties.policyType!="undefined")){
                        schema.properties.summary.properties.policyType.default = options.properties.summary.properties.policyType.value.default;
                    }
                    if((options.properties.summary.properties.policyMeasure!=null)&&(typeof options.properties.summary.properties.policyMeasure!="undefined")){
                        schema.properties.summary.properties.policyMeasure.default = options.properties.summary.properties.policyMeasure.value.default;
                        if((options.properties.summary.properties.policyMeasure.value.code!=null)&&(typeof options.properties.summary.properties.policyMeasure.value.code!="undefined")){
                            if((options.properties.summary.properties.policyMeasure.value.code!=this.options.dataEntryVariables.options.codes.importTariffs)&&(options.properties.summary.properties.policyMeasure.value.code!=this.options.dataEntryVariables.options.codes.tariffQuotas)){
                                delete schema.properties.summary.properties.hsSuffix;
                            }
                        }
                    }
                    if((options.properties.summary.properties.policyCondition!=null)&&(typeof options.properties.summary.properties.policyCondition!="undefined")){
                        schema.properties.summary.properties.policyCondition.default = options.properties.summary.properties.policyCondition.value.default;
                    }
                    if((options.properties.summary.properties.individualPolicy!=null)&&(typeof options.properties.summary.properties.individualPolicy!="undefined")){
                        schema.properties.summary.properties.individualPolicy.default = options.properties.summary.properties.individualPolicy.value.default;
                    }
                }

                //Other fields
                this.otherFieldsSetting_edit(schema, options);
                this.listSetting_edit(schema, options);
            }
        }
    };

    SchemaUtils.prototype.otherFieldsSetting_edit = function (schema, options) {
        var daleteValueValueText = 0;
        //"link"
        //"linkPdf"
        //"policyElement"
        //"startDate"
        //"endDate"
        //"unit"
        //"value"
        //"valueText"
        //"source"
        //"exemptions"
        //"dateOfPublication"
        //"taxRateBenchmark"
        //"benchmarkLink"
        //"benchmarkLinkPdf"
        //"secondGenerationSpecific"
        //"notes"
        //"localCondition"
        //"titleOfNotice"
        //"legalBasisName"
        //"benchmarkTax"
        //"benchmarkProduct"
        //"taxRateBiofuel"
        //"startDateTax"
        //"measureDescription"
        //"productOriginalHs"
        //"productOriginalName"

        //Add check for value and value text
        //It's important to do two separated checks because only
        //if the field is not in the options list has to be deleted
        if ((options.properties.link != null) && (typeof options.properties.link != "undefined")) {//OK
            if ((options.properties.link.value!=null)&&(typeof options.properties.link.value!="undefined")&&(options.properties.link.value.default!= null)&&(typeof options.properties.link.value.default!="undefined")) {
                schema.properties.link.default = options.properties.link.value.default;
            }
        }
        else {
            delete schema.properties.link;
        }

        if ((options.properties.linkPdf != null) && (typeof options.properties.linkPdf != "undefined")) {//OK
            if ((options.properties.linkPdf.value!=null)&&(typeof options.properties.linkPdf.value!="undefined")&&(options.properties.linkPdf.value.default!= null)&&(typeof options.properties.linkPdf.value.default!="undefined")) {
                if((schema.properties.linkPdf !=null)&&(typeof schema.properties.linkPdf != "undefined")){
                    schema.properties.linkPdf.default = options.properties.linkPdf.value.default;
                }
            }
        }
        else {
            delete schema.properties.linkPdf;
        }

        if ((options.properties.policyElement != null) && (typeof options.properties.policyElement != "undefined")) {
            if ((options.properties.policyElement.source!=null)&&(typeof options.properties.policyElement.source!="undefined")&&(options.properties.policyElement.source.datafields!=null)&&(typeof options.properties.policyElement.source.datafields!="undefined")&&(options.properties.policyElement.source.datafields.defaultCode!= null)&&(typeof options.properties.policyElement.source.datafields.defaultCode!="undefined")) {
                schema.properties.policyElement.properties.list.default = options.properties.policyElement.source.datafields.defaultCode;
            }
        }
        else {
            delete schema.properties.policyElement;
        }

        if ((options.properties.startDate != null) && (typeof options.properties.startDate != "undefined")) {//OK
            if ((options.properties.startDate.value!=null)&&(typeof options.properties.startDate.value!="undefined")&&(options.properties.startDate.value.defaultValue!= null)&&(typeof options.properties.startDate.value.defaultValue!="undefined")) {
                schema.properties.startDate.default = options.properties.startDate.value.defaultValue;
            }
        }
        else {
            delete schema.properties.startDate;
        }

        if ((options.properties.endDate != null) && (typeof options.properties.endDate != "undefined")) {
            if ((options.properties.endDate.value!=null)&&(typeof options.properties.endDate.value!="undefined")&&(options.properties.endDate.value.defaultValue!= null)&&(typeof options.properties.endDate.value.defaultValue!="undefined")) {
                schema.properties.endDate.default = options.properties.endDate.value.defaultValue;
            }
            else {
                //delete schema.properties.endDate;
            }

            if ((options.properties.unit != null) && (typeof options.properties.unit != "undefined")) {
                if ((options.properties.unit.source!=null)&&(typeof options.properties.unit.source!="undefined")&&(options.properties.unit.source.datafields!=null)&&(typeof options.properties.unit.source.datafields!="undefined")&&(options.properties.unit.source.datafields.defaultCode!= null)&&(typeof options.properties.unit.source.datafields.defaultCode!="undefined")) {
                    schema.properties.unit.properties.list.default = options.properties.unit.source.datafields.defaultCode;
                }
            }
            else {
                delete schema.properties.unit;
            }
            if ((options.properties.value != null) && (typeof options.properties.value != "undefined")) {
                if ((options.properties.value.value!=null)&&(typeof options.properties.value.value!="undefined")&&(options.properties.value.value.default!= null)&&(typeof options.properties.value.value.default!="undefined")) {
                    schema.properties.value.default = options.properties.value.value.default;
                    schema.properties.valueValueText.default = "Value";
                }
            }
            else {
                daleteValueValueText++;
                delete schema.properties.value;
            }

            if ((options.properties.valueText != null) && (typeof options.properties.valueText != "undefined")) {
                if ((options.properties.valueText.value!=null)&&(typeof options.properties.valueText.value!="undefined")&&(options.properties.valueText.value.default!= null)&&(typeof options.properties.valueText.value.default!="undefined")) {
                    schema.properties.valueText.default = options.properties.valueText.value.default;

                    //schema.properties.valueValueText.default = this.options.dataEntryVariables.options.valueText;
                    schema.properties.valueValueText.default = "ValueText";
                    //o.dataEntryVariables.options.valueValueText_enum_values[0]
                    //console.log(this.options.dataEntryVariables.valueValueText_enum_values[1]);
                    //console.log(this.options.dataEntryVariables.options.valueText);
                    //console.log("IF 2 " + schema.properties.valueValueText.default);
                }
            }
            else {
                daleteValueValueText++;
                delete schema.properties.valueText;
            }

            if(daleteValueValueText==2){
                //If there aren't Value and Value Text.... this field has to be deleted
                delete schema.properties.valueValueText;
            }

            if ((options.properties.source != null) && (typeof options.properties.source != "undefined")) {//OK
                if ((options.properties.source.source!=null)&&(typeof options.properties.source.source!="undefined")&&(options.properties.source.source.datafields!=null)&&(typeof options.properties.source.source.datafields!="undefined")&&(options.properties.source.source.datafields.defaultCode!= null)&&(typeof options.properties.source.source.datafields.defaultCode!="undefined")) {
                    schema.properties.source.properties.list.default = options.properties.source.source.datafields.defaultCode;
                }
            }
            else {
                delete schema.properties.source;
            }

            if ((options.properties.exemptions != null) && (typeof options.properties.exemptions != "undefined")) {
                if ((options.properties.exemptions.value!=null)&&(typeof options.properties.exemptions.value!="undefined")&&(options.properties.exemptions.value.default!= null)&&(typeof options.properties.exemptions.value.default!="undefined")) {
                    schema.properties.exemptions.default = options.properties.exemptions.value.default;
                }
            }
            else {
                delete schema.properties.exemptions;
            }

            if ((options.properties.dateOfPublication != null) && (typeof options.properties.dateOfPublication != "undefined")) {//OK
                if ((options.properties.dateOfPublication.value!=null)&&(typeof options.properties.dateOfPublication.value!="undefined")&&(options.properties.dateOfPublication.value.defaultValue!= null)&&(typeof options.properties.dateOfPublication.value.defaultValue!="undefined")) {
                    schema.properties.dateOfPublication.default = options.properties.dateOfPublication.value.defaultValue;
                }
            }
            else {
                delete schema.properties.dateOfPublication;
            }

            if ((options.properties.taxRateBenchmark != null) && (typeof options.properties.taxRateBenchmark != "undefined")) {
                if ((options.properties.taxRateBenchmark.value!=null)&&(typeof options.properties.taxRateBenchmark.value!="undefined")&&(options.properties.taxRateBenchmark.value.default!= null)&&(typeof options.properties.taxRateBenchmark.value.default!="undefined")) {
                    schema.properties.taxRateBenchmark.default = options.properties.taxRateBenchmark.value.default;
                }
            }
            else {
                delete schema.properties.taxRateBenchmark;
            }

            if ((options.properties.benchmarkLink != null) && (typeof options.properties.benchmarkLink != "undefined")) {
                if ((options.properties.benchmarkLink.value!=null)&&(typeof options.properties.benchmarkLink.value!="undefined")&&(options.properties.benchmarkLink.value.default!= null)&&(typeof options.properties.benchmarkLink.value.default!="undefined")) {
                    schema.properties.benchmarkLink.default = options.properties.benchmarkLink.value.default;
                }
            }
            else {
                delete schema.properties.benchmarkLink;
            }

            if ((options.properties.benchmarkLinkPdf != null) && (typeof options.properties.benchmarkLinkPdf != "undefined")) {
                if ((options.properties.benchmarkLinkPdf.value!=null)&&(typeof options.properties.benchmarkLinkPdf.value!="undefined")&&(options.properties.benchmarkLinkPdf.value.default!= null)&&(typeof options.properties.benchmarkLinkPdf.value.default!="undefined")) {
                    schema.properties.benchmarkLinkPdf.default = options.properties.benchmarkLinkPdf.value.default;
                }
            }
            else {
                delete schema.properties.benchmarkLinkPdf;
            }

            if ((options.properties.secondGenerationSpecific != null) && (typeof options.properties.secondGenerationSpecific != "undefined")) {
                if ((options.properties.secondGenerationSpecific.source!=null)&&(typeof options.properties.secondGenerationSpecific.source!="undefined")&&(options.properties.secondGenerationSpecific.source.datafields!=null)&&(typeof options.properties.secondGenerationSpecific.source.datafields!="undefined")&&(options.properties.secondGenerationSpecific.source.datafields.defaultCode!= null)&&(typeof options.properties.secondGenerationSpecific.source.datafields.defaultCode!="undefined")) {
                    schema.properties.secondGenerationSpecific.properties.list.default = options.properties.secondGenerationSpecific.source.datafields.defaultCode;
                }
            }
            else {
                delete schema.properties.secondGenerationSpecific;
            }

            if ((options.properties.notes != null) && (typeof options.properties.notes != "undefined")) {
                if ((options.properties.notes.value!=null)&&(typeof options.properties.notes.value!="undefined")&&(options.properties.notes.value.default!= null)&&(typeof options.properties.notes.value.default!="undefined")) {
                    schema.properties.notes.default = options.properties.notes.value.default;
                }
            }
            else {
                delete schema.properties.notes;
            }

            if ((options.properties.localCondition != null) && (typeof options.properties.localCondition != "undefined")) {//OK
                if ((options.properties.localCondition.source!=null)&&(typeof options.properties.localCondition.source!="undefined")&&(options.properties.localCondition.source.datafields!=null)&&(typeof options.properties.localCondition.source.datafields!="undefined")&&(options.properties.localCondition.source.datafields.defaultCode!= null)&&(typeof options.properties.localCondition.source.datafields.defaultCode!="undefined")) {
                    schema.properties.localCondition.properties.list.default = options.properties.localCondition.source.datafields.defaultCode;
                }
            }
            else {
                delete schema.properties.localCondition;
            }

            if ((options.properties.titleOfNotice != null) && (typeof options.properties.titleOfNotice != "undefined")) {
                if ((options.properties.titleOfNotice.value!=null)&&(typeof options.properties.titleOfNotice.value!="undefined")&&(options.properties.titleOfNotice.value.default!= null)&&(typeof options.properties.titleOfNotice.value.default!="undefined")) {
                    schema.properties.titleOfNotice.default = options.properties.titleOfNotice.value.default;
                }
            }
            else {
                delete schema.properties.titleOfNotice;
            }

            if ((options.properties.legalBasisName != null) && (typeof options.properties.legalBasisName != "undefined")) {
                if ((options.properties.legalBasisName.value!=null)&&(typeof options.properties.legalBasisName.value!="undefined")&&(options.properties.legalBasisName.value.default!= null)&&(typeof options.properties.legalBasisName.value.default!="undefined")) {
                    schema.properties.legalBasisName.default = options.properties.legalBasisName.value.default;
                }
            }
            else {
                delete schema.properties.legalBasisName;
            }

            if ((options.properties.benchmarkTax != null) && (typeof options.properties.benchmarkTax != "undefined")) {
                if ((options.properties.benchmarkTax.value!=null)&&(typeof options.properties.benchmarkTax.value!="undefined")&&(options.properties.benchmarkTax.value.default!= null)&&(typeof options.properties.benchmarkTax.value.default!="undefined")) {
                    schema.properties.benchmarkTax.default = options.properties.benchmarkTax.value.default;
                }
            }
            else {
                delete schema.properties.benchmarkTax;
            }

            if ((options.properties.benchmarkProduct != null) && (typeof options.properties.benchmarkProduct != "undefined")) {
                if ((options.properties.benchmarkProduct.value!=null)&&(typeof options.properties.benchmarkProduct.value!="undefined")&&(options.properties.benchmarkProduct.value.default!= null)&&(typeof options.properties.benchmarkProduct.value.default!="undefined")) {
                    schema.properties.benchmarkProduct.default = options.properties.benchmarkProduct.value.default;
                }
            }
            else {
                delete schema.properties.benchmarkProduct;
            }

            if ((options.properties.taxRateBiofuel != null) && (typeof options.properties.taxRateBiofuel != "undefined")) {
                if ((options.properties.taxRateBiofuel.value!=null)&&(typeof options.properties.taxRateBiofuel.value!="undefined")&&(options.properties.taxRateBiofuel.value.default!= null)&&(typeof options.properties.taxRateBiofuel.value.default!="undefined")) {
                    schema.properties.taxRateBiofuel.default = options.properties.taxRateBiofuel.value.default;
                }
            }
            else {
                delete schema.properties.taxRateBiofuel;
            }

            if ((options.properties.startDateTax != null) && (typeof options.properties.startDateTax != "undefined")) {
                if ((options.properties.startDateTax.value!=null)&&(typeof options.properties.startDateTax.value!="undefined")&&(options.properties.startDateTax.value.default!= null)&&(typeof options.properties.startDateTax.value.default!="undefined")) {
                    schema.properties.startDateTax.default = options.properties.startDateTax.value.default;
                }
            }
            else {
                delete schema.properties.startDateTax;
            }

            if ((options.properties.measureDescription != null) && (typeof options.properties.measureDescription != "undefined")) {
                if ((options.properties.measureDescription.value!=null)&&(typeof options.properties.measureDescription.value!="undefined")&&(options.properties.measureDescription.value.default!= null)&&(typeof options.properties.measureDescription.value.default!="undefined")) {
                    schema.properties.measureDescription.default = options.properties.measureDescription.value.default;
                }
            }
            else {
                delete schema.properties.measureDescription;
            }

            if ((options.properties.productOriginalHs != null) && (typeof options.properties.productOriginalHs != "undefined")) {
                if ((options.properties.productOriginalHs.value!=null)&&(typeof options.properties.productOriginalHs.value!="undefined")&&(options.properties.productOriginalHs.value.default!= null)&&(typeof options.properties.productOriginalHs.value.default!="undefined")) {
                    schema.properties.productOriginalHs.default = options.properties.productOriginalHs.value.default;
                }
            }
            else {
                delete schema.properties.productOriginalHs;
            }

            if ((options.properties.productOriginalName != null) && (typeof options.properties.productOriginalName != "undefined")) {
                if ((options.properties.productOriginalName.value!=null)&&(typeof options.properties.productOriginalName.value!="undefined")&&(options.properties.productOriginalName.value.default!= null)&&(typeof options.properties.productOriginalName.value.default!="undefined")) {
                    schema.properties.productOriginalName.default = options.properties.productOriginalName.value.default;
                }
            }
            else {
                delete schema.properties.productOriginalName;
            }
        }
    }

    SchemaUtils.prototype.listSetting_edit = function (schema, options) {
        var self = this;
        var keys = Object.keys(options.properties);
        var chooseKeys = [];
        var counter = 0;
        var fields= [];

        for(var iKey=0; iKey<keys.length; iKey++){
            var key = keys[iKey];
            var field = options.properties[key];
            if ((field != null)&&(typeof field != "undefined")&&(field.source != null)&&(typeof field.source != "undefined")&&(field.source != null)&&(typeof field.source != "undefined")&&(field.source.url != null)&&(typeof field.source.url != "undefined")) {
                fields[counter] = field;
                chooseKeys[counter] = key;
                counter++;
            }
        }
        self.options.counter= counter;

        for(var iField=0; iField<fields.length; iField++){
            var field = fields[iField];
            $.ajax({
                type: 'GET',
                async:false,
                url: field.source.url,

                success: function (response) {
                    /* Convert the response in an object, if needed. */
                    var json = response;
                    if (typeof(response) == 'string')
                        json = $.parseJSON(response);
                    //To order the json elements based on the title(label)
                    if ((json != null) && (typeof json != "undefined")) {
                        var jsonCodes = json.data;
                        if ((jsonCodes != null) && (typeof jsonCodes != "undefined") && (jsonCodes.length > 0)) {
                            jsonCodes.sort(function (a, b) {
                                if (a.title.EN < b.title.EN)
                                    return -1;
                                if (a.title.EN > b.title.EN)
                                    return 1;
                                return 0;
                            });
                        }
                        self.options.counter--;
                        self.fillEnumField(schema, jsonCodes, chooseKeys[iField]);
                    }
                },
                error: function (err, b, c) {
                    alert(err.status + ", " + b + ", " + c);
                }
            });
        }
    }

    SchemaUtils.prototype.fillEnumField = function (schema, jsonCodes, field) {
        if((schema!=null)&&(typeof schema!= "undefined")&&(schema.properties!=null)&&(typeof schema.properties!= "undefined")&&(schema.properties[field]!=null)&&(typeof schema.properties[field]!= "undefined")&&(schema.properties[field].properties!=null)&&(typeof schema.properties[field].properties!= "undefined")&&(schema.properties[field].properties.list!=null)&&(typeof schema.properties[field].properties.list!= "undefined"))
        {
            var enumToFill = schema.properties[field].properties.list.enum;
            var enumTitlesToFill = schema.properties[field].properties.list.options.enum_titles;

            if((enumToFill!= null)&&(typeof enumToFill!= "undefined")){
                enumToFill.push(this.options.dataEntryVariables.options.OTHER);
                enumTitlesToFill.push(this.options.dataEntryVariables.options.OTHER);
                for(var iJsonCodes= 0; iJsonCodes<jsonCodes.length; iJsonCodes++){
                    enumToFill.push(''+jsonCodes[iJsonCodes].code);
                    enumTitlesToFill.push(''+jsonCodes[iJsonCodes].title["EN"]);
                }
            }
        }
    }

    return SchemaUtils;
});