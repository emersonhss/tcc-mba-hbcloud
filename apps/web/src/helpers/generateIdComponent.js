export default (prefix = 'cp_', baseValue = 100) => {
    const arr = [];
    while(arr.length < 8){
        var randomNumber = Math.floor(Math.random()*baseValue) + 1;
        if(arr.indexOf(randomNumber) > -1) continue;
        arr[arr.length] = randomNumber;
    }
    return `${prefix}${arr.slice(0,3).join('')}`
};