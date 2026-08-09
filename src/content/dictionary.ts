import type { Locale } from '@/lib/i18n';

/**
 * All user-facing interface copy, in English and Spanish.
 * Both languages are written by hand and kept in the same shape so the UI
 * can render either without any machine translation at runtime.
 */
export interface Dictionary {
  nav: {
    locations: string;
    about: string;
    rates: string;
    enquire: string;
    menu: string;
    close: string;
    language: string;
  };
  actions: {
    enquire: string;
    requestAvailability: string;
    viewLocation: string;
    /** Short form for tight spaces — a cursor badge, not a link label. */
    view: string;
    allLocations: string;
    back: string;
  };
  home: {
    heroTagline: string;
    intro: string;
    featuredIndex: string;
    productionsTitle: string;
    productions: string[];
    featuresTitle: string;
    ratesTitle: string;
    moreTitle: string;
    moreComing: string;
    moreBody: string;
    finalHeading: string;
  };
  rates: {
    title: string;
    lead: string;
    halfDay: string;
    fullDay: string;
    halfNote: string;
    fullNote: string;
    overtime: string;
    interiors: string;
    quoteNote: string;
    from: string;
  };
  location: {
    features: string;
    productions: string;
    rates: string;
    notes: string;
    interiors: string;
    comingSoon: string;
    tba: string;
  };
  about: {
    title: string;
    lead: string;
    body: string[];
    principlesTitle: string;
    principles: { term: string; def: string }[];
  };
  locationsPage: {
    title: string;
    lead: string;
  };
  enquiry: {
    title: string;
    lead: string;
    labels: {
      name: string;
      company: string;
      email: string;
      phone: string;
      phoneOptional: string;
      productionType: string;
      shootDate: string;
      duration: string;
      crew: string;
      message: string;
    };
    placeholders: {
      crew: string;
      message: string;
      select: string;
    };
    productionTypes: string[];
    durations: string[];
    submit: string;
    sending: string;
    success: string;
    errorRequired: string;
    errorEmail: string;
    errorGeneric: string;
    required: string;
  };
  footer: {
    tagline: string;
    contact: string;
    instagram: string;
    rights: string;
    privacy: string;
    legal: string;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    ratesTitle: string;
    ratesDescription: string;
    locationsTitle: string;
    locationsDescription: string;
    enquireTitle: string;
    enquireDescription: string;
  };
}

