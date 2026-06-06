"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Package, Gift, Globe, LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard },
  { label: "Products",  href: "/admin/products",  Icon: Package },
  { label: "Bundle",    href: "/admin/bundles",   Icon: Gift },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`flex flex-col h-full ${mobile ? "w-64" : "w-60"}`}
      style={{ background: "linear-gradient(180deg, #0F2B1F 0%, #1B4332 100%)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo size={32} textColor="white" />
        <p className="text-white/40 text-[10px] font-body mt-1 ml-10 pl-1 tracking-wider uppercase">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ label, href, Icon }) => {
          const active = pathname === href;
          return (
            <a
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={17} />
              {label}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
        >
          <Globe size={17} />
          View Site
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[#F5F5F0] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <Menu size={20} className="text-forest" />
          </button>
          <Logo size={28} textColor="#1B4332" />
          <div className="w-9" />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
