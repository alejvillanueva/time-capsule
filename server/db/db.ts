import pg from "pg";

const { Pool } = pg;

let pool: InstanceType<typeof Pool>;

// Production
if (process.env.DATABASE_URL) {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	});
} else {
	// Development
	pool = new Pool({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		port: parseInt(process.env.DB_PORT ?? "5432"),
		user: process.env.DB_USER,
	});
}

export default pool;
