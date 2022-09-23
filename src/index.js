import {Container} from "./containers/Container";

const ProductContainer = new Conianer ("productos");
const CartContainer = new Container("carrito");

const updateCart = async ({ idCarrito, idProduct }) => {
    try {
      const cart = await CartContainer.getById(idCarrito);
      if (!cart) return "Cart Not Found";
  
      const product = await ProductContainer.getById(idProduct);
  
      if (!product) return "Product not found";
  
      cart.products.push(product);
      // console.log({ cart });
      await CartContainer.update({
        id: idCarrito,
        newData: { products: cart.products },
      });
    } catch (error) {
      console.log(error);
    }
  };