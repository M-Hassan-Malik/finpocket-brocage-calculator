import { useEffect, useState } from "react";
import "./App.css";

function App(props) {
  const { title } = props;
  const [sharePrice, setSharePrice] = useState(0);
  const [numberOfShares, setNumberOfShares] = useState(1);
  const [totalSharePrice, setTotalSharePrice] = useState(0);
  const [estimateComission, setEstimateComission] = useState(0);
  const [FED_Tax, setFED_Tax] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [overallChargesPaid, setOverallChargesPaid] = useState(0);
  const [overallChargesRecieve, setOverallChargesRecieve] = useState(0);

  useEffect(() => {
    const totallSharePrice = Number(sharePrice * numberOfShares);
    setTotalSharePrice(totallSharePrice.toFixed(2));
    const comissionRate = (0.15 / 100) * sharePrice;
    const estimateComission = Number(comissionRate * numberOfShares);

    setEstimateComission(estimateComission.toFixed(2));
    const fexTax = Number((13 / 100) * estimateComission);
    setFED_Tax(fexTax.toFixed(2));

    const totalCharges = Number(estimateComission + fexTax);
    setTotalCharges(totalCharges.toFixed(2));

    const buyAmount = Number(totallSharePrice + totalCharges);
    setOverallChargesPaid(buyAmount.toFixed(2)); // at time of Buying

    const sellAmount = Number(totallSharePrice - totalCharges);
    setOverallChargesRecieve(sellAmount.toFixed(2)); // at time of Selling
  }, [sharePrice, numberOfShares]);

  const onChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (title === "B U Y | S E L L")
      switch (name) {
        case "share-price":
          setSharePrice(value);
          break;
        case "number-of-shares":
          setNumberOfShares(value);
          break;
        default:
          alert("Default Case");
          break;
      }
  };

  return (
    <div className="App">
      <div>
        <h2>{title}</h2>
        <br />
        <div>
          <label> Share Price: </label>
          <input
            name="share-price"
            type="number"
            min={1}
            value={sharePrice}
            onChange={onChange}
          />

          <br />
          <label> Number Of Shares: (QTY) </label>
          <input
            name="number-of-shares"
            value={numberOfShares}
            type="number"
            min={1}
            onChange={onChange}
          />

          <br />
          <label> Total Price of Shares: </label>
          <b>{totalSharePrice}</b>

          <br />
          <label>
            {" "}
            Applicable Commision-Rate <b>(0.15%)/share:</b>{" "}
          </label>

          <br />
          <label> Estimated-Comission (Qty x Commision-Rate): </label>
          <b>{estimateComission}</b>

          <br />
          <label> FED Tax (Estimated-Comission x 13%): </label>
          <b>{FED_Tax}</b>

          <br />
          <label> Total Charges: </label>
          <b>{totalCharges}</b>

          <br/>
          <h5 style={{ color: "green", display: "inline-block" }}>
            Overall Price PAID:&nbsp;
          </h5>
          <b style={{ color: "green" }}>{overallChargesPaid}</b>

          <br/>
          <h5 style={{ color: "red", display: "inline-block" }}>
            Overall Price RECIEVE: &nbsp;
          </h5>
          <b style={{ color: "red" }}>{overallChargesRecieve}</b>
        </div>
      </div>
    </div>
  );
}

export default App;
