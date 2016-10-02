module.exports = {
    messageId : 0,
    first_name : "",
    last_name : "",
    phone_number : "",
    marital_status : "",
    date_of_birth : "",
    gender : "",
    city : "",
    email : "",
    clone : function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

}
