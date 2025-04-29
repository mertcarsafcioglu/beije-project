import Image from "next/image";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const SOCIAL = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "spotify",
] as const;
const FOOTER_LINKS = [
  "KVKK",
  "KVKK Başvuru Formu",
  "Üyelik Sözleşmesi",
  "Gizlilik Politikası",
  "Çerez Politikası",
  "Test Sonuçları",
] as const;

export default function Footer() {
  return (
    <Box component="footer" sx={{ position: "relative" }}>
      <Box sx={{ width: "100vw", overflow: "hidden", lineHeight: 0 }}>
        <Image
          src="/images/desktop-wave-pattern.svg"
          alt="Wave Pattern"
          width={1920}
          height={200}
          layout="responsive"
        />
      </Box>

      <Box
        sx={{
          bgcolor: "#262626",
          color: "common.white",
          pt: 8,
          pb: 4,
          px: { xs: 3, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
            gap={4}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                beije.
              </Typography>
              <Typography variant="body2" color="grey.400" mb={2}>
                Arayı açmayalım!
                <br />
                beijedeki yeni ürün ve gelişmeleri sana haber verelim & aylık
                e-gazetemiz döngü’ye abone ol!
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <TextField
                  fullWidth
                  label="E-mail Adresin"
                  variant="outlined"
                  InputLabelProps={{
                    sx: { color: "#fff", "&.Mui-focused": { color: "#fff" } },
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff",
                      borderRadius: "50px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    borderRadius: "50px",
                    height: "56px",
                    px: 4,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#fff", boxShadow: "none" },
                  }}
                >
                  Gönder
                </Button>
              </Box>

              <Typography variant="caption" color="grey.500">
                Abone olarak, beije{" "}
                <Box component="span" sx={{ textDecoration: "underline" }}>
                  KVKK
                </Box>{" "}
                ve{" "}
                <Box component="span" sx={{ textDecoration: "underline" }}>
                  Gizlilik Politikası
                </Box>{" "}
                ’nı kabul ediyorum.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" gap={4}>
              <Box
                component="ul"
                sx={{
                  m: 0,
                  p: 0,
                  listStyle: "none",
                  color: "grey.400",
                }}
              >
                <li>beije Ped</li>
                <li>beije Günlük Ped</li>
                <li>beije Tampon</li>
              </Box>
              <Box
                component="ul"
                sx={{
                  m: 0,
                  p: 0,
                  listStyle: "none",
                  color: "grey.400",
                }}
              >
                <li>Biz Kimiz?</li>
                <li>Blog</li>
                <li>SSS</li>
                <li>Ekibimize Katıl</li>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              gap={1}
            >
              {SOCIAL.map((name) => (
                <Box key={name} display="flex" alignItems="center" gap={1}>
                  <Image
                    src={`/icons/${name}.svg`}
                    alt={name}
                    width={20}
                    height={20}
                  />
                  <Typography variant="body2" color="grey.400">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor: "grey.700", mt: 4, mb: 2 }} />

          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="grey.400">
              2022 beije. Tüm hakları saklıdır.
            </Typography>

            <Box
              component="nav"
              display="flex"
              flexWrap="wrap"
              gap={2}
              sx={{ mx: "auto" }}
            >
              {FOOTER_LINKS.map((txt) => (
                <Typography
                  key={txt}
                  component="a"
                  href="#"
                  variant="body2"
                  color="grey.400"
                  sx={{ textDecoration: "none" }}
                >
                  {txt}
                </Typography>
              ))}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                color="grey.400"
                sx={{ cursor: "pointer" }}
              >
                EN
              </Typography>
              <Typography variant="body2" color="grey.400">
                |
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="grey.400"
                sx={{ cursor: "pointer" }}
              >
                TR
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Image
              src="/icons/mastercard.svg"
              alt="Mastercard"
              width={48}
              height={30}
            />
            <Image src="/icons/visa.svg" alt="Visa" width={48} height={30} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
