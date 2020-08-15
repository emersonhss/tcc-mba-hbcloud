const CATEGORIES = [
    {
        label: 'Selecione',
        value: ''
    },
    {
        label: 'Mirim',
        value: 'little'
    },
    {
        label: 'Infantil',
        value: 'infant'
    },
    {
        label: 'Cadete',
        value: 'cadet'
    },
    {
        label: 'Juvenil',
        value: 'juvenile'
    },
    {
        label: 'Júnior',
        value: 'junior'
    },
    {
        label: 'Adulto',
        value: 'adult'
    },
    {
        label: 'Master 35+',
        value: 'master_35+'
    },
    {
        label: 'Master 40+',
        value: 'master_40+'
    },
    {
        label: 'Master 45+',
        value: 'master_45+'
    },
    {
        label: 'Master 50+',
        value: 'master_50+'
    },
];

export const getCategoryLabel = (value) => {
    const localizeds = CATEGORIES.filter(category => category.value === value);
    if (localizeds.length >= 0) {
        return localizeds[0].label;
    }
    return '';
}

export default CATEGORIES;