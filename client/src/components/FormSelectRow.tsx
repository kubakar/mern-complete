import React, { ChangeEventHandler } from "react";

type Props = {
  name: string;
  onChange?: ChangeEventHandler;

  //   value: string;
  //   handleChange: React.ChangeEventHandler;
  labelText?: string;
  defaultValue?: string;
  list: string[];
};

const FormRowSelect: React.FC<Props> = (props) => {
  const { name, labelText, defaultValue, list, onChange } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ?? name}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((item) => (
          // <option key={item} value={item}>
          // ignore 'all' field - query param
          <option key={item} value={item === "all" ? "" : item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

// FormRowSelect.defaultProps = { defaultValue: "select default value" };

export default FormRowSelect;
