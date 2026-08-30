export const PRODUCTS = [
  // ===== JEANS =====
  {
    id: '001',
    sku: 'JNS-SLM01',
    name: 'SLIM TAPER DARK INDIGO',
    category: 'jeans',
    subcategory: 'Slim Fit',
    price: 7800,
    fit: 'Slim Through Thigh / Tapered Leg',
    color: 'Dark Indigo',
    sizes: [30, 32, 34, 36, 38, 40, 42],
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80'
    ],
    material: '99% Cotton, 1% Elastane Denim',
    details: [
      'Modern slim taper cut that stays close from thigh to ankle',
      'Stretch weave for all-day comfort without bagging out',
      'Classic five-pocket styling with leather brand patch',
      'Reinforced stitching at stress points'
    ],
    care: 'Machine wash cold inside-out. Line dry.',
    tags: ['jeans', 'slim', 'taper', 'denim'],
  },
  {
    id: '002',
    sku: 'JNS-STR02',
    name: 'STRAIGHT LEG RAW SELVEDGE',
    category: 'jeans',
    subcategory: 'Straight Fit',
    price: 8200,
    fit: 'Straight Leg / Mid Rise',
    color: 'Raw Indigo',
    sizes: [30, 32, 34, 36, 38, 40, 42],
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Selvedge Denim',
    details: [
      'Classic straight cut with timeless silhouette',
      'Rigid raw denim that fades uniquely with wear',
      'Button fly with copper rivets and branded patch',
      'Mid rise with a straight leg that works with any shoe'
    ],
    care: 'Wash sparingly in cold water to preserve indigo. Hang dry.',
    tags: ['jeans', 'straight', 'denim', 'selvedge'],
  },
  {
    id: '003',
    sku: 'JNS-BGY03',
    name: 'BAGGY CARPENTER VINTAGE WASH',
    category: 'jeans',
    subcategory: 'Baggy Fit',
    price: 8900,
    fit: 'Relaxed Baggy / Low Rise',
    color: 'Vintage Blue',
    sizes: [30, 32, 34, 36, 38, 40, 42],
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Heavyweight Cotton Denim',
    details: [
      'Oversized baggy silhouette with dropped crotch attitude',
      'Utility carpenter pockets and hammer loop',
      'Heavy 13.5oz cotton with vintage enzyme wash',
      'Tapered ankle so the baggy fit still works with sneakers'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['jeans', 'baggy', 'carpenter', 'denim'],
  },

  // ===== T-SHIRTS =====
  {
    id: '004',
    sku: 'TEE-NIK04',
    name: 'HEAVYWEIGHT LOGO TEE BLACK',
    category: 'tees',
    subcategory: 'Branded Tees',
    price: 2900,
    fit: 'Regular Fit',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton 220 GSM',
    details: [
      'Classic heavyweight cotton with embroidered logo',
      'Mid-weight 220 GSM jersey that keeps its shape',
      'Ribbed collar that never stretches out',
      'Regular fit true to size'
    ],
    care: 'Machine wash cold, inside out. Do not iron print.',
    tags: ['tee', 'tshirt', 'branded', 'cotton'],
  },
  {
    id: '005',
    sku: 'TEE-PLN05',
    name: 'PREMIUM PLAIN CREW WHITE',
    category: 'tees',
    subcategory: 'Plain Cotton',
    price: 2200,
    fit: 'Relaxed Boxy Fit',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 55,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Long-Staple Combed Cotton 240 GSM',
    details: [
      'Blank canvas tee with zero transparency',
      'Heavy 1-inch collar that resists sagging',
      'Drop-shoulder boxy silhouette',
      'Double-needle hems throughout'
    ],
    care: 'Cold wash inside-out, line dry.',
    tags: ['tee', 'tshirt', 'plain', 'cotton', 'premium'],
  },

  // ===== POLO SHIRTS =====
  {
    id: '006',
    sku: 'POL-CLS06',
    name: 'CLASSIC POLO NAVY',
    category: 'polos',
    subcategory: 'Classic Polos',
    price: 3400,
    fit: 'Classic Tailored Fit',
    color: 'Navy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 26,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Pique Cotton',
    details: [
      'Classic pique knit with structured ribbed collar',
      'Three-button placket with tonal buttons',
      'Breathable knit for smart-casual wear',
      'Fitted shoulders with a clean hem'
    ],
    care: 'Machine wash cold. Hang dry.',
    tags: ['polo', 'shirt', 'pique', 'casual'],
  },
  {
    id: '007',
    sku: 'POL-PRF07',
    name: 'PERFORMANCE POLO GREEN',
    category: 'polos',
    subcategory: 'Performance Polos',
    price: 4600,
    fit: 'Athletic Regular Fit',
    color: 'Forest Green',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    material: '78% Cotton, 22% Polyester Pique',
    details: [
      'Moisture-wicking performance pique fabric',
      'Two-button collar with inner contrast detail',
      'Athletic cut with slightly raglan sleeves',
      'Anti-curl collar placket'
    ],
    care: 'Machine wash cold, gentle cycle. Do not bleach.',
    tags: ['polo', 'performance', 'pique', 'premium'],
  },

  // ===== SHIRTS =====
  {
    id: '008',
    sku: 'SHR-CSL08',
    name: 'CHECK FLANNEL RELAXED',
    category: 'shirts',
    subcategory: 'Casual Shirts',
    price: 4800,
    fit: 'Relaxed Fit',
    color: 'Blue Red Check',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Brushed Cotton Flannel',
    details: [
      'Soft brushed flannel with classic check pattern',
      'Wear it buttoned, open over a tee, or layered',
      'Twin chest pockets with button closure',
      'Curved hem for untucked styling'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['shirt', 'flannel', 'check', 'casual', 'layering'],
  },
  {
    id: '009',
    sku: 'SHR-SMC09',
    name: 'OXFORD SMART SHIRT WHITE',
    category: 'shirts',
    subcategory: 'Smart-Casual Shirts',
    price: 5900,
    fit: 'Regular Smart Fit',
    color: 'Crisp White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Oxford Weave',
    details: [
      'Classic Oxford button-down for smart-casual events',
      'Single chest pocket with pen slot',
      'Button-down collar that rolls naturally',
      'Box pleat back for movement'
    ],
    care: 'Machine wash warm. Iron while damp for crisp finish.',
    tags: ['shirt', 'oxford', 'smart', 'casual'],
  },

  // ===== LAYERING (Hoodies, Sweatshirts, Sweaters) =====
  {
    id: '010',
    sku: 'LYR-HDY10',
    name: 'REVERSE WEAVE HOODIE GREY',
    category: 'layering',
    subcategory: 'Hoodies',
    price: 6200,
    fit: 'Classic Relaxed Fit',
    color: 'Heather Grey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: '82% Cotton, 18% Polyester Fleece',
    details: [
      'Legendary reverse weave construction',
      'Side-seamed to resist shrinking and twisting',
      'Kangaroo pocket with ribbed cuffs and hem',
      'Pre-shrunk heavyweight fleece'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['hoodie', 'fleece', 'layering', 'streetwear'],
  },
  {
    id: '011',
    sku: 'LYR-CRW11',
    name: 'MIDWEIGHT CREWNECK BROWN',
    category: 'layering',
    subcategory: 'Sweatshirts',
    price: 5600,
    fit: 'Regular Fit',
    color: 'Carhartt Brown',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 24,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton-Poly Fleece',
    details: [
      'Heavyweight fleece built for workwear durability',
      'Ribbed cuffs and waistband hold their shape',
      'Small woven label at the front pocket',
      'Pre-shrunk midweight fleece'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['sweatshirt', 'crewneck', 'workwear', 'layering'],
  },
  {
    id: '012',
    sku: 'LYR-SWT12',
    name: 'CABLE KNIT SWEATER OATMEAL',
    category: 'layering',
    subcategory: 'Sweaters & Knitwear',
    price: 8900,
    fit: 'Regular Classic Fit',
    color: 'Oatmeal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Cable Knit',
    details: [
      'Classic cable-knit pattern for timeless style',
      'Ribbed collar, cuffs, and hem',
      'Pre-washed for zero shrinkage',
      'Pairs perfectly with jeans or chinos'
    ],
    care: 'Hand wash cold or dry clean. Lay flat to dry.',
    tags: ['sweater', 'knit', 'cable', 'premium', 'layering'],
  },

  // ===== JACKETS =====
  {
    id: '013',
    sku: 'JKT-DNM13',
    name: 'DENIM TRUCKER JACKET WASHED BLUE',
    category: 'jackets',
    subcategory: 'Denim Jackets',
    price: 9800,
    fit: 'Classic Trucker Fit',
    color: 'Washed Blue',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Denim',
    details: [
      'The classic trucker jacket silhouette',
      'Point chest pockets and side hand pockets',
      'Adjustable waist tabs for a tailored fit',
      'Stone washed for a soft broken-in feel'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['jacket', 'denim', 'trucker', 'outerwear'],
  },
  {
    id: '014',
    sku: 'JKT-BMB14',
    name: 'MA-1 BOMBER JACKET SAGE',
    category: 'jackets',
    subcategory: 'Bomber Jackets',
    price: 11500,
    fit: 'Classic Flight Fit',
    color: 'Sage Green',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Nylon Flight Shell with Satin Lining',
    details: [
      'Classic MA-1 bomber silhouette with utility sleeve pocket',
      'Water-repellent nylon shell with satin lining',
      'Ribbed collar, cuffs, and hem for wind seal',
      'Two-way zipper with metal hardware'
    ],
    care: 'Professional dry clean or spot clean with damp cloth.',
    tags: ['jacket', 'bomber', 'ma1', 'flight', 'outerwear'],
  },

  // ===== BOTTOMS =====
  {
    id: '015',
    sku: 'BOT-CRG15',
    name: 'UTILITY CARGO PANT KHAKI',
    category: 'bottoms',
    subcategory: 'Cargo Pants',
    price: 7200,
    fit: 'Relaxed Straight',
    color: 'Khaki',
    sizes: [30, 32, 34, 36, 38, 40, 42],
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Ripstop',
    details: [
      'Durable ripstop fabric with full utility pockets',
      'Multiple cargo pockets with flap closures',
      'Reinforced knees for long-lasting wear',
      'Relaxed straight cut'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['cargo', 'pants', 'utility', 'bottoms'],
  },
  {
    id: '016',
    sku: 'BOT-JGR16',
    name: 'TECH FLEECE JOGGER CHARCOAL',
    category: 'bottoms',
    subcategory: 'Joggers',
    price: 6500,
    fit: 'Slim Tapered',
    color: 'Charcoal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Tech Fleece',
    details: [
      'Premium tech fleece with a clean tapered cut',
      'Zip pockets and discreet side pockets',
      'Ribbed ankle cuffs',
      'Streamlined look that pairs with any sneaker'
    ],
    care: 'Machine wash cold. Do not iron.',
    tags: ['joggers', 'sweatpants', 'tech fleece', 'bottoms'],
  },
  {
    id: '017',
    sku: 'BOT-CHN17',
    name: 'TAILORED CHINO SAND',
    category: 'bottoms',
    subcategory: 'Chinos',
    price: 5900,
    fit: 'Tailored Straight',
    color: 'Sand',
    sizes: [30, 32, 34, 36, 38, 40, 42],
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80'
    ],
    material: '98% Cotton, 2% Elastane Twill',
    details: [
      'Classic tailored chino for smart-casual outfits',
      'Subtle stretch for all-day comfort',
      'Clean flat-front waistband with belt loops',
      'Pairs with shirts, polos, and light jackets'
    ],
    care: 'Machine wash cold. Line dry or tumble low.',
    tags: ['chinos', 'trousers', 'smart casual', 'bottoms'],
  },

  // ===== FOOTWEAR =====
  {
    id: '018',
    sku: 'SHO-NIK18',
    name: 'AIR MAX 90 TRIPLE WHITE',
    category: 'footwear',
    subcategory: 'Sneakers',
    price: 11800,
    fit: 'True to Size',
    color: 'Triple White',
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Leather, Mesh, Visible Air Unit',
    details: [
      'Legendary visible Air cushioning in the heel',
      'Premium leather and mesh upper',
      'Waffle rubber outsole for traction',
      'Clean triple white that pairs with everything'
    ],
    care: 'Clean with a soft brush and sneaker cleaner. Air dry only.',
    tags: ['sneakers', 'nike', 'airmax', 'footwear', 'streetwear'],
  },
  {
    id: '019',
    sku: 'SHO-ASC19',
    name: 'GEL-KAYANO 14 CREAM BLACK',
    category: 'footwear',
    subcategory: 'Sneakers',
    price: 13200,
    fit: 'True to Size',
    color: 'Cream / Black',
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Mesh Upper, Gel Cushioning, Rubber Outsole',
    details: [
      'Vintage runner silhouette revived with modern cushioning',
      'Gel technology for superior shock absorption',
      'Retro colorway that pairs with everything',
      'One of the most requested sneakers in the shop'
    ],
    care: 'Clean with soft brush and sneaker cleaner. Air dry.',
    tags: ['sneakers', 'asics', 'runner', 'footwear', 'retro'],
  },
  {
    id: '020',
    sku: 'SHO-NB520',
    name: '550 RETRO WHITE GREY',
    category: 'footwear',
    subcategory: 'Casual Sneakers',
    price: 10900,
    fit: 'True to Size',
    color: 'White / Grey',
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Leather Upper, Rubber Cupsole',
    details: [
      'Basketball heritage silhouette gone streetwear staple',
      'Premium leather upper with suede accents',
      'Retro cupsole for a clean classic look',
      'Pairs with denim, chinos, and joggers'
    ],
    care: 'Wipe clean with a damp cloth. Use shoe trees to keep shape.',
    tags: ['sneakers', 'newbalance', 'casual', 'footwear', 'streetwear'],
  },

  // ===== ACCESSORIES =====
  {
    id: '021',
    sku: 'ACC-CAP21',
    name: 'SNAPBACK CAP BLACK',
    category: 'accessories',
    subcategory: 'Caps',
    price: 2900,
    fit: 'One Size Fits Most',
    color: 'Black',
    sizes: ['Adjustable'],
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561264-2373b8691d9f?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Twill',
    details: [
      'Classic snapback with flat brim',
      'Embroidered front branding',
      'Adjustable snap closure for a perfect fit',
      'Structured crown keeps its shape'
    ],
    care: 'Spot clean with damp cloth. Do not machine wash.',
    tags: ['cap', 'hat', 'snapback', 'accessories'],
  },
  {
    id: '022',
    sku: 'ACC-BLT22',
    name: 'LEATHER BELT DARK BROWN',
    category: 'accessories',
    subcategory: 'Belts',
    price: 3900,
    fit: 'One Size (Fits 32-38)',
    color: 'Dark Brown',
    sizes: ['Adjustable'],
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Full-Grain Leather',
    details: [
      'Full-grain leather that ages beautifully',
      'Classic metal buckle with brand engraving',
      'Sized to fit jeans, chinos, and trousers',
      'Stitched edges for durability'
    ],
    care: 'Wipe with a damp cloth. Condition leather periodically.',
    tags: ['belt', 'leather', 'accessories'],
  },
  {
    id: '023',
    sku: 'ACC-BAG23',
    name: 'CANVAS TOTE BAG BROWN',
    category: 'accessories',
    subcategory: 'Bags',
    price: 5200,
    fit: 'One Size',
    color: 'Canvas Brown',
    sizes: ['One Size'],
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Duck Canvas',
    details: [
      'Heavy-duty duck canvas that lasts for years',
      'Open main compartment fits laptop and daily carry',
      'Interior zip pocket and front utility pocket',
      'Structured base holds its shape'
    ],
    care: 'Spot clean. Do not machine wash.',
    tags: ['bag', 'tote', 'canvas', 'accessories'],
  },

  // ===== STREETWEAR COLLECTION =====
  // ===== OVERSIZED TEES =====
  {
    id: '024',
    sku: 'OTEE-GL01',
    name: 'GRAPHIC LOGO OVERSIZED TEE BLACK',
    category: 'oversized-tees',
    subcategory: 'Oversized Tees',
    price: 3200,
    fit: 'Oversized Drop Shoulder',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton 260 GSM',
    details: [
      'Heavyweight oversized fit with dropped shoulders',
      'Bold graphic print on front and back',
      'Ribbed collar that holds its shape',
      'Extra long body for streetwear styling'
    ],
    care: 'Machine wash cold inside out. Do not iron print.',
    tags: ['oversized', 'tee', 'graphic', 'streetwear'],
  },
  {
    id: '025',
    sku: 'OTEE-BW02',
    name: 'BOLD TEXT OVERSIZED TEE WHITE',
    category: 'oversized-tees',
    subcategory: 'Oversized Tees',
    price: 3200,
    fit: 'Oversized Drop Shoulder',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton 260 GSM',
    details: [
      'Clean white oversized tee with bold text',
      'Premium heavyweight cotton',
      'Drop shoulder for relaxed fit',
      'Perfect for layering or standalone'
    ],
    care: 'Machine wash cold inside out. Line dry.',
    tags: ['oversized', 'tee', 'streetwear', 'white'],
  },

  // ===== ULTRA BAGGY JEANS =====
  {
    id: '026',
    sku: 'UBGY-DB01',
    name: 'ULTRA BAGGY DOUBLE KNEE BLACK',
    category: 'ultra-baggy',
    subcategory: 'Ultra Baggy',
    price: 9500,
    fit: 'Ultra Relaxed / Extra Wide Leg',
    color: 'Washed Black',
    sizes: [30, 32, 34, 36, 38, 40],
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Heavyweight Cotton Denim 14oz',
    details: [
      'Extra wide leg silhouette for maximum bag',
      'Double knee reinforcement panels',
      'Vintage enzyme wash for broken-in feel',
      'Multiple utility pockets'
    ],
    care: 'Machine wash cold. Hang dry.',
    tags: ['ultra', 'baggy', 'jeans', 'denim', 'streetwear'],
  },
  {
    id: '027',
    sku: 'UBGY-VB02',
    name: 'ULTRA BAGGY VINTAGE BLUE WASH',
    category: 'ultra-baggy',
    subcategory: 'Ultra Baggy',
    price: 9500,
    fit: 'Ultra Relaxed / Extra Wide Leg',
    color: 'Vintage Blue',
    sizes: [30, 32, 34, 36, 38, 40],
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Heavyweight Cotton Denim 14oz',
    details: [
      'Classic blue vintage wash',
      'Ultra wide leg for maximum streetwear vibes',
      'Pre-washed for soft hand feel',
      'Tapered ankle for sneaker compatibility'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['ultra', 'baggy', 'jeans', 'denim', 'vintage'],
  },

  // ===== HOODIES OVERSIZE =====
  {
    id: '028',
    sku: 'OHDY-LG01',
    name: 'OVERSIZED LOGO HOODIE CHARCOAL',
    category: 'layering',
    subcategory: 'Hoodies',
    price: 6800,
    fit: 'Oversized / Drop Shoulder',
    color: 'Charcoal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: '80% Cotton, 20% Polyester Fleece 380 GSM',
    details: [
      'Heavyweight fleece with oversized fit',
      'Bold logo embroidery on chest',
      'Kangaroo pocket with hidden media port',
      'Ribbed cuffs and hem'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['hoodie', 'oversized', 'streetwear', 'fleece'],
  },
  {
    id: '029',
    sku: 'OHDY-WN02',
    name: 'OVERSIZED WORDMARK HOODIE BLACK',
    category: 'layering',
    subcategory: 'Hoodies',
    price: 7200,
    fit: 'Oversized / Drop Shoulder',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: '80% Cotton, 20% Polyester Fleece 400 GSM',
    details: [
      'Premium heavyweight fleece',
      'Large wordmark print across chest',
      'Oversized fit with dropped shoulders',
      'Double-lined hood'
    ],
    care: 'Machine wash cold inside out. Do not iron print.',
    tags: ['hoodie', 'oversized', 'streetwear', 'black'],
  },

  // ===== JOGGERS =====
  {
    id: '030',
    sku: 'JGR-TC01',
    name: 'TECH FLEECE JOGGER BLACK',
    category: 'bottoms',
    subcategory: 'Joggers',
    price: 5800,
    fit: 'Tapered Slim',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Tech Fleece',
    details: [
      'Clean tapered tech fleece jogger',
      'Zip pockets for security',
      'Ribbed ankle cuffs',
      'Perfect pairing with oversized tees'
    ],
    care: 'Machine wash cold. Do not iron.',
    tags: ['jogger', 'tech', 'fleece', 'streetwear'],
  },
  {
    id: '031',
    sku: 'JGR-EL02',
    name: 'ELASTIC WAIST JOGGER GREY',
    category: 'bottoms',
    subcategory: 'Joggers',
    price: 4500,
    fit: 'Relaxed Tapered',
    color: 'Heather Grey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Loopback Fleece',
    details: [
      'Comfortable cotton fleece jogger',
      'Elastic waist with drawcord',
      'Kangaroo pocket',
      'Tapered leg with ribbed cuffs'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['jogger', 'cotton', 'fleece', 'casual'],
  },

  // ===== JERSEYS =====
  {
    id: '032',
    sku: 'JRSY-AM01',
    name: 'AMERICAN FOOTBALL JERSEY NAVY',
    category: 'jerseys',
    subcategory: 'Jersey',
    price: 4800,
    fit: 'Oversized',
    color: 'Navy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Mesh Polyester',
    details: [
      'Classic American football jersey design',
      'Breathable mesh construction',
      'Number and letter embroidery',
      'Oversized fit for streetwear styling'
    ],
    care: 'Machine wash cold. Hang dry.',
    tags: ['jersey', 'football', 'oversized', 'streetwear'],
  },

  // ===== OLD MONEY SHIRTS =====
  {
    id: '033',
    sku: 'OMSH-LS01',
    name: 'OLD MONEY STRIPED SHIRT BLUE',
    category: 'old-money',
    subcategory: 'Old Money Shirts',
    price: 5200,
    fit: 'Regular Classic',
    color: 'Blue Stripe',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Poplin',
    details: [
      'Classic vertical stripe pattern',
      'Button-down collar',
      'Premium cotton poplin fabric',
      'Perfect for smart-casual outfits'
    ],
    care: 'Machine wash cold. Iron while damp.',
    tags: ['old', 'money', 'shirt', 'stripe', 'classic'],
  },
  {
    id: '034',
    sku: 'OMSH-PL02',
    name: 'OLD MONEY POLO SHIRT CREAM',
    category: 'old-money',
    subcategory: 'Old Money Shirts',
    price: 4200,
    fit: 'Regular Classic',
    color: 'Cream',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Pique Cotton',
    details: [
      'Clean cream polo for old money aesthetic',
      'Classic pique knit',
      'Embroidered logo',
      'Regular fit with structured collar'
    ],
    care: 'Machine wash cold. Hang dry.',
    tags: ['old', 'money', 'polo', 'classic', 'cream'],
  },

  // ===== PANTALON =====
  {
    id: '035',
    sku: 'PNT-FL01',
    name: 'FLARED JEAN WASHED BLUE',
    category: 'pantalon',
    subcategory: 'Pantalon',
    price: 8500,
    fit: 'Flared / Wide Leg',
    color: 'Washed Blue',
    sizes: [30, 32, 34, 36, 38, 40],
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Denim',
    details: [
      'Classic flared silhouette',
      'Fitted through thigh, flares at knee',
      'Vintage wash for retro vibe',
      'Perfect with boots or chunky sneakers'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['flared', 'jeans', 'denim', 'retro'],
  },
  {
    id: '036',
    sku: 'PNT-BF02',
    name: 'BOYFRIEND STRAIGHT JEAN LIGHT',
    category: 'pantalon',
    subcategory: 'Pantalon',
    price: 7800,
    fit: 'Relaxed Straight',
    color: 'Light Blue',
    sizes: [30, 32, 34, 36, 38, 40],
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Denim',
    details: [
      'Relaxed boyfriend straight fit',
      'Light wash for casual vibes',
      'Comfortable rise',
      'Versatile styling options'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['boyfriend', 'jeans', 'denim', 'straight'],
  },

  // ===== SHORTS =====
  {
    id: '037',
    sku: 'SHRT-DN01',
    name: 'DENIM SHORT WASHED BLUE',
    category: 'shorts',
    subcategory: 'Short',
    price: 4200,
    fit: 'Relaxed',
    color: 'Washed Blue',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80'
    ],
    material: '100% Cotton Denim',
    details: [
      'Classic denim short for summer',
      'Relaxed fit for comfort',
      'Vintage wash finish',
      'Perfect for hot days'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['short', 'denim', 'summer', 'casual'],
  },
  {
    id: '038',
    sku: 'SHRT-JG02',
    name: 'JOGGER SHORT FRENCH TERRY BLACK',
    category: 'shorts',
    subcategory: 'Short',
    price: 3500,
    fit: 'Relaxed',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'French Terry Cotton',
    details: [
      'Comfortable french terry fabric',
      'Elastic waist with drawcord',
      'Side pockets',
      'Perfect for lounging or casual wear'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['short', 'jogger', 'cotton', 'casual'],
  },

  // ===== SWEATSHIRTS =====
  {
    id: '039',
    sku: 'SWST-LG01',
    name: 'LOGO SWEATSHIRT CHECK BLACK WHITE',
    category: 'sweatshirts',
    subcategory: 'Sweatshirt',
    price: 5500,
    fit: 'Regular',
    color: 'Black White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Fleece',
    details: [
      'Bold check pattern sweatshirt',
      'Logo embroidery on chest',
      'Ribbed cuffs and hem',
      'Perfect layering piece'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['sweatshirt', 'logo', 'check', 'streetwear'],
  },

  // ===== VESTE (JACKETS) =====
  {
    id: '040',
    sku: 'VST-ZP01',
    name: 'ZIP UP HOODIE OLIVE',
    category: 'jackets',
    subcategory: 'Jackets',
    price: 7500,
    fit: 'Oversized',
    color: 'Olive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Polyester Blend',
    details: [
      'Oversized zip-up hoodie',
      'Heavyweight cotton blend',
      'Kangaroo pockets',
      'Metal zipper hardware'
    ],
    care: 'Machine wash cold. Tumble dry low.',
    tags: ['veste', 'hoodie', 'zip', 'oversized'],
  },

  // ===== ENSEMBLE (SETS) =====
  {
    id: '041',
    sku: 'ENS-TS01',
    name: 'MATCHING SET SHORT SLEEVE BLACK',
    category: 'ensemble',
    subcategory: 'Ensemble',
    price: 8500,
    fit: 'Relaxed',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Cotton Blend',
    details: [
      'Coordinating short sleeve shirt and shorts',
      'Relaxed fit throughout',
      'Same fabric and color for both pieces',
      'Perfect summer matching set'
    ],
    care: 'Machine wash cold. Line dry.',
    tags: ['ensemble', 'set', 'matching', 'summer'],
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Collection', count: 41 },
  { id: 'jeans', name: 'Jeans', count: 5 },
  { id: 'tees', name: 'T-Shirts', count: 2 },
  { id: 'oversized-tees', name: 'Oversized Tees', count: 2 },
  { id: 'ultra-baggy', name: 'Ultra Baggy', count: 2 },
  { id: 'polos', name: 'Polos', count: 2 },
  { id: 'shirts', name: 'Shirts', count: 2 },
  { id: 'old-money', name: 'Old Money', count: 2 },
  { id: 'layering', name: 'Hoodies & Knitwear', count: 5 },
  { id: 'jackets', name: 'Jackets & Outerwear', count: 3 },
  { id: 'bottoms', name: 'Pants & Joggers', count: 5 },
  { id: 'pantalon', name: 'Pantalon', count: 2 },
  { id: 'shorts', name: 'Shorts', count: 2 },
  { id: 'jerseys', name: 'Jersey', count: 1 },
  { id: 'sweatshirts', name: 'Sweatshirt', count: 1 },
  { id: 'ensemble', name: 'Ensemble', count: 1 },
  { id: 'footwear', name: 'Sneakers & Footwear', count: 3 },
  { id: 'accessories', name: 'Caps, Belts & Bags', count: 3 }
];

export const STYLE_GUIDES = [
  {
    id: 'guide-01',
    title: 'The Clean Streetwear Blueprint',
    subtitle: 'How to style slim/straight jeans with hoodies and sneakers',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
    featuredProducts: ['001', '010', '018'],
    summary: 'The modern streetwear aesthetic relies on proportions. Pairing slim denim with a heavyweight hoodie creates structural balance for everyday wear.'
  },
  {
    id: 'guide-02',
    title: 'Smart-Casual Made Easy',
    subtitle: 'Oxford shirts, chinos, and clean retro sneakers',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    featuredProducts: ['009', '017', '020'],
    summary: 'A crisp oxford shirt anchors tailored chinos, while a clean New Balance 550 adds just the right amount of casual energy. The go-to formula for dinners, offices, and everything in between.'
  }
];

export const STORE_LOCATIONS = [
  {
    id: 'bab-ezzouar-flagship',
    name: 'ARENA FASHION Flagship Store',
    tagline: 'Official Menswear & Footwear Atelier',
    address: 'P5CH+2WP, Boulevard de l\'Université, Bab Ezzouar, Alger',
    googleMapsUrl: 'https://www.google.com/maps/place/ARENA+Fashion/@36.7201693,3.1796428,20.5z/data=!4m14!1m7!3m6!1s0x128e518d1386423f:0xadf1d053b907d85c!2sP59H%2BXX9,+Bd+de+l%27Universit%C3%A9,+Bab+Ezzouar!3b1!8m2!3d36.7199125!4d3.1799844!3m5!1s0x128e511ce702b63b:0x3e9d6ad1a50113a!8m2!3d36.7200775!4d3.1798196!16s%2Fg%2F11n093gx87?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D',
    phone: '0552778744',
    phoneFormatted: '0552 77 87 44',
    whatsapp: '+213552778744',
    email: 'contact@arenafashion.com',
    hours: 'Samedi – Jeudi: 10h00 – 21h00 | Vendredi: 15h00 – 21h00',
    transit: 'Tramway Station Cité Universitaire / USTHB, Bab Ezzouar',
    fittingBookingAvailable: true,
    coordinates: { lat: 36.7125, lng: 3.1812 },
    images: [
      {
        url: '/store/Storefront.png',
        caption: 'ARENA FASHION Storefront - Boulevard de l\'Université, Bab Ezzouar'
      },
      {
        url: '/store/Interior_Racks.png',
        caption: 'Jeans, T-Shirts & Sneakers Collection'
      }
    ]
  }
];
