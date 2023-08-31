### express-starter

#### Un proyecto de inicio para construir una API REST con Express, Sequelize, PostgresSQL, con soporte para autenticación JWT y manejo de subida de archivos.

![GitHub](https://img.shields.io/github/license/or-abdillh/express-starter?style=for-the-badge)
![Tamaño del código en bytes](https://img.shields.io/github/languages/code-size/or-abdillh/express-starter?style=for-the-badge)
![Actividad en GitHub](https://img.shields.io/github/last-commit/or-abdillh/express-starter/main?style=for-the-badge)

## Documentación

### Comenzando

Sigue los pasos a continuación para iniciar la aplicación:

1. Clona este repositorio utilizando el siguiente comando en tu terminal: <code>git clone https://github.com/or-abdillh/express-starter.git</code>
2. Cambia al directorio de la aplicación con el siguiente comando: <code>cd express-starter</code>
3. Instala los módulos de Node con el siguiente comando: <code>npm install</code>

### Entorno y Base de Datos

Esta aplicación utiliza PostgreSQL como sistema de gestión de bases de datos (DBMS). Debes configurar tu información de conexión en el archivo `.env`.

1. En el directorio actual, copia el archivo `.env.example` a `.env`: `cp .env.example .env`
2. Edita el archivo `.env` con la configuración de tu conexión:
   ```env
   DATABASE_URL=postgresql://nombre-de-usuario:contraseña@host:puerto/mi-base-de-datos
   SECRET_KEY=una_cadena_aleatoria_para_JWT
   ```
3. Ejecuta el servicio de PostgreSQL en tu computadora o utiliza este comando `npm run postgres-start`, equivalente a `pg_ctl -D ~/pg start`
4. Inicia sesión en la terminal de PostgreSQL y crea una nueva base de datos con el nombre **blog**
5. En el directorio actual, ejecuta los comandos `npm run migrate` y `npm run seeding`
6. Antes de ejecutar el comando en el punto 5, tu computadora debe tener instalado sequelize-cli o puedes instalarlo manualmente con el comando `npm i sequelize-cli --save-dev`

### Verificar la conexión

En el directorio actual, inicia la aplicación con el comando `npm run dev`
![npm run dev](./public/run-dev.jpg)

### Documentación de la API

Este estudio de caso de la aplicación es un blog simple, donde los usuarios pueden crear una cuenta e iniciar sesión para poder publicar artículos, editar artículos o eliminar artículos. Si un usuario no desea registrarse, puede iniciar sesión como invitado y solo podrá ver los artículos que se han publicado.

Esta es la documentación sobre la API que se ha creado.

#### Endpoint

`http://localhost:8000`

#### `/` `GET`

Ruta de prueba de la aplicación o ruta de índice <br>
Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Esta es una respuesta de ejemplo de tu aplicación",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/users` `GET`

Obtener todos los usuarios <br>
Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": {
    "users": [
      {
        "username": "fulan12",
        "fullname": "Fulanah",
        "createdAt": "2022-05-26T11:38:12.544Z"
      }
    ]
  },
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

##### `/articles` `GET` or `/articles?title=keyword` `GET`

Obtener todos los artículos o por consulta <br>
Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": {
    "articles": [
      {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "lorem ipsum sit amet dolor",
        "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
        "createdAt": "2022-05-26T11:38:12.544Z",
        "user": {
          "fullname": "Sandhika Galih"
        }
      }
    ]
  },
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No encontrado",
  "results": "Lo siento, artículo no encontrado",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/articles/:username` `GET`

Obtener artículo por nombre de usuario o autor del artículo <br>
Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": {
    "articles": [
      {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "lorem ipsum sit amet dolor",
        "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
        "createdAt": "2022-05-26T11:38:12.544Z",
        "user": {
          "fullname": "Sandhika Galih"
        }
      }
    ]
  },
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No encontrado",
  "results": "Lo siento, artículo no encontrado",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/article/:id` `GET`

Obtener artículo por ID del artículo <br>
Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": {
    "article": {
      "id": 1,
      "title": "Lorem ipsum",
      "content": "lorem ipsum sit amet dolor",
      "image": "http://localhost:8000/images/IMG-2092302302908343.jpg",
      "createdAt": "2022-05-26T11:38:12.544Z"
    }
  },
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No encontrado",
  "results": "Lo siento, artículo no encontrado",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/user/login` `POST`

Obtener token JWT al iniciar sesión <br>
Cuerpo de la solicitud:

```javascript
{
	usuario: 'TU NOMBRE DE USUARIO',
	contraseña: 'TU CONTRASEÑA'
}
```

Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": {
    "token": "TU_TOKEN_JWT_AQUÍ"
  },
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No encontrado",
  "results": "Lo siento, no se encontró la cuenta o tu nombre de usuario y contraseña son incorrectos",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/user/register` `POST`

Crear una nueva cuenta <br>
Cuerpo de la solicitud :

```javascript
{
	usuario: 'TU NOMBRE DE USUARIO',
	contraseña: 'TU CONTRASEÑA',
	nombrecompleto: 'TU NOMBRE COMPLETO',
	contraseña: 'TU CONTRASEÑA'
}
```

Respuesta :

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Cuenta creada exitosamente para Fulanah",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 403,
  "message": "Prohibido",
  "results": "El nombre de usuario ya existe",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/user/verify` `GET`

Verificación del token JWT <br>
Encabezados de la solicitud :

```javascript
{
  encabezados: {
    token: "TU TOKEN";
  }
}
```

Respuesta :

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Tu sesión de inicio de sesión es válida",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 403,
  "message": "Prohibido",
  "results": "Tu sesión de inicio de sesión no es válida",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/user/article/:username` `POST`

