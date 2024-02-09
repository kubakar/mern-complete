import { ChangeEventHandler } from "react";

type Props = {
  type: React.HTMLInputTypeAttribute;
  name: string;
  //   value: string;
  //   handleChange: React.ChangeEventHandler;
  onChange?: ChangeEventHandler;
  labelText?: string;
  defaultValue?: string;
};

const FormRow: React.FC<Props> = (props) => {
  const { type, name, labelText, defaultValue, onChange } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ?? name}
      </label>
      <input
        onChange={onChange}
        type={type}
        // value={value}
        name={name}
        id={name} // test
        minLength={2} // standard client side validation
        className="form-input"
        // defaultValue={defaultValue ?? "Some Name"}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormRow;
