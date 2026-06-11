
"use client";
import { useState, useEffect } from "react";

const BG_IMAGES = {
  hero: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=80",
  menu: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400&q=80",
  gallery: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1400&q=80",
  contact: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1400&q=80",
};

const DEFAULT_CAKES = [
  { id: 1, name: "Black Forest Cake", price: 499, discount: 0, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", tag: "Bestseller", desc: "Dark chocolate sponge, cherries & fresh whipped cream" },
  { id: 2, name: "Red Velvet Cake", price: 599, discount: 10, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80", tag: "Popular", desc: "Velvety layers with cream cheese frosting" },
  { id: 3, name: "Chocolate Truffle", price: 649, discount: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", tag: "Rich", desc: "Rich ganache layers on dark chocolate sponge" },
  { id: 4, name: "Blueberry Cake", price: 599, discount: 15, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80", tag: "Fresh", desc: "Fresh blueberries & vanilla cream sponge" },
  { id: 5, name: "Butterscotch Cake", price: 549, discount: 0, img: "https://images.unsplash.com/photo-1567461345047-a2a7f9b5e8a8?w=600&q=80", tag: "Sweet", desc: "Caramel butterscotch with praline crunch" },
  { id: 6, name: "Custom Birthday", price: 799, discount: 0, img: "https://images.unsplash.com/photo-1558636508-e0969431e467?w=600&q=80", tag: "Custom", desc: "Your dream cake, any design, any theme" },
];

const REVIEWS = [
  { name: "Priya S.", loc: "Ayyappa Society", text: "Best birthday cake in Madhapur! The Black Forest was divine. My daughter cried happy tears!", stars: 5 },
  { name: "Rahul M.", loc: "Hitech City", text: "Custom design for our office anniversary. Perfect execution, on-time delivery. 10/10!", stars: 5 },
  { name: "Ananya K.", loc: "Kondapur", text: "Red Velvet was so moist and fresh. Already ordered twice this month!", stars: 5 },
  { name: "Kiran P.", loc: "Madhapur", text: "WhatsApp ordering is so easy. Cake arrived in 2 hours. Will always order from here!", stars: 5 },
];

const GALLERY_ITEMS = [
  { img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", label: "Black Forest" },
  { img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", label: "Chocolate" },
  { img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80", label: "Red Velvet" },
  { img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80", label: "Blueberry" },
  { img: "https://images.unsplash.com/photo-1558636508-e0969431e467?w=600&q=80", label: "Birthday" },
  { img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", label: "Truffle" },
  { img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80", label: "Custom Cake" },
  { img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80", label: "Pastries" },
  { img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80", label: "Celebration" },
];

// ── Particle system ──
function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${4 + (i % 5) * 3}px`,
          height: `${4 + (i % 5) * 3}px`,
          borderRadius: "50%",
          background: `rgba(200,134,10,${0.15 + (i % 4) * 0.08})`,
          left: `${(i * 17 + 5) % 100}%`,
          top: `${(i * 23 + 10) % 100}%`,
          animation: `float${i % 3} ${6 + (i % 5)}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return <span style={{ color: "#F59E0B", fontSize: "1rem", letterSpacing: 2 }}>{"★".repeat(n)}</span>;
}

// ── WhatsApp floating button ──
function WAButton({ msg = "Hello Cake Land, I would like to order a cake." }) {
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 3000); return () => clearTimeout(t); }, []);
  return (
    <a
      href={`https://wa.me/919246741544?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 999,
        width: 60, height: 60, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: pulse
          ? "0 0 0 12px rgba(37,211,102,0.2), 0 8px 32px rgba(37,211,102,0.5)"
          : "0 8px 32px rgba(37,211,102,0.4)",
        transition: "all 0.3s",
        animation: pulse ? "waPulse 1.5s ease-in-out infinite" : "none",
        cursor: "pointer", textDecoration: "none",
      }}
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ── Cake Card ──
function CakeCard({ cake, onOrder, animate, idx }) {
  const [hovered, setHovered] = useState(false);
  const discPrice = cake.discount > 0 ? Math.round(cake.price * (1 - cake.discount / 100)) : null;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.97)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 24px 60px rgba(44,24,16,0.22), 0 0 0 2px #C8860A"
          : "0 4px 24px rgba(44,24,16,0.1)",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(.4,2,.55,1)",
        animation: animate ? `slideUp 0.5s ease ${idx * 0.08}s both` : "none",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={cake.img}
          alt={cake.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(44,24,16,0.15)" : "transparent",
          transition: "0.3s",
        }} />
        {cake.tag && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: cake.tag === "Bestseller" ? "#C8860A" : cake.tag === "Popular" ? "#E85050" : "#2C1810",
            color: "#fff", fontSize: "0.7rem", fontWeight: 700,
            padding: "4px 10px", borderRadius: 20,
            letterSpacing: 1, textTransform: "uppercase",
          }}>{cake.tag}</div>
        )}
        {cake.discount > 0 && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "#22C55E", color: "#fff",
            fontSize: "0.75rem", fontWeight: 700,
            padding: "4px 10px", borderRadius: 20,
          }}>{cake.discount}% OFF</div>
        )}
      </div>
      <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#2C1810", marginBottom: 4, fontWeight: 700 }}>{cake.name}</div>
        <div style={{ fontSize: "0.8rem", color: "#7A5C4A", marginBottom: "0.9rem", lineHeight: 1.5 }}>{cake.desc}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {discPrice ? (
              <span>
                <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#C8860A" }}>₹{discPrice}</span>
                <span style={{ fontSize: "0.8rem", color: "#aaa", textDecoration: "line-through", marginLeft: 6 }}>₹{cake.price}</span>
              </span>
            ) : (
              <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#C8860A" }}>₹{cake.price}</span>
            )}
          </div>
          <button
            onClick={() => onOrder(cake.name, discPrice || cake.price)}
            style={{
              background: hovered ? "#C8860A" : "#2C1810",
              color: "#fff", border: "none", borderRadius: 8,
              padding: "0.5rem 1.1rem", fontSize: "0.82rem", fontWeight: 600,
              cursor: "pointer", transition: "background 0.2s",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span>💬</span> Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Gallery Item — each has its own hover state (BUG FIX) ──
function GalleryItem({ item, onOrder }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "1", cursor: "pointer" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOrder(`${item.label} Cake`, "")}
    >
      <img
        src={item.img}
        alt={item.label}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.4s ease",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hov ? "rgba(44,24,16,0.55)" : "rgba(44,24,16,0.1)",
        transition: "0.3s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {hov && (
          <div style={{
            color: "#fff", fontFamily: "'Playfair Display',serif",
            fontSize: "1.1rem", fontWeight: 700, textAlign: "center",
            animation: "fadeIn 0.2s ease",
          }}>
            <div>{item.label}</div>
            <div style={{ fontSize: "0.78rem", color: "#C8860A", marginTop: 4 }}>Tap to Order →</div>
          </div>
        )}
      </div>
      {!hov && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(26,12,6,0.8))",
          padding: "1.5rem 0.75rem 0.75rem",
        }}>
          <div style={{ color: "#FDF8F2", fontSize: "0.82rem", fontWeight: 500 }}>{item.label}</div>
        </div>
      )}
    </div>
  );
}

// ── Admin Panel ──
function AdminPanel({ cakes, setCakes, onClose }) {
  const [tab, setTab] = useState("products");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  function startEdit(cake) { setEditing(cake.id); setForm({ ...cake }); }
  function saveEdit() {
    setCakes(cakes.map(c =>
      c.id === editing
        ? { ...form, price: Number(form.price), discount: Number(form.discount || 0) }
        : c
    ));
    setEditing(null);
  }
  function addNew() {
    const newC = {
      id: Date.now(), name: "New Cake", price: 499, discount: 0,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
      tag: "New", desc: "Delicious freshly baked cake",
    };
    setCakes([...cakes, newC]);
    startEdit(newC);
  }
  function deleteC(id) { setCakes(cakes.filter(c => c.id !== id)); }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    }}>
      <div style={{
        background: "#1A0C06", borderRadius: 20, width: "100%", maxWidth: 700,
        maxHeight: "90vh", overflow: "auto", border: "1px solid #3A2010",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
      }}>
        <div style={{
          padding: "1.5rem 2rem", borderBottom: "1px solid #3A2010",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#FDF8F2" }}>🔑 Owner Dashboard</div>
            <div style={{ fontSize: "0.8rem", color: "#C4A88A", marginTop: 2 }}>Cake Land — Madhapur</div>
          </div>
          <button onClick={onClose} style={{
            background: "#3A2010", border: "none", color: "#C4A88A",
            borderRadius: 8, padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "1rem",
          }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "1rem 2rem 0" }}>
          {["products", "photos"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? "#C8860A" : "#2C1810",
              border: "none",
              color: tab === t ? "#fff" : "#C4A88A",
              borderRadius: 8, padding: "0.5rem 1.25rem",
              cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", textTransform: "capitalize",
            }}>
              {t === "products" ? "🎂 Products & Prices" : "📸 Photos"}
            </button>
          ))}
        </div>

        <div style={{ padding: "1.5rem 2rem" }}>
          {tab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ color: "#C4A88A", fontSize: "0.85rem" }}>Edit prices, discounts & details</div>
                <button onClick={addNew} style={{
                  background: "#22C55E", color: "#fff", border: "none",
                  borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem",
                }}>+ Add Cake</button>
              </div>
              {cakes.map(cake => (
                <div key={cake.id} style={{
                  background: "#2C1810", borderRadius: 12, padding: "1rem", marginBottom: "0.75rem",
                  border: editing === cake.id ? "1px solid #C8860A" : "1px solid #3A2010",
                }}>
                  {editing === cake.id ? (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {[["name", "Cake Name"], ["price", "Price (₹)"], ["discount", "Discount (%)"], ["tag", "Tag"], ["img", "Image URL"]].map(([k, label]) => (
                        <div key={k} style={{ gridColumn: k === "img" || k === "name" ? "span 2" : "span 1" }}>
                          <label style={{ fontSize: "0.75rem", color: "#C4A88A", display: "block", marginBottom: 4 }}>{label}</label>
                          <input
                            value={form[k] || ""}
                            onChange={e => setForm({ ...form, [k]: e.target.value })}
                            style={{
                              width: "100%", background: "#1A0C06", border: "1px solid #5A3020",
                              borderRadius: 6, padding: "0.5rem 0.75rem", color: "#FDF8F2",
                              fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
                            }}
                          />
                        </div>
                      ))}
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ fontSize: "0.75rem", color: "#C4A88A", display: "block", marginBottom: 4 }}>Description</label>
                        <textarea
                          value={form.desc || ""}
                          onChange={e => setForm({ ...form, desc: e.target.value })}
                          rows={2}
                          style={{
                            width: "100%", background: "#1A0C06", border: "1px solid #5A3020",
                            borderRadius: 6, padding: "0.5rem 0.75rem", color: "#FDF8F2",
                            fontSize: "0.85rem", outline: "none", resize: "none", boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div style={{ gridColumn: "span 2", display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{
                          background: "#C8860A", color: "#fff", border: "none",
                          borderRadius: 8, padding: "0.5rem 1.25rem", cursor: "pointer", fontWeight: 700, flex: 1,
                        }}>✓ Save</button>
                        <button onClick={() => setEditing(null)} style={{
                          background: "#3A2010", color: "#C4A88A", border: "none",
                          borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer",
                        }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img src={cake.img} alt="" style={{
                        width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: "2px solid #3A2010",
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#FDF8F2", fontWeight: 600, fontSize: "0.92rem" }}>{cake.name}</div>
                        <div style={{ color: "#C4A88A", fontSize: "0.8rem" }}>
                          ₹{cake.price}
                          {cake.discount > 0 && (
                            <span style={{
                              background: "#22C55E", color: "#fff", borderRadius: 4,
                              padding: "1px 6px", fontSize: "0.7rem", marginLeft: 6,
                            }}>
                              {cake.discount}% OFF → ₹{Math.round(cake.price * (1 - cake.discount / 100))}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => startEdit(cake)} style={{
                          background: "#C8860A", color: "#fff", border: "none",
                          borderRadius: 6, padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.8rem",
                        }}>✏️ Edit</button>
                        <button onClick={() => deleteC(cake.id)} style={{
                          background: "#E85050", color: "#fff", border: "none",
                          borderRadius: 6, padding: "0.35rem 0.7rem", cursor: "pointer", fontSize: "0.8rem",
                        }}>🗑</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {tab === "photos" && (
            <div>
              <div style={{
                color: "#C4A88A", fontSize: "0.85rem", marginBottom: "1rem",
                background: "#2C1810", borderRadius: 10, padding: "0.75rem 1rem", border: "1px solid #3A2010",
              }}>
                📌 To update photos: paste any image URL from Unsplash, Google, or your own photos into the Image URL field in the Products tab. For hero/background images, contact your developer with the new URLs.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {cakes.map(c => (
                  <div key={c.id} style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "1" }}>
                    <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "rgba(0,0,0,0.6)", color: "#fff",
                      fontSize: "0.7rem", padding: "4px 6px", textAlign: "center",
                    }}>{c.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── WhatsApp SVG icon ──
const WASvg = ({ size = 20, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Contact form state ──
function ContactForm({ cakes, showToast }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCake, setSelectedCake] = useState("");
  const [msg, setMsg] = useState("");

  function handleSend() {
    const txt = `Hello Cake Land! 🎂\n\nName: ${name || "Customer"}\nPhone: ${phone || ""}\nCake: ${selectedCake || "Not selected"}\nMessage: ${msg || ""}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/919246741544?text=${encodeURIComponent(txt)}`, "_blank");
    showToast("Opening WhatsApp with your order! 🎉");
  }

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", border: "1px solid #EFE3D0",
    borderRadius: 8, fontFamily: "inherit", fontSize: "0.9rem", color: "#2C1810",
    outline: "none", background: "#fff", transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#2C1810", marginBottom: "2rem" }}>Order via WhatsApp</div>
      {[
        { label: "Your Name", value: name, setter: setName, type: "text", placeholder: "Enter your name" },
        { label: "Phone Number", value: phone, setter: setPhone, type: "tel", placeholder: "+91 XXXXX XXXXX" },
      ].map(({ label, value, setter, type, placeholder }) => (
        <div key={label} style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "#2C1810", marginBottom: 5 }}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setter(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "#C8860A")}
            onBlur={e => (e.target.style.borderColor = "#EFE3D0")}
          />
        </div>
      ))}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "#2C1810", marginBottom: 5 }}>Cake Type</label>
        <select
          value={selectedCake}
          onChange={e => setSelectedCake(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={e => (e.target.style.borderColor = "#C8860A")}
          onBlur={e => (e.target.style.borderColor = "#EFE3D0")}
        >
          <option value="">Select a cake...</option>
          {cakes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          <option value="Custom">Custom Design</option>
        </select>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "#2C1810", marginBottom: 5 }}>Special Request / Message</label>
        <textarea
          rows={4}
          placeholder="Tell us your design, delivery date, weight, or any special requirements..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
          style={{ ...inputStyle, resize: "none" }}
          onFocus={e => (e.target.style.borderColor = "#C8860A")}
          onBlur={e => (e.target.style.borderColor = "#EFE3D0")}
        />
      </div>
      <button
        onClick={handleSend}
        style={{
          width: "100%", background: "#25D366", color: "#fff", border: "none",
          padding: "0.9rem", borderRadius: 10, fontSize: "1rem", fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#1DA851")}
        onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
      >
        <WASvg size={20} /> Send via WhatsApp
      </button>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function CakeLand() {
  const [page, setPage] = useState("home");
  const [cakes, setCakes] = useState(DEFAULT_CAKES);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [askAdmin, setAskAdmin] = useState(false);

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 200); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3000); }

  function orderCake(name, price) {
    const msg = `Hello Cake Land! 🎂\nI would like to order:\n*${name}*${price ? ` — ₹${price}` : ""}\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/919246741544?text=${encodeURIComponent(msg)}`, "_blank");
    showToast(`Opening WhatsApp for ${name}!`);
  }

  const navLinks = ["home", "menu", "gallery", "about", "contact"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'DM Sans',sans-serif; }
    @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes float0 { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-20px) rotate(10deg); } }
    @keyframes float1 { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-30px) rotate(-8deg); } }
    @keyframes float2 { 0%,100% { transform:translateY(-10px); } 50% { transform:translateY(10px); } }
    @keyframes waPulse { 0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,0.4),0 8px 32px rgba(37,211,102,0.4); } 50% { box-shadow:0 0 0 16px rgba(37,211,102,0),0 8px 32px rgba(37,211,102,0.5); } }
    @keyframes heroReveal { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
    @keyframes bgKen { from { transform:scale(1); } to { transform:scale(1.06); } }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:#1A0C06; }
    ::-webkit-scrollbar-thumb { background:#C8860A; border-radius:3px; }
    @media (max-width:640px) {
      .hero-title { font-size:2.4rem !important; }
      .hero-sub { font-size:1rem !important; }
      .products-grid { grid-template-columns:1fr !important; }
      .contact-grid { grid-template-columns:1fr !important; }
      .about-grid { grid-template-columns:1fr !important; }
      .reviews-grid { grid-template-columns:1fr !important; }
      .features-grid { grid-template-columns:1fr 1fr !important; }
      .footer-grid { grid-template-columns:1fr !important; }
      .gallery-grid { grid-template-columns:repeat(2,1fr) !important; }
    }
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#FDF8F2", fontFamily: "'DM Sans',sans-serif", position: "relative" }}>
      <style>{css}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          background: "#2C1810", color: "#FDF8F2", padding: "0.75rem 1.5rem",
          borderRadius: 40, fontSize: "0.88rem", fontWeight: 500, zIndex: 1001,
          boxShadow: "0 8px 30px rgba(44,24,16,0.4)", animation: "fadeIn 0.3s ease",
          border: "1px solid #C8860A", whiteSpace: "nowrap",
        }}>{toast}</div>
      )}

      {/* Admin Modal */}
      {showAdmin && <AdminPanel cakes={cakes} setCakes={setCakes} onClose={() => setShowAdmin(false)} />}

      {/* Admin Login */}
      {askAdmin && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ background: "#1A0C06", borderRadius: 16, padding: "2rem", width: 320, border: "1px solid #3A2010" }}>
            <div style={{ color: "#FDF8F2", fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", marginBottom: "1rem" }}>🔑 Owner Access</div>
            <input
              type="password"
              placeholder="Enter password"
              value={adminCode}
              onChange={e => setAdminCode(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (adminCode === "admin123") { setShowAdmin(true); setAskAdmin(false); setAdminCode(""); }
                  else showToast("Wrong password!");
                }
              }}
              style={{
                width: "100%", background: "#2C1810", border: "1px solid #5A3020",
                borderRadius: 8, padding: "0.6rem 1rem", color: "#FDF8F2",
                fontSize: "0.9rem", outline: "none", marginBottom: "0.75rem",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  if (adminCode === "admin123") { setShowAdmin(true); setAskAdmin(false); setAdminCode(""); }
                  else showToast("Wrong password!");
                }}
                style={{ flex: 1, background: "#C8860A", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem", cursor: "pointer", fontWeight: 600 }}
              >Enter</button>
              <button onClick={() => { setAskAdmin(false); setAdminCode(""); }} style={{ background: "#3A2010", color: "#C4A88A", border: "none", borderRadius: 8, padding: "0.6rem 1rem", cursor: "pointer" }}>Cancel</button>
            </div>
            <div style={{ color: "#7A5C4A", fontSize: "0.75rem", marginTop: "0.75rem", textAlign: "center" }}>Hint: admin123</div>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(26,12,6,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(200,134,10,0.2)", padding: "0 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => setPage("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#FDF8F2",
          }}>
            Cake <span style={{ color: "#C8860A" }}>Land</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {navLinks.map(p => (
              <button key={p} onClick={() => setPage(p)} style={{
                background: page === p ? "rgba(200,134,10,0.2)" : "none",
                border: "none", color: page === p ? "#C8860A" : "#C4A88A",
                borderRadius: 8, padding: "0.4rem 0.9rem", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: page === p ? 600 : 400,
                textTransform: "capitalize", transition: "all 0.2s",
              }}>{p}</button>
            ))}
            <button onClick={() => setAskAdmin(true)} style={{
              background: "rgba(200,134,10,0.15)", border: "1px solid rgba(200,134,10,0.3)",
              color: "#C8860A", borderRadius: 8, padding: "0.4rem 0.75rem",
              cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, marginLeft: 4,
            }}>🔑</button>
          </div>
        </div>
      </nav>

      {/* ════════ HOME PAGE ════════ */}
      {page === "home" && (
        <div>
          {/* HERO */}
          <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <img src={BG_IMAGES.hero} alt="" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              filter: "blur(3px) brightness(0.35)",
              animation: "bgKen 20s ease-in-out infinite alternate",
              transform: "scale(1.06)",
            }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,12,6,0.85) 0%, rgba(44,24,16,0.7) 50%, rgba(72,40,20,0.6) 100%)" }} />
            <Particles />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem", width: "100%" }}>
              <div style={{ maxWidth: 640 }}>
                <div style={{
                  display: "inline-block", background: "rgba(200,134,10,0.2)", border: "1px solid rgba(200,134,10,0.4)",
                  color: "#C8860A", borderRadius: 20, padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 600,
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: "1.5rem",
                  animation: heroLoaded ? "heroReveal 0.6s ease 0.1s both" : "none",
                }}>🎂 Madhapur's Finest Bakery</div>
                <h1 className="hero-title" style={{
                  fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,6vw,4.5rem)",
                  color: "#FDF8F2", lineHeight: 1.12, marginBottom: "1.25rem", fontWeight: 700,
                  animation: heroLoaded ? "heroReveal 0.7s ease 0.2s both" : "none",
                }}>
                  Fresh Cakes<br />Baked with <em style={{ color: "#C8860A", fontStyle: "italic" }}>Love</em>
                </h1>
                <p className="hero-sub" style={{
                  color: "#C4A88A", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2.5rem",
                  fontWeight: 300, maxWidth: 480,
                  animation: heroLoaded ? "heroReveal 0.8s ease 0.35s both" : "none",
                }}>
                  Custom birthday cakes, pastries & celebration cakes made fresh every morning. Order in 30 seconds on WhatsApp.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: heroLoaded ? "heroReveal 0.9s ease 0.5s both" : "none" }}>
                  <a
                    href="https://wa.me/919246741544?text=Hello%20Cake%20Land!%20I%20would%20like%20to%20order%20a%20cake%20%F0%9F%8E%82"
                    target="_blank" rel="noreferrer"
                    style={{
                      background: "linear-gradient(135deg, #C8860A, #A86E08)",
                      color: "#fff", textDecoration: "none", padding: "0.9rem 2rem",
                      borderRadius: 12, fontWeight: 700, fontSize: "0.95rem",
                      boxShadow: "0 8px 32px rgba(200,134,10,0.4)",
                      display: "flex", alignItems: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(200,134,10,0.5)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,134,10,0.4)"; }}
                  >
                    <WASvg size={20} /> Order on WhatsApp
                  </a>
                  <button
                    onClick={() => setPage("menu")}
                    style={{
                      background: "transparent", border: "1px solid rgba(253,248,242,0.35)",
                      color: "#FDF8F2", padding: "0.9rem 1.75rem", borderRadius: 12,
                      fontWeight: 500, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,248,242,0.1)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >View Menu →</button>
                </div>
                <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", animation: heroLoaded ? "heroReveal 1s ease 0.7s both" : "none" }}>
                  {[["500+", "Happy Customers"], ["6+", "Cake Varieties"], ["⭐ 4.9", "Rating"]].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#C8860A", fontWeight: 700 }}>{n}</div>
                      <div style={{ color: "#7A5C4A", fontSize: "0.78rem", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED CAKES */}
          <section style={{ padding: "5rem 2rem", background: "#FDF8F2" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.4rem", color: "#2C1810", marginBottom: 8 }}>Our Signature Cakes</div>
                <div style={{ color: "#7A5C4A", fontWeight: 300, fontSize: "1rem" }}>Handcrafted fresh every morning • Order by WhatsApp in 30 seconds</div>
              </div>
              <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
                {cakes.map((c, i) => <CakeCard key={c.id} cake={c} onOrder={orderCake} animate idx={i} />)}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section style={{ padding: "5rem 2rem", background: "#2C1810", position: "relative", overflow: "hidden" }}>
            <img src={BG_IMAGES.menu} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(4px) brightness(0.2)", opacity: 0.5 }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.4rem", color: "#FDF8F2", marginBottom: 8 }}>Why Families Love Us</div>
                <div style={{ color: "#C4A88A", fontWeight: 300 }}>Trusted by 500+ customers in Madhapur</div>
              </div>
              <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
                {[
                  ["🌿", "Always Fresh", "Baked every morning, never stored overnight. Maximum freshness guaranteed."],
                  ["🎨", "Custom Designs", "Any theme, any message. Your dream cake brought to life."],
                  ["🏍️", "Fast Delivery", "Quick delivery across Madhapur, Kondapur & Hitech City."],
                  ["💰", "Best Value", "Premium ingredients at prices that make sense for every budget."],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{
                    background: "rgba(253,248,242,0.07)", border: "1px solid rgba(200,134,10,0.2)",
                    borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center",
                    backdropFilter: "blur(8px)", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,134,10,0.12)"; e.currentTarget.style.borderColor = "rgba(200,134,10,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,248,242,0.07)"; e.currentTarget.style.borderColor = "rgba(200,134,10,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#FDF8F2", marginBottom: "0.5rem" }}>{title}</div>
                    <div style={{ fontSize: "0.82rem", color: "#C4A88A", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section style={{ padding: "5rem 2rem", background: "#F9F1E8" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.4rem", color: "#2C1810", marginBottom: 8 }}>Happy Customers</div>
                <div style={{ color: "#7A5C4A", fontWeight: 300 }}>Real reviews from real people</div>
              </div>
              <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
                {REVIEWS.map((r, i) => (
                  <div key={i} style={{
                    background: "#fff", borderRadius: 16, padding: "1.75rem",
                    boxShadow: "0 4px 20px rgba(44,24,16,0.07)", border: "1px solid #EFE3D0",
                    animation: `slideUp 0.5s ease ${i * 0.1}s both`,
                  }}>
                    <Stars n={r.stars} />
                    <p style={{ fontSize: "0.88rem", color: "#7A5C4A", lineHeight: 1.7, margin: "0.75rem 0", fontStyle: "italic", fontWeight: 300 }}>"{r.text}"</p>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#2C1810" }}>{r.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#C8860A" }}>{r.loc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA STRIP */}
          <section style={{ background: "linear-gradient(135deg, #C8860A, #A86E08)", padding: "4rem 2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#fff", marginBottom: 12 }}>
              Ready to Order Your Dream Cake? 🎂
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontWeight: 300, fontSize: "1rem" }}>
              Chat directly with us on WhatsApp. Get confirmation in minutes.
            </p>
            <a
              href="https://wa.me/919246741544?text=Hello%20Cake%20Land!%20I%20would%20like%20to%20order%20a%20cake."
              target="_blank" rel="noreferrer"
              style={{
                background: "#fff", color: "#C8860A", textDecoration: "none",
                padding: "1rem 2.5rem", borderRadius: 12, fontWeight: 700, fontSize: "1rem",
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)", transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <WASvg size={22} color="#25D366" /> Order Now on WhatsApp
            </a>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "#1A0C06", padding: "3.5rem 2rem 2rem" }}>
            <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem" }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#FDF8F2", marginBottom: "0.75rem" }}>
                  Cake <span style={{ color: "#C8860A" }}>Land</span>
                </div>
                <p style={{ color: "#7A5C4A", fontSize: "0.875rem", lineHeight: 1.8, fontWeight: 300, maxWidth: 280 }}>
                  Freshly baked cakes & celebration treats in the heart of Madhapur, Hyderabad. Made with love, every day.
                </p>
              </div>
              <div>
                <div style={{ color: "#C4A88A", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Pages</div>
                {navLinks.map(p => (
                  <button key={p} onClick={() => setPage(p)} style={{
                    display: "block", background: "none", border: "none", color: "#7A5C4A",
                    cursor: "pointer", fontSize: "0.875rem", padding: "0.25rem 0",
                    textTransform: "capitalize", transition: "color 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FDF8F2")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7A5C4A")}
                  >{p}</button>
                ))}
              </div>
              <div>
                <div style={{ color: "#C4A88A", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Contact</div>
                <p style={{ color: "#7A5C4A", fontSize: "0.85rem", lineHeight: 2, fontWeight: 300 }}>
                  📍 Ayyappa Society, Madhapur<br />
                  📞 +91 92467 41544<br />
                  💬 WhatsApp orders 9AM–9PM
                </p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #2C1810", paddingTop: "1.5rem", textAlign: "center", color: "#5A3020", fontSize: "0.78rem" }}>
              © 2026 Cake Land, Hyderabad. All rights reserved.
            </div>
          </footer>
        </div>
      )}

      {/* ════════ MENU PAGE ════════ */}
      {page === "menu" && (
        <div>
          <div style={{ position: "relative", padding: "5rem 2rem", textAlign: "center", overflow: "hidden" }}>
            <img src={BG_IMAGES.menu} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(3px) brightness(0.3)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", color: "#FDF8F2", marginBottom: 8 }}>Our Menu</div>
              <div style={{ color: "#C4A88A", fontWeight: 300 }}>Everything baked fresh — order directly on WhatsApp</div>
            </div>
          </div>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
            {[
              { title: "🎂 Signature Cakes", items: [
                ["Black Forest Cake", "Dark chocolate, cherries & fresh cream", 499, 0],
                ["Red Velvet Cake", "Classic red velvet with cream cheese", 599, 10],
                ["Chocolate Truffle", "Rich ganache & dark chocolate sponge", 649, 0],
                ["Blueberry Cake", "Fresh blueberries & vanilla cream", 599, 15],
                ["Butterscotch Cake", "Caramel butterscotch with praline crunch", 549, 0],
                ["Pineapple Cake", "Light sponge with fresh pineapple cream", 449, 0],
                ["White Forest Cake", "White chocolate, cherries & cream", 649, 0],
                ["Mango Cake", "Seasonal Alphonso mango sponge", 599, 0],
              ]},
              { title: "🎉 Celebration Cakes", items: [
                ["Custom Birthday Cake", "Any theme, any design — your choice", 799, 0],
                ["Wedding Tier Cake", "Elegant multi-tier celebration cakes", 1499, 0],
                ["Anniversary Cake", "Romantic designs with custom message", 699, 0],
                ["Baby Shower Cake", "Cute fondant designs for the special day", 899, 0],
              ]},
              { title: "🥐 Pastries & Bites", items: [
                ["Chocolate Pastry", "Mini chocolate slice, perfectly portioned", 80, 0],
                ["Fruit Pastry", "Fresh seasonal fruit on cream sponge", 75, 0],
                ["Croissant", "Buttery, flaky, baked fresh every morning", 60, 0],
                ["Choco Brownie", "Fudgy dark chocolate brownie", 70, 0],
                ["Cupcake", "Vanilla, chocolate or red velvet", 90, 0],
                ["Cookies", "Choco chip, oatmeal raisin, or butter", 40, 0],
              ]},
            ].map(cat => (
              <div key={cat.title} style={{ marginBottom: "3.5rem" }}>
                <div style={{
                  fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#2C1810",
                  marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "2px solid #EFE3D0",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                }}>{cat.title}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.875rem" }}>
                  {cat.items.map(([name, desc, price, disc]) => {
                    const final = disc > 0 ? Math.round(price * (1 - disc / 100)) : null;
                    return (
                      <div key={name}
                        style={{
                          background: "#fff", border: "1px solid #EFE3D0", borderRadius: 12,
                          padding: "1.1rem 1.25rem", display: "flex", alignItems: "center",
                          justifyContent: "space-between", transition: "all 0.2s", cursor: "pointer",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8860A"; e.currentTarget.style.background = "#FFFBF5"; e.currentTarget.style.transform = "translateX(4px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#EFE3D0"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateX(0)"; }}
                        onClick={() => orderCake(name, final || price)}
                      >
                        <div>
                          <div style={{ fontWeight: 500, color: "#2C1810", fontSize: "0.92rem" }}>{name}</div>
                          <div style={{ color: "#7A5C4A", fontSize: "0.78rem", fontWeight: 300, marginTop: 2 }}>{desc}</div>
                        </div>
                        <div style={{ textAlign: "right", marginLeft: "1rem", flexShrink: 0 }}>
                          {final ? (
                            <div>
                              <div style={{ color: "#C8860A", fontWeight: 700, fontSize: "0.95rem" }}>₹{final}</div>
                              <div style={{ color: "#bbb", fontSize: "0.72rem", textDecoration: "line-through" }}>₹{price}</div>
                            </div>
                          ) : (
                            <div style={{ color: "#C8860A", fontWeight: 700, fontSize: "0.95rem" }}>
                              ₹{price}{cat.title.includes("Celebration") ? "+" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p style={{ color: "#7A5C4A", marginBottom: "1.25rem", fontSize: "0.875rem" }}>Prices are per 500g for cakes unless noted. Click any item to order.</p>
              <a
                href="https://wa.me/919246741544?text=Hello%20Cake%20Land!%20I%20would%20like%20to%20order."
                target="_blank" rel="noreferrer"
                style={{
                  background: "#25D366", color: "#fff", textDecoration: "none",
                  padding: "0.9rem 2.25rem", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                💬 Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ════════ GALLERY PAGE ════════ */}
      {page === "gallery" && (
        <div>
          <div style={{ position: "relative", padding: "5rem 2rem", textAlign: "center", overflow: "hidden" }}>
            <img src={BG_IMAGES.gallery} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(3px) brightness(0.3)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", color: "#FDF8F2", marginBottom: 8 }}>Gallery</div>
              <div style={{ color: "#C4A88A", fontWeight: 300 }}>A sweet glimpse into our creations</div>
            </div>
          </div>
          {/* FIX: each item is its own component with its own hover state */}
          <div className="gallery-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryItem key={i} item={item} onOrder={orderCake} />
            ))}
          </div>
        </div>
      )}

      {/* ════════ ABOUT PAGE ════════ */}
      {page === "about" && (
        <div>
          <div style={{ position: "relative", padding: "5rem 2rem", textAlign: "center", overflow: "hidden" }}>
            <img src={BG_IMAGES.hero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(3px) brightness(0.3)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", color: "#FDF8F2", marginBottom: 8 }}>About Cake Land</div>
              <div style={{ color: "#C4A88A", fontWeight: 300, maxWidth: 500, margin: "0 auto" }}>A neighbourhood bakery built on passion, freshness, and love</div>
            </div>
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "4rem" }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", color: "#2C1810", marginBottom: "1rem" }}>Our Story</div>
                <p style={{ color: "#7A5C4A", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>Cake Land was born from a simple passion — to bring freshly baked, beautifully crafted cakes to every celebration in Madhapur and beyond.</p>
                <p style={{ color: "#7A5C4A", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>Located near the 100 Feet Road and Ayyappa Society, we've become the go-to bakery for birthdays, weddings, anniversaries, and everyday sweet moments.</p>
                <p style={{ color: "#7A5C4A", lineHeight: 1.8, fontWeight: 300 }}>Every cake is made from scratch using quality ingredients — no preservatives, no shortcuts.</p>
              </div>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(44,24,16,0.2)" }}>
                <img src={BG_IMAGES.gallery} alt="Bakery" style={{ width: "100%", height: 320, objectFit: "cover" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
              {[
                ["🌿", "Fresh Ingredients", "Only the finest, freshest ingredients in every bake."],
                ["❤️", "Made with Love", "Every cake crafted with care and attention to detail."],
                ["🎨", "Custom Creations", "Your vision, our craft — dream cake made real."],
                ["😊", "Customer First", "Your happiness is our priority, every order."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #EFE3D0", borderRadius: 14, padding: "1.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", color: "#2C1810", marginBottom: "0.4rem" }}>{title}</div>
                  <div style={{ fontSize: "0.82rem", color: "#7A5C4A", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════ CONTACT PAGE ════════ */}
      {page === "contact" && (
        <div>
          <div style={{ position: "relative", padding: "5rem 2rem", textAlign: "center", overflow: "hidden" }}>
            <img src={BG_IMAGES.contact} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(3px) brightness(0.3)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", color: "#FDF8F2", marginBottom: 8 }}>Get in Touch</div>
              <div style={{ color: "#C4A88A", fontWeight: 300 }}>Place an order or ask us anything</div>
            </div>
          </div>
          <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#2C1810", marginBottom: "2rem" }}>Find Us</div>
              {[
                ["📍", "Address", "Near 100 Feet Rd, Ayyappa Society,\nChanda Naik Nagar, Madhapur,\nHyderabad, Telangana 500081"],
                ["📞", "Phone", "+91 92467 41544"],
                ["💬", "WhatsApp", "+91 92467 41544"],
                ["🕐", "Hours", "Mon–Sat: 9 AM – 9 PM\nSunday: 10 AM – 8 PM"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
                  <div style={{
                    width: 46, height: 46, background: "#F9F1E8", border: "1px solid #EFE3D0",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.25rem", flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#C8860A", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#2C1810", whiteSpace: "pre-line", lineHeight: 1.6 }}>{val}</div>
                  </div>
                </div>
              ))}
              <a
                href="https://maps.app.goo.gl/3PiKP2Zg6GpMNfWT9"
                target="_blank" rel="noreferrer"
                style={{
                  background: "#2C1810", color: "#fff", textDecoration: "none",
                  padding: "0.85rem 1.75rem", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem",
                  display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1A0C06")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2C1810")}
              >📍 View on Google Maps</a>
            </div>
            {/* FIX: ContactForm is its own component with controlled state */}
            <ContactForm cakes={cakes} showToast={showToast} />
          </div>
        </div>
      )}

      <WAButton />
    </div>
  );
}