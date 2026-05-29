"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CreditCard,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
  X
} from "lucide-react";

type Category = "Clásicos" | "Elegantes" | "Premium" | "Verano";

type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  badge?: string;
};

type CartItem = Product & {
  quantity: number;
};

type SortOption = "featured" | "price-asc" | "price-desc";

const WHATSAPP_NUMBER = "573215625844";

const products: Product[] = [
  {
    id: 1,
    name: "Sombrero Aguadeño Clásico",
    category: "Clásicos",
    price: 189000,
    image: "https://picsum.photos/seed/sombrero-aguadeno/700/800",
    description: "Tejido a mano con ala firme y copa tradicional.",
    badge: "Más vendido"
  },
  {
    id: 2,
    name: "Sombrero Café Dorado",
    category: "Elegantes",
    price: 219000,
    image: "https://picsum.photos/seed/sombrero-cafe/700/800",
    description: "Acabado cálido con cinta artesanal de contraste."
  },
  {
    id: 3,
    name: "Sombrero Fino Lasso",
    category: "Premium",
    price: 269000,
    image: "https://picsum.photos/seed/sombrero-fino/700/800",
    description: "Pieza elegante para vestir tradición colombiana.",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Sombrero Palma Natural",
    category: "Verano",
    price: 169000,
    image: "https://picsum.photos/seed/sombrero-palma/700/800",
    description: "Ligero, fresco y cómodo para días soleados."
  },
  {
    id: 5,
    name: "Sombrero Cinta Caramelo",
    category: "Elegantes",
    price: 239000,
    image: "https://picsum.photos/seed/sombrero-caramelo/700/800",
    description: "Cinta en tono caramelo con silueta sobria y versátil.",
    badge: "Nuevo"
  },
  {
    id: 6,
    name: "Sombrero Tradición Andina",
    category: "Clásicos",
    price: 199000,
    image: "https://picsum.photos/seed/sombrero-andino/700/800",
    description: "Inspirado en formas tradicionales de la montaña colombiana."
  },
  {
    id: 7,
    name: "Sombrero Lasso Ejecutivo",
    category: "Premium",
    price: 299000,
    image: "https://picsum.photos/seed/sombrero-ejecutivo/700/800",
    description: "Acabado fino para eventos, viajes y uso urbano."
  },
  {
    id: 8,
    name: "Sombrero Arena Costera",
    category: "Verano",
    price: 179000,
    image: "https://picsum.photos/seed/sombrero-arena/700/800",
    description: "Diseño amplio con presencia relajada y protección solar."
  }
];

const categories = ["Todos", "Clásicos", "Elegantes", "Premium", "Verano"] as const;

