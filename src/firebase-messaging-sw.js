// // import { NotificacionesService } from "./app/core/services/notificaciones.service";

// self.addEventListener('push', function(event) {
//   event.waitUntil(
//     self.registration.pushManager.getSubscription()
//       .then(function(subscription) {
//           // Llamada a la función sendNotification() del servicio NotificacionesService
//           return fetch('https://notificaciones-vs-production.up.railway.app/send', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//           });

//       })
//       .then(function(response) {
//         // Aquí puedes realizar cualquier manipulación adicional en la respuesta
//         const title = 'Comunicacion Ejemplo Push Notificaction';
//         const options = { body: event.data.text() };
//         return self.registration.showNotification(title, options);
//       })
//       .catch(function(error) {
//         console.error('Error en el evento "push":', error);
//       })
//   );
// });


