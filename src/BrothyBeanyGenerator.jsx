import React, { useEffect, useState } from "react";
import { Copy, Shuffle } from "lucide-react";

//simple local UI replacements
function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return (
    <div className={`rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}


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

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap'); body { font-family: 'Fredoka One', sans-serif; }`}</style>
      <div className="min-h-screen w-full bg-[#D6453D] text-[#FFF8F0] p-6 md:p-10 font-[Fredoka_One,sans-serif]">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
          <header className="mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-[#FFF8F0] drop-shadow-lg lowercase">
              brothy beany generator
            </h1>
          </header>

          {/* Mode Switcher */}
          <p className="text-xl mb-3 lowercase">are you feeling soupy or swooshy?</p>
          <div className="flex justify-center gap-6 mb-8">
            <Button
              onClick={() => setMode("soupy")}
              className={`rounded-full px-6 py-3 text-2xl font-bold shadow ${mode === "soupy" ? "bg-[#FFF8F0] text-[#D6453D]" : "bg-transparent border-2 border-[#FFF8F0] text-[#FFF8F0] hover:bg-[#FFF8F0]/10"}`}
            >
              soupy
            </Button>
            <Button
              onClick={() => setMode("swooshy")}
              className={`rounded-full px-6 py-3 text-2xl font-bold shadow ${mode === "swooshy" ? "bg-[#FFF8F0] text-[#D6453D]" : "bg-transparent border-2 border-[#FFF8F0] text-[#FFF8F0] hover:bg-[#FFF8F0]/10"}`}
            >
              swooshy
            </Button>
          </div>

          <Card className="border-none bg-[#FFF8F0] text-[#D6453D] shadow-xl rounded-[2rem] w-full">
            <CardContent className="p-10">
              <p className="text-2xl md:text-3xl leading-snug text-center font-semibold lowercase">{line}</p>
            </CardContent>
          </Card>

          {/* Shuffle and Copy Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={shuffle} className="rounded-full bg-[#FFF8F0] text-[#D6453D] text-lg px-6 py-3 shadow hover:bg-white transition flex items-center lowercase">
              <Shuffle className="mr-2 h-5 w-5"/> shuffle
            </Button>
            <Button onClick={copyLine} className="rounded-full bg-transparent border-2 border-[#FFF8F0] text-[#FFF8F0] text-lg px-6 py-3 shadow hover:bg-[#FFF8F0]/10 transition flex items-center lowercase">
              <Copy className="mr-2 h-5 w-5"/> copy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
