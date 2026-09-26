// ============================================================
// Google Apps Script — Beauty by French: Formulario de Citas
// ============================================================
// Instrucciones:
// 1. Ve a https://script.google.com con la cuenta fdurand.sein@gmail.com
// 2. Crea un nuevo proyecto y pega este código
// 3. Haz clic en ▶ Ejecutar (función: crearFormularioBeautyByFrench)
// 4. Autoriza los permisos cuando se solicite
// 5. Revisa los logs (Ver > Registros) para obtener el enlace del formulario
// ============================================================

function crearFormularioBeautyByFrench() {
  var form = FormApp.create('Beauty by French - Reserva tu Cita');
  form.setDescription(
    'Completa este formulario para agendar tu cita con Beauty by French.\n' +
    'Todos los campos marcados son obligatorios.'
  );
  form.setConfirmationMessage('¡Gracias por agendar tu cita! Nos pondremos en contacto contigo pronto. 💜');

  // 1. Nombre completo
  form.addTextItem()
    .setTitle('Nombre completo')
    .setRequired(true);

  // 2. Número de teléfono
  form.addTextItem()
    .setTitle('Número de teléfono')
    .setRequired(true);

  // 3. Correo electrónico
  form.addTextItem()
    .setTitle('Correo electrónico')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .build());

  // 4. Día de su cita
  form.addDateItem()
    .setTitle('Día de su cita')
    .setRequired(true);

  // 5. Hora de su cita
  form.addTimeItem()
    .setTitle('Hora de su cita')
    .setRequired(true);

  // 6. Tipo de cabello
  form.addMultipleChoiceItem()
    .setTitle('¿Cómo describirías tu tipo de cabello?')
    .setChoiceValues(['Lacio', 'Ondulado', 'Rizado', 'Crespo'])
    .setRequired(true);

  // 7. Servicio deseado
  form.addCheckboxItem()
    .setTitle('¿Qué servicio desea?')
    .setChoiceValues([
      'Lavado',
      'Secado',
      'Corte Regular',
      'Corte Rizado',
      'Color',
      'Tratamiento',
      'Extensiones',
      'Extensiones Rizadas'
    ])
    .setRequired(true);

  // 8. Condiciones del cuero cabelludo
  form.addCheckboxItem()
    .setTitle('¿Presentas alguna de estas condiciones en el cuero cabelludo?')
    .setChoiceValues([
      'Picazón',
      'Caspa',
      'Irritación',
      'Resequedad',
      'Psoriasis',
      'Dermatitis'
    ])
    .setRequired(false);

  // 9. Exfoliación del cuero cabelludo
  form.addParagraphTextItem()
    .setTitle('¿Exfolias tu cuero cabelludo? ¿Cuántas veces al mes?')
    .setRequired(false);

  // 10. Frecuencia de lavado
  form.addTextItem()
    .setTitle('¿Cuántas veces a la semana lavas tu cabello?')
    .setRequired(false);

  // 11. Shampoo y acondicionador
  form.addParagraphTextItem()
    .setTitle('¿Qué shampoo y acondicionador utilizas al momento?')
    .setRequired(false);

  // 12. Secado antes de dormir
  form.addParagraphTextItem()
    .setTitle('Antes de acostarte, ¿secas tu cabello o duermes con él húmedo?')
    .setRequired(false);

  // 13. Tratamiento previo
  form.addParagraphTextItem()
    .setTitle('¿Tienes algún tratamiento previo?')
    .setRequired(false);

  // 14. Alergias
  form.addParagraphTextItem()
    .setTitle('¿Alergias que presentes?')
    .setRequired(false);

  // 15. Corte de puntas
  form.addParagraphTextItem()
    .setTitle('¿Cada cuánto cortas tus puntas?')
    .setRequired(false);

  // 16. Extensiones
  form.addParagraphTextItem()
    .setTitle('¿Tienes algún método de extensiones aplicado? ¿Cuál método de tenerlo?')
    .setRequired(false);

  // 17. Enredo del cabello
  form.addParagraphTextItem()
    .setTitle('¿Se enreda con facilidad tu cabello?')
    .setRequired(false);

  // 18. Productos diarios
  form.addParagraphTextItem()
    .setTitle('¿Qué productos usas diariamente? Ej: Protector de calor, gotas, etc...')
    .setRequired(false);

  // 19. Subida de fotos/referencias
  // NOTA: Google Apps Script NO permite crear campos de "File Upload" por script.
  // Se añade como campo de texto para que peguen un enlace (Google Drive, Imgur, etc.)
  form.addParagraphTextItem()
    .setTitle('Sube aquí fotos o referencias de lo que deseas realizarte (pega un enlace de Google Drive, Imgur, etc.)')
    .setHelpText('Si tienes fotos de referencia, súbelas a Google Drive y comparte el enlace aquí.')
    .setRequired(false);

  // 20. Términos y condiciones
  form.addCheckboxItem()
    .setTitle('Acepto los términos y condiciones de Beauty by French.')
    .setChoiceValues(['Acepto'])
    .setRequired(true)
    .setValidation(FormApp.createCheckboxValidation()
      .requireSelectExactly(1)
      .build());

  // 21. Firma
  form.addTextItem()
    .setTitle('Firma (escribe tu nombre completo como firma)')
    .setRequired(true);

  // Log del enlace del formulario
  Logger.log('========================================');
  Logger.log('✅ Formulario creado exitosamente!');
  Logger.log('');
  Logger.log('📋 Enlace para editar:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('🔗 Enlace para compartir (responder):');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('📊 Enlace de respuestas (spreadsheet):');
  Logger.log('Vincula una hoja de cálculo desde el editor del formulario');
  Logger.log('========================================');
}
