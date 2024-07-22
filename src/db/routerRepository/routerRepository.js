class Routers {
    static async getAllRoutersByServerId(instance, server_id){
        return await instance
                .select("id", "server_id", "name")
                .from("routers")
                .where({server_id: server_id});               
    }

    static async getIdRouterByServerIdName(instance, server_id, name){
        return await instance
                .select("id")
                .from("routers")
                .where({server_id: server_id, name: name});               
    }

    static async addRouters(instance, routers){
        await instance("routers")
             .insert(routers);
    }
}

module.exports = Routers;