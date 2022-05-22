## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```
Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `proyecto`.

Como ya harán visto la mayor parte de la estructura del boiler plate fue sacada del pi, en la carpeta api, además de las carpetas que estaban
disponibles en el pi agregué trés carpetas:

- helpers
- middlewares
- controllers

En cada una de estas trés carpetas agregué una breve descripción del porque fueron agregadas y un pequeño exemplo de que tipo de código podríamos poner en las mismas.

El contenido de `client` fue creado usando Create React App, agregué las carpetas necesarias para utilizar redux y además, la carpeta assets en /client/public y la carpeta fontes en /src. Cada una de estas carpetas posee un archivo Why.txt que explica porque alas mismas fueron agregadas.
