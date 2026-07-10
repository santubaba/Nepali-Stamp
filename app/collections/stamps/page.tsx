import BreadCrumb from "@/app/breadcrumbs/page";
import StampCard from "@/app/components/StampCard/StampCard";
import Link from "next/link";

export default function Stamps() {
  const stamps = [
    {
      id: 1,
      title: "Blue Heron",
      year: new Date("2020-01-15"),
      country: "Canada",
      metadata: "Wildlife Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 2,
      title: "Cherry Blossom",
      year: new Date("2021-04-10"),
      country: "Japan",
      metadata: "Spring Collection",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 3,
      title: "Golden Temple",
      year: new Date("2019-08-05"),
      country: "India",
      metadata: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
  ];
  return (
    <div>
      <BreadCrumb />
       <div>
        {stamps.map((item)=>(
          <Link href={`stamps/${item.id}`} key={item.id}>
            <StampCard title={item.title} year={item.year} country={item.country} metadata={item.metadata} img={item.img} id={item.id}/>
          </Link>
        ))}
       </div>
    </div>
  );
}
