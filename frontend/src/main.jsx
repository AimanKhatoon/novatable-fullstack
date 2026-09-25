import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Search,
  Star,
  Users,
  X
} from "lucide-react";
import "./style.css";

const API = "/api";

function App() {
  const [menu, setMenu] = React.useState([]);
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    date: "",
    time: "19:00",
    guests: 2,
    note: ""
  });
  const [notice, setNotice] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API}/menu`)
      .then((r) => r.json())
      .then(setMenu)
      .catch(() => setMenu([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(menu.map((item) => item.category))];

  const filtered = menu.filter((item) => {
    const categoryMatch = category === "All" || item.category === category;
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const submitReservation = async (event) => {
    event.preventDefault();
    setNotice("Saving your reservation…");

    try {
      const response = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setNotice("Reservation received — we look forward to welcoming you.");
      setForm({
        name: "",
        email: "",
        date: "",
        time: "19:00",
        guests: 2,
        note: ""
      });
    } catch (error) {
      setNotice(error.message);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="site">
      <header className="nav-wrap">
        <nav className="nav">
          <button className="brand" onClick={() => scrollTo("home")}>
            <span className="brand-mark">N</span>
            <span>
              <strong>NOVA</strong>
              <small>TABLE</small>
            </span>
          </button>

          <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
            <button onClick={() => scrollTo("menu")}>Menu</button>
            <button onClick={() => scrollTo("story")}>Our Story</button>
            <button onClick={() => scrollTo("reservation")}>Reservations</button>
          </div>

          <button className="nav-cta" onClick={() => scrollTo("reservation")}>
            Reserve a table <ArrowRight size={16} />
          </button>

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-content">
            <div className="eyebrow"><span /> MODERN DINING · ISLAMABAD</div>
            <h1>Food that feels<br /><em>like a moment.</em></h1>
            <p className="hero-copy">
              Seasonal ingredients, bold little details and a room designed
              for long conversations. Welcome to your new favorite table.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollTo("reservation")}>
                Book your table <ArrowRight size={18} />
              </button>
              <button className="text-btn" onClick={() => scrollTo("menu")}>
                Explore the menu <span>↓</span>
              </button>
            </div>
            <div className="hero-meta">
              <span><Star size={15} fill="currentColor" /> 4.9 guest rating</span>
              <span><Clock3 size={15} /> Tue–Sun · 5 PM–11 PM</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-ring" />
            <div className="art-card">
              <span className="art-label">TONIGHT'S FEATURE</span>
              <strong>Citrus<br />Salmon</strong>
              <small>Pan-seared · saffron · citrus</small>
              <span className="art-price">Rs. 3,250</span>
            </div>
          </div>
        </section>

        <section className="marquee">
          <div>SEASONAL · LOCAL · THOUGHTFUL</div>
          <div>SEASONAL · LOCAL · THOUGHTFUL</div>
          <div>SEASONAL · LOCAL · THOUGHTFUL</div>
        </section>

        <section id="story" className="story section">
          <div className="section-kicker">01 — THE NOVA IDEA</div>
          <div className="story-grid">
            <div>
              <h2>A little <em>unexpected.</em><br />A lot memorable.</h2>
            </div>
            <div>
              <p>
                NOVA TABLE is a modern neighborhood restaurant built around
                one simple idea: a great meal should slow the world down.
                Our kitchen turns familiar ingredients into expressive,
                beautifully balanced plates.
              </p>
              <div className="story-facts">
                <div><strong>24</strong><span>Seasonal dishes<br />across the year</span></div>
                <div><strong>08</strong><span>Local producers<br />we work with</span></div>
                <div><strong>01</strong><span>Table worth<br />coming back to</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 — FROM THE KITCHEN</div>
              <h2>Made to be <em>shared.</em></h2>
            </div>
            <div className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes"
              />
            </div>
          </div>

          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="empty">Loading the kitchen menu…</div>
          ) : (
            <div className="menu-grid">
              {filtered.map((item) => (
                <article className="dish-card" key={item.id}>
                  <div className="dish-visual">
                    <span className="dish-category">{item.category}</span>
                    <div className={`dish-orb orb-${item.id % 5}`}>
                      <span>{item.name.slice(0, 1)}</span>
                    </div>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </div>
                  <div className="dish-info">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <strong>Rs. {Number(item.price).toLocaleString()}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="reservation" className="reservation section">
          <div className="reservation-copy">
            <div className="section-kicker">03 — YOUR TABLE AWAITS</div>
            <h2>Make tonight<br /><em>worth remembering.</em></h2>
            <p>
              Tell us when you're coming. We'll take care of the rest.
              For groups larger than 10, please contact the restaurant directly.
            </p>
            <div className="contact-line"><MapPin size={18} /> 18 Garden Avenue, Islamabad</div>
            <div className="contact-line"><Instagram size={18} /> @novatable.pk</div>
          </div>

          <form className="reservation-form" onSubmit={submitReservation}>
            <div className="form-title">
              <span>RESERVE</span>
              <CalendarDays size={20} />
            </div>

            <label>
              Your name
              <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Aiman Khatoon" />
            </label>

            <label>
              Email
              <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
            </label>

            <div className="form-row">
              <label>
                Date
                <input required type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
              </label>
              <label>
                Time
                <select value={form.time} onChange={(e) => setForm({...form, time: e.target.value})}>
                  <option>17:30</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                  <option>22:00</option>
                </select>
              </label>
            </div>

            <label>
              Guests
              <div className="guest-input">
                <Users size={16} />
                <input type="number" min="1" max="20" value={form.guests} onChange={(e) => setForm({...form, guests: e.target.value})} />
                <span>people</span>
              </div>
            </label>

            <label>
              Note <span className="optional">optional</span>
              <textarea value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} placeholder="Birthday, anniversary, dietary note…" rows="3" />
            </label>

            <button className="primary-btn full" type="submit">
              Request reservation <ArrowRight size={18} />
            </button>

            {notice && (
              <div className="notice"><CheckCircle2 size={17} /> {notice}</div>
            )}
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark">N</span><strong>NOVA TABLE</strong></div>
        <div>Good food. Good company. Good reason to stay.</div>
        <div>© 2026 NOVA TABLE</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
