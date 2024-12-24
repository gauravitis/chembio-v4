export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  casNumber?: string;
  packSize?: string;
  category: string;
  stockQuantity?: number;
}

export const products: Product[] = [
  {
    "id": "270458-1L",
    "name": "1-Methyl-2-pyrrolidinone CHROMASOLV™ Plus, for HPLC, ≥99%\r",
    "description": "1-Methyl-2-pyrrolidone; N-Methyl-2-pyrrolidone; NMP",
    "price": 10899,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/8/d/8dff797f7b8151e571e80c683d5d3db2a0275e0f4d68445f4cb68187f0ee0b8c.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34856-2.5L",
    "name": "Dichloromethane CHROMASOLV™, for HPLC, ≥99.8%, contains amylene as stabilizer\r",
    "description": "Methylene chloride",
    "price": 8260,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/7/97396f625fd0897ac7566fc410ee29722c7d98a6601fe7dd6959ba39b26e449d.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34488-2.5L",
    "name": "Dichloromethane CHROMASOLV�, for pesticide",
    "description": "Developed especially for the application in residue analysis of pesticides and other low-volatile substances using GC",
    "price": 60413,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/7/97396f625fd0897ac7566fc410ee29722c7d98a6601fe7dd6959ba39b26e449d.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34730-1L",
    "name": "HYDRANAL� - Solvent E Medium for volumetric two-component Karl Fischer titration (ethanol-based)",
    "description": "Hydranal� is the most trusted brand in Karl Fischer titration because of its dedication to quality, consistency and continued innovation.",
    "price": 14408,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/0/c/0cebdabb6dc8868123d151b76f52485684e9b23bea23a96fda19c43eae6efbaf.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "304-1L",
    "name": "N-Methylpyrrolidone B&J Brand�, for HPLC, GC and spectrophotometry, >99.5%",
    "description": "Nmp; N-Methyl-2-Pyrrolidone; N-Methyl-2-Pyrrolidinone",
    "price": 140859,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "34871-1L",
    "name": "1-Propanol CHROMASOLV�, for HPLC, ?99.9%",
    "description": "For HPLC and organic synthesis, High-purity, multipurpose solvents",
    "price": 6641,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/5/0/501fb4e461b7fdb6875155774bbd694e063e00137d59347f73b4abfb0113b237.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "17844-250G",
    "name": "Sodium phosphate monobasic for HPLC, ?99.0%",
    "description": "Monosodium dihydrogen orthophosphate; Monosodium phosphate; Sodium dihydrogen phosphate",
    "price": 42932,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/2/4/245ad94789c68088d72f9389cc305434fcbd01963e82223915280d5344d44228.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34816-1L-SC",
    "name": "HYDRANAL� - Composite 5 K Titrating agent for volumetric one-component Karl Fischer titration in aldehydes and ketones (methanol free)",
    "description": "Karl Fischer reagent",
    "price": 18945,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/0/e/0e7afefc59c5323cae7f80a10dcf440ed47f418672a201acebf61f601f9b98a0.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34738-1L",
    "name": "HYDRANAL� - KetoSolver Medium for volumetric one-component Karl Fischer titration in aldehydes and ketones (methanol free)",
    "description": "Karl Fischer medium",
    "price": 14266,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/f/7/f7adbd4443739f7b41827e33ddf129613d8432dfff8aff83a5993676de7fdf7a.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "31232-250G",
    "name": "Iron(III) chloride 6H2O",
    "description": "Ferric chloride hexahydrate",
    "price": 6178,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/a/5/a5c0379febc11959eaf81a1e1b86f7e13b6108b02a69b58fadddc0100c5f3c63.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "55674-50G",
    "name": "Ammonium formate",
    "description": "Eluent additive for LC-MS",
    "price": 30399,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/4/5/45eb57c81589fdf18cba6333619010dde08e104d8fdb00a24318fe106e303398.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34738-1L",
    "name": "HYDRANAL� - KetoSolver",
    "description": "Medium for volumetric one-component Karl Fischer titration in aldehydes and ketones (methanol free)",
    "price": 14266,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/f/7/f7adbd4443739f7b41827e33ddf129613d8432dfff8aff83a5993676de7fdf7a.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34865-1L",
    "name": "Tetrahydrofuran",
    "description": "CHROMASOLV� Plus, for HPLC, inhibitor-free, ?99.9%",
    "price": 22266,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/f/6/f69a74a249f7a10070899df043776e32eb78a87a2e6efdb19da01853bd5b9a7c.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34810-500ML",
    "name": "HYDRANAL� - Coulomat AD",
    "description": "Anolyte for coulometric Karl Fischer titration (methanol-based), preferred for cells without diaphragm",
    "price": 81415,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/catalog_product_fluka.jpg",
    "category": "Chemicals"
  },
  {
    "id": "34807-500ML",
    "name": "HYDRANAL� - Coulomat A",
    "description": "Anolyte for coulometric Karl Fischer titration (methanol-chloroform-based), preferred for cells with diaphragm",
    "price": 76194,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/catalog_product_fluka.jpg",
    "category": "Chemicals"
  },
  {
    "id": "076-1L",
    "name": "N,N-Dimethylformamide",
    "description": "B&J Brand�, for HPLC, GC and spectrophotometry, >99.9%",
    "price": 115696,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "35007-1L",
    "name": "Bromide bromate Standard solution",
    "description": "Titrant for the Determination of the Bromine Number",
    "price": 6727,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/catalog_product_fluka.jpg",
    "category": "Chemicals"
  },
  {
    "id": "650447-1L",
    "name": "2-Propanol",
    "description": "CHROMASOLV� Plus, for HPLC, 99.9%",
    "price": 6866,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/d/9df74dba078b79bc1d672c8277c7fdb7bfa8c0e35052d30b69f78cbb102b9f3a.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "39253-4L",
    "name": "Water",
    "description": "CHROMASOLV� LC-MS",
    "price": 52634,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/0/4/04ace87f73cee31d19511e668d94dba424936f6e49ef4b12d5c43cf6b2a76bae.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "I5051-1L",
    "name": "Water",
    "description": "for HPLC",
    "price": 717,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "34967-250ML",
    "name": "Acetonitrile",
    "description": "CHROMASOLV� LC-MS, ?99.9%",
    "price": 9776,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/3/4/3430d6614e36f4e1002504162210f0367a76a916f659eacf0ad02951f6c607e0.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "I0124-2.5L",
    "name": "Ethyl Acetate",
    "description": "Analytical reagent, Meets ACS Specifications for General Use",
    "price": 2431,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "I5013-2.5L",
    "name": "Glycerol",
    "description": "ACS Reagent, ?99.5%",
    "price": 3432,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "39253-4L",
    "name": "Water",
    "description": "CHROMASOLV� LC-MS",
    "price": 51447,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/0/4/04ace87f73cee31d19511e668d94dba424936f6e49ef4b12d5c43cf6b2a76bae.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "14262-1L",
    "name": "Methanol",
    "description": "CHROMASOLV� LC-MS Ultra, tested for UHPLC-MS",
    "price": 9884,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/4/9464e959a4c59a8f237d351074aa48ad0c5d4315bc3dee4c4ba230ac39bdd096.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "14261-2L",
    "name": "Acetonitrile",
    "description": "CHROMASOLV� LC-MS Ultra, tested for UHPLC-MS",
    "price": 20328,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/3/4/3430d6614e36f4e1002504162210f0367a76a916f659eacf0ad02951f6c607e0.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34821-50ML",
    "name": "HYDRANAL� - Coulomat CG-K",
    "description": "Catholyte for coulometric Karl Fischer titration in ketones (methanol free)",
    "price": 137644,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/e/e/eebbea80487aa31a232832906db1e9a7d073f22b8862c66628ada67dc5470452.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34840-50ML",
    "name": "HYDRANAL� - Coulomat CG",
    "description": "Catholyte for coulometric Karl Fischer titration (methanol-based)",
    "price": 61331,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/0/c03ae0e1a17e783cbf1ab20ca4a32eeecaa8562ab1ab14fc9e34fc4a67cd3c1d.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "32301-100G",
    "name": "Ammonium acetate",
    "description": "Puriss. p.a., ACS Reagent, Reag. Ph. Eur., ?98%",
    "price": 4681,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/ca41d34026628ffa4015fb0a1ced5c5dc362db89d4eeafce0e9d994c19d93840.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "I5014-500ml",
    "name": "Hydrochloric acid",
    "description": "ACS Reagent, 36%",
    "price": 486,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "I5020-500ML",
    "name": "Nitric acid",
    "description": "ACS Reagent, 70%",
    "price": 626,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/catalog_product_honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "31103-1L",
    "name": "Acetate buffer solution PH 4.65",
    "description": "Sodium Acetate/Acetic Acid",
    "price": 7740,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/b/6/b6ecfd90402910b8986fd55a5ed73aa16d80c37cfd5ee40bc04a53eb0610b9ed.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34807-500ML",
    "name": "HYDRANAL� - Coulomat A",
    "description": "Anolyte for coulometric Karl Fischer titration (methanol-chloroform-based), preferred for cells with diaphragm",
    "price": 63563,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/c/a/catalog_product_fluka.jpg",
    "category": "Chemicals"
  },
  {
    "id": "32221-500ML",
    "name": "Ethanol (Untaxed)",
    "description": "Puriss. p.a., absolute, ?99.8% (GC), for license holders only",
    "price": 5799,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/0/6/062f0ca73361d1d36849d065e1beeddc995374f8490e481a6e8f076884951569.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "076-1L",
    "name": "N,N-Dimethylformamide",
    "description": "B&J Brand�, for HPLC, GC and spectrophotometry, >99.9%",
    "price": 115696,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "34800-6X1L",
    "name": "HYDRANAL� - Solvent",
    "description": "Medium for volumetric two-component Karl Fischer titration (methanol-based)",
    "price": 68286,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/placeholder/default/honeywell.jpg",
    "category": "Chemicals"
  },
  {
    "id": "25669-1L",
    "name": "Chloroform",
    "description": "CHROMASOLV�, for residue analysis, contains ~1% ethanol as stabilizer, ?99.8%",
    "price": 13413,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/a/4/a4d7d0e393fe5009484c501579f1a8faec964a20c5b02f5acc038470f464fb91.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34986-2.5L",
    "name": "Hexane",
    "description": "CHROMASOLV� LC-MS",
    "price": 17793,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/3/6/36c19cb27c468bda744284e425aaca48d74d2287230df2152d9dd617bd85f17a.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "34967-4X2.5L",
    "name": "Acetonitrile",
    "description": "CHROMASOLV� LC-MS, ?99.9%",
    "price": 70827,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/3/4/3430d6614e36f4e1002504162210f0367a76a916f659eacf0ad02951f6c607e0.jpeg",
    "category": "Chemicals"
  },
  {
    "id": "650447-1L",
    "name": "2-Propanol",
    "description": "CHROMASOLV� Plus, for HPLC, 99.9%",
    "price": 6866,
    "image": "/https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/d/9df74dba078b79bc1d672c8277c7fdb7bfa8c0e35052d30b69f78cbb102b9f3a.jpeg",
    "category": "Chemicals"
  }
];