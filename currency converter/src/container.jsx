import { useEffect } from "react";
import Currency from "./currency.jsx";

function Container() {
    useEffect(() => {
        const selector = document.querySelectorAll('.currency');
        const converter = document.getElementById('convert');
        const amount = document.getElementById('amount');
        const result = document.getElementById('result');

        async function getCurrency() {
            try {
                const res = await fetch('https://api.frankfurter.dev/v1/currencies');
                const data = await res.json();
                const currency = Object.keys(data);
                addData(currency);
            } catch (err) {
                console.log(err);
            }
        }

        function addData(currency) {
            for (let i = 0; i < currency.length; i++) {
                const query = `<option value="${currency[i]}">${currency[i]}</option>`;
                selector[0].innerHTML += query;
                selector[1].innerHTML += query;
            }
        }

        function convert(base, quote, amount) {
            const api = "https://api.frankfurter.dev";
            return fetch(`${api}/v2/rate/${base}/${quote}`)
                .then((r) => r.json())
                .then((d) => (amount * d.rate).toFixed(2));
        }

        if (converter && amount && result) {
            converter.addEventListener('click', () => {
                const inputAmount = amount.value;
                const inputCurrency = selector[0].value;
                const outputCurrency = selector[1].value;

                if (inputCurrency === outputCurrency) {
                    alert('Please choose different currencies');
                    return;
                }

                convert(inputCurrency, outputCurrency, inputAmount).then((convertedAmount) => {
                    result.value = convertedAmount;
                });
            });
        }

        getCurrency();
        
        return () => {
            if (converter) {
                converter.removeEventListener('click', () => {});
            }
        };
    }, []);

    return (
        <div id="container">
            <div className="outerlayer">
                <h1>Currency Converter</h1>
                <Currency />
                <button id="convert">Convert</button>
            </div>
        </div>
    );
}

export default Container;