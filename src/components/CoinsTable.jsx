import React, { memo, useEffect, useState } from 'react'
import { CoinList } from '../config/Api';

import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';


function CoinsTable() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { currency, symbol, coins, loading } = CryptoState();

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )

    }

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });
    return (
        coins && (
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        style={{ margin: 18, fontFamily: "Montserrat" }}
                    >
                        Cryptocurrency Prices by Market Cap
                    </Typography>
                    <TextField
                        label="Search For a Crypto Currency.."
                        variant="outlined"
                        sx={{ marginBottom: 7, width: "100%" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: "gold" }} />

                            ) : (
                                <Table aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                        <TableRow>
                                            {["Coin", "Price", "24 Change", "Market Cap"].map((head) =>
                                            (
                                                <TableCell
                                                    sx={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat",
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}

                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch()//array of the filtered coind
                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            .map((row) => {
                                                const profit = row.price_change_percentage_24h > 0;
                                                return (
                                                    <TableRow
                                                        onClick={() => navigate(`/coins/${row.id}`)}
                                                        key={row.name}
                                                        sx={{
                                                            backgroundColor: "#16171a",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                backgroundColor: "#131111",
                                                            },
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            style={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}
                                                        >
                                                            <img
                                                                src={row?.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{ marginBottom: 10 }}
                                                            />
                                                            <div
                                                                style={{ display: "flex", flexDirection: "column" }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        textTransform: "uppercase",
                                                                        fontSize: 22,
                                                                    }}
                                                                >
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{ color: "darkgrey" }}>
                                                                    {row.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.market_cap.toString().slice(0, -6)
                                                            )}
                                                            M
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>

                            )
                        }
                    </TableContainer>
                    <Pagination
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        sx={{
                            padding: 8,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            "& .MuiPaginationItem-root": {
                                color: "gold",
                            },
                        }}

                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                        }}
                    >

                    </Pagination>

                </Container>


            </ThemeProvider>
        )
    )
}

export default memo(CoinsTable)