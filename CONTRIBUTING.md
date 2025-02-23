# Contribuyendo a Gradiant HackUDC

¡Gracias por tu interés en contribuir a Gradiant HackUDC! Este documento proporciona las pautas para contribuir al proyecto.

## Configuración del Entorno de Desarrollo

### Prerrequisitos
- Python 3.7 o superior
- Node.js y npm
- Git

### Configuración Local
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/gradiant-hackudc25.git
cd gradiant-hackudc25
```

2. Configura el backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

3. Configura el frontend:
```bash
cd ../frontend
npm install
export NODE_OPTIONS=--openssl-legacy-provider && npm start
```

## Estructura del Proyecto

```
gradiant-hackudc25/
├── backend/
│   ├── IA/                 # Módulos de IA y procesamiento
│   ├── database/          # Base de datos y modelos
│   └── app.py            # API principal FastAPI
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── services/     # Servicios API
│   │   └── styles/       # Archivos CSS
│   └── public/           # Archivos estáticos
```

## Guías de Contribución

### Flujo de Trabajo Git
1. Crea una rama para tu contribución:
```bash
git checkout -b feature/nombre-caracteristica
```

2. Realiza tus cambios siguiendo las convenciones de código
3. Haz commits con mensajes descriptivos:
```bash
git commit -m "feat: añade nueva funcionalidad X"
```

4. Sube tus cambios y crea un Pull Request

### Convenciones de Código

#### Python (Backend)
- Sigue PEP 8
- Usa type hints
- Documenta las funciones con docstrings
- Mantén las funciones pequeñas y con responsabilidad única

#### JavaScript/React (Frontend)
- Usa ES6+
- Componentes funcionales con hooks
- Props typing
- Nombres descriptivos para variables y funciones

### Commits
Seguimos la convención de Conventional Commits:
- `feat:` nuevas características
- `fix:` correcciones de bugs
- `docs:` cambios en documentación
- `style:` cambios que no afectan el código
- `refactor:` refactorización de código
- `test:` añadir o modificar tests

## Testing

### Backend
```bash
cd backend
python -m pytest
```

### Frontend
```bash
cd frontend
npm test
```

## Pull Requests

1. Actualiza tu rama con main:
```bash
git fetch origin
git rebase origin/main
```

2. Asegúrate de que los tests pasan
3. Actualiza la documentación si es necesario
4. Describe tus cambios en el PR
5. Referencia cualquier issue relacionado

## Reportando Bugs

Al reportar bugs, incluye:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si aplica
- Entorno (OS, navegador, versiones)

## Contacto

Para preguntas o problemas:
- Abre un issue
- Contacta con los mantenedores:
  - [Nombre del mantenedor](mailto:email@example.com)

## Licencia

Al contribuir, aceptas que tus contribuciones estarán bajo la misma licencia MIT del proyecto.