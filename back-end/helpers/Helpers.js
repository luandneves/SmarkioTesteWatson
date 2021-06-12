class Helpers{
    existrOrEror(value){
        if(
            !value || 
            (Array.isArray(value) && value.length === 0) || 
            (typeof value === 'string' && !value.trim()) 
        ){
            return true
        }

        return false
    }
}

module.exports = new Helpers()