module.exports = function (service) {
    
    async function getRoute (req, res, next) {
        try{
            let user = req.params.username;
            await service.insertUser(user);
            let weekdays = await service.collectDays();
            res.render('home', {user, weekdays});
        } catch (err) {
            next(err);
        }
    }
    async function getPost (req, res, next) {
        try{
            let user = req.params.username;
            let shifts = req.body.shifts;
            let weekdays = await service.collectDays();
            let userId = await service.getUserId(user);
            await service.insertwaiterShifts(userId,shifts);
            res.render('home', {user, weekdays});
        } catch(err) {
            res.send(err.stack)
        }
    }
    async function getShifts(req, res, next) {
        try{
            // let nameAndDays = await service.jointTables();
            // console.log(nameAndDays);
            
            // let weekdays = await service.collectDays();
            // console.log(weekdays);
            let weekdays = await service.getAllShifts();
            res.render('waitersList', {weekdays});
        } catch(err){
            res.send(err.stack)
        }
    }
    async function resetting(req, res){
        try{
            await service.reset();
            res.redirect('days')
        } catch(err){
            res.send(err.stack)
        }
    }
    return {
        getRoute,
        getPost,
        getShifts,
        resetting
    }
}