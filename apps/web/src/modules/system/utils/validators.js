
export const getInvalidRequiredFields = (object, fields) => {
    let invalidFields = [];
    if(!object) {
        invalidFields.push('object');
    }
    
    if (fields && fields.length > 0) {
        invalidFields = invalidFields.concat(fields.filter(field => {
            if(field.indexOf('.') > -1) {
                let subFields = field.split('.');
                switch(subFields.length) {
                    case 4:
                        return !object[subFields[0]][subFields[1]][subFields[2]][subFields[3]];
                    case 3: 
                        return !object[subFields[0]][subFields[1]][subFields[2]];
                    case 2:
                    default:
                        return !object[subFields[0]][subFields[1]];
                }
            }
            return !object[field];
        }));
    }

    return invalidFields.length === 0 ? null : invalidFields;
};