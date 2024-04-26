const InvalidInput = require('./inputError');

const validator = (values, config) => {
    if(!values)
        throw new InvalidInput("Post Payload is empty");

    for(let input in config){
        const value = values[input];
        const matcher = config[input];

        matcher.forEach(object => {
            if(object.type == 'regex'){

            }else if(object.type == 'required'){
                if(!value)
                    throw new InvalidInput(`Input "${input}" required!`);
            }
        })
    }
}
const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = {validator, makeid};