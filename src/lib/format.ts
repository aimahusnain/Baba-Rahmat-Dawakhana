export function formatPrice(price: number) {
  return (price / 100).toLocaleString("pkr", {
    style: "currency",
    currency: "PKR",
  });
}