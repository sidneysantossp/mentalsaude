const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing MySQL connection...');
  
  const dbConfig = {
    host: '203.161.38.188',
    port: 3306,
    user: 'anticosccb_mentalsaude',
    password: 'KmSs147258!',
    database: 'anticosccb_mentalsaude',
    connectTimeout: 5000
  };

  try {
    console.log('Attempting to connect to:', dbConfig.host, dbConfig.port);
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connection successful!');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query successful:', rows);
    
    // Test if users table exists
    const [tables] = await connection.execute('SHOW TABLES LIKE "users"');
    console.log('✅ Users table exists:', tables.length > 0);
    
    // Count users
    if (tables.length > 0) {
      const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log('✅ Total users in database:', users[0].count);
      
      // List users
      const [userList] = await connection.execute('SELECT id, email, name, created_at FROM users LIMIT 5');
      console.log('✅ Recent users:');
      userList.forEach(user => {
        console.log(`  - ${user.email} (${user.name}) - ${user.created_at}`);
      });
    }
    
    await connection.end();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();