const en: Dictionary = {
  nav: {
    locations: 'Locations',
    about: 'About',
    rates: 'Rates',
    enquire: 'Enquire',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
  },
  actions: {
    enquire: 'Enquire',
    requestAvailability: 'Request availability',
    viewLocation: 'View location',
    view: 'View',
    allLocations: 'All locations',
    back: 'Back',
  },
  home: {
    heroTagline: 'Locations for creative production.',
    intro:
      'PUL is a curated collection of locations for advertising, film and photography. Each space is selected for how it performs on camera. We begin in Madrid.',
    featuredIndex: 'Featured location',
    productionsTitle: 'Made for',
    productions: [
      'Campaigns',
      'Film',
      'Stills',
      'Editorial',
      'Branded content',
      'Social',
      'Still life',
    ],
    featuresTitle: 'On location',
    ratesTitle: 'Rates',
    moreTitle: 'More locations',
    moreComing: 'Coming soon',
    moreBody:
      'PUL is growing into a curated network of production locations. New spaces are added as they are selected.',
    finalHeading: 'Have a production in mind?',
  },
  rates: {
    title: 'Rates',
    lead: 'Clear pricing for exterior productions. Final quotes may depend on the production.',
    halfDay: 'Half day',
    fullDay: 'Full day',
    halfNote: 'Included hours confirmed on booking',
    fullNote: 'Included hours confirmed on booking',
    overtime: 'Additional hours quoted separately',
    interiors: 'Interiors available upon request',
    quoteNote: 'Rates are for The American House. Enquire for a tailored quote.',
    from: 'Rates from',
  },
  location: {
    features: 'On location',
    productions: 'Suitable for',
    rates: 'Rates',
    notes: 'Production notes',
    interiors: 'Interiors available upon request',
    comingSoon: 'Coming soon',
    tba: 'To be announced',
  },
  about: {
    title: 'About',
    lead: 'Exceptional spaces for exceptional productions.',
    body: [
      'PUL represents locations selected for creative production — advertising, film, editorial and content. We look for spaces with a strong architectural point of view and light that holds up on camera.',
      'We begin with a single house in Madrid and grow deliberately, one location at a time. Each is chosen, not listed.',
    ],
    principlesTitle: 'Approach',
    principles: [
      { term: 'Curated', def: 'Each location is selected, not aggregated. Quality over quantity.' },
      { term: 'Camera-first', def: 'Spaces judged by how they read on camera — architecture, light, framing.' },
      { term: 'Discreet', def: 'Exact addresses stay private. Access is arranged for confirmed productions.' },
    ],
  },
  locationsPage: {
    title: 'Locations',
    lead: 'A curated collection for creative production. Beginning in Madrid.',
  },
  enquiry: {
    title: 'Enquire',
    lead: 'Tell us about your production. We reply personally.',
    labels: {
      name: 'Name',
      company: 'Company / Brand',
      email: 'Email',
      phone: 'Phone',
      phoneOptional: 'Optional',
      productionType: 'Production type',
      shootDate: 'Shoot date',
      duration: 'Half day / Full day',
      crew: 'Estimated crew size',
      message: 'Production details',
    },
    placeholders: {
      crew: 'e.g. 12',
      message: 'What are you producing, and what are you looking for?',
      select: 'Select',
    },
    productionTypes: [
      'Advertising campaign',
      'Fashion / Editorial',
      'Film / Commercial',
      'Stills',
      'Still life / Product',
      'Branded content',
      'Social content',
      'Other',
    ],
    durations: ['Half day', 'Full day', 'Not sure'],
    submit: 'Send enquiry',
    sending: 'Sending…',
    success: 'Thank you. We’ll get back to you shortly.',
    errorRequired: 'Please complete the required fields.',
    errorEmail: 'Please enter a valid email address.',
    errorGeneric: 'Something went wrong. Please try again, or email us directly.',
    required: 'Required',
  },
  footer: {
    tagline: 'Locations for creative production.',
    contact: 'Contact',
    instagram: 'Instagram',
    rights: 'All rights reserved.',
    privacy: 'Privacy',
    legal: 'Legal',
  },
  meta: {
    homeTitle: 'PUL — Locations for creative production in Madrid',
    homeDescription:
      'Curated production locations in Madrid for advertising, film and photography. An American house for campaigns, film and stills. Rates from €1,200.',
    aboutTitle: 'About — PUL',
    aboutDescription:
      'PUL is a curated collection of shooting locations in Madrid for advertising, film and photography.',
    ratesTitle: 'Rates — PUL',
    ratesDescription:
      'Production location rates in Madrid. Half day €1,200, full day €2,000. Additional hours quoted separately. Interiors on request.',
    locationsTitle: 'Locations — PUL',
    locationsDescription:
      'A curated collection of production locations, beginning in Madrid. Film, photo and advertising locations.',
    enquireTitle: 'Enquire — PUL',
    enquireDescription:
      'Request availability for production locations in Madrid. Campaigns, film, editorial and stills.',
  },
};

