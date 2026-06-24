import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import projectDelhi from "@/assets/project-delhi.jpg";
import projectGoa from "@/assets/project-goa.jpg";

export type Property = {
  id: string;
  title: string;
  locality: string;
  city: string;
  price: string;
  priceNumeric: number;
  bhk: string;
  area: string;
  type: string;
  status: "Ready" | "Under Construction" | "New Launch";
  image: string;
  tag?: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "lh-001",
    title: "The Atrium Penthouse",
    locality: "Worli",
    city: "Mumbai",
    price: "₹14.5 Cr",
    priceNumeric: 145000000,
    bhk: "4 BHK",
    area: "4,200 sq.ft",
    type: "Apartment",
    status: "Ready",
    image: property1,
    tag: "Editor's pick",
  },
  {
    id: "lh-002",
    title: "Villa Solene",
    locality: "Whitefield",
    city: "Bangalore",
    price: "₹9.2 Cr",
    priceNumeric: 92000000,
    bhk: "5 BHK",
    area: "6,800 sq.ft",
    type: "Villa",
    status: "Ready",
    image: property2,
  },
  {
    id: "lh-003",
    title: "Skyline Residence 22A",
    locality: "Cyber City",
    city: "Gurgaon",
    price: "₹6.8 Cr",
    priceNumeric: 68000000,
    bhk: "3 BHK",
    area: "2,850 sq.ft",
    type: "Apartment",
    status: "Ready",
    image: property3,
  },
  {
    id: "lh-004",
    title: "Crescent Towers Phase II",
    locality: "Aerocity",
    city: "Delhi",
    price: "₹4.1 Cr onwards",
    priceNumeric: 41000000,
    bhk: "2–4 BHK",
    area: "1,400–3,200 sq.ft",
    type: "Apartment",
    status: "New Launch",
    image: projectDelhi,
    tag: "New launch",
  },
  {
    id: "lh-005",
    title: "Palm House by the Sea",
    locality: "Assagao",
    city: "Goa",
    price: "₹7.5 Cr",
    priceNumeric: 75000000,
    bhk: "4 BHK",
    area: "5,400 sq.ft",
    type: "Villa",
    status: "Ready",
    image: projectGoa,
  },
  {
    id: "lh-006",
    title: "The Loft Collection",
    locality: "Bandra West",
    city: "Mumbai",
    price: "₹3.9 Cr",
    priceNumeric: 39000000,
    bhk: "2 BHK",
    area: "1,650 sq.ft",
    type: "Apartment",
    status: "Under Construction",
    image: property1,
  },
];
