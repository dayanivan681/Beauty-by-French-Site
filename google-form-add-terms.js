// ============================================================
// Google Apps Script — Agregar Términos y Condiciones al Form
// ============================================================
// 1. Ve a https://script.google.com
// 2. Abre el mismo proyecto (o crea uno nuevo)
// 3. Reemplaza el código con este
// 4. Haz clic en ▶ Ejecutar (función: agregarTerminos)
// 5. Autoriza permisos si se pide
// ============================================================

function agregarTerminos() {
  var form = FormApp.openById('1-odxOchi5kOV9UOfYNk1rX9EpZgWkn-WFS0J-AntcLw');

  // Sección de Términos y Condiciones
  form.addSectionHeaderItem()
    .setTitle('TÉRMINOS & CONDICIONES - BEAUTY BY FRENCH')
    .setHelpText(
      'Al reservar y asistir a su cita en Beauty by French, usted acepta los siguientes términos y condiciones:\n\n' +

      '📷 Grabación de video y fotografía\n' +
      'Con el propósito de educación profesional, documentación de procesos, mercadeo y creación de contenido para redes sociales y plataformas educativas, en este salón se realizarán grabación y fotografías en todo momento durante el servicio de ser necesarios.\n\n' +

      '🎬 Uso del material audiovisual\n' +
      'El material grabado será utilizado para redes en forma educativa y promocional del salón, nunca se compartirá información personal del cliente de no ser autorizada.\n\n' +

      '✅ Consentimiento Implícito\n' +
      'Al permanecer en las instalaciones y recibir el servicio, el cliente autoriza y otorga consentimiento para el uso de estas imágenes y videos con los fines antes mencionados.\n\n' +

      '🚫 Solicitud de Exclusión\n' +
      'Si el cliente NO desea aparecer en fotos o videos, debe notificarlo antes de comenzar el servicio.\n\n' +

      '📋 ACEPTACIÓN DE LOS TÉRMINOS\n' +
      'Al reservar, asistir y recibir servicios en este salón, el cliente confirma que ha leído, entendido y aceptado estos términos y condiciones.'
    );

  Logger.log('✅ Términos y condiciones agregados al formulario.');
  Logger.log('Enlace: ' + form.getEditUrl());
}
