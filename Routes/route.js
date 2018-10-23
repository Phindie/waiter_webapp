module.exports = function (employeeService, weekdaysService) {
    async function home (req, res, next) {
        try{
            let users = await employeeService.Workers();
            res.render('home', )
        } catch (err) {
            next(err);
        }
    }
    async function getRoute (req, res, next) {
        try{
            let user = req.body.username;
            let pass = parseInt(req.body.first_name);
            console.log(pass);
            let username = await employeeService.selectEmployee(user);
            let userData = await weekdaysService.allDays();
            if(user === 'waitersList' && user ==! username[0]){
                res.render('waitersList', user);
            }
            
        } catch (err) {
            next(err);
        }
    }
    async function displayDays (req, res, next) {
        try{
            res.redirect('/waitersList');
        } catch(err) {
            next(err);
        }
    }
    return {
        home,
        getRoute,
        displayDays
    }
}