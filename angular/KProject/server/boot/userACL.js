module.exports = function (app) {
    var arr = [
        {
            "accessType": "EXECUTE",
            "principalType": "ROLE",
            "principalId": "$everyone",
            "permission": "ALLOW",
            "property": "login"
        },
        {
            "accessType": "EXECUTE",
            "principalType": "ROLE",
            "principalId": "$authenticated",
            "permission": "ALLOW",
            "property": "logout"
        },
        {
            "accessType": "EXECUTE",
            "principalType": "ROLE",
            "principalId": "$authenticated",
            "permission": "ALLOW",
            "property": "findOne"
        }
    ];

    app.models.User.settings.acls = arr;
}