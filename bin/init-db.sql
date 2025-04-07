CREATE TYPE mediums AS ENUM('text', 'image', 'video');

CREATE TABLE memories (
	id SERIAL PRIMARY KEY,
	author TEXT,
	medium mediums,
	message TEXT, 
	url TEXT, 
	added_on TIMESTAMPTZ,
	capsule_id INT,
	FOREIGN KEY (capsule_id) REFERENCES capsules(id) ON DELETE CASCADE
);

CREATE TABLE capsules (
	id SERIAL PRIMARY KEY,
	title TEXT,
	author TEXT, 
	cover_art TEXT,
	password TEXT,
	open_date TIMESTAMPTZ,
	edit_by TIMESTAMPTZ,
	created_on TIMESTAMPTZ, 
	updated_on TIMESTAMPTZ
);