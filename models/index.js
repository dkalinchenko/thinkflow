const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const logger = require('../utils/logger');

// Initialize Sequelize with SQLite for development and PostgreSQL for production
let sequelize;
if (process.env.NODE_ENV === 'production') {
  // Use PostgreSQL in production (Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Use SQLite in development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    },
    dialectOptions: {
      timeout: 15000
    }
  });
}

// Test connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('DATABASE', 'Connection has been established successfully');
  })
  .catch(err => {
    logger.error('DATABASE', 'Unable to connect to the database', err);
  });

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Decision model
const Decision = sequelize.define('Decision', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criteria: {
    type: DataTypes.TEXT, // Store as JSON string
    get() {
      const value = this.getDataValue('criteria');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('criteria', JSON.stringify(value));
    }
  },
  weights: {
    type: DataTypes.TEXT, // Store as JSON string
    get() {
      const value = this.getDataValue('weights');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('weights', JSON.stringify(value));
    }
  },
  alternatives: {
    type: DataTypes.TEXT, // Store as JSON string
    get() {
      const value = this.getDataValue('alternatives');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('alternatives', JSON.stringify(value));
    }
  },
  evaluations: {
    type: DataTypes.TEXT, // Store as JSON string
    get() {
      const value = this.getDataValue('evaluations');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('evaluations', JSON.stringify(value));
    }
  },
  results: {
    type: DataTypes.TEXT, // Store as JSON string
    get() {
      const value = this.getDataValue('results');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('results', JSON.stringify(value));
    }
  }
});

// Define relationships
User.hasMany(Decision, { foreignKey: 'userId' });
Decision.belongsTo(User, { foreignKey: 'userId' });

// Sync models with database
const initDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    logger.info('DATABASE', 'Database synchronized successfully');
    return true;
  } catch (error) {
    logger.error('DATABASE', 'Error synchronizing database', error);
    
    // Try to recover by creating a new database file if it doesn't exist
    const fs = require('fs');
    const dbPath = path.join(__dirname, '../database.sqlite');
    
    if (!fs.existsSync(dbPath)) {
      logger.warn('DATABASE', 'Database file not found, creating a new one');
      try {
        fs.writeFileSync(dbPath, '');
        await sequelize.sync({ force: true });
        logger.info('DATABASE', 'Created new database successfully');
        return true;
      } catch (createError) {
        logger.error('DATABASE', 'Failed to create new database', createError);
        return false;
      }
    }
    
    return false;
  }
};

module.exports = {
  sequelize,
  User,
  Decision,
  initDatabase
}; 