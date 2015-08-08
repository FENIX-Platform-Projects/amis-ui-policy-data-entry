define(['i18n!nls/questions'], function(Quests) {

    //return {
    //    "type": "object",
    //    "title": Quests['cat1'],
    //    "properties": {
    //        "ask1": {
    //            "title": Quests['ask1'],
    //            "type": "string",
    //            "uniqueItems": true,
    //            "format": "select",
    //            "enum": [
    //                "Yes, officially",
    //                "Yes, not officially",
    //                "No",
    //                "Not sure"
    //            ]
    //        },
    //        "ask1_1": {
    //            "title": Quests['ask1_1'],
    //            "type": "array",
    //            "minItems": 1,
    //            "maxItems": 5,
    //            "items": {
    //                "type": "string",
    //                "title": " ",
    //                "default": ""
    //            },
    //            "additionalItems":false
    //        }
    //    }



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
                properties: {
                    country: {
                        type: "string",
                        title: "Country",
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
            name: {
                type: "string",
                description: "First and Last name",
                minLength: 4,
                default: "Jeremy Dorn"
            },
            age: {
                type: "integer",
                default: 25,
                minimum: 18,
                maximum: 99
            },
            favorite_color: {
                type: "string",
                format: "color",
                title: "favorite color",
                default: "#ffa500"
            },
            gender: {
                type: "string",
                enum: ["male", "female"]
            }
            //pets: {
            //    type: "array",
            //    format: "table",
            //    title: "Pets",
            //    uniqueItems: true,
            //    items: {
            //        type: "object",
            //        title: "Pet",
            //        properties: {
            //            type: {
            //                type: "string",
            //                enum: ["cat","dog","bird","reptile","other"],
            //                default: "dog"
            //            },
            //            name: {
            //                type: "string"
            //            }
            //        }
            //    },
            //    default: [
            //        {
            //            type: "dog",
            //            name: "Walter"
            //        }
            //    ]
            //}
        }
    }
});

