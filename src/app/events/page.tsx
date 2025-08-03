import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { getVisibleTiers } from '@/lib/tier';

export default async function EventsPage() {
  const user = await currentUser();
  const tier = (user?.publicMetadata.tier as string) || 'free';
  const tiers = getVisibleTiers(tier);

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .in('tier', tiers);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {events?.map((event) => (
        <div key={event.id} className="rounded-xl border p-4 shadow">
          <img src={event.image_url} className="w-full h-40 object-cover mb-2 rounded" />
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p>{event.description}</p>
          <p className="text-sm text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
          <span className="mt-2 inline-block rounded bg-blue-500 px-2 py-1 text-xs text-white">{event.tier}</span>
        </div>
      ))}
    </div>
  );
}
