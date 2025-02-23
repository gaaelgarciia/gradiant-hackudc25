# Introducción

Este proyecto es una API que permite a los usuarios interactuar con nuestro sistema de manera eficiente. A continuación, se detallan los pasos necesarios para poner en marcha la API y cómo utilizarla.

## Funcionamiento del Proyecto

El proyecto está diseñado para proporcionar una interfaz de programación de aplicaciones (API) que permite a los usuarios realizar diversas operaciones. La API está construida utilizando `FastAPI` para el backend y `Node.js` para el frontend.

## Instrucciones para Emplear la API

### Requisitos Previos

Asegúrese de tener instalados los siguientes componentes en su sistema:
- Python 3.7 o superior
- Node.js y npm

### Pasos para Iniciar la API

1. **Iniciar el Backend:**

    Para iniciar el servidor backend, ejecute el siguiente comando en su terminal:

    ```bash
    uvicorn app:app --reload
    ```

    Este comando iniciará el servidor en modo de recarga automática, lo que significa que cualquier cambio en el código se reflejará inmediatamente sin necesidad de reiniciar el servidor.

2. **Iniciar el Frontend:**

    Antes de iniciar el frontend, asegúrese de exportar la variable de entorno necesaria. Ejecute el siguiente comando:

    ```bash
    export NODE_OPTIONS=--openssl-legacy-provider && npm start
    ```

    Este comando iniciará el servidor frontend y estará listo para interactuar con el backend.

### Uso de la API

Una vez que ambos servidores estén en funcionamiento, puede comenzar a interactuar con la API utilizando las rutas y métodos definidos en la documentación del proyecto.

¡Y eso es todo! Ahora está listo para utilizar la API y explorar todas sus funcionalidades.
