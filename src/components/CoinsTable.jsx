import React, { useState } from 'react'
import { CoinList } from '../config/Api';
import { Container, LinearProgress, Table, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';

function CoinsTable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const fetchCoins = async () => {

        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);

        setCoins(data);
        setLoading(false);


        useEffect(() => {
            fetchCoins();
        }, [currency]);

        const darkTheme = createTheme({
            palette: {
                primary: {
                    main: "#fff",
                },
                mode: "dark",
            },
        });


    }
    return (
        <ThemeProvider theme={dark}>
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
                    style={{ marginBottom: 20, width: "100%" }}
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
                                    </TableRow>
                                </TableHead>
                            </Table>

                        )
                    }
                </TableContainer>

            </Container>


        </ThemeProvider>
    )
}

export default CoinsTable