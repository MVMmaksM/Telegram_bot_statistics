
async function getStatistics(ipAdress){
    const responce = await fetch(ipAdress); 
    let result;  

    if(responce.status === 200){        
        const dataText = await responce.text();
        const data = JSON.parse(dataText);
        result = `Адрес сервера: ${ipAdress}`;
        
        for (const prop in data.ok){
            if(data.ok[prop]?.lastLaggy5s.length > 0 && data.ok[prop]?.lastLaggy10s.length > 0){
                result += `\n\n${prop}:\nlastLaggy5s: ${data.ok[prop]?.lastLaggy5s.length}`;
                result += `\nlastLaggy10s: ${data.ok[prop]?.lastLaggy10s.length}`;
            }else if(data.ok[prop]?.lastLaggy5s.length > 0)
                result += `\n\n${prop}:\nlastLaggy5s: ${data.ok[prop]?.lastLaggy5s.length}`;
            else if(data.ok[prop]?.lastLaggy10s.length > 0){
                result += `\n\n${prop}:\nlastLaggy10s: ${data.ok[prop]?.lastLaggy10s.length}`;
            }
        }
    } 
    
    if(result === `Адрес сервера: ${ipAdress}`)
        result = "Not laggy";
    
    return result;
}

module.exports = getStatistics;