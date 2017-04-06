exports.up = function(knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").primary().unique();
		table.string("email").unique();
		table.string("password");
		table.string("username").unique();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable("users");
};
