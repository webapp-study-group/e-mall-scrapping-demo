import { Knex } from 'knex'

// prettier-ignore
export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('category_1'))) {
    await knex.schema.createTable('category_1', table => {
      table.increments('id')
      table.text('name').notNullable()
      table.text('slug').notNullable()
      table.integer('last_check_time').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('category_2'))) {
    await knex.schema.createTable('category_2', table => {
      table.increments('id')
      table.integer('category_1_id').unsigned().notNullable().references('category_1.id')
      table.text('name').notNullable()
      table.text('slug').notNullable()
      table.integer('last_check_time').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('category_3'))) {
    await knex.schema.createTable('category_3', table => {
      table.increments('id')
      table.integer('category_2_id').unsigned().notNullable().references('category_2.id')
      table.text('name').notNullable()
      table.text('slug').notNullable()
      table.integer('last_check_time').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('category_4'))) {
    await knex.schema.createTable('category_4', table => {
      table.increments('id')
      table.integer('category_3_id').unsigned().notNullable().references('category_3.id')
      table.text('name').notNullable()
      table.text('slug').notNullable()
      table.integer('last_check_time').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('product'))) {
    await knex.schema.createTable('product', table => {
      table.increments('id')
      table.integer('category_4_id').unsigned().notNullable().references('category_4.id')
      table.text('name').notNullable()
      table.text('image_filename').notNullable()
      table.text('unit').nullable()
      table.specificType('price', 'real').notNullable()
      table.specificType('original_price', 'real').nullable()
      table.text('sold').notNullable()
      table.specificType('star', 'real').notNullable()
      table.integer('reviews').notNullable()
      table.text('remark').nullable()
      table.integer('last_check_time').notNullable()
      table.timestamps(false, true)
    })
  }
}

// prettier-ignore
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('product')
  await knex.schema.dropTableIfExists('category_4')
  await knex.schema.dropTableIfExists('category_3')
  await knex.schema.dropTableIfExists('category_2')
  await knex.schema.dropTableIfExists('category_1')
}
