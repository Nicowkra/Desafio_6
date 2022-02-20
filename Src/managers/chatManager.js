const { time } = require("console")
const fs = require("fs")

const path = __dirname+"/../Files/Log.JSON"

const fetch = async()=>{
    let data = await fs.promises.readFile(path, "utf-8")
    let messages = JSON.parse(data)
    return messages
}

const getTime =()=>{
    let getTime = new Date()
    let date = getTime.getDate()+"/"+(getTime.getMonth()+1)+"/"+getTime.getFullYear()
    let time = getTime.getHours()+":"+getTime.getMinutes()+":"+getTime.getSeconds()
    let dateTime = date+" "+time
    return dateTime

}


class Manager{
    
    get = async()=>{
        if(fs.existsSync(path)){
            try{
                let messages = await fetch()
    
                return messages
            }catch(error){
                return{status:"error",error,error}
            }
        }
    }   

    save = async(message)=>{
        if(fs.existsSync(path)){
        try{
            let messages = await fetch()
            if(messages.id === 0){
                const times = getTime()
                message.time = times
                message.id = 1
                await fs.promises.writeFile(path,JSON.stringify([message],null,2))
                return {status:"success",message:"message sent"} 
            }
            const times = getTime()
            message.time = times
            message.id = messages[messages.length-1].id+1
            messages.push(message)
            await fs.promises.writeFile(path,JSON.stringify(messages,null,2))
            return {status:"success",message:"message sent"}
    
        }catch(error){
        return {status:"error",error:error}
    }
    }
    message.id = 1
    const times = getTime()
    message.time = times
    await fs.promises.writeFile(path,JSON.stringify([message],null,2))
    return {status:"success",message:"Product added"}


    }

}

module.exports = Manager