## BON APPETIT

### Repositorio Backend

---

### archivo .env:

### (user, password y host de postgres)

DB_USER=

DB_PASSWORD=

DB_HOST=

FLUJO DE CREACION DE USUARIO Y LOGGIN (POR CORREO ELECTRONICO)

RUTA: users/create

ENVIO DE INFORMACION POR BODY:

{
"email": "beloqui.cesar@gmail.com",
"password": "1234567",
"displayName": "Cesar"
}

1. Ingreso de correo, contraseña y confirmación, nombre (opcional)
2. envio de esa informacion al servidor por body
3. Si todo esta ok el servidor responde:
   {
   "user": {
   "uid": "z8GHXIr6NdXt7iBrVdq2hwR5dp52",
   "email": "beloqui.cesar@gmail.com",
   "emailVerified": false,
   "displayName": "Cesar",
   "disabled": false,
   "metadata": {
   "lastSignInTime": null,
   "creationTime": "Thu, 07 Sep 2023 00:25:47 GMT"
   },
   "tokensValidAfterTime": "Thu, 07 Sep 2023 00:25:47 GMT",
   "providerData": [
   {
   "uid": "beloqui.cesar@gmail.com",
   "displayName": "Cesar",
   "email": "beloqui.cesar@gmail.com",
   "providerId": "password"
   }
   ]
   },
   "message": "Usuario creado y correo de verificación enviado.",
   "userToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5NDA0NjM1MCwiZXhwIjoxNjk0MDQ5OTUwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1qcjl6ZEBib24tYXBwZXRpdC03YWQzYy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWpyOXpkQGJvbi1hcHBldGl0LTdhZDNjLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiejhHSFhJcjZOZFh0N2lCclZkcTJod1I1ZHA1MiJ9.VSAHo-S-j0ktSLZh2SXxQyyAPIilbS_LgRkXDYcp4FavSaGn6VR0jXg_tVsY6NsRiVtR1Qel6qDC-2iOlrAuyjwBOgeyMMojwKGpW78CeXBfh1JFVD-QOgvqFGDSwBu10_z5JqFOVfY_VgQulnE-Bs2mNKxvHSAAn8JdynaRN3w9ooTYpY-WgzB9D5kd5xoSAiTyb_8GWdVSoOhkWaKI-WVgnlo68jaIwryQ0OOkzvYs2wO6bbI1J-cQh6agIQ7hDXRMI-65XC9eUy8TVX0tASkpe7TmwndCMqnUrgRzRxsHWbmw-giElrlGzDCLMLFzXa9CEoCXGjCiLvl2MMefSg"
   }

4. el user token debe ser guardado en el local storage, para que cuando el usuario regrese de confirmar su correo, se inicie sesion automaticamente y el front haga la solicitud de la informacion del usuario si se confirmó o no el usuario, esa información se encuentra en: object.user.emailVerified, si este valor es true se confirmo, si es false se deberá pedir al usuario que confirme su correo para continuar con la compra
