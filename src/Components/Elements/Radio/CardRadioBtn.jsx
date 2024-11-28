import React, { useState } from "react";


const CardRadioBtn = React.memo((props) => {
  const { data = [], variant, name } = props;

  const [selectedValue, setSelectedValue] = useState(null);

  
  const handleChange = (value) => {
    setSelectedValue(value);
    const selectedItem = data.find(item => item.value === value);
    if (selectedItem && selectedItem.onclick) {
      selectedItem.onclick(); // Panggil fungsi `onclick` dari item
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <div style={{ flex: 1 }} key={index}>
          <input
            onChange={(e) => {
              handleChange(item.value)
              if (typeof item.onclick === "function") {
                item.onclick(e.target.value)
              }
            }}
            id={item.id}
            className="peer sr-only"
            type="radio"
            name={name}
            value={item.value}
            checked={selectedValue === item.value} // Kontrol dengan state
          />
          <div className="py-3 px-5 h-full opacity-70 cursor-pointer rounded-xl border border-[#424242] bg-secondary-dark transition-transform duration-150 hover:border-blue-800 hover:opacity-90 active:scale-95 peer-checked:border-blue-700 peer-checked:opacity-100 peer-checked:shadow-md peer-checked:shadow-blue-800">
            <label
              htmlFor={item.id}
              className={`${variant} cursor-pointer`}
            >
              <div className="flex flex-col gap-1 select-none">
                <span className="font-bold text-lg">{item.text} {item.icon}</span>
                <span style={{ wordSpacing: "1px" }} className="font-normal text-sm text-justify">{item.infoText}</span>
              </div>
            </label>
          </div>
        </div>
      ))}
    </>
  );
});

export default CardRadioBtn