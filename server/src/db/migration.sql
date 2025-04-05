-- Eliminar la tabla existente si existe
DROP TABLE IF EXISTS employees;

-- Crear la tabla con la nueva estructura
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos datos de ejemplo
INSERT INTO employees (firstName, lastName, email, phone, department) VALUES
    ('John', 'Doe', 'john.doe@example.com', '555-0100', 'IT'),
    ('Jane', 'Smith', 'jane.smith@example.com', '555-0101', 'HR'),
    ('Michael', 'Johnson', 'michael.johnson@example.com', '555-0102', 'Finance'),
    ('Sarah', 'Williams', 'sarah.williams@example.com', '555-0103', 'Marketing'),
    ('Robert', 'Brown', 'robert.brown@example.com', '555-0104', 'Operations'); 