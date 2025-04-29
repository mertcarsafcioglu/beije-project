export interface SubProduct {
    _id: string;
    name: string;
    price: number;
  }
  
  export interface Product {
    _id: string;
    title: string;
    type: "Menstrual" | "Other";
    subProducts: SubProduct[];
  }
  
  export interface Packet {
    _id: string;
    title: string;
    image: string;
  }
  
  export interface ProfileInfo {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
  }
  
  export interface Profile {
    _id: string;
    profileInfo: ProfileInfo;
  }
  