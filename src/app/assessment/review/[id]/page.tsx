import React from "react";
import PageHeader from "@/components/layout/pageHeader";
import SaveBtn from "@/components/ui/save-btn";
import { db } from "@/lib/db";
import { mockData } from "@/lib/mockdata";

interface Params {
  params: {
    id: string;
  };
}

const ReviewPage = async ({ params }: Params) => {
  const { id } = params;
  const assessments = await db.assessments.findMany({
    where: {
      id: id,
    },
    select: {
      subject: true,
      date: true,
      id: true,
      driveLink: true,
      fileURL: true,
      reviewed: true,
    },
  });

  const fetchedAssessment = await assessments[0];

  return (
    <section className="flex h-full w-full flex-col text-black">
      <PageHeader className="flex justify-between py-3">
        <h1 className="text-2xl font-bold leading-relaxed tracking-wide text-foreground">
          Assessments Results
        </h1>
        <SaveBtn
          id={fetchedAssessment.id}
          reviewed={fetchedAssessment.reviewed}
        />
      </PageHeader>
      <div className="flex size-full">
        <div className="h-full w-1/2 p-1">
          <div className="flex items-center gap-3">
            {/* <img
              className="inline-block size-[46px] rounded-full"
              src="/ai.png"
              alt="Image Description"
            /> */}
            <h1 className="text-xl font-medium">{"AI result :"}</h1>
          </div>
          <div className="mt-4">
            {mockData.messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className="flex h-[250px] flex-col gap-4 overflow-y-scroll rounded-lg bg-gray-100 p-3 shadow">
                  {msg.message.split("\n").map((char, i) => {
                    return (
                      <span key={i} className="">
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <div className="mb-2 border-b py-2">
              <h1 className="text-xl font-medium capitalize">
                {"Your Suggestions :"}
              </h1>
            </div>
            <div className="h-full">
              <textarea className="h-[270px] w-full rounded-lg bg-gray-100 p-3 shadow outline outline-1 outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="h-full w-1/2 rounded-lg border p-2">
          <embed
            src={fetchedAssessment.fileURL}
            type="application/pdf"
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
