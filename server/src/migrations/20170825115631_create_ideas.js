
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('ideas', function (table) {
        table.increments()
        table.string('title')
        table.string('description')
        table.string('www')
        table.integer('votes')
        table.integer('upvotes')
        table.integer('downvotes')
        table.timestamps()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('ideas')
};
