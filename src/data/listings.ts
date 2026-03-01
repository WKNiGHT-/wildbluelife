export interface Business {
  name: string;
  phone: string | null;
  rating: number;
  reviewCount: number;
  category: string;
  contact?: string;
  location?: string;
  website?: string;
  recommendedBy?: string[];
  vouches?: number;
  notRecommended?: boolean;
}

export const businesses: Business[] = [
  // Air Conditioning Services
  { name: "Conditioned Air", phone: "(239) 686-0168", rating: 1, reviewCount: 3, category: "Air Conditioning Services" },
  { name: "Holiday Air", phone: "(239) 437-7823", rating: 0, reviewCount: 0, category: "Air Conditioning Services" },
  { name: "Island Air", phone: "(239) 935-8880", rating: 5, reviewCount: 1, category: "Air Conditioning Services" },
  { name: "Premium Cooling Solutions", phone: "(239) 300-5851", rating: 3, reviewCount: 1, category: "Air Conditioning Services" },
  { name: "Weather Control", phone: "(239) 936-0333", rating: 0, reviewCount: 0, category: "Air Conditioning Services" },

  // Airport Shuttle
  { name: "Simone Elkeles", phone: null, rating: 5, reviewCount: 4, category: "Airport Shuttle", contact: "Wildblue Resident", recommendedBy: ["Janet J.", "Tom O."], vouches: 6 },

  // Audio Visual Systems
  { name: "Diamond Security and Sound", phone: "(239) 768-1799", rating: 0, reviewCount: 0, category: "Audio Visual Systems" },

  // Auto Transport
  { name: "East Coast Auto Transport", phone: "(800) 393-1850", rating: 0, reviewCount: 0, category: "Auto Transport" },
  { name: "Montway Auto Transport", phone: "(888) 666-8929", rating: 0, reviewCount: 0, category: "Auto Transport" },

  // Babysitters
  { name: "Carly Muroff", phone: "(215) 588-0242", rating: 0, reviewCount: 0, category: "Babysitters", contact: "College Student" },

  // Barbershop for Men
  { name: "A Cut Above of Estero", phone: "(239) 992-1191", rating: 4, reviewCount: 1, category: "Barbershop for Men" },

  // Boat Docks
  { name: "Amberjack Marine Construction", phone: "(239) 283-0454", rating: 3, reviewCount: 2, category: "Boat Docks" },
  { name: "J & M Boat Lift and Repair", phone: "(239) 353-7326", rating: 0, reviewCount: 0, category: "Boat Docks" },
  { name: "Nelson Marine Construction", phone: "(239) 992-4443", rating: 0, reviewCount: 0, category: "Boat Docks" },

  // Boat Storage
  { name: "Ryan From Estero", phone: "(239) 672-9874", rating: 0, reviewCount: 0, category: "Boat Storage" },

  // Carpentry
  { name: "Byrus Signature Touch", phone: "(239) 920-8746", rating: 0, reviewCount: 0, category: "Carpentry" },
  { name: "Great Scott's Custom Cabinets", phone: "(239) 634-4355", rating: 0, reviewCount: 0, category: "Carpentry" },
  { name: "In and Out Improvement", phone: "(571) 334-4005", rating: 0, reviewCount: 0, category: "Carpentry" },
  { name: "Straightline Custom Finishing", phone: "(414) 243-9602", rating: 4, reviewCount: 5, category: "Carpentry", recommendedBy: ["Kimberly Molenhouse", "Louis Vaccarella", "Kevin Prather", "Wendy Hanebrink", "Gary & Nancy Lemon"], vouches: 18 },
  { name: "Revlinc", phone: "(239) 285-4269", rating: 3, reviewCount: 2, category: "Carpentry", contact: "Donny Bender" },
  { name: "JGF Construction", phone: "(239) 747-3853", rating: 5, reviewCount: 0, category: "Carpentry", recommendedBy: ["Denis Bourque"], vouches: 2 },

  // Catering Companies
  { name: "Artichoke & Company", phone: "(239) 263-6979", rating: 0, reviewCount: 0, category: "Catering Companies" },
  { name: "E'Leeps Catering", phone: "(239) 271-4252", rating: 0, reviewCount: 0, category: "Catering Companies" },
  { name: "Jamie and Jacob catering", phone: "(239) 495-0645", rating: 0, reviewCount: 0, category: "Catering Companies" },

  // Closets and Pantries
  { name: "Inspired Closets Southwest Florida", phone: "(239) 948-0022", rating: 0, reviewCount: 0, category: "Closets and Pantries" },

  // Computer Support
  { name: "Jake Folkerts", phone: "(618) 317-4661", rating: 5, reviewCount: 2, category: "Computer Support", contact: "FGCU Student" },

  // Countertops
  { name: "Sergio Miranda", phone: "(239) 789-8879", rating: 0, reviewCount: 0, category: "Countertops" },

  // Dentists
  { name: "Gold Standard Dentistry", phone: "(239) 333-1140", rating: 0, reviewCount: 0, category: "Dentists" },

  // Dermatologist
  { name: "Houck Dermatology", phone: "(239) 390-3376", rating: 5, reviewCount: 1, category: "Dermatologist" },
  { name: "Woodruff Institute in Bonita & Naples", phone: "(239) 307-4605", rating: 0, reviewCount: 0, category: "Dermatologist" },

  // Driveway Sealers
  { name: "Justin Smith", phone: "(239) 963-5605", rating: 5, reviewCount: 1, category: "Driveway Sealers" },
  { name: "Paver Protectors", phone: "(239) 288-0705", rating: 0, reviewCount: 0, category: "Driveway Sealers" },

  // Electrician
  { name: "Blair Professional Services", phone: "(239) 777-2266", rating: 5, reviewCount: 1, category: "Electrician" },
  { name: "DPI Experts", phone: "(239) 839-3793", rating: 0, reviewCount: 0, category: "Electrician" },
  { name: "Juan Manuel", phone: "(239) 240-1156", rating: 0, reviewCount: 0, category: "Electrician" },
  { name: "Salty Shores Installations", phone: "(239) 329-0176", rating: 0, reviewCount: 0, category: "Electrician" },
  { name: "Technical Edge Electric", phone: "(239) 826-1968", rating: 0, reviewCount: 0, category: "Electrician" },
  { name: "Volt Pro Electrical", phone: "(239) 789-1786", rating: 0, reviewCount: 0, category: "Electrician" },
  { name: "Wave Electric", phone: "(239) 293-1728", rating: 0, reviewCount: 0, category: "Electrician" },

  // Exterior Home Cleaning
  { name: "Beyond Property Care", phone: "(239) 234-3221", rating: 5, reviewCount: 0, category: "Exterior Home Cleaning" },

  // Fitness and Wellness
  { name: "Fusion Yoga & Wellness", phone: "(239) 498-8800", rating: 5, reviewCount: 0, category: "Fitness and Wellness" },

  // Furniture Discounts
  { name: "Salon and Space Environments Inc.", phone: "(908) 420-0744", rating: 0, reviewCount: 0, category: "Furniture Discounts" },

  // Furniture Repair
  { name: "Acosta's Leather", phone: "(941) 575-7000", rating: 3, reviewCount: 1, category: "Furniture Repair" },
  { name: "Fix Fine Furniture", phone: "(305) 389-2154", rating: 5, reviewCount: 1, category: "Furniture Repair" },
  { name: "Hercules Designer Services", phone: "(239) 278-4372", rating: 0, reviewCount: 0, category: "Furniture Repair" },

  // Golf Carts
  { name: "Gator Golf Carts", phone: "(239) 334-4000", rating: 5, reviewCount: 3, category: "Golf Carts", recommendedBy: ["Christine Guinan", "Wendy Henry"], vouches: 6 },
  { name: "Matts Custom Golf Carts", phone: "(239) 333-8895", rating: 4, reviewCount: 5, category: "Golf Carts", recommendedBy: ["Shirley Bullock-Vazquez", "Steve Riggs", "Rosanne Duffy"], vouches: 8 },

  // Garage Doors Insulation and AC
  { name: "My Cool Garage", phone: "(239) 464-1129", rating: 5, reviewCount: 1, category: "Garage Doors Insulation and AC" },

  // Glass Enclosures
  { name: "Glass Company of Naples", phone: "(239) 682-9171", rating: 0, reviewCount: 0, category: "Glass Enclosures" },

  // Grill Cleaning
  { name: "Bonita Grill Cleaning", phone: "(239) 405-4501", rating: 5, reviewCount: 0, category: "Grill Cleaning" },

  // Grout Cleaning/Sealing
  { name: "Grout Magnificent", phone: "(239) 476-8855", rating: 5, reviewCount: 1, category: "Grout Cleaning/Sealing" },
  { name: "It's All About Grout", phone: "(239) 574-7688", rating: 0, reviewCount: 0, category: "Grout Cleaning/Sealing" },
  { name: "Steamway Carpet & Tile Cleaning", phone: "(239) 936-8077", rating: 0, reviewCount: 0, category: "Grout Cleaning/Sealing" },
  { name: "The Groutsmith", phone: "(239) 322-2320", rating: 0, reviewCount: 0, category: "Grout Cleaning/Sealing" },

  // Hair Stylist
  { name: "Angie at Angie's Extreme attitudes", phone: "217-772-1300", rating: 0, reviewCount: 0, category: "Hair Stylist" },
  { name: "Salon Amiche", phone: "(239) 245-7009", rating: 5, reviewCount: 0, category: "Hair Stylist" },

  // Handyman
  { name: "Tom McDonnell", phone: "(239) 910-7968", rating: 5, reviewCount: 5, category: "Handyman", recommendedBy: ["Kim Frase", "Debbie Nolan", "B Collen", "Janet Jezior"], vouches: 11 },
  { name: "Brad Meiser", phone: "(239) 839-8362", rating: 5, reviewCount: 1, category: "Handyman", recommendedBy: ["Mike T."], vouches: 3 },
  { name: "Suazo Inc.", phone: "(504) 655-0198", rating: 5, reviewCount: 1, category: "Handyman", recommendedBy: ["Linda S."], vouches: 2 },
  { name: "Mike Sullivan", phone: "(219) 628-0280", rating: 0, reviewCount: 0, category: "Handyman" },
  { name: "Rob Berend Handyman Services", phone: "(774) 263-0174", rating: 5, reviewCount: 0, category: "Handyman", recommendedBy: ["K Smith"], vouches: 4 },

  // Home Generators
  { name: "Bo's Electric", phone: "(239) 275-4502", rating: 0, reviewCount: 0, category: "Home Generators" },
  { name: "Gen Power", phone: "(239) 674-3569", rating: 5, reviewCount: 2, category: "Home Generators", recommendedBy: ["John P.", "Rich W."], vouches: 5 },

  // Home Inspectors
  { name: "Bert Dooley", phone: "(813) 967-2987", rating: 0, reviewCount: 0, category: "Home Inspectors" },
  { name: "Class Act Inspections", phone: "(239) 841-9456", rating: 5, reviewCount: 2, category: "Home Inspectors" },
  { name: "Dave Fetty CMI", phone: "(239) 339-7380", rating: 0, reviewCount: 0, category: "Home Inspectors" },
  { name: "Golden Rule Home Inspections", phone: "(239) 432-0178", rating: 5, reviewCount: 1, category: "Home Inspectors" },
  { name: "Terry Carroll", phone: "(239) 745-5776", rating: 0, reviewCount: 0, category: "Home Inspectors" },

  // Home Owners Insurance Company
  { name: "Briteway Insurance", phone: "(239) 466-8050", rating: 0, reviewCount: 0, category: "Home Owners Insurance Company" },
  { name: "Progressive", phone: null, rating: 0, reviewCount: 0, category: "Home Owners Insurance Company" },
  { name: "Nate Touchette at East and Greenwell", phone: "(239) 672-4312", rating: 0, reviewCount: 0, category: "Home Owners Insurance Company" },
  { name: "Lorrie at Nash Insurance Agency", phone: null, rating: 0, reviewCount: 0, category: "Home Owners Insurance Company" },
  { name: "HH Insurance from St. Petersburg", phone: "(727) 498-5551", rating: 0, reviewCount: 0, category: "Home Owners Insurance Company" },

  // Home Watch
  { name: "Your Trusty Neighbors", phone: "(239) 322-8460", rating: 5, reviewCount: 4, category: "Home Watch", recommendedBy: ["Karen M.", "Bob D."], vouches: 7 },
  { name: "Gold Shield", phone: "(239) 888-9881", rating: 0, reviewCount: 0, category: "Home Watch" },

  // House Cleaners
  { name: "Edna Cleaning Service", phone: "239-878-9333", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Estela's Cleaning Service", phone: "(239) 470-3608", rating: 5, reviewCount: 1, category: "House Cleaners", recommendedBy: ["Emily T."], vouches: 3 },
  { name: "Fabiola Misas", phone: "(239) 384-1193", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Juliana's Cleaning Service", phone: "(239) 872-5151", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Laura Cleaning Service", phone: "(239) 895-5196", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Mara's Maids", phone: "(239) 209-2557", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Maria Loarte", phone: "(239) 687-6108", rating: 0, reviewCount: 0, category: "House Cleaners" },
  { name: "Pro Cleaning of Naples", phone: "(239) 651-7496", rating: 0, reviewCount: 0, category: "House Cleaners" },

  // Interior Designer
  { name: "Four Step Design", phone: "(239) 776-1318", rating: 0, reviewCount: 0, category: "Interior Designer" },
  { name: "Liz Flowers Interiors", phone: "(239) 488-0066", rating: 0, reviewCount: 0, category: "Interior Designer" },
  { name: "L Walker Designs", phone: "(609) 220-8062", rating: 0, reviewCount: 0, category: "Interior Designer" },
  { name: "Prime Design Interiors Carrie Hathorne", phone: "(219) 545-8287", rating: 0, reviewCount: 0, category: "Interior Designer" },

  // Internet Services
  { name: "Xfinity Cable", phone: "800-934-6489", rating: 0, reviewCount: 0, category: "Internet Services" },

  // Landscaping
  { name: "Estero Landscaping", phone: "(239) 672-9874", rating: 3, reviewCount: 2, category: "Landscaping" },
  { name: "Javier Landscaping", phone: "(239) 404-6134", rating: 0, reviewCount: 0, category: "Landscaping" },
  { name: "JMC Landscaping", phone: "(239) 558-5943", rating: 0, reviewCount: 0, category: "Landscaping" },
  { name: "Peer Landscaping", phone: "(239) 645-6455", rating: 0, reviewCount: 0, category: "Landscaping" },
  { name: "Stahlman Landscaping", phone: "(239) 963-6837", rating: 0, reviewCount: 0, category: "Landscaping" },
  { name: "Weeks Landscaping", phone: "(239) 936-2456", rating: 0, reviewCount: 0, category: "Landscaping" },

  // Landscape Lighting
  { name: "Elegant Lighting", phone: "(239) 734-0100", rating: 0, reviewCount: 0, category: "Landscape Lighting" },
  { name: "Gator Outdoor Lighting", phone: "(239) 440-2244", rating: 0, reviewCount: 0, category: "Landscape Lighting" },
  { name: "Seaglass Illuminations", phone: "(239) 770-4757", rating: 0, reviewCount: 0, category: "Landscape Lighting" },

  // Mobile Detailing
  { name: "Chase Ross", phone: "(239) 287-5457", rating: 0, reviewCount: 0, category: "Mobile Detailing" },

  // Mortgage Lending
  { name: "Arnel Castillo", phone: "(630) 440-6646", rating: 0, reviewCount: 0, category: "Mortgage Lending" },
  { name: "Chase", phone: "(630) 207-1940", rating: 5, reviewCount: 0, category: "Mortgage Lending" },

  // Outdoor Furniture
  { name: "Costco", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Gouse", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Elegant Outdoor", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Rooms to Go Patio", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Patio corner in Fort Myers", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Zing", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Galler", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Palm Casual", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },
  { name: "Leader's Casual Furniture", phone: null, rating: 0, reviewCount: 0, category: "Outdoor Furniture" },

  // Outdoor Kitchen
  { name: "Al Nunez", phone: "(773) 418-4277", rating: 0, reviewCount: 0, category: "Outdoor Kitchen" },
  { name: "Elegant Outdoor Kitchens", phone: "(239) 229-9033", rating: 0, reviewCount: 0, category: "Outdoor Kitchen" },
  { name: "Kasabarbq Outdoor Kitchen", phone: "(239) 301-4254", rating: 0, reviewCount: 0, category: "Outdoor Kitchen" },
  { name: "The Outdoor Kitchen Place", phone: "(239) 221-3504", rating: 0, reviewCount: 0, category: "Outdoor Kitchen" },

  // Painter
  { name: "Ryan Hammond Inc", phone: "(239) 872-2559", rating: 0, reviewCount: 0, category: "Painter" },
  { name: "SWFL Interior Painting", phone: "(239) 413-6253", rating: 5, reviewCount: 1, category: "Painter" },
  { name: "San Diego's Painting", phone: "(239) 231-6078", rating: 5, reviewCount: 0, category: "Painter" },
  { name: "Mike Hoffmann Painting", phone: "(239) 850-9071", rating: 5, reviewCount: 0, category: "Painter" },
  { name: "Painting By Theo", phone: "(239) 397-2468", rating: 5, reviewCount: 0, category: "Painter" },
  { name: "Antonio Parez", phone: "(309) 423-7457", rating: 5, reviewCount: 0, category: "Painter" },

  // Pest Control
  { name: "All U Need Pest Control", phone: "(239) 424-8742", rating: 3, reviewCount: 2, category: "Pest Control" },
  { name: "Waves Pest Control", phone: "(941) 297-5749", rating: 5, reviewCount: 0, category: "Pest Control", recommendedBy: ["David Andrukaitis"], vouches: 2 },
  { name: "Greenhouse Termite and Pest Control", phone: "(813) 991-0033", rating: 5, reviewCount: 0, category: "Pest Control" },
  { name: "Walther Pest Control", phone: "(239) 994-5656", rating: 1, reviewCount: 1, category: "Pest Control", notRecommended: true },

  // Pet Groomers
  { name: "Dipidy Dawg", phone: "(239) 949-9885", rating: 0, reviewCount: 0, category: "Pet Groomers" },
  { name: "Paw-Radise", phone: "(239) 948-2287", rating: 0, reviewCount: 0, category: "Pet Groomers" },

  // Pet Sitters
  { name: "Patricia's Pet Sitting", phone: "(408) 425-9020", rating: 0, reviewCount: 0, category: "Pet Sitters" },
  { name: "Zoe Lefort", phone: "(239) 203-9871", rating: 5, reviewCount: 2, category: "Pet Sitters", contact: "Lives in Wildblue", recommendedBy: ["Sarah G.", "Lisa R."], vouches: 5 },

  // Plumbers
  { name: "Diversified Plumbing", phone: "(239) 850-6674", rating: 5, reviewCount: 1, category: "Plumbers" },
  { name: "No Worry Plumbing", phone: "(239) 287-2334", rating: 0, reviewCount: 0, category: "Plumbers" },
  { name: "Sunset Plumbing", phone: "(239) 687-6797", rating: 0, reviewCount: 0, category: "Plumbers" },
  { name: "Aztec Plumbing & Drains", phone: "(239) 666-3900", rating: 5, reviewCount: 0, category: "Plumbers" },

  // Pool Enclosures and Screening
  { name: "Ace Screen Repair", phone: "(239) 919-6779", rating: 5, reviewCount: 1, category: "Pool Enclosures and Screening" },
  { name: "Pace Enclosures", phone: "(239) 275-3818", rating: 0, reviewCount: 0, category: "Pool Enclosures and Screening" },
  { name: "Prema Rescreen and Pressure Washing LLC", phone: "(239) 940-1327", rating: 0, reviewCount: 0, category: "Pool Enclosures and Screening" },

  // Pool Handrails
  { name: "Arrowhead", phone: "(941) 809-6366", rating: 0, reviewCount: 0, category: "Pool Handrails" },
  { name: "Mr. GrabBar", phone: "(239) 514-4722", rating: 0, reviewCount: 0, category: "Pool Handrails" },

  // Pool Service
  { name: "Angel's Pool Service", phone: "(239) 269-9657", rating: 5, reviewCount: 1, category: "Pool Service" },
  { name: "Aragon", phone: "(239) 659-4066", rating: 0, reviewCount: 0, category: "Pool Service" },
  { name: "Baires Pool Service", phone: "(239) 938-6562", rating: 5, reviewCount: 1, category: "Pool Service" },
  { name: "Blue Water Pools", phone: "(239) 595-1542", rating: 0, reviewCount: 0, category: "Pool Service" },
  { name: "Edgewater Pool and Spa", phone: "(239) 961-8379", rating: 0, reviewCount: 0, category: "Pool Service" },
  { name: "Healthy Pools of SWFL", phone: "(239) 426-0300", rating: 3, reviewCount: 2, category: "Pool Service" },
  { name: "Pool Guys Who Care", phone: "(239) 599-3289", rating: 1, reviewCount: 2, category: "Pool Service" },
  { name: "Royal Splash", phone: "(239) 980-1463", rating: 1, reviewCount: 2, category: "Pool Service" },
  { name: "Riverside Pool Services", phone: "(239) 292-8398", rating: 5, reviewCount: 1, category: "Pool Service" },
  { name: "Smart Pools", phone: "(239) 601-2028", rating: 4, reviewCount: 1, category: "Pool Service" },
  { name: "Tri-City Pools", phone: "(239) 481-4122", rating: 2, reviewCount: 1, category: "Pool Service" },
  { name: "Water Worx Pool Care", phone: "(239) 850-7453", rating: 5, reviewCount: 1, category: "Pool Service" },

  // Restaurants
  { name: "Caff\u00E8 da Michele Osteria Italiana", phone: null, rating: 4, reviewCount: 5, category: "Restaurants", location: "Miramar outlets" },
  { name: "Doc's Beach House", phone: null, rating: 0, reviewCount: 0, category: "Restaurants", location: "Bonita Springs" },
  { name: "Limoncello Italian Restaurant", phone: null, rating: 5, reviewCount: 1, category: "Restaurants", location: "North Naples" },
  { name: "MAKS Asian Kitchen & Sushi", phone: null, rating: 5, reviewCount: 1, category: "Restaurants", location: "Fort Myers" },
  { name: "San Matteo Italian Restaurant", phone: "(239) 234-2536", rating: 5, reviewCount: 0, category: "Restaurants" },

  // RV & Boat Storage
  { name: "Elite Storage", phone: "(239) 768-2225", rating: 5, reviewCount: 1, category: "RV & Boat Storage" },
  { name: "Jetport RV & Boat Storage", phone: "(239) 880-2628", rating: 5, reviewCount: 1, category: "RV & Boat Storage" },

  // Spa
  { name: "U-TOPIA SPA at Wildblue", phone: "(239) 444-9219", rating: 5, reviewCount: 1, category: "Spa" },

  // Tile Work
  { name: "Blue Tile LLC", phone: "(239) 848-5863", rating: 0, reviewCount: 0, category: "Tile Work" },
  { name: "Virginia Villa and Team", phone: "(239) 340-6721", rating: 0, reviewCount: 0, category: "Tile Work" },

  // Upholstery
  { name: "Bayside Upholstery", phone: "(239) 495-6280", rating: 0, reviewCount: 0, category: "Upholstery" },

  // Veterinarian
  { name: "Alico Pet Vet", phone: "(239) 441-2525", rating: 5, reviewCount: 1, category: "Veterinarian" },
  { name: "Estero Animal Hospital", phone: "(239) 992-3883", rating: 0, reviewCount: 0, category: "Veterinarian" },
  { name: "San Carlos Park Animal Hospital", phone: "(239) 367-7711", rating: 0, reviewCount: 0, category: "Veterinarian" },

  // Wallpaper Hanger
  { name: "Donna Devlin", phone: "(239) 777-9940", rating: 0, reviewCount: 0, category: "Wallpaper Hanger" },
  { name: "Anthony Falcone", phone: "(609) 992-6385", rating: 0, reviewCount: 0, category: "Wallpaper Hanger" },
  { name: "Teresa Obermayer", phone: "(239) 821-3402", rating: 0, reviewCount: 0, category: "Wallpaper Hanger" },
  { name: "Rich Wojtiwicz", phone: "(773) 758-8008", rating: 0, reviewCount: 0, category: "Wallpaper Hanger" },

  // Water Filtration
  { name: "Culligan", phone: "(239) 266-5158", rating: 5, reviewCount: 1, category: "Water Filtration" },
  { name: "District Water Testing", phone: "(239) 565-2312", rating: 5, reviewCount: 1, category: "Water Filtration" },
  { name: "Kinetico", phone: "(239) 287-4657", rating: 0, reviewCount: 0, category: "Water Filtration" },

  // Window Treatments
  { name: "5 Day Plantation shutters", phone: "(239) 437-4188", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Budget Blinds", phone: "(239) 776-1318", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Deluxe Window Treatments & more", phone: "(239) 267-7091", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "San Carlos interiors", phone: "(239) 267-3737", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Candace & Harvey from Westside Installation", phone: "(239) 949-0419", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Naples Shutter", phone: "(815) 914-1159", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Raebecca Drapery by Design", phone: "(239) 495-1840", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "Shutter & Shade Connection", phone: "(239) 990-7086", rating: 0, reviewCount: 0, category: "Window Treatments" },
  { name: "ShudderUp", phone: "(239) 671-4233", rating: 5, reviewCount: 0, category: "Window Treatments" },

  // Window Washing
  { name: "Diamond Shine Windows", phone: "(239) 822-5853", rating: 0, reviewCount: 0, category: "Window Washing" },
  { name: "Tropical Window Washing", phone: "(239) 789-8738", rating: 5, reviewCount: 1, category: "Window Washing" },
  { name: "Wagner Window Washing", phone: "(239) 594-5433", rating: 5, reviewCount: 2, category: "Window Washing" },
  { name: "Clean Me Window Washing", phone: "(941) 479-9595", rating: 5, reviewCount: 0, category: "Window Washing", recommendedBy: ["Kathleen Logan Nonnamaker"] },
];

export const categories = [...new Set(businesses.map((b) => b.category))].sort();

export function getBusinessesByCategory(): Record<string, Business[]> {
  const grouped: Record<string, Business[]> = {};
  for (const business of businesses) {
    if (!grouped[business.category]) {
      grouped[business.category] = [];
    }
    grouped[business.category].push(business);
  }
  // Sort categories alphabetically
  const sorted: Record<string, Business[]> = {};
  for (const key of Object.keys(grouped).sort()) {
    sorted[key] = grouped[key];
  }
  return sorted;
}
