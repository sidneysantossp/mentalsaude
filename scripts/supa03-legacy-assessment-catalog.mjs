import mysql from "mysql2/promise";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL é obrigatória para o inventário clínico do legado.");
}

const connection = await mysql.createConnection(connectionString);

try {
  const [rows] = await connection.query(`
    select
      assessments.id,
      assessments.slug,
      assessments.title,
      assessments.status,
      assessments.durationMinutes,
      assessments.scoringGuide,
      count(assessmentQuestions.id) as questionCount
    from assessments
    left join assessmentQuestions on assessmentQuestions.assessmentId = assessments.id
    group by assessments.id
    order by assessments.id asc
  `);

  const catalog = rows.map(row => ({
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    status: row.status,
    durationMinutes: Number(row.durationMinutes),
    questionCount: Number(row.questionCount),
    scoringGuide: typeof row.scoringGuide === "string" ? JSON.parse(row.scoringGuide) : row.scoringGuide ?? null,
  }));

  console.log(JSON.stringify({ assessmentCount: catalog.length, catalog }, null, 2));
} finally {
  await connection.end();
}
