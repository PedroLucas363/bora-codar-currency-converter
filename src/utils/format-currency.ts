import numberFormatter from "./number-formatter";

const formatCurrency = (
  value: number,
  currency = "BRL",
  minimumFractionDigits = 2
) => {
  const formatNumber = numberFormatter("pt-BR", {
    minimumFractionDigits,
    maximumFractionDigits: 2,
    currency: currency || undefined,
    style: currency ? "currency" : undefined,
  });

  return formatNumber(value);
};

export default formatCurrency;
