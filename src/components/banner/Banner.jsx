import { Container, Typography } from '@mui/material'
import React, { memo } from 'react'
import Carousel from './Carousel'

function Banner() {
    return (
        <div style={{ backgroundImage: "url(./banner2.jpg)" }}>
            <Container sx={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                paddingTop: 6,
                justifyContent: "space-around",
            }}>
                <div style={{
                    display: "flex",
                    height: "40%",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Typography
                        variant='h2'
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        sx={{
                            marginBottom: 6,
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}>
                        Get all the Info regarding your favorite Crypto Currency

                    </Typography>
                    <Carousel />

                </div>

            </Container>

        </div>
    )
}

export default memo(Banner)