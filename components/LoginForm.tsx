"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Alert, Snackbar } from "@mui/material";
import Image from "next/image";

import { useAppDispatch } from "../store/hooks";
import axios from "axios";
import { setToken, setProfile } from "../features/auth/authSlice";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçersiz e-posta formatı")
    .required("Lütfen bir e-mail adresi gir."),
  password: Yup.string().required("Lütfen bir şifre gir."),
});

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("login");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<
    "error" | "warning" | "success"
  >("error");

  const handleSubmit = async (
    values: { email: string; password: string },
    formikHelpers: { setSubmitting: (b: boolean) => void }
  ) => {
    try {
      const { data } = await axios.post(
        "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/sign-in-request",
        values
      );
      dispatch(setToken(data.token));

      const profileRes = await axios.get(
        "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/profile",
        { headers: { Authorization: `Bearer ${data.token}` } }
      );
      dispatch(setProfile(profileRes.data));

      router.push("/packets");
    } catch (err) {
      console.error(err);
      setToastSeverity("error");
      setToastMessage("E-posta veya şifre hatalı!");
      setToastOpen(true);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-6">
      <div className="flex min-h-screen">
        <div className="hidden mobile:flex flex-1 items-end justify-center bg-[#acd0de] relative overflow-hidden">
          <Image
            src="/images/products.webp"
            alt="Products"
            width={600}
            height={600}
            className="object-contain mb-8"
          />
        </div>

        <div className="flex flex-1 items-center justify-center bg-[#f9f5f2] relative overflow-hidden">
          <div className="w-full max-w-md p-8">
            <Typography variant="h4" align="center" gutterBottom>
              Merhaba
            </Typography>
            <Typography variant="subtitle2" align="center" gutterBottom>
              beijeye hoş geldin!
            </Typography>
            <div className="flex  mt-8 mb-6 text-gray-500 text-base">
              <span
                className="relative pb-3 cursor-pointer w-44 text-center"
                onClick={() => setActiveTab("login")}
              >
                <a
                  className={`font-semibold block ${
                    activeTab === "login" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Giriş Yap
                </a>
                {activeTab === "login" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-full"></div>
                )}
              </span>

              <span
                className="relative pb-3 cursor-pointer w-44 text-center"
                onClick={() => setActiveTab("register")}
              >
                <a
                  className={`font-semibold block ${
                    activeTab === "register" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Üye Ol
                </a>
                {activeTab === "register" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-full"></div>
                )}
              </span>
            </div>

            <div className="flex flex-row gap-4 mb-6 text-xs">
              <button className="border border-black px-4 p-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <Image
                  src="/icons/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Google ile Giriş Yap
              </button>
              <button className="border border-black p-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <Image
                  src="/icons/facebook-login.svg"
                  alt="Facebook"
                  width={12}
                  height={12}
                />
                Facebook ile Giriş Yap
              </button>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} noValidate>
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    label="E-mail adresin"
                    variant="outlined"
                    margin="normal"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    id="password"
                    name="password"
                    fullWidth
                    label="Şifren"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      borderRadius: "9999px",
                    }}
                  />

                  <div className="text-right text-s text-black-600 mt-1 mb-6 cursor-pointer">
                    Şifremi Unuttum
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      py: 1.5,
                      bgcolor: "#262626",
                      borderRadius: "9999px",
                      "&:hover": { bgcolor: "#000", boxShadow: "none" },
                    }}
                  >
                    Giriş Yap
                  </Button>
                </Form>
              )}
            </Formik>
            <Snackbar
              open={toastOpen}
              autoHideDuration={4000}
              onClose={() => setToastOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setToastOpen(false)}
                severity={toastSeverity}
                variant="filled"
              >
                {toastMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
}
