import Frame from "../components/frame/Frame";

const Layout = () => {
  const buttons = [
    { label: "AC", type: "function" },
    { label: "+/-", type: "function" },
    { label: "%", type: "operator" },
    { label: "/", type: "operator" },

    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "*", type: "operator" },

    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },

    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },

    { label: "0", type: "number zero" },
    { label: ".", type: "number" },
    { label: "=", type: "equals" },
  ];

  return (
    <>
      <Frame>
       
<div className="calculator">
  <div className="display">0</div>

  <div className="buttons">
    {buttons.map((button, index) => (
      <button
        key={index}
        className={`button ${button.type}`}
      >
        {button.label}
      </button>
    ))}
  </div>
</div>

      </Frame>
    </>
  );
};

export default Layout;
Layout;
