"use client";

import React from "react";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { RootState } from "@/store";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
export default function NavbarCart() {
  const count = useSelector((state: RootState) => state.cart.packetCount);

  return (
    <IconButton aria-label="show cart items" color="inherit" href="/packets">
      <Badge badgeContent={count} color="success">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
