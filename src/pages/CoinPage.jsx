import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/Api';
import axios from 'axios';
import CoinInfo from '../components/banner/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/banner/Carousel';

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;


  return (
    <div style={
      {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      }
    }>
      <div style={
        {
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 13,
        }
      }>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 8,
            fontFamily: "Montserrat",
          }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 12,
            paddingBottom: 9,
            paddingTop: 0,
            textAlign: "justify",
          }} >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div style={{
          alignSelf: "start",
          padding: 12,
          paddingTop: 9,
          width: "100%",
          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
          [theme.breakpoints.down("xs")]: {
            alignItems: "start",
          },
        }}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={
              {
                fontWeight: "bold",
                marginBottom: 10,
                fontFamily: "Montserrat",

              }
            }>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>

          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={
              {
                fontWeight: "bold",
                marginBottom: 10,
                fontFamily: "Montserrat",
              }
            }>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{
              fontWeight: "bold",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>

      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage