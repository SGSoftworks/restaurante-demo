export interface MenuItem {
  slug: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  story?: string;
  ingredients?: string[];
  chefNote?: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  items: MenuItem[];
}

export const categories: Category[] = [
  {
    id: "ramen", title: "Ramen Signature", subtitle: "El alma de Japón en cada cuenco",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80",
    items: [
      { slug: "tonkotsu-kuro", name: "Tonkotsu Kuro", desc: "Caldo de cerdo 24h, fideos artesanales, huevo marinado, trufa negra", price: "32", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80", story: "Nuestro ramen estrella. El caldo de cerdo se cocina durante 24 horas hasta alcanzar una profundidad de sabor inigualable. La trufa negra aporta un toque terroso que eleva cada cucharada.", ingredients: ["Caldo de cerdo 24h", "Fideos artesanales", "Huevo marinado en soja", "Trufa negra fresca", "Cerdo confitado", "Cebolleta"], chefNote: "La clave está en el tiempo. 24 horas de cocción lenta transforman ingredientes simples en algo extraordinario." },
      { slug: "shoyu-clasico", name: "Shoyu Clásico", desc: "Caldo de soja, cerdo confitado, bambú, nori", price: "26", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80", story: "Un homenaje a la tradición. El caldo de soja fermentada artesanalmente se combina con cerdo confitado durante 12 horas.", ingredients: ["Caldo de soja fermentada", "Cerdo confitado", "Brotes de bambú", "Alga nori", "Fideos de trigo"], chefNote: "La soja fermentada es el alma de este plato. Usamos una fermentación de 18 meses." },
    ],
  },
  {
    id: "entradas", title: "Entradas", subtitle: "El prólogo de una experiencia inolvidable",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
    items: [
      { slug: "tataki-wagyu", name: "Tataki de Wagyu", desc: "Wagyu japonés sellado con ponzu de trufa, micro shiso y láminas de oro", price: "48", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", story: "Wagyu A5 sellado a la perfección. El ponzu de trufa negra y el micro shiso crean un equilibrio entre umami y frescura.", ingredients: ["Wagyu A5 japonés", "Ponzu de trufa negra", "Micro shiso", "Láminas de oro 24k", "Flor de sal"], chefNote: "El wagyu se sella a 280°C durante 45 segundos exactos. Ni uno más." },
      { slug: "ceviche-pacifico", name: "Ceviche del Pacífico", desc: "Vieira de Hokkaido con yuzu kosho, lima en polvo y caviar", price: "42", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80", story: "Vieiras frescas de Hokkaido marinadas en yuzu kosho. El caviar aporta una explosión de umami que complementa la acidez cítrica.", ingredients: ["Vieira de Hokkaido", "Yuzu kosho", "Lima en polvo", "Caviar beluga", "Cilantro micro"], chefNote: "La vieira debe cortarse en láminas de 3mm. Ni más grueso, ni más fino." },
    ],
  },
  {
    id: "sushi", title: "Sushi & Nigiri", subtitle: "La precisión hecha arte",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80",
    items: [
      { slug: "omakase-chef", name: "Omakase Chef", desc: "Selección del chef de 8 piezas con los ingredientes más frescos del día", price: "68", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80", story: "El chef selecciona personalmente 8 piezas basadas en la llegada del día. Cada pieza es una obra de arte efímera.", ingredients: ["Pescado fresco del día", "Arroz vinagrado", "Wasabi fresco", "Nori crujiente", "Oro comestible"], chefNote: "El arroz debe estar a la temperatura exacta del cuerpo humano. 37°C." },
      { slug: "dragon-roll", name: "Dragon Roll", desc: "Tempura de langosta, aguacate, anguila glaseada y caviar", price: "38", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", story: "Langosta envuelta en tempura crujiente, aguacate cremoso y anguila glaseada con salsa unagi. Coronado con caviar.", ingredients: ["Langosta fresca", "Tempura crujiente", "Aguacate maduro", "Anguila glaseada", "Caviar oscietra"], chefNote: "La langosta se fríe exactamente 90 segundos. El exterior crujiente contrasta con el interior jugoso." },
    ],
  },
  {
    id: "postres", title: "Postres", subtitle: "El broche de oro",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80",
    items: [
      { slug: "chocolate-erde", name: "Chocolate Erde", desc: "Esfera de chocolate negro con caramelo ahumado, sal marina y oro comestible", price: "26", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", story: "Una esfera de chocolate negro que se rompe en la mesa revelando un interior de caramelo ahumado. El oro comestible y la sal marina completan la experiencia.", ingredients: ["Chocolate 70% cacao", "Caramelo ahumado", "Sal marina de Maldon", "Oro comestible 24k", "Crema ligera de vainilla"], chefNote: "La temperatura de templado del chocolate debe ser exactamente 31°C para lograr ese brillo característico." },
      { slug: "yuzu-fantasia", name: "Yuzu Fantasía", desc: "Mousse de yuzu, gel de frambuesa, merengue japonés", price: "22", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80", story: "Una explosión cítrica que limpia el paladar. El yuzu aporta frescura, la frambuesa dulzura y el merengue una textura etérea.", ingredients: ["Yuzu japonés", "Frambuesa fresca", "Merengue japonés", "Azúcar floreal", "Menta"], chefNote: "El merengue se tuesta con soplete a 15cm de distancia. La caramelización debe ser uniforme." },
    ],
  },
  {
    id: "bebidas", title: "Bebidas", subtitle: "Maridajes que elevan la experiencia",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80",
    items: [
      { slug: "maridaje-premium", name: "Maridaje Premium", desc: "Selección de 5 vinos y sake maridados con el menú degustación", price: "85", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", story: "Una selección curada de 5 vinos y sakes de pequeños productores. Cada copa está diseñada para complementar un plato específico.", ingredients: ["Vino blanco de Borgoña", "Sake Junmai Daiginjo", "Vino tinto de Ribera del Duero", "Sake Nigori", "Vino espumoso metodo tradicional"], chefNote: "El sake Junmai Daiginjo se sirve a 8°C. La temperatura cambia completamente su perfil aromático." },
      { slug: "cocktail-signature", name: "Cóctel Signature", desc: "Gin infusionado con té matcha, yuzu y clarificación de sake", price: "22", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", story: "Nuestro cóctel insignia. El gin infusionado con matcha de ceremonia se combina con yuzu y sake clarificado.", ingredients: ["Gin premium", "Té matcha ceremonial", "Yuzu fresco", "Sake clarificado", "Clara de huevo"], chefNote: "La clarificación del sake toma 48 horas. El resultado es un cóctel cristalino con una textura sedosa." },
    ],
  },
];

export const featuredItems: MenuItem[] = [
  categories[0].items[0],
  categories[1].items[0],
  categories[2].items[0],
  categories[3].items[0],
];

export const chefRecommendations: MenuItem[] = [
  categories[0].items[0],
  categories[1].items[0],
  categories[2].items[0],
  categories[3].items[1],
];

export function getItemBySlug(slug: string): MenuItem | undefined {
  for (const cat of categories) {
    const found = cat.items.find((i) => i.slug === slug);
    if (found) return found;
  }
}
