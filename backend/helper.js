const getNewFileName = (filename) =>{
    return (Math.random()*1000) + (new Date().getTime()) + filename
}


module.exports = {getNewFileName}