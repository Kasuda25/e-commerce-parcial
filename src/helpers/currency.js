class CurrencyFormatter {
    toUsd(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        return formatter.format(value);
    }
}

export default new CurrencyFormatter();