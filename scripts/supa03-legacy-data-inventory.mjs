import mysql from "mysql2/promise";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL é obrigatória para o inventário do legado.");
}

const tables = [
  "articleVersions",
  "assessmentAnswers",
  "assessmentAttempts",
  "assessmentOptions",
  "assessmentQuestions",
  "assessments",
  "contentBriefs",
  "contentEvidence",
  "contentOpportunities",
  "internalLinksGraph",
  "publicationGates",
  "recommendations",
  "userProfiles",
  "users",
];

const connection = await mysql.createConnection(connectionString);

try {
  const rowCounts = {};
  for (const table of tables) {
    const [rows] = await connection.query(`select count(*) as count from \`${table}\``);
    rowCounts[table] = Number(rows[0].count);
  }

  console.log(JSON.stringify({ tableCount: tables.length, rowCounts }, null, 2));
} finally {
  await connection.end();
}
