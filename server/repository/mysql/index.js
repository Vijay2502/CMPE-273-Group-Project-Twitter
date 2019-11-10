const Sequelize       = require('sequelize');
const UserModel       = require('./models/users');
const ListModel       = require('./models/lists');

  const Op = Sequelize.Op;
	const operatorsAliases = {
	    $eq: Op.eq,
	    $ne: Op.ne,
	    $gte: Op.gte,
	    $gt: Op.gt,
	    $lte: Op.lte,
	    $lt: Op.lt,
	    $not: Op.not,
	    $in: Op.in,
	    $notIn: Op.notIn,
	    $is: Op.is,
	    $like: Op.like,
	    $notLike: Op.notLike,
	    $iLike: Op.iLike,
	    $notILike: Op.notILike,
	    $regexp: Op.regexp,
	    $notRegexp: Op.notRegexp,
	    $iRegexp: Op.iRegexp,
	    $notIRegexp: Op.notIRegexp,
	    $between: Op.between,
	    $notBetween: Op.notBetween,
	    $overlap: Op.overlap,
	    $contains: Op.contains,
	    $contained: Op.contained,
	    $adjacent: Op.adjacent,
	    $strictLeft: Op.strictLeft,
	    $strictRight: Op.strictRight,
	    $noExtendRight: Op.noExtendRight,
	    $noExtendLeft: Op.noExtendLeft,
	    $and: Op.and,
	    $or: Op.or,
	    $any: Op.any,
	    $all: Op.all,
	    $values: Op.values,
	    $col: Op.col
	};

const sequelize = new Sequelize(process.env.MYSQLDB_NAME, process.env.MYSQLDB_USER, process.env.MYSQLDB_PASSWORD, {
  host: process.env.MYSQLDB_HOST,
  dialect: 'mysql',
  port: process.env.MYSQLDB_PORT,
  operatorsAliases: operatorsAliases,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize);
const List = ListModel(sequelize, Sequelize);


Item.belongsTo(User);
User.hasMany(List);



sequelize.sync({ force: process.env.SEQUELIZE_SYNC})
  .then(() => {
    console.log(`MySQL Database & tables created!`)
  })

module.exports = {
  User,
  List
}