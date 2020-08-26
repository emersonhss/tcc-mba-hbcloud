const SUITS = [
    {
        label: 'Selecione',
        value: ''
    },
    {
        label: 'Misto',
        value: 'mixed'
    },
    {
        label: 'Masculino',
        value: 'male'
    },
    {
        label: 'Feminino',
        value: 'female'
    }
];

export const getSuitLabel = (value) => {
    const localizeds = SUITS.filter(suit => suit.value === value);
    if (localizeds.length >= 0) {
        return localizeds[0].label;
    }
    return '';
}

export default SUITS;