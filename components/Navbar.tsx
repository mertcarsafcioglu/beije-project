"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Grid, Grow } from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenuData } from "../features/menu/menuSlice";

function Navbar({ children }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { products, packets, status } = useAppSelector((s) => s.menu);
  const [megaOpen, setMegaOpen] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuData());
    }
  }, [status, dispatch]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f9f9f9] shadow">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link href="/">
          <div className="font-medium text-2xl cursor-pointer text-[#ce7328]">
            beije.
          </div>
        </Link>

        <nav className="hidden mobile:flex gap-8 text-base items-center">
          <Box
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            sx={{ display: "inline-block" }}
          >
            <Button
              endIcon={<ExpandMoreIcon />}
              sx={{ textTransform: "none", fontWeight: 500, color: "black" }}
            >
              Tüm Ürünler
            </Button>

            <Grow in={megaOpen} timeout={300}>
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  p: 4,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 4,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Ürünler
                  </Typography>
                  <Grid container spacing={2}>
                    {products.map((p) => (
                      <Grid key={p._id} item xs={4}>
                        <Box
                          component="a"
                          href={`/products/${p._id}`}
                          sx={{
                            textDecoration: "none",
                            "&:hover img": { transform: "scale(1.05)" },
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              aspectRatio: "4 / 3",
                              position: "relative",
                              bgcolor: "grey.100",
                              borderRadius: 1,
                              overflow: "hidden",
                              transition: "box-shadow 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={p.image}
                              alt={p.title}
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              mt: 1,
                              fontSize: "0.875rem",
                              color: "text.secondary",
                              display: "flex",
                              alignItems: "center",
                              transition: "color 0.3s ease",
                              "&:hover": { color: "text.primary" },
                            }}
                          >
                            {p.title}
                            <ChevronRightIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Paketler</Typography>
                    <Link href="/packets" passHref>
                      <Box
                        component="a"
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "text.primary",
                        }}
                      >
                        Tüm Paketler
                        <ChevronRightIcon fontSize="small" sx={{ ml: 0.5 }} />
                      </Box>
                    </Link>
                  </Box>
                  <Grid container spacing={2}>
                    {packets.map((pkt) => (
                      <Grid key={pkt._id} item xs={4}>
                        <Box
                          component="a"
                          href={`/packets/${pkt._id}`}
                          sx={{
                            textDecoration: "none",
                            "&:hover img": { transform: "scale(1.05)" },
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              aspectRatio: "4/3",
                              position: "relative",
                              bgcolor: "grey.100",
                              borderRadius: 1,
                              overflow: "hidden",
                              transition: "box-shadow 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={pkt.image}
                              alt={pkt.title}
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              mt: 1,
                              fontSize: "0.875rem",
                              color: "text.secondary",
                              display: "flex",
                              alignItems: "center",
                              transition: "color 0.3s ease",
                              "&:hover": { color: "text.primary" },
                            }}
                          >
                            {pkt.title}
                            <ChevronRightIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grow>
          </Box>

          <Link href="https://beije.co/know-us/why-beije" passHref>
            <Typography
              component="a"
              sx={{ textTransform: "none", fontWeight: 500, color: "black" }}
            >
              Biz Kimiz?
            </Typography>
          </Link>
          <Link href="https://beije.co/charity" passHref>
            <Typography
              component="a"
              sx={{ textTransform: "none", color: "black" }}
            >
              Bağış Kültürü
            </Typography>
          </Link>
          <Link href="https://dongu.beije.co/" passHref>
            <Typography
              component="a"
              sx={{ textTransform: "none", color: "black" }}
            >
              Blog
            </Typography>
          </Link>
          <Link href="https://beije.co/quiz" passHref>
            <Typography
              component="a"
              sx={{ textTransform: "none", color: "black" }}
            >
              Regl Testi!
            </Typography>
          </Link>
          <Link href="/packets" passHref>
            <Typography
              component="a"
              sx={{ textTransform: "none", color: "black" }}
            >
              Kendi Paketini Oluştur
            </Typography>
          </Link>

          <div className="flex gap-4 ml-4">
            {children}
            <Image src="/icons/person.svg" alt="User" width={24} height={24} />
          </div>
        </nav>

        <div className="mobile:hidden flex items-center gap-4">
          {children}
          <Image src="/icons/person.svg" alt="User" width={24} height={24} />
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <Image
                src="/icons/close.svg" // X iconu
                alt="Close Menu"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/icons/mobile-navbar.svg" // Hamburger icon
                alt="Open Menu"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] w-full shadow-md">
          <nav className="flex flex-col items-start gap-6 py-6 px-6">
            <a className="flex items-center justify-between w-full" href="#">
              Ürünler <span>{">"}</span>
            </a>
            <a className="flex items-center justify-between w-full" href="#">
              Biz Kimiz? <span>{">"}</span>
            </a>
            <a className="flex items-center justify-between w-full" href="#">
              Bağış Kültürü <span>{">"}</span>
            </a>
            <a className="flex items-center justify-between w-full" href="#">
              Blog <span>{">"}</span>
            </a>
            <a className="flex items-center justify-between w-full" href="#">
              Regl Testi! <span>{">"}</span>
            </a>
            <a className="flex items-center justify-between w-full" href="#">
              Kendi Paketini Oluştur <span>{">"}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
