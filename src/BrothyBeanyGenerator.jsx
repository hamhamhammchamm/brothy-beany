import React, { useEffect, useState } from "react";
import { Copy, Shuffle } from "lucide-react";

// --- simple local UI components (no Tailwind needed) ---
function Button({ children, onClick, variant = "solid", style = {}, ...props }) {
  const base = {
    cursor: "pointer",
    borderRadius: 9999,
    padding: "12px 20px",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "2px solid transparent",
  };
  const variants = {
    solid: { background: "#FFF8F0", color: "#D6453D" },
    outline: { background: "transparent", color: "#FFF8F0", borderColor: "#FFF8F0" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }} {...props}>
      {children}
    </button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#FFF8F0",
        color: "#D6453D",
        borderRadius: 32,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardContent({ children, style = {} }) {
  return <div style={{ padding: 40, ...style }}>{children}</div>;
}

// --- data ---
const BASE_ADJECTIVES = ["brothy", "stewy", "soupy", "lush", "cozy", "zippy", "lemony", "peppery", "smoky", "gingery", "garlicky"];
const FOOD_ADJECTIVES = ["silky", "jammy", "buttery", "herby", "bright", "toasty", "tangy", "umami-rich", "velvety", "pillowy"];
const LEGUMES = ["chickpeas", "white beans", "cannellini beans", "butter beans", "borlotti beans", "navy beans", "gigantes", "brown lentils", "green lentils", "red lentils", "urad dal", "pigeon peas (toor dal)", "mung beans", "adzuki beans", "black chickpeas (kala chana)", "soybeans"];
const TOPPINGS = ["crispy shallots", "garlicky breadcrumbs", "lemon zest", "fresh dill", "torn basil", "shaved parmesan", "toasted walnuts", "chili flakes", "soft herbs", "scallion greens", "crispy garlic chips", "fried curry leaves", "toasted coconut flakes", "pickled shallots", "charred scallions", "pomegranate seeds", "sliced bird's eye chili", "roasted peanuts", "torn mint", "fried shallots"];
const CONDIMENTS = ["a drizzle of chili oil", "harissa", "miso butter", "tahini", "salsa verde", "gremolata", "yuzu kosho", "calabrian chili paste", "black garlic oil", "lemony yogurt", "za'atar oil", "sumac–lime drizzle", "green tahini", "pomegranate molasses glaze", "schug (zhoug)", "tadka in ghee", "coconut–tamarind chutney", "cilantro–mint chutney", "garam masala butter", "spicy sambal", "nam prik", "fish sauce caramel", "roasted peanut sauce", "chili oil–miso butter", "sumac yogurt", "za'atar yogurt"];
const SWOOSH_BASES = ["labneh", "hummus", "baba ganoush", "roasted garlic yogurt", "green tahini", "coconut chutney", "cashew cream", "pumpkin purée", "spiced tomato curry", "mashed sweet potato"];

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

function buildLineA({ baseAdj, legume, top1, top2, condiment }) {
  return `${baseAdj} ${legume} with ${top1}, ${top2}, and ${condiment}`.toLowerCase();
}
function buildLineB({ foodAdj, legume, swoosh, top1, top2, condiment }) {
  return `${foodAdj} ${legume} over ${swoosh}, topped with ${top1}, ${top2}, and ${condiment}`.toLowerCase();
}

export default function BrothyBeanyGenerator() {
  const [mode, setMode] = useState("soupy");
  const [line, setLine] = useState("");
  const makeLine = () => (mode === "soupy" ? buildLineA({ baseAdj: sample(BASE_ADJECTIVES), legume: sample(LEGUMES), top1: sample(TOPPINGS), top2: sample(TOPPINGS), condiment: sample(CONDIMENTS) }) : buildLineB({ foodAdj: sample(FOOD_ADJECTIVES), legume: sample(LEGUMES), swoosh: sample(SWOOSH_BASES), top1: sample(TOPPINGS), top2: sample(TOPPINGS), condiment: sample(CONDIMENTS) }));

  useEffect(() => {
    setLine(makeLine());
  }, [mode]);

  const shuffle = () => setLine(makeLine());
  const copyLine = async () => await navigator.clipboard.writeText(line);

  // --- layout styles (no Tailwind required) ---
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#D6453D",
    color: "#FFF8F0",
    padding: "40px 24px",
    fontFamily: "'Fredoka One', sans-serif",
    display: "flex",
    justifyContent: "center",
  };
  const wrapperStyle = { maxWidth: 880, width: "100%" };
  const headerStyle = { marginBottom: 24 };
  const h1Style = {
    fontSize: 64,
    fontWeight: 800,
    margin: 0,
    textTransform: "lowercase",
  };
  const subStyle = { fontSize: 20, margin: "8px 0 16px" };
  const switcherStyle = { display: "flex", gap: 16, marginBottom: 24 };
  const bottomBarStyle = { display: "flex", gap: 12, marginTop: 24 };

  return (
    <div style={pageStyle}>
      <div style={wrapperStyle}>
        <header style={headerStyle}>
          <h1 style={h1Style}>brothy beany generator</h1>
          <p style={subStyle}>are you feeling soupy or swooshy?</p>
          <div style={switcherStyle}>
            <Button onClick={() => setMode("soupy")} variant={mode === "soupy" ? "solid" : "outline"}>soupy</Button>
            <Button onClick={() => setMode("swooshy")} variant={mode === "swooshy" ? "solid" : "outline"}>swooshy</Button>
          </div>
        </header>

        <Card>
          <CardContent>
            <p style={{ fontSize: 28, fontWeight: 700, textAlign: "center", textTransform: "lowercase", margin: 0 }}>{line}</p>
          </CardContent>
        </Card>

        <div style={bottomBarStyle}>
          <Button onClick={shuffle}>
            <Shuffle size={20} /> shuffle
          </Button>
          <Button onClick={copyLine} variant="outline">
            <Copy size={20} /> copy
          </Button>
        </div>
      </div>
    </div>
  );
}
