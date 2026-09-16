"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import AppShell from "@/src/components/appshell";
import { getToken } from "@/src/lib/auth";

interface Category {
  id: string;
  name: string;
  ticketCount: number;
}

const API_BASE = "http://localhost:3006";

export default function CategoriesListPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const data: Category[] = await res.json();
      setCategories(data);
    } catch {
      setErrorMsg("Couldn't load categories. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <AppShell>
      <div className="px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-[22px] font-medium mb-1"
              style={{ color: "#1E1522" }}
            >
              Categories
            </h1>
            <p className="text-[13.5px]" style={{ color: "#746B7E" }}>
              {categories.length ? `${categories.length} total` : "Loading…"}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div
            className="mb-4 px-4 py-3 rounded-lg text-[13px]"
            style={{ backgroundColor: "#FCEBEB", color: "#A32D2D" }}
          >
            {errorMsg}
          </div>
        )}

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #E8E2EE" }}
        >
          <table
            className="w-full text-left"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#FAF8FB" }}>
                {["Category", "Tickets", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[12px] font-medium"
                    style={{
                      color: "#9891A0",
                      borderBottom: "1px solid #E8E2EE",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-10 text-center text-[13.5px]"
                    style={{ color: "#9891A0" }}
                  >
                    Loading categories…
                  </td>
                </tr>
              )}

              {!loading && categories.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-10 text-center text-[13.5px]"
                    style={{ color: "#9891A0" }}
                  >
                    No categories yet.
                  </td>
                </tr>
              )}

              {!loading &&
                categories.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => router.push(`/tickets?category=${c.id}`)}
                    className="cursor-pointer hover:bg-[#FAF8FB]"
                    style={{ borderBottom: "1px solid #F0ECF4" }}
                  >
                    <td
                      className="px-4 py-3 text-[13.5px] font-medium"
                      style={{ color: "#1E1522" }}
                    >
                      {c.name}
                    </td>
                    <td
                      className="px-4 py-3 text-[13px]"
                      style={{ color: "#746B7E" }}
                    >
                      {c.ticketCount}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Icon
                        icon="mdi:chevron-right"
                        width={18}
                        height={18}
                        color="#9891A0"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
