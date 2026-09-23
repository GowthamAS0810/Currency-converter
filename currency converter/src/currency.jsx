function Currency() {
  return (
    <>
      <div className="name">
        <select className="currency" name="currency"></select>
        <input type="number" className="input" id="amount" placeholder="Enter amount" />
      </div>
      <div className="name">
        <select className="currency" name="currency"></select>
        <input type="number" className="input" id="result" placeholder="Result" />
      </div>
    </>
  )
}

export default Currency;