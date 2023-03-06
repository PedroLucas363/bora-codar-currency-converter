import { FaCheck } from "react-icons/fa";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { BR, CH, EU, GB, US } from "country-flag-icons/react/1x1";

import { getParsedValue, formatCurrency } from "../../../utils";
import styles from "./index.module.css";
import { CurrencyOption } from "../types";

const formatInputValue = (value: string, currency?: string) => {
  const numStr = getParsedValue(value);
  const num = parseFloat(numStr);

  return formatCurrency(num, currency);
};

function getIconFlagByCurrency(currency = "") {
  switch (currency) {
    case "BRL":
      return <BR title="Brasil" className={styles.flagIcon} />;
    case "USD":
      return <US title="Estados Unidos" className={styles.flagIcon} />;
    case "EUR":
      return <EU title="União Europeia" className={styles.flagIcon} />;
    case "GBP":
      return <GB title="Grã Bretanha" className={styles.flagIcon} />;
    case "CHF":
      return <CH title="Suíça" className={styles.flagIcon} />;
    default:
      return null;
  }
}

type Props = {
  disabled: boolean;
  isOpen: boolean;
  toggleDropdown: () => void;
  onChangePrice: (price: string) => void;
  onOptionClick: (option: CurrencyOption) => void;
  selectedOption: CurrencyOption;
  currencyOptions: CurrencyOption[];
  priceValue: string;
};

function Content({
  disabled,
  isOpen,
  toggleDropdown,
  onChangePrice,
  onOptionClick,
  selectedOption,
  currencyOptions,
  priceValue,
}: Props) {
  const optionList = (
    <ul className={styles.optionsList}>
      {currencyOptions.map((option: CurrencyOption) => (
        <li
          className={styles.option}
          key={option.key}
          onClick={() => onOptionClick(option)}
        >
          {getIconFlagByCurrency(option.code)}
          <span className={styles.text}>{option.code}</span>
          <div className={styles.icon}>
            {selectedOption.key === option.key ? (
              <FaCheck color="var(--text-primary)" size={12} />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${styles.customSelect} ${
        isOpen ? styles.customSelectFocused : ""
      }`}
    >
      <div className={styles.selectedOption}>
        <input
          type="text"
          className={`${styles.text} ${styles.input}`}
          value={formatInputValue(priceValue, selectedOption?.code)}
          onChange={(e) => onChangePrice(e.target.value)}
          disabled={disabled}
        />
        <div className={styles.rightSideSelect} onClick={toggleDropdown}>
          <hr className={styles.divider} />
          {getIconFlagByCurrency(selectedOption?.code)}
          <span className={styles.text}>{selectedOption?.code ?? "BRL"}</span>
          {isOpen ? <TbChevronUp size={24} /> : <TbChevronDown size={24} />}
        </div>
      </div>

      {isOpen && optionList}
    </div>
  );
}

export default Content;
