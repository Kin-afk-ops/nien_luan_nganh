const formatPrice = (price: number): string => {
  const VND: Intl.NumberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return VND.format(price);
};

export default formatPrice;
