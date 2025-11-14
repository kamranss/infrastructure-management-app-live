import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
const SelectComponent = ({
  control,
  title,
  name,
  getOptionLabel,
  defaultValue,
  getOptionValue,
  isOptionDisabled,
  options,
  isMulty = false,
  meaning = "id",
  myChange,
  disabled = false,
  isClearable = true,
  isReset = true,
  boolError = false,
  filterOption = (option, inputValue) => {
    const lowerCaseOption = option.label?.toString().toLowerCase();
    const lowerCaseInput = inputValue.toLowerCase();
    return lowerCaseOption.includes(lowerCaseInput);
  },
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "4px",
      width: "100%",
      padding: "2.3px",
      marginTop: "4px",
      borderWidth: "1px",
      borderColor: boolError ? "#FF0505" : "#CCD2DD",
      boxShadow: state.isFocused ? "none !important" : provided.boxShadow, // Remove box shadow when focused
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: "12px",
    }),
  };
  return (
    <div className="form-select">
      <label>
        {title}
        <Controller
          defaultValue={defaultValue}
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              isMulti={isMulty ? true : false}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isOptionDisabled={isOptionDisabled}
              isClearable={isClearable}
              isSearchable
              options={options}
              isDisabled={disabled}
              {...field}
              filterOption={filterOption}
              styles={customStyles}
              onChange={(selectedOption) => {
                if (isMulty) {
                  const selectedValues = selectedOption.map(
                    (option) => option?.[meaning]
                  );
                  field.onChange(selectedValues);
                } else {
                  if (myChange) {
                    myChange(selectedOption?.[meaning]);
                  }
                  field.onChange(selectedOption?.[meaning]);
                }
                if (!selectedOption) {
                  field.onChange(null);
                }
              }}
              value={
                isMulty
                  ? options?.filter((option) =>
                      field?.value?.includes(option?.[meaning])
                    )
                  : isReset
                  ? options?.find((option) => option?.[meaning] === field.value)
                  : ""
              }
            />
          )}
        />
      </label>
    </div>
  );
};
export default SelectComponent;
