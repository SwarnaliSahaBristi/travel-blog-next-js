import Categories from "@/components/Home/Categories/Categories";
import CTASection from "@/components/Home/CTASection/CTASection";
import Hero from "@/components/Home/Hero/Hero";
import PopularDestinations from "@/components/Home/PopularDestinations/PopularDestinations";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import TravelStories from "@/components/Home/TravelStories/TravelStories";


export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero></Hero>
      <PopularDestinations></PopularDestinations>
      <Categories></Categories>
      <TravelStories></TravelStories>
      <Testimonials></Testimonials>
      <CTASection></CTASection>
    </div>
  );
}
