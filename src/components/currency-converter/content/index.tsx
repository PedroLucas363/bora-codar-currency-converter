import CustomSelect from "../../currency-input";
import ArrowsExchange from "../../../assets/icons/arrows-exchange.svg";
import LineChart from "../../line-chart";

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
  graphicData: Record<string, number>;
  onClickChangeDaysRange: (days: number) => void;
  daysRange: number;
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
  graphicData,
  onClickChangeDaysRange,
  daysRange,
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
        <main className={styles.chartSection}>
          <p className={styles.title}>Taxa de câmbio</p>
          <div className={styles.chart}>
            <LineChart data={graphicData} />
          </div>
          <div className={styles.changeDaysRangeContainer}>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 1 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(1)}
            >
              1D
            </button>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 5 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(5)}
            >
              5D
            </button>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 30 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(30)}
            >
              1M
            </button>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 365 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(365)}
            >
              1A
            </button>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 365 * 5 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(365 * 5)}
            >
              5A
            </button>
            <button
              className={styles.rangeButton}
              data-state={daysRange === 2000 ? "active" : undefined}
              onClick={() => onClickChangeDaysRange(2000)}
            >
              Máx
            </button>
          </div>
        </main>
      </section>
    </>
  );
}

export default Content;
