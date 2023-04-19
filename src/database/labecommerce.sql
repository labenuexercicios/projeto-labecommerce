CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NULL,
        description TEXT NULL,
        image_url TEXT NULL
    );

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL DEFAULT 0,
        buyer TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (purchase_id) REFERENCES purchases (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Clara Ferreira Batista",
        "clara@email.com",
        "Clara123*"
    ), (
        "u002",
        "Carlos E Abade",
        "carlos@email.com",
        "Carlos123*"
    );
INSERT INTO products (id, name, price, category, description, image_url) VALUES
  ('p001', 'Fone de Ouvido Bluetooth', 129.99, 'Acessórios', 'Fone de ouvido sem fio com microfone', 'https://example.com/fone-de-ouvido-bluetooth.jpg'),
  ('p002', 'Tênis Esportivo', 249.99, 'Roupas e calçados', 'Tênis para corrida e atividades físicas', 'https://example.com/tenis-esportivo.jpg'),
  ('p003', 'Smartphone Android', 799.99, 'Eletrônicos', 'Smartphone com sistema operacional Android', 'https://example.com/smartphone-android.jpg'),
  ('p004', 'Mochila para Notebook', 189.99, 'Acessórios', 'Mochila para notebook de até 15 polegadas', 'https://example.com/mochila-para-notebook.jpg'),
  ('p005', 'Camisa Polo', 89.99, 'Roupas e calçados', 'Camisa polo casual para uso diário', 'https://example.com/camisa-polo.jpg');