const es: Dictionary = {
  nav: {
    locations: 'Localizaciones',
    about: 'Estudio',
    rates: 'Tarifas',
    enquire: 'Consultar',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
  },
  actions: {
    enquire: 'Consultar',
    requestAvailability: 'Solicitar disponibilidad',
    viewLocation: 'Ver localización',
    view: 'Ver',
    allLocations: 'Todas las localizaciones',
    back: 'Volver',
  },
  home: {
    heroTagline: 'Localizaciones para producción creativa.',
    intro:
      'PUL es una colección de localizaciones para publicidad, cine y fotografía. Cada espacio se selecciona por cómo funciona ante la cámara. Empezamos en Madrid.',
    featuredIndex: 'Localización destacada',
    productionsTitle: 'Para',
    productions: [
      'Campañas',
      'Cine',
      'Foto fija',
      'Editorial',
      'Contenido de marca',
      'Social',
      'Bodegón',
    ],
    featuresTitle: 'En la localización',
    ratesTitle: 'Tarifas',
    moreTitle: 'Más localizaciones',
    moreComing: 'Próximamente',
    moreBody:
      'PUL crece como una red de localizaciones de producción. Se incorporan nuevos espacios a medida que se seleccionan.',
    finalHeading: '¿Tienes una producción en mente?',
  },
  rates: {
    title: 'Tarifas',
    lead: 'Precios claros para producciones de exterior. El presupuesto final puede depender de la producción.',
    halfDay: 'Media jornada',
    fullDay: 'Jornada completa',
    halfNote: 'Horas incluidas confirmadas en la reserva',
    fullNote: 'Horas incluidas confirmadas en la reserva',
    overtime: 'Horas adicionales presupuestadas por separado',
    interiors: 'Interiores disponibles bajo petición',
    quoteNote: 'Tarifas para The American House. Consulta para un presupuesto a medida.',
    from: 'Tarifas desde',
  },
  location: {
    features: 'En la localización',
    productions: 'Ideal para',
    rates: 'Tarifas',
    notes: 'Notas de producción',
    interiors: 'Interiores disponibles bajo petición',
    comingSoon: 'Próximamente',
    tba: 'Por anunciar',
  },
  about: {
    title: 'Estudio',
    lead: 'Espacios excepcionales para producciones excepcionales.',
    body: [
      'PUL representa localizaciones seleccionadas para producción creativa: publicidad, cine, editorial y contenido. Buscamos espacios con una arquitectura de carácter y una luz que aguanta ante la cámara.',
      'Empezamos con una única casa en Madrid y crecemos con criterio, una localización cada vez. Cada una se elige, no se lista.',
    ],
    principlesTitle: 'Criterio',
    principles: [
      { term: 'Selección', def: 'Cada localización se elige, no se agrega. Calidad antes que cantidad.' },
      { term: 'Ante la cámara', def: 'Espacios juzgados por cómo se leen ante la cámara: arquitectura, luz, encuadre.' },
      { term: 'Discreción', def: 'Las direcciones exactas permanecen privadas. El acceso se organiza para producciones confirmadas.' },
    ],
  },
  locationsPage: {
    title: 'Localizaciones',
    lead: 'Una colección para producción creativa. Empezando en Madrid.',
  },
  enquiry: {
    title: 'Consultar',
    lead: 'Cuéntanos sobre tu producción. Respondemos personalmente.',
    labels: {
      name: 'Nombre',
      company: 'Empresa / Marca',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      phoneOptional: 'Opcional',
      productionType: 'Tipo de producción',
      shootDate: 'Fecha de rodaje',
      duration: 'Media jornada / Jornada completa',
      crew: 'Tamaño estimado del equipo',
      message: 'Detalles de la producción',
    },
    placeholders: {
      crew: 'p. ej. 12',
      message: '¿Qué vas a producir y qué buscas?',
      select: 'Seleccionar',
    },
    productionTypes: [
      'Campaña publicitaria',
      'Moda / Editorial',
      'Cine / Publicidad',
      'Foto fija',
      'Bodegón / Producto',
      'Contenido de marca',
      'Contenido social',
      'Otro',
    ],
    durations: ['Media jornada', 'Jornada completa', 'No estoy seguro'],
    submit: 'Enviar consulta',
    sending: 'Enviando…',
    success: 'Gracias. Te responderemos en breve.',
    errorRequired: 'Por favor, completa los campos obligatorios.',
    errorEmail: 'Introduce un correo electrónico válido.',
    errorGeneric: 'Algo ha fallado. Inténtalo de nuevo o escríbenos directamente.',
    required: 'Obligatorio',
  },
  footer: {
    tagline: 'Localizaciones para producción creativa.',
    contact: 'Contacto',
    instagram: 'Instagram',
    rights: 'Todos los derechos reservados.',
    privacy: 'Privacidad',
    legal: 'Aviso legal',
  },
  meta: {
    homeTitle: 'PUL — Localizaciones para producción creativa en Madrid',
    homeDescription:
      'Localizaciones de producción en Madrid para publicidad, cine y fotografía. Una casa americana para campañas, cine y foto fija. Tarifas desde 1.200 €.',
    aboutTitle: 'Estudio — PUL',
    aboutDescription:
      'PUL es una colección de localizaciones de rodaje en Madrid para publicidad, cine y fotografía.',
    ratesTitle: 'Tarifas — PUL',
    ratesDescription:
      'Tarifas de localizaciones de producción en Madrid. Media jornada 1.200 €, jornada completa 2.000 €. Horas adicionales aparte. Interiores bajo petición.',
    locationsTitle: 'Localizaciones — PUL',
    locationsDescription:
      'Una colección de localizaciones de producción, empezando en Madrid. Localizaciones para cine, foto y publicidad.',
    enquireTitle: 'Consultar — PUL',
    enquireDescription:
      'Solicita disponibilidad de localizaciones de producción en Madrid. Campañas, cine, editorial y foto fija.',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
