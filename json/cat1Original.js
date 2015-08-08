define(['i18n!nls/questions'], function(Quests) {

    return {
        "type": "object",
        "title": Quests['cat1'],
        "properties": {
            "ask1": {
                "title": Quests['ask1'],
                "type": "string",
                "uniqueItems": true,
                "format": "select",
                "enum": [
                    "Yes, officially",
                    "Yes, not officially",
                    "No",
                    "Not sure"
                ]
            },
            "ask1_1": {
                "title": Quests['ask1_1'],
                "type": "array",
                "minItems": 1,
                "maxItems": 5,
                "items": {
                    "type": "string",
                    "title": " ",
                    "default": ""
                },
                "additionalItems":false
            }
        }
    };
});
