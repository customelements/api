// Message erro quando não é numerico
exports.notNumber = function() {
    var obj = {};
    obj.type = 'error';
    obj.message = 'This is not number';

    return obj;
};
