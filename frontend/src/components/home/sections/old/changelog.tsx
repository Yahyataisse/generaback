'use client';

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ChangelogData = {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface Changelog1Props {
  title?: string;
  description?: string;
  data?: ChangelogData[];
  className?: string;
}

export const Changelog = ({
  title = "Changelog",
  description = "The latest updates and improvements to Suna.",
}: Changelog1Props) => {
  return (
    <section id="changelog" className="py-32 px-10 lg:px-0">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mb-6 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          
        </div>
      </div>
    </section>
  );
};
