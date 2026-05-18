import type React from "react";

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">CMS Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
            <li className="cursor-pointer hover:text-gray-300">Content Management</li>
            <li className="cursor-pointer hover:text-gray-300">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
