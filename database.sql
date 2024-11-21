CREATE TABLE product_history (
    id SERIAL PRIMARY KEY,
    store_id INT,
    plu VARCHAR(12),
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
