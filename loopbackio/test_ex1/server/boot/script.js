module.export = function(){
    //An ACL model connects principals to protected resources
    /**
     * The system grants permissions to principals (users or applications, that can be grouped into roles).

    Protected resources: the model data and operations (model/property/method/relation)
    Whether a given client application or user is allowed to access (read, write, or execute) the protected resource.

     */
    ACL.create({
        principalType: ACL.USER, 
        principalId: 'u001', 
        model: 'User', 
        property: ACL.ALL,
        accessType: ACL.ALL, 
        permission: ACL.ALLOW}, function (err, acl) {
            ACL.create({
                principalType: ACL.USER, 
                principalId: 'u001', 
                model: 'User', 
                property: ACL.ALL,
                accessType: ACL.READ, 
                permission: ACL.DENY}, function (err, acl) {
                }
            );
        }
    );
    
}