const navItems = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" }
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(price);

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const whatsappHref = useMemo(() => {
    const productLines = cartItems
      .map(
        (item) =>
          `- ${item.quantity} x ${item.name} (${formatPrice(
            item.price * item.quantity
          )})`
      )
      .join("\n");

    const message = `Hola, quiero hacer este pedido en Sombreros Lasso:\n\n${productLines}\n\nSubtotal: ${formatPrice(
      subtotal
    )}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  }, [cartItems, subtotal]);

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  return (
    <main className="min-h-screen bg-[#f7efe2] text-[#24160f]">
      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />
      <Hero />
      <CatalogSection onAddToCart={addToCart} />
      <TrustSection />
      <Footer />
      <CartDrawer
        cartItems={cartItems}
        isOpen={isCartOpen}
        subtotal={subtotal}
        whatsappHref={whatsappHref}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={updateQuantity}
        onRemove={removeFromCart}
      />
    </main>
  );
}

function Navbar({
  cartCount,
  onCartOpen
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9c3a0]/70 bg-[#f7efe2]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="font-serif text-xl font-bold text-[#3a2418]">
          Sombreros Lasso
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#5f432f] transition hover:text-[#9b6b21]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Abrir carrito"
            onClick={onCartOpen}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b78b4b] bg-[#fff8ec] text-[#4b2f20] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f2dfbd]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c8953d] px-1 text-xs font-bold text-[#24160f]">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b78b4b] bg-[#3a2418] text-[#fff8ec] shadow-sm transition hover:bg-[#5a3825] md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-[#d9c3a0]/70 bg-[#fff8ec] px-5 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-[#4b2f20] transition hover:bg-[#f2dfbd] hover:text-[#8a5a19]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden">
      <Image
        src="https://picsum.photos/seed/sombreros-lasso-hero/1800/1200"
        alt="Sombrero artesanal colombiano sobre una superficie cálida"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e130d]/85 via-[#3b2618]/55 to-[#f7efe2]/10" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 pb-16 pt-20 sm:px-8">
        <div className="max-w-3xl text-[#fff8ec]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#d9ad5d]">
            Artesanía colombiana
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Sombreros con alma, elegancia y tradición
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f4dfbd] sm:text-xl">
            Piezas artesanales hechas para acompañar días de sol, celebraciones
            y momentos donde vestir bien también cuenta una historia.
          </p>
          <a
            href="#catalogo"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-[#c8953d] px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#24160f] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-[#d9ad5d]"
          >
            Ver catálogo
          </a>
        </div>
      </div>
    </section>
  );
}

function CatalogSection({
  onAddToCart
}: {
  onAddToCart: (product: Product) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Todos");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          activeCategory === "Todos" || product.category === activeCategory;
        const matchesSearch =
          normalizedSearch.length === 0 ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") {
          return a.price - b.price;
        }

        if (sortOption === "price-desc") {
          return b.price - a.price;
        }

        return a.id - b.id;
      });
  }, [activeCategory, searchTerm, sortOption]);

  return (
    <section id="catalogo" className="bg-[#fff8ec] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b6b21]">
              Catálogo
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a2418] sm:text-5xl">
              Sombreros artesanales
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#6f523b]">
            Explora estilos clásicos, elegantes, premium y de verano. Las fotos
            son temporales mientras definimos la producción visual real.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-[#e4d0af] bg-[#f7efe2] p-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Buscar producto</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a5a19]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nombre, estilo o descripción"
                className="h-12 w-full rounded-full border border-[#d9c3a0] bg-[#fff8ec] pl-12 pr-4 text-sm font-medium text-[#3a2418] outline-none transition placeholder:text-[#8a745e] focus:border-[#9b6b21] focus:ring-2 focus:ring-[#d9ad5d]/40"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-xl">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-[#3a2418] bg-[#3a2418] text-[#fff8ec]"
                        : "border-[#d9c3a0] bg-[#fff8ec] text-[#5f432f] hover:border-[#9b6b21]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="block">
              <span className="sr-only">Ordenar productos</span>
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as SortOption)
                }
                className="h-12 w-full rounded-full border border-[#d9c3a0] bg-[#fff8ec] px-4 text-sm font-semibold text-[#4b2f20] outline-none transition focus:border-[#9b6b21] focus:ring-2 focus:ring-[#d9ad5d]/40 lg:w-48"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 text-sm text-[#6f523b]">
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
          {(searchTerm || activeCategory !== "Todos") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("Todos");
                setSortOption("featured");
              }}
              className="font-semibold text-[#8a5a19] transition hover:text-[#3a2418]"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-lg border border-[#e4d0af] bg-[#f7efe2] shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3a2418]/10"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {product.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-[#d9ad5d] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#24160f]">
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9b6b21]">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-2xl font-bold leading-7 text-[#3a2418]">
                    {product.name}
                  </h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-[#6f523b]">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-4">
                    <span className="text-lg font-bold text-[#8a5a19]">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3a2418] px-4 py-2.5 text-sm font-semibold text-[#fff8ec] transition hover:bg-[#5a3825]"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-[#e4d0af] bg-[#f7efe2] px-6 py-12 text-center">
            <p className="font-serif text-2xl font-bold text-[#3a2418]">
              No encontramos sombreros con esos filtros
            </p>
            <p className="mt-3 text-sm text-[#6f523b]">
              Prueba con otra categoría o limpia la búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CartDrawer({
  cartItems,
  isOpen,
  subtotal,
  whatsappHref,
  onClose,
  onQuantityChange,
  onRemove
}: {
  cartItems: CartItem[];
  isOpen: boolean;
  subtotal: number;
  whatsappHref: string;
  onClose: () => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[60] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fff8ec] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e4d0af] px-5 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b6b21]">
              Tu pedido
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#3a2418]">
              Carrito
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3a2418] text-[#fff8ec] transition hover:bg-[#5a3825]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f2dfbd] text-[#4b2f20]">
                <ShoppingCart className="h-7 w-7" />
              </div>
              <p className="font-serif text-2xl font-bold text-[#3a2418]">
                Tu carrito está vacío
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#6f523b]">
                Agrega un sombrero del catálogo para preparar el pedido por
                WhatsApp.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[82px_1fr] gap-4 rounded-lg border border-[#e4d0af] bg-[#f7efe2] p-3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="82px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold leading-6 text-[#3a2418]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#8a5a19]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Eliminar ${item.name}`}
                        onClick={() => onRemove(item.id)}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#7b4b32] transition hover:bg-[#ead6b7]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#d9c3a0] bg-[#fff8ec]">
                        <button
                          type="button"
                          aria-label={`Disminuir cantidad de ${item.name}`}
                          onClick={() =>
                            onQuantityChange(item.id, item.quantity - 1)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center text-[#4b2f20] transition hover:bg-[#f2dfbd]"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          onClick={() =>
                            onQuantityChange(item.id, item.quantity + 1)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center text-[#4b2f20] transition hover:bg-[#f2dfbd]"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#3a2418]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#e4d0af] px-5 py-5">
          <div className="mb-4 flex items-center justify-between text-[#3a2418]">
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">
              Subtotal
            </span>
            <span className="font-serif text-2xl font-bold">
              {formatPrice(subtotal)}
            </span>
          </div>
          <a
            href={cartItems.length > 0 ? whatsappHref : undefined}
            aria-disabled={cartItems.length === 0}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
              cartItems.length > 0
                ? "bg-[#3a2418] text-[#fff8ec] hover:bg-[#5a3825]"
                : "cursor-not-allowed bg-[#d9c3a0] text-[#7b5b43]"
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}

function TrustSection() {
  const items = [
    {
      icon: Truck,
      title: "Envíos a todo Colombia",
      text: "Despachos nacionales con empaque protegido."
    },
    {
      icon: CreditCard,
      title: "Pago seguro",
      text: "Compra con métodos confiables y confirmación rápida."
    },
    {
      icon: MessageCircle,
      title: "WhatsApp 24/7",
      text: "Asesoría directa para tallas, estilos y disponibilidad."
    }
  ];

  return (
    <section
      id="nosotros"
      className="bg-[#3a2418] px-5 py-16 text-[#fff8ec] sm:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-lg border border-[#d9ad5d]/30 bg-[#4b2f20] p-6"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#d9ad5d] text-[#24160f]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#f4dfbd]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-[#d9c3a0] bg-[#24160f] px-5 py-10 text-[#fff8ec] sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold">Sombreros Lasso</p>
          <p className="mt-2 text-sm text-[#f4dfbd]">
            Tradición artesanal colombiana para vestir con carácter.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-medium text-[#f4dfbd]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-[#d9ad5d]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="text-sm font-semibold text-[#d9ad5d] transition hover:text-[#fff8ec]"
        >
          WhatsApp: +57 321 562 5844
        </a>
      </div>
    </footer>
  );
}
