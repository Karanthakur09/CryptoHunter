import axios from 'axios'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/Api'
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function Carousel() {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));//need to send the currency
            return data;
        } catch (error) {
            console.log("Currently facing error in fetching data in carousel! ", error);
        }
    }

    useEffect(() => {
        fetchTrendingCoins().then(setTrending);
    }, [currency]);


    const items = trending.map((coin) => {

        let profit = coin?.price_change_percentage_24h >= 0;
        return (
            <Link style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",

            }}
                to={`coins/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 12 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>

                </span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )

    })


    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };
    return (
        trending && (
            <div style={{
                height: "50%",
                display: "flex",
                alignItems: "top",
            }}>
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}//items to see at one time
                    items={items}
                    autoPlay
                />
            </div>
        )

    )
}

export default memo(Carousel);