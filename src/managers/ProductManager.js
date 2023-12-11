const fs = require("fs")

const path = "./src/mocks/products.json"

class ProductManager {
  constructor() {
    this.path = path
    this.products = []
    this.inicializar()
  }

  async inicializar() {
    await this.cargarProductos()
  }

  async cargarProductos() {
    try {
      const productosParseados = await fs.promises.readFile(this.path, "utf8")
      this.products = JSON.parse(productosParseados)
    } catch (error) {
      console.error("Error loading products:", error.message)
    }
  }

  async guardarProductos() {
    const productosEnString = JSON.stringify(this.products, null, 2)
    await fs.promises.writeFile(this.path, productosEnString, "utf8")
  }

  async agregarProducto(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios!")
      return
    }

    if (this.products.some((product) => product.code === code)) {
      console.log(
        "Error. Se intentó agregar un producto con un código existente!"
      )
      return
    }

    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    this.products.push(product)
    await this.guardarProductos()

    return product
  }

  consultarPorId(id) {
    return this.products.find((product) => product.id === id)
  }

  async borrarProducto(id) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0]
      await this.guardarProductos()
      return deletedProduct
    }

    return null
  }

  async actualizarProducto(id, update) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...update }
      await this.guardarProductos()
      return this.products[index]
    }
    return null
  }

  getAllProducts() {
    return this.products
  }
}

// Ejemplo de uso asincrónico
/* async function testManager() {
  const productManager = new ProductManager("products.json")

  console.log("Productos al momento: ", productManager.getAllProducts())

  const prod1 = await productManager.agregarProducto(
    "Producto 1",
    "Descripción 1",
    10000,
    "imagen.jpg",
    "123",
    10
  )
  console.log("Producto agregado: " + prod1.code)
  const prod2 = await productManager.agregarProducto(
    "Producto 2",
    "Descripción 2",
    20000,
    "imagen2.jpg",
    "456",
    20
  )
  console.log("Producto agregado: " + prod2.code)

  console.log("Productos al momento: ", productManager.getAllProducts())

  const prodById = await productManager.consultarPorId(1)
  console.log('Traigo este producto por id: ' + prodById)

  const updated = await productManager.actualizarProducto(2, {
    description: "Hola",
  })
  console.log(`Producto actualizado: ${JSON.stringify(updated, null, 2)}`)

  console.log(
    "Todos los productos luego de la actualizacion: ",
     productManager.getAllProducts()
  )

  const deleteProd = await productManager.borrarProducto(1)
  console.log("Producto eliminado: " + deleteProd.id)
  console.log("Productos luego de borrar: ", productManager.getAllProducts())
}

testManager() */

module.exports = ProductManager
