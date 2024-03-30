import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./config/Api";
import { getAwsData, putData } from './aws';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  })

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

  }, [])

  const fetchCoins = async () => {

    setLoading(true);
    //need to save data on AWS for time being 
    try {
      const { data } = await axios.get(CoinList(currency));
      // console.log(data);

      await putData(data);

      setCoins(data);
      setLoading(false);
    } catch (error) {
      //save data on aws 
      const data = await getAwsData();
      console.log("data is " + data);
      console.log("data from aws")
      setCoins(data);

      setLoading(false);
      console.log("Error! in fetching data from coinList api using s3 for now!", error);
    }

  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading, fetchCoins, alert, setAlert, user }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

