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
    async function insertShift (userId,dayId) {
        let result = await pool.query('insert into shifts (waiter_id,weekday_id) values ($1,$2)',[userId,dayId]);
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
    async function jointTables(){
        let result = await pool.query('select first_name, day from waiter join shifts ON waiter.id = shifts.waiter_id join weekdays ON shifts.weekday_id = weekdays.id ');
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
                let day  = shifts[i];
                let dayData = await selectWeekdays(day);
                let dayId = dayData[0].id;
                await insertShift(userId,dayId);

            }
         }
        //  else{
        //     let dayData = await selectWeekdays(shifts);
        //     console.log(dayData)
        //     let dayId = dayData[0].id;
        //     await insertShift(userId,dayId);
        // }
    }
    async function getDayShifts(day){
        let result = await pool.query('select * from shifts where weekday_id = $1', [day]);
        return result.rows;
    }
    async function getAllShifts(){
        let mainArray = [];
        let days = await collectDays();
        for(let i = 0 ; i < days.length ; i++){
            let map = {};
            
            let tempArray = [];
            let dayId = days[i].id;
            let dayName = days[i].day;
            let result = await getDayShifts(dayId);
            for (let j = 0 ; j < result.length ; j++){
                let nameData = await selectWaiterUsingID(result[j].waiter_id);
                let name = nameData[0].first_name;
                tempArray.push(name);
            }
            map = {
                day : dayName,
                waiters : tempArray
            }
            mainArray.push(map);
        }
        
        console.log(mainArray);
        return mainArray;
    }
    async function selectWaiterUsingID(id){
        let result = await pool.query('select * from waiter where id = $1', [id]);
        return result.rows;
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
    selectWeekdays,
    jointTables,
    getAllShifts
   }

}