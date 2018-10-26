const assert = require('assert');
const waiterServices = require ('../services/waiterServices');
const pg = require('pg');

const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;

if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/waiters_web';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
describe('Waiters WeApp test for both front-end and back-ends', function() {

    beforeEach(async function(){
      await pool.query('delete from shifts');
        await pool.query('delete from waiter');
    });

    it('Should show the waiter who is selected', async function () {
        let workerService = waiterServices(pool);
        let user = await workerService.selectWaiter('Phindi');
        let Phindi = user[0].first_name;
        assert.strictEqual(Phindi, 'Phindi');
    });
});