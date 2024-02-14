export function formatPriceReal (product){
    return (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
}
export function subtotal(item) {
    return parseFloat((formatPriceReal(item.product)*(item.quantity)).toFixed(2))
}