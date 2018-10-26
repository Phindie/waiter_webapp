module.exports = function (service) {
    
    async function getRoute (req, res, next) {
        try{
            let user = req.params.username;
            let weekdays = await service.collectDays();
            res.render('home', {user, weekdays});
        } catch (err) {
            next(err);
        }
    }
    async function getPost (req, res, next) {
        try{

            let user = req.params.username;
            let weekdays = await service.collectDays();
            res.render('home', {user, weekdays});
        } catch(err) {

        }
    }
    async function getShifts(req, res, next) {
        try{
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