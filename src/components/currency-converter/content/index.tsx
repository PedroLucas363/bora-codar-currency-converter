import CustomSelect from "../../currency-input";
import ArrowsExchange from "../../../assets/icons/arrows-exchange.svg";

import styles from "./index.module.css";
import { CurrencyOption } from "../../currency-input/types";

type Props = {
  currencyOptions: CurrencyOption[];
  onChangeCurrentPrice: (price: string) => void;
  onChangeCurrentCurrency: (option: CurrencyOption) => void;
  onChangeConvertedPrice: (price: string) => void;
  onChangeConvertedCurrency: (option: CurrencyOption) => void;
  onClickToggleCurrency: () => void;
  currentPrice: string;
  convertedPrice: string;
  currentCurrency: CurrencyOption;
  convertedCurrency: CurrencyOption;
};

function Content({
  currencyOptions,
  onChangeCurrentPrice,
  onChangeCurrentCurrency,
  onChangeConvertedPrice,
  onChangeConvertedCurrency,
  onClickToggleCurrency,
  currentPrice,
  convertedPrice,
  currentCurrency,
  convertedCurrency,
}: Props) {
  return (
    <>
      <section className={styles.container}>
        <p className={styles.title}>Conversor de moedas</p>
        <header className={styles.header}>
          <CustomSelect
            currencyOptions={currencyOptions}
            selectedOption={currentCurrency}
            onCurrencyChange={onChangeCurrentCurrency}
            priceValue={currentPrice}
            onChangePriceValue={onChangeCurrentPrice}
          />
          <div
            className={styles.arrowButton}
            onClick={() => onClickToggleCurrency()}
          >
            <img src={ArrowsExchange} alt="arrowExchange" />
          </div>
          <CustomSelect
            currencyOptions={currencyOptions}
            selectedOption={convertedCurrency}
            onCurrencyChange={onChangeConvertedCurrency}
            priceValue={convertedPrice}
            onChangePriceValue={onChangeConvertedPrice}
            disabled
          />
        </header>
      </section>
    </>
  );
}

export default Content;
