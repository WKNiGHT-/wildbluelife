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
    businessName: "Straight Line Custom Finishing LLC",
    category: "Carpentry",
    phone: "(414) 243-9602",
    contact: "Jason Ferguson",
    overallRating: 5.0,
    totalReviews: 1,
    reviews: [
      { reviewer: "Gary & Nancy Lemon", date: "2026-02-06", rating: 5, title: "Beautiful custom designed wall unit", content: "Jason and his team took our entertainment wall ideas and converted them into a beautiful custom designed wall unit." },
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
];

export function getReviewsForBusiness(name: string): BusinessReviews | undefined {
  return reviewsByBusiness.find(
    (b) => b.businessName.toLowerCase() === name.toLowerCase()
  );
}
