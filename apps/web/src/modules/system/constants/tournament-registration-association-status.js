export const CANCELED = 'canceled';
export const CONFIRMED = 'confirmed';
export const REGISTERED = 'registered';

const TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS = [
    {
        label: 'Registrada',
        value: REGISTERED
    },
    {
        label: 'Confirmada',
        value: CONFIRMED
    },
    {
        label: 'Cancelada',
        value: CANCELED
    }
];

export const getStatusRegistrationLabel = (value) => {
    const localizeds = TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS.filter(status => status.value === value);
    if (localizeds.length > 0) {
        return localizeds[0].label;
    }
    return '';
}

export default TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS;