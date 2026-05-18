import Navbar from "@/components/layout/Navbar";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl text-center">
          From smart software systems to IoT devices, our products are designed to solve real operational challenges.
        </p>
      </main>
    </div>
  );
}
