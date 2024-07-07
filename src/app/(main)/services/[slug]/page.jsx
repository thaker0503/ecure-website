import { PortableText } from "@portabletext/react";
import React from "react";
import {
  getServicesDetails,
  getServicesList,
} from "../../../../sanity/sanity.query";
import ServicesSideBar from "./_components/ServicesSideBar";
import Link from "next/link";

const ServiceDetailPage = async ({ params }) => {
  const serviceDetails = await getServicesDetails(params.slug);
  const services = await getServicesList();

  return (
    <div className="flex w-full h-full max-w-screen-xl mx-auto max-h-svh overflow-hidden">
      <div
        className="h-svh w-64 bg-gray-100 space-y-2 "
      >
        <ServicesSideBar
          services={services}
          selectedServiceId={serviceDetails._id}
        />
      </div>
      <main className="flex-1 p-4 overflow-y-scroll">
        <div key={serviceDetails._id}>
          <h1 className="text-3xl font-bold py-10">{serviceDetails.title}</h1>
          <p className="text-[#5A5A5A] pb-4">{serviceDetails.description}</p>

          <div className="w-full h-[500px]">
            <img
              src={serviceDetails.imageUrl + "?h=500"}
              alt={serviceDetails.title}
            />
          </div>

          <PortableText
            blocks={serviceDetails.content}
            // listNestingMode="direct"
          />

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7"
            style={{ display: "grid" }}
          >
            {serviceDetails.subservices &&
              serviceDetails.subservices.map((subservice) => (
                <div
                  className="shadow-md bg-[#F6FFF8] rounded-md overflow-hidden h-min"
                  key={subservice.slug}
                >
                  <div className="px-4 py-4">
                    <img src={subservice.imageUrl} className="rounded-md" />
                  </div>

                  <div className="text-left px-4 relative h-max py-5">
                    <h1 className="text-xl font-sans font-medium pb-2">
                      {" "}
                      {subservice.title}{" "}
                    </h1>
                    <h3
                      className="text-[#5A5A5A] pb-2"
                      style={{ fontSize: "14px" }}
                    >
                      {" "}
                      {subservice.description}{" "}
                    </h3>
                    <Link
                      href={`/services/${subservice.slug}`}
                      className=" text-white hover:bg-gray-200 font-medium hover:text-[#1B8733] bg-[#1B8733] py-2 px-3 mt-3 w-full rounded-md sticky bottom-0"
                    >
                      {"Read More"}{" "}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailPage;
