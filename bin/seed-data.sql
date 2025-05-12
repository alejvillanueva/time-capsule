-- This clears tables and starts sequence for ids again
TRUNCATE capsules CASCADE;
ALTER SEQUENCE capsules_id_seq RESTART;
ALTER SEQUENCE memories_id_seq RESTART;

-- -- Capsule ID 1 - All Values
INSERT INTO capsules (
	author, 
	cover_art, 
	created_on, 
	edit_by, 
	open_date, 
	password, 
	title, 
	updated_on
	) VALUES (
		'Alejandra Villanueva',
		'https://picsum.photos/600/400',
		'2025-05-03 07:07:07 America/New_York', -- Created
		'2025-05-10 00:00:00 America/New_York', -- Edit By
		'2025-05-23 13:00:00 America/New_York', -- Open Date
		'memorypassword',
		'April Memories',
		'2025-05-04 07:15:00 America/New_York'
	);

-- Capsule ID 2 - No Password
INSERT INTO capsules (
	author, 
	cover_art, 
	created_on, 
	edit_by, 
	open_date, 
	title, 
	updated_on) VALUES (
		'Freedom',
		'https://picsum.photos/600/400',
		'2024-02-01 14:17:07 America/New_York', -- Created
		'2024-03-01 00:00:00 America/New_York', -- Edit By
		'2024-05-01 13:00:00 America/New_York', -- Open Date
		'Canada Living',
		'2024-03-01 00:00:00 America/New_York' -- Updated
	);

-- Capsule ID 3 -- No Cover Art
INSERT INTO capsules (
	author, 
	created_on, 
	edit_by, 
	open_date, 
	password, 
	title, 
	updated_on) VALUES (
		'anonymous',
		'2025-01-01 00:00:00 America/New_York', -- Created
		'2025-12-01 00:00:00 America/New_York', -- Edit By
		'2026-01-01 00:00:00 America/New_York', -- Open Date
		'secret',
		'Mystery Memories',
		'2025-03-01 10:04:20 America/New_York' -- Updated
	);

-- Memories
-- Memories for Capsule 1
INSERT INTO memories (
	author,
	capsule_id,
	added_on,
	medium,
	message ) VALUES (
		'Alejandra',
		'1',
		'2025-05-07 00:00:00 America/New_York', 
		'text',
		'Today, I went on a hike!'
	);
INSERT INTO memories (
	author,
	capsule_id,
	added_on,
	medium,
	url ) VALUES (
		'Cloud',
		'1',
		'2025-05-05 21:20:20 America/New_York', 
		'image',
		'https://picsum.photos/300/200'
	);

-- Memories for Capsule 3
INSERT INTO memories (
	author,
	capsule_id,
	added_on,
	medium,
	message) VALUES (
	'Toast',
	'3',
	'2025-04-21 16:33:10 America/New_York', 
	'text',
	'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.'
);
INSERT INTO memories (
	author,
	capsule_id,
	added_on,
	medium,
	message,
	url ) VALUES (
	'Jam',
	'3',
	'2025-10-31 12:13:10 America/New_York', 
	'image',
	'Our spooky halloween costumes!',
	'https://picsum.photos/300'
	
);
INSERT INTO memories (
	author,
	capsule_id,
	added_on,
	medium,
	message,
	url ) VALUES (
	'Jam',
	'3',
	'2025-11-03 17:53:17 America/New_York', 
	'video',
	'Our cat eats a treat! Look how cute he is',
	'https://videos.pexels.com/video-files/7515833/7515833-hd_1080_1920_30fps.mp4'
);