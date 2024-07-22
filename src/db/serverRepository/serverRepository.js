class Servers{
    static async getIdServerByIpAddress(instance, ipAddress){
        return await instance
            .select("id")
            .from("servers")
            .where({url: ipAddress});
    } 

    static async getAllServers(instance){
        return await instance
            .select("id", "name", "url")
            .from("servers");
    }
}

module.exports = Servers;