const pool = require('./database');

// Define a function called create that takes in description as its argument and creates an entry in the todo database table. Inside the function, use the .query() method on pool to pass in the below SQL query:

const create = async (description) => {
    const { rows } = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
      description,
      ]
  );
  return rows[0];
};

// Next, we’ll create a function called get that will read all the tasks in the todo table. 
// Similar to how we created the create() function, use the .query() method on the pool object.
// Inside the .query() method, pass in the below SQL code to select all items in the todo table:

const get = async () => {
    const { rows } = await pool.query('SELECT * FROM todo');
    return rows;
};

// Finally, create a function called remove that takes id as its argument to search for a to-do item to remove from the todo table. 
// We will use the .query() method here as well. 
// Inside the argument of the .query() method, pass in the below SQL code to find an item where todo_id of the todo table is equal to id:

const remove = async (id) => {
    const { rows } = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [ id ]);
};

module.exports = {
    create,
    get,
    remove,
};