"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { addPackage } from "@/features/cart/cartSlice";
import axios from "axios";

interface SubProduct {
  _id: string;
  name: string;
  price: number;
}

interface Product {
  _id: string;
  title: string;
  image: string;
  type: "Menstrual" | "Other";
  subProducts: SubProduct[];
}

export default function CustomPacketPage() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"menstrual" | "other">("menstrual");

  useEffect(() => {
    axios
      .get(
        "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/packets-and-products"
      )
      .then((res) => setProducts(res.data.data.products));
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, v: number) => {
    setTab(v === 0 ? "menstrual" : "other");
  };

  const handleQty = (id: string, delta: number) => {
    setQuantities((q) => ({
      ...q,
      [id]: Math.max(0, (q[id] || 0) + delta),
    }));
  };

  const selectedItems = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([subId, qty]) => {
      for (const prod of products) {
        const sub = prod.subProducts.find((s) => s._id === subId);
        if (sub) {
          return {
            ...sub,
            qty,
            type: prod.type,
          };
        }
      }
      return null;
    })
    .filter((i) => i !== null) as (SubProduct & {
    qty: number;
    type: Product["type"];
  })[];

  const totalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleRemove = (id: string) => {
    setQuantities((q) => ({ ...q, [id]: 0 }));
  };

  const handleAddToCart = async () => {
    if (selectedItems.length === 0) return;
    setLoading(true);
    try {
      await axios.post(
        "https://3a631b5b-9b1b-4b7f-b736-00d1ce4a1505.mock.pstmn.io/verify-packet-price",
        {
          packet: selectedItems.map((i) => ({ _id: i._id, count: i.qty })),
          totalPrice,
        },
        { headers: { "x-auth-token": "YOUR_TOKEN_HERE" } }
      );
      dispatch(addPackage());

      setQuantities({});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const shown = products.filter((p) =>
    tab === "menstrual" ? p.type === "Menstrual" : p.type === "Other"
  );

  return (
    <Container maxWidth="lg" sx={{ pt: 15 }}>
      <Grid
        container
        spacing={12}
        sx={{
          px: { mobile: 2, md: 0 },
          flexWrap: { mobile: "wrap", md: "nowrap" },
          alignItems: "flex-start",
        }}
      >
        <Grid
          direction="column"
          item
          mobile={12}
          md={7}
          sx={{ pl: { mobile: 0, md: 2 } }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Kendi Paketini Oluştur
              </Typography>
              <Typography color="text.secondary">
                Tercih ve ihtiyaçların doğrultusunda seçeceğin ürünlerden ve
                miktarlardan, sana özel bir paket oluşturalım.
              </Typography>
            </Box>
            <Typography
              variant="button"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Nasıl Çalışır?
            </Typography>
          </Box>

          <Tabs
            value={tab === "menstrual" ? 0 : 1}
            onChange={handleTabChange}
            sx={{ mb: 2 }}
          >
            <Tab label="Menstrüel Ürünler" />
            <Tab label="Destekleyici Ürünler" />
          </Tabs>

          {shown.map((prod) => {
            const prodQty = prod.subProducts.reduce(
              (acc, s) => acc + (quantities[s._id] || 0),
              0
            );
            const summaryText =
              prodQty > 0
                ? `${prodQty} adet ${
                    prod.subProducts.find((s) => quantities[s._id] > 0)?.name
                  }`
                : "";
            return (
              <Accordion
                key={prod._id}
                defaultExpanded={false}
                sx={{ mb: 2, borderRadius: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography fontWeight={600}>{prod.title}</Typography>
                    <Typography color="text.secondary">
                      {summaryText}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "#F9FAF9", borderRadius: 1 }}>
                  {prod.subProducts.map((s) => (
                    <Box
                      key={s._id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      py={1}
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          component="img"
                          src={prod.image}
                          sx={{
                            width: 24,
                            height: 24,
                            mr: 1,
                            borderRadius: 0.5,
                          }}
                        />
                        <Typography>{s.name}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          size="small"
                          onClick={() => handleQty(s._id, -1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography mx={1}>{quantities[s._id] || 0}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQty(s._id, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>

        <Grid direction="row" wrap="wrap" item mobile={12} md={5}>
          <Box
            sx={{
              position: { md: "sticky" },
              maxWidth: { mobile: "50%", md: "70%" },
              flexWrap: { mobile: "nowrap", md: "wrap" },
              top: { md: 120 },
              p: 3,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h5" fontWeight={700}>
                Özel Paketin
              </Typography>
              <Chip
                label="2 ayda bir gönderim"
                size="small"
                sx={{
                  bgcolor: "#E6F5EA",
                  color: "success.main",
                  fontWeight: 500,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Kişisel ihtiyacına yönelik istediğin miktarda Ped, Günlük Ped,
              Tampon veya destekleyici ürünler ekleyerek kendine özel bir paket
              oluşturabilirsin.
            </Typography>

            {selectedItems.length === 0 ? (
              <Typography color="text.secondary">
                Henüz ürün seçilmedi.
              </Typography>
            ) : (
              selectedItems.map((item) => (
                <Box
                  key={item._id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                  mb={2}
                  border={1}
                  borderColor="divider"
                  borderRadius={1}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      {item.qty} x {item.name}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography mr={1}>{`₺${(item.price * item.qty).toFixed(
                      2
                    )}`}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(item._id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}

            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography fontWeight={700}>Toplam</Typography>
              <Typography fontWeight={700}>{`₺${totalPrice.toFixed(
                2
              )}`}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={loading || selectedItems.length === 0}
              sx={{ bgcolor: "#1C1B1F", borderRadius: "50px", py: 1.5 }}
            >
              {loading
                ? "Ekleniyor..."
                : `Sepete Ekle (₺${totalPrice.toFixed(2)})`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
