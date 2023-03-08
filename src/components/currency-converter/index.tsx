import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

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
  const [graphicData, setGraphicData] = useState<Record<string, number>>({});
  const [daysRange, setDaysRange] = useState(30);

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

  const getCurrencyHistoryMock = (
    conversionRateProp: Record<string, number> | null
  ) => {
    if (!conversionRateProp) return;
    const priceBase = conversionRateProp[convertedCurrency.code];

    let rangePriceVariation = daysRange > 30 ? 0.0001 : 0.5;

    if (convertedCurrency.code === currentCurrency.code)
      rangePriceVariation = 0;

    const max = priceBase + rangePriceVariation;
    const min =
      priceBase > rangePriceVariation
        ? priceBase - rangePriceVariation
        : priceBase;

    const result: Record<string, number> = {};

    const today = new Date();

    if (daysRange === 1) {
      return {
        [today.toISOString()]: Math.random() * (max - min) + min,
        [dayjs().toString()]: Math.random() * (max - min) + min,
      };
    }

    for (let i = 0; i < daysRange; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      const dateString = date.toISOString().substring(0, 10);
      result[dateString] = Math.random() * (max - min) + min;
    }
    return result;
  };

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

  useEffect(() => {
    handleConvert();
  }, [currentPrice, conversionRate]);

  useEffect(() => {
    const fetchConversionTable = async () => {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${currentCurrency.code}`
      );
      setConversionRate(response.data.rates);
      setGraphicData(getCurrencyHistoryMock(response.data.rates) ?? {});
    };
    fetchConversionTable();
  }, [currentCurrency]);

  useEffect(() => {
    handleConvert();
    setGraphicData(getCurrencyHistoryMock(conversionRate) ?? {});
  }, [convertedCurrency, daysRange]);

  const handleClickChangeDaysRange = (days: number) => {
    setDaysRange(days);
  };

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
      graphicData={graphicData}
      onClickChangeDaysRange={handleClickChangeDaysRange}
      daysRange={daysRange}
    />
  );
}

export default CurrencyConverter;
