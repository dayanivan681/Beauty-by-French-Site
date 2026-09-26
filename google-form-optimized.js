// ============================================================
// Google Apps Script — Beauty by French: Formulario Optimizado
// ============================================================
// Este script ELIMINA el formulario anterior y crea uno nuevo
// dividido en secciones para una experiencia fluida en móvil y desktop.
//
// 1. Ve a https://script.google.com
// 2. Reemplaza todo el código con este
// 3. Guarda (Ctrl+S)
// 4. Selecciona la función: crearFormularioOptimizado
// 5. Haz clic en ▶ Ejecutar
// ============================================================

function crearFormularioOptimizado() {

  // ---------- Crear formulario ----------
  var form = FormApp.create('Beauty by French - Reserva tu Cita');
  form.setDescription(
    '✨ Bienvenida a Beauty by French ✨\n\n' +
    'Completa este breve formulario para agendar tu cita.\n' +
    'Solo toma unos minutos. ¡Estamos emocionados de atenderte!'
  );
  form.setConfirmationMessage(
    '💜 ¡Gracias por reservar con Beauty by French!\n\n' +
    'Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto para confirmar tu cita.\n\n' +
    '¡Te esperamos! ✨'
  );
  form.setProgressBar(true);

  // =============================================
  // PÁGINA 1: Datos Personales
  // =============================================

  form.addSectionHeaderItem()
    .setTitle('📋 Tus Datos')
    .setHelpText('Necesitamos esta información para contactarte y confirmar tu cita.');

  form.addTextItem()
    .setTitle('Nombre completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Número de teléfono')
    .setHelpText('Incluye el código de área. Ej: +1 (555) 123-4567')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Correo electrónico')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .build());

  // =============================================
  // PÁGINA 2: Tu Cita
  // =============================================

  form.addPageBreakItem()
    .setTitle('📅 Agenda tu Cita')
    .setHelpText('Selecciona el día y hora que prefieras. Te confirmaremos la disponibilidad.');

  form.addDateItem()
    .setTitle('¿Qué día prefieres tu cita?')
    .setRequired(true);

  form.addTimeItem()
    .setTitle('¿A qué hora te gustaría?')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('¿Qué servicio(s) deseas?')
    .setHelpText('Puedes seleccionar más de uno.')
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

  // =============================================
  // PÁGINA 3: Sobre tu Cabello
  // =============================================

  form.addPageBreakItem()
    .setTitle('💇‍♀️ Cuéntanos sobre tu Cabello')
    .setHelpText('Esta información nos ayuda a preparar todo para brindarte el mejor servicio.');

  form.addMultipleChoiceItem()
    .setTitle('¿Cómo describirías tu tipo de cabello?')
    .setChoiceValues(['Lacio', 'Ondulado', 'Rizado', 'Crespo'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('¿Presentas alguna de estas condiciones en el cuero cabelludo?')
    .setHelpText('Selecciona todas las que apliquen, o deja en blanco si no presentas ninguna.')
    .setChoiceValues([
      'Picazón',
      'Caspa',
      'Irritación',
      'Resequedad',
      'Psoriasis',
      'Dermatitis',
      'Ninguna'
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('¿Cuántas veces a la semana lavas tu cabello?')
    .setHelpText('Ej: 2 veces, todos los días, cada 3 días...')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('¿Se enreda con facilidad tu cabello?')
    .setChoiceValues(['Sí, mucho', 'A veces', 'Casi nunca', 'No'])
    .setRequired(false);

  // =============================================
  // PÁGINA 4: Tu Rutina de Cuidado
  // =============================================

  form.addPageBreakItem()
    .setTitle('🧴 Tu Rutina de Cuidado')
    .setHelpText('Conocer tu rutina actual nos permite darte mejores recomendaciones.');

  form.addTextItem()
    .setTitle('¿Exfolias tu cuero cabelludo? ¿Cuántas veces al mes?')
    .setHelpText('Ej: Sí, 2 veces al mes / No, nunca')
    .setRequired(false);

  form.addTextItem()
    .setTitle('¿Qué shampoo y acondicionador utilizas actualmente?')
    .setHelpText('Ej: Shampoo Pantene + Acondicionador TRESemmé')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Antes de acostarte, ¿secas tu cabello o duermes con él húmedo?')
    .setChoiceValues([
      'Siempre lo seco antes de dormir',
      'A veces duermo con él húmedo',
      'Casi siempre duermo con él húmedo'
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('¿Qué productos usas diariamente?')
    .setHelpText('Ej: Protector de calor, gotas, crema para peinar, aceite...')
    .setRequired(false);

  form.addTextItem()
    .setTitle('¿Cada cuánto cortas tus puntas?')
    .setHelpText('Ej: Cada 3 meses, cada 6 meses, no recuerdo...')
    .setRequired(false);

  // =============================================
  // PÁGINA 5: Historial y Referencias
  // =============================================

  form.addPageBreakItem()
    .setTitle('📸 Historial y Referencias')
    .setHelpText('¡Ya casi terminas! Solo unas preguntas más.');

  form.addTextItem()
    .setTitle('¿Tienes algún tratamiento previo?')
    .setHelpText('Ej: Keratina, alisado, botox capilar, tinte...')
    .setRequired(false);

  form.addTextItem()
    .setTitle('¿Tienes algún método de extensiones aplicado? ¿Cuál?')
    .setHelpText('Ej: Tape-in, clip-in, microlinks, cosidas...')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('¿Alergias que presentes?')
    .setHelpText('Menciona cualquier alergia a productos, químicos, látex, etc.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Sube aquí fotos o referencias de lo que deseas realizarte')
    .setHelpText('Pega un enlace de Google Drive, Imgur o cualquier imagen de referencia. Si no tienes, déjalo en blanco.')
    .setRequired(false);

  // =============================================
  // PÁGINA 6: Términos, Condiciones y Firma
  // =============================================

  form.addPageBreakItem()
    .setTitle('📜 Términos & Condiciones')
    .setHelpText('Por favor lee los términos antes de confirmar tu cita.');

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

  form.addCheckboxItem()
    .setTitle('Acepto los términos y condiciones de Beauty by French.')
    .setChoiceValues(['Acepto los términos y condiciones'])
    .setRequired(true)
    .setValidation(FormApp.createCheckboxValidation()
      .requireSelectExactly(1)
      .build());

  form.addTextItem()
    .setTitle('Firma digital (escribe tu nombre completo)')
    .setHelpText('Tu nombre completo sirve como firma electrónica de este formulario.')
    .setRequired(true);

  // ---------- Logs ----------
  Logger.log('========================================');
  Logger.log('✅ Formulario optimizado creado exitosamente!');
  Logger.log('');
  Logger.log('📋 Enlace para editar:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('🔗 Enlace para compartir:');
  Logger.log(form.getPublishedUrl());
  Logger.log('========================================');
}
