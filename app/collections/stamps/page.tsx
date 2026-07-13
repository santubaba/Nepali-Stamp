"use client";
import BreadCrumb from "@/app/breadcrumbs/page";
import SearchBar from "@/app/components/Search/SearchBar";
import StampCard from "@/app/components/StampCard/StampCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Stamps() {
  const stamps = [
    {
      id: 1,
      slug: "np-01",
      title: "Blue Heron",
      year: 1985,
      country: "Canada",
      description: "Wildlife Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 2,
      slug: "np-02",
      title: "Cherry Blossom",
      year: 1881,
      country: "Japan",
      description: "Spring Collection",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 3,
      slug: "np-03",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 4,
      slug: "np-04",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 5,
      slug: "np-05",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 6,
      slug: "np-06",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
  ];

  const [isDown, setIsDown] = useState(false);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);
  
  return (
    <div>
      <BreadCrumb />
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        {/* Stamp Grid */}
        <div className="flex ">
          <div className=" h-30 border-r border-brand-border">
            <h1>Browse By Decade</h1>
            <div className="flex">
              {isDown == false ? (
                <ChevronRight onClick={() => setIsDown(!isDown)} />
              ) : (
                <ChevronDown onClick={() => setIsDown(!isDown)} />
              )}

              <div> 2020-2026</div>
              {isDown ? (
                <div>
                  <div>2020</div>
                  <div>2021</div>
                  <div>2022</div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5">
            {stamps.map((item) => (
              <StampCard
                key={item.id}
                title={item.title}
                slug={item.slug}
                year={item.year}
                country={item.country}
                description={item.description}
                img={item.img}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
