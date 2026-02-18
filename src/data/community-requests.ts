export interface CommunityRequest {
  id: string;
  question: string;
  author: string;
  date: string;
  category?: string;
  responses: {
    businessName: string;
    recommendedBy: string;
    comment: string;
    date: string;
  }[];
  resolved: boolean;
}

export const communityRequests: CommunityRequest[] = [
  {
    id: "1",
    question: "Looking for a reliable pool service that won't break the bank. Any recommendations?",
    author: "Sarah M.",
    date: "2026-02-10",
    category: "Pool Service",
    responses: [
      { businessName: "Angel's Pool Service", recommendedBy: "Mike T.", comment: "Been using them for 2 years, very reliable and fair pricing.", date: "2026-02-10" },
      { businessName: "Water Worx Pool Care", recommendedBy: "Janet K.", comment: "Great service, they're very thorough.", date: "2026-02-11" },
    ],
    resolved: true,
  },
  {
    id: "2",
    question: "Need someone to install landscape lighting along our driveway. Who have you used?",
    author: "Bob R.",
    date: "2026-02-12",
    category: "Landscape Lighting",
    responses: [
      { businessName: "Elegant Lighting", recommendedBy: "Linda S.", comment: "Did a beautiful job on our property.", date: "2026-02-13" },
    ],
    resolved: false,
  },
  {
    id: "3",
    question: "Can anyone recommend a good handyman for small projects? Need some shelves installed and a door fixed.",
    author: "Karen P.",
    date: "2026-02-14",
    responses: [
      { businessName: "Tom McDonnell", recommendedBy: "Debbie N.", comment: "Tom is the best! He's done multiple projects for us.", date: "2026-02-14" },
      { businessName: "Brad Meiser", recommendedBy: "Steve R.", comment: "Very reliable and reasonably priced.", date: "2026-02-15" },
      { businessName: "Rob Berend Handyman Services", recommendedBy: "K Smith", comment: "We've used Rob for years, highly recommend.", date: "2026-02-15" },
    ],
    resolved: true,
  },
  {
    id: "4",
    question: "Our garage is like an oven in the summer. Has anyone gotten AC installed in their garage?",
    author: "Dave L.",
    date: "2026-02-15",
    category: "Garage Doors Insulation and AC",
    responses: [
      { businessName: "My Cool Garage", recommendedBy: "Tom C.", comment: "They did our garage, huge difference!", date: "2026-02-16" },
    ],
    resolved: false,
  },
  {
    id: "5",
    question: "Looking for recommendations for exterior house painting. Quotes have been all over the place.",
    author: "Nancy L.",
    date: "2026-02-16",
    responses: [],
    resolved: false,
  },
];
