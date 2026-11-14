const currencyFormatter = new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
});

export const formatCurrency = (value: number) =>
    `৳ ${currencyFormatter.format(value)}`;