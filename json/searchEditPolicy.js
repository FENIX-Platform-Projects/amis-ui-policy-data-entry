define(['i18n!nls/dataEntry'], function(DataEntry) {

    return {
        title: "Policy Data Editor",
        type: "object",
        "options": {
            disable_collapse: true
        },
        properties: {
            summary: {
                type: "object",
                title: "Summary",
                "options": {
                    disable_collapse: false
                },
                properties: {
                    country: {
                        type: "string",
                        title: DataEntry['summary']['country'],
                        default: "",
                        readOnly: true
                    },
                    subnational: {
                        type: "string",
                        title: "Subnational Level",
                        default: "",
                        readOnly: true
                    },
                    commodityClass: {
                        type: "string",
                        title: "Commodity Class",
                        default: "",
                        readOnly: true
                    },
                    commodityId: {
                        type: "string",
                        title: "Commodity Id",
                        default: "",
                        readOnly: true
                    },
                    policyDomain: {
                        type: "string",
                        title: "Policy Domain",
                        default: "",
                        readOnly: true
                    },
                    policyType: {
                        type: "string",
                        title: "Policy Type",
                        default: "",
                        readOnly: true
                    },
                    policyMeasure: {
                        type: "string",
                        title: "Policy Measure",
                        default: "",
                        readOnly: true
                    },
                    policyCondition: {
                        type: "string",
                        title: "Policy Condition",
                        default: "",
                        readOnly: true
                    }
                }
            },
            link: {
                type: "string",
                title: DataEntry['link'],
                description:  DataEntry['linkDescription'],
                default: ""
            },
            //linkPdf: {
            //    type: "string",
            //    title: DataEntry['linkPdf'],
            //    description:  DataEntry['linkPdfDescription'],
            //    default: ""
            //},
            policyElement: {
                type: "object",
                title: DataEntry['policyElement'],
                "options": {
                    disable_collapse: true
                },
                properties: {
                    list: {
                        type: "string",
                        format: "select",
                        title: "List",
                        description:  DataEntry['policyElementDescription'],
                        uniqueItems: true,
                        enum: [],
                        options: {
                            "enum_titles": []
                        },
                        default: ""
                    },
                    name: {
                        type: "string",
                        title: DataEntry['policyElementAdditionalName'],
                        options: {
                            disabled: true
                        },
                        default: ""
                    }
                }
            },
            startDate: {
                type: "string",
                title: DataEntry['startDate'],
                description:  DataEntry['startDateDescription'],
                format: "date",
                default: "",
                options:{disable: true}
            },
            endDate: {
                type: "string",
                title: DataEntry['endDate'],
                description:  DataEntry['endDateDescription'],
                format: "date",
                default: ""
            },
            valueValueText: {
                type: "string",
                format: "select",
                title: "Value Structure",
                description:  DataEntry['valueOrValueTextDescription'],
                uniqueItems: true,
                enum: [DataEntry['value'], DataEntry['valueText']],
                default: DataEntry['value']
            },
            unit: {
                type: "object",
                title: DataEntry['unit'],
                "options": {
                    disable_collapse: true
                },
                properties: {
                    list: {
                        type: "string",
                        format: "select",
                        title: "List",
                        description:  DataEntry['unitDescription'],
                        uniqueItems: true,
                        enum: [],
                        options: {
                            "enum_titles": []
                        },
                        default: ""
                    },
                    name: {
                        type: "string",
                        title: DataEntry['unitAdditionalName'],
                        options: {
                            disabled: true
                        }
                    }
                }
            },
            value: {
                type: "string",
                title: DataEntry['value'],
                description:  DataEntry['valueDescription'],
                default: ""
            },
            valueText: {
                type: "string",
                title: DataEntry['valueText'],
                description:  DataEntry['valueTextDescription'],
                default: ""
            },
            source: {
                type: "object",
                title: DataEntry['source'],
                "options": {
                    disable_collapse: true
                },
                properties: {
                    list: {
                        type: "string",
                        format: "select",
                        title: "List",
                        description:  DataEntry['sourceDescription'],
                        uniqueItems: true,
                        enum: [],
                        options: {
                            "enum_titles": []
                        },
                        default: ""
                    },
                    name: {
                        options: {
                            disabled: true
                        },
                        type: "string",
                        title: DataEntry['sourceAdditionalName']
                    }
                }
            },
            exemptions: {
                type: "string",
                title: DataEntry['exemptions'],
                description:  DataEntry['exemptionsDescription'],
                default: ""
            },
            dateOfPublication: {
                type: "string",
                title: DataEntry['dateOfPublication'],
                description:  DataEntry['dateOfPublicationDescription'],
                format: "date",
                default: ""
            },
            taxRateBenchmark: {
                type: "string",
                title: DataEntry['taxRateBenchmark'],
                description:  DataEntry['taxRateBenchmarkDescription'],
                default: ""
            },
            benchmarkLink: {
                type: "string",
                title: DataEntry['benchmarkLink'],
                description:  DataEntry['benchmarkLinkDescription'],
                default: ""
            },
            benchmarkLinkPdf: {
                type: "string",
                title: DataEntry['benchmarkLinkPdf'],
                description:  DataEntry['benchmarkLinkPdfDescription'],
                default: ""
            },
            secondGenerationSpecific: {
                type: "object",
                title: DataEntry['secondGenerationSpecific'],
                "options": {
                    disable_collapse: true
                },
                properties: {
                    list: {
                        type: "string",
                        format: "select",
                        title: "List",
                        description:  DataEntry['secondGenerationSpecificDescription'],
                        uniqueItems: true,
                        enum: [],
                        options: {
                            "enum_titles": []
                        },
                        default: ""
                    },
                    name: {
                        type: "string",
                        title: DataEntry['secondGenerationAdditionalName'],
                        options: {
                            disabled: true
                        },
                        default: ""
                    }
                }
            },
            notes: {
                type: "string",
                title: DataEntry['notes'],
                description:  DataEntry['notesDescription'],
                default: ""
            },
            MinAVTariffValue: {
                type: "string",
                title: DataEntry['MinAVTariffValue'],
                description:  DataEntry['MinAVTariffValueDescription'],
                default: ""
            },
            MaxAVTariffValue: {
                type: "string",
                title: DataEntry['MaxAVTariffValue'],
                description:  DataEntry['MaxAVTariffValueDescription'],
                default: ""
            },
            CountAVTariff: {
                type: "string",
                title: DataEntry['CountAVTariff'],
                description:  DataEntry['CountAVTariffDescription'],
                default: ""
            },
            CountNAVTariff: {
                type: "string",
                title: DataEntry['CountNAVTariff'],
                description:  DataEntry['CountNAVTariffDescription'],
                default: ""
            },
            titleOfNotice: {
                type: "string",
                title: DataEntry['titleOfNotice'],
                description:  DataEntry['titleOfNoticeDescription'],
                default: ""
            },
            legalBasisName: {
                type: "string",
                title: DataEntry['legalBasisName'],
                description:  DataEntry['legalBasisNameDescription'],
                default: ""
            },
            benchmarkTax: {
                type: "string",
                title: DataEntry['benchmarkTax'],
                description:  DataEntry['benchmarkTaxDescription'],
                default: ""
            },
            benchmarkProduct: {
                type: "string",
                title: DataEntry['benchmarkProduct'],
                description:  DataEntry['benchmarkProductDescription'],
                default: ""
            },
            taxRateBiofuel: {
                type: "string",
                title: DataEntry['taxRateBiofuel'],
                description:  DataEntry['taxRateBiofuelDescription'],
                default: ""
            },
            startDateTax: {
                type: "string",
                title: DataEntry['startDateTax'],
                description:  DataEntry['startDateTaxDescription'],
                default: ""
            },
            measureDescription: {
                type: "string",
                title: DataEntry['measureDescription'],
                description:  DataEntry['measureDescriptionDescription'],
                default: ""
            },
            productOriginalHs: {
                type: "string",
                title: DataEntry['productOriginalHs'],
               // description:  DataEntry['productOriginalHsDescription'],
                default: ""
            },
            productOriginalName: {
                type: "string",
                title: DataEntry['productOriginalName'],
              //  description:  DataEntry['productOriginalNameDescription'],
                default: ""
            }
            //linkPdf: {
            //    type: "string",
            //    title: DataEntry['linkPdf'],
            //    description:  DataEntry['linkPdfDescription'],
            //    default: ""
            //},
            //"linkPdf": {
            //    "type": "array",
            //    "format": "table",
            //    "title": DataEntry['linkPdf'],
            //    "uniqueItems": true,
            //    "items": {
            //        "type": "object",
            //        "title": "File",
            //        "properties": {
            //            "File": {
            //                "type": "string"
            //            }
            //        }
            //    },
            //    "default": [
            //        //{
            //        //    "File": "Walter"
            //        //}
            //    ]
            //}

            //"link"
            //"linkPdf"
            //"valueText"
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
        }
       // "required": ["link", "linkPdf"]
    }
});
