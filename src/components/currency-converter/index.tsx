import { useState, useEffect } from "react";
import axios from "axios";

import Content from "./content";

import { getParsedValue, formatCurrency } from "../../utils";
import type { CurrencyOption } from "../currency-input/types";

const currencyOptions = [
  { key: 1, code: "BRL" },
  { key: 2, code: "USD" },
  { key: 3, code: "EUR" },
  { key: 4, code: "GBP" },
  { key: 5, code: "CHF" },
];

function CurrencyConverter() {
  const [currentCurrency, setCurrentCurrency] = useState(currencyOptions[1]);
  const [convertedCurrency, setConvertedCurrency] = useState(
    currencyOptions[0]
  );
  const [currentPrice, setCurrentPrice] = useState("0");
  const [convertedPrice, setConvertedPrice] = useState("0");
  const [conversionRate, setConversionRate] = useState<Record<
    string,
    number
  > | null>(null);

  const handleChangeCurrentPrice = (value: string) => {
    setCurrentPrice(value);
  };

  const handleChangeCurrentCurrency = (value: CurrencyOption) => {
    setCurrentCurrency(value);
  };

  const handleChangeConvertedPrice = (value: string) => {
    setConvertedPrice(value);
  };

  const handleChangeConvertedCurrency = (value: CurrencyOption) => {
    setConvertedCurrency(value);
  };

  const handleToggleCurrency = () => {
    const current = currentCurrency;
    setCurrentCurrency(convertedCurrency);
    setConvertedCurrency(current);
  };

  useEffect(() => {
    const handleConvert = async () => {
      try {
        if (!conversionRate) return;

        const convertedPrice =
          parseFloat(getParsedValue(currentPrice)) *
          conversionRate[convertedCurrency.code];

        const finalConversion = formatCurrency(
          convertedPrice,
          convertedCurrency.code
        );

        handleChangeConvertedPrice(finalConversion);
      } catch (error) {
        console.log(error);
      }
    };
    handleConvert();
  }, [currentPrice, conversionRate, convertedCurrency]);

  useEffect(() => {
    const fetchConversionTable = async () => {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${currentCurrency.code}`
      );
      setConversionRate(response.data.rates);
    };
    fetchConversionTable();
  }, [currentCurrency]);

  return (
    <Content
      currencyOptions={currencyOptions}
      onChangeCurrentPrice={handleChangeCurrentPrice}
      onChangeCurrentCurrency={handleChangeCurrentCurrency}
      onChangeConvertedPrice={handleChangeConvertedPrice}
      onChangeConvertedCurrency={handleChangeConvertedCurrency}
      onClickToggleCurrency={handleToggleCurrency}
      currentPrice={currentPrice}
      convertedPrice={convertedPrice}
      currentCurrency={currentCurrency}
      convertedCurrency={convertedCurrency}
    />
  );
}

export default CurrencyConverter;
