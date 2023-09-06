const handleVerifyEmail = (object) => { 
    const { mode, oobCode, lang } = object
    return { mode, oobCode, lang }
 }

module.exports = handleVerifyEmail