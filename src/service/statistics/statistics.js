const Routers = require('../../db/routerRepository/routerRepository.js');
const RouterStatistics = require('../../db/routerStatisticsRepository/routerStatisticsRepository.js');

async function getStatistics(server){
    const instance = global.instance;

    const routers = await Routers.getAllRoutersByServerId(instance, server.id);

    const responce = await fetch(server.url); 
    let result; routers_statistics = []; 

    if(responce.status === 200){        
        const dataText = await responce.text();
        const data = JSON.parse(dataText);
        result = new Date().toISOString();
        result += `\n${server.url}`;
        
        for (const prop in data.ok){
            if(data.ok[prop]?.lastLaggy5s.length > 0 && data.ok[prop]?.lastLaggy10s.length > 0){               
                if (!routers.find(r => r.name === prop)){
                    await Routers.addRouters(instance, {server_id: server.id, name: prop.trim()});                   
                }
                const route_id = await Routers.getIdRouterByServerIdName(instance, server.id, prop.trim());
                routers_statistics.push(
                {
                    route_id: route_id[0].id, 
                    date_request: new Date().toISOString(), 
                    count_lastLaggy5s: data.ok[prop]?.lastLaggy5s.length,
                    count_lastLaggy10s: data.ok[prop]?.lastLaggy10s.length 
                });
                
                result += `\n\n${prop}:\nlastLaggy5s: ${data.ok[prop]?.lastLaggy5s.length}`;
                result += `\nlastLaggy10s: ${data.ok[prop]?.lastLaggy10s.length}`;
            }else if(data.ok[prop]?.lastLaggy5s.length > 0){          
                if (!routers.find(r => r.name === prop)){
                    await Routers.addRouters(instance, {server_id: server.id, name: prop.trim()});
                }
                const route_id = await Routers.getIdRouterByServerIdName(instance, server.id, prop.trim());
                routers_statistics.push(
                {
                    route_id: route_id[0].id, 
                    date_request: new Date().toISOString(), 
                    count_lastLaggy5s: data.ok[prop]?.lastLaggy5s.length,
                    count_lastLaggy10s: 0 
                });    
                
                result += `\n\n${prop}:\nlastLaggy5s: ${data.ok[prop]?.lastLaggy5s.length}`;
            }                
            else if(data.ok[prop]?.lastLaggy10s.length > 0){                
                if (!routers.find(r => r.name === prop)){
                    await Routers.addRouters(instance, {server_id: server.id, name: prop.trim()});
                }
                const route_id = await Routers.getIdRouterByServerIdName(instance, server.id, prop.trim());
                routers_statistics.push( 
                {
                    route_id: route_id[0].id, 
                    date_request: new Date().toISOString(), 
                    count_lastLaggy5s: 0,
                    count_lastLaggy10s: data.ok[prop]?.lastLaggy10s.length 
                });

                result += `\n\n${prop}:\nlastLaggy10s: ${data.ok[prop]?.lastLaggy10s.length}`;
            }
        }
    } 

    if(routers_statistics.length!=0){
        await RouterStatistics.addRouterStatistics(instance, routers_statistics);
    }  

    return result;
}

module.exports = getStatistics;