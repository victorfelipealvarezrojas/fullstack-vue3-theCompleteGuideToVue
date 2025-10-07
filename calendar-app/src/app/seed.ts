export interface dataInterface {
  id: number
  abbvTitle: string
  fullTitle: string
  events: {
    details: string
    edit: boolean
  }[]
  active: boolean
}

export const seedData: dataInterface[] = [
  {
    id: 1,
    abbvTitle: 'Lun',
    fullTitle: 'Lunes',
    events: [
      { details: 'Comprar comestibles', edit: false },
      { details: 'Viajar', edit: false },
      { details: 'Pagar facturas', edit: false },
      { details: 'Llamar a mamá', edit: false },
      { details: 'Revisar correos electrónicos', edit: false },
    ],
    active: false,
  },
  {
    id: 2,
    abbvTitle: 'Mar',
    fullTitle: 'Martes',
    events: [{ details: 'Reunión de trabajo', edit: false }, { details: 'Cena con amigos', edit: false }],
    active: false,
  },
  {
    id: 3,
    abbvTitle: 'Mir',
    fullTitle: 'Miércoles',
    events: [{ details: 'Cita médica', edit: false }],
    active: false,
  },
  {
    id: 4,
    abbvTitle: 'Jue',
    fullTitle: 'Jueves',
    events: [
      { details: 'Clase de yoga', edit: false },
      { details: 'Proyecto de trabajo', edit: false },
    ],
    active: false,
  },
  {
    id: 5,
    abbvTitle: 'Vie',
    fullTitle: 'Viernes',
    events: [],
    active: false,
  },
  {
    id: 6,
    abbvTitle: 'Sáb',
    fullTitle: 'Sábado',
    events: [{ details: 'Día de campo', edit: false }],
    active: false,
  },
  {
    id: 7,
    abbvTitle: 'Dom',
    fullTitle: 'Domingo',
    events: [{ details: 'Descanso y relajación', edit: false }],
    active: true,
  },
]
