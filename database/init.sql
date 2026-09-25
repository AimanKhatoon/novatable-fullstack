USE novatable;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  badge VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guest_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INT NOT NULL,
  note VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name, description, category, price, badge) VALUES
('Truffle Burrata', 'Creamy burrata, heirloom tomatoes, basil oil and toasted sourdough.', 'Starters', 1850, 'Chef Pick'),
('Citrus Salmon', 'Pan-seared salmon, citrus beurre blanc, charred greens and herbs.', 'Mains', 3250, 'Popular'),
('Miso Mushroom Risotto', 'Wild mushrooms, white miso, parmesan and crispy shallots.', 'Mains', 2450, 'Vegetarian'),
('Smoked Chicken', 'Slow-smoked chicken, pepper jus, roasted roots and garden herbs.', 'Mains', 2850, NULL),
('Saffron Prawn Linguine', 'Silky saffron cream, prawns, lemon zest and chili.', 'Mains', 3150, 'Signature'),
('Dark Chocolate Torte', '70% dark chocolate, sea salt caramel and vanilla cream.', 'Desserts', 1450, NULL),
('Rosemary Fizz', 'Fresh rosemary, grapefruit, lime and sparkling water.', 'Drinks', 850, 'Fresh'),
('Espresso Tonic', 'Double espresso, citrus tonic and orange peel.', 'Drinks', 750, NULL);

