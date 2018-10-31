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
            console.log(shifts);
            
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
            // let users = req.params.name;
            // let Name = names.toUpperCase();

            // let daysSelected = await service.insertwaiterShifts(users);
            // console.log(daysSelected);
            
            res.render('waitersList');
        } catch(err){

        }
    }
    return {
        getRoute,
        getPost,
        getShifts
    }
}