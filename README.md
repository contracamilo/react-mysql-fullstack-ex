# Sistema de Gestión de Empleados

Este proyecto es una aplicación web fullstack para la gestión de empleados, desarrollada con React, Node.js, Express y MySQL.

## 🚀 Características

- ✨ Interfaz moderna y responsive con Material-UI
- 📱 Diseño adaptable para dispositivos móviles
- 🔍 Búsqueda y filtrado de empleados en tiempo real
- ✏️ Operaciones CRUD completas para empleados
- 🎨 Tema personalizado con tonos rojos, negro y gris
- 🔒 Validación de datos en frontend y backend
- 📝 Gestión de estado con React Query
- 🔄 Actualizaciones en tiempo real de la interfaz

## 🏗️ Arquitectura del Proyecto

### Frontend (React + TypeScript)

```
client/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── common/        # Componentes genéricos
│   │   └── employees/     # Componentes específicos de empleados
│   ├── layouts/           # Layouts y estructuras de página
│   ├── pages/             # Componentes de página
│   ├── services/          # Servicios de API
│   ├── types/             # Definiciones de tipos TypeScript
│   └── App.tsx           # Punto de entrada de la aplicación
```

#### Patrones de Diseño Frontend

1. **Arquitectura por Componentes**
   - Componentes reutilizables y modulares
   - Separación clara de responsabilidades
   - Uso de props y tipos TypeScript para la comunicación entre componentes

2. **Gestión de Estado**
   - React Query para el estado del servidor
   - Estado local con useState para UI
   - Caché y revalidación automática de datos

3. **Patrones de Diseño de Componentes**
   - Container/Presentational Pattern
   - Render Props Pattern (en diálogos)
   - Compound Components (en formularios)

4. **Manejo de Formularios**
   - Validación en tiempo real
   - Estado controlado
   - Manejo de errores y feedback visual

### Backend (Node.js + Express + TypeScript)

```
server/
├── src/
│   ├── controllers/       # Controladores de la API
│   ├── routes/           # Definición de rutas
│   ├── db/               # Configuración de base de datos
│   ├── types/            # Tipos TypeScript
│   └── index.ts         # Punto de entrada del servidor
```

#### Patrones de Diseño Backend

1. **Arquitectura MVC**
   - Modelos: Representación de datos y lógica de negocio
   - Vistas: Manejadas por el frontend
   - Controladores: Lógica de la API

2. **Middleware Pattern**
   - Validación de datos
   - Manejo de errores
   - Logging

3. **Repository Pattern**
   - Abstracción de la capa de datos
   - Queries SQL centralizadas
   - Manejo de conexiones a la base de datos

## 💾 Base de Datos

### Estructura MySQL

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Índices y Constraints
- Primary Key en `id`
- Índice UNIQUE en `email`
- Timestamps automáticos para auditoría

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Instala las dependencias:
   ```bash
   npm install        # Instala dependencias del proyecto principal
   cd client && npm install  # Instala dependencias del frontend
   cd ../server && npm install  # Instala dependencias del backend
   ```

3. Configura la base de datos:
   - Crea una base de datos MySQL
   - Copia `.env.example` a `.env`
   - Actualiza las variables de entorno

4. Inicia la aplicación:
   ```bash
   npm start  # Inicia tanto el frontend como el backend
   ```

## 🔐 Variables de Entorno

```env
# Backend
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=employee_db
PORT=3000

# Frontend
VITE_API_URL=http://localhost:3000/api
```

## 📚 Patrones de Diseño Utilizados

### Frontend

1. **Compound Components**
   ```typescript
   // Ejemplo en formularios
   <EmployeeForm>
     <TextField />
     <SelectField />
     <Button />
   </EmployeeForm>
   ```

2. **Observer Pattern (React Query)**
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['employees'],
     queryFn: getEmployees
   });
   ```

3. **Render Props**
   ```typescript
   <ConfirmationDialog
     render={(onConfirm) => (
       <Button onClick={onConfirm}>Confirmar</Button>
     )}
   />
   ```

### Backend

1. **Middleware Pattern**
   ```typescript
   app.use(errorHandler);
   app.use(requestLogger);
   ```

2. **Repository Pattern**
   ```typescript
   class EmployeeRepository {
     async findAll();
     async findById(id: number);
     async create(data: Employee);
     async update(id: number, data: Partial<Employee>);
     async delete(id: number);
   }
   ```

## 📖 Tutorial de Uso

### 1. Página Principal
- Al iniciar la aplicación, serás redirigido a la lista de empleados
- El menú lateral permite navegar entre las diferentes secciones
- En dispositivos móviles, usa el botón de menú para acceder a la navegación

### 2. Lista de Empleados
- Visualiza todos los empleados registrados
- Utiliza la barra de búsqueda para filtrar empleados
- Acciones disponibles por empleado:
  - 📝 Editar información
  - 🗑️ Eliminar registro
  - 👁️ Ver detalles

### 3. Registro de Empleados
- Accede desde el menú lateral "Register Employee"
- Completa el formulario con los datos requeridos:
  - Nombre
  - Apellido
  - Email
  - Teléfono
  - Departamento
- Los campos son validados automáticamente
- Recibe confirmación al guardar exitosamente

### 4. Edición de Empleados
- Selecciona el botón de editar en la lista
- Modifica los campos necesarios
- Guarda los cambios o cancela la operación

### 5. Eliminación de Empleados
- Usa el botón de eliminar en la lista
- Confirma la acción en el diálogo de confirmación
- La lista se actualiza automáticamente

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del repositorio
2. Crea una nueva rama
3. Realiza tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📞 Soporte

Si tienes preguntas o encuentras algún problema:

- Abre un issue en el repositorio
- Envía un email a [TU_EMAIL]

## ✨ Agradecimientos

- Material-UI por su excelente biblioteca de componentes
- React Query por la gestión del estado del servidor
- La comunidad de React y Node.js por sus recursos y documentación 