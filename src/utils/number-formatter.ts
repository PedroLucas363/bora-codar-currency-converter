type Props = {
  style?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumIntegerDigits?: number;
};

const numberFormatter = (
  locale: string,
  {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumIntegerDigits,
  }: Props
) => {
  return Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumIntegerDigits,
  }).format;
};

export default numberFormatter;
