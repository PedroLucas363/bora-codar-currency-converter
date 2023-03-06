import { useState } from "react";

import Content from "./content";

import { CurrencyOption } from "./types";

type Props = {
  currencyOptions: CurrencyOption[];
  selectedOption: CurrencyOption;
  onCurrencyChange: (value: CurrencyOption) => void;
  priceValue: string;
  onChangePriceValue: (value: string) => void;
  disabled?: boolean;
};

function CurrencyInput({
  currencyOptions,
  selectedOption,
  onCurrencyChange,
  priceValue,
  onChangePriceValue,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChangePrice = (value: string) => {
    onChangePriceValue(value);
    setIsOpen(false);
  };

  const handleOptionClick = (option: CurrencyOption) => {
    onCurrencyChange(option);
    setIsOpen(false);
  };

  return (
    <Content
      currencyOptions={currencyOptions}
      selectedOption={selectedOption}
      onOptionClick={handleOptionClick}
      priceValue={priceValue}
      onChangePrice={handleChangePrice}
      disabled={disabled}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
    />
  );
}
export default CurrencyInput;
