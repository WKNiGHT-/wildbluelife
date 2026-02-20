export interface Review {
  reviewer: string;
  date: string | null;
  rating: number;
  title: string;
  content: string;
}

export interface BusinessReviews {
  businessName: string;
  category: string;
  phone?: string;
  contact?: string;
  address?: string;
  hours?: string;
  overallRating: number;
  totalReviews: number;
  reviews: Review[];
}

export const reviewsByBusiness: BusinessReviews[] = [
  {
    businessName: "Conditioned Air",
    category: "Air Conditioning Services",
    phone: "(239) 686-0168",
    overallRating: 1.3,
    totalReviews: 3,
    reviews: [
      { reviewer: "Adrienne Ross", date: "2024-09-20", rating: 1, title: "Frustrating Delays and Poor Communication, Switched to a New Company", content: "Customer experienced extended delays (3+ weeks) in parts ordering, poor communication, receipt of wrong part, and ultimately switched providers. New company found missing parts in the AC unit." },
      { reviewer: "Tom OBrien", date: "2024-09-20", rating: 1, title: "Poor Service and Delays During Holiday HVAC Repair", content: "During Christmas 2022, installation of heaters was not completed, parts were unavailable during cold weather, wrong part delivered initially. Service deemed unacceptable during critical season." },
      { reviewer: "Rosanne Duffy", date: "2024-09-20", rating: 2, title: "Disappointed with Recent Service Delay and Overcharged Labor Fees", content: "After 4 years of satisfaction, recent AC blower motor repair involved scheduling delays, wrong part delivery, and excessive labor charges ($579 reduced to $350 for one-hour installation)." },
    ],
  },
  {
    businessName: "Tom McDonnell",
    category: "Handyman",
    phone: "(239) 910-7968",
    overallRating: 5.0,
    totalReviews: 11,
    reviews: [
      { reviewer: "Kim Frase", date: "2025-05-17", rating: 5, title: "Great job", content: "Tom did a great job, did work a few days after I contacted him and fair price" },
      { reviewer: "Debbie Nolan", date: "2024-12-14", rating: 5, title: "Very helpful", content: "Tom has been great to help with anything from broken roof tiles, a jammed garbage disposal, a broken freezer drawer handle and replacing lanai door trim." },
      { reviewer: "Debbie Nolan", date: "2024-11-09", rating: 5, title: "Roof and disposal repair", content: "Tom repaired my roof tiles and a cracked vent collar leak at a very reasonable price. He also fixed my jammed garbage disposal." },
      { reviewer: "B Collen", date: "2024-11-08", rating: 5, title: "Knowledgeable", content: "Tom is great to work with and is very knowledgeable." },
      { reviewer: "Janet Jezior", date: "2024-01-17", rating: 5, title: "Multiple projects", content: "Tom has helped me with several projects including putting a short wall up, installing wainscoting and installing a new vanity." },
    ],
  },
  {
    businessName: "Straightline Custom Finishing",
    category: "Carpentry",
    phone: "(414) 243-9602",
    contact: "Jason Ferguson",
    overallRating: 4.7,
    totalReviews: 15,
    reviews: [
      { reviewer: "Kimberly Molenhouse", date: "2025-04-04", rating: 5, title: "Very happy!", content: "We hired Jason at Straightline Custom Finishing to build a feature wall with a fireplace and stonework. Even though Jason recently had major surgery, his team was able to finish the job on time and do a great job. Their attention to detail is outstanding and we highly recommend Jason and his team!" },
      { reviewer: "Louis Laura Vaccarella", date: "2024-09-18", rating: 5, title: "Highly recommend! Excellent value for money", content: "The picture above with the stone wall fireplace TV with the blue fish and blue items on shelves is my house! Jason worked with us from IL and designed this wall from scratch. It is absolutely Beautiful!!! Hands down go with Jason!" },
      { reviewer: "Berns", date: "2024-06-09", rating: 5, title: "Outstanding service, beautiful craftsmanship!", content: "We can't say enough good things about Jason & his crew! We are so grateful for the outstanding work! Highly recommend!" },
      { reviewer: "Kevin Prather", date: "2023-11-21", rating: 5, title: "Very Happy with Jason and his team at Straight Line Custom Finishing!", content: "We had Jason install a built in fireplace with book shelves in our Pulte Stonewater Home. We are extremely happy. Jason made great suggestions to enhance the esthetics of our vision. Jason is busy so be patient he is well worth the wait. He delivered extreme value for the fees he charged! He has a no surprises communication style." },
      { reviewer: "Wendy Hanebrink", date: "2023-10-23", rating: 5, title: "Jason rocks", content: "Jason overhauled our Iris. He is extremely communicative and detailed. He shows up on time and cleans up. My husband is incredibly picky and he was very happy too!!" },
      { reviewer: "Gary & Nancy Lemon", date: "2026-02-06", rating: 5, title: "Beautiful custom designed wall unit", content: "Jason and his team took our entertainment wall ideas and converted them into a beautiful custom designed wall unit." },
    ],
  },
  {
    businessName: "Matts Custom Golf Carts",
    category: "Golf Carts",
    phone: "(239) 333-8895",
    address: "12894 Metro Pkwy, Fort Myers, FL 33966",
    hours: "Mon-Fri 9AM-6PM, Sat 9AM-3PM",
    overallRating: 4.4,
    totalReviews: 5,
    reviews: [
      { reviewer: "Shirley Bullock-Vazquez", date: "2023-02-01", rating: 5, title: "Great service", content: "Great service and we have loved it. Lithium battery is definitely a plus" },
      { reviewer: "Rosanne Alessi Duffy", date: "2023-02-01", rating: 5, title: "No issues", content: "Matt's.. had for over a year and no issues" },
      { reviewer: "Steve Riggs", date: "2023-02-01", rating: 5, title: "Easy to work with", content: "They were easy to work with and the cart is loaded with a very competitive price on top of it. And, the lithium battery was included!" },
      { reviewer: "Paul Daly", date: "2023-02-01", rating: 4, title: "Reasonable pricing", content: "Praised reasonable pricing and the inclusion of lithium batteries with purchase." },
      { reviewer: "Sean C", date: "2021-10-13", rating: 2, title: "Damaged paint", content: "Bought a new Evolution cart and they damaged the paint during assembly. Took 2 months to correct the issue. No compensation for delay, no apology..." },
    ],
  },
  {
    businessName: "Gator Golf Carts",
    category: "Golf Carts",
    phone: "(239) 334-4000",
    overallRating: 5.0,
    totalReviews: 3,
    reviews: [
      { reviewer: "Christine D. Guinan", date: "2023-02-01", rating: 5, title: "Easy to work with as a dealer", content: "We purchased ours from Gator Golf Cars, Ft Myers. It is on Ben Hill Griffin Prkwy just past RSW exit. They were easy to work with as a dealer. Ours is 18 mos old no issues thus far." },
      { reviewer: "Wendy Henry", date: "2023-02-01", rating: 5, title: "Easy to work with", content: "Easy to work with" },
      { reviewer: "Wendy Henry", date: "2022-11-15", rating: 5, title: "Excellent service", content: "We purchased our golf cart from Jordan at Gator Golf. He was very knowledgeable and helpful. Cart was delivered as promised and on time." },
    ],
  },
  {
    businessName: "Jake Folkerts",
    category: "Computer Support",
    phone: "(618) 317-4661",
    contact: "FGCU Student",
    overallRating: 5.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Knowledgeable and professional", content: "Although I probably could have done this all myself with great effort, Jacob saved me hours and hours of time to do more important things. He is most knowledgeable, very professional and was prompt. He knows how to set all devices up effortlessly and does not need to read any instructions. I highly recommend him, to assist with any technical issues or Wi-Fi issues or the set up of homes." },
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Highly recommend", content: "Very polite, upbeat, and most importantly knowledgeable on all things tech. Highly recommend his services." },
    ],
  },
  {
    businessName: "Estela's Cleaning Service",
    category: "House Cleaners",
    phone: "(239) 470-3608",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Emily T.", date: "2023-01-04", rating: 5, title: "Reliable and Thorough", content: "Estela is always responsive, which is very important to me. She also takes the time to change bedding, vacuum furniture, and wipe down outdoor areas at each visit. She is friendly and her team always does a wonderful job!" },
    ],
  },
  {
    businessName: "Waves Pest Control",
    category: "Pest Control",
    phone: "(941) 318-7612",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "David Andrukaitis", date: "2025-12-17", rating: 5, title: "Super professional", content: "Adam had called back within an hour and we had set up service. Super professional, knowledgeable, personable..." },
    ],
  },
  {
    businessName: "JGF Construction",
    category: "Carpentry",
    phone: "(239) 747-3853",
    contact: "John",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Denis Bourque", date: "2025-11-21", rating: 5, title: "Excellent work", content: "Added a garage bay. They did all the work including finish and roof tile. Excellent work." },
    ],
  },
  {
    businessName: "Rob Berend Handyman Services",
    category: "Handyman",
    phone: "(774) 263-0174",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "K Smith", date: "2025-10-13", rating: 5, title: "Several years of service", content: "We've used Rob for several years now. He does lots of miscellaneous projects..." },
    ],
  },
  // === Recovered reviews from web search (round 1) ===
  {
    businessName: "Amberjack Marine Construction",
    category: "Boat Docks",
    phone: "(239) 283-0454",
    overallRating: 3.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 1, title: "Sub par construction revealed after Hurricane Ian", content: "Initially thought they did a good job in a timely fashion, but after Hurricane Ian damaged the dock, the construction was found to be sub par. The contract stated footings would be concrete set, but the footings were merely cut to size and sat on top of the rocky ledge rather than being driven down into the dirt and concrete set, which contributed to the loss of the dock. Another contractor pointed out that the welds were not done properly." },
      { reviewer: "Wildblue Resident", date: null, rating: 1, title: "Outrageously expensive repair quote", content: "After calling to find out where we stood on the list to have the dock replaced, we were told we were number two but over nine months later and untold phone calls they never showed up to give a quote. Only after threatening social media exposure did the owner come to assess damage within two hours, but the repair quote was outrageously expensive — literally half the cost of a brand new dock. Would not use Amberjack Marine again." },
    ],
  },
  {
    businessName: "Revlinc",
    category: "Carpentry",
    phone: "(239) 285-4269",
    contact: "Donny Bender",
    overallRating: 3.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Exceptional and highly skilled", content: "Worked with Donny Bender and his team on construction projects including crown molding, cabinet upgrades and modifications, and woodworking. He is exceptional and highly skilled. Highly recommend for entertainment center designs, cabinet modifications, crown molding, and internal construction jobs. He has a highly skilled carpentry staff, does great work, is first class, and has been prompt, neat and timely." },
      { reviewer: "Wildblue Resident", date: null, rating: 1, title: "No-shows and lack of communication", content: "Continued no-shows for set quote appointments and lack of communication." },
    ],
  },
  {
    businessName: "Premium Cooling Solutions",
    category: "Air Conditioning Services",
    phone: "(239) 300-5851",
    overallRating: 3.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 3, title: "Great work but unreliable scheduling", content: "Two instances where the representative didn't show up without call or text. However, when contacted, the team was dispatched within two hours and did an excellent job cleaning the mini-split and ensuring everything was working perfectly. Hesitant to fully recommend due to scheduling issues and multiple times being left waiting for AC service. On the positive side, the company works on Lennox systems." },
    ],
  },
  {
    businessName: "Houck Dermatology",
    category: "Dermatologist",
    phone: "(239) 390-3376",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Very competent and thorough staff", content: "Very competent and thorough staff. Kelsi Dixon is a board certified nurse practitioner who is just excellent." },
    ],
  },
  {
    businessName: "Blair Professional Services",
    category: "Electrician",
    phone: "(239) 777-2266",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Amazing job hanging TVs", content: "Had Mark and Adam hang 3 TVs. They did an amazing job and were so thorough and tidy!" },
    ],
  },
  {
    businessName: "Grout Magnificent",
    category: "Grout Cleaning/Sealing",
    phone: "(239) 476-8855",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Couldn't believe the difference", content: "Couldn't believe the difference after they cleaned, repaired, and sealed the grout. WCI/Lennar homes typically have unsealed grout that stains easily and is hard to clean, and can come up fairly easily. Highly recommend." },
    ],
  },
  {
    businessName: "Class Act Inspections",
    category: "Home Inspectors",
    phone: "(239) 841-9456",
    overallRating: 5.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Very professional and great service", content: "Very professional and great service. Bryan was awesome! We did not close on house because of all he found." },
    ],
  },
  {
    businessName: "Estero Landscaping",
    category: "Landscaping",
    phone: "(239) 672-9874",
    overallRating: 3.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Could not be more pleased", content: "Very competitive with their pricing and easy to work with. Could not be more pleased and definitely made the right choice. Ryan goes above and beyond, not to mention his knowledge, hard work and integrity is impressive! He proactively checked on the landscaping, treated bushes with bug deterrence, and maintained ongoing care of the plants. Everything looks great." },
    ],
  },
  {
    businessName: "Wagner Window Washing",
    category: "Window Washing",
    phone: "(239) 594-5433",
    overallRating: 5.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "AMAZING crew", content: "The crew was AMAZING. In about 20 minutes, they were done cleaning all the windows and screens, inside and out, all mirrors and ceiling fans. This was our second time using them." },
    ],
  },
  {
    businessName: "MAKS Asian Kitchen & Sushi",
    category: "Restaurants",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Go-to place for sushi", content: "MAKS is our go-to place for sushi or Japanese food. The owner Billy is very accommodating, friendly and just an all-around nice guy, and the sushi chef Bobby cranks out awesome sushi. Service is always top-notch and the prices are reasonable. Make a reservation well ahead of time if possible because this place is extremely busy." },
    ],
  },
  {
    businessName: "All U Need Pest Control",
    category: "Pest Control",
    phone: "(239) 424-8742",
    overallRating: 3.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Ants gone in a few days", content: "Very pleased with the service. The ants were gone in a few days with a huge reduction in spiders. Would recommend them to anyone." },
      { reviewer: "Wildblue Resident", date: null, rating: 1, title: "Technician never returned", content: "The technician never returned and we still had ants around our home. Discontinued service." },
    ],
  },
  {
    businessName: "Ace Screen Repair",
    category: "Pool Enclosures and Screening",
    phone: "(239) 919-6779",
    contact: "Jeremy",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Timely response after Hurricane Ian", content: "Used Ace after Hurricane Ian. They responded timely and made repairs efficiently." },
    ],
  },
  {
    businessName: "Fix Fine Furniture",
    category: "Furniture Repair",
    phone: "(305) 389-2154",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Fixed like new", content: "Our dining room chair that was no longer available to buy was fixed like new. The owner comes to your home to pick up or repair furniture. He is a nice man. James and his son Treylan did a great job repairing the base of our kitchen table." },
    ],
  },
  {
    businessName: "Angel's Pool Service",
    category: "Pool Service",
    phone: "(239) 269-9657",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Professional and reliable", content: "The service is professional, reliable, and knowledgeable. The technician Victor visits weekly with a smile and works hard to keep the pool sparkling clean." },
    ],
  },
  {
    businessName: "Riverside Pool Services",
    category: "Pool Service",
    phone: "(239) 292-8398",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Derek is great", content: "Derek is great. We've never had an issue." },
    ],
  },
  {
    businessName: "Water Worx Pool Care",
    category: "Pool Service",
    phone: "(239) 850-7453",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Trustworthy provider", content: "Found a trustworthy provider that helped get water chemistry right and doesn't change prices frequently. Upgrades proved wonderful." },
    ],
  },
  {
    businessName: "Healthy Pools of SWFL",
    category: "Pool Service",
    phone: "(239) 426-0300",
    overallRating: 3.0,
    totalReviews: 2,
    reviews: [
      { reviewer: "Wildblue Resident", date: "2021-10-01", rating: 1, title: "Pump installation issues", content: "While the technician was initially 5 star, issues arose after purchasing and having a new pump installed. Experienced recurring problems with the pool's electronic panel, and after multiple service requests with excuses for delays, the company recommended seeking another service provider. Ultimately hired another company who identified that a wire wasn't installed correctly and the new pump wasn't properly fastened, causing electrical shorts." },
    ],
  },
  {
    businessName: "Tri-City Pools",
    category: "Pool Service",
    phone: "(239) 481-4122",
    overallRating: 2.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: "2021-10-01", rating: 2, title: "Would not recommend", content: "Would not recommend. Last cleaning lasted only 60-90 seconds — the water was tested and that's it." },
    ],
  },
  {
    businessName: "Alico Pet Vet",
    category: "Veterinarian",
    phone: "(239) 441-2525",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Stress-free first appointment", content: "Conveniently located. Our cats had a stress-free first appointment where staff allowed us to hold our pet during examination and shots, and put owners in the driver's seat for their pet's care." },
    ],
  },
  {
    businessName: "Jetport RV & Boat Storage",
    category: "RV & Boat Storage",
    phone: "(239) 880-2628",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Great facility with 50amp power", content: "Spaces are plugged in with 50amp power to keep temperatures and moisture low. They have worked with customers on parking arrangements for trips, allowing slide outs to be opened for storing items." },
    ],
  },
  {
    businessName: "U-TOPIA SPA at Wildblue",
    category: "Spa",
    phone: "(239) 444-9219",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: "2023-02-01", rating: 5, title: "Highly recommend", content: "Highly recommend U-Topia Spa in the Amenity Center." },
    ],
  },
  // === Recovered reviews from web search (round 2) ===
  {
    businessName: "Smart Pools",
    category: "Pool Service",
    phone: "(239) 601-2028",
    overallRating: 4.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 4, title: "Great job but recent issues", content: "Used Smart Pools for about 6 months and they did a great job, sending weekly pictures of the pool after service and it always looked clean. However, in recent weeks had algae in the pool in some spots, was told the company was having problems keeping up with chemicals, and an employee left the pool dirty without cleaning trouble spots that were pointed out. Had to reduce rating from 5 stars to 4 stars due to the employee leaving the pool dirty." },
    ],
  },
  {
    businessName: "Limoncello Italian Restaurant",
    category: "Restaurants",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Fantastic food and great atmosphere", content: "The food is fantastic, and there's often live music that's not too loud, creating a great atmosphere. The owner clearly takes pride in the restaurant. Since it's a busy spot, reservations are recommended." },
    ],
  },
  {
    businessName: "Caffè da Michele Osteria Italiana",
    category: "Restaurants",
    overallRating: 4.0,
    totalReviews: 5,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Enjoyed the meal, owner shared wine from Italy", content: "Really enjoyed the meal. The owner shared some wine from Italy and we were able to enjoy a few glasses. Close to Wildblue with a relaxed, casual dining atmosphere." },
      { reviewer: "Wildblue Resident", date: null, rating: 2, title: "Sub-par experience with service issues", content: "Sub-par experience with long wait times and issues with seating preferences. Requested outdoor seating on the reservation but the restaurant tried to get us to dine inside. Poor, unprofessional, and slow service." },
    ],
  },
  {
    businessName: "Baires Pool Service",
    category: "Pool Service",
    phone: "(239) 938-6562",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Wildblue Resident", date: null, rating: 5, title: "Reliable and hard-working", content: "Never had an issue with Baires Pool Service. They are reliable and hard-working people." },
    ],
  },
];

export function getReviewsForBusiness(name: string): BusinessReviews | undefined {
  return reviewsByBusiness.find(
    (b) => b.businessName.toLowerCase() === name.toLowerCase()
  );
}
