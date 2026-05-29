import Image from "next/image";
import {
  CreditCard,
  MessageCircle,
  ShoppingCart,
  Truck
} from "lucide-react";

type Product = {
  name: string;
  price: string;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    name: "Sombrero Aguadeño Clásico",
    price: "$189.000 COP",
    image: "https://picsum.photos/seed/sombrero-aguadeno/700/800",
    description: "Tejido a mano con ala firme y copa tradicional."
  },
  {
    name: "Sombrero Café Dorado",
    price: "$219.000 COP",
    image: "https://picsum.photos/seed/sombrero-cafe/700/800",
    description: "Acabado cálido con cinta artesanal de contraste."
  },
  {
    name: "Sombrero Fino Lasso",
    price: "$269.000 COP",
    image: "https://picsum.photos/seed/sombrero-fino/700/800",
    description: "Pieza elegante para vestir tradición colombiana."
  }
];

const navLinks = ["Catálogo", "Nosotros", "Contacto"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7efe2] text-[#24160f]">
      <Navbar />
      <Hero />
      <CatalogPreview />
      <TrustSection />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d9c3a0]/70 bg-[#f7efe2]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="font-serif text-xl font-bold text-[#3a2418]">
          Sombreros Lasso
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-[#5f432f] transition hover:text-[#9b6b21]"
            >
              {link}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Abrir carrito"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b78b4b] bg-[#fff8ec] text-[#4b2f20] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f2dfbd]"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </nav>
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
            href="#catálogo"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-[#c8953d] px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#24160f] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-[#d9ad5d]"
          >
            Ver catálogo
          </a>
        </div>
      </div>
    </section>
  );
}

function CatalogPreview() {
  return (
    <section id="catálogo" className="bg-[#fff8ec] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b6b21]">
              Catálogo preview
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a2418] sm:text-5xl">
              Selección artesanal
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#6f523b]">
            Tres estilos pensados para quienes buscan una pieza sobria, durable
            y con carácter colombiano.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-lg border border-[#e4d0af] bg-[#f7efe2] shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3a2418]/10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-[#3a2418]">
                  {product.name}
                </h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-[#6f523b]">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-lg font-bold text-[#8a5a19]">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[#3a2418] px-4 py-2 text-sm font-semibold text-[#fff8ec] transition hover:bg-[#5a3825]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section id="nosotros" className="bg-[#3a2418] px-5 py-16 text-[#fff8ec] sm:px-8">
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
    <footer id="contacto" className="border-t border-[#d9c3a0] bg-[#24160f] px-5 py-10 text-[#fff8ec] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold">Sombreros Lasso</p>
          <p className="mt-2 text-sm text-[#f4dfbd]">
            Tradición artesanal colombiana para vestir con carácter.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-medium text-[#f4dfbd]">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="transition hover:text-[#d9ad5d]"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/573001234567"
          className="text-sm font-semibold text-[#d9ad5d] transition hover:text-[#fff8ec]"
        >
          WhatsApp: +57 3215625844
        </a>
      </div>
    </footer>
  );
}
