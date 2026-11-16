# NÁCAR BEAUTY — sitio web inicial

## Cómo abrirlo en Visual Studio Code
1. Descargá y descomprimí `nacar_beauty_web.zip`.
2. Abrí la carpeta `nacar_beauty_web` desde Visual Studio Code.
3. Abrí `index.html` en el navegador. Recomendado: instalar la extensión **Live Server** y elegir “Open with Live Server”.

## Qué incluye
- Página responsive para celular, tablet y computador.
- Presentación de marca, servicios, distribuidora, catálogo, galería, valores y contacto.
- Filtros de productos por categoría.
- Bolsa visual de productos (demo).
- Formulario de solicitud de citas.
- Guarda solicitudes en `localStorage` del navegador y prepara mensaje de WhatsApp.

## Personalización obligatoria
Abrí `app.js`:
- Cambiá `BUSINESS.whatsapp` por el número real con indicativo de país, sin `+`, espacios ni guiones.
- Editá `services` con los servicios, descripciones y precios reales.
- Editá `products` con el inventario, precios y fotografías reales.
- Reemplazá imágenes de muestra por fotografías propias.
En `index.html` y `styles.css` podés reemplazar NÁCAR por el nombre definitivo y ajustar colores.

## Importante sobre las reservas
Esta versión es una **maqueta funcional de frontend**. Las citas se guardan solamente en el navegador donde se realiza la solicitud y el cliente puede enviarlas por WhatsApp. No sincroniza agendas entre varios dispositivos, no bloquea horarios, no gestiona disponibilidad real ni envía confirmaciones automáticas.

Para operar profesionalmente se debe conectar una base de datos y un backend (recomendación: Supabase), crear un panel administrativo y definir duración de cada servicio, profesionales, horarios, días no laborables, estados de reserva y políticas de cancelación. El catálogo tampoco procesa pagos en esta versión.
