import Navbar from "@/components/layout/Navbar";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">About Company</h1>
        <p className="text-xl text-gray-600 max-w-2xl text-center">
          We combine innovative software and IoT technology to deliver solutions that streamline operations, improve efficiency, and drive real impact.
        </p>
      </main>
    </div>
  );
}
