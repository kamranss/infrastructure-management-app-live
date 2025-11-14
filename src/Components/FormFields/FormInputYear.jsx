import React from "react";

const FormInputYear = (props) => {
  return (
    <div className="input_box">
      <label>Year</label>
      <input type="number" onChange={props.YearInputChangeHandler} />
    </div>
  );
};
// onChange={(e) => this.props.setYear(e.target.value)}
export default FormInputYear;