Publicar un nuevo artículo <br>
Encabezados de la solicitud :

```javascript
{
  encabezados: {
    token: "TU TOKEN";
  }
}
```

Request body :

```javascript
{
	title: 'YOUR TITTLE',
	content: 'THE CONTENT FROM YOUR ARTICLE'
}
```

Request files :

```javascript
{
  files: {
    image: filesInputElement;
  }
}
```

Response :

```json
{
  "status": true,
  "code": 200,
  "message": "Success",
  "results": "Success posting new article",
  "createAt": "5/27/2022, 5:00:06 PM"
}
```

#### `/user/article/:username` `PUT`

Change or update current article <br>
Request header :

```javascript
{
  headers: {
    token: "YOUR TOKEN";
  }
}
```

Cuerpo de la solicitud :

```javascript
{
	título: 'TU TÍTULO',
	contenido: 'EL CONTENIDO DE TU ARTÍCULO'
}
```

Archivos de solicitud [reupload image] :

```javascript
{
  archivos: {
    imagen: elementoDeEntradaDeArchivos;
  }
}
```

Respuesta :

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Artículo publicado exitosamente",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Actualización del artículo exitosa",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Actualización del artículo exitosa, pero no se pudo eliminar la antigua imagen del servidor",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No Encontrado",
  "results": "Artículo no encontrado",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

#### `/user/article/:username` `DELETE`

Eliminar artículo de la base de datos utilizando el ID del artículo <br>
Encabezado de la solicitud:

```javascript
{
  headers: {
    token: "TU TOKEN";
  }
}
```

Cuerpo de la solicitud:

```javascript
{
  id: 1;
}
```

Respuesta:

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Artículo eliminado con éxito junto con la imagen del servidor",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": true,
  "code": 200,
  "message": "Éxito",
  "results": "Actualización del artículo exitosa, pero no se pudo eliminar la imagen del servidor",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

```json
{
  "status": false,
  "code": 404,
  "message": "No Encontrado",
  "results": "Artículo no encontrado",
  "createAt": "27/05/2022, 5:00:06 PM"
}
```

### Middlewares

Esta aplicación tiene middlewares para verificar el token JWT del usuario al acceder a recursos sensibles.

Además de la verificación del token, esta aplicación también tiene una herramienta de middleware para registrar cada solicitud entrante y guardarla en forma de archivo de texto.

#### 1. Autenticación JWT

Solo funciona en rutas sensibles, es decir, `user/article`. Cada solicitud que entra en esa ruta debe tener un token de acceso en los encabezados.

Respuesta:

```json
{
  "status": false,
  "code": 403,
  "message": "Prohibido",
  "results": "El token no puede estar vacío"
}
```

```json
{
  "status": false,
  "code": 403,
  "message": "Prohibido",
  "results": "Acceso no permitido, tu token no es válido"
}
```

```json
{
  "status": false,
  "code": 403,
  "message": "Prohibido",
  "results": "No puedes acceder a recursos fuera de tu cuenta"
}
```

#### 2. Registro de actividad

Cada ruta que se accede automáticamente hará que la aplicación imprima información en la terminal

```bash
[27/05/2022, 5:41:01 PM] [403 - Prohibido] /user/register POST 96,791ms
[27/05/2022, 5:53:41 PM] [200 - OK] /user/article/hans4x POST 77,54ms
[27/05/2022, 6:18:06 PM] [404 - No Encontrado] /article/1 GET 29,043ms
```

La aplicación también guardará automáticamente los resultados del registro en un archivo en el directorio `logs`, y el sistema creará automáticamente un nuevo archivo de registro cada día.

```bash
~/express-starter/logs/ $ ls
example-log.txt  log-file-2022-26-5.txt  log-file-2022-27-5.txt
```

### Directorio público

Para acceder al archivo cargado, utiliza la ruta `http://localhost:8000/images`, que se relaciona con el directorio `public/images`.
Ejemplo:

```
http://localhost:8000/images/IMG-203820402380.png
```

Si deseas agregar una nueva ruta pública en el directorio público, agrégala al archivo `app/index.js`:
Code :

```javascript
app.use(
  "/TU-RUTA-PERSONALIZADA",
  express.static(path.join(process.cwd(), "/public/NUEVO-DIRECTORIO"))
);
```

```
http://localhost:8000/TU-RUTA-PERSONALIZADA
```

### Nombre de archivo cargado

Cada nuevo archivo que llega se renombrará automáticamente utilizando la fórmula:

```javascript
const formato = "png";
const nombreArchivo = `IMG-${new Date().getTime()}.${formato}`;
```

### Demo

He creado una aplicación front-end simple como ejemplo de cómo implementar la API, la cual está disponible aquí:
[próximamente](http://github.com/or-abdillh/express-starter)

### Gracias

Apóyame con una taza de café y otros refrigerios [aquí ..](https://saweria.co/orabdillh) <br>
No olvides darme una estrella en este repositorio 🙏🏻🙏🏻 <br>
Mira mis otros proyectos en Instagram [@or.abdillh](http://www.instagram.com/or.abdillh) <br>

[Oka R Abdillah ](http://github.com/or-abdillh)
<br>
Última edición: 28/05/2022
