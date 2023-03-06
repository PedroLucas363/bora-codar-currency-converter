const removeNonDigits = (value: string) => {
  return value.replace(/\D/g, "");
};

const splitNumberByDecimalPlaces = (value: string, places: number) => {
  const integer = value.slice(0, value.length - places);
  const decimal = value.slice(-1 * places);
  return [integer, decimal];
};

const fillWithZeros = (value: string, minLength: string | number) => {
  const strValue = `${value}`;
  const valueLength = strValue.length;

  let newValue = strValue;
  for (let i = valueLength; i < minLength; i += 1) {
    newValue = `0${newValue}`;
  }

  return newValue;
};

const decimalPlaces = 2;

export default function getParsedValue(value: string | undefined) {
  const valueStr = `${value}`;
  const cleanNumberStr = removeNonDigits(valueStr);
  const filledValueStr = fillWithZeros(cleanNumberStr, decimalPlaces + 1);

  const [integer, decimal] = splitNumberByDecimalPlaces(
    filledValueStr,
    decimalPlaces
  );
  const numberStr = `${+integer}.${decimal}`;

  return numberStr;
}
