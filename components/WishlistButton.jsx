"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";

function WishlistButton({ productId }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleWishlist = async () => {
    if (!productId) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const data = await response.json();
      setWishlisted(data.data.action === "added");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!productId) {
      return;
    }
    async function checkWishlist() {
      const response = await fetch(`/api/wishlist/check/${productId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data) setWishlisted(true);
      else setWishlisted(false);
    }
    checkWishlist();
  }, [productId]);
  return (
    <button disabled={loading}>
      {wishlisted ? (
        <FaHeart size={16} color="red" onClick={toggleWishlist} />
      ) : (
        <IoMdHeartEmpty size={18} onClick={toggleWishlist} />
      )}
    </button>
  );
}

export default WishlistButton;
