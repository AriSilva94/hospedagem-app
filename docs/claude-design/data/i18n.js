// i18n — only the phrases users actually see in the prototype
const I18N = {
  pt: {
    // Nav
    dashboard: 'Visão geral',
    reservations: 'Reservas',
    calendar: 'Calendário',
    properties: 'Imóveis',
    guests: 'Hóspedes',
    stays: 'Estadias',
    communication: 'Comunicação',
    maintenance: 'Tarefas',
    contracts: 'Contratos',
    settings: 'Configurações',

    // Common
    search: 'Buscar',
    filter: 'Filtros',
    new: 'Novo',
    today: 'Hoje',
    week: 'Semana',
    month: 'Mês',
    all: 'Todos',
    cancel: 'Cancelar',
    save: 'Salvar',
    continue: 'Continuar',
    back: 'Voltar',
    finish: 'Finalizar',

    // Status labels
    arriving_today: 'Check-in hoje',
    departing_today: 'Check-out hoje',
    in_house: 'Hospedado',
    confirmed: 'Confirmada',
    tentative: 'Tentativa',
    completed: 'Concluída',
    cancelled: 'Cancelada',

    // Dashboard
    occupancy: 'Ocupação',
    arrivals: 'Chegadas',
    departures: 'Partidas',
    open_tasks: 'Tarefas abertas',
    pending_msgs: 'Mensagens pendentes',
    todays_timeline: 'Linha do tempo — hoje',
    alerts: 'Alertas',
    activity: 'Atividade recente',
    welcome: 'Bom dia',

    // Reservations
    check_in: 'Check-in',
    check_out: 'Check-out',
    guest: 'Hóspede',
    unit: 'Unidade',
    property: 'Imóvel',
    dates: 'Datas',
    source: 'Origem',
    total: 'Total',
    nights: 'noites',
    new_reservation: 'Nova reserva',

    // Wizard
    step_dates: 'Datas & grupo',
    step_unit: 'Unidade',
    step_guest: 'Hóspede',
    step_review: 'Revisão',

    // Kanban
    todo: 'A fazer',
    in_progress: 'Em andamento',
    done: 'Concluído',
    cleaning: 'Limpeza',
    maintenance_t: 'Manutenção',

    // Stay ops
    arrivals_today: 'Chegadas de hoje',
    departures_today: 'Partidas de hoje',
    verify_id: 'Verificar documento',
    contract_status: 'Contrato',
    access_instructions: 'Instruções de acesso',
    mark_checked_in: 'Marcar check-in',
    mark_checked_out: 'Marcar check-out',

    // Roles
    role_admin: 'Admin',
    role_ops: 'Ops Manager',
    role_agent: 'Front Desk',
    role_staff: 'Limpeza/Manut.',
    role_finance: 'Finance',
  },
  en: {
    dashboard: 'Overview',
    reservations: 'Reservations',
    calendar: 'Calendar',
    properties: 'Properties',
    guests: 'Guests',
    stays: 'Stays',
    communication: 'Communication',
    maintenance: 'Tasks',
    contracts: 'Contracts',
    settings: 'Settings',

    search: 'Search',
    filter: 'Filters',
    new: 'New',
    today: 'Today',
    week: 'Week',
    month: 'Month',
    all: 'All',
    cancel: 'Cancel',
    save: 'Save',
    continue: 'Continue',
    back: 'Back',
    finish: 'Finish',

    arriving_today: 'Arriving today',
    departing_today: 'Departing today',
    in_house: 'In-house',
    confirmed: 'Confirmed',
    tentative: 'Tentative',
    completed: 'Completed',
    cancelled: 'Cancelled',

    occupancy: 'Occupancy',
    arrivals: 'Arrivals',
    departures: 'Departures',
    open_tasks: 'Open tasks',
    pending_msgs: 'Pending messages',
    todays_timeline: "Today's timeline",
    alerts: 'Alerts',
    activity: 'Recent activity',
    welcome: 'Good morning',

    check_in: 'Check-in',
    check_out: 'Check-out',
    guest: 'Guest',
    unit: 'Unit',
    property: 'Property',
    dates: 'Dates',
    source: 'Source',
    total: 'Total',
    nights: 'nights',
    new_reservation: 'New reservation',

    step_dates: 'Dates & party',
    step_unit: 'Unit',
    step_guest: 'Guest',
    step_review: 'Review',

    todo: 'To do',
    in_progress: 'In progress',
    done: 'Done',
    cleaning: 'Cleaning',
    maintenance_t: 'Maintenance',

    arrivals_today: "Today's arrivals",
    departures_today: "Today's departures",
    verify_id: 'Verify ID',
    contract_status: 'Contract',
    access_instructions: 'Access instructions',
    mark_checked_in: 'Mark checked-in',
    mark_checked_out: 'Mark checked-out',

    role_admin: 'Admin',
    role_ops: 'Ops Manager',
    role_agent: 'Front Desk',
    role_staff: 'Cleaning/Maint.',
    role_finance: 'Finance',
  }
};

window.I18N = I18N;
window.useT = function useT(lang) {
  const dict = I18N[lang] || I18N.pt;
  return (k) => dict[k] || k;
};
