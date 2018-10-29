module.exports = function (pool) {
    async function Workers() {
        let result = await pool.query('select * from waiter');
        
        return result.rows;
    }
    async function collectDays() {
        let result = await pool.query('select * from weekdays');
        return result.rows;
    }
   async function collectShift() {
        let result = await pool.query('select * from shifts');
        return result.rows;
    }
    async function insertUser(username){
        let result = await pool.query('insert into waiter (first_name) values ($1) ',[username])
    }
    async function insertShift (name) {
        let result = await pool.query('insert into shifts (waiter_id,weekday_id) values ($1,$2)',[userId,dayId[i]]);
        return result.rows;
    }
    async function selectWaiter(name) {
        let result = await pool.query('select * from waiter where first_name = $1', [name]);
        return result.rows;
    }

    async function selectWeekdays (name) {
        let result = await pool.query('select * from weekdays where day = $1', [name]);
        return result.rows;
    }
   //check if user if already in the database
    async function getUserId(name){
        let userData = await selectWaiter (name)
        if(userData.length ==0){
            await insertUser(name);
            let newUserData = await selectWaiter(name);
            return newUserData[0].id;
        } else{
            return userData[0].id
        }  
    }

    async function insertwaiterShifts(userId,shifts){
        let check = Array.isArray(shifts);
        if(check){
            for(let i = 0;i<shifts.length; i++){
                console.log(i);
                let days  = shifts[i];
                let dayData = await selectDay(day);
                let dayId = dayData[0].id;
                await insertShift(userId,dayId);

            }
        }else{
            let dayData = await selectDay(shifts);
            let dayId = dayData[0].id;
            await insertShift(userId,dayId);
        }
    }
    async function reset(){
        await pool.query('delete from shifts');
        await pool.query('delete from waiter');
    }



return{
    Workers,
    reset,
    collectDays,
    collectShift,
    insertUser,
    getUserId,
    selectWaiter,
    insertwaiterShifts,
    selectWeekdays 
   }

}