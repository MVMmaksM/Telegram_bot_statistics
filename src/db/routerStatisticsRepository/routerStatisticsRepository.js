class RouterStatistics {
    static async addRouterStatistics(instance, routerStatistics){
        await instance("routers_statistics")
              .insert(routerStatistics);
    }
}

module.exports = RouterStatistics;