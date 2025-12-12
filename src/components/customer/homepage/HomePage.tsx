import { APPCONFIG } from "app/config";
import QuickActionCard from "./QuickActionCard";
import Testimonials from "./Testimonials";
import { Calendar, BookOpenCheck, User2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className='py-6 space-y-8'>
      {/* Welcome Section */}
      <section className='text-center'>
        <h1 className='text-2xl font-bold text-primary-800'>
          Welcome to {APPCONFIG.BUSINESS.name}
        </h1>
        <p className='text-gray-600 mt-2 text-md'>
          Book your classes, manage reservations, and stay connected.
        </p>
      </section>

      {/* Quick Actions */}
      <section className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <QuickActionCard
          icon={Calendar}
          label='Today’s Classes'
          href='/customer/classes'
        />

        <QuickActionCard
          icon={BookOpenCheck}
          label='My Reservations'
          href='/customer/reservations'
        />

        <QuickActionCard icon={User2} label='My Profile' href='/customer/profile' />
      </section>

      {/* Next Class Placeholder */}
      <section className='p-4 border rounded-lg shadow-lg bg-white'>
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
          Next Available Class
        </h2>
        <p className='text-gray-600 text-sm'>
          Class schedule information will appear here soon.
        </p>
      </section>

      <Testimonials />
    </div>
  );
}
