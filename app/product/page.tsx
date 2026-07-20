import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { deliceProduct } from "@/lib/productData";

export default function ProductPage() {
  const product = deliceProduct;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Core Product Selector Card */}
        <ProductCard product={product} />

        {/* Detailed Description & Ingredients & Benefits Sections */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Detailed Info */}
          <div className="lg:col-span-2 space-y-8 bg-warm-white p-6 md:p-8 border border-brown/10 rounded-2xl">
            <div>
              <h3 className="font-serif text-base md:text-lg text-brown font-bold tracking-tight mb-3">
                Kanpur's Traditional Remedy
              </h3>
              <p className="text-sm md:text-base text-dark-coffee/85 font-sans leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Ayurvedic Benefits */}
            <div>
              <h3 className="font-serif text-base md:text-lg text-brown font-bold tracking-tight mb-4">
                Ayurvedic Wellness & Health Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-dark-coffee/85">
                    <span className="flex-shrink-0 bg-olive/15 text-olive p-1 rounded-full mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Kanpur Heritage details */}
            <div className="border-t border-brown/10 pt-6">
              <h3 className="font-serif text-base text-brown font-bold tracking-tight mb-2">
                Kanpur Heritage Origin
              </h3>
              <p className="text-xs md:text-sm text-dark-coffee/75 leading-relaxed font-sans">
                Delice is a legacy spice blend hailing from Kanpur, Uttar Pradesh. Known for generations as a gut protector and digestion enhancer, it is toasted in small copper vats with cold-pressed mustard oil, unlocking natural healing properties of carom seeds, asafoetida, and dry ginger. Our blend keeps this Kanpur tradition alive with pure, source-verified local spices.
              </p>
            </div>
          </div>

          {/* Ingredients Grid Card */}
          <div className="bg-cream border border-brown/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base md:text-lg text-brown font-bold tracking-tight mb-4">
                12 Hand-Ground Ingredients
              </h3>
              <p className="text-xs text-dark-coffee/70 font-sans mb-6">
                Stone-ground to a velvety texture to preserve active digestive essential oils.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {product.ingredients.map((ingredient, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs md:text-sm text-dark-coffee font-sans border-b border-brown/5 pb-2">
                    <span className="text-cinnamon font-bold font-serif">{String(i + 1).padStart(2, '0')}.</span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center bg-warm-white p-4 rounded-xl border border-brown/5">
              <span className="text-[10px] tracking-widest text-olive font-bold uppercase block mb-1">
                Ayurvedic Standard
              </span>
              <span className="text-xs text-dark-coffee/80 font-sans font-medium">
                100% Raw · Stone Ground · Kanpur Batch
              </span